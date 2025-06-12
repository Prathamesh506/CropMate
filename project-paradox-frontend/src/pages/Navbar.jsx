// Navbar.jsx
import React from 'react';
import './Navbar.css'; // Importing the CSS file

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Project Paradox 🌱</div>
            <ul className="navbar-links">
                <li><a href="/Home">Home</a></li>
        
                <li><a href="/register">Register</a></li>
                {/* <li><a href="#contact">Contact</a></li> */}
                <li><a href="#about">About</a></li>
                <li><a href="/" className="logout-button">Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
