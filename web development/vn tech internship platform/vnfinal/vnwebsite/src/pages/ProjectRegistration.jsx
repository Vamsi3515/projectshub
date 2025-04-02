import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectData from '../data/project.json';
import './ProjectRegistration.css';

const ProjectRegistration = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [dateApplying, setDateApplying] = useState('');
  const [willingToPay, setWillingToPay] = useState('');
  const [success, setSuccess] = useState(false);
  
  const defaultCost = 10000; // Default cost

  useEffect(() => {
    const selectedProject = projectData.projects.find((p) => p.projectId === projectId);
    setProject(selectedProject);
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the data object to send to the API
    const registrationData = {
      name_project: project.projectName,        // Project name
      name_lead: teamLead,                      // Team lead name
      email: email,                             // Email address
      phone: contactNumber,                     // Contact number
      no_people: groupSize,                     // Number of people in the group
      college_name: collegeName,                // College name
      applydate: dateApplying,                  // Date of application (if included)
      willing_to_pay: willingToPay,            // Willingness to pay (if included)
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      
      const data = await response.json();
      alert('Registration successful!');
      console.log('User created successfully:', data);
  
      // Assuming the backend returns the QR code data
      const qrCodeDataUri = data.qr_code; 
      const link = document.createElement('a');
      link.href = qrCodeDataUri;
      link.download = 'qr_code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Reset form fields after successful submission
      setTeamLead('');
      setContactNumber('');
      setEmail('');
      setGroupSize('');
      setCollegeName('');
      setDateApplying('');
      setWillingToPay('');
      setSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };
  

  // Calculate cost from project data, fallback to default
  const projectCost = project?.cost || defaultCost;

  return (
    <div className="registration">
      {project ? (
        <>
          <h2>Register for {project.projectName}</h2>
          {success ? (
            <div className="success-message">
              <p>Registration successful! We will connect with you in two days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="teamLead">Name of the Team Lead:</label>
                <input
                  type="text"
                  id="teamLead"
                  value={teamLead}
                  onChange={(e) => setTeamLead(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="tel"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="groupSize">Number of People in the Group:</label>
                <input
                  type="number"
                  id="groupSize"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="collegeName">Name of College:</label>
                <input
                  type="text"
                  id="collegeName"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="dateApplying">Date of Applying:</label>
                <input
                  type="date"
                  id="dateApplying"
                  value={dateApplying}
                  onChange={(e) => setDateApplying(e.target.value)}
                  required
                />
              </div>
              <div>
                <p>Cost of the project: {projectCost}/-</p>
                <p>Are you willing to pay?</p>
                <div className="payment-options">
                  <button type="button" onClick={() => setWillingToPay('yes')}>Yes</button>
                  <button type="button" onClick={() => setWillingToPay('no')}>No</button>
                </div>
              </div>
              {willingToPay === 'no' && (
                <div>
                  <label htmlFor="opinion">Your Opinion:</label>
                  <textarea id="opinion" placeholder="Please share your thoughts..." required />
                </div>
              )}
              <button type="submit" className="submit-button">Book My Slot</button>
            </form>
          )}
        </>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
  );
};

export default ProjectRegistration;
