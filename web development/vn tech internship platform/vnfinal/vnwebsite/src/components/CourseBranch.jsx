import React from 'react';
import { Link } from 'react-router-dom';
import './courseBranch.css';

const CourseBranch = ({ branch }) => {
  return (
    <div className="branch-card">
      <img src={branch.image} alt={branch.name} />
      <h3>{branch.name}</h3>
      <p>{branch.description}</p>
      <Link to={`/branch/${branch.id}/courses`} className="view-courses-button">
        View Courses
      </Link>
    </div>
  );
};

export default CourseBranch;
