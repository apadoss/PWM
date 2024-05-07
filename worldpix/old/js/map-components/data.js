import * as ut from './utility.js';
import * as sh from './shaders.js';

export let bodies = {"baseline": {
  
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
  "versh": sh.vertexShader_generic,
  "fragsh": sh.fragmentShader_generic
  
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
  "versh": sh.vertexShader_earth(),
  "fragsh": sh.fragmentShader_alwayslit()
  
 },
};

export let cities = {};