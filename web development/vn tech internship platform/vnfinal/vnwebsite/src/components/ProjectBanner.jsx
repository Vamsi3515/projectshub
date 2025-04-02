import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectBanner.css';

const ProjectBanner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Book Your Project</h1>
        <Link to="/project" className="book-link">
          Book Your Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectBanner;
