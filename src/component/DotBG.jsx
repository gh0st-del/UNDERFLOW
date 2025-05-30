import { useRef } from "react";

function DotBG()
{
    const canvasRef = useRef(null);

    return(
        <canvas
            ref={canvasRef}
            className="block w-full h-full min-h-0"
        ></canvas>
    );

}

export default DotBG;