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
                <h1>Cabeçalho</h1>
                <span>Isso é uma descrição</span>
            </div>
            <div className='clockArea'>
                <p>tempo decorrido</p>
                <h2>00:00:00</h2>
            </div>
        </header>
    )
}

export default Header;