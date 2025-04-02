import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedin,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';  // Changed the import path to 'free-brands-svg-icons'

import './Fotter.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>TOOLS</h3>
        <ul>
          <li>Ai Tools</li>
          <li>Python</li>
          <li>Full Stack</li>
          <li>Marketing</li>
          
        </ul>
      </div>

      <div className="footer-section">
        <h3>INFORMATION</h3>
        <ul>
          <li>HOME</li>
          <li>COURSES</li>
          <li>INTERNSHIPS</li>
          <li>BLOGS</li>
          
          
          <li>ABOUT US</li>
          
          
        </ul>
      </div>

      <div className="footer-section">
        <h3>LEGAL</h3>
        <ul>
          <li>Terms of use</li>
          <li>License agreement</li>
          <li>Privacy policy</li>
          <li>Copyright information</li>
          <li>Cookies policy</li>
          <li>Cookies settings</li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>SUPPORT</h3>
        <ul>
          <li>FAQ</li>
          <li>Search guide</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="footer-section social-media">
        <h3>SOCIAL MEDIA</h3>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          <FontAwesomeIcon icon={faYoutube} size="2x" />
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
          <FontAwesomeIcon icon={faDiscord} size="2x" />
          
        </div>
        <button className="signup-btn">Sign up</button>
      </div>
    </footer>
  );
};

export default Footer;
