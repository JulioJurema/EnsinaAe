import Header from '../../Components/Header/Header';
import QuestionCard from '../../Components/QuestionCard';
import './style.css'

interface simuladoProps {
    simulado: boolean;
}

const Simulado: React.FC<simuladoProps> = (props) =>{
    return (
        <section className="simuladoContainer">
                {
                    props.simulado 
                    ? <Header titulo='Simulado' descricao='Se prepare para o tempo de prova' cronometro={true}/>
                    : <Header titulo='Modo Livre' descricao='No modo livre você pode estudar sem se preocupar com o rempo' cronometro={false}/>
                }
            <div>
            <QuestionCard
                pergunta="O que é um transistor?"
                imagem1="https://link-para-imagem1.jpg"
                imagem2="https://link-para-imagem2.jpg"
                alternativas={[
                    "Um tipo de capacitor",
                    "Um componente ativo que amplifica sinais",
                    "Um resistor com polaridade",
                    "Um tipo de oscilador"
                ]}
            />

            </div>
        </section>
    )
}

export default Simulado