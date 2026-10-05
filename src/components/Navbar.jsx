import React, { useState, useEffect } from 'react';
import '../style/style.css';
import logo from '../assets/rideandocala.png';
import horseImg from '../assets/horse.png';
import {Link} from 'react-router-dom';

const Navbar = ({ openRegistration }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 991);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''} animate-nav`}>
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#activities">Activities</a>
                    <a href="#tickets">Tickets</a>
                    <a href="#sponsors" className="hide-on-laptop">Sponsors</a>
                    <a href="#plan" className="hide-on-laptop">Plan Your Visit</a>

                    <div className="nav-more-dropdown show-on-laptop">
                        <button className="nav-more-btn" onClick={() => setIsMoreOpen(!isMoreOpen)}>
                            <i className="fa-solid fa-grip-lines"></i>
                        </button>
                        <div className={`nav-more-menu ${isMoreOpen ? 'open' : ''}`}>
                            <a href="#sponsors" onClick={() => setIsMoreOpen(false)}>Sponsors</a>
                            <a href="#plan" onClick={() => setIsMoreOpen(false)}>Plan Your Visit</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMoreOpen(false); setIsContactOpen(true); }}>Contact Us</a>
                        </div>
                    </div>
                </div>
                <div className="nav-logo">
                    <Link to="/"><img src={logo} alt="Ride and Run Ocala" /></Link>
                </div>
                {!isMobile && (
                <div className="nav-actions">
                    <a href="#" className="nav-contact-desktop hide-on-laptop" onClick={(e) => { e.preventDefault(); setIsContactOpen(true); }} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', marginRight: '20px', fontFamily: 'var(--font-oxanium)', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#a0124b'} onMouseOut={(e) => e.target.style.color = 'var(--primary-color)'}>Contact Us</a>
                    <a className='donate-link' href='https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-22195' target='_blank' rel='noopener noreferrer'>
                        <button className="btn-donate">
                            <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> DONATE
                        </button>
                    </a>
                    <button className="btn-register-outline" onClick={openRegistration}>
                        <span className="icon"><i className="fa-solid fa-file-pen"></i></span> REGISTER FOR THE EVENT
                    </button>
                </div>
                )}
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
                        <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); setIsContactOpen(true); }}>Contact Us</a>
                    </div>

                    <div className="menu-sidebar-actions">
                        <a className='donate-link' href='https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-22195' target='_blank' rel='noopener noreferrer'>
                            <button className="btn-donate" onClick={closeMenu}>
                                <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> DONATE
                            </button>
                        </a>
                        <button className="btn-register-outline" onClick={() => { closeMenu(); openRegistration(); }}>
                            <span className="icon"><i className="fa-solid fa-file-pen"></i></span> REGISTER FOR THE EVENT
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Us Modal */}
            {isContactOpen && (
                <div className="contact-modal-overlay" onClick={() => setIsContactOpen(false)}>
                    <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="contact-modal-close" onClick={() => setIsContactOpen(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <h2>Contact Us</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="How can we help you?" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn-contact-submit">Send Message</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;