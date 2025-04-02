import React from 'react';
import { useParams, Link } from 'react-router-dom';
import coursesData from '../data/corses.json'; // Corrected filename
import './CourseDetailPage.css';

const CourseDetailPage = () => {
  const { branchId, courseId } = useParams();

  const branch = coursesData.find((b) => b.id === parseInt(branchId));
  const course = branch?.courses.find((c) => c.id === parseInt(courseId));

  if (!branch || !course) {
    return (
      <div className="error-message">
        <h2>Course not found</h2>
        <p>Sorry, the course you're looking for doesn't exist. Please check the course and branch details.</p>
        <Link to="/">Go Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="course-image-container">
        <img className="course-image" src={course.image} alt={course.title} />
        <div className="overlay"></div>
        <div className="course-info">
          <h2 className="course-title">{course.title}</h2>
          <p className="course-description">{course.description}</p>
          <h3 className="course-content-title">Course Content</h3>
          <ul className="course-content">
            {course.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="what-you-learn-title">What You'll Learn</h3>
          <ul className="what-you-learn">
            {course.whatWeLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul><div className="button">
          <Link className="register-button" to={`/course-registration/${course.id}`} state={{ 
            courseName: course.title, 
            courseDescription: course.description, 
            courseCost: course.cost, 
            courseDuration: course.duration 
          }}>
            
            Get Started
          </Link><div className="one">
          <a href="Download" class="button">Download</a></div>
          
          {/* <Link to="/Download">Download</Link> */}
          </div>
        
          
        </div>
      </div>
    

    </div>
  );
};

export default CourseDetailPage;
