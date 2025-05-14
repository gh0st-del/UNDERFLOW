import { Link } from "react-router-dom";

function NavLink({path, label, width, fontSize})
{
    return (
        <Link to={path} className="w-fit pl-21 pr-21 pt-5 pb-5 flex justify-center border-4 border-graphite-800 group">
            <div className="relative">
                <span className="text-4xl text-graphite-800 before:content-[''] before:bg-graphite-800 before:absolute before:-bottom-0.5 before:w-0 group-hover:before:w-full before:h-[2px] before:inline-block before:transition-all">{label}</span>
            </div>
        </Link>
    ); 
}

export default NavLink;