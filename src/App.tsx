import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './components/Home'

function App() {
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
