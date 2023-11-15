import "./Header.scss"
import Navbar from "../Navbar/Navbar"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <Navbar />
      <Link to="/" className="logoLink">
        <div className="logo">
          <h1 className="logo__title">CodeCards</h1>
          <div className="logo__box"></div>
        </div>
      </Link>
    </div>
  )
}

export default Header