import './style.css';
import Logo from '../../assets/Logo.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../../../Firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/');
    }
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

      console.log('Usuário logado:', userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Verifica se o usuário já está na coleção "Users"
      if (user.uid) {
        const userRef = doc(collection(db, 'Users'), user.uid);
        const userSnap = await getDoc(userRef);
      
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            nome: user.displayName,
            email: user.email,
            uid: user.uid,
            criadoEm: new Date()
          });
          console.log('Usuário adicionado ao Firestore.');
        } else {
          console.log('Usuário já existe no Firestore.');
        }
      }

      navigate('/');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
  };

  return (
    <section className='loginPageContainer'>
      <div className="backgroundShapes"></div>

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
};

export default LoginPage;
