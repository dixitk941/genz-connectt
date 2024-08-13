import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'black',
    color: 'green',
    padding: '20px',
    textAlign: 'center',
    borderTop: '1px solid #2ecc71', // Green border on top
  };

  const linkStyle = {
    color: '#2ecc71', // Brighter green
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  };

  const hoverLinkStyle = {
    color: '#27ae60', // Darker green on hover
  };

  return (
    <footer style={footerStyle}>
      <p className="text-sm md:text-base lg:text-lg">
        &copy; {new Date().getFullYear()} 
        <a
          href="https://neocodenex.tech"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = hoverLinkStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          NeoCodeNex
        </a>
        . All rights reserved to GenZConnect. GenZConnect is part of GenZVerse.
      </p>
    </footer>
  );
};

export default Footer;
