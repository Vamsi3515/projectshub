import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import internshipsData from '../data/internships.json';
import './InternshipPortal.css';

const InternshipPortal = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const cardsRef = useRef([]); // Create ref to keep track of cards

  useEffect(() => {
    setInternships(internshipsData);
  }, []);

  useEffect(() => {
    const options = {
      threshold: 0.1, // Trigger when 20% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const index = cardsRef.current.indexOf(card);

        if (entry.isIntersecting) {
          // Alternate animation directions based on index
          if (index % 2 === 0) {
            card.classList.add('visible-from-left');
          } else {
            card.classList.add('visible-from-right');
          }
        } else {
          // Reset the animation when out of view to allow reanimation
          card.classList.remove('visible-from-left', 'visible-from-right');
        }
      });
    }, options);

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [internships]);

  const filteredInternships = internships.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="internship-portal-container">
      <h1>Internship Opportunities</h1>

      <input
        type="text"
        placeholder="Search for branches..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="branches">
        {filteredInternships.map((branch, index) => (
          <div
            key={branch.id}
            className="branch-card"
            ref={(el) => (cardsRef.current[index] = el)} // Assign refs dynamically
          >
            <img
              src={branch.image || 'path/to/placeholder-image.jpg'} // Use a placeholder image if not available
              alt={branch.branchName}
              className="branch-image"
            />
            <h2>{branch.branchName}</h2>
            <p>{branch.branchDescription}</p>

            <Link to={`/branch/${branch.id}`}>
              <button className="view-more-button">View Internships</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipPortal;
