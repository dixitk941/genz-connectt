import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-green-500 py-6 border-t border-green-600 text-center">
      <p className="text-sm md:text-base lg:text-lg">
        &copy; {new Date().getFullYear()} 
        <a
          href="https://neocodenex.tech"
          className="text-green-400 font-bold hover:text-green-300 transition-colors duration-300"
        >
          NeoCodeNex
        </a>
        . All rights reserved to GenZConnect. GenZConnect is part of GenZVerse.
      </p>
    </footer>
  );
};

export default Footer;
