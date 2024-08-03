import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RequestOTP.css';

function RequestOTP() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/auth/request-password-reset', { email });
            setMessage(response.data.message || 'OTP sent to your email.');
            setError('');
            navigate('/enter-otp', { state: { email } }); // Pass email state
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while requesting OTP.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container" style={{ width: '500px' }} >
            <form className="form" onSubmit={handleRequestOTP}>
                <h2 className="form-title">Request OTP</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <label className="form-label" htmlFor="email">Email:</label>
                <input 
                    className="form-input" 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
            </form>
        </div>
    );
}

export default RequestOTP;
