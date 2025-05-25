function TextOutline({text})
{
    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <text
                fontSize="2rem"
                stroke="black"
                strokeWidth={1}
                fill="none"
                dominantBaseline="hanging"
            >
                {text}
            </text>
        </svg>
    );
}

export default TextOutline;