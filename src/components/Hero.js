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
        <section className="bg-black p-10 text-center rounded-lg m-5 shadow-2xl">
            <h2 className="text-5xl font-extrabold text-green-400 mb-4">Discover and Connect with GenZ</h2>
            <p className="text-xl text-green-300 mb-6">Join our vibrant community and explore the latest trends, ideas, and opportunities.</p>
            <p className="text-lg text-green-300 mb-6">
                GenZ Connect is a platform designed to bring together the next generation of thinkers, creators, and innovators. 
                Whether you're looking to share your ideas, collaborate on projects, or simply connect with like-minded individuals, 
                GenZ Connect is the place for you.
            </p>
            <p className="text-lg text-green-300 mb-6">
                Our mission is to empower GenZ by providing a space where they can express themselves, learn from each other, 
                and grow together. From tech enthusiasts to creative artists, everyone is welcome here.
            </p>
            <button className="bg-green-500 text-black py-3 px-6 rounded-full font-semibold hover:bg-green-700 hover:text-white transition duration-300">
                Get Started
            </button>
            {!isLoggedIn && (
                <div className="mt-6">
                    <p className="text-green-300 text-sm">Already a member? <button onClick={handleLoginClick} className="underline text-green-400 hover:text-green-500">Log in</button></p>
                </div>
            )}
            {isLoginModalOpen && <LoginModal onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}
        </section>
    );
};

export default Hero;
