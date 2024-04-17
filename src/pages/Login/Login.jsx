import "./Login.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${baseURL}/login`, {
                email: event.target.email.value,
                password: event.target.password.value
            });
            console.log('response:', response)
            setIsLoggedIn(true);
            localStorage.setItem('token', response.data.accessToken);
        } catch (error) {
            setError(error.response?.data || 'Failed to login');
            console.error('Error logging in:', error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Login</button>
                {isLoggedIn && <p>Success! Redirecting...</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login