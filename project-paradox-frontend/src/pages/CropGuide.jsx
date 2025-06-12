import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CropGuidePage.css';
import Navbar from './Navbar';
import Info from './Info'; 

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

function CropGuide() {
    const [crop, setCrop] = useState('');
    const [videos, setVideos] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recognition, setRecognition] = useState(null);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US';
            setRecognition(recognitionInstance);
        } else {
            console.log('Speech Recognition API not supported in this browser.');
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setVideos([]);
        setArticles([]);

        try {
            const response = await axios.post("http://localhost:8000/api/cropguide/fetch/", { crop });
            setVideos(response.data.videos);
            setArticles(response.data.articles);
        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching crop info. Please try again.");
        }

        setLoading(false);
    };

    const startSpeechRecognition = () => {
        if (recognition) {
            recognition.start();
            setListening(true);

            recognition.onresult = (event) => {
                const result = event.results[event.resultIndex];
                if (result.isFinal) {
                    const transcript = result[0].transcript;
                    setCrop(transcript);
                }
            };

            recognition.onend = () => {
                setListening(false);
            };
        }
    };

    const stopSpeechRecognition = () => {
        if (recognition) {
            recognition.stop();
            setListening(false);
        }
    };

    return ( 

        <>
        
       
        <Navbar />
        
        <div className="croppage-container">
            <h1 className="text-3xl font-bold text-center mb-6">Guide to Grow Crop</h1>

            <form onSubmit={handleSearch} className="search-bar">
                <input
                    type="text"
                    placeholder="Enter crop name"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="search-input"
                    required
                />
                <button type="submit" className="search-button">Search</button>
                {!listening ? (
                    <button type="button" onClick={startSpeechRecognition} className="mic-button" title="Start Listening">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                ) : (
                    <button type="button" onClick={stopSpeechRecognition} className="mic-button" title="Stop Listening">
                        <FontAwesomeIcon icon={faStop} />
                    </button>
                )}
            </form>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div>
                <h2 className="text-2xl font-semibold mb-4">Tutorial Videos for { crop } 📽️</h2>
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <div key={index} className="video-card">
                            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                                <div className="video-info">
                                    <p className="video-title">{video.title}</p>
                                    <p className="video-channel">{video.channel}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
<br />
            <div className="articles-section mt-10">
                <h2 className="text-2xl font-semibold mb-4">Articles related to { crop } 📜:- </h2>
                <ul>
                {articles.map((article, index) => (
    <li key={index} className="mb-4">
        <a href={article.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            <h3 className="font-semibold">{article.title}</h3>
            <p className="text-gray-700">{article.snippet}</p>
        </a>
    </li>
))}

                </ul>
            </div>
        </div>

<Info />

</>

    );
}

export default CropGuide;
