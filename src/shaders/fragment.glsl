varying vec2 vUv;
uniform float time;
varying float vElevation;
uniform float uColorChange;   
void main() {
  // gl_FragColor = vec4(vElev1ation,., 1.0);
  vec4 color = vec4(0.95f, 0.45f, 0.62f, 1.0f);
  vec4 color2 =vec4(0.97f, 0.89f, 0.92f, 1.0f);
  vec4 color3 =vec4(1.0f, 0.97f, 0.47f, 1.0f);
  vec4 color4 =vec4(1.0f);
  float v = smoothstep(-.14, 1.6, vElevation * 2.);
  vec4 colorred = mix(color, color2, v);

  vec4 coloryellow = mix(color3, color4, v);
  vec4 finalColor = mix(colorred, coloryellow, uColorChange);
  gl_FragColor = finalColor;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}