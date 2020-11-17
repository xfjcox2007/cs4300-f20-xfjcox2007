const initializeShaderProgram = (gl) => {
    const vertexShaderCode = document.getElementById("vertex-shader").textContent
    const fragmentShaderCode = document.getElementById("fragment-shader").textContent

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

    // create the shader program
    const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

    return shaderProgram;
}

// send the source to the shader object and compile the shader program
const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

    return shader;
}

// grab all the attributes and uniforms from the GLSL program and keep them all in a JSON objects
const getProgramParameters = (gl, shaderProgram) => {
    return {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };
}

