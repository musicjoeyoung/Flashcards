import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link className="navbar__link" to="/">Home</Link>
            <Link className="navbar__link" to="/about">About</Link>
            {!token && <Link className="navbar__link" to="/login">Login</Link>}
            {token && <Link className="navbar__link navbar__link--register" to="/profile">Profile</Link>}
            {!token && <Link className="navbar__link navbar__link--register" to="/register">Register</Link>}
            {token && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
};

export default Navbar;
