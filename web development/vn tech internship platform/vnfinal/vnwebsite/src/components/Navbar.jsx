import React, { useState } from "react";
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setISOpen] = useState(false);

    const toggleMenu = () => {
        setISOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                <img src={logo} alt="EduPlatform Logo" className="logo"/>
                </Link>
                <div className="logo-description">
                    <h2>Visinory Nexus</h2>
                    <p>Your gateway to quality education.</p>
                </div>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
            ☰  {/* Hamburger icon */}
            </div>
           
            <ul className={`navbar-links ${isOpen ? 'show' : ''}`}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/courses">courses</Link>
                </li>
                <li>
                    <Link to="/internships">Internships</Link>
                </li>
                <li>
                    <Link to="/events">Events</Link>
                </li>
                <li>
                    <Link to="/project">projects</Link>
                </li>
                <li>
                    <Link to="/blog">Blogs</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
                    </ul> 

        </nav>
    );
};

export default Navbar;
