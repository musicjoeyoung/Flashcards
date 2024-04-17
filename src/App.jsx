import './App.scss'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  console.log('Welcome to CodeCards!')
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
