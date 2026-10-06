import React from 'react';
import { Link } from 'react-router-dom';
import platinum1 from '../assets/partner1.png';
import platinum2 from '../assets/partner2.png';
import platinum3 from '../assets/grande.jpg';
import dillon from '../assets/dillon-logo.png';
import gold1 from '../assets/NewSurvivorMedal.png';
import aces from '../assets/aces.jpg';

// import silver1 from '../assets/silver1.png';
// import silver2 from '../assets/silver2.png';
// import silver3 from '../assets/silver3.png';
// import silver4 from '../assets/silver4.png';
// import bronze1 from '../assets/bronze1.png';
// import bronze2 from '../assets/bronze2.png';
// import bronze3 from '../assets/bronze3.png';
// import bronze4 from '../assets/bronze4.png';
// import bronze5 from '../assets/bronze5.png';
import baywers from '../assets/baywers.jpeg';
import dark from '../assets/dark.png';
import loco from '../assets/loco.png';
import hook from '../assets/hook.png';

import adrienne from '../assets/rideandocala.png';
import john from '../assets/golden.jpg';
import lela from '../assets/premiumm.svg';
import lisa from '../assets/dark-horse.jpg';

const Brands = () => {
    return (
        <section id="sponsors" className="brands-section">
            <div className="section-header text-center">
                <h4 className="section-subtitle">OUR PARTNERS</h4>
                <h2 className="section-title partners-title">COMMITTED SPONSORS</h2>
            </div>

            <div className="brands-container">
                {/* Platinum Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">PLATINUM SPONSORS - $10,000+</h3>
                    <div className="sponsor-grid platinum-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={platinum2} alt="Florida Horse Park" /></div>
                            <p>Florida Horse Park</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={dillon} alt="Dillon Media" style={{ backgroundColor: 'black', padding: '45px 10px' }} /></div>
                            <p>Dillon Media</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={platinum1} alt="The Horse Talk Show" /></div>
                            <p>The Horse Talk Show</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={aces} alt="The Florida Horse Park Foundation" /></div>
                            <p>The Flying Aces with Jackson Wagner and friends</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={platinum3} alt="The Florida Horse Park Foundation" /></div>
                            <p>Grande Liberte Farm</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={dark} alt="The Dark Horse Project" style={{ transform: 'scale(0.6)' }} /></div>
                            <p>The Dark Horse Project</p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={baywers} alt="Bayview Bins" /></div>
                            <p>Bayview Bins</p>
                        </div>
                    </div>
                </div>

                {/* Gold Tier */}
                {/* <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">GOLD SPONSORS - $5,000+</h3>
                    <div className="sponsor-grid gold-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={gold1} alt="New Survior Medal" /></div>
                            <p>New Survior Medal</p>
                        </div>
                     
                    </div>
                </div> */}

                {/* Silver Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">SILVER SPONSORS - $2,500+</h3>
                    <div className="sponsor-grid silver-grid">
                        {/* <div className="sponsor-item">
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
                        </div> */}
                        <div className="sponsor-item" style={{ width: "30%" }}>
                            <div className="sponsor-img-wrapper"><img src={loco} alt="Loco Graphics" /></div>
                            <p>Loco Graphics</p>
                        </div>
                    </div>
                </div>

                {/* Bronze Tier */}
                {/* <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">BRONZE SPONSORS - $1,000+</h3>
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
                </div> */}

                {/* Community/Friends Tier ($500) */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">FRIENDS SPONSORS - $500+</h3>
                    <div className="sponsor-grid bronze-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={hook} alt="Hook Company" /></div>
                            <p>Hook Company</p>
                        </div>
                    </div>
                </div>

                {/* Celebration of Life Team */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title">FRIENDS SPONSORS - $500+ | CELEBRATION OF LIFE TEAM</h3>
                    <style>
                        {`
                        .team-collage {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 20px;
                            align-items: flex-start;
                            justify-items: center;
                            padding: 20px 0;
                        }
                        .team-collage-item {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }
                        .team-collage-item img {
                            width: 80%;
                            max-height: 160px;
                            object-fit: contain;
                            margin-bottom: 12px;
                        }
                        .team-member-info h4 {
                            margin: 0;
                            font-family: var(--font-oxanium, sans-serif);
                            font-size: 18px;
                            color: #1B2431;
                        }
                        .team-member-info p {
                            margin: 5px 0 0;
                            font-family: var(--font-oxanium, sans-serif);
                            font-size: 14px;
                            color: #666;
                        }
                        @media (max-width: 768px) {
                            .team-collage {
                                grid-template-columns: repeat(2, 1fr);
                                gap: 15px;
                            }
                            .team-collage-item img {
                                max-height: 250px;
                            }
                        }
                        `}
                    </style>
                    <div className="team-collage">
                        <div className="team-collage-item">
                            <img src={adrienne} alt="Adrienne" />
                            <div className="team-member-info">
                                <h4>Adrienne Skolnik</h4>
                                <p>Chairwoman</p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={dillon} alt="Clinton" style={{ backgroundColor: '#000', padding: "10px" }} />
                            <div className="team-member-info">
                                <h4>Clinton Grubbs</h4>
                                <p>Dillon Media</p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={aces} alt="Aces" />
                            <div className="team-member-info">
                                <h4>Jackson Wagner</h4>
                                <p>The Flying Aces</p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={john} alt="John" />
                            <div className="team-member-info">
                                <h4>John Golden</h4>
                                <p>Golden Reed Wealth Management</p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={lela} alt="Lela" style={{ backgroundColor: '#000', padding: "10px" }} />
                            <div className="team-member-info">
                                <h4>Lela Kerley</h4>
                                <p>Premiere Concierge Care</p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={lisa} alt="Lisa" />
                            <div className="team-member-info">
                                <h4>Lisa Ciesniewski</h4>
                                <p>The Dark Horse Project</p>
                            </div>
                        </div>

                        {/* <div className="team-collage-item">
                            <img src={marilee} alt="Marilee" />
                            <div className="team-member-info">
                                <h4>Marilee McGinnis</h4>
                                <p>Company Name</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="sponsor-cta-banner">
                <div className="sponsor-cta-content">
                    <h2>WANT TO BECOME AN OFFICIAL SPONSOR?</h2>
                    <p>Gain prime brand exposure across equestrian and running communities. Over 1,000 highly active participants expected in Ocala.</p>
                </div>
                <div className="sponsor-cta-action">
                    <Link to="/sponsorship-opportunities" style={{ textDecoration: 'none' }}>
                        <button className="btn-sponsorship-kit">SPONSORSHIP KIT (PDF)</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Brands;
