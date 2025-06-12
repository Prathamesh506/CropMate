import { useState } from 'react';
import axios from 'axios';
import './CropRecommendation.css'; // <- Import the new clean CSS
import Navbar from './Navbar';
import Info from './Info'; 




function CropRecommendation() {
    const [location, setLocation] = useState('');
    const [soilType, setSoilType] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const soilTypes = [
        'Red Soil',
        'Black Soil',
        'Mixed Soil',
        'Laterite Soil',
        'Alluvial Soil'
,
    ];
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setRecommendations([]); // Reset previous results
        setError('');
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/recommend/', {
                location,
                soil_type: soilType,
            });
    
            const uniqueRecommendations = [];
            const seenCrops = new Set();
    
            for (const rec of response.data.recommendation) {
                if (!seenCrops.has(rec.suitable_crops.toLowerCase())) {
                    seenCrops.add(rec.suitable_crops.toLowerCase());
                    uniqueRecommendations.push(rec);
                }
            }
    
            if (uniqueRecommendations.length === 0) {
                setError('No data found for this location');
            }
    
            setRecommendations(uniqueRecommendations);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch recommendations');
        }
    };
    

    const handleLocationChange = async (e) => {
        const value = e.target.value;
        setLocation(value);

        if (value.length > 1) {
            try {
                const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                    params: {
                        key: '1b847a0de0de4623acfa2e2bb649df38',
                        q: value,
                        limit: 5,
                        language: 'en'
                    }
                });

                const results = response.data.results.map(item => {
                    const firstWord = item.formatted.split(',')[0].split(' ')[0];
                    return firstWord;
                });

                setSuggestions([...new Set(results)]);
            } catch (error) {
                console.error('Error fetching suggestions', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setSuggestions([]);
    };

    return (
        <>
        
       
        <Navbar />
        <div className="container">
            <h2 className="heading">Crop Recommendation</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={handleLocationChange}
                    className="input"
                />
                {suggestions.length > 0 && (
                    <div className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}

                <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="input"
                >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>

                <button type="submit" className="submit-btn">Get Recommendation</button>
            </form>

            {error && <p className="error">{error}</p>}

            {submitted && recommendations.length > 0 && (
                <div className="recommendations">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="card">
                            <h3 className="crop-name">🌱🌿{rec.suitable_crops}</h3>
                            <div className="details">
                                {/* <p><strong>pH near:</strong> {rec.pH || 'N/A'}</p> */}
                                <p><strong>Nitrogen (N):</strong> {rec.nitrogen || 'N/A'}</p>
                                <p><strong>Phosphorus (P):</strong> {rec.phosphorus || 'N/A'}</p>
                                <p><strong>Potassium (K):</strong> {rec.potassium || 'N/A'}</p>
                             
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Info />

                            </>
    );
}
export default CropRecommendation;
