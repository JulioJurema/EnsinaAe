import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Simulado from './Pages/Simulado';
import React from 'react';
import Sobre from './Pages/Sobre';
import Ajustes from './Pages/Ajustes';


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
              <Route path='/simulado' element={<Simulado simulado={true}/>} />
              <Route path='/livre' element={<Simulado simulado={false}/>} />
              <Route path='/sobre' element={<Sobre />} />
              <Route path='/ajustes' element={<Ajustes />} />
            </Routes>
        </div>
      </BrowserRouter>
    </section>
  )
}

export default App
