'use client';

import { T, useSite } from '@/lib/content-context';
import React, { useEffect } from 'react';
const sponsorTable = '/assets/sponsor-table.jpg';

const Sponsor = () => {
    const { tx, img } = useSite();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sponsor-page-container">
            <div className="sponsor-page-header">
                <h1 className="sponsor-page-title"><T id="sponsorpage.sponsor-page-container.1" /></h1>
                <h2 className="sponsor-page-subtitle"><T id="sponsorpage.sponsor-page-container.2" /></h2>
                <p className="sponsor-page-intro">
                    <T id="sponsorpage.sponsor-page-container.3" />
                </p>
                <p className="sponsor-page-intro">
                    <T id="sponsorpage.sponsor-page-container.4" />
                </p>
                <p className="sponsor-page-details">
                    <T id="sponsorpage.sponsor-page-container.5" /><br/>
                    <T id="sponsorpage.sponsor-page-container.6" />
                </p>
            </div>
            
            <div className="sponsor-page-image-wrapper">
                <img src={img(sponsorTable)} alt={tx("sponsorpage.sponsor-page-container.7")} className="sponsor-page-image" />
            </div>

            <div className="sponsor-page-levels-section">
                <h2 className="sponsor-page-section-title"><T id="sponsorpage.sponsor-page-container.8" /></h2>
                
                <div className="sponsor-level-item">
                    <h3><T id="sponsorpage.sponsor-page-container.9" /></h3>
                    <p><T id="sponsorpage.sponsor-page-container.10" /></p>
                </div>
                
                <div className="sponsor-level-item">
                    <h3><T id="sponsorpage.sponsor-page-container.11" /></h3>
                    <p><T id="sponsorpage.sponsor-page-container.12" /></p>
                </div>

                <div className="sponsor-level-item">
                    <h3><T id="sponsorpage.sponsor-page-container.13" /></h3>
                    <p><T id="sponsorpage.sponsor-page-container.14" /></p>
                </div>

                <div className="sponsor-level-item">
                    <h3><T id="sponsorpage.sponsor-page-container.15" /></h3>
                    <p><T id="sponsorpage.sponsor-page-container.16" /></p>
                </div>

                <div className="sponsor-level-item">
                    <h3><T id="sponsorpage.sponsor-page-container.17" /></h3>
                    <p><T id="sponsorpage.sponsor-page-container.18" /></p>
                </div>

                <div className="sponsor-level-item">
                    <h3><T id="sponsorpage.sponsor-page-container.19" /></h3>
                    <p><T id="sponsorpage.sponsor-page-container.20" /></p>
                </div>
            </div>

            <div className="sponsor-page-booth-section">
                <h2 className="sponsor-page-section-title"><T id="sponsorpage.sponsor-page-container.21" /></h2>
                <p><T id="sponsorpage.sponsor-page-container.22" /></p>
                <p><T id="sponsorpage.sponsor-page-container.23" /> <a style={{color:"inherit", textDecoration: "none"}} href={tx("sponsorpage.sponsor-page-container.24")}>
                            <T id="sponsorpage.sponsor-page-container.25" />
                        </a>:</p>
                <ul>
                    <li><T id="sponsorpage.sponsor-page-container.26" /></li>
                    <li><T id="sponsorpage.sponsor-page-container.27" /></li>
                    <li><T id="sponsorpage.sponsor-page-container.28" /></li>
                    <li><T id="sponsorpage.sponsor-page-container.29" /></li>
                </ul>
                <p><T id="sponsorpage.sponsor-page-container.30" /></p>
            </div>

            <div className="sponsor-page-footer">
                <h2><T id="sponsorpage.sponsor-page-container.31" /></h2>
                <p><T id="sponsorpage.sponsor-page-container.32" /></p>
                <p className="sponsor-page-footer-email"><T id="sponsorpage.sponsor-page-container.33" /> <a style={{color:"inherit", textDecoration: "none"}} href={tx("sponsorpage.sponsor-page-container.34")}>
                            <T id="sponsorpage.sponsor-page-container.35" />
                        </a></p>
            </div>
        </div>
    );
};

export default Sponsor;
