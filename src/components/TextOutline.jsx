import { useLayoutEffect } from "react";
import { useRef, useState } from "react";

/**
 * Renders text with an outline.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.text - Text content to display. Use `\n` to indicate line breaks; the component will render each line separately. 
 * @param {number} props.fontSize - Font size in `rem` units.
 * @param {number|string} props.fontWeight - Font weight of the text (e.g., `normal`, `bold`, `400`, `700`).
 * @param {number} props.outlineWidth - Outline width in `px`.
 * @param {string} props.outlineColor - Color of the text outline (CSS color string).
 */
function TextOutline({text, fontSize, fontWeight, outlineWidth, outlineColor})
{
    const [height, SetHeight] = useState(0);
    const textRef = useRef(null);
    const offset = useRef(null);

    const lines = text.split("\n");

    useLayoutEffect(() => 
    {
        const svg = textRef.current.parentElement;
        const textElement = textRef.current;

        const firstLineBBox = textElement.firstChild.getBBox();
        SetHeight(firstLineBBox.height);

        if (!offset.current)
        {
            offset.current = firstLineBBox.y;
            console.log(offset.current);
        }

        let maxWidth = 0;
        const children = Array.from(textElement.children);
        for (const child of children)
        {
            const bbox = child.getBBox();
            if (bbox.width > maxWidth)
            {
                maxWidth = bbox.width;
            }
        }

        const lineHeight = firstLineBBox.height;
        const totalHeight = lineHeight * lines.length;
        svg.setAttribute("width", maxWidth);
        svg.setAttribute("height", totalHeight);
        svg.setAttribute("viewBox", `0 0 ${maxWidth} ${totalHeight}`);
    }, [text, fontSize, outlineWidth, outlineColor, fontWeight]);


    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <text
                ref={textRef}
                fontSize={`${fontSize}rem`}
                fontWeight={fontWeight}
                stroke={outlineColor}
                strokeWidth={outlineWidth}
                fill="none"
            >
                {lines.map((line, i) => <tspan key={i} x={0} y={i === 0 ? -offset.current : height * i - offset.current}>{line}</tspan>)}
            </text>
        </svg>
    );
}

export default TextOutline;