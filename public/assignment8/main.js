const main = () => {
    const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl");

    // initialize a GLSL program
    const shaderProgram = initializeShaderProgram(gl);
    const parameters = getProgramParameters(gl, shaderProgram);   // fetch the attributes and uniforms
    const buffers = initializeBuffers(gl);

    drawScene(gl, parameters, buffers)
}
