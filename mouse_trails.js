const canvas = document.getElementById("webgl-canvas");
const gl = canvas.getContext("webgl");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void) {
        gl_Position = aVertexPosition;
    }
`;

// Fragment shader program
const fsSource = `
    void main(void) {
        gl_FragColor = vec4(1.0, 0, 0, 1.0);
    }
`;

let mouseX = 0;
let mouseY = 0;

function loadShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initShaderProgram(vsSource, fsSource) {
  const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram),
    );
    return null;
  }
  return shaderProgram;
}

const shaderProgram = initShaderProgram(vsSource, fsSource);
const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
  },
  uniformLocations: {
    resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
    mousePosition: gl.getUniformLocation(shaderProgram, "uMousePosition"),
    time: gl.getUniformLocation(shaderProgram, "uTime"),
  },
};

function initBuffers() {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
  };
}

const buffers = initBuffers();

function drawScene(programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
  gl.uniform2f(
    programInfo.uniformLocations.mousePosition,
    mouseX / gl.canvas.width,
    1.0 - mouseY / gl.canvas.height,
  );
  gl.uniform1f(programInfo.uniformLocations.time, performance.now() / 1000);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
canvas.addEventListener("mousemove", event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function render() {
  drawScene(programInfo, buffers);
  requestAnimationFrame(render);
}

render();
