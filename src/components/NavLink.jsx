import { useState } from "react";
import { Link } from "react-router-dom";

function NavLink({path, label = "link"})
{
    const [isClicked, SetIsClicked] = useState(false);

    const mid = Math.floor(label.length / 2);
    const part1 = label.slice(0, mid).toUpperCase();
    const part2 = label.slice(mid).toUpperCase();

    return (
        <Link to={path} className={`w-fit pl-21 pr-21 pt-5 pb-5 flex justify-center border-4 border-graphite-800 overflow-hidden relative group after:content-[''] after:absolute after:top-0 after:-z-10 after:w-[78%] after:h-full after:bg-amber-500 ${isClicked ? "after:left-0" : "after:-left-100"} after:transition-all after:ease-in-out after:duration-300`} onClick={() => SetIsClicked(!isClicked)}>
            <span className={`relative ${isClicked ? "-left-6" : "left-0"} text-4xl text-graphite-800 transition-all before:content-[''] before:bg-graphite-800 before:absolute before:-bottom-0.5 before:w-0 group-hover:before:w-full before:h-[2px] before:transition-all before:ease-in-out before:duration-300`}>{label}</span>
            <span className={`absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 ${isClicked ? "right-6" : "-right-8"} text-4xl transition-all ease-in-out duration-300`}>{part1}</span>
            <span className={`absolute -translate-y-1/2 [writing-mode:sideways-lr] top-1/2 ${isClicked ? "right-0" : "-right-8"} text-4xl transition-all ease-in-out delay-150 duration-300 bg-white leading-7`}>{part2}</span>
        </Link>
    ); 
}

export default NavLink;