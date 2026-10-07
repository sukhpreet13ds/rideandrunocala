'use client';

import { T, useSite } from '@/lib/content-context';
import React from 'react';
import Link from 'next/link';
const platinum1 = '/assets/partner1.png';
const platinum2 = '/assets/partner2.png';
const platinum3 = '/assets/grande.jpg';
const dillon = '/assets/dillon-logo.png';
const gold1 = '/assets/NewSurvivorMedal.png';
const aces = '/assets/aces.png';

// const silver1 = '/assets/silver1.png';
// const silver2 = '/assets/silver2.png';
// const silver3 = '/assets/silver3.png';
// const silver4 = '/assets/silver4.png';
// const bronze1 = '/assets/bronze1.png';
// const bronze2 = '/assets/bronze2.png';
// const bronze3 = '/assets/bronze3.png';
// const bronze4 = '/assets/bronze4.png';
// const bronze5 = '/assets/bronze5.png';
const baywers = '/assets/baywers.jpeg';
const dark = '/assets/dark.png';
const loco = '/assets/loco.png';
const hook = '/assets/hook.png';

const adrienne = '/assets/rideandocala.png';
const john = '/assets/golden.jpg';
const lela = '/assets/premiumm.svg';
const lisa = '/assets/dark-horse.jpg';
const marilee = '/assets/marileelady.png';

const Brands = () => {
    const { tx, img } = useSite();
    return (
        <section id="sponsors" className="brands-section">
            <div className="section-header text-center">
                <h4 className="section-subtitle"><T id="sponsors.sponsors.1" /></h4>
                <h2 className="section-title partners-title"><T id="sponsors.sponsors.2" /></h2>
            </div>

            <div className="brands-container">
                {/* Platinum Tier */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title"><T id="sponsors.sponsors.3" /></h3>
                    <div className="sponsor-grid platinum-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(platinum2)} alt={tx("sponsors.sponsors.4")} /></div>
                            <p><T id="sponsors.sponsors.5" /></p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(dillon)} alt={tx("sponsors.sponsors.6")} style={{ backgroundColor: 'black', padding: '45px 10px' }} /></div>
                            <p><T id="sponsors.sponsors.7" /></p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(platinum1)} alt={tx("sponsors.sponsors.8")} /></div>
                            <p><T id="sponsors.sponsors.9" /></p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(aces)} alt={tx("sponsors.sponsors.10")} /></div>
                            <p><T id="sponsors.sponsors.11" /></p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(platinum3)} alt={tx("sponsors.sponsors.12")} /></div>
                            <p><T id="sponsors.sponsors.13" /></p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(dark)} alt={tx("sponsors.sponsors.14")} style={{ transform: 'scale(0.6)' }} /></div>
                            <p><T id="sponsors.sponsors.15" /></p>
                        </div>
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(baywers)} alt={tx("sponsors.sponsors.16")} /></div>
                            <p><T id="sponsors.sponsors.17" /></p>
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
                    <h3 className="sponsor-tier-title"><T id="sponsors.sponsors.18" /></h3>
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
                            <div className="sponsor-img-wrapper"><img src={img(loco)} alt={tx("sponsors.sponsors.19")} /></div>
                            <p><T id="sponsors.sponsors.20" /></p>
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
                    <h3 className="sponsor-tier-title"><T id="sponsors.sponsors.21" /></h3>
                    <div className="sponsor-grid bronze-grid">
                        <div className="sponsor-item">
                            <div className="sponsor-img-wrapper"><img src={img(hook)} alt={tx("sponsors.sponsors.22")} /></div>
                            <p><T id="sponsors.sponsors.23" /></p>
                        </div>
                    </div>
                </div>

                {/* Celebration of Life Team */}
                <div className="sponsor-tier-card">
                    <h3 className="sponsor-tier-title"><T id="sponsors.sponsors.24" /></h3>
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
                            <img src={img(adrienne)} alt={tx("sponsors.sponsors.25")} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.26" /></h4>
                                <p><T id="sponsors.sponsors.27" /></p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={img(dillon)} alt={tx("sponsors.sponsors.28")} style={{ backgroundColor: '#000', padding: "10px" }} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.29" /></h4>
                                <p><T id="sponsors.sponsors.30" /></p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={img(aces)} alt={tx("sponsors.sponsors.31")} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.32" /></h4>
                                <p><T id="sponsors.sponsors.33" /></p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={img(john)} alt={tx("sponsors.sponsors.34")} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.35" /></h4>
                                <p><T id="sponsors.sponsors.36" /></p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={img(lela)} alt={tx("sponsors.sponsors.37")} style={{ backgroundColor: '#000', padding: "10px" }} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.38" /></h4>
                                <p><T id="sponsors.sponsors.39" /></p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={img(lisa)} alt={tx("sponsors.sponsors.40")} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.41" /></h4>
                                <p><T id="sponsors.sponsors.42" /></p>
                            </div>
                        </div>
                        <div className="team-collage-item">
                            <img src={img(marilee)} alt={tx("sponsors.sponsors.43")} />
                            <div className="team-member-info">
                                <h4><T id="sponsors.sponsors.44" /></h4>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

            <div className="sponsor-cta-banner">
                <div className="sponsor-cta-content">
                    <h2><T id="sponsors.sponsors.45" /></h2>
                    <p><T id="sponsors.sponsors.46" /></p>
                </div>
                <div className="sponsor-cta-action">
                    <Link href="/sponsorship-opportunities" style={{ textDecoration: 'none' }}>
                        <button className="btn-sponsorship-kit"><T id="sponsors.sponsors.47" /></button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Brands;
