'use client';

import { T, useSite } from '@/lib/content-context';
import { useModals } from './ModalProvider';
const bgImage = '/assets/ride-herobg.jpg';
const rightImage = '/assets/ride-right.jpg';
import Song from '../components/Song';
import Brands from '../components/Brands';
const event1 = '/assets/ride-event1.jpg';
const event2 = '/assets/ride-event2.jpg';
const story1 = '/assets/story1.png';
const story2 = '/assets/story2.png';
const whyLeft = '/assets/why-left.jpg';
const partner1 = '/assets/partner1.png';
const partner2 = '/assets/partner2.png';
const action1 = '/assets/action1.jpg';
const action2 = '/assets/action2.jpg';
const arena1 = '/assets/arena1.jpg';
const arena2 = '/assets/arena2.jpg';
const arena3 = '/assets/grande.jpg';
const survivorLeft = '/assets/NewSurvivorMedal.png';
const amountBg = '/assets/amount-bg.jpg';
import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
    const { tx, img } = useSite();
    const { openRegistration, openDonate } = useModals();
    const heroParts = [tx('home.home-container.2'), tx('home.home-container.3'), tx('home.home-container.4')];
    const titleRef = useRef(null);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    useEffect(() => {
        if (!titleRef.current) return;

        const TEXT = titleRef.current;
        const chars = [];

        const parts = heroParts;
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
    }, [heroParts.join('|')]);

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
            <div className="home-container" style={{ backgroundImage: `url(${img(bgImage)})` }}>
                <div className="top-banner" onClick={() => setIsBannerModalOpen(true)}>
                    <div className="marquee-wrapper">
                        <div className="marquee-content">
                            <p><span className='req_title'><T id="home.top-banner.1" /> </span> <T id="home.top-banner.2" /></p>
                            <p><span className='req_title'><T id="home.top-banner.3" /> </span> <T id="home.top-banner.4" /></p>
                        </div>
                    </div>
                </div>

                {isBannerModalOpen && (
                    <div className="banner-modal-overlay" onClick={() => setIsBannerModalOpen(false)}>
                        <div className="banner-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="banner-modal-close" onClick={() => setIsBannerModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <h3><T id="home.banner-modal-content.1" /></h3>
                            <p><T id="home.banner-modal-content.2" /></p>
                            <p><T id="home.banner-modal-content.3" /></p>
                            <p><T id="home.banner-modal-content.4" /></p>
                        </div>
                    </div>
                )}

                <div className="hero-section">
                    <div className="hero-content">
                        <div className="hero-subtitle">
                            <span className="check-icon">
                                <i className="fa-solid fa-check"></i>
                            </span>
                            <span className="flow-text">
                                <T id="home.home-container.1" />
                            </span>
                        </div><h1 className="hero-title" ref={titleRef}>
                            <T id="home.home-container.2" /><br /><T id="home.home-container.3" /><br /><T id="home.home-container.4" />
                        </h1>
                        <p className="hero-description">
                            <T id="home.home-container.5" />
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-register" onClick={openRegistration}>
                                <span className="icon"><i className="fa-solid fa-file-pen"></i></span> <T id="home.home-container.6" />
                            </button>
                            <button className="btn-donate-alt" onClick={openDonate}>
                                    <span className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></span> <T id="home.home-container.7" />
                                </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={img(rightImage)} alt={tx("home.home-container.8")} className="animate__animated animate__zoomIn" />
                    </div>
                </div>

                <div className="stats-section">
                    <div className="stat-card">
                        <h3><T id="home.home-container.9" /></h3>
                        <h3><T id="home.home-container.10" /></h3>
                        <p><T id="home.home-container.11" /></p>
                    </div>
                    <div className="stat-card">
                        <h3><T id="home.home-container.12" /></h3>
                        <p><T id="home.home-container.13" /> <br /><T id="home.home-container.14" /></p>
                    </div>
                    <div className="stat-card">
                        <h3><T id="home.home-container.15" /></h3>
                        <p><T id="home.home-container.16" /></p>
                    </div>
                    {/* <div className="stat-card">
                        <h3>501(c)(3)</h3>
                        <p>Nonprofit organization (pending)</p>
                    </div> */}
                </div>
            </div>
            <Song />

            <section id="about" className="about-event-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle"><T id="home.about.1" /></h4>
                    <h2 className="section-title partners-title"><T id="home.about.2" /></h2>
                </div>
                <div className="about-event-grid">
                    <div className="event-card">
                        <img src={img(event1)} alt={tx("home.about.3")} />
                        <h3><T id="home.about.4" /></h3>
                        <p><T id="home.about.5" /></p>
                    </div>
                    <div className="event-card divider"></div>
                    <div className="event-card">
                        <img src={img(event2)} alt={tx("home.about.6")} />
                        <h3><T id="home.about.7" /></h3>
                        <p><T id="home.about.8" /></p>
                    </div>
                </div>
                <div className="text-center">
                    <a href={tx("home.about.9")} target="_blank" rel="noopener noreferrer">
                        <button className="btn-contact"><T id="home.about.10" /></button>
                    </a>
                </div>
            </section>

            <section className="our-story-section">
                <div className="story-top">
                    <div className="story-header">
                        <h4 className="section-subtitle"><T id="home.our-story-section.1" /></h4>
                        <h2 className="section-title left-align"><T id="home.our-story-section.2" /></h2>
                    </div>
                    <div className="story-description">
                        <p><strong><T id="home.our-story-section.3" /></strong> <T id="home.our-story-section.4" /></p>
                    </div>
                </div>
                <div className="story-cards">
                    <div className="story-card">
                        <h5 className="card-subtitle"><T id="home.our-story-section.5" /></h5>
                        <img src={img(story1)} alt={tx("home.our-story-section.6")} className="story-logo moffitt-logo" />
                        <hr className="card-divider" />
                        <p className="quote"><T id="home.our-story-section.7" /></p>
                        <div className="author">
                            <p><T id="home.our-story-section.8" /></p>
                            <p><T id="home.our-story-section.9" /></p>
                        </div>
                    </div>
                    <div className="story-card">
                        <div className="card-top-area">
                            <img src={img(story2)} alt={tx("home.our-story-section.10")} className="story-logo uf-logo" />
                        </div>
                        <hr className="card-divider" />
                        <p className="quote"><T id="home.our-story-section.11" /></p>
                        <div className="author">
                            <p><T id="home.our-story-section.12" /></p>
                            <p><T id="home.our-story-section.13" /></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-started-section">
                <div className="why-left-image" style={{ backgroundImage: `url(${img(whyLeft)})` }}></div>
                <div className="why-content-wrapper">
                    <div className="why-content">
                        <div className="why-badge"><T id="home.why-started-section.1" /></div>
                        <h2 className="section-title left-align" style={{ marginBottom: '30px' }}><T id="home.why-started-section.2" /></h2>

                        <div className="why-paragraphs">
                            <p><T id="home.why-started-section.3" /></p>
                            <p><T id="home.why-started-section.4" /></p>
                            <p><T id="home.why-started-section.5" /></p>
                        </div>

                        <hr className="why-divider" />

                        <div className="founder-footer">
                            <div className="founder-info">
                                <h3><T id="home.why-started-section.6" /></h3>
                                <h4><T id="home.why-started-section.7" /></h4>
                                <p><T id="home.why-started-section.8" /></p>
                                {/* <p className="small-text">A 501(c)(3) nonprofit organization (pending)</p> */}
                            </div>
                            <div className="founder-action">
                                <a href={tx("home.why-started-section.9")} target="_blank" rel="noopener noreferrer">
                                    <button className="btn-contact"><T id="home.why-started-section.10" /></button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="partners-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle"><T id="home.partners-section.1" /></h4>
                    <h2 className="section-title partners-title"><T id="home.partners-section.2" /></h2>
                    <p className="partners-description"><T id="home.partners-section.3" /></p>
                </div>

                <div className="partners-grid">
                    <div className="partner-card">
                        <img src={img(partner2)} alt={tx("home.partners-section.4")} />
                        <h5><T id="home.partners-section.5" /></h5>
                        <p><T id="home.partners-section.6" /></p>
                    </div>
                    <div className="partner-card">
                        <img src={img(partner1)} alt={tx("home.partners-section.7")} />
                        <h5><T id="home.partners-section.8" /></h5>
                        <p><T id="home.partners-section.9" /></p>
                    </div>
                </div>
            </section>

            <section id="activities" className="adventure-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle white-text"><T id="home.activities.1" /></h4>
                    <h2 className="section-title white-text partners-title"><T id="home.activities.2" /></h2>
                </div>

                <div className="adventure-grid">
                    <div className="adventure-card">
                        <img src={img(action1)} alt={tx("home.activities.3")} className="adventure-img" />
                        <div className="adventure-card-content">
                            <div className="adventure-card-title">
                                <span className="adventure-icon"><i className="fa-solid fa-xmark"></i></span>
                                <h3><T id="home.activities.4" /></h3>
                            </div>
                            <p className='join-p'><T id="home.activities.5" /></p>
                            <p className='join-p'><b><T id="home.activities.6" /></b></p>
                            <ul className="adventure-features">
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.7" /></li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span> <T id="home.activities.8" /></li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.9" /></li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.10" /></li>
                            </ul>
                            <button className="btn-adventure" onClick={openRegistration}><T id="home.activities.11" /></button>
                        </div>
                    </div>
                    <div className="adventure-card">
                        <img src={img(action2)} alt={tx("home.activities.12")} className="adventure-img" />
                        <div className="adventure-card-content">
                            <div className="adventure-card-title">
                                <span className="adventure-icon"><i className="fa-solid fa-shoe-prints"></i></span>
                                <h3><T id="home.activities.13" /></h3>
                            </div>
                            <p className='join-p'><T id="home.activities.14" />
                            </p>
                            <ul className="adventure-features">
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.15" /></li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span> <T id="home.activities.16" /></li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.17" />
                                </li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.18" />
                                </li>
                                <li><span className="check-icon-pink"><i className="fa-solid fa-check"></i></span><T id="home.activities.19" />
                                </li>
                            </ul>
                            <p className='join-p'><T id="home.activities.20" /></p>
                            <button className="btn-adventure" onClick={openRegistration}><T id="home.activities.21" /></button>
                        </div>
                    </div>
                </div>

                <div className="adventure-extra-info">
                    <h4><T id="home.activities.22" /></h4>
                    <p>
                        <b><T id="home.activities.23" /></b> <T id="home.activities.24" /> <b><T id="home.activities.25" /></b>
                    </p>
                    <p>
                        <T id="home.activities.26" /> <b><T id="home.activities.27" /></b> <T id="home.activities.28" />
                    </p>

                    <div className="adventure-accordion">
                        <button
                            className={`accordion-header ${isAccordionOpen ? 'open' : ''}`}
                            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        >
                            <T id="home.activities.29" />
                            <span className="accordion-icon"><i className={`fa-solid ${isAccordionOpen ? 'fa-minus' : 'fa-plus'}`}></i></span>
                        </button>
                        <div className={`accordion-content ${isAccordionOpen ? 'open' : ''}`}>
                            <p className="acc-intro">
                                <mark className="acc-highlight"><T id="home.activities.30" /></mark><br /><br />
                                <T id="home.activities.31" />
                            </p>

                            <div className="acc-option">
                                <h5><T id="home.activities.32" /></h5>
                                <p className="acc-address">
                                    <T id="home.activities.33" /><br />
                                    <T id="home.activities.34" /><br />
                                    <a href={tx("home.activities.35")} className="acc-phone"><mark className="acc-highlight"><T id="home.activities.36" /></mark></a>
                                </p>

                                <div className="acc-rates">
                                    <strong><T id="home.activities.37" /></strong>
                                    <ul>
                                        <li><T id="home.activities.38" /> <b><T id="home.activities.39" /></b> <T id="home.activities.40" /></li>
                                        <li><T id="home.activities.41" /> <b><T id="home.activities.42" /></b> <T id="home.activities.43" /></li>
                                        <li><T id="home.activities.44" /> <b><T id="home.activities.45" /></b> <T id="home.activities.46" /></li>
                                    </ul>
                                </div>

                                <ol className="acc-list">
                                    <li><T id="home.activities.47" /> <mark className="acc-highlight"><T id="home.activities.48" /></mark> <T id="home.activities.49" /></li>
                                    <li><T id="home.activities.50" /></li>
                                    <li><T id="home.activities.51" /> <mark className="acc-highlight"><T id="home.activities.52" /></mark> <T id="home.activities.53" /></li>
                                    <li><T id="home.activities.54" /></li>
                                    <li><mark className="acc-highlight"><T id="home.activities.55" /></mark> <T id="home.activities.56" /></li>
                                    <li><T id="home.activities.57" /></li>
                                    <li><T id="home.activities.58" /></li>
                                    <li><T id="home.activities.59" /></li>
                                    <li><T id="home.activities.60" /></li>
                                </ol>
                            </div>

                            <div className="acc-option">
                                <h5><T id="home.activities.61" /></h5>
                                <p className="acc-address">
                                    <T id="home.activities.62" /><br />
                                    <T id="home.activities.63" /><br />
                                    <a href={tx("home.activities.64")} className="acc-phone"><mark className="acc-highlight"><T id="home.activities.65" /></mark></a>
                                </p>

                                <ol className="acc-list">
                                    <li><T id="home.activities.66" /></li>
                                    <li><T id="home.activities.67" /> <a href={tx("home.activities.68")} className="acc-link"><mark className="acc-highlight"><T id="home.activities.69" /></mark></a>.</li>
                                    <li><T id="home.activities.70" /> <a href={tx("home.activities.71")} className="acc-link"><mark className="acc-highlight"><T id="home.activities.72" /></mark></a>.</li>
                                    <li><T id="home.activities.73" /> <a href={tx("home.activities.74")} target="_blank" rel="noopener noreferrer" className="acc-link"><T id="home.activities.75" /></a>.</li>
                                    <li><T id="home.activities.76" /> <mark className="acc-highlight"><T id="home.activities.77" /></mark><T id="home.activities.78" /></li>
                                    <li><T id="home.activities.79" /></li>
                                    <li><T id="home.activities.80" /></li>
                                    <li><T id="home.activities.81" /></li>
                                    <li><T id="home.activities.82" /></li>
                                    <li><T id="home.activities.83" /></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stadium-section">
                <div className="section-header text-center">
                    <h4 className="section-subtitle"><T id="home.stadium-section.1" /></h4>
                    <h2 className="section-title partners-title"><T id="home.stadium-section.2" /></h2>
                </div>

                <div className="stadium-grid">
                    <div className="stadium-card">
                        <img src={img(arena1)} alt={tx("home.stadium-section.3")} className="stadium-img" />
                        <div className="stadium-card-content">
                            <h3><T id="home.stadium-section.4" /></h3>
                            <p><T id="home.stadium-section.5" /></p>
                        </div>
                    </div>
                    <div className="stadium-card">
                        <img src={img(arena2)} alt={tx("home.stadium-section.6")} className="stadium-img" />
                        <div className="stadium-card-content">
                            <h3><T id="home.stadium-section.7" /></h3>
                            <p><T id="home.stadium-section.8" /></p>
                        </div>
                    </div>
                    <div className="stadium-card">
                        <img src={img(arena3)} alt={tx("home.stadium-section.9")} className="stadium-img" />
                        <div className="stadium-card-content">
                            <h3><T id="home.stadium-section.10" /></h3>
                            <p><T id="home.stadium-section.11" /></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="extra-info-section">
                <div className="extra-grid-top">
                    <div className="info-card">
                        <div className="info-card-title">
                            <span className="info-icon"><i className="fa-solid fa-trophy"></i></span>
                            <h3><T id="home.extra-info-section.1" /></h3>
                        </div>
                        <p className="info-bold-text"><T id="home.extra-info-section.2" /></p>
                        <ul className="info-list">
                            <li><T id="home.extra-info-section.3" /></li>
                            <li><T id="home.extra-info-section.4" /></li>
                            <li><T id="home.extra-info-section.5" /></li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <div className="info-card-title">
                            <span className="info-icon"><i className="fa-regular fa-star"></i></span>
                            <h3><T id="home.extra-info-section.6" /></h3>
                        </div>
                        <p className="info-bold-text"><T id="home.extra-info-section.7" /></p>
                        <ul className="info-list">
                            <li><T id="home.extra-info-section.8" /></li>
                            <li><T id="home.extra-info-section.9" /></li>
                        </ul>
                    </div>
                </div>

                <div className="survivor-card-container">
                    <div className="survivor-left-img">
                        <img src={img(survivorLeft)} alt={tx("home.extra-info-section.10")} />
                    </div>
                    <div className="survivor-right-content">
                        <div className="survivor-title-wrap">
                            <div className="pink-vertical-line"></div>
                            <h2><T id="home.extra-info-section.11" /></h2>
                        </div>
                        <p><T id="home.extra-info-section.12" /></p>
                        <p style={{ fontWeight: "bold", color: "#c3277b" }}><T id="home.extra-info-section.13" /><br />
                            <T id="home.extra-info-section.14" />
                        </p>
                        <button className="btn-pill-pink"><T id="home.extra-info-section.15" /></button>
                    </div>
                </div>
            </section>

            <section id="tickets" className="tickets-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${img(amountBg)})` }}>
                <div className="tickets-banner">
                    <h3><T id="home.tickets.1" /></h3>
                </div>
                <div className="tickets-grid">
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4><T id="home.tickets.2" /></h4>
                            <h2><T id="home.tickets.3" /></h2>
                            <p><T id="home.tickets.4" /></p>
                        </div>
                        <div className="ticket-register" onClick={openRegistration} style={{ cursor: 'pointer' }}>
                            <span><T id="home.tickets.5" /></span>
                        </div>
                    </div>
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4><T id="home.tickets.6" /></h4>
                            <h2><T id="home.tickets.7" /></h2>
                            <p><T id="home.tickets.8" /></p>
                        </div>
                        <div className="ticket-register" onClick={openRegistration} style={{ cursor: 'pointer' }}>
                            <span><T id="home.tickets.9" /></span>
                        </div>
                    </div>
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <h4><T id="home.tickets.10" /></h4>
                            <h2><T id="home.tickets.11" /></h2>
                            <p><T id="home.tickets.12" /></p>
                        </div>
                        <div className="ticket-register" onClick={openRegistration} style={{ cursor: 'pointer' }}>
                            <span><T id="home.tickets.13" /></span>
                        </div>
                    </div>
                    <div className="ticket-card">
                        <div className="ticket-content">
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                                <div>
                                    <h4><T id="home.tickets.14" /></h4>
                                    <h2><T id="home.tickets.15" /></h2>
                                </div>
                                <div>
                                    <h4><T id="home.tickets.16" /></h4>
                                    <h2><T id="home.tickets.17" /></h2>
                                </div>
                            </div>
                            <p><T id="home.tickets.18" /></p>
                        </div>
                        <div className="ticket-register" onClick={openRegistration} style={{ cursor: 'pointer' }}>
                            <span><T id="home.tickets.19" /></span>
                        </div>
                    </div>
                </div>
            </section>

            <Brands />
        </>
    );
};

export default Home;