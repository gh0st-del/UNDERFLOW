function HoverLink({label = "link", to, newPage = true})
{
    return(
        <a href={to} target={newPage ? "_blank" : "_self"} referrerPolicy="no-referrer">{label}</a>
    );
}

export default HoverLink;