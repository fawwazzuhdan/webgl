(function(global) {

  var canvas, gl, program;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Register Callbacks
    window.addEventListener('resize', resizer);

    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    resizer();
  }

  // draw!
  function draw() {
    // Write the positions of vertices to a vertex shader
    var n = initBuffersLine(gl);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw a line
    gl.drawArrays(gl.LINE_LOOP, 0, n);
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, n);

    var m = initBuffersTriangle1(gl);
    if (m < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, m);

    var o = initBuffersTriangle2(gl);
    if (o < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, o);
  }

  function initBuffersLine() {
    var vertices = new Float32Array([
      -0.46, +0.43,  -0.27, +0.43,
      -0.27, +0.35,   -0.4, +0.35,
      -0.4, +0.25,  -0.32, +0.25,
      -0.32, +0.17, -0.4, +0.17,
      -0.4, +0.0,  -0.46, +0.0,
    ]);
    // The number of vertices
    var n = 10;
    // var n = 4;
    // var n = 5;
    // var n = 6;
    // var n = 7;

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    // target: ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    // target, size
    // usage: STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    // Assign the buffer object to aPosition variable
    // https://www.khronos.org/opengles/sdk/docs/man/xhtml/glVertexAttribPointer.xml
    // index, size, type, normalized, stride, pointer
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to aPosition variable
    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function initBuffersTriangle1() {
    var vertices = new Float32Array([
      +0.1, +0.25,  +0.18, +0.25,
      +0.18, +0.17, +0.1, +0.17,
    ]);
    // The number of vertices
    var n = 4;
    // var n = 4;
    // var n = 5;
    // var n = 6;
    // var n = 7;

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    // target: ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    // target, size
    // usage: STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    // Assign the buffer object to aPosition variable
    // https://www.khronos.org/opengles/sdk/docs/man/xhtml/glVertexAttribPointer.xml
    // index, size, type, normalized, stride, pointer
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to aPosition variable
    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function initBuffersTriangle2() {
    var vertices = new Float32Array([
      +0.04, +0.43,  +0.23, +0.43,
      +0.23, +0.35, +0.1, 0.35,
      +0.1, +0.0,   +0.04, +0.0,
    ]);
    // The number of vertices
    var n = 6;
    // var n = 4;
    // var n = 5;
    // var n = 6;
    // var n = 7;

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    // target: ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    // target, size
    // usage: STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    // Assign the buffer object to aPosition variable
    // https://www.khronos.org/opengles/sdk/docs/man/xhtml/glVertexAttribPointer.xml
    // index, size, type, normalized, stride, pointer
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to aPosition variable
    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }

})(window || this);
