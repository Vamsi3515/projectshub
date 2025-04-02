// src/pages/CourseRegistrationPage.jsx
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './CourseRegistrationPage.css';

const CourseRegistrationPage = () => {
  const { courseId } = useParams();
  const location = useLocation();

  // Use location.state to get course details passed from TopCourses
  const course = location.state
    ? {
        id: courseId,
        title: location.state.courseName,
        description: location.state.courseDescription,
        duration: location.state.courseDuration,
      }
    : { title: 'Course Not Found', duration: 'N/A' }; // Default for missing course

  // Static cost for all courses
  const cost = '$100'; // Set the same cost for all courses

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    education: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data submitted:', formData);
    alert('Registration successful!'); // Show success message
  };

  return (
    <div className="registration-page">
      <h2>Register for {course.title}</h2>
      <p>Cost: {cost}</p>
      <p>Duration: {course.duration}</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        
        <div className="input-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <fieldset className="address-fieldset">
          <legend>Address:</legend>
          <div className="address-flex">
            <div className="input-group">
              <label>Address Line 1:</label>
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Address Line 2:</label>
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
            </div>
          </div>
          <div className="address-flex">
            <div className="input-group">
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>State:</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>ZIP:</label>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        <div className="input-group">
          <label>Education Level:</label>
          <select name="education" value={formData.education} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>

        <div className="input-group">
          <label>Additional Information:</label>
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange}></textarea>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CourseRegistrationPage;
