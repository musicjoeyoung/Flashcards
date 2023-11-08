import "./Header.scss"
import Navbar from "../Navbar/Navbar"

const Header = () => {
  return (
    <div>
      <Navbar />
      <div className="logo">
        <h1 className="logo__title">CodeCards</h1>
        <div className="logo__box"></div>
      </div>
    </div>
  )
}

export default Header