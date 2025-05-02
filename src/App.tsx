import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Simulado from './Pages/Simulado/Index';
import React from 'react';


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
              <Route path='/simulado' element={<Simulado />} />
            </Routes>
        </div>
      </BrowserRouter>
    </section>
  )
}

export default App
