attribute vec2 pos;
attribute float a;
varying float v;
void main() {
  gl_Position = vec4(pos, 0.0, 1.0);
  v = a;
}