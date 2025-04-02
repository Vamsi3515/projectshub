import React, { useState } from 'react';
import InternshipCard from './InternshipCard';

const BranchItern = ({ branch }) => {
    const [showInternships, setShowInternships] = useState(false);

    const handleViewMoreClick = () => {
        setShowInternships(!showInternships);
    };

    return (
        <div className="branch-card">
            <h2>{branch.branchName}</h2>
            <p>{branch.branchDescription}</p>
            <img src={branch.image} alt={branch.branchName} style={{ width: '200px' }} />
            <button onClick={handleViewMoreClick}>
                {showInternships ? 'Hide Internships' : 'View More'}
            </button>
            {showInternships && (
                <div className="internships-list">
                    {branch.internships.map(internship => (
                        <InternshipCard key={internship.internshipId} internship={internship} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BranchItern;
