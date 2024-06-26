const vertexShaderSource = `
    attribute vec2 pos;
    attribute float a;
    varying float v;
    void main() {
        gl_Position = vec4(pos, 0.0, 1.0);
        v = a;
    }
`;

const fragmentShaderSource = (rgb = [1, 0, 0]) => `
    precision mediump float;
    varying float v;
    void main() {
        gl_FragColor = vec4(${rgb.join()}, v);
    }
`;

export const trails = (
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  rgb?: [number, number, number],
) => {
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const createShader = (type: number, source: string): WebGLShader => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Failed to create shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Could not compile WebGL shader. \n\n" ${info}`);
    }
    return shader;
  };
  const createBuffer = () => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    return buffer;
  };
  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource(rgb));
  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    throw new Error("Failed to link program");
  }
  gl.useProgram(program);

  const getLocation = (name: string, size: number) => {
    const location = gl.getAttribLocation(program, name);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    return location;
  };

  const positionLocation = getLocation("pos", 2);
  const timeLocation = getLocation("a", 1);

  const positionBuffer = createBuffer();
  const timeBuffer = createBuffer();

  let positions: number[] = [];
  let fades: number[] = [];
  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    const x = (event.clientX / canvas.width) * 2 - 1;
    const y = (event.clientY / canvas.height) * -2 + 1;

    positions.unshift(x, y);
    fades.unshift(1);
  });

  const render = () => {
    fades = fades.map(fade => {
      return fade / 1.1;
    });
    positions = positions.filter((_, index) => fades[index] > 0.001);
    fades = fades.filter(fade => fade > 0.01);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STREAM_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, timeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fades), gl.STREAM_DRAW);
    gl.vertexAttribPointer(timeLocation, 1, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 2);

    requestAnimationFrame(render);
  };
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  render();
};
