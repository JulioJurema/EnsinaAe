import React from "react";
import './style.css';
import { Link } from "react-router-dom";


const Navbar: React.FC = () =>{
    return(
        <nav className="navbarContainer">
            <Link to='/'>Dashboard</Link>
            <Link to='/simulado'>Simulado</Link>
            <Link to='/livre'>Livre</Link>
        </nav>
    )
}

export default Navbar