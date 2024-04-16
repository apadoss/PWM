import { Component } from '@angular/core';
import * as THREE from "three";
import {
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
/*import * as ut from "./utility.js";
import * as sh from "./shaders.js";
import * as dt from "./data.js";
import * as ab from "./albums.js";*/

@Component({
  selector: 'app-globe',
  standalone: true,
  imports: [],
  templateUrl: './globe.component.html',
  styleUrl: './globe.component.css'
})
export class GlobeComponent {

}

//const sh = require('./shaders.js');

let scene: any, renderer: THREE.WebGLRenderer;
let camera;
let earthCamera: any, fakeCamera: any;
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
let code_generator = makeRandomRange(1000);
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
let tloader = new THREE.TextureLoader();
let json;
let globeContainer = "globe";
let container: HTMLElement | null;
//let bodies = bodies;

let uniforms;

//let albums: any[] = [];
//let renderedAlbums: any[] = {};
let renderedAlbums: { [id: string]: any } = {};

run();

async function run() {
  console.log("Running");
  await init();
  //animationLoop();
}

async function init() {

  container = document.getElementById(globeContainer);
  console.log(document)
  if (!!container) {
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
      //opacity: 0.5,
      //shadowMap: true
    });
    //console.log("AAAAAA", renderer)
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
  
    //loadAlbums();
    //refreshAlbums();

    //loadAlbum(generateAlbumJSON());

    window.addEventListener("resize", onWindowResize, false);
    onWindowResize();

    //const renderScene = new RenderPass(scene, camera);

    t0 = Date.now();
    console.log("a", renderer)
  }
}

function rotateToCoordinates(coordinates: number[], object: any) {
  object.rotation.x = 0.0;
  object.rotation.y = 0.0;
  object.rotation.z = 0.0;
  object.rotateY(Math.PI / 2.0 + (Math.PI * coordinates[1]) / 180.0);
  object.rotateX(Math.PI * (Math.abs(coordinates[0] - 90.0) / 180.0));
}

