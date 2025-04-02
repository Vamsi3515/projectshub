import React, { useEffect, useState } from 'react';
import coursesData from '../data/corses.json';
import CourseBranch from '../components/CourseBranch';
import './CoursePage.css';

const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.branch-card');
      cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardPosition < windowHeight - 50 && cardPosition > -100) {
          card.classList.add('show'); // Add the 'show' class when card is in view
        } else {
          card.classList.remove('show'); // Remove the 'show' class when card is out of view
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check for cards already in view on load
    handleScroll();

    // Cleanup the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBranches = coursesData.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="course-page">
      <h2 className='page-heading'>Available Branches</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Branches..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="branch-list">
        {filteredBranches.map((branch) => (
          <CourseBranch key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
