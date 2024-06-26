const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

const LEN = 100;

if (!gl) {
  throw new Error("WebGL not supported");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

const vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_time;
    varying float v_time;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_time = a_time;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying float v_time;
    void main() {
        float alpha = 1.0 - (v_time / 1.0);
        gl_FragColor = vec4(1.0, 0, 0, 1.0);
    }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program));
  throw new Error("Failed to link program");
}
gl.useProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = new Float32Array(LEN * 2);
let posIndex = 0;

const timeBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, timeBuffer);

const times = new Float32Array(LEN);
let timeIndex = 0;
let currentTime = 0;

const positionLocation = gl.getAttribLocation(program, "a_position");
const timeLocation = gl.getAttribLocation(program, "a_time");

gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(timeLocation);
gl.vertexAttribPointer(timeLocation, 1, gl.FLOAT, false, 0, 0);

let initialized = false;

canvas.addEventListener("mousemove", event => {
  const x = (event.clientX / canvas.width) * 2 - 1;
  const y = (event.clientY / canvas.height) * -2 + 1;

  if (!initialized) {
    for (let i = 0; i < LEN; i++) {
      positions[i * 2] = x;
      positions[i * 2 + 1] = y;
      times[i] = 0;
    }
    initialized = true;
  }

  positions[posIndex] = x;
  positions[posIndex + 1] = y;
  posIndex = (posIndex + 2) % positions.length;

  times[timeIndex] = currentTime;
  timeIndex = (timeIndex + 1) % times.length;
  console.log({ posIndex, positions });
});

function render() {
  currentTime += 0.01;

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STREAM_DRAW);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, timeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, times, gl.STREAM_DRAW);
  gl.vertexAttribPointer(timeLocation, 1, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 2);

  requestAnimationFrame(render);
}

gl.clearColor(0.0, 1.0, 0.0, 0.0);
render();
