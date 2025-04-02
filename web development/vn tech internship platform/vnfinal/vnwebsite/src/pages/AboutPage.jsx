import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Animation duration
      offset: 200,     // Offset from top to start the animation
      once: false,      
    });
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection} data-aos="fade-down">
        <h1 style={styles.heroTitle}>
          Get a Chance to Know About Us and <br></br><span style={{ color: '#f45090' }}>Relive Our Journey</span>
        </h1>
        <p style={styles.heroText}>
          Meet our dynamic team and discover the roadmap to success as we let you know how we work.
        </p>
        <center><button style={styles.ctaButton} data-aos="zoom-in">Let's Talk </button></center>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.stat} data-aos="fade-right">
          <h3 style={styles.statTitle}>1k+</h3>
          <p style={styles.statText}>PROJECTS</p>
        </div>
        <div style={styles.stat} data-aos="fade-left">
          <h3 style={styles.statTitle}>100+</h3>
          <p style={styles.statText}>INTERNSHIPS</p>
        </div>
        <div style={styles.stat} data-aos="fade-right">
          <h3 style={styles.statTitle}>4.9</h3>
          <p style={styles.statText}>CLUTCH RATING</p>
        </div>
        <div style={styles.stat} data-aos="fade-left">
          <h3 style={styles.statTitle}>4.8</h3>
          <p style={styles.statText}>TRUST PILOT RATING</p>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <h2 style={styles.sectionTitle} data-aos="fade-down">About Our Values</h2>
        <div style={styles.valueItems}>
          <div style={styles.valueItem} data-aos="fade-right">
            <h3>Integrity</h3>
            <p>Honesty is our guiding principle, ensuring that we meet and exceed expectations.</p>
          </div>
          <div style={styles.valueItem} data-aos="fade-left">
            <h3>Passion</h3>
            <p>Passion drives our relentless focus on continuous growth and on-time delivery.</p>
          </div>
          <div style={styles.valueItem} data-aos="fade-right">
            <h3>Commitment</h3>
            <p>Our constant commitment to excellence has helped us build an unbreakable bond.</p>
          </div>
          <div style={styles.valueItem} data-aos="fade-left">
            <h3>Teamwork</h3>
            <p>Our team excels in collaboration and are always ready to assist each other.</p>
          </div>
        </div>
      </section>

      {/* Executives Section */}
<section style={styles.executivesSection}>
  <h2 style={styles.sectionTitle} data-aos="fade-down">Meet Our Inspiring Executives</h2>
  
  {/* Executive 1 */}
  <div style={styles.executive} data-aos="zoom-in">
    <img src="https://img.freepik.com/premium-photo/woman-suit-with-her-arms-crossed_1044943-121939.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid" alt="Danish Wadhwa" style={styles.executiveImage} />
    <div>
      <h3 style={styles.executiveName}>Pallavi Aurora</h3>
      <p>Pallavi Aurora is an Entrepreneur and Growth Hacker with more than 10 years of experience in Digital Marketing.</p>
      <div style={styles.socialIcons}>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  </div>

  {/* Executive 2 */}
  <div style={styles.executive} data-aos="zoom-in">
    <img src="https://img.freepik.com/free-photo/businessman-black-suit-promoting-something_114579-15897.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid"  alt="John Doe" style={styles.executiveImage} />
    <div>
      <h3 style={styles.executiveName}>John Doe</h3>
      <p>John Doe is a seasoned Marketing Manager with over 15 years of experience leading successful campaigns worldwide.</p>
      <div style={styles.socialIcons}>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  </div>

  {/* Executive 3 */}
  <div style={styles.executive} data-aos="zoom-in">
    <img src="https://img.freepik.com/premium-photo/woman-with-her-arms-crossed-smile-that-says-she-is-posing-photo_1044943-121644.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid" alt="Jane Smith" style={styles.executiveImage} />
    <div>
      <h3 style={styles.executiveName}>Jane Smith</h3>
      <p>Jane Smith is an innovative CTO who specializes in digital transformations and high-performance tech solutions.</p>
      <div style={styles.socialIcons}>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  </div>

  {/* Executive 4 */}
  <div style={styles.executive} data-aos="zoom-in">
    <img src="https://img.freepik.com/free-photo/business-man-handsome-cute-guy-grey-office-suit_140725-161962.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid" alt="Carlos Martinez" style={styles.executiveImage} />
    <div>
      <h3 style={styles.executiveName}>Carlos Martinez</h3>
      <p>Carlos Martinez is a CFO with a decade of experience in financial management, working with multinational companies.</p>
      <div style={styles.socialIcons}>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  </div>

</section>

    </div>
  );
};

// CSS styles for the page (in JavaScript object form)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f7ff',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    textAlign: 'center',
    padding: '40px',
    marginBottom: '50px',
  },
  heroTitle: {
    fontSize: '3rem',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  heroText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px',
  },
  ctaButton: {
    padding: '10px 20px',
    backgroundColor: '#6a00f4',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    maxWidth:'170px',
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '50px',
  },
  stat: {
    textAlign: 'center',
  },
  statTitle: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  statText: {
    fontSize: '1rem',
    color: '#666',
  },
  valuesSection: {
    marginBottom: '50px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(12px)',
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  valueItems: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  valueItem: {
    flex: '1',
    margin: '10px',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  executivesSection: {
    marginBottom: '50px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  executive: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  executiveImage: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    marginRight: '20px',
  },
  executiveName: {
    fontSize: '1.7rem',
    color: '#333',
  },
  socialIcons: {
    marginTop: '10px',
    display: 'flex',
    gap: '20px',
  },
};

export default App;
