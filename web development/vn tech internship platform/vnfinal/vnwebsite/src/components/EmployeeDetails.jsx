import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import image1 from '/src/assets/emp12.avif';
import image2 from '/src/assets/emp1.jpg';
import image3 from '/src/assets/emp9.avif';
import image4 from '/src/assets/emp10.avif';
import image5 from '/src/assets/emp11.avif';
import image6 from '/src/assets/emp7.avif';
import './EmployeeDetails.css'; // Import custom CSS

const employees = [
  {
    id: 1,
    name: 'JANE SMITH',
    position: 'Project Manager',
    image: image1,
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 2,
    name: 'JANE SMITH',
    position: 'Project Manager',
    image: image2,
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 3,
    name: 'JANE SMITH',
    position: 'Project Manager',
    image: image3,
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 4,
    name: 'JANE SMITH',
    position: 'Project Manager',
    image: image4,
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 5,
    name: 'JANE SMITH',
    position: 'Project Manager',
    image: image5,
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 6,
    name: 'JANE SMITH',
    position: 'Project Manager',
    image: image6,
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  // Add more employees as needed...
];

const EmployeeDetails = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animation
      easing: 'ease-in-out', // Smooth easing effect
      once: true, // Animate only once
    });
  }, []);

  return (
    <div className="page-container">
      <h1>Employee Details</h1>
      <div className="employee-row">
        {employees.map((employee, index) => (
          <div
            className="employee-container"
            key={employee.id}
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} // Alternate parallax animation
          >
            <img src={employee.image} alt={employee.name} className="employee-image" />
            <div className="employee-info">
              <h3 className="emp-Name">{employee.name}</h3>
              <p className="emp-pos">{employee.position}</p>
              <div className="social-media">
                <a href={employee.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FontAwesomeIcon icon={faSquareFacebook} size="2x" className="social" />
                </a>
                <a href={employee.socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FontAwesomeIcon icon={faSquareTwitter} size="2x" className="social" />
                </a>
                <a href={employee.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" className="social" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetails;
