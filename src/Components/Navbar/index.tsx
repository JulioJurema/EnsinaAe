import React from "react";
import './style.css';
import Logo from "../../assets/Logo.png"
import { NavLink } from "react-router-dom";


const Navbar: React.FC = () =>{
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
                    <div className="navDiv2">
                    <NavLink to='/ajustes' className={({ isActive }) => isActive ? 'navItens navActive' : 'navItens'}>Ajustes</NavLink>
                    <NavLink to='/sobre' className={({ isActive }) => isActive ? 'navItens navActive' : 'navItens'}>Sobre</NavLink>
                    </div>
                </div>
                <div className="logout">
                    <p>sair</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar