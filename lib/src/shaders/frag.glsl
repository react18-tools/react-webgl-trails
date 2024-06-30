precision mediump float;

uniform vec3 c;
varying float v;
void main() {
  gl_FragColor = vec4(c, v);
}