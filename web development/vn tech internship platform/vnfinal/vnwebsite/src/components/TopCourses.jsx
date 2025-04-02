import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import './TopCourses.css'; // Import the CSS file

const TopCourses = () => {
    const navigate = useNavigate();

    // Initialize AOS for scroll animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration (in ms)
            easing: 'ease-in-out', // Easing for smooth animation
            once: true, // Whether animation should happen only once
        });
    }, []);

    const courses = [
        {
            id: 1,
            name: 'Digital Marketing Masterclass',
            description: 'Master digital marketing class for strategies and tools.',
            cost: '$199',
            duration: '4 weeks',
            image: 'https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid',
        },
        {
            id: 2,
            name: 'Web Development Bootcamp',
            description: 'Become a full-stack web developer in just 12 weeks.',
            cost: '$499',
            duration: '12 weeks',
            image: 'https://img.freepik.com/free-photo/programming-background-collage_23-2149901789.jpg?t=st=1729060118~exp=1729063718~hmac=f610083c7c380aa95d42e2a24244010ac38bc5e0f70741011272a414243f7a6c&w=1060',
        },
        {
            id: 3,
            name: 'Data Science and Machine Learning',
            description: 'Explore data analysis and machine learning algorithms.',
            cost: '$299',
            duration: '10 weeks',
            image: 'https://img.freepik.com/free-photo/man-using-tablet-work-connect-with-others_23-2149369110.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid',
        },
        {
            id: 4,
            name: 'Mobile App Development workshop',
            description: 'Create mobile applications for iOS and Android using React Native.',
            cost: '$399',
            duration: '8 weeks',
            image: 'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid',
        },
        {
            id: 5,
            name: 'Introduction to Python Programming',
            description: 'Learn the basics of Python programming tools and technologies.',
            cost: '$99',
            duration: '6 weeks',
            image: 'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010129.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid',
        },
        {
            id: 6,
            name: 'Cloud Computing Fundamentals',
            description: 'Understand cloud computing concepts and services.',
            cost: '$250',
            duration: '5 weeks',
            image: 'https://img.freepik.com/free-photo/digital-world-banner-background-remixed-from-public-domain-by-nasa_53876-108505.jpg?uid=R168272675&ga=GA1.1.1347609200.1728884525&semt=ais_hybrid',
        },
    ];

    const navigateToRegistration = (course) => {
        navigate(`/register/${course.id}`, { 
            state: {
                courseName: course.name,
                courseDescription: course.description,
                courseCost: course.cost,
                courseDuration: course.duration,
            }
        });
    };
    

    return (
        <div className="top-courses-container">
            <h1 className='fade-down' data-aos="fade-down">Top Courses</h1>
            <div className="course-cards">
                {courses.map(course => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => navigateToRegistration(course)}
                        data-aos="fade-up" // Add fade-up animation for each card
                    >
                        <img src={course.image} alt={course.name} className="course-image" data-aos="zoom-in" />
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                        <p><strong>Cost:</strong> {course.cost}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <button onClick={() => navigateToRegistration(course)}>Register</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCourses;
