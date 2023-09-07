import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './components/Home'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
