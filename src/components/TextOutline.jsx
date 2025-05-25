import { useEffect, useRef } from "react";

function TextOutline({text})
{
    const textRef = useRef(null);

    useEffect(() =>
    {
        const svg = textRef.current.parentElement;
        let textBBox = textRef.current.getBBox();

        svg.setAttribute("width", textBBox.width);
        svg.setAttribute("height", textBBox.height);
        svg.setAttribute('viewBox', `0 0 ${textBBox.width} ${textBBox.height}`);

        textRef.current.setAttribute('x', -textBBox.x);
        textRef.current.setAttribute('y', "0");
        textBBox = textRef.current.getBBox();
        textRef.current.setAttribute('y', `${-textBBox.y}`);
    },[text]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <text
                ref={textRef}
                fontSize="2rem"
                stroke="black"
                strokeWidth={1}
                fill="none"
            >
                {text}
            </text>
        </svg>
    );
}

export default TextOutline;