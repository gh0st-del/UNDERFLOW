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

            uniform vec2 uResolution;
            uniform vec3 uDotColor;
            uniform vec3 uBgColor;
            uniform int uGridSize;
            uniform float uOffset;
            uniform float uRadius;
            uniform float uAnimSpeed;
            uniform vec2 uMousePos;

            void main()
            {
                vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
                float aspect = uResolution.x / uResolution.y;
                uv *= (aspect < 1.0) ? vec2(aspect, 1.0) : vec2(1.0, 1.0 / aspect);

                vec2 origin = (uMousePos / uResolution) * 2.0 - 1.0;
                origin *= (aspect < 1.0) ? vec2(aspect, 1.0) : vec2(1.0, 1.0 / aspect);
                uv -= origin;

                float width = 0.2;
                float height = 1.0;
                float bump = exp(-length(uv) / width) * height + 1.0;
                uv /= bump;
                
                float mask = mod(floor((uv.x + origin.x) * float(uGridSize)), 2.0) - 0.5;
                vec2 grid = fract((uv + origin) * float(uGridSize) + vec2(0.0, mask * uOffset * uAnimSpeed)) * 2.0 - 1.0;
                
                float dist = length(grid) - uRadius;
                float edge = fwidth(dist);
                float circle = 1.0 - smoothstep(-edge, edge, dist);

                float light = exp(-length(uv) * length(uv) / width);
                FragColor = vec4(mix(uBgColor, mix(uDotColor * 0.08, uDotColor, light), circle), 1.0);
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
        gl.uniform2f(gl.getUniformLocation(shaderProgram, "uOrigin"), 0.0, 0.0);
        gl.uniform2f(gl.getUniformLocation(shaderProgram, "uMousePos"), -10000.0, -10000.0);

        const vertices = new Float32Array([
            -1.0,  1.0,
            -1.0, -1.0,
             1.0, -1.0,
             1.0,  1.0    
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
        gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 2, 0);
        gl.enableVertexAttribArray(aPositionLoc);
        
        const RenderLoop = () =>
        {
            const time = performance.now() * 0.005;
            gl.uniform1f(gl.getUniformLocation(shaderProgram, "uAnimSpeed"), time * animSpeed);

            gl.clearColor(0.1, 0.1, 0.1, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    
            animRequestRef.current = requestAnimationFrame(RenderLoop);
        }
        animRequestRef.current = requestAnimationFrame(RenderLoop);

        const ResizeCallback = () =>
        {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
            gl.uniform2f(gl.getUniformLocation(shaderProgram, "uResolution"), canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        }
        ResizeCallback();

        const MouseMoveCallback = (event) =>
        {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            gl.uniform2f(gl.getUniformLocation(shaderProgram, "uMousePos"), x, rect.height - y);
        }
        
        window.addEventListener("resize", ResizeCallback);
        window.addEventListener("mousemove", MouseMoveCallback);
        window.addEventListener("mouseenter", MouseMoveCallback);

        return () => 
        {
            cancelAnimationFrame(animRequestRef.current);
            window.removeEventListener("resize", ResizeCallback);
            window.removeEventListener("mousemove", MouseMoveCallback);
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