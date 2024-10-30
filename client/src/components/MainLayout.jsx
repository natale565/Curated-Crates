import { useState } from 'react';
import HomePage from '../pages/HomePage.jsx';
import HowItWorks from '../pages/HowItWorksPage.jsx';
import SignUp from '../pages/SignUp.jsx';
import SignIn from '../pages/SignIn.jsx';
import Footer from './Footer';
import NavBar from './Navbar';

function MainLayout() {
    const [currentPage, setCurrentPage] = useState('HomePage');

    const renderPage = () => {
        if (currentPage === 'HomePage') {
            return <HomePage />;
        }
        if (currentPage === 'HowItWorks') {
            return <HowItWorks />;
        }
        if (currentPage === 'SignUp') {
            return <SignUp />;
        }
        if (currentPage === 'SignIn') {
            return <SignIn />;
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <>
            <NavBar handlePageChange={handlePageChange} />
            {renderPage()}
            <Footer />
        </>
    );
}

export default MainLayout;
