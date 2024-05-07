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