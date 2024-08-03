import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed
import '../styles/SignIn.css';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signin', { email, password });
            if (response.data.token) {
                login(response.data.token); // Update auth context
                navigate('/');
            } else {
                setError(response.data.message || 'Authentication failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during sign-in.');
        }
    };

    return (
        <div className="sign-in-container" style={{ width: '500px' }} >
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    autoComplete="off" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn" type="submit">Sign In</button>
                <Link className="text" to="/request-otp">Forgotten Password?</Link>
                <p>Don't have an account? <Link className="text" to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default SignIn;
