// src/pages/InternshipDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import internshipsData from '../data/internships.json';
import './InternshipDetailPage.css';

const InternshipDetailPage = () => {
  const { internshipId } = useParams();
  const internship = internshipsData.flatMap(branch => branch.internships).find(i => i.internshipId === parseInt(internshipId));

  if (!internship) {
    return <div className="error-message">Internship not found!</div>;
  }

  return (
    <div className="internship-detail-page">
      <div className="internship-content">
        <h1 className="internship-title">{internship.title}</h1>
        <p className="internship-description">{internship.description}</p>

        <h2 className="projects-heading">Highlighted Projects:</h2>
        <ul className="projects-list">
          {internship.projects.map((project, index) => (
            <li key={index} className="project-item">
              <div className="project-item-content">
                <h3 className="project-title">Project {index + 1}</h3>
                <p className="project-description">{project}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="internship-info">
          <p className="duration">🕒 Duration: {internship.duration}</p>
          <p className="paid-status">💰 Paid: {internship.paid ? `Yes ($${internship.amount})` : 'No'}</p>
          <p className="schedule">📅 Schedule: {internship.schedule}</p>
        </div>

        {/* Pass amount to the registration page */}
        <Link to={`/register/internship/${internshipId}?amount=${internship.amount}`} className="register-button">Register Now</Link>
      </div>

      <div className="internship-image-container">
        <img src={internship.image} alt={internship.title} className="internship-image" />
      </div>
    </div>
  );
};

export default InternshipDetailPage;
