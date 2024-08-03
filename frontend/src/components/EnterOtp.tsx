import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/EnterOTP.css';

function EnterOtp() {
    const location = useLocation();
    const email = location.state?.email || ''; // Ensure the email is retrieved
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/auth/reset-password', { email, otp, newPassword });
            setMessage(response.data.message || 'Password reset successfully.');
            setError('');
            navigate('/signin'); // Redirect to signin page after successful reset
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while resetting password.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container" style={{ width: '500px' }} >
            <form className="form" onSubmit={handleResetPassword}>
                <h2 className="form-title">Enter OTP</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <label className="form-label" htmlFor="otp">OTP:</label>
                <input 
                    className="form-input" 
                    type="text" 
                    id="otp" 
                    placeholder="Enter OTP" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <label className="form-label" htmlFor="new-password">New Password:</label>
                <input 
                    className="form-input" 
                    type="password" 
                    id="new-password" 
                    placeholder="Enter new password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

export default EnterOtp;
