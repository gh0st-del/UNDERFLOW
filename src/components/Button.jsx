import { useLayoutEffect, useRef, useState } from "react";

function Button({label = "button", hpad = "10px", wpad = "5px", primaryCol = "white", secondaryCol = "black", borderWidth = "2px", round = "4px", fontWeight = "bold", animDur = "500ms", onClick})
{
    const circleRef = useRef(null);
    const buttonRef = useRef(null);

    const [radius, setRadius] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [ratio, setRatio] = useState(0);

    useLayoutEffect(() =>
    {
        const rect = buttonRef.current.getBoundingClientRect();
        setRatio((rect.width / rect.height) * 2.5);

        const MouseMoveCallback = (event) =>
        {
            const svg = circleRef.current.parentElement;
            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setX(x);
            setY(y);
            circleRef.current.setAttribute("cx", x);
            circleRef.current.setAttribute("cy", y);
        };

        setRadius(buttonRef.current.getBoundingClientRect().height / 2);

        buttonRef.current.addEventListener("mouseenter", MouseMoveCallback);
    }, []);

    return(
        <button 
            ref={buttonRef}
            className="font-bold cursor-pointer relative transition-colors z-0"
            style={{
                padding: `${hpad} ${wpad}`,
                borderWidth: borderWidth,
                borderColor: secondaryCol,
                borderRadius: round,
                color: isAnimating ? primaryCol : secondaryCol,
                fontWeight: fontWeight,
                backgroundColor: primaryCol,
                transitionDuration: animDur
            }}
            onClick={onClick}
            onMouseEnter={() => setIsAnimating(true)}
            onMouseLeave={() => setIsAnimating(false)}
        >
            <span className="z-2">{label}</span>
            <svg
                className="absolute top-0 left-0 w-full h-full -z-1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className="transition-transform"
                    ref={circleRef}
                    r={radius}
                    fill={secondaryCol}
                    style={{
                        transform: isAnimating ? `scale(${ratio})` : `scale(0)`,
                        transformOrigin: `${x}px ${y}px`,
                        transitionDuration: animDur
                    }}
                />
            </svg>
        </button>
    );
}

export default Button;