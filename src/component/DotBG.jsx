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