import { useEffect, useRef } from "react";

function DotBG()
{
    const canvasRef = useRef(null);
    const animRequestRef = useRef(null);

    useEffect(() =>
    {
        /**@type {WebGL2RenderingContext}*/
        const gl = canvasRef.current.getContext("webgl2");
        if (!gl)
        {
            console.error("WebGL2 is not supported in this browser.");
        }

        const vertSource = 
        `   #version 300 es
            #pragma vscode_glsllint_stage: vert
            precision mediump float;

            in vec2 aPosition;
            in vec2 aTexCoord;

            out vec2 vTexCoord;
            
            void main()
            {
                gl_Position = vec4(aPosition * 0.5, 0.0, 1.0);

                vTexCoord = aTexCoord;
            }
        `;

        const fragSource =
        `   #version 300 es
            #pragma vscode_glsllint_stage: frag
            precision mediump float;

            in vec2 vTexCoord;

            out vec4 FragColor;

            void main()
            {
                FragColor = vec4(vTexCoord, 0.0, 1.0);
            }
        `;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
        {
            const infoLog = gl.getShaderInfoLog(vertexShader);
            console.error("Vertex Shader Compilation Error: " + infoLog);
        }

        const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragSource);
        gl.compileShader(fragShader);

        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
        {
            const infoLog = gl.getShaderInfoLog(fragShader);
            console.error("Fragment Shader Compilation Error: " + infoLog);
        }

        const shaderProgram = gl.createProgram()
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
        {
            const infoLog = gl.getProgramInfoLog(shaderProgram);
            console.error("Shader Program Linking Error: " + infoLog);
        }

        gl.detachShader(shaderProgram, vertexShader);
        gl.detachShader(shaderProgram, fragShader);

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragShader);

        gl.useProgram(shaderProgram);

        const vertices = new Float32Array([
            -1.0,  1.0,     0.0, 1.0,
            -1.0, -1.0,     0.0, 0.0,
             1.0, -1.0,     1.0, 0.0,
             1.0,  1.0,     1.0, 1.0
        ]);

        const indices = new Uint16Array([
            0, 1, 2,
            2, 3, 0
        ]);

        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);

        const VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        const aPositionLoc = gl.getAttribLocation(shaderProgram, "aPosition");
        gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 4, 0);
        gl.enableVertexAttribArray(aPositionLoc);

        const aTexCoordLoc = gl.getAttribLocation(shaderProgram, "aTexCoord");
        gl.vertexAttribPointer(aTexCoordLoc, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 4, vertices.BYTES_PER_ELEMENT * 2);
        gl.enableVertexAttribArray(aTexCoordLoc);
        
        const RenderLoop = () =>
        {
            gl.clearColor(0.1, 0.1, 0.1, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    
            animRequestRef.current = requestAnimationFrame(RenderLoop);
        }

        const ResizeCallback = () =>
        {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);

            console.log(canvasRef.current.width);
            console.log(canvasRef.current.height);
        }

        animRequestRef.current = requestAnimationFrame(RenderLoop);

        window.addEventListener("resize", ResizeCallback);
        ResizeCallback();

        return () => 
        {
            cancelAnimationFrame(animRequestRef.current);
            window.removeEventListener("resize", ResizeCallback);
        }
    }, []);

    return(
        <canvas
            ref={canvasRef}
            className="block w-full h-full min-h-0"
        ></canvas>
    );

}

export default DotBG;