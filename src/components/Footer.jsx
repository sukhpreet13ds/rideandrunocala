import React from 'react';
import directionBg from '../assets/direction-bg.jpg';
import directionImg from '../assets/direction.jpg';
import logo from '../assets/rideandocala.png';

const Footer = () => {
    return (
        <footer>
            <section id="plan" className="visit-section" style={{ backgroundImage: `linear-gradient(rgba(31, 38, 51, 0.8), rgba(31, 38, 51, 0.8)), url(${directionBg})` }}>
                <div className="visit-container">
                    <div className="visit-left">
                        <h4 className="visit-subtitle">PLAN YOUR VISIT</h4>
                        <h2 className="visit-title">THE FLORIDA HORSE PARK</h2>
                        <h3 className="visit-date">EVENT SCHEDULE — OCT 31, 2026</h3>

                        <div className="schedule-list">
                            <div className="schedule-item">
                                <span className="schedule-time">10:00 AM</span>
                                <span className="schedule-text">Gates Open at The Florida Horse Park!</span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-time">10:00 AM -<br/>1:00 PM</span>
                                <span className="schedule-text">Poker Ride and Run/Walk/Ruck</span>
                            </div>
                            <div className="schedule-item empty-time">
                                <span className="schedule-time"></span>
                                <span className="schedule-text">Featured Events and Survivor Celebration in the Main Arena</span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-time">1:00 PM</span>
                                <span className="schedule-text">Thrilling equestrian performances following the Celebration</span>
                            </div>
                            <div className="schedule-item empty-time">
                                <span className="schedule-time"></span>
                                <span className="schedule-text">Drawing and Prizes complete this wonderful day</span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-time">4:00 PM</span>
                                <span className="schedule-text">Event Concludes</span>
                            </div>
                        </div>
                    </div>
                    <div className="visit-right">
                        <img src={directionImg} alt="Florida Horse Park Directions" className="direction-img" />
                        
                        <div className="info-boxes">
                            <div className="info-box">
                                <div className="info-box-icon"><i className="fa-solid fa-location-dot"></i></div>
                                <div className="info-box-content">
                                    <h4>DIRECTIONS</h4>
                                    <p>Florida Horse Park: 11008 South Hwy 475, Ocala, FL 34480. Easily accessible from I-75 Exit 341.</p>
                                </div>
                            </div>
                            <div className="info-box">
                                <div className="info-box-icon"><i className="fa-solid fa-circle-xmark"></i></div>
                                <div className="info-box-content">
                                    <h4>PARKING</h4>
                                    <p>Free parking on-site. Poker Ride participants must use the Highway 475 entrance and will be directed to horse-trailer parking near the trail.</p>
                                </div>
                            </div>
                            <div className="info-box">
                                <div className="info-box-icon"><i className="fa-solid fa-clipboard-list"></i></div>
                                <div className="info-box-content">
                                    <h4>WHAT TO BRING</h4>
                                    <p>Your ticket registration confirmation, saved on your phone or printed. Sunscreen, a hat, and comfortable footwear. <strong>A current Coggins certificate and proper riding equipment if participating with a horse.</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="donate-banner">
                <div className="donate-banner-container">
                    <div className="donate-banner-left">
                        <span className="donate-icon"><i className="fa-solid fa-xmark"></i></span>
                        <h2>EVERY DOLLAR FIGHTS BREAST CANCER</h2>
                    </div>
                    <button className="btn-donate">DONATE NOW</button>
                </div>
            </section>

            <section className="policies-section">
                <div className="policies-container">
                    <div className="policy-block">
                        <div className="policy-icon"><i className="fa-solid fa-dog"></i></div>
                        <h4>Dogs</h4>
                        <p>Dogs must always be on a leash and under control of the handler at all times. Please clean up after your dog.</p>
                    </div>

                    <div className="policy-block">
                        <div className="policy-icon"><i className="fa-solid fa-wheelchair"></i></div>
                        <h4>Accessibility</h4>
                        <p>The Florida Horse Park is a beautiful 500 acre open/air facility with mainly grass and sand surfaces. There is a roadway that runs through the park, but no protected surfaces. Sand surfaces surround the Main Arena. Parking areas are all covered in grass. Please take necessary precautions when navigating these areas. For further information please contact: <a href="mailto:info@rideandrunocala.org">info@rideandrunocala.org</a></p>
                    </div>

                    <div className="policy-block">
                        <div className="policy-icon"><i className="fa-solid fa-circle-exclamation"></i></div>
                        <h4>Event Policies</h4>
                        <ul>
                            <li>Liquor and recreational drugs are not allowed in the Florida Horse Park for the Celebration of Life Event.</li>
                            <li>No smoking in the arenas, bleachers, stable areas or equine buildings.</li>
                            <li>Dogs must always be on a leash and under control of the handler at all times. Please clean up after your dog.</li>
                            <li>Dogs will not be permitted in the main arena and bleacher seating areas.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="footer-main">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src={logo} alt="Ride and Run Ocala" />
                        <p>A registered 501(c)(3) nonprofit charity (pending) initiative dedicated to funding breast cancer research. Hosted annually at the Florida Horse Park in Ocala.</p>
                    </div>
                    <div className="footer-links">
                        <h4>NAVIGATION</h4>
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#activities">Activities</a></li>
                            <li><a href="#tickets">Tickets</a></li>
                            <li><a href="#sponsors">Sponsors</a></li>
                            <li><a href="#plan">Plan Visit</a></li>
                            <li><a href="#donate">Donate</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>CONTACT INFO</h4>
                        <p>Email: info@rideandrunocala.org</p>
                        <p>Address: Ocala, Florida (Horse park)</p>
                    </div>
                    <div className="footer-social">
                        <h4>FOLLOW OUR MOVEMENT</h4>
                        <div className="social-icons">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>Copyright © 2026 Celebration of Life Ride and Run for Breast Cancer, Inc. All Rights Reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a> | <a href="#">Terms & Condition</a>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
