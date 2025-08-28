import React, { useState } from "react";
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
    <nav className="h-full w-[15em] flex flex-col shadow-[0px_7px_29px_-4px_rgba(0,0,0,0.25)] p-[1em]">
      <img src={Logo} alt="Logo do site" className="h-auto mt-[5vh] mb-[10vh] mx-[0.5em]" />

      <div className="flex flex-col justify-between h-[90%]">
        <div className="flex flex-col ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-8 py-2 mb-1 rounded no-underline rounded-[5px] transition duration-200 ${
                isActive
                  ? 'bg-[var(--verde-primario)] text-[var(--texto-preto-primario)] font-semibold p-[0.5em]'
                  : 'text-[var(--texto-preto-primario)] hover:bg-[var(--verde-select)] p-[0.5em]'
              }`
            }
          >
            Dashboard
          </NavLink>

          <div className="flex flex-col my-2 py-5 border-y border-[#c0c0c0] mt-[0.5em] mb-[0.5em] pt-[0.5em]">
            <NavLink
              to="/simulado"
              className={({ isActive }) =>
                `px-8 py-2 mb-1 rounded no-underline rounded-[5px] mb-[0.5em] transition duration-200 ${
                  isActive
                    ? 'bg-[var(--verde-primario)] text-[var(--texto-preto-primario)] font-semibold p-[0.5em]'
                    : 'text-[var(--texto-preto-primario)] hover:bg-[var(--verde-select)] p-[0.5em]'
                }`
              }
            >
              Simulado
            </NavLink>
            <NavLink
              to="/livre"
              className={({ isActive }) =>
                `px-8 py-2 mb-1 rounded no-underline rounded-[5px] mb-[0.5em] transition duration-200 ${
                  isActive
                    ? 'bg-[var(--verde-primario)] text-[var(--texto-preto-primario)] font-semibold p-[0.5em]'
                    : 'text-[var(--texto-preto-primario)] hover:bg-[var(--verde-select)] p-[0.5em]'
                }`
              }
            >
              Livre
            </NavLink>
          </div>

          <div className="flex flex-col">
            <NavLink
              to="/ajustes"
              className={({ isActive }) =>
                `px-8 py-2 mb-1 rounded no-underline rounded-[5px] mb-[0.5em] transition duration-200 ${
                  isActive
                    ? 'bg-[var(--verde-primario)] text-[var(--texto-preto-primario)] font-semibold p-[0.5em]'
                    : 'text-[var(--texto-preto-primario)] hover:bg-[var(--verde-select)] p-[0.5em]'
                }`
              }
            >
              Ajustes
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                `px-8 py-2 mb-1 rounded no-underline rounded-[5px] mb-[0.5em] transition duration-200 ${
                  isActive
                    ? 'bg-[var(--verde-primario)] text-[var(--texto-preto-primario)] font-semibold p-[0.5em]'
                    : 'text-[var(--texto-preto-primario)] hover:bg-[var(--verde-select)] p-[0.5em]'
                }`
              }
            >
              Sobre
            </NavLink>
          </div>
        </div>

        <div className="relative inline-block border-t border-[#c0c0c0] pt-[1em]">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="w-full border-none font-[600] text-[1em] text-left px-8 py-2 mb-1 no-underline rounded-[5px] text-[var(--texto-preto-primario)] hover:bg-[var(--vermelho-select)] transition duration-200 p-[0.5em] ">
            Sair
          </button>

          {showPopup && (
            <div className="absolute bottom-full left-0 mb-2 bg-white p-4 border border-gray-300 rounded-lg shadow-lg z-20 min-w-[160px]">
              <p className="mb-2 text-sm text-gray-800">Deseja mesmo sair?</p>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-3 py-1 rounded bg-gray-300 text-black font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-[var(--vermelho-select)] text-white font-medium hover:bg-[var(--vermelho-secundario)]"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
