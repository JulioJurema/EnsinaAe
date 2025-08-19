import './style.css'

interface HeaderProps{
    titulo: string;
    descricao: string | null;
    cronometro: boolean;
    tempo: string;
}

const Header: React.FC<HeaderProps> = (props) =>{
    return (
        <header className='headerContainer'>
            <div className='titleArea'>
                <h1>{props.titulo}</h1>
                <span>{props.descricao}</span>
            </div>
            {
                props.cronometro && <div className='clockArea'>
                    <p>tempo decorrido</p>
                    <h2>{props.tempo}</h2>
                </div>
            }
        </header>
    )
}

export default Header;

