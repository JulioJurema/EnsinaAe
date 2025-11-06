import './style.css';
import Logo from '../../assets/Logo.svg';
import Illustration from '../../assets/Ilustracao.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaGoogle, FaFacebookF, FaMicrosoft } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) navigate('/');
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        nome: user.displayName,
        email: user.email,
        foto: user.photoURL,
        uid: user.uid,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
  };

  return (
    <section className="loginPageContainer">
      <header className="loginLogo">
        <img src={Logo} alt="Logo" className='' />
      </header>

      <div className="loginCard">
        <div className="loginCardImage">
          <img src={Illustration} alt="Ilustração" />
        </div>

        <div className="loginCardContent">
          <h1>Bem-vindo!</h1>
          <p>Acesse a plataforma com uma das contas abaixo:</p>

          <div className="loginButtons">
            <button className="google" onClick={handleGoogleLogin}>
              <FaGoogle />
              Google
            </button>
            <button className="microsoft" disabled>
              <FaMicrosoft />
              Microsoft
            </button>
            <button className="facebook" disabled>
              <FaFacebookF />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
