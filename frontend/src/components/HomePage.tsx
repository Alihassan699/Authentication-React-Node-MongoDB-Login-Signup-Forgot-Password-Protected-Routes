import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Welcome to the Quiz App</h1>
            <div className="home-buttons">
                {isAuthenticated ? (
                    <>
                        <button onClick={() => navigate('/admin')}>Admin Panel</button>
                        <button onClick={() => navigate('/user')}>User Dashboard</button>
                        <button onClick={() => {
                            logout();
                            navigate('/signin');
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signin">
                            <button>Sign In</button>
                        </Link>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
