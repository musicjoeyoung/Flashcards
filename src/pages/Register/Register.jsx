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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Register</button>
                {isRegistered && <p>Success! Redirecting...</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Register;
