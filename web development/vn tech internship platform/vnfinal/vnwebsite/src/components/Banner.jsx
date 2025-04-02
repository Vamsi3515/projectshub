// Banner.jsx
import React, { useEffect, useState } from 'react';
import './Banner.css'; // Import the CSS file

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of banner objects with images, text, and additional content
    const banners = [
        {
            id: 1,
            image: 'https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg', // Relevant image for Python
            text: 'Enroll Now: Get 20% off on Python Courses!',
            discountPrice: '$79',
            quote: 'Start your programming journey today!',
        },
        {
            id: 2,
            image: 'https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg', // Relevant image for Web Development
            text: 'Limited Offer: Free Trial for Web Development Bootcamp!',
            discountPrice: 'Free',
            quote: 'Transform your career with coding skills!',
        },
        {
            id: 3,
            image: 'https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg', // Relevant image for Data Science
            text: 'Join our Data Science Course and get certified!',
            discountPrice: '$199',
            quote: 'Unlock the power of data in your career!',
        },
        {
            id: 4,
            image: 'https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg', // Relevant image for Mobile App Development
            text: 'Special Discount on Mobile App Development - Enroll Today!',
            discountPrice: '$299',
            quote: 'Build apps that make a difference!',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [banners.length]);

    return (
        <div
            className="banner-container"
            style={{ backgroundImage: `url(${banners[currentIndex].image})` }}
        >
            <div className="banner-content">
                <h2>{banners[currentIndex].text}</h2>
                <p className="discount-price">{banners[currentIndex].discountPrice}</p>
                <blockquote className="quote">{banners[currentIndex].quote}</blockquote>
                <button className="banner-button">Learn More</button>
            </div>
        </div>
    );
};

export default Banner;
