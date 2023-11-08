import "./Navbar.scss"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <Link className="navbar__link" to="/">Home</Link>
                <Link className="navbar__link" to="/about">About</Link>
            </nav>
        </>
    )
}

export default Navbar