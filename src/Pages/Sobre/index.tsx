import Header from '../../Components/Header/Header';
import './style.css'

const Sobre: React.FC = () =>{
    return(
        <section className="sobreContainer">
            <Header titulo='Sobre' descricao='' cronometro={false}/>
        </section>
    )
}

export default Sobre;