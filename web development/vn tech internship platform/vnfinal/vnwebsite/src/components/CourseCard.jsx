// src/components/CourseCard.jsx

import React, { useState } from 'react';
// import './CourseCard.css';

const CourseCard = ({ course }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'View More'}
      </button>
      {showDetails && (
        <div className="course-details">
          <h4>Course Content:</h4>
          <ul>
            {course.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h4>What You'll Learn:</h4>
          <ul>
            {course.whatWeLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button>Register</button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
