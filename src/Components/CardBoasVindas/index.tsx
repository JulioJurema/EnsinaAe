import React from "react";


interface CardBoasVindasProps {
  nome: string;
  diasSemFaltas: number;
  urso: "padrao" | "feliz" | "triste" | "deprimido"; // você pode ajustar os nomes conforme quiser
}

const CardBoasVindas: React.FC<CardBoasVindasProps> = ({ nome, diasSemFaltas, urso }) => {
  // Define o caminho da imagem com base na prop
  const ursoSrc = {
    padrao: "src/assets/Urso/UrsoNeutro.png",
    feliz: "src/assets/Urso/UrsoFeliz.png",
    triste: "src/assets/Urso/UrsoTriste.png",
    deprimido: "src/assets/Urso/UrsoDeprimido.png",
  }[urso];

  return (
    <section className="flex items-center justify-between bg-[white] rounded-[35px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-[2em] px-[5em] w-[65%] h-[100%]">
      
      {/* Texto à esquerda */}
      <div className="flex flex-col justify-center">
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
          <button className="border-none bg-[rgb(163,211,175)] w-[10em] h-[3em] text-[black] font-[600] rounded-[0.5em] hover:opacity-[0.9] transition-all">
            Simulado
          </button>
          <button className="border-none bg-[rgb(163,211,175)] w-[10em] h-[3em] text-[black] font-[600] rounded-[0.5em] hover:opacity-[0.9] transition-all">
            Livre
          </button>
        </div>
      </div>

      {/* Imagem do urso à direita */}
      <div className="w-[40%] h-[100%] flex justify-center items-center">
        <img
          src={ursoSrc}
          alt={`Urso ${urso}`}
          className="w-[200px] max-w-[100%] object-contain"
        />
      </div>
    </section>
  );
};

export default CardBoasVindas;
