// src/pages/CourseRegistrationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './TopCourseRegistrationPage.css';

const CourseRegistrationPage = () => {
  const { courseId } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use location.state to get course details passed from TopCourses
  const course = location.state
    ? {
        id: courseId,
        title: location.state.courseName,
        description: location.state.courseDescription,
        cost: location.state.courseCost,
        duration: location.state.courseDuration,
      }
    : { title: 'Course Not Found', cost: '$100', duration: 'N/A' }; // Default for missing course

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address_line_1: formData.addressLine1,
      address_line_2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip,
      educational_level: formData.education,
      additional_info: formData.additionalInfo,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/additional-info', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      
      alert('Registration successful!');
  
      setFormData({
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
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-page">
      <h2>Register for {course.title}</h2>
      <p>Cost: {course.cost}</p>
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
            <div className="input-group ">
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