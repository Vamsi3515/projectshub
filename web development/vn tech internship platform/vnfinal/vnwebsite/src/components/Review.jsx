// src/components/Review.jsx

import React, { useEffect, useState } from 'react';
import reviewsData from '../data/reviews.json'; // Ensure the path is correct
import './Review.css';

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Simulate fetching data (replace with actual data fetching logic)
        setReviews(reviewsData);
    }, []);

    return (
        <div className="reviews-container">
            {reviews.length > 0 ? (
                <div className="scrolling-wrapper">
                    {reviews.map(review => (
                        <div className="review-card" key={review.id}>
                           <img src={'/src/assets/rb_32238.png'} alt={review.author} className="review-image" />
                            <h3>{review.author}</h3>
                            <p>Subject: {review.subject}</p>
                            <p>{review.review}</p>
                            <p>Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                            <p>Date: {review.date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default Review;
