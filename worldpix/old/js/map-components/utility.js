import * as THREE from "three";
import { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
//import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { GLBLoader } from 'three/examples/jsm/loaders/GLBLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as th from './globe.js';

//General utility functions
export function randomBetween(start, end) {
  return (Math.random() < 0.5 ? -1 : 1) * (Math.random()*(end-start) + start);
}

export function normalFromRotation(vector) {
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

export function makeRandomRange(x) {
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
    let response = await fetch('/handshake');
    response = await response.text();
    console.log(response);
    return 1;
  } catch (err) {
    console.error("Error hand-shaking with server: ",err);
    return 0;
  }
}

export async function fetchFromBackend(url) {
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

export async function fetchEndpoint(endpoint, keypart, keyname, expectedType="json",refresh=-1) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

export function dcText(txt, hWorldTxt, hWorldAll, hPxTxt, fgcolor, bgcolor) { // the routine
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
  ctx.font = hPxTxt + "px sans-serif";        
  // now get the widths
  var wPxTxt = ctx.measureText(txt).width;         // wPxTxt: width of the text in the texture canvas
  var wWorldTxt = wPxTxt*kPxToWorld;               // wWorldTxt: world width of text in the plane
  var wWorldAll = wWorldTxt+(hWorldAll-hWorldTxt); // wWorldAll: world width of the whole plane
  var wPxAll = Math.ceil(wWorldAll/kPxToWorld);    // wPxAll: width of the whole texture canvas
  // next, resize the texture canvas and fill the text
  txtcanvas.width =  wPxAll;
  txtcanvas.height = hPxAll;
  if (bgcolor != undefined) { // fill background if desired (transparent if none)
    ctx.fillStyle = "#" + bgcolor.toString(16).padStart(6, '0');
    ctx.fillRect( 0,0, wPxAll,hPxAll);
  } 
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; 
  ctx.fillStyle = "#" + fgcolor.toString(16).padStart(6, '0'); // fgcolor
  ctx.font = hPxTxt + "px sans-serif";   // needed after resize
  ctx.fillText(txt, wPxAll/2, hPxAll/2); // the deed is done
  // next, make the texture
  var texture = new THREE.Texture(txtcanvas); // now make texture
  texture.minFilter = THREE.LinearFilter;     // eliminate console message
  texture.needsUpdate = true;                 // duh
  // and make the world plane with the texture
  let geometry = new THREE.PlaneGeometry(wWorldAll, hWorldAll);
  var material = new THREE.MeshBasicMaterial( 
    { side:THREE.DoubleSide, map:texture, transparent:true, opacity:1.0 } );
  // and finally, the mesh
  var mesh = new THREE.Mesh(geometry, material);
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

export function parseWeatherInCity(idata) {
  return {
    "name": idata["name"],
    "coordinates": [idata["coord"]["lat"],idata["coord"]["lon"]],
    "temperature": `${(idata["main"]["temp"] - 273.15).toFixed(0)} ºC`,
    "weatherIcon": idata["weather"][0]["icon"],
  };
}