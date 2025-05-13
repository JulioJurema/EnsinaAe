import React from "react";
import './style.css';
import Logo from "../../assets/Logo.png"
import { NavLink } from "react-router-dom";

interface navProps{
    isActive: boolean;
}


const Navbar: React.FC<navProps> = () =>{
    return(
        <nav className="navbarContainer">
            <img src={Logo} alt="Logo do site" />
            <div className="navArea">
                <div className="navButtons">
                        <NavLink to='/' className={({ isActive }) => isActive ? 'navItens navActive' : 'navItens'}>Dashboard</NavLink>
                    <div className="navDiv1">
                        <NavLink to='/simulado' className={({ isActive }) => isActive ? 'navItens navActive' : 'navItens'}>Simulado</NavLink>
                        <NavLink to='/livre' className={({ isActive }) => isActive ? 'navItens navActive' : 'navItens'}>Livre</NavLink>
                    </div>
                    
                </div>
                <div>
                    <p>sair</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar