import React from 'react';
import './Info.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Info() {
  return (
    <div>
      {/* About Section */}
      <section className="about-section" id="about">
        <h2>About Us</h2>
        <p>
          Welcome to our Crop Recommendation System! We help farmers and agricultural enthusiasts find the best crops suited for their land, ensuring better yield and sustainability.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-buttons">
          <a href="https://www.linkedin.com/in/pranav-badaskar-045926230/" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="contact-btn instagram">
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </a>
          <a href="pranavbadaskar@gmail.com" className="contact-btn email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </a>
        </div>
      </section>
    </div>
  );
}

export default Info;
