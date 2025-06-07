import { useEffect, useRef } from "react";

function Button({label = "button", onClick})
{
    return(
        <button 
            className="font-bold border-2 border-black rounded-sm cursor-pointer px-5 py-2 relative"
            onClick={onClick}
        >
            <span className="z-1">{label}</span>
        </button>
    );
}

export default Button;