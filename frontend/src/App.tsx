import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/HomePage';
import RequestOTP from './components/RequestOTP';
import EnterOtp from './components/EnterOtp';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/request-otp" element={<RequestOTP />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
