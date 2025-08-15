import { useState } from "react";

interface QuestionCardProps {
  enunciado: string;
  textoQuestao: string;
  perguntaFinal: string;
  alternativas: string[];
  correta: string;
}

export default function QuestionCard({
  enunciado,
  textoQuestao,
  perguntaFinal,
  alternativas,
  correta
}: QuestionCardProps) {
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);

  return (
    <div className="flex flex-col text-center question-card p-[3em] rounded-[10px] mb-[2em] bg-[#ddd]">
      {enunciado ? <p className="font-bold mb-[2em]">{enunciado}</p> : null}
      {textoQuestao ? <pre className="mb-[2em]">{textoQuestao}</pre> : null}
      {perguntaFinal ? <p className="font-bold mb-[2em]">{perguntaFinal}</p> : null}

      <div className="flex flex-col items-center w-full">
        {alternativas.map((alt, index) => (
          <label key={index} className="flex items-center text-start border-[1px] rounded-[5px] mb-[0.5em] p-[0.5em] w-[40em] hover:bg-[#eee] cursor-pointer">
            <input className=""
              type="radio"
              name={`questao-${enunciado}`}
              value={alt}
              checked={respostaSelecionada === alt}
              onChange={() => setRespostaSelecionada(alt)}
            />
            <span>{alt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
