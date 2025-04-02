// src/pages/InternshipRegistrationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import internshipsData from '../data/internships.json'; // Adjust the path as necessary
import './InternshipRegistrationPage.css';

const InternshipRegistrationPage = () => {
  const { internshipId } = useParams();
  const location = useLocation();

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the query parameters
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');

  // Find the internship details
  const internship = internshipsData.flatMap(branch => branch.internships).find(i => i.internshipId === parseInt(internshipId));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
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
    // Handle the form submission logic here, e.g., saving data to a file
    console.log('Registration data submitted:', formData);
    // Here you can also include logic to save payment details, if required
  };

  return (
    <div className="registration-page">
      <h2>Register for {internship?.title}</h2>
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
        <div className="input-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Education:</label>
          <select name="education" value={formData.education} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>

        <div className="payment-details">
          <h3>Payment Details</h3>
          <p>Amount: ${amount}</p>
          {/* You can include more payment options or instructions here */}
        </div>

        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
};

export default InternshipRegistrationPage;
