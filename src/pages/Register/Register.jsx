import "./Register.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isRegistered) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isRegistered, navigate]);

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${baseURL}/register`, {
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.password.value
            });
            setIsRegistered(true);
        } catch (error) {
            setError(error.response?.data || 'Failed to register');
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="register">
            <h2 className="register__title">Register</h2>
            <form onSubmit={handleRegister} className="register__form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required autoComplete="email address" />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required autoComplete="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required autoComplete="password" />
                <button type="submit">Register</button>
                {isRegistered && <p>Success! Redirecting...</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Register;
