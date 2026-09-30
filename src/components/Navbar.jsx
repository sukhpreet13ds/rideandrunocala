import React, { useState } from 'react';
import '../style/style.css';
import logo from '../assets/rideandocala.png';
import horseImg from '../assets/horse.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#activities">Activities</a>
                    <a href="#tickets">Tickets</a>
                    <a href="#sponsors">Sponsors</a>
                    <a href="#plan">Plan Your Visit</a>
                </div>
                <div className="nav-logo">
                    <img src={logo} alt="Ride and Run Ocala" />
                </div>
                <div className="nav-actions">
                    <button className="btn-donate">
                        <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> DONATE
                    </button>
                    <button className="btn-register-outline">
                        <span className="icon"><i className="fa-solid fa-file-pen"></i></span> REGISTER FOR THE EVENT
                    </button>
                </div>
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </nav>

            {/* Mobile Menu Panel Sidebar */}
            <div 
                className={`menu-sidebar-overlay ${isMenuOpen ? 'open' : ''}`} 
                onClick={closeMenu}
            ></div>

            <div className={`menu-sidebar ${isMenuOpen ? 'open' : ''}`}>
                <button className="menu-close-btn" onClick={closeMenu} aria-label="Close menu">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="menu-sidebar-bg-horse">
                    <img src={horseImg} alt="Horse outline" />
                </div>

                <div className="menu-sidebar-content">
                    <div className="menu-sidebar-links">
                        <a href="#about" onClick={closeMenu}>About</a>
                        <a href="#activities" onClick={closeMenu}>Activities</a>
                        <a href="#tickets" onClick={closeMenu}>Tickets</a>
                        <a href="#sponsors" onClick={closeMenu}>Sponsors</a>
                        <a href="#plan" onClick={closeMenu}>Plan Your Visit</a>
                    </div>

                    <div className="menu-sidebar-actions">
                        <button className="btn-donate" onClick={closeMenu}>
                            <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> DONATE
                        </button>
                        <button className="btn-register-outline" onClick={closeMenu}>
                            <span className="icon"><i className="fa-solid fa-file-pen"></i></span> REGISTER FOR THE EVENT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;