import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import HowItWorks from '../pages/HowItWorksPage.jsx';
import SignUp from '../pages/SignUp.jsx';
import SignIn from '../pages/SignIn.jsx';
import Footer from './Footer';
import NavBar from './Navbar';
import Auth from '../utils/auth.js';

function MainLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Auth.getToken();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        Auth.logout();
        setIsAuthenticated(false);
    }; 

    return (
        <Router>
            <NavBar 
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default MainLayout;
