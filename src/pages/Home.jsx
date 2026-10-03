import '../style/style.css';
import bgImage from '../assets/ride-herobg.jpg';
import rightImage from '../assets/ride-right.jpg';
import Song from '../components/Song';
import Brands from '../components/Brands';
import event1 from '../assets/ride-event1.jpg';
import event2 from '../assets/ride-event2.jpg';
import story1 from '../assets/story1.png';
import story2 from '../assets/story2.png';
import whyLeft from '../assets/why-left.jpg';
import partner1 from '../assets/partner1.png';
import partner2 from '../assets/partner2.png';
import action1 from '../assets/action1.jpg';
import action2 from '../assets/action2.jpg';
import arena1 from '../assets/arena1.jpg';
import arena2 from '../assets/arena2.jpg';
import arena3 from '../assets/arena3.jpg';
import survivorLeft from '../assets/survivor-left.png';
import amountBg from '../assets/amount-bg.jpg';
import React, { useState, useEffect, useRef } from 'react';
import 'animate.css';

const Home = () => {
    const titleRef = useRef(null);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    useEffect(() => {
        if (!titleRef.current) return;

        const TEXT = titleRef.current;
        const chars = [];

        const parts = ['A CELEBRATION', 'OF COURAGE,', 'IN MOTION.'];
        TEXT.innerHTML = '';

        parts.forEach((part, index) => {
            part.split('').forEach(ch => {
                const s = document.createElement('span');
                s.className = 'char';
                s.style.display = 'inline-block';
                s.style.whiteSpace = 'pre';
                s.style.opacity = '0';
                s.textContent = ch;
                TEXT.appendChild(s);
                chars.push(s);
            });
            if (index < parts.length - 1) {
                TEXT.appendChild(document.createElement('br'));
            }
        });

        let _raf = null;
        function loop(onTick) {
            cancelAnimationFrame(_raf);
            function tick() { if (!onTick()) _raf = requestAnimationFrame(tick); }
            _raf = requestAnimationFrame(tick);
        }

        const GRAVITY = 0.9, BOUNCE = 0.42;
        const st = chars.map((_, i) => ({ pos: -(60 + i * 12), vel: 0, settled: false, op: 0, opv: 0 }));
        let f = 0;

        loop(() => {
            f++;
            let done = true;
            chars.forEach((ch, i) => {
                if (f < i * 4) { done = false; return; }
                const s = st[i];
                if (!s.settled) {
                    s.vel += GRAVITY;
                    s.pos += s.vel;
                    if (s.pos >= 0) {
                        s.pos = 0;
                        s.vel *= -BOUNCE;
                        if (Math.abs(s.vel) < 1.0) { s.vel = 0; s.settled = true; }
                        else done = false;
                    } else done = false;
                }
                s.opv += (1 - s.op) * 0.07; s.opv *= 0.78; s.op += s.opv;
                ch.style.transform = `translateY(${s.pos}px)`;
                ch.style.opacity = s.op;
            });
            return done;
        });

        return () => cancelAnimationFrame(_raf);
    }, []);

    useEffect(() => {
        const zoomInSelectors = [
            '.adventure-card',
            '.partner-card',
            '.story-card',
            '.event-card',
            '.stadium-card',
            '.ticket-card',
            '.sponsor-item',
            '.info-card'
        ];

        const slideInUpSelectors = [
            '.hero-description',
            '.stat-card',
            '.btn-register',
            '.btn-donate-alt',
            '.btn-contact',
            '.btn-adventure',
            '.btn-sponsorship-kit',
            '.btn-pill-pink',
            '.ticket-register',
            '.section-title',
            '.section-subtitle',
            '.hero-subtitle',
            '.story-description p',
            '.why-paragraphs p',
            '.why-badge',
            '.quote',
            '.author',
            '.survivor-right-content p',
            '.survivor-title-wrap h2',
            '.read-more-link'
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const isZoom = zoomInSelectors.some(sel => entry.target.matches(sel));
                    entry.target.style.visibility = 'visible';
                    entry.target.classList.add('animate__animated');
                    entry.target.classList.add(isZoom ? 'animate__zoomIn' : 'animate__slideInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const allSelectors = [...zoomInSelectors, ...slideInUpSelectors];
        allSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.visibility = 'hidden';
                observer.observe(el);
            });
        });

        return () => observer.disconnect();
    }, []);
    return (
        <>
            <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="top-banner" onClick={() => setIsBannerModalOpen(true)}>
                    <div className="marquee-wrapper">
                        <div className="marquee-content">
                            <p>IMPORTANT EVENT REQUIREMENTS: All participants, spectators, sponsors and volunteers must sign the Florida Agriculture & Horse Park Authority, Inc. Complete Release From Liability In Case of Injury or Loss, Waiver Indemnity Agreement before registering and entering the Florida Horse Park. Please read the Florida Horse Park Rules and Regulations to help ensure a safe and enjoyable event day. Horse trail riders must also sign the Celebration of Life Waiver and Liability Release Agreement.</p>
                            <p>IMPORTANT EVENT REQUIREMENTS: All participants, spectators, sponsors and volunteers must sign the Florida Agriculture & Horse Park Authority, Inc. Complete Release From Liability In Case of Injury or Loss, Waiver Indemnity Agreement before registering and entering the Florida Horse Park. Please read the Florida Horse Park Rules and Regulations to help ensure a safe and enjoyable event day. Horse trail riders must also sign the Celebration of Life Waiver and Liability Release Agreement.</p>
                        </div>
                    </div>
                </div>

                {isBannerModalOpen && (
                    <div className="banner-modal-overlay" onClick={() => setIsBannerModalOpen(false)}>
                        <div className="banner-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="banner-modal-close" onClick={() => setIsBannerModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <h3>IMPORTANT EVENT REQUIREMENTS</h3>
                            <p>All participants, spectators, sponsors and volunteers must sign the Florida Agriculture & Horse Park Authority, Inc. Complete Release From Liability In Case of Injury or Loss, Waiver Indemnity Agreement before registering and entering the Florida Horse Park.</p>
                            <p>Please read the Florida Horse Park Rules and Regulations to help ensure a safe and enjoyable event day.</p>
                            <p>Horse trail riders must also sign the Celebration of Life Waiver and Liability Release Agreement.</p>
                        </div>
                    </div>
                )}

                <div className="hero-section">
                    <div className="hero-content">
                        <div className="hero-subtitle">
                            <span className="check-icon"><i className="fa-solid fa-check"></i></span> Ocala, Florida | October 31, 2026
                        </div>
                        <h1 className="hero-title" ref={titleRef}>
                            A CELEBRATION<br />OF COURAGE,<br />IN MOTION.
                        </h1>
                        <p className="hero-description">
                            A family-friendly day at Florida Horse Park honoring breast cancer survivors and raising funds for breast cancer research at Moffitt Cancer Center and UF Health Cancer Institute.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-register">
                                <span className="icon"><i className="fa-solid fa-file-pen"></i></span> Register for the Event
                            </button>
                            <button className="btn-donate-alt">
                                <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> Donate Instead
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={rightImage} alt="Ride right" className="animate__animated animate__zoomIn" />
                    </div>
                </div>

                <div className="stats-section">
                    <div className="stat-card">
                        <h3>$35 / $10</h3>
                        <p>Adults - $35 | Children ages 4-12 - $10<br />Children age 3 and under free</p>
                    </div>
                    <div className="stat-card">
                        <h3>2 Beneficiaries</h3>
                        <p>Moffitt Cancer Center & UF Health Cancer Institute</p>
                    </div>
                    <div className="stat-card">
                        <h3>5 & 2 mi</h3>
                        <p>Poker ride and family run/walk/ruck routes</p>
                    </div>
                    <div className="stat-card">
                        <h3>501(c)(3)</h3>
                        <p>Nonprofit organization (pending)</p>
                    </div>
                </div>
            </div>
            <Song />

            <section id="about" className="about-event-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle">ABOUT THE EVENT</h4>
                    <h2 className="section-title partners-title">MAKING A DIFFERENCE</h2>
                </div>
                <div className="about-event-grid">
                    <div className="event-card">
                        <img src={event1} alt="Ride and Run Ocala" />
                        <h3>ABOUT RIDE & RUN OCALA</h3>
                        <p>Celebration of Life - Ride & Run for Breast Cancer is a joyful community event created to honor breast cancer survivors, encourage early detection, and raise funds for breast cancer research. The event is presented by Celebration of Life, Ride and Run for Breast Cancer, Inc., a 501(c)(3) nonprofit organization (pending).</p>
                    </div>
                    <div className="event-card divider"></div>
                    <div className="event-card">
                        <img src={event2} alt="Supporting Breast Cancer Research" />
                        <h3>SUPPORTING BREAST CANCER RESEARCH</h3>
                        <p>Proceeds from Celebration of Life - Ride & Run for Breast Cancer benefit two leading cancer institutions: Moffitt Cancer Center and UF Health Cancer Institute. Funds raised through the event will help advance breast cancer research, improve treatment, and bring new hope to individuals and families affected by breast cancer.</p>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn-contact">CONTACT OUR TEAM AT INFO@RIDEANDRUNOCALA.ORG</button>
                </div>
            </section>

            <section className="our-story-section">
                <div className="story-top">
                    <div className="story-header">
                        <h4 className="section-subtitle">OUR STORY</h4>
                        <h2 className="section-title left-align">RIDE & RUN FOR BREAST CANCER</h2>
                    </div>
                    <div className="story-description">
                        <p><strong>The Celebration of Life was founded on a simple, powerful promise:</strong> to unite Florida's vibrant horse country and athletic community in the fight against breast cancer. Hosted at Ocala's historic Florida Horse Park, our annual Ride & Run brings families together on the trails and track to honor survivors, remember loved ones, and fund breast cancer research. Every registration, every sponsor, and every single stride moves us closer to a cure.</p>
                    </div>
                </div>
                <div className="story-cards">
                    <div className="story-card">
                        <h5 className="card-subtitle">MESSAGES FROM OUR BENEFICIARIES</h5>
                        <img src={story1} alt="Moffitt Cancer Center" className="story-logo moffitt-logo" />
                        <hr className="card-divider" />
                        <p className="quote">"We are grateful for community partners like Celebration of Life, Ride and Run for Breast Cancer who work so hard to organize events and activities that support innovative research and treatment at Moffitt Cancer Center. You strive with us to create a better future without cancer. Thank you so much for your support!"</p>
                        <div className="author">
                            <p>Maria Muller</p>
                            <p>Executive Vice President and President, Moffitt Foundation</p>
                        </div>
                    </div>
                    <div className="story-card">
                        <div className="card-top-area">
                            <img src={story2} alt="UF Health Cancer Institute" className="story-logo uf-logo" />
                        </div>
                        <hr className="card-divider" />
                        <p className="quote">"Each year, thousands of individuals and their loved ones face a breast cancer diagnosis, reminding us of the urgent need for continued prevention, early detection, and treatment innovations. Your support of the Celebration of Life, Ride and Run for Breast Cancer advances breast cancer research at the UF Health Cancer Institute. Breakthroughs in digital imaging, targeted therapies, and tailored survivorship care can transform lives, and your support helps make this work possible. Thank you for helping us move research forward and bring new hope to those affected by breast cancer."</p>
                        <div className="author">
                            <p>Dr. Thomas George</p>
                            <p>Director, UF Health Cancer Institute</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-started-section">
                <div className="why-left-image" style={{ backgroundImage: `url(${whyLeft})` }}></div>
                <div className="why-content-wrapper">
                    <div className="why-content">
                        <div className="why-badge">WHY WE STARTED RIDE & RUN</div>
                        <h2 className="section-title left-align" style={{ marginBottom: '30px' }}>A MESSAGE FROM THE FOUNDER</h2>

                        <div className="why-paragraphs">
                            <p>"While dealing with breast cancer, I dreamed about creating this joyous event as a way of fighting back and creating awareness. There is life after breast cancer, if diagnosed early.</p>
                            <p>"Fear" is a four-letter word that keeps many women from getting annual mammograms, doing self-exams or going to their doctors. Many walk around for years with lumps they can feel or are even visible. By allowing "fear" to rule their lives, they lessen their chances of survival. We hope they will see from the breast cancer survivors today, we are leading happy, healthy and productive lives.</p>
                            <p>The "Celebration of Life" event honors the courage and strength of each breast cancer survivor throughout this life-changing experience. Dr. Bernie Siegel wrote, "Cancer is a gift." It was not readily apparent to me, but as time went on I began to understand what he meant. My gifts are the extraordinary people who continue to come into my life. They show me kindness, compassion and love as I have never known before. And it is because of them, my life has new meaning.</p>
                        </div>

                        <hr className="why-divider" />

                        <div className="founder-footer">
                            <div className="founder-info">
                                <h3>Adrienne Skolnik</h3>
                                <h4>Founder, President and Chairwoman</h4>
                                <p>Celebration of Life, Ride and Run for Breast Cancer, Inc.</p>
                                <p className="small-text">A 501(c)(3) nonprofit organization (pending)</p>
                            </div>
                            <div className="founder-action">
                                <button className="btn-contact">CONTACT OUR TEAM AT INFO@RIDEANDRUNOCALA.ORG</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sponsors" className="partners-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle">OUR PARTNERS</h4>
                    <h2 className="section-title partners-title">OUR EVENT PARTNERS</h2>
                    <p className="partners-description">With appreciation to the Florida Horse Park and The Horse Talk Show for helping bring this special day to life.</p>
                </div>

                <div className="partners-grid">
                    <div className="partner-card">
                        <img src={partner2} alt="Florida Horse Park" />
                        <h5>Florida Horse Park</h5>
                        <p>Ocala, Florida</p>
                    </div>
                    <div className="partner-card">
                        <img src={partner1} alt="The Horse Talk Show" />
                        <h5>The Horse Talk Show</h5>
                        <p>with Louisa Barton</p>
                    </div>
                </div>
            </section>

            <section id="activities" className="adventure-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle white-text">JOIN THE ACTION</h4>
                    <h2 className="section-title white-text partners-title">CHOOSE YOUR ADVENTURE</h2>
                </div>

                <div className="adventure-grid">
                    <div className="adventure-card">
                        <img src={action1} alt="Poker Ride" className="adventure-img" />
                        <div className="adventure-card-content">
                            <div className="adventure-card-title">
                                <span className="adventure-icon"><i className="fa-solid fa-xmark"></i></span>
                                <h3>Bring Your Own Horse Poker Trail Ride</h3>
                            </div>
                            <p className='join-p'>Bring your horse and enjoy a five-mile poker ride along the Florida Greenway. The ride is open from 10:00 a.m. to 1:00 p.m. Minimum age is ten years old. Riders between the ages of ten and fifteen must be accompanied by their parent or responsible adult. Riders will collect their poker hand along the route while enjoying one of Ocala’s beautiful equestrian trails.</p>
                            <p className='join-p'><b>Rider Requirements</b></p>
                            <ul className="adventure-features">
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>Every horse must have a current negative Coggins certificate. Please bring proof with you; it will be checked when you arrive.</li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span> Riders age 15 and younger must wear a properly fitted riding helmet, as required by Florida law.</li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>All riders must wear riding boots, paddock shoes, or footwear with an adequate heel. Open-toed shoes are not permitted.</li>
                            <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>Backpacks may not be worn during the trail ride.</li>
                            </ul>
                            <button className="btn-adventure">REGISTER TO RIDE</button>
                        </div>
                    </div>
                    <div className="adventure-card">
                        <img src={action2} alt="Family Run Walk Ruck" className="adventure-img" />
                        <div className="adventure-card-content">
                            <div className="adventure-card-title">
                                <span className="adventure-icon"><i className="fa-solid fa-shoe-prints"></i></span>
                                <h3>Family Run, Walk & Ruck Walk</h3>
                            </div>
                            <p className='join-p'>Enjoy a scenic two-mile trail at your own pace between 10:00 a.m. and 1:00 p.m. This is a family-oriented activity, not a timed race. Run, walk, or bring your ruck pack and join the Ruck Walk.
</p>
                            <ul className="adventure-features">
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>Parents or guardians must accompany participants age 15 and younger.</li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span> Strollers for young children are welcome.</li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>Bicycles, scooters and motorized scooters, and motorized carts are not permitted on the route.
                                </li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>Water stations will be available along the trail.
                                </li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span>We recommend wearing sunscreen, comfortable shoes, and a hat.
                                </li>
                            </ul>
                            <p className='join-p'>Veterans, bring your ruck packs and join us!</p>
                            <button className="btn-adventure">REGISTER TO RUN</button>
                        </div>
                    </div>
                </div>

                <div className="adventure-extra-info">
                    <h4>Your Poker Ride Adventure</h4>
                    <p>
                        <b>Poker Ride participants must enter through the Florida Horse Park entrance on Highway 475.</b> You will be directed to horse-trailer parking directly across from the trail entrance. Parking is free. Please be ready to show your registration and current negative Coggins certificate. <b>All required Florida Horse Park and Celebration of Life Waivers and Liability Release Agreements must be completed online before registration.</b>
                    </p>
                    <p>
                        One poker hand is included with every adult registration. <b>Trail riders can purchase additional poker hands.</b> Registration will record the number of poker hands associated with each rider.
                    </p>

                    <div className="adventure-accordion">
                        <button 
                            className={`accordion-header ${isAccordionOpen ? 'open' : ''}`} 
                            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        >
                            Traveling With Your Horse? Overnight Stalls, RV Hookups & Camping
                            <span className="accordion-icon"><i className={`fa-solid ${isAccordionOpen ? 'fa-minus' : 'fa-plus'}`}></i></span>
                        </button>
                        <div className={`accordion-content ${isAccordionOpen ? 'open' : ''}`}>
                            <p className="acc-intro">
                                <mark className="acc-highlight">All Trail Riders must enter the Florida Horse Park through the Highway 475 entrance.</mark><br/><br/>
                                Trail Riders arriving the day before the Celebration of Life event may reserve overnight stabling and RV Hookup accommodations through one of the following two options. All reservations and payments are made directly with the facility.
                            </p>

                            <div className="acc-option">
                                <h5>Option A: Florida Horse Park – Onsite of event</h5>
                                <p className="acc-address">
                                    11008 South Highway 475<br/>
                                    Ocala, Florida 34480<br/>
                                    <a href="tel:352-307-6699" className="acc-phone"><mark className="acc-highlight">352-307-6699</mark></a>
                                </p>
                                
                                <div className="acc-rates">
                                    <strong>Overnight rates:</strong>
                                    <ul>
                                        <li>RV hookup: <b>$45</b> per night</li>
                                        <li>Stall: <b>$35</b> per night</li>
                                        <li>Shavings: <b>$8</b> per bag, with a minimum of two bags per stall</li>
                                    </ul>
                                </div>

                                <ol className="acc-list">
                                    <li>Please call the Florida Horse Park directly for <mark className="acc-highlight">October 30th reservations</mark> for rental of stalls, shavings and RV hookups for Live-In quarters overnight trailer parking.</li>
                                    <li>Payment will be made directly to Florida Horse Park at that time.</li>
                                    <li>The cut off date for reservations and payment for stalls, RV hookups and shavings will be at <mark className="acc-highlight">12 Noon, Wednesday, October 28th</mark> with no exceptions.</li>
                                    <li>Check-in time is earliest, 12 noon, but no later than 4pm on Oct. 30 to sign Florida Horse Park and Celebration of Life Waiver and Liability Releases before use of stalls and RV hookups.</li>
                                    <li><mark className="acc-highlight">*Copy of Coggins must also be handed in at this time.</mark> (Please bring a copy of Coggins to be retained by Florida Horse Park. We will not have access to a copy machine at this time.)</li>
                                    <li>There is ONLY access to stalls and RV hookups. NO ARENA ACCESS. (Undercover, Fiber or Grass).</li>
                                    <li>You are welcome to go on the trails.</li>
                                    <li>We appreciate you using only the RV hookup and stall allocated to you when your reservations and payment were made.</li>
                                    <li>Stalls must be cleaned after the event or guest will be charged a $20 cleaning fee per stall.</li>
                                </ol>
                            </div>

                            <div className="acc-option">
                                <h5>Option B: Black Horse Ranch</h5>
                                <p className="acc-address">
                                    22651 SE Highway 42<br/>
                                    Umatilla, FL 32784<br/>
                                    <a href="tel:352-718-2270" className="acc-phone"><mark className="acc-highlight">(352) 718-2270</mark></a>
                                </p>

                                <ol className="acc-list">
                                    <li>Anyone who is registered as a participant for the Celebration of Life event can camp at Black Horse Ranch from October 30 to November 1.</li>
                                    <li>They must send us their ticket registration confirmation via email or a screenshot to our text line at <a href="tel:352-718-2270" className="acc-link"><mark className="acc-highlight">352-718-2270</mark></a>.</li>
                                    <li>To book a reservation, Celebration of Life participants would text/call us at that same number <a href="tel:312-718-2270" className="acc-link"><mark className="acc-highlight">(312) 718-2270</mark></a>.</li>
                                    <li>All information needed will be on our website <a href="http://blackhorseranch.com" target="_blank" rel="noopener noreferrer" className="acc-link">blackhorseranch.com</a>.</li>
                                    <li>Participants need to reserve their space by <mark className="acc-highlight">12 noon, October 28th</mark>, directly through Black Horse Ranch at 352-718-2270.</li>
                                    <li>Black Horse Ranch offers 30amp and 50amp sites, welcomes tent camping and horse trailer camping, and can accommodate XXL rigs no problem.</li>
                                    <li>We have a kitchen and bathhouse (hot water, showers, laundry) on site that people are welcome to use.</li>
                                    <li>We have trails off the property and arena on the property.</li>
                                    <li>Outdoor individual paddocks, as well as, stalls.</li>
                                    <li>We also have a pool and tack shop onsite.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stadium-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle">IN THE ARENA</h4>
                    <h2 className="section-title partners-title">Exciting World Class Equestrian Performances</h2>
                </div>

                <div className="stadium-grid">
                    <div className="stadium-card">
                        <img src={arena1} alt="Survivor Celebration" className="stadium-img" />
                        <div className="stadium-card-content">
                            <h3>SURVIVOR CELEBRATION</h3>
                            <p>Join us for a special Welcoming and Survivor Celebration as we recognize breast cancer survivors, honor their courage and strength, and celebrate life, community, and hope.</p>
                            <a href="#" className="read-more-link active">READ MORE</a>
                        </div>
                    </div>
                    <div className="stadium-card">
                        <img src={arena2} alt="Mounted Games" className="stadium-img" />
                        <div className="stadium-card-content">
                            <h3>MOUNTED GAMES</h3>
                            <p>Experience the excitement of Mounted Games with The Flying Aces, featuring Jackson Wagner and friends. This fast-paced equestrian sport combines speed, agility, and teamwork.</p>
                            <a href="#" className="read-more-link">READ MORE</a>
                        </div>
                    </div>
                    <div className="stadium-card">
                        <img src={arena3} alt="Grande Liberte" className="stadium-img" />
                        <div className="stadium-card-content">
                            <h3>GRANDE LIBERTÉ</h3>
                            <p>Sylvia Zerbini presents Grande Liberté with her Arabian horses, joined by The Jewell Twins violinists. Get ready for a unique mix of horses, music, and live performance in the arena!</p>
                            <a href="#" className="read-more-link">READ MORE</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="extra-info-section">
                <div className="extra-grid-top">
                    <div className="info-card">
                        <div className="info-card-title">
                            <span className="info-icon"><i className="fa-solid fa-trophy"></i></span>
                            <h3>DRAWINGS AND PRIZES</h3>
                        </div>
                        <p className="info-bold-text">Make sure to bring the drawing tickets you received with your registration.</p>
                        <ul className="info-list">
                            <li>Poker Hand Trail Ride Prize</li>
                            <li>Prizes for best Halloween costume, adult, child and horses.</li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <div className="info-card-title">
                            <span className="info-icon"><i className="fa-regular fa-star"></i></span>
                            <h3>MORE TO ENJOY</h3>
                        </div>
                        <p className="info-bold-text">There is even more waiting for you throughout the day:</p>
                        <ul className="info-list">
                            <li>Costume fun for guests and participants</li>
                            <li>A variety of food trucks serving delicious main-course entrees and luscious desserts</li>
                        </ul>
                    </div>
                </div>

                <div className="survivor-card-container">
                    <div className="survivor-left-img">
                        <img src={survivorLeft} alt="Breast Cancer Survivors Gold Medal" />
                    </div>
                    <div className="survivor-right-content">
                        <div className="survivor-title-wrap">
                            <div className="pink-vertical-line"></div>
                            <h2>SURVIVORS GOLD MEDAL</h2>
                        </div>
                        <p>All breast cancer survivors will receive as our special gift, the "Survivor Gold Medal." For they are all winners having fought this battle and won!</p>
                        <button className="btn-pill-pink">HONORING EVERY SURVIVOR</button>
                    </div>
                </div>
            </section>

            <section id="tickets" className="tickets-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${amountBg})` }}>
                <div className="tickets-banner">
                    <h3>IMPORTANT: ALL RIDERS & RUNNERS MUST ELECTRONICALLY SIGN A WAIVER BEFORE ENTRY.</h3>
                </div>
                <div className="tickets-grid">
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4>Poker Ride Ticket</h4>
                            <h2>$35</h2>
                            <p>Includes (1) Poker Hand & Event T-shirt, Drawing Ticket</p>
                        </div>
                        <div className="ticket-register">
                            <span>REGISTER</span>
                        </div>
                    </div>
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4>Family Run / Walk / Ruck</h4>
                            <h2>$35</h2>
                            <p>Includes Event T-Shirt, Drawing Ticket</p>
                        </div>
                        <div className="ticket-register">
                            <span>REGISTER</span>
                        </div>
                    </div>
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4>Main Arena Equestrian Events</h4>
                            <h2>$35</h2>
                            <p>Includes Event T-Shirt, Drawing Ticket</p>
                        </div>
                        <div className="ticket-register">
                            <span>REGISTER</span>
                        </div>
                    </div>
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4>Children 4-12</h4>
                            <h2>$10</h2>
                            <p>Under 3 Free</p>
                        </div>
                        <div className="ticket-register">
                            <span>REGISTER</span>
                        </div>
                    </div>
                </div>
            </section>

            <Brands />
        </>
    );
};

export default Home;