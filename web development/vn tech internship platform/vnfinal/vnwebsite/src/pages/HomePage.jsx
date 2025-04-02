import React from 'react';
// import CourseCard from '../components/CourseCard'; 
import EmployeeDetails from '../components/EmployeeDetails';
import coursesData from '../data/corses.json';
import Collaboration from '../components/Collaboration';
import Header from '../components/Header';
import Review from '../components/Review';
import { Route, Routes } from 'react-router-dom'; 
import TopCourses from '../components/TopCourses';
import Registration from '../components/Registration';
import Banner from '../components/Banner';
import './HomePage.css';
import ProjectBanner from '../components/ProjectBanner';


const HomePage = () => {
  // Get unique branches from the courses data
  const uniqueBranches = [...new Set(coursesData.map(course => course.branch))];

  // Filter one course from each branch
  const topCourses = uniqueBranches.map(branch => 
    coursesData.find(course => course.branch === branch)
  );

  return (
    <div className="home-page">
      <Header /><br></br>
      <ProjectBanner />
      
      <section className="top-courses">
        
        <div className="course-cards">
          <Routes>
            <Route path="/" element={<TopCourses courses={topCourses} />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </section>

      <Banner />
      <Collaboration />

      <section className="employee-details">
        {/* <h2>Our Employees</h2> */}
        <EmployeeDetails />
      </section> 

      <Review />
    </div>
  );
};

export default HomePage;
