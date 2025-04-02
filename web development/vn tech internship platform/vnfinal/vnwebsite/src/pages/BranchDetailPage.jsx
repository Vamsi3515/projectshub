import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import internshipsData from '../data/internships.json';
import './BranchDetailPage.css';

const BranchDetailPage = () => {
  const { branchId } = useParams();
  const [branch, setBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInternships, setFilteredInternships] = useState([]);
  const elementsRef = useRef([]); // Ref to store animated elements
  const cardsRef = useRef([]); // Ref to store card elements for internship list

  // Fetch branch data
  useEffect(() => {
    const selectedBranch = internshipsData.find((branch) => branch.id === parseInt(branchId));
    setBranch(selectedBranch);
    setFilteredInternships(selectedBranch?.internships || []);
  }, [branchId]);

  // Filter internships based on the search term
  useEffect(() => {
    if (branch) {
      const filtered = branch.internships.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInternships(filtered);
    }
  }, [searchTerm, branch]);

  // Scroll animations for all content (headings, description, cards)
  useEffect(() => {
    const options = {
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible'); // Reset for re-animation on scroll up
        }
      });
    }, options);

    // Observe all elements and cards
    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      elementsRef.current.forEach((element) => {
        if (element) observer.unobserve(element);
      });
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [filteredInternships]);

  if (!branch) {
    return <p>Branch not found.</p>;
  }

  return (
    <div className="branch-detail-container">
      <h1 ref={(el) => (elementsRef.current[0] = el)} className="animate-item">{branch.branchName}</h1>
      <p ref={(el) => (elementsRef.current[1] = el)} className="animate-item">{branch.branchDescription}</p>
      <img
        src={branch.image}
        alt={branch.branchName}
        className="branch-image animate-item"
        ref={(el) => (elementsRef.current[2] = el)}
      />

      {/* Search Bar */}
      <div className="search-container" ref={(el) => (elementsRef.current[3] = el)}>
        <input
          type="text"
          placeholder="Search for internships..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input animate-item"
        />
      </div>

      <h3 ref={(el) => (elementsRef.current[4] = el)} className="animate-item">Available Internships:</h3>

      {/* Internship Cards */}
      <ul className="internships-list">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship, index) => (
            <li
              key={internship.internshipId}
              ref={(el) => (cardsRef.current[index] = el)} // Ref for individual cards
              className="animate-item internship-card"
            >
              <h4>{internship.title}</h4>
              <p>{internship.description}</p>
              <button>
                <a href={`/internship/${internship.internshipId}`}>View More</a>
              </button>
            </li>
          ))
        ) : (
          <p ref={(el) => (elementsRef.current[5] = el)} className="animate-item">No internships found.</p>
        )}
      </ul>
    </div>
  );
};

export default BranchDetailPage;
