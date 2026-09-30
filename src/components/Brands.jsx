import React from 'react';
import platinum1 from '../assets/platinum1.png';
import platinum2 from '../assets/platinum2.png';
import platinum3 from '../assets/platinum3.png';
import gold1 from '../assets/gold1.png';
import gold2 from '../assets/gold2.png';
import gold3 from '../assets/gold3.png';
import gold4 from '../assets/gold4.png';
import silver1 from '../assets/silver1.png';
import silver2 from '../assets/silver2.png';
import silver3 from '../assets/silver3.png';
import silver4 from '../assets/silver4.png';
import bronze1 from '../assets/bronze1.png';
import bronze2 from '../assets/bronze2.png';
import bronze3 from '../assets/bronze3.png';
import bronze4 from '../assets/bronze4.png';
import bronze5 from '../assets/bronze5.png';

const Brands = () => {
    return (
        <section className="brands-section">
            <div className="section-header text-center">
                <h4 className="section-subtitle">OUR PARTNERS</h4>
                <h2 className="section-title">COMMITTED SPONSORS</h2>
            </div>

            <div className="brands-container">
                {/* Platinum Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">PLATINUM SPONSORS - $10,000+</h3>
                    <div className="sponsor-grid platinum-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={platinum1} alt="Ocala Equine Hospital" /></div>
                            <p>Ocala Equine Hospital</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={platinum2} alt="Gold Mark Farms" /></div>
                            <p>Gold Mark Farms</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={platinum3} alt="The Florida Horse Park Foundation" /></div>
                            <p>The Florida Horse Park Foundation</p>
                        </div>
                    </div>
                </div>

                {/* Gold Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">GOLD SPONSORS - $5,000+</h3>
                    <div className="sponsor-grid gold-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={gold1} alt="Southern National Bank" /></div>
                            <p>Southern National Bank</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={gold2} alt="Central Florida Feed" /></div>
                            <p>Central Florida Feed</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={gold3} alt="Peak Performance Equine" /></div>
                            <p>Peak Performance Equine</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={gold4} alt="Ocala Living Magazine" /></div>
                            <p>Ocala Living Magazine</p>
                        </div>
                    </div>
                </div>

                {/* Silver Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">SILVER SPONSORS - $2,500+</h3>
                    <div className="sponsor-grid silver-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={silver1} alt="Trailer Depot of Ocala" /></div>
                            <p>Trailer Depot of Ocala</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={silver2} alt="Triple Crown Nutrition" /></div>
                            <p>Triple Crown Nutrition</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={silver3} alt="Seminole Feed Stores" /></div>
                            <p>Seminole Feed Stores</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={silver4} alt="Nature's Trail Leather Goods" /></div>
                            <p>Nature's Trail Leather Goods</p>
                        </div>
                    </div>
                </div>

                {/* Bronze Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">BRONZE & FRIENDS - $1,000 & UNDER</h3>
                    <div className="sponsor-grid bronze-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={bronze1} alt="Ocala Veterinary Clinic" /></div>
                            <p>Ocala Veterinary Clinic</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={bronze2} alt="Horse Country Outfitters" /></div>
                            <p>Horse Country Outfitters</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={bronze3} alt="The Ranch Store" /></div>
                            <p>The Ranch Store</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={bronze4} alt="Ocala Runners Club" /></div>
                            <p>Ocala Runners Club</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={bronze5} alt="Florida Trail Riders Alliance" /></div>
                            <p>Florida Trail Riders Alliance</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sponsor-cta-banner">
                <div className="sponsor-cta-content">
                    <h2>WANT TO BECOME AN OFFICIAL SPONSOR?</h2>
                    <p>Gain prime brand exposure across equestrian and running communities. Over 1,000 highly active participants expected in Ocala.</p>
                </div>
                <div className="sponsor-cta-action">
                    <button className="btn-sponsorship-kit">SPONSORSHIP KIT (PDF)</button>
                </div>
            </div>
        </section>
    );
};

export default Brands;
