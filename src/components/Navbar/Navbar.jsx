import "./Navbar.scss"
import { Link } from "react-router-dom"

const Navbar = () => {
    const token = localStorage.getItem('token')
    return (
        <>
            <nav className="navbar">
                <Link className="navbar__link" to="/">Home</Link>
                <Link className="navbar__link" to="/about">About</Link>
                <Link className="navbar__link" to="/login">Login</Link>
                {/* <Link className="navbar__link" to="/profile">Profile</Link> */}
                {token ? (<Link className="navbar__link navbar__link--register" to="/profile">Profile</Link>) : null}
                {!token ? (<Link className="navbar__link navbar__link--register" to="/register">Register</Link>) : null}
                {/* Still, after a succesful login, "Register" does not disappear without a manual browser refresh. */}

                <button onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}>Logout</button>
            </nav>
        </>
    )
}

export default Navbar