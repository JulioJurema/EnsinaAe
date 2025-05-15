import Header from '../../Components/Header/Header';
import './style.css'

const Sobre: React.FC = () =>{
    return(
        <section className="sobreContainer">
            <Header titulo='Teste Cabeçalho' descricao='teste' cronometro={true}/>
        </section>
    )
}

export default Sobre;