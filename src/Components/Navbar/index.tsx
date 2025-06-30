import React, { useState } from "react";
import './style.css';
import Logo from "../../assets/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
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

        <div className="logoutArea">
          <button onClick={() => setShowPopup(!showPopup)} className="logoutBtn">
            Sair
          </button>

          {showPopup && (
            <div className="logoutPopup">
              <p>Deseja mesmo sair?</p>
              <div className="popupButtons">
                <button onClick={() => setShowPopup(false)}>Cancelar</button>
                <button onClick={handleLogout}>Sair</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
