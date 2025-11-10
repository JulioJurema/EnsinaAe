import React from "react";

interface CardListagemDiscProps {
  pos1: string;
  pos2: string;
  pos3: string;
  pos4: string;
  pos5: string;
}

const CardListagemDisc: React.FC<CardListagemDiscProps> = (posicoes) => {
  return (
    <section className="bg-[white] rounded-[35px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-[3em] w-[30%]">
      <h2 className="text-[1.5rem] font-[600] mb-[1em] text-[black] mb-[2em]">
        Ranking de desempenho
      </h2>

      <ul className="flex flex-col gap-[0.5em]">
        <li className="flex items-center gap-[0.75em] bg-[white] border border-[rgba(0,0,0,0.1)] rounded-[0.5em] px-[1em] py-[0.5em] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <span className="font-[700] text-[gray]">1º</span>
          <span className="text-[black] capitalize">{posicoes.pos1}</span>
        </li>

        <li className="flex items-center gap-[0.75em] bg-[white] border border-[rgba(0,0,0,0.1)] rounded-[0.5em] px-[1em] py-[0.5em] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <span className="font-[700] text-[gray]">2º</span>
          <span className="text-[black] capitalize">{posicoes.pos2}</span>
        </li>

        <li className="flex items-center gap-[0.75em] bg-[white] border border-[rgba(0,0,0,0.1)] rounded-[0.5em] px-[1em] py-[0.5em] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <span className="font-[700] text-[gray]">3º</span>
          <span className="text-[black] capitalize">{posicoes.pos3}</span>
        </li>

        <li className="flex items-center gap-[0.75em] bg-[white] border border-[rgba(0,0,0,0.1)] rounded-[0.5em] px-[1em] py-[0.5em] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <span className="font-[700] text-[gray]">4º</span>
          <span className="text-[black] capitalize">{posicoes.pos4}</span>
        </li>

        <li className="flex items-center gap-[0.75em] bg-[white] border border-[rgba(0,0,0,0.1)] rounded-[0.5em] px-[1em] py-[0.5em] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <span className="font-[700] text-[gray]">5º</span>
          <span className="text-[black] capitalize">{posicoes.pos5}</span>
        </li>
      </ul>
    </section>
  );
};

export default CardListagemDisc;
