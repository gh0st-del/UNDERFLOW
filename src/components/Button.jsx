import { useLayoutEffect, useRef } from "react";

function Button({label = "button", onClick, hpad = "10px", wpad = "5px", primaryCol = "white", secondaryCol = "black", borderWidth = "2px", radius = "4px", fontWeight = "bold"})
{
    const circleRef = useRef(null);
    const buttonRef = useRef(null);

    useLayoutEffect(() =>
    {
        const MouseMoveCallback = (event) =>
        {
            const svg = circleRef.current.parentElement;
            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            circleRef.current.setAttribute("cx", x);
            circleRef.current.setAttribute("cy", y);
        }

        buttonRef.current.addEventListener("mousemove", MouseMoveCallback);

    }, []);

    return(
        <button 
            ref={buttonRef}
            className="font-bold cursor-pointer relative"
            style={{
                padding: `${wpad} ${hpad}`,
                borderWidth: borderWidth,
                borderColor: secondaryCol,
                borderRadius: radius,
                color: secondaryCol,
                fontWeight: fontWeight,
                backgroundColor: primaryCol
            }}
            onClick={onClick}
        >
            <span>{label}</span>
            <svg
                className="absolute top-0 left-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    ref={circleRef}
                    r="10" 
                    fill={secondaryCol} />
            </svg>
        </button>
    );
}

export default Button;