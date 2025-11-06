import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Simulado from './Pages/Simulado';
import React from 'react';
import Sobre from './Pages/Sobre';
import Ajustes from './Pages/Ajustes';
import LoginPage from './Pages/LoginPage';
import AdicionarQuestoes from './Pages/AdicionarQuestoes';

const App: React.FC = () => {
  const location = useLocation();

  // Verifica se está na página de login
  const isLoginPage = location.pathname === '/login';

  return (
    <section className='appContainer'>
      {!isLoginPage && (
        <div className="navigationArea">
          <Navbar />
        </div>
      )}
      <div className="contentArea max-h-[100vh] w-[100%] m-[0] overflow-hidden">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/simulado' element={<Simulado simulado={true} />} />
          <Route path='/livre' element={<Simulado simulado={false} />} />
          <Route path='/sobre' element={<Sobre />} />
          <Route path='/ajustes' element={<Ajustes />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/add' element={<AdicionarQuestoes />} />
        </Routes>
      </div>
    </section>
  );
}

const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
