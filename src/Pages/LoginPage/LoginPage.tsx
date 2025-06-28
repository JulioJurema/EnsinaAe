import './style.css'
import Logo from '../../assets/Logo.png'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../Firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
  };

  return (
    <section className='loginPageContainer'>
      <div className='loginPageHeader'>
        <img src={Logo} alt="Logo do site" />
      </div>
      <div className='loginPageBody'>
        <div className='loginCard'>
          <div className='loginInfo'>
            <p>Entre na plataforma</p>
          </div>
          <div className='loginButtons'>
            <button onClick={handleGoogleLogin}>Entrar com Google</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
