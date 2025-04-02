// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseRegistrationPage from './pages/TopCourseRegistrationPage'; // Import the course registration page
import InternshipPortal from './pages/InternshipPortal';
import BranchDetailPage from './pages/BranchDetailPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import InternshipRegistrationPage from './pages/TopInternshipRegistrationPage'; // Import the internship registration page
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
// src/index.js or src/App.jsx
import './App.css'; // Add this line
import ProjectList from './pages/ProjectList';
import ProjectRegistration from './pages/ProjectRegistration';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/branch/:branchId/courses" element={<CoursesPage />} />
        <Route path="/branch/:branchId/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/register/:courseId" element={<CourseRegistrationPage />} /> {/* Course Registration */}
        <Route path="/register/:branchId/:courseId" element={<CourseRegistrationPage />} />
        <Route path="/course-registration/:courseId" element={<CourseRegistrationPage />} />
        <Route path="/internships" element={<InternshipPortal />} />
        <Route path="/branch/:branchId" element={<BranchDetailPage />} />
        <Route path="/internship/:internshipId" element={<InternshipDetailPage />} />
        <Route path="/register/internship/:internshipId" element={<InternshipRegistrationPage />} /> {/* Internship Registration */}
        <Route path="/project" element={<ProjectList />} />
        <Route path="/project/:projectId" element={<ProjectRegistration />} />
        <Route path="/blog" element={<BlogPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
