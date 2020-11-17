const main = () => {
    const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl");

    // initialize a GLSL program
    const shaderProgram = initializeShaderProgram(gl);
    const parameters = getProgramParameters(gl, shaderProgram);   // fetch the attributes and uniforms
    const buffers = initializeBuffers(gl);

    const texture = loadTexture(gl, 'rubics.png');

    // animation
    let then = 0;
    function render(now) {
        now *= 0.001;
        const deltaTime = now - then;
        then = now;

        drawScene(gl, parameters, buffers, deltaTime, texture);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
