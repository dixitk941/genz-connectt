import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black text-green-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-wider">GenZ Connect</h1>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-green-300">Home</Link>
          <Link to="/features" className="hover:text-green-300">Features</Link>
          <Link to="/contact" className="hover:text-green-300">Contact</Link>
          <Link to="/about" className="hover:text-green-300">About</Link>
          <Link to="/githubintegration" className="hover:text-green-300">GitHub Integration</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-green-300">Logout</button>
          ) : (
            <button onClick={toggleModal} className="hover:text-green-300">Login</button>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-green-500">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col space-y-4 mt-4 text-center">
            <li><Link to="/" className="hover:text-green-300">Home</Link></li>
            <li><Link to="/features" className="hover:text-green-300">Features</Link></li>
            <li><Link to="/contact" className="hover:text-green-300">Contact</Link></li>
            <li><Link to="/about" className="hover:text-green-300">About</Link></li>
            <li><Link to="/githubintegration" className="hover:text-green-300">GitHub</Link></li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="hover:text-green-300">Logout</button>
              ) : (
                <button onClick={toggleModal} className="hover:text-green-300">Login</button>
              )}
            </li>
          </ul>
        </nav>
      )}
      {isModalOpen && <LoginModal onClose={toggleModal} onLoginSuccess={handleLoginSuccess} />}
    </header>
  );
};

export default Header;
