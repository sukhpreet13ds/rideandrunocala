'use client';

import { T, useSite } from '@/lib/content-context';
import React, { useState, useEffect } from 'react';
const logo = '/assets/rideandocala.png';
const horseImg = '/assets/horse.png';
import Link from 'next/link';
import { useModals } from './ModalProvider';

const Navbar = () => {
    const { tx, img } = useSite();
    const { openRegistration, openDonate } = useModals();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [contactState, setContactState] = useState('idle');

    const submitContact = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setContactState('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(form))),
            });
            if (!res.ok) throw new Error();
            form.reset();
            setContactState('sent');
        } catch {
            setContactState('error');
        }
    };

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

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''} animate-nav`}>
                <div className="nav-links">
                    <a href="/#about"><T id="navbar.nav.1" /></a>
                    <a href="/#activities"><T id="navbar.nav.2" /></a>
                    <a href="/#tickets"><T id="navbar.nav.3" /></a>
                    <a href="/#sponsors" className="hide-on-laptop"><T id="navbar.nav.4" /></a>
                    <a href="/#plan" className="hide-on-laptop"><T id="navbar.nav.5" /></a>

                    <div className="nav-more-dropdown show-on-laptop">
                        <button className="nav-more-btn" onClick={() => setIsMoreOpen(!isMoreOpen)}>
                            <i className="fa-solid fa-grip-lines"></i>
                        </button>
                        <div className={`nav-more-menu ${isMoreOpen ? 'open' : ''}`}>
                            <a href="/#sponsors" onClick={() => setIsMoreOpen(false)}><T id="navbar.nav.6" /></a>
                            <a href="/#plan" onClick={() => setIsMoreOpen(false)}><T id="navbar.nav.7" /></a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMoreOpen(false); setIsContactOpen(true); }}><T id="navbar.nav.8" /></a>
                        </div>
                    </div>
                </div>
                <div className="nav-logo">
                    <Link href="/"><img src={img(logo)} alt={tx("navbar.nav.9")} /></Link>
                </div>
                <div className="nav-actions">
                    <a href="#" className="nav-contact-desktop hide-on-laptop" onClick={(e) => { e.preventDefault(); setIsContactOpen(true); }} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', marginRight: '20px', fontFamily: 'var(--font-oxanium)', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#a0124b'} onMouseOut={(e) => e.target.style.color = 'var(--primary-color)'}><T id="navbar.nav.10" /></a>
                    <button className="btn-donate" onClick={openDonate}>
                            <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> <T id="navbar.nav.11" />
                        </button>
                    <button className="btn-register-outline" onClick={openRegistration}>
                        <span className="icon"><i className="fa-solid fa-file-pen"></i></span> <T id="navbar.nav.12" />
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
                    <img src={img(horseImg)} alt={tx("navbar.menu-sidebar-bg-horse.1")} />
                </div>

                <div className="menu-sidebar-content">
                    <div className="menu-sidebar-links">
                        <a href="/#about" onClick={closeMenu}><T id="navbar.menu-sidebar-links.1" /></a>
                        <a href="/#activities" onClick={closeMenu}><T id="navbar.menu-sidebar-links.2" /></a>
                        <a href="/#tickets" onClick={closeMenu}><T id="navbar.menu-sidebar-links.3" /></a>
                        <a href="/#sponsors" onClick={closeMenu}><T id="navbar.menu-sidebar-links.4" /></a>
                        <a href="/#plan" onClick={closeMenu}><T id="navbar.menu-sidebar-links.5" /></a>
                        <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); setIsContactOpen(true); }}><T id="navbar.menu-sidebar-links.6" /></a>
                    </div>

                    <div className="menu-sidebar-actions">
                        <button className="btn-donate" onClick={() => { closeMenu(); openDonate(); }}>
                                <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> <T id="navbar.menu-sidebar-actions.1" />
                            </button>
                        <button className="btn-register-outline" onClick={() => { closeMenu(); openRegistration(); }}>
                            <span className="icon"><i className="fa-solid fa-file-pen"></i></span> <T id="navbar.menu-sidebar-actions.2" />
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
                        <h2><T id="navbar.contact-modal-content.1" /></h2>
                        <form className="contact-form" onSubmit={submitContact}>
                            <div className="form-group">
                                <label><T id="navbar.contact-modal-content.2" /></label>
                                <input type="text" name="full_name" placeholder={tx("navbar.contact-modal-content.3")} required />
                            </div>
                            <div className="form-group">
                                <label><T id="navbar.contact-modal-content.4" /></label>
                                <input type="email" name="email" placeholder={tx("navbar.contact-modal-content.5")} required />
                            </div>
                            <div className="form-group">
                                <label><T id="navbar.contact-modal-content.6" /></label>
                                <textarea name="message" placeholder={tx("navbar.contact-modal-content.7")} rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn-contact-submit" disabled={contactState === 'sending'}>{contactState === 'sending' ? 'Sending…' : <T id="navbar.contact-modal-content.8" />}</button>
                            {contactState === 'sent' && <p style={{ color: '#15803d', marginTop: 10 }}>Thank you — your message was sent.</p>}
                            {contactState === 'error' && <p style={{ color: '#b91c1c', marginTop: 10 }}>Something went wrong. Please try again or email us directly.</p>}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;