function generateUniformsFrom(data: Body) {
  return new Promise((resolve, reject) => {
    try {
      let returner: { [string: string] : {} } = {};
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

async function generateMaterial(data: Body) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const uniforms = await generateUniformsFrom(data);
      resolve(
        /*@ts-ignore*/ new THREE.ShaderMaterial({
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

async function generateBody(input_data: string, drawOrbit = true) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = bodies[input_data];
      if (input_data !== "baseline") {
        const orbit_container = new THREE.Object3D();
        const orbit_position = new THREE.Object3D();
        let geometry;
        let material: THREE.ShaderMaterial;
        let body;

        if (data["object"] == null) {
          geometry = new THREE.SphereBufferGeometry(
            data["size"],
            data["definition"],
            data["definition"]
          );
          /*@ts-ignore*/ material = await generateMaterial(data);
          /*@ts-ignore*/ body = new THREE.Mesh(geometry, material);

          data["distance"] = bodies[data["parent"]] == null ? 0 : data["distance"] + bodies[data["parent"]]["size"];

          orbit_container.add(orbit_position);
          orbit_position.add(body);
        } else {
          body = data["object"];
          orbit_container.add(orbit_position);
          orbit_position.add(body);
        }

        data["object"] = body;
        data["orbit_container"] = orbit_container;
        data["orbit_position"] = orbit_position;
        //body.userData['dict'] = data;

        body.rotation.x += data["axis_rotation"][0];
        body.rotation.y += data["axis_rotation"][1];
        body.rotation.z += data["axis_rotation"][2];

        if (data["parent"] == null) {
          scene.add(orbit_container);
        } else {
          bodies[data["parent"]]["orbit_position"].add(orbit_container);

          if (drawOrbit) {
            /*const curve = new THREE.EllipseCurve(
              0,
              0,
              -data["distance"] * data["xccentricity"],
              -data["distance"] * data["yccentricity"]
            );*/
            const curve = new THREE.EllipseCurve(
              0,
              0,
              -data["distance"] * data["xccentricity"],
              -data["distance"] * data["yccentricity"],
              0,
              Math.PI * 2,
              false,
              0
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

//Recibe un dict de álbum y lo renderiza
function renderAlbum(album: { albumID: any; name?: any; coordinates?: any; }) {
  if (album.albumID in renderedAlbums) {
    deRenderAlbum(album);
  }
  let pin = addAlbumPin(album.name, album.albumID, album.coordinates);
  renderedAlbums[album.albumID] = pin;
}

//Recibe un dict de álbum y lo derenderiza, true si lo ha quitado false si no existía
function deRenderAlbum(album: { albumID: string | number; }) {
  if (album.albumID in renderedAlbums) {
    renderedAlbums[album.albumID].parent.removeFromParent();
    delete renderedAlbums[album.albumID];
    return true;
  }
  return false;
}

//Recibe un dict de álbum, lo guarda en la lista general de álbumes y (dependiendo de parámetro) lo renderiza directamente o no
/*function loadAlbum(album, render=true) {
  if (albums.hasKey(album.albumID)) {
    delete albums[album.albumID];
  }
  albums[album.albumID] = album;
  if (render) {
    renderAlbum(album);
  }
  /*name
  albumID
  date-start
  date-end
  city-name
  coordinates
  */
  //const box = new THREE.BoxHelper( icon, 0xffff00 );
  //scene.add( box );
//}

//Renderiza un pin de álbum sobre el mapa y retorna específicamente la mesh del icono
function addAlbumPin(name = "Default", id = "ID error", coordinates = [48.856697,2.351462], distance = 0.43, size = 0.02, iconLink = 'https%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F256%2Fmap-marker-icon.png') {
  let line = normalLine(distance);
  rotateToCoordinates(coordinates, line);
  if (!!bodies["earth"]["object"]) bodies["earth"]["object"].add(line);

  let geom = new THREE.PlaneBufferGeometry(size, size);
  let mat = new THREE.ShaderMaterial({
    fragmentShader: fragmentShader_alwayslit(),
    vertexShader: vertexShader_generic(),
    uniforms: {
      texture1: {
        value: tloader.load(
          `https://corsproxy.io/?` + iconLink
        ),
      },
    },
    side: THREE.DoubleSide,
    transparent: true,
  });
  const icon: any = new THREE.Mesh(geom, mat);
  line.add(icon);
  icon.position.y += distance;
  icon.rotateX(Math.PI / 2.0);
  icon.rotateZ(Math.PI);

  icon.albumID = id;
  return icon;
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let intersecting: any;

function onPointerMove( event: any ) {
  if (!!container) {
    const rect = renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    pointer.x = ( x / container.offsetWidth ) *  2 - 1;
    pointer.y = ( y / container.offsetHeight ) * - 2 + 1;

    raycaster.setFromCamera( pointer, earthCamera );
    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );
    const intersects = raycaster.intersectObjects( Object.values(renderedAlbums) );

    if (intersects.length > 0) {
      if (intersecting != intersects[0].object) {
        intersecting = intersects[0].object;
        intersecting.scale.set(1.3, 1.3, 1.);
      }
    } else if (typeof intersecting !== "undefined") {
      intersecting.scale.set(1.0, 1.0, 1.0);
      intersecting = undefined;
    }
  }
}

function mouseRaycast() {
  raycaster.setFromCamera( pointer, earthCamera );
  //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );
	const intersects = raycaster.intersectObjects( Object.values(renderedAlbums) );
  if (intersects.length > 0) {
    console.log(intersects[0])
  }
}

window.addEventListener( 'pointermove', onPointerMove );
//window.addEventListener( 'click', mouseRaycast );

var mDragging = false;
var mDown = false;

window.addEventListener('mousedown', function () {
  mDown = true;
});

window.addEventListener('mousemove', function () {
  if(mDown) {
      mDragging = true;
  }
});

window.addEventListener('mouseup', function() {
  // If not dragging, then it's a click!
  if(!mDragging) {
      mouseRaycast();
  }
  // Reset variables
  mDown = false;
  mDragging = false;
});
/*function mouseCollide() {

let mouseCast = new THREE.Vector4();

}*/

function onWindowResize() {
  if (!!container && !!renderer && !!fakeCamera) {
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
}

//Bucle de animación
function animationLoop() {
  timestamp = (Date.now() - t0) * accglobal;

  //console.log(renderer)
  renderer.render(scene, earthCamera);

  requestAnimationFrame(animationLoop);
  earthCamera.copy(fakeCamera);
  //mouseRaycast();
}

//UTILITY
//import * as THREE from "three";
//import { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
//import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
/*import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { GLBLoader } from 'three/examples/jsm/loaders/GLBLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';*/
//import * as th from './globe.js';

//General utility functions
export function randomBetween(start: number, end: number) {
  return (Math.random() < 0.5 ? -1 : 1) * (Math.random()*(end-start) + start);
}

export function normalFromRotation(vector: any) {
  const euler = new THREE.Euler(vector[0], vector[1], vector[2], 'XYZ');
  const quaternion = new THREE.Quaternion();
  quaternion.setFromEuler(euler);
  return new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion);
}

export function normalLine(length=5.0) {
  const material = new THREE.LineBasicMaterial({
  color: 0x0000ff
  });
  const points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( new THREE.Vector3( 0, length, 0 ) );

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  return new THREE.Line( geometry, material );
}

export function makeRandomRange(x: number) {
    var range = new Array(x),
        pointer = x;
    return function getRandom() {
        pointer = (pointer-1+x) % x;
        var random = Math.floor(Math.random() * pointer);
        var num = (random in range) ? range[random] : random;
        range[random] = (pointer in range) ? range[pointer] : pointer;
        return range[pointer] = num;
    };
}

//More specific
export async function probeBackend() {
  try {
    let response : any = await fetch('/handshake');
    response = await response.text();
    console.log(response);
    return 1;
  } catch (err) {
    console.error("Error hand-shaking with server: ",err);
    return 0;
  }
}

export async function fetchFromBackend(url: string) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.text();
    } else {
      console.log(response);
      console.error('Error: backend request failed');
      return null;
    }
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

export async function fetchEndpoint(endpoint : any, keypart : any, keyname : any, expectedType="json",refresh=-1) {
  const delay = (ms : any) => new Promise((resolve) => setTimeout(resolve, ms));
  const url =
    '/search?ep=' +
    endpoint +
    '&kp=' +
    keypart +
    '&kn=' +
    keyname +
    '&js=' +
    expectedType +
    '&rf=' +
    refresh;

  try {
    const response = await fetch(url);
    // Timeout delay
    let counter = 0;
    while (!response.ok && counter < 10000) {
      await delay(1);
      counter++;
    }

    if (response.ok) {
      if (expectedType === 'image') {
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer]);
        const imageUrl = URL.createObjectURL(blob);
        //console.log('AAAAAA', imageUrl);
        return imageUrl;
      } else {
        return await response.text();
      }
    } else {
      console.log(response);
      console.error('Error: API request failed');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export function dcText(txt: string, hWorldTxt: number, hWorldAll: number, hPxTxt: number, fgcolor: { toString: (arg0: number) => string; }, bgcolor: { toString: (arg0: number) => string; } | undefined) { // the routine
  // txt is the text.
  // hWorldTxt is world height of text in the plane.
  // hWorldAll is world height of whole rectangle containing the text.
  // hPxTxt is px height of text in the texture canvas; larger gives sharper text.
  // The plane and texture canvas are created wide enough to hold the text.
  // And wider if hWorldAll/hWorldTxt > 1 which indicates padding is desired.
  var kPxToWorld = hWorldTxt/hPxTxt;                // Px to World multplication factor
  // hWorldTxt, hWorldAll, and hPxTxt are given; get hPxAll
  var hPxAll = Math.ceil(hWorldAll/kPxToWorld);     // hPxAll: height of the whole texture canvas
  // create the canvas for the texture
  var txtcanvas = document.createElement("canvas"); // create the canvas for the texture
  var ctx = txtcanvas.getContext("2d");
  ctx!.font = hPxTxt + "px sans-serif";        
  // now get the widths
  var wPxTxt = ctx!.measureText(txt).width;         // wPxTxt: width of the text in the texture canvas
  var wWorldTxt = wPxTxt*kPxToWorld;               // wWorldTxt: world width of text in the plane
  var wWorldAll = wWorldTxt+(hWorldAll-hWorldTxt); // wWorldAll: world width of the whole plane
  var wPxAll = Math.ceil(wWorldAll/kPxToWorld);    // wPxAll: width of the whole texture canvas
  // next, resize the texture canvas and fill the text
  txtcanvas.width =  wPxAll;
  txtcanvas.height = hPxAll;
  if (bgcolor != undefined) { // fill background if desired (transparent if none)
    ctx!.fillStyle = "#" + bgcolor.toString(16).padStart(6, '0');
    ctx!.fillRect( 0,0, wPxAll,hPxAll);
  } 
  ctx!.textAlign = "center";
  ctx!.textBaseline = "middle"; 
  ctx!.fillStyle = "#" + fgcolor.toString(16).padStart(6, '0'); // fgcolor
  ctx!.font = hPxTxt + "px sans-serif";   // needed after resize
  ctx!.fillText(txt, wPxAll/2, hPxAll/2); // the deed is done
  // next, make the texture
  var texture = new THREE.Texture(txtcanvas); // now make texture
  texture.minFilter = THREE.LinearFilter;     // eliminate console message
  texture.needsUpdate = true;                 // duh
  // and make the world plane with the texture
  let geometry = new THREE.PlaneGeometry(wWorldAll, hWorldAll);
  var material = new THREE.MeshBasicMaterial( 
    { side:THREE.DoubleSide, map:texture, transparent:true, opacity:1.0 } );
  // and finally, the mesh
  var mesh : any = new THREE.Mesh(geometry, material);
  mesh.wWorldTxt = wWorldTxt; // return the width of the text in the plane
  mesh.wWorldAll = wWorldAll; //    and the width of the whole plane
  mesh.wPxTxt = wPxTxt;       //    and the width of the text in the texture canvas
                              // (the heights of the above items are known)
  mesh.wPxAll = wPxAll;       //    and the width of the whole texture canvas
  mesh.hPxAll = hPxAll;       //    and the height of the whole texture canvas
  mesh.ctx = ctx;             //    and the 2d texture context, for any glitter
  // console.log(wPxTxt, hPxTxt, wPxAll, hPxAll);
  // console.log(wWorldTxt, hWorldTxt, wWorldAll, hWorldAll);
  return mesh;
}

export function parseWeatherInCity(idata: any) {
  return {
    "name": idata["name"],
    "coordinates": [idata["coord"]["lat"],idata["coord"]["lon"]],
    "temperature": `${(idata["main"]["temp"] - 273.15).toFixed(0)} ºC`,
    "weatherIcon": idata["weather"][0]["icon"],
  };
}

//SHADERS
export function vertexShader_generic() {
  return `
                varying vec2 vUv;
        varying vec3 v_Normal;
        varying vec3 v_vertToLight;
        
                void main() {
                  vUv = uv;
                  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          vec4 viewSunPos = viewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          v_Normal = normalize( normalMatrix * normal );
          v_vertToLight = normalize(viewSunPos.xyz - modelViewPosition.xyz);
                  gl_Position = projectionMatrix * modelViewPosition;
                }
              `;
}

export function vertexShader_earth() {
  return `
        uniform sampler2D dispmap;
                varying vec2 vUv;
        varying vec3 v_Normal;
        varying vec3 v_vertToLight;
        
                void main() {
                  vUv = uv;
                  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          vec4 viewSunPos = viewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          v_Normal = normalize( normalMatrix * normal );
          v_vertToLight = normalize(viewSunPos.xyz - modelViewPosition.xyz);
                  gl_Position = projectionMatrix * (modelViewPosition + 0.04 * vec4( length(texture(dispmap, vUv).rgb / 3.0) * v_Normal, 0.0));
                }
              `;
}

export function fragmentShader_generic() {
  return `
        uniform sampler2D texture1;
        varying vec2 vUv;
        varying vec3 v_vertToLight;
        varying vec3 v_Normal;

        void main() {
            float colorintensity = 1.0; 
            vec4 colorbias =  vec4 (0.0, 0.0, 0.0, 0.0);
            
            float light = dot(v_vertToLight, v_Normal);
            float kd = min(1.0, abs(light) * 2.0);
            gl_FragColor = vec4( texture2D(texture1, vUv).rgb * kd * colorintensity * (1.0 - min(0.0,light)/light) + 0.0, 1.0) + colorbias;
          }
              `;
}

export function fragmentShader_earth() {
  return `
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 vUv;
        varying vec3 v_vertToLight;
        varying vec3 v_Normal;

        void main() {
            float colorintensity = 1.0; 
            vec4 colorbias =  vec4 (0.0, 0.0, 0.0, 0.0);
            
            float light = dot(v_vertToLight, v_Normal);
            float kd = min(1.0, abs(light) * 2.0);
            if (light > 0.0) {
              gl_FragColor = vec4( texture2D(texture1, vUv).rgb * kd * colorintensity + 0.0, 1.0) + colorbias;
            } else {
              gl_FragColor = vec4( texture2D(texture2, vUv).rgb * kd * colorintensity + 0.0, 1.0) + colorbias;
            }
          }
              `;
}

export function fragmentShader_earth_clouds() {
  return `
        uniform sampler2D texture1;
        //uniform sampler2D texture2;
        //uniform sampler2D texture3;
        //uniform sampler2D texture4;
        varying vec2 vUv;
        varying vec3 v_vertToLight;
        varying vec3 v_Normal;

        void main() {
            float colorintensity = 1.0; 
            vec4 colorbias =  vec4 (0.0, 0.0, 0.0, 1.0);
            
            float light = dot(v_vertToLight, v_Normal);
            float kd = min(1.0, abs(light) * 2.0);
            gl_FragColor = vec4( texture2D(texture1, vUv).rgb * kd * colorintensity * (1.0 - min(0.0,light)/light) + 0.0, 1.0) + colorbias;
            gl_FragColor.a = texture2D(texture1, vUv).a;
          }
              `;
}

export function fragmentShader_sun() {
  return `
        uniform sampler2D texture1;
        varying vec2 vUv;

        void main() {
            float colorintensity = 1.0; 
            vec4 colorbias =  vec4 (0.0, 0.0, 0.0, 0.0);
            float kd = 1.0;
            gl_FragColor = vec4( texture2D(texture1, vUv).rgb * kd * colorintensity + 0.0, 1.0) + colorbias;
          }
              `;
}

export function fragmentShader_alwayslit() {
  return `
        uniform sampler2D texture1;
        varying vec2 vUv;

        void main() {
            float colorintensity = 1.0; 
            vec4 colorbias =  vec4 (0.0, 0.0, 0.0, 0.0);
            float kd = 1.0;
            gl_FragColor = vec4( texture2D(texture1, vUv).rgb * kd * colorintensity + 0.0, 1.0) + colorbias;
            gl_FragColor.a = texture2D(texture1, vUv).a;
          }
              `;
}

//DATA
//import * as ut from './utility.js';
//import * as sh from './shaders.js';

/*let bodies = {"baseline": {
  
  "parent": null,
  "size": 1,
  "distance": 1,
  "speed": 1,
  "xccentricity": 1,
  "yccentricity": 1,
  "orbit_rotation": [0,1,0],
  "axis_rotation": [0,0,0],
  "rotation_speed": 0.05,
  "textures": {
    "texture1": "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/sun_surface.jpg?v=1698331403365"
  },
  "definition": 20,
  "versh": vertexShader_generic,
  "fragsh": fragmentShader_generic
  
},
  "earth": {
  
  "parent": null,
  "size": 0.4,
  "distance": 0,
  "speed": 0,
  "xccentricity": 1,
  "yccentricity": 1,
  "orbit_rotation": [0,0,0],
  "axis_rotation": [0,0,(Math.PI * 2)*(23/360)],
  "rotation_speed": 0,
  "textures": {
    "texture1": "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/earth_surface.jpg?v=1698341331340",
    "texture2": "https://cdn.glitch.global/87772de1-82e4-4e11-9e28-c8a686b86d4c/2k_earth_nightmap.jpg?v=1699888576325",
    "dispmap": "https://cdn.glitch.global/87772de1-82e4-4e11-9e28-c8a686b86d4c/x1um653wa2r8hw9pn64drm8aljvv.jpg?v=1700053101311",
    "specular": "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/earthspec1k.jpg?v=1699204881315",
  },
  //"transparency": "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/earthcloudmaptrans_invert.jpg?v=1699204869312",
  "definition": 200,
  "versh": vertexShader_earth(),
  "fragsh": fragmentShader_alwayslit()
  
 },
};*/

interface Texture {
  [id: string]: string;
}

interface Body {
  parent: string | null;
  size: number;
  distance: number;
  speed: number;
  xccentricity: number;
  yccentricity: number;
  orbit_rotation: number[];
  axis_rotation: number[];
  rotation_speed: number;
  textures: Texture;
  definition: number;
  versh: any; // Assuming vertexShader_generic and other similar types are string
  fragsh: any; // Assuming fragmentShader_generic and other similar types are string
  object: THREE.Mesh | null;
  orbit_container: any | null;
  orbit_position: any | null;
}

const bodies: {[id: string]:  Body} = {
  "baseline": {
    parent: null,
    size: 1,
    distance: 1,
    speed: 1,
    xccentricity: 1,
    yccentricity: 1,
    orbit_rotation: [0, 1, 0],
    axis_rotation: [0, 0, 0],
    rotation_speed: 0.05,
    textures: {
      texture1: "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/sun_surface.jpg?v=1698331403365"
    },
    definition: 20,
    object: null,
    orbit_container: null,
    orbit_position: null,
    versh: vertexShader_generic,
    fragsh: fragmentShader_generic
  },
  "earth": {
    parent: null,
    size: 0.4,
    distance: 0,
    speed: 0,
    xccentricity: 1,
    yccentricity: 1,
    orbit_rotation: [0, 0, 0],
    axis_rotation: [0, 0, (Math.PI * 2) * (23 / 360)],
    rotation_speed: 0,
    textures: {
      texture1: "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/earth_surface.jpg?v=1698341331340",
      texture2: "https://cdn.glitch.global/87772de1-82e4-4e11-9e28-c8a686b86d4c/2k_earth_nightmap.jpg?v=1699888576325",
      dispmap: "https://cdn.glitch.global/87772de1-82e4-4e11-9e28-c8a686b86d4c/x1um653wa2r8hw9pn64drm8aljvv.jpg?v=1700053101311",
      specular: "https://cdn.glitch.global/7bb54dbb-ebd4-4a1b-8f14-dcda7da4af29/earthspec1k.jpg?v=1699204881315",
    },
    definition: 200,
    object: null,
    orbit_container: null,
    orbit_position: null,
    versh: vertexShader_earth(), 
    fragsh: fragmentShader_alwayslit()
  },
};

export let cities = {};