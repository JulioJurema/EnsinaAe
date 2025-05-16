import './style.css'

interface HeaderProps{
    titulo: string;
    descricao: string | null;
    cronometro: boolean;
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
                    <h2>00:00:00</h2>
                </div>
            }
        </header>
    )
}

export default Header;