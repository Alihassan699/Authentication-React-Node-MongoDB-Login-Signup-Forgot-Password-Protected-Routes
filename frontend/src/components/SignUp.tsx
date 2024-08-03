import axios from 'axios';
import React, { useState } from 'react';
import '../styles/SignUp.css'; // Make sure to import your CSS
import { Link } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/auth/signup', {
            username,
            fullName,
            email,
            password
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="sign-up-container"  style={{ width: '500px' }} >
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor="username">User Name:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter your username" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="fullname">Full Name:</label>
                <input 
                    type="text" 
                    id="fullname" 
                    placeholder="Enter your fullname" 
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    autoComplete="off" 
                    placeholder="Enter your email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn" type="submit">Sign Up</button>
                <p>Already have an account? <Link id='text' to="/signin">Sign In  </Link></p>
            </form>
        </div>
    );
}

export default SignUp;
