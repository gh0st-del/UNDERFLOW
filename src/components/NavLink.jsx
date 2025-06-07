import { Link } from "react-router-dom";

/**
 * Renders a navigation link with customizable label, padding, and font size.
 *
 * @param {Object} props - The properties for the navigation link.
 * @param {string} props.path - The URL path the link navigates to.
 * @param {string} [props.label="link"] - The text displayed for the link.
 * @param {number} [props.fontSize=1] - Font size in `rem` units.
 * @param {number} [props.horizontalPadding=1] - Horizontal padding in `rem` units.
 * @param {boolean} [props.selected=false] - Whether the link is currently selected (used for styling).
 * @param {function} [props.onClick] - Optional click handler for the link.
 * @returns {JSX.Element} A styled and animated navigation link component.
 */
function NavLink({path, label = "link", fontSize = "1rem", horizontalPadding = "1rem", selected = false, onClick})
{
    const mid = Math.floor(label.length / 2);
    const part1 = label.slice(0, mid).toUpperCase();
    const part2 = label.slice(mid).toUpperCase();

    return (
        <Link
            className={`w-fit flex justify-center border-graphite-800 overflow-hidden relative group after:content-[''] after:absolute after:top-0 after:-z-10 after:w-[100%] after:h-full after:bg-amber-500 ${selected ? "after:left-0" : "after:-left-1/1"} after:transition-width after:ease-in-out after:duration-300`} 
            to={path} 
            onClick={onClick}
            style={{
                padding: `calc(0.5 * ${fontSize}) calc(1 * ${fontSize} * ${parseFloat(horizontalPadding)})`,
                borderWidth: `calc(0.18  * ${fontSize})`,
            }}
        >
            <span 
                className={`relative text-graphite-800 transition-[left] before:content-[''] before:bg-graphite-800 before:absolute before:bottom-[clamp(0.125rem,0.107rem+0.09vw,0.25rem)] before:w-0 group-hover:before:w-full before:h-[var(--before-height)] before:transition-width before:ease-in-out before:duration-300`}
                style={{
                    fontSize: `calc(1.5 * ${fontSize})`,
                    "--before-height": `calc(0.122 * ${fontSize})`,
                    left: `${selected ? `calc(-1.0 * ${fontSize})` : "0"}`
                }}
            >
                {label}
            </span>

            <span 
                className={`h-full pr-8 text-center text-graphite-800 absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 transition-[right] ease-in-out duration-300 bg-white leading-4`}
                style={{
                    paddingRight: `calc(1.45 * ${fontSize} * 0.7)`,
                    fontSize: `calc(1.5 * ${fontSize} * 0.7)`,
                    right: `${selected ? `calc(-0.1rem)` : `calc(-20 * ${fontSize})`}`,
                    lineHeight: `calc(1.5 * ${fontSize} * 0.7)`,
                }}
            >
                {part1}
            </span>

            <span 
                className={`h-full text-center text-graphite-800 absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 transition-[right] ease-in-out delay-150 duration-300 bg-white leading-4`}
                style={{
                    fontSize: `calc(1.5 * ${fontSize} * 0.7)`,
                    right: `${selected ? "0" : `calc(-2 * ${fontSize})`}`,
                    lineHeight: `calc(0.85 * ${fontSize})`
                }}
            >
                {part2}
            </span>
        </Link>
    ); 
}

export default NavLink;