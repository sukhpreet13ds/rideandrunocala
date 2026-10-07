'use client';

import { T, useSite } from '@/lib/content-context';
import { useState } from 'react';
const bannerImage = '/assets/banner-ride.jpg';
const thumbnailImage = '/assets/thumbnail.jpg';

const Song = () => {
    const { tx, img } = useSite();
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="song-section">
            <div className="song-banner">
                <img src={img(bannerImage)} alt={tx("song.song-section.1")} />
            </div>
            <div className="song-content-wrapper">
                <div className="song-text-content">
                    <h4 className="song-subtitle"><T id="song.song-section.2" /></h4>
                    <h2 className="song-title"><T id="song.song-section.3" /></h2>
                    <p className="song-description">
                        <T id="song.song-section.4" />
                    </p>
                </div>
                <div className="song-video-container">
                    {!isPlaying ? (
                        <div className="custom-thumbnail" onClick={() => setIsPlaying(true)}>
                            <img src={img(thumbnailImage)} alt={tx("song.song-section.5")} className="thumbnail-img" />
                            <div className="play-button">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <iframe 
                             src="https://www.youtube.com/embed/pUOCO6aTL5I?si=2zBeWaf9oZfqFE2R&autoplay=1&start=0&end=234"
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                        </iframe>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Song;
