import * as THREE from "three";
import {
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as ut from "./utility.js";
import * as sh from "./shaders.js";
import * as dt from "./data.js";

//const sh = require('./shaders.js');

let scene, renderer;
let camera;
let earthCamera, fakeCamera;
let info;
let grid;
let estrella,
  Planetas = [],
  Lunas = [];
let t0 = 0;
let accglobal = 0.001;
let camcontrols;
const dummy = new THREE.Object3D();
let timestamp;
let code_generator = ut.makeRandomRange(1000);
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
let tloader = new THREE.TextureLoader();
let json;
let globeContainer = "globe";
let container;
let bodies = dt.bodies;

let uniforms;

run();

async function run() {
  console.log("Running");
  await init();
  animationLoop();
}

async function init() {

  container = document.getElementById(globeContainer);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  );
  camera.position.set(45, 30, 45);
  earthCamera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    opacity: 0.5,
    //shadowMap: true
  });
  container.appendChild(renderer.domElement)
  renderer.autoClear = true;
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0.0);

  const skyboxTexture = new THREE.TextureLoader().load(
    "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/8k_stars_milky_way.jpg?v=1699045832743"
  );
  const skyboxMaterial = new THREE.MeshBasicMaterial({
    map: skyboxTexture,
    side: THREE.BackSide,
  });
  const skyboxGeometry = new THREE.SphereGeometry(200, 30, 30);
  const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);

  uniforms = {
    u_time: {
      type: "f",
      value: 1.0,
    },
    u_resolution: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_mouse: {
      type: "v2",
      value: new THREE.Vector2(),
    },
  };

  await generateMainBodies();

  let minitarget = "earth";
  let distance = 0.4;
  let vector = [0.6, 0.6, 2];
  bodies[minitarget]["orbit_position"].add(earthCamera);
  earthCamera.position.set(
    vector[0] * distance,
    vector[1] * distance,
    vector[2] * distance
  );
  fakeCamera = earthCamera.clone(); // parent becomes null
  camcontrols = new OrbitControls(fakeCamera, renderer.domElement);
  camcontrols.enablePan = false;
  camcontrols.enableRotate = true;
  camcontrols.enableZoom = true;
  camcontrols.minDistance = 0.6;
  camcontrols.maxDistance = 1;
  //camcontrols.enabled = true/false;

  window.addEventListener("resize", onWindowResize, false);
  onWindowResize();

  //const renderScene = new RenderPass(scene, camera);

  t0 = Date.now();
}

function rotateToCoordinates(coordinates, object) {
  object.rotation.x = 0.0;
  object.rotation.y = 0.0;
  object.rotation.z = 0.0;
  object.rotateY(Math.PI / 2.0 + (Math.PI * coordinates[1]) / 180.0);
  object.rotateX(Math.PI * (Math.abs(coordinates[0] - 90.0) / 180.0));
}

function generateUniformsFrom(data) {
  return new Promise((resolve, reject) => {
    try {
      let returner = {};
      let promises = [];

      for (let i in data["textures"]) {
        // Assuming data["textures"][i] can be either a string or a promise
        let texturePromise = Promise.resolve(data["textures"][i]);
        promises.push(
          texturePromise.then((textureUrl) => {
            returner[i] = { value: tloader.load(textureUrl) };
          })
        );
      }

      // Wait for all promises to resolve
      Promise.all(promises)
        .then(() => {
          resolve(returner);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

async function generateMaterial(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const uniforms = await generateUniformsFrom(data);
      resolve(
        new THREE.ShaderMaterial({
          uniforms: uniforms,
          fragmentShader: data["fragsh"],
          vertexShader: data["versh"],
          transparent: true,
        })
      );
    } catch (error) {
      reject(error);
    }
  });
}

async function generateBody(input_data, drawOrbit = true) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = bodies[input_data];
      if (input_data !== "baseline") {
        const orbit_container = new THREE.Object3D();
        const orbit_position = new THREE.Object3D();
        let geometry;
        let material;

        if (data["object"] == null) {
          geometry = new THREE.SphereBufferGeometry(
            data["size"],
            data["definition"],
            data["definition"]
          );
          material = await generateMaterial(data);
          var body = new THREE.Mesh(geometry, material);

          data["distance"] =
            bodies[data["parent"]] == null
              ? 0
              : data["distance"] + bodies[data["parent"]]["size"];

          orbit_container.add(orbit_position);
          orbit_position.add(body);
        } else {
          var body = data["object"];
          orbit_container.add(orbit_position);
          orbit_position.add(body);
        }

        data["object"] = body;
        data["orbit_container"] = orbit_container;
        data["orbit_position"] = orbit_position;
        body.userData.dict = data;

        body.rotation.x += data["axis_rotation"][0];
        body.rotation.y += data["axis_rotation"][1];
        body.rotation.z += data["axis_rotation"][2];

        if (data["parent"] == null) {
          scene.add(orbit_container);
        } else {
          bodies[data["parent"]]["orbit_position"].add(orbit_container);

          if (drawOrbit) {
            const curve = new THREE.EllipseCurve(
              0,
              0,
              -data["distance"] * data["xccentricity"],
              -data["distance"] * data["yccentricity"]
            );
            const points = curve.getPoints(100);
            const geome = new THREE.BufferGeometry().setFromPoints(points);
            const mate = new THREE.LineBasicMaterial({ color: 0xffffff });
            const orbita = new THREE.Line(geome, mate);
            orbit_container.add(orbita);
            orbita.rotation.x = Math.PI / 2;
          }
        }

        orbit_container.rotation.x += data["orbit_rotation"][0];
        orbit_container.rotation.y += data["orbit_rotation"][1];
        orbit_container.rotation.z += data["orbit_rotation"][2];

        resolve(body);
      } else {
        resolve(null); // Resolve with null for "baseline"
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function generateMainBodies() {
  for (let i in bodies) {
    await generateBody(i);
  }
}

function onWindowResize(e) {
    let x, y, w, h;

  //Efecto similar al de defecto, ocupa toda la ventana
  x = Math.floor(container.offsetWidth * 0.0);
  y = Math.floor(container.offsetHeight * 0.0);
  w = Math.floor(container.offsetWidth * 1);
  h = Math.floor(container.offsetHeight * 1);

  //renderer.setViewport(x, y, w, h);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setScissor(x, y, w, h);
  renderer.setScissorTest(true);
  
  fakeCamera.aspect = container.offsetWidth / container.offsetHeight;
  fakeCamera.updateProjectionMatrix();
  //uniforms.u_resolution.value.x = renderer.domElement.width;
  //uniforms.u_resolution.value.y = renderer.domElement.height;
}

//Bucle de animación
function animationLoop() {
  timestamp = (Date.now() - t0) * accglobal;

  renderer.render(scene, earthCamera);

  requestAnimationFrame(animationLoop);
  earthCamera.copy(fakeCamera);
}