import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Simulado from './Pages/Simulado';
import React from 'react';
import Sobre from './Pages/Sobre';


const App: React.FC= () => {

  return (
    <section className='appContainer'>
      <BrowserRouter>
        <div className="navigationArea">
          <Navbar />
        </div>
        <div className="contentArea">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/simulado' element={<Simulado tipo='Simulado'/>} />
              <Route path='/livre' element={<Simulado tipo='Modo Livre'/>} />
              <Route path='/sobre' element={<Sobre />} />
            </Routes>
        </div>
      </BrowserRouter>
    </section>
  )
}

export default App
