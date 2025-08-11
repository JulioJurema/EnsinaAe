import "./style.css";

interface questionProperties {
  pergunta: string | null;
  imagem1?: string | null;
  imagem2?: string | null;
  alternativas: string[];
  correta?: number;
}

const QuestionCard: React.FC<questionProperties> = (props) => {
  return (
    <section className="questionContainer">
      <div className="questionContent">
        {props.imagem1 && (
          <img src={props.imagem1} alt="imagem 1" className="questionImage" />
        )}

        <h3 className="questionText">{props.pergunta}</h3>

        {props.imagem2 && (
          <img src={props.imagem2} alt="imagem 2" className="questionImage" />
        )}

        <div className="questionOptions">
          {props.alternativas.map((alt, index) => (
            <button key={index} className="questionOption">
              {alt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionCard;
