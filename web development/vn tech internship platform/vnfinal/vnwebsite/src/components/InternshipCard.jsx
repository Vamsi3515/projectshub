import React, { useState } from 'react';

const InternshipCard = ({ internship }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleViewMoreClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="internship-card">
            <h3>{internship.title}</h3>
            <p>{internship.description}</p>
            <img src={internship.image} alt={internship.title} style={{ width: '100px' }} />
            <button onClick={handleViewMoreClick}>
                {showDetails ? 'Hide Details' : 'View More'}
            </button>
            {showDetails && (
                <div className="internship-details">
                    <p><strong>Duration:</strong> {internship.duration}</p>
                    <p><strong>Paid:</strong> {internship.paid ? `Yes, ${internship.amount} USD` : 'No'}</p>
                    <p><strong>Schedule:</strong> {internship.schedule}</p>
                    <h4>Projects:</h4>
                    <ul>
                        {internship.projects.map((project, index) => (
                            <li key={index}>{project}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InternshipCard;
