import React, { useEffect } from 'react';
import '../style/style.css';
import sponsorTable from '../assets/sponsor-table.jpg';

const Sponsor = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sponsor-page-container">
            <div className="sponsor-page-header">
                <h1 className="sponsor-page-title">Sponsorship Opportunities</h1>
                <h2 className="sponsor-page-subtitle">Help Us Celebrate Life and Support Breast Cancer Research</h2>
                <p className="sponsor-page-intro">
                    Become a sponsor of Celebration of Life - Ride & Run for Breast Cancer and join our community coming together to honor breast cancer survivors, encourage early detection, and support innovative research at Moffitt Cancer Center and UF Health Cancer Institute.
                </p>
                <p className="sponsor-page-intro">
                    Your sponsorship helps make this family-friendly event possible while giving your business or organization meaningful visibility before and during the event.
                </p>
                <p className="sponsor-page-details">
                    Saturday, October 31, 2026 | 10:00 a.m. - 4:00 p.m.<br/>
                    Florida Horse Park | Ocala, Florida
                </p>
            </div>
            
            <div className="sponsor-page-image-wrapper">
                <img src={sponsorTable} alt="Sponsor Table" className="sponsor-page-image" />
            </div>

            <div className="sponsor-page-levels-section">
                <h2 className="sponsor-page-section-title">Choose Your Sponsorship Level</h2>
                
                <div className="sponsor-level-item">
                    <h3>$10,000 Presenting Sponsor</h3>
                    <p>Premium featured recognition across event media; an extra-large custom event banner; recognition during the main arena program; first choice of exhibit space; reserved arena seating; featured logo placement on the event T-shirt; and 20 event tickets.</p>
                </div>
                
                <div className="sponsor-level-item">
                    <h3>$7,500 Premier Sponsor</h3>
                    <p>Individual logo recognition in event media; a large custom event banner; recognition surrounded with the Trail Ride; second choice of exhibit space; reserved arena seating; first-tier logo placement on the event T-shirt; and 15 event tickets.</p>
                </div>

                <div className="sponsor-level-item">
                    <h3>$5,000 Featured Sponsor</h3>
                    <p>Individual logo recognition in event media; a medium custom event banner; recognition surrounded with the Run/Walk/Ruck Walk; third choice of exhibit space; reserved arena seating; second-tier logo placement on the event T-shirt; and 10 event tickets.</p>
                </div>

                <div className="sponsor-level-item">
                    <h3>$2,500 Supporting Sponsor</h3>
                    <p>Group logo recognition in event media and event banners; fourth choice of exhibit space; reserved arena seating; group logo placement on the event T-shirt; and 8 event tickets.</p>
                </div>

                <div className="sponsor-level-item">
                    <h3>$1,500 Community Sponsor</h3>
                    <p>Group logo recognition in event media and event banners; fifth choice of exhibit space; reserved arena seating; group logo placement on the event T-shirt; and 6 event tickets.</p>
                </div>

                <div className="sponsor-level-item">
                    <h3>$500 Friend of the Event</h3>
                    <p>Group logo recognition in event media and event banners; sixth choice of exhibit space; reserved arena seating; group logo placement on the event T-shirt; and 4 event tickets.</p>
                </div>
            </div>

            <div className="sponsor-page-booth-section">
                <h2 className="sponsor-page-section-title">Sponsor Booth Requirements</h2>
                <p>Sponsors planning to have a booth must submit all required information and proof of insurance no later than October 15, 2026. Sponsors will not be permitted to set up without prior receipt and approval of the required insurance.</p>
                <p>Please email the following to <a style={{color:"inherit", textDecoration: "none"}} href="mailto:info@rideandrunocala.org">
                            info@rideandrunocala.org
                        </a>:</p>
                <ul>
                    <li>Proof of insurance</li>
                    <li>Business or organization name</li>
                    <li>A description of the booth, display, or presentation</li>
                    <li>The number of people staffing the booth</li>
                </ul>
                <p>Sponsors must provide their own 10-by-10-foot tent, tables, and chairs. Electricity is not available.</p>
            </div>

            <div className="sponsor-page-footer">
                <h2>Ready to Become a Sponsor?</h2>
                <p>We would be honored to recognize your support. Select your sponsorship level and help us create a joyful day of community, remembrance, survivor celebration, and hope.</p>
                <p className="sponsor-page-footer-email">For sponsorship questions, email <a style={{color:"inherit", textDecoration: "none"}} href="mailto:info@rideandrunocala.org">
                            info@rideandrunocala.org
                        </a></p>
            </div>
        </div>
    );
};

export default Sponsor;
