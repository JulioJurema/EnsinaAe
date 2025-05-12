import React from "react";
import './style.css';
import Logo from "../../assets/Logo.png"
import { Link } from "react-router-dom";


const Navbar: React.FC = () =>{
    return(
        <nav className="navbarContainer">
            <img src={Logo} alt="Logo do site" />
            <div className="navArea">
                <div className="navButtons">
                    <Link to='/'>Dashboard</Link>
                    <Link to='/simulado'>Simulado</Link>
                    <Link to='/livre'>Livre</Link>
                </div>
                <div>
                    <p>sair</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar