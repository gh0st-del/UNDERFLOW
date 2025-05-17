import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Renders a navigation link with customizable label, padding, and font size.
 *
 * @param {Object} props - The properties for the navigation link.
 * @param {string} props.path - The URL path the link navigates to.
 * @param {string} [props.label="link"] - The text displayed for the link.
 * @param {number} [props.fontSize=1] - Font size in `rem` units.
 * @param {number} [props.horizontalPadding=1] - Horizontal padding in `rem` units.
 * @returns {JSX.Element} A styled and animated navigation link component.
 */
function NavLink({path, label = "link", fontSize = 1, horizontalPadding = 1})
{
    const [isClicked, SetIsClicked] = useState(false);

    const mid = Math.floor(label.length / 2);
    const part1 = label.slice(0, mid).toUpperCase();
    const part2 = label.slice(mid).toUpperCase();

    return (
        <Link
            className={`w-fit flex justify-center border-graphite-800 overflow-hidden relative group after:content-[''] after:absolute after:top-0 after:-z-10 after:w-[100%] after:h-full after:bg-amber-500 ${isClicked ? "after:left-0" : "after:-left-1/1"} after:transition-all after:ease-in-out after:duration-300`} 
            to={path} 
            onClick={() => SetIsClicked(!isClicked)}
            style={{
                padding: `calc(0.5rem * ${fontSize}) calc(1rem * ${fontSize} * ${horizontalPadding})`,
                borderWidth: `calc(3px * ${fontSize})`,
            }}
        >
            <span 
                className={`relative text-graphite-800 transition-all before:content-[''] before:bg-graphite-800 before:absolute before:bottom-1 before:w-0 group-hover:before:w-full before:h-[var(--before-height)] before:transition-all before:ease-in-out before:duration-300`}
                style={{
                    fontSize: `calc(1.5rem * ${fontSize})`,
                    "--before-height": `calc(2px * ${fontSize})`,
                    left: `${isClicked ? `calc(1.0rem * ${-fontSize})` : "0"}`
                }}
            >
                {label}
            </span>

            <span 
                className={`h-full pr-8 text-center absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 transition-all ease-in-out duration-300 bg-white leading-4`}
                style={{
                    paddingRight: `calc(1.45rem * ${fontSize * 0.7})`,
                    fontSize: `calc(1.5rem * ${fontSize * 0.7})`,
                    right: `${isClicked ? `calc(0rem * ${fontSize} - 0.1rem)` : `calc(2rem * ${-fontSize})`}`,
                    lineHeight: `calc(1.5rem * ${fontSize * 0.7})`,
                }}
            >
                {part1}
            </span>

            <span 
                className={`h-full text-center absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 transition-all ease-in-out delay-150 duration-300 bg-white leading-4`}
                style={{
                    fontSize: `calc(1.5rem * ${fontSize * 0.7})`,
                    right: `${isClicked ? "0" : `calc(2rem * ${-fontSize})`}`,
                    lineHeight: `calc(1rem * ${fontSize})`
                }}
            >
                {part2}
            </span>
        </Link>
    ); 
}

export default NavLink;