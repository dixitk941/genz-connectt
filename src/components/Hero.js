import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

const Hero = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        console.log('Login successful!');
    };

    return (
        <section className="relative bg-black p-12 text-center rounded-3xl m-5 shadow-2xl transform transition-transform duration-500 hover:scale-105">
            {/* Layered background with rotating gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-10 blur-xl rounded-3xl z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-50 rounded-3xl z-0"></div>
            
            {/* Main content container */}
            <div className="relative z-10">
                <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 text-transparent bg-clip-text mb-4 leading-tight tracking-wide">
                    Elevate with <span className="block animate-bounce">GenZ Power</span>
                </h2>
                <p className="text-2xl text-gray-300 mb-6 max-w-2xl mx-auto italic tracking-wider">
                    A whole new way to discover, connect, and grow with the future.
                </p>

                <div className="max-w-3xl mx-auto mb-8">
                    <p className="text-lg text-gray-400 mb-4">
                        At <span className="font-semibold text-purple-400">GenZ Connect</span>, we're reshaping the way young minds collaborate and innovate.
                    </p>
                    <p className="text-lg text-gray-400 mb-6">
                        Whether you're a tech-savvy creator or an aspiring artist, this platform is your space to shine. 
                        Connect with visionaries like you and make waves in the world of tomorrow.
                    </p>
                </div>

                {/* 3D button with unique hover effects */}
                <button className="relative inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-4 px-12 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 hover:rotate-3">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 opacity-0 rounded-full transition-all duration-300 hover:opacity-100"></span>
                    <span className="relative z-10">Get Started</span>
                </button>

                {/* Conditional Login link */}
                {!isLoggedIn && (
                    <div className="mt-8">
                        <p className="text-purple-400 text-sm">
                            Already a member? <button onClick={handleLoginClick} className="underline text-pink-400 hover:text-purple-500 transition-colors duration-300">Log in</button>
                        </p>
                    </div>
                )}

                {/* Login Modal */}
                {isLoginModalOpen && <LoginModal onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}
            </div>

            {/* Floating abstract shapes for uniqueness */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-pink-500 rounded-full opacity-50 blur-2xl animate-float"></div>
            <div className="absolute bottom-8 right-16 w-24 h-24 bg-blue-500 rounded-full opacity-50 blur-2xl animate-float"></div>
        </section>
    );
};

export default Hero;
