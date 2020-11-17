let squareRotation = 0.0;                   // For animation: keep track of how many radians to rotate

const drawScene = (gl, parameters, buffers, deltaTime, texture) => {
    clearScene(gl);
    const projectionMatrix = createProjectionMatrix(gl);

    // set drawing position to "identity" point, e.g., center of the scene
    const modelViewMatrix = glMatrix.mat4.create();

    // move drawing position -6 in Z
    glMatrix.mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [-0.0, 0.0, -6.0]);

    // rotate around Z axis
    glMatrix.mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        squareRotation,
        [0, 0, 1]);

    // rotate around Y axis
    glMatrix.mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        squareRotation * .7,
        [0, 1, 0]);

    squareRotation += deltaTime;

    configurePositionBufferRead(gl, buffers, parameters);
    configureTextureBufferRead(gl, buffers, parameters);

    gl.useProgram(parameters.program);
    setUniforms(gl, parameters,
                projectionMatrix, modelViewMatrix);

    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(parameters.uniformLocations.uSampler, 0);

    // draw the square by rendering indices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}

const clearScene = (gl) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT
             | gl.DEPTH_BUFFER_BIT);
}

// perspective projection
const createProjectionMatrix = (gl) => {
    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth
                   / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = glMatrix.mat4.create();

    glMatrix.mat4.perspective(
        projectionMatrix, fieldOfView,
        aspect, zNear, zFar);
    return projectionMatrix;
}

// Configure how the GPU will consume the position buffer.
const configurePositionBufferRead = (gl, buffers, parameters) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            parameters.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(
            parameters.attribLocations.vertexPosition);
}

// Configure the GPU to consume the color buffer 4 floats per vertex
const configureColorBufferRead = (gl, buffers, parameters) =>   {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffers.color);
    gl.vertexAttribPointer(
        parameters.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        parameters.attribLocations.vertexColor);
}

// Configure the texture buffer to read 2 floating points per fragment
const configureTextureBufferRead = (gl, buffers, parameters) => {
    const num = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(parameters.attribLocations.textureCoord,
                           num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(
        parameters.attribLocations.textureCoord);
}


const setUniforms = (gl, parameters, projectionMatrix, modelViewMatrix) => {
    gl.uniformMatrix4fv(
        parameters.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        parameters.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
}




