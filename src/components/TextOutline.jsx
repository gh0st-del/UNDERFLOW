import { useEffect, useRef } from "react";

/**
 * Renders text with an outline.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.text - The text content to display.
 * @param {number} props.fontSize - Font size in `rem` units.
 * @param {number} props.outlineWidth - Outline width in `px`.
 * @param {string} props.outlineColor - Color of the text outline (CSS color string).
 */
function TextOutline({text, fontSize, outlineWidth, outlineColor})
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
    },[text, fontSize, outlineWidth, outlineColor]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <text
                ref={textRef}
                fontSize={fontSize}
                stroke={outlineColor}
                strokeWidth={outlineWidth}
                fill="none"
            >
                {text}
            </text>
        </svg>
    );
}

export default TextOutline;