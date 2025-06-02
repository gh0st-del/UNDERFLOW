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
            
            void main()
            {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const fragSource =
        `   #version 300 es
            #pragma vscode_glsllint_stage: frag
            precision mediump float;

            out vec4 FragColor;

            void main()
            {
                FragColor = vec4(1.0);
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

        
        const RenderLoop = () =>
        {
            gl.clearColor(0.1, 0.1, 0.1, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
    
            animRequestRef.current = requestAnimationFrame(RenderLoop);
        }

        animRequestRef.current = requestAnimationFrame(RenderLoop);

        return () => cancelAnimationFrame(animRequestRef.current);
    }, []);

    return(
        <canvas
            ref={canvasRef}
            className="block w-full h-full min-h-0"
        ></canvas>
    );

}

export default DotBG;