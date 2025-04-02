import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import coursesData from '../data/corses.json';
import './CoursesPage.css';

const CoursesPage = () => {
  const { branchId } = useParams();
  const branch = coursesData.find((b) => b.id === parseInt(branchId));
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCourses = branch.courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const isEven = Array.from(entry.target.parentNode.children).indexOf(entry.target) % 2 === 0;
          entry.target.classList.add(isEven ? 'slide-in-left' : 'slide-in-right');
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove('slide-in-left', 'slide-in-right');
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card) => {
      // Add initial slide classes
      card.classList.add(card.classList.contains('slide-left') ? 'slide-left' : 'slide-right');
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [filteredCourses]);

  return (
    <div className="courses-page">
      <h2>{branch.name} Courses</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Courses..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card" data-id={course.id}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={`/branch/${branch.id}/course/${course.id}`} className="view-more-button">
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
