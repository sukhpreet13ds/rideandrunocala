'use client';

import { T, useSite } from '@/lib/content-context';
import { useModals } from './ModalProvider';
import React from 'react';
const directionBg = '/assets/direction-bg.jpg';
const directionImg = '/assets/direction.jpg';
const logo = '/assets/rideandocala.png';

const Footer = () => {
    const { tx, img } = useSite();
    const { openDonate } = useModals();
    return (
        <footer>
            <section
                id="plan"
                className="visit-section"
                style={{
                    backgroundImage: `linear-gradient(#db2777e6, #9d174df2), url(${img(directionBg)})`

                }}
            >
                <div className="visit-container">
                    <div className="visit-left">
                        <h4 className="visit-subtitle"><T id="footer.plan.1" /></h4>
                        <h2 className="visit-title"><T id="footer.plan.2" /></h2>
                        <h3 className="visit-date"><T id="footer.plan.3" /></h3>

                        <div className="schedule-list">
                            <div className="schedule-item">
                                <span className="schedule-time"><T id="footer.plan.4" /></span>
                                <span className="schedule-text"><T id="footer.plan.5" /></span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-time"><T id="footer.plan.6" /><br /><T id="footer.plan.7" /></span>
                                <span className="schedule-text"><T id="footer.plan.8" /></span>
                            </div>
                            <div className="schedule-item empty-time">
                                <span className="schedule-time"><T id="footer.plan.9" /></span>
                                <span className="schedule-text"><T id="footer.plan.10" /></span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-time"><T id="footer.plan.11" /></span>
                                <span className="schedule-text"><T id="footer.plan.12" /></span>
                            </div>
                            <div className="schedule-item empty-time">
                                <span className="schedule-time"></span>
                                <span className="schedule-text"><T id="footer.plan.13" /></span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-time"><T id="footer.plan.14" /></span>
                                <span className="schedule-text"><T id="footer.plan.15" /></span>
                            </div>
                        </div>
                    </div>
                    <div className="visit-right">
                        <img src={img(directionImg)} alt={tx("footer.plan.16")} className="direction-img" />

                        <div className="info-boxes">
                            <div className="info-box">
                                <div className="info-box-icon"><i className="fa-solid fa-location-dot"></i></div>
                                <div className="info-box-content">
                                    <h4><T id="footer.plan.17" /></h4>
                                    <a href={tx("footer.plan.18")} target='_blank' rel='noopener noreferrer' style={{color:"inherit",textDecoration:"none"}}> <p><T id="footer.plan.19" /></p></a>
                                </div>
                            </div>
                            <div className="info-box">
                                <div className="info-box-icon"><i className="fa-solid fa-circle-xmark"></i></div>
                                <div className="info-box-content">
                                    <h4><T id="footer.plan.20" /></h4>
                                    <p><T id="footer.plan.21" /></p>
                                </div>
                            </div>
                            <div className="info-box">
                                <div className="info-box-icon"><i className="fa-solid fa-clipboard-list"></i></div>
                                <div className="info-box-content">
                                    <h4><T id="footer.plan.22" /></h4>
                                    <p><T id="footer.plan.23" /> <strong><T id="footer.plan.24" /></strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="press-section" style={{ padding: '80px 4%', backgroundColor: '#fcfcfc' }}>
                <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                    <h4 className="section-subtitle" style={{ color: '#D8467A', fontFamily: 'var(--font-oxanium)', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}><T id="footer.press-section.1" /></h4>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-big-shoulder)', fontSize: '48px', color: '#1B2431', textTransform: 'uppercase', lineHeight: '1.1', maxWidth: '800px', margin: '0 auto' }}><T id="footer.press-section.2" /></h2>
                </div>
                <style>
                    {`
                    .press-container {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 30px;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    .press-box {
                        background: white;
                        padding: 35px 30px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.06);
                        display: flex;
                        flex-direction: column;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .press-box:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    }
                    .press-head-title {
                        font-family: var(--font-oxanium, sans-serif);
                        font-size: 15px;
                        color: #D8467A;
                        font-weight: 700;
                        text-transform: uppercase;
                        margin-bottom: 12px;
                        letter-spacing: 0.5px;
                    }
                    .press-title {
                        font-family: var(--font-oxanium, sans-serif);
                        font-size: 22px;
                        color: #1B2431;
                        font-weight: 700;
                        margin-bottom: 25px;
                        line-height: 1.4;
                        flex-grow: 1;
                    }
                    .press-link {
                        font-family: var(--font-oxanium, sans-serif);
                        font-size: 16px;
                        color: #1B2431;
                        text-decoration: none;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        transition: color 0.3s;
                        width: fit-content;
                    }
                    .press-link:hover {
                        color: #D8467A;
                    }
                    @media (max-width: 992px) {
                        .press-container {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    @media (max-width: 768px) {
                        .press-container {
                            grid-template-columns: 1fr;
                        }
                    }
                    `}
                </style>
                <div className="press-container">
                    <div className="press-box">
                        <div className="press-head-title"><T id="footer.press-section.3" /></div>
                        <div className="press-title"><T id="footer.press-section.4" /></div>
                        <a className="press-link" href={tx("footer.press-section.5")} target="_blank" rel="noopener noreferrer">
                            <T id="footer.press-section.6" /> <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '14px' }}></i>
                        </a>
                    </div>
                    <div className="press-box">
                        <div className="press-head-title"><T id="footer.press-section.7" /></div>
                        <div className="press-title"><T id="footer.press-section.8" /></div>
                        <a className="press-link" href={tx("footer.press-section.9")} target="_blank" rel="noopener noreferrer">
                            <T id="footer.press-section.10" /> <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '14px' }}></i>
                        </a>
                    </div>
                    <div className="press-box">
                        <div className="press-head-title"><T id="footer.press-section.11" /></div>
                        <div className="press-title"><T id="footer.press-section.12" /></div>
                        <a className="press-link" href={tx("footer.press-section.13")} target="_blank" rel="noopener noreferrer">
                            <T id="footer.press-section.14" /> <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '14px' }}></i>
                        </a>
                    </div>
                </div>
            </section>

            <section className="donate-banner">
                <div className="donate-banner-container">
                    <div className="donate-banner-left">
                        <span className="donate-icon"><i className="fa-solid fa-xmark"></i></span>
                        <h2><T id="footer.donate-banner.1" /></h2>
                    </div>
                    <button className="btn-donate" onClick={openDonate}><T id="footer.donate-banner.2" /></button>
                </div>
            </section>

            <section className="policies-section">
                <div className="policies-container">
                    <div className="policy-block">
                        <div className="policy-icon"><i className="fa-solid fa-dog"></i></div>
                        <h4><T id="footer.policies-section.1" /></h4>
                        <p><T id="footer.policies-section.2" /></p>
                    </div>

                    <div className="policy-block">
                        <div className="policy-icon"><i className="fa-solid fa-wheelchair"></i></div>
                        <h4><T id="footer.policies-section.3" /></h4>
                        <p><T id="footer.policies-section.4" /> <a style={{color:"#C8175D", textDecoration: "none"}} href={tx("footer.policies-section.5")}>
                            <T id="footer.policies-section.6" />
                        </a></p>
                    </div>

                    <div className="policy-block">
                        <div className="policy-icon"><i className="fa-solid fa-circle-exclamation"></i></div>
                        <h4><T id="footer.policies-section.7" /></h4>
                        <ul>
                            <li><T id="footer.policies-section.8" /></li>
                            <li><T id="footer.policies-section.9" /></li>
                            <li><T id="footer.policies-section.10" /></li>
                            <li><T id="footer.policies-section.11" /></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="footer-main">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src={img(logo)} alt={tx("footer.footer-main.1")} />
                        <p><T id="footer.footer-main.2" /></p>
                    </div>
                    <div className="footer-links">
                        <h4><T id="footer.footer-main.3" /></h4>
                        <ul>
                            <li><a href="/#about"><T id="footer.footer-main.4" /></a></li>
                            <li><a href="/#activities"><T id="footer.footer-main.5" /></a></li>
                            <li><a href="/#tickets"><T id="footer.footer-main.6" /></a></li>
                            <li><a href="/#sponsors"><T id="footer.footer-main.7" /></a></li>
                            <li><a href="/#plan"><T id="footer.footer-main.8" /></a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); openDonate(); }}><T id="footer.footer-main.9" /></a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4><T id="footer.footer-main.10" /></h4>
                        <p>   <a style={{color:"inherit", textDecoration: "none"}} href={tx("footer.footer-main.11")}>
                            <T id="footer.footer-main.12" />
                        </a></p>
                        <p><T id="footer.footer-main.13" /></p>
                    </div>
                    <div className="footer-social">
                        <h4><T id="footer.footer-main.14" /></h4>
                        <div className="social-icons">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p><T id="footer.footer-main.15" /></p>
                    <div className="footer-legal">
                        <a href="#"><T id="footer.footer-main.16" /></a> | <a href="#"><T id="footer.footer-main.17" /></a>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
