import { useEffect, useRef } from "react";

function DotBG({width = "128px", height = "128px", dotColor = "rgb(255, 255, 255)", bgColor = "rgb(0, 0, 0)", gridSize = 10, offset = 0.5, radius = 0.5, animSpeed = 1})
{
    const canvasRef = useRef(null);
    const animRequestRef = useRef(null);

    const [dotColorR, dotColorG, dotColorB] = dotColor.slice(4, -1).split(',').map(value => Number(value));
    const [bgColorR, bgColorG, bgColorB] = bgColor.slice(4, -1).split(',').map(value => Number(value));

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
                gl_Position = vec4(aPosition, 0.0, 1.0);

                vTexCoord = aTexCoord;
            }
        `;

        const fragSource =
        `   #version 300 es
            #pragma vscode_glsllint_stage: frag
            precision mediump float;

            in vec2 vTexCoord;

            out vec4 FragColor;

            uniform vec3 uDotColor;
            uniform vec3 uBgColor;
            uniform int uGridSize;
            uniform float uOffset;
            uniform float uRadius;
            uniform float uAnimSpeed;

            void main()
            {
                float mask = mod(floor(vTexCoord.x * float(uGridSize)), 2.0) - 0.5;
                vec2 grid = fract(vTexCoord * float(uGridSize) + vec2(0.0, mask * uOffset * uAnimSpeed)) * 2.0 - 1.0;

                float dist = length(grid) - uRadius;
                float edge = fwidth(dist);
                float circle = 1.0 - smoothstep(-edge, edge, dist);

                FragColor = vec4(mix(mix(uBgColor, uDotColor, circle), uBgColor, 1.0 - vTexCoord.x * vTexCoord.x), 1.0);
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

        gl.uniform3f(gl.getUniformLocation(shaderProgram, "uDotColor"), dotColorR / 255, dotColorG / 255, dotColorB / 255);
        gl.uniform3f(gl.getUniformLocation(shaderProgram, "uBgColor"), bgColorR / 255, bgColorG / 255, bgColorB / 255);
        gl.uniform1i(gl.getUniformLocation(shaderProgram, "uGridSize"), gridSize);
        gl.uniform1f(gl.getUniformLocation(shaderProgram, "uOffset"), offset);
        gl.uniform1f(gl.getUniformLocation(shaderProgram, "uRadius"), radius);

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
            const time = performance.now() * 0.005;
            gl.uniform1f(gl.getUniformLocation(shaderProgram, "uAnimSpeed"), time * animSpeed);

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
        }

        animRequestRef.current = requestAnimationFrame(RenderLoop);

        window.addEventListener("resize", ResizeCallback);
        ResizeCallback();

        return () => 
        {
            cancelAnimationFrame(animRequestRef.current);
            window.removeEventListener("resize", ResizeCallback);
        }
    }, [width, height, dotColor, bgColor, gridSize, offset, radius, animSpeed]);

    return(
        <canvas
            ref={canvasRef}
            className="block min-h-0"
            style={{
                width: width,
                height: height
            }}
        ></canvas>
    );

}

export default DotBG;