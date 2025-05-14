import './style.css'

interface simuladoProps {
    tipo: string;
}

const Simulado: React.FC<simuladoProps> = ({ tipo }) =>{
    return (
        <section className="simuladoContainer">
            <p>{tipo}</p>
        </section>
    )
}

export default Simulado