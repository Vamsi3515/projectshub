import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo1 from '/src/assets/ba infotech.jfif';
import logo2 from '/src/assets/axios tech.jfif';
import logo3 from '/src/assets/amens.jfif';
import logo4 from '/src/assets/adven.png';
import logo5 from '/src/assets/smart tech.png';
import logo6 from '/src/assets/wns.jfif';
import logo7 from '/src/assets/v nurture.jfif';
import logo8 from '/src/assets/triad tech.png';
import logo9 from '/src/assets/amidest.jpg';


import './Collaboration.css'; // Import custom CSS

const ClientsSection = () => {
  const clients = [
    { name: 'Stores & Stores', logo: logo1 },
    { name: 'Premium Designers', logo: logo2 },
    { name: 'Mountain', logo: logo3 },
    { name: 'Hosoren', logo: logo4 },
    { name: 'Hipster', logo: logo5 },
    { name: 'Brandname', logo: logo6 },
    { name: 'Designers', logo: logo7 },
    { name: 'Designers', logo: logo8 },
    { name: 'NWE Design', logo: logo9 },
  ];

  // Initialize AOS for animation effects
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Smooth easing for animation
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Platinum Partnership</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {clients.map((client, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              borderRight: index % 3 !== 2 ? '2px solid #ddd' : 'none',
              borderBottom: index < clients.length - 3 ? '2px solid #ddd' : 'none',
            }}
            data-aos="fade-up" // Apply fade-up animation on scroll
          >
            <img 
              src={client.logo}
              alt={client.name}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
              className='client-logo'
              data-aos="zoom-in" // Zoom-in effect for image
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsSection;
