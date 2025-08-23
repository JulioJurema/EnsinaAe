import React from "react";
import RenderMarkdown from "../RenderMarkdown";

interface QuestionCardProps {
  numero?: number;
  categoria: string;
  enunciado: string;
  textoQuestao: string;
  perguntaFinal: string;
  alternativas: string[];
  correta: string;
  mostrarCorreta: boolean;
  respostaSelecionada: string;
  onResponder: (alternativa: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const categoriaTexto = (() => {
    switch (props.categoria) {
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
        <p className="font-[800] text-[var(--verde-secundario)] text-[1.2em]">
          Questão {props.numero ?? "x"}
        </p>
        <p className="font-[200] text-[var(--texto-preto-primario)]">
          {categoriaTexto}
        </p>
      </div>

      {props.enunciado && <RenderMarkdown text={props.enunciado} />}
      {props.textoQuestao && <RenderMarkdown text={props.textoQuestao} />}
      {props.perguntaFinal && <RenderMarkdown text={props.perguntaFinal} />}

      <div className="flex flex-col items-center w-full">
        {props.alternativas.map((alt, index) => {
          let classes = "flex items-center text-start border rounded-[5px] mb-[0.5em] pt-[0.5em] pb-[0.5em] pl-[1em] pr-[1em] w-[40em] cursor-pointer ";

          if (props.mostrarCorreta) {
            if (alt === props.correta) {
              // sempre verde
              classes += "border-[var(--verde-primario)] text-[var(--verde-secundario)] bg-[var(--verde-select)]";
            } else if (props.respostaSelecionada === alt && alt !== props.correta) {
              // selecionada errada → vermelho
              classes += "border-[var(--vermelho-primario)] text-[var(--vermelho-secundario)] bg-[var(--vermelho-select)]";
            } else {
              classes += "border hover:bg-[#eee]";
            }
          } else {
            // antes de finalizar
            classes += "border-gray-300 hover:bg-[#eee]";
          }

          return (
            <label key={index} className={classes}>
              <input
                type="radio"
                name={`questao-${props.enunciado}`}
                value={alt}
                checked={props.respostaSelecionada === alt}
                onChange={() => props.onResponder(alt)}
                disabled={props.mostrarCorreta}
              />
              <span className="ml-[1em]">{alt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
