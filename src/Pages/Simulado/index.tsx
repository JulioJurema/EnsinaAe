import Header from '../../Components/Header/Header';
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
        </section>
    )
}

export default Simulado