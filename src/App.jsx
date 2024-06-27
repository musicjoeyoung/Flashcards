import './App.scss'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Profile from "./pages/Profile/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from './context/AuthContext'

function App() {
  console.log('Welcome to CodeCards!')
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
