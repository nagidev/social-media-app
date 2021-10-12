import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({brand, token, signout}) => {
    return (
        <nav className="navbar bg-transparent flex-row" >
            <brand className="brand"><h1>{brand}</h1></brand>
            <NavLink to="/" className={`btn bg-transparent ${token?"visible":"hidden"}`}>Home</NavLink>
            <NavLink to="/messages" className={`btn bg-transparent ${token?"visible":"hidden"}`}>Messages</NavLink>
            <NavLink to="/profile" className={`btn bg-transparent ${token?"visible":"hidden"}`}>Profile</NavLink>
            <div className="flex-grow"></div>
            <button onClick={signout} className={`btn bg-dark ${token?"visible":"hidden"}`}>Sign Out</button>
        </nav>
    );
};

export default Navbar;