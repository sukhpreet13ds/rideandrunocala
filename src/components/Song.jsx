import { useState } from 'react';
import '../style/style.css';
import bannerImage from '../assets/banner-ride.jpg';
import thumbnailImage from '../assets/thumbnail.jpg';

const Song = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="song-section">
            <div className="song-banner">
                <img src={bannerImage} alt="Ride and Run Ocala Banner" />
            </div>
            <div className="song-content-wrapper">
                <div className="song-text-content">
                    <h4 className="song-subtitle">OUR THEME SONG</h4>
                    <h2 className="song-title">OUR CELEBRATION OF LIFE THEME SONG</h2>
                    <p className="song-description">
                        "We Are Family" by Sister Sledge is the Celebration of Life theme song. This inspiring music opens our main arena program and embraces the breast cancer survivors among us. Come celebrate, dance, and share the joy with our community.
                    </p>
                </div>
                <div className="song-video-container">
                    {!isPlaying ? (
                        <div className="custom-thumbnail" onClick={() => setIsPlaying(true)}>
                            <img src={thumbnailImage} alt="Video Thumbnail" className="thumbnail-img" />
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
