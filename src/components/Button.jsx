function Button({label = "button", onClick, hpad = "10px", wpad = "5px", primaryCol = "white", secondaryCol = "black", borderWidth = "2px", radius = "4px", fontWeight = "bold"})
{

    return(
        <button 
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
                    cx="0" 
                    cy="0"
                    r="10" 
                    fill={secondaryCol} />
            </svg>
        </button>
    );
}

export default Button;