function Button({label = "button", onClick})
{
    return(
        <button 
            className="font-bold border-2 border-black rounded-sm cursor-pointer px-5 py-2 bg-gray-300"
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;