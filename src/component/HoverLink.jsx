function HoverLink({label = "link", to, newPage = true, textColor = "blue", fontWeight = "normal", bgColor = "black", radius = "0px"})
{
    return(
        <a 
                className="relative after:content-[''] after:w-0 hover:after:w-full after:h-1 hover:after:h-full after:bg-[var(--after-bg)] after:rounded-[var(--after-radius)] after:-z-1 after:absolute after:bottom-0 after:left-0 after:transition-[width,height] after:delay-[0ms,150ms]"
            style={{
                "--after-bg": bgColor,
                "--after-radius": radius,

                padding: `${(1 / parseFloat(radius)) + 2}px`,
                fontWeight: fontWeight,
                color: textColor,
            }}
            href={to} 
            target={newPage ? "_blank" : "_self"} 
            referrerPolicy="no-referrer"
        >
            {label}
        </a>
    );
}

export default HoverLink;