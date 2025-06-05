import './style.css'
import Logo from '../../assets/Logo.png'


const LoginPage: React.FC = () =>{
    return(
        <section className='loginPageContainer'>
            <div className='loginPageHeader'>
                <img src={Logo} alt="Logo do site" />
            </div>
            <div className='loginPageBody'>
                <div className='loginCard'>
                    <p>card</p>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;