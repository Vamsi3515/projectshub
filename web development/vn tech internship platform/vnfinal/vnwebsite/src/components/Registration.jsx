// Registration.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
    const location = useLocation();
    const { courseName, courseDescription, courseCost, courseDuration } = location.state || {};

    return (
        <div className="registration-container">
            <h1>Register for {courseName}</h1>
            <p>{courseDescription}</p>
            <p><strong>Cost:</strong> {courseCost}</p>
            <p><strong>Duration:</strong> {courseDuration}</p>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" required />
                </label>
                <button type="submit">Submit Registration</button>
            </form>
        </div>
    );
};

export default Registration;
