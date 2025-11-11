import React from "react";
import { Link } from "react-router-dom";

interface CardBoasVindasProps {
  nome: string;
  diasSemFaltas: number;
  urso: "padrao" | "feliz" | "triste" | "deprimido";
}

const CardBoasVindas: React.FC<CardBoasVindasProps> = ({ nome, diasSemFaltas, urso }) => {
  const ursoSrc = {
    padrao: "src/assets/Urso/UrsoNeutro.png",
    feliz: "src/assets/Urso/UrsoFeliz.png",
    triste: "src/assets/Urso/UrsoTriste.png",
    deprimido: "src/assets/Urso/UrsoDeprimido.png",
  }[urso];

  return (
    <section className="relative flex items-center justify-between bg-[white] rounded-[35px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-[2em] px-[5em] w-[65%] h-[100%] overflow-visible">
      
      <div className="flex flex-col justify-center z-[1]">
        <h2 className="text-[3rem] font-[700] text-[black]">
          Olá, {nome}!
        </h2>
        <p className="text-[1rem] text-[rgba(0,0,0,0.7)] mt-[0.25em] mb-[3em]">
          São {diasSemFaltas} dias sem faltas!
        </p>

        <p className="text-[1rem] text-[black] font-[500] mb-[1em]">
          O que faremos hoje?
        </p>

        <div className="flex gap-[1em] mt-[1em]">
            <Link to="/simulado" className=" no-underline border-none bg-[rgb(163,211,175)] w-[10em] h-[3em] text-[black] font-[600] rounded-[0.5em] hover:opacity-[0.9] transition-all flex items-center justify-center">
                Simulado
            </Link>
            <Link to="/livre" className=" no-underline border-none bg-[rgb(163,211,175)] w-[10em] h-[3em] text-[black] font-[600] rounded-[0.5em] hover:opacity-[0.9] transition-all flex items-center justify-center">
                Livre
            </Link>
        </div>
      </div>

      <div className="absolute right-[10%] top-[-30%] flex justify-center items-start z-[0]">
        <img
          src={ursoSrc}
          alt={`Urso ${urso}`}
          className="w-[23em] object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.2)] select-none"
        />
      </div>
    </section>
  );
};

export default CardBoasVindas;
