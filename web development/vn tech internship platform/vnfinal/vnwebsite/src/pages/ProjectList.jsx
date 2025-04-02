import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectData from '../data/project.json';
import './ProjectList.css';

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust delay as needed
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter projects based on the search term
  const filteredProjects = projectData.projects.filter((project) => {
    return (
      project.projectId.toString().includes(searchTerm) ||
      (project.projectName && project.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.projectDomain && project.projectDomain.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.cost.toString().includes(searchTerm) ||
      (project.branch && project.branch.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Sort projects by projectId in ascending order
  const sortedProjects = [...filteredProjects].sort((a, b) => a.projectId - b.projectId);

  return (
    <div className="project-list">
      <h1>Project List</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ul className="project-list-container">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <li className="project-item" key={project.projectId}>
                <div className="project-info-row">
                  <div className="project-details">
                    <h2>{project.projectName}</h2>
                    <p><strong>Project ID:</strong> {project.projectId}</p>
                    <p><strong>Domain:</strong> {project.projectDomain}</p>
                    <p><strong>Branch:</strong> {project.branch}</p>
                  </div>
                </div>
                <div className="project-cost-row">
                  <p className="project-cost"><strong>Cost:</strong> ${project.cost}</p>
                  <Link to={`/project/${project.projectId}`}>
                    <button className="purchase-button">Purchase</button>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
