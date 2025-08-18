import { useState } from "react";
import RenderMarkdown from "../RenderMarkdown";

interface QuestionCardProps {
  numero?: number; // numeração opcional
  categoria: string;
  enunciado: string;
  textoQuestao: string;
  perguntaFinal: string;
  alternativas: string[];
  correta: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  numero,
  categoria,
  enunciado,
  textoQuestao,
  perguntaFinal,
  alternativas,
  correta
}) => {
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  
  //exibir Disciplina
  const categoriaTexto = (() => {
    switch (categoria) {
      case "portugues":
        return "Língua Portuguesa";
      case "matematica":
        return "Matemática";
      case "historia":
        return "História";
      case "geografia":
        return "Geografia";
      default:
        return "";
    }
  })();

  return (
    <div className="flex flex-col text-center question-card pt-[2em] p-[4em] rounded-[10px] mb-[2em] mt-[0] m-[5em] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

      <div className="mb-[1.5em] text-start">
        <p className="font-[800] text-[var(--verde-secundario)] text-[1.2em]">Questão {numero ?? "x"}</p>
        <p className="font-[200] text-[var(--texto-preto-primario)]">{categoriaTexto}</p>
      </div>

      {enunciado ? <RenderMarkdown text={enunciado} /> : null}
      {textoQuestao ? <RenderMarkdown text={textoQuestao} />  : null}
      {perguntaFinal ? <RenderMarkdown text={perguntaFinal} />  : null}

      <div className="flex flex-col items-center w-full">
        {alternativas.map((alt, index) => (
          <label
            key={index}
            className="flex items-center text-start border rounded-[5px] mb-[0.5em] pt-[0.5em] pb-[0.5em] pl-[1em] pr-[1em] w-[40em] hover:bg-[#eee] cursor-pointer"
          >
            <input
              type="radio"
              name={`questao-${enunciado}`}
              value={alt}
              checked={respostaSelecionada === alt}
              onChange={() => setRespostaSelecionada(alt)}
            />
            <span className="ml-[1em]">{alt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
