import React, { useEffect, useState } from 'react';
import Review from './Review';
import './ReviewsList.css'; // Add CSS for scrolling effect

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/reviews.json'); // Ensure correct path to the file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

  return (
    <div className="reviews-list">
      <div className="scroll-container">
        {reviews.length > 0 ? (
          reviews.map((review) => <Review key={review.id} review={review} />)
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
