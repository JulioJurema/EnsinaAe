import "./style.css"

interface questionProperties{
    image: string | null;
    pergunta: string | null;
   // options: string[] | null;
   // correta: string | null;

}

const QuestionCard: React.FC<questionProperties> = (props) =>{
    return(
        <section className="questionContainer">
            <div className="questionHeader">
                <h5>Question 1</h5>
                <span>Linha portuguesa</span>
            </div>
            <div className="questionBody">
                <div className="questionInfo">
                    <h3>{props.pergunta}</h3>
                </div>
                <div className="questionOptions">
                    <p>alternativas</p>
                </div>
            </div>
        </section>
    )
}

export default QuestionCard