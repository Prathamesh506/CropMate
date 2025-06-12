import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';
import Navbar from './Navbar';
import Info from './Info';

const OPEN_CAGE_API_KEY = '1b847a0de0de4623acfa2e2bb649df38';

const nearbyLocationMap = {
  // belagavi: ['ambewadi', 'Kudremani', 'gokak', 'sankeshwar'],
  belgaum: ['ambewadi', 'Kudremani', 'gokak', 'sankeshwar'],
  ambewadi: ['belgaum', 'belagavi'],
  hubli: ['dharwad', 'navalgund'],
  bagalkot: ['jamkhandi', 'mudhol'],
  karwar: ['ankola', 'kumta'],
  gadag: ['ron', 'nargund'],
  honaga: ['halabhavi', 'kakti'],
};

const Services = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [nearbyAgents, setNearbyAgents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/services/api/service_agents/')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setAgents(data);
        setFilteredAgents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const fetchLocationCoordinates = async (location) => {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${OPEN_CAGE_API_KEY}`;

    try {
      const response = await axios.get(geocodeUrl);
      const data = response.data.results[0];

      if (data) {
        const { lat, lng } = data.geometry;
        return { lat, lng };
      } else {
        setError('Location not found.');
        return null;
      }
    } catch (error) {
      setError('Error fetching location data.');
      return null;
    }
  };

  useEffect(() => {
    const locationLower = location.trim().toLowerCase();
    const serviceLower = serviceType.trim().toLowerCase();

    const filtered = agents.filter((agent) => {
      const matchLocation = locationLower
        ? agent.location.toLowerCase().includes(locationLower)
        : true;
      const matchService = serviceLower
        ? agent.service_type.toLowerCase().includes(serviceLower)
        : true;
      return matchLocation && matchService;
    });

    setFilteredAgents(filtered);

    if (filtered.length === 0 && locationLower) {
      fetchLocationCoordinates(locationLower).then((coordinates) => {
        if (coordinates) {
          const nearby = agents.filter(
            (agent) =>
              nearbyLocationMap[locationLower]?.includes(agent.location.toLowerCase()) &&
              agent.service_type.toLowerCase().includes(serviceLower)
          );
          setNearbyAgents(nearby);
        }
      });
    } else {
      setNearbyAgents([]);
    }
  }, [location, serviceType, agents]);

  if (loading) return <div className="loading-text"><div className="spinner"></div> Loading...</div>;
  if (error) return <div className="error-text">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="services-container">
        <h1 className="page-title">Search for Services</h1>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by Service Type"
            className="filter-input"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Location"
            className="filter-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="agents-list">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <div key={agent.id} className="agent-card">
                <h2>{agent.service_type}</h2>
                <p><strong>🙋🏻Agent Name:</strong> {agent.name}</p>
                <p><strong>📍Location:</strong> {agent.location}</p>
                <p><strong>📞Phone:</strong> {agent.phone_number}</p>
                <a href={`tel:${agent.phone_number}`}>
                  <button className="call-button">Call Now</button>
                </a>
              </div>
            ))
          ) : (
            <div className="no-results-wrapper">
              <p className="no-results">No agents found for <strong>{location}</strong>.</p>
              {nearbyAgents.length > 0 ? (
                <>
                  <p className="suggest-text">Here are some nearby suggestions:</p>
                  <div className="suggested-agents-container">
                    {nearbyAgents.map((agent) => (
                      <div key={agent.id} className="agent-card suggested-card">
                        <h2>{agent.name}</h2>
                        <p><strong>⚙️Service:</strong> {agent.service_type}</p>
                        <p><strong>📍Location:</strong> {agent.location}</p>
                        <p><strong>📞Phone:</strong> {agent.phone_number}</p>
                        <a href={`tel:${agent.phone_number}`}>
                          <button className="call-button">Call Now</button>
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="no-results">No nearby agents found either.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Info />
    </>
  );
};

export default Services;
