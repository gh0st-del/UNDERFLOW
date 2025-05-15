import { useState } from "react";
import { Link } from "react-router-dom";

function NavLink({path, label = "link", size = 1})
{
    const [isClicked, SetIsClicked] = useState(false);

    const mid = Math.floor(label.length / 2);
    const part1 = label.slice(0, mid).toUpperCase();
    const part2 = label.slice(mid).toUpperCase();

    return (
        <Link to={path} className={`w-fit pl-11 pr-11 pt-2 pb-2 flex justify-center border-graphite-800 overflow-hidden relative group after:content-[''] after:absolute after:top-0 after:-z-10 after:w-[78%] after:h-full after:bg-amber-500 ${isClicked ? "after:left-0" : "after:-left-100"} after:transition-all after:ease-in-out after:duration-300`} onClick={() => SetIsClicked(!isClicked)}
        style={{
            padding: `calc(0.5rem * ${size}) calc(2.75rem * ${size})`,
            borderWidth: `calc(3px * ${size})`,
        }}>
            <span className={`relative text-graphite-800 transition-all before:content-[''] before:bg-graphite-800 before:absolute before:bottom-1 before:w-0 group-hover:before:w-full before:h-[var(--before-height)] before:transition-all before:ease-in-out before:duration-300`}
            style={{
                fontSize: `calc(1.5rem * ${size})`,
                "--before-height": `calc(2px * ${size})`,
                left: `${isClicked ? `calc(1.0rem * ${-size})` : "0"}`
            }}>{label}</span>
            <span className={`absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 ${isClicked ? "right-3" : "-right-8"} transition-all ease-in-out duration-300`}
            style={{
                fontSize: `calc(1.5rem * ${size * 0.7})`,
                right: `${isClicked ? `calc(0.75rem * ${size})` : `calc(2rem * ${-size})`}`
            }}>{part1}</span>
            <span className={`absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 ${isClicked ? "right-0" : "-right-8"} transition-all ease-in-out delay-150 duration-300 bg-white leading-4`}
            style={{
                fontSize: `calc(1.5rem * ${size * 0.7})`,
                right: `${isClicked ? "0" : `calc(2rem * ${-size})`}`,
                lineHeight: `calc(1rem * ${size})`
            }}>{part2}</span>
        </Link>
    ); 
}

export default NavLink;