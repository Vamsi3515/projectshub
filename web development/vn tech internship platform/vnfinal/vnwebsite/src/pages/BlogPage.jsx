import React from 'react';
import blogData from '../data/blog.json';
import './BlogPage.css'; // Include animations and responsive grid styles

const BlogPage = () => {
  return (
    <div className="blog-page">
      <h1>Our Blogs</h1>
      <div className="blog-grid">
        {blogData.blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img
              src={blog.image.sizes.medium}
              alt={blog.image.alt}
              className="blog-image"
            />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p><strong>Author:</strong> {blog.author}</p>
              <p><strong>Date:</strong> {blog.date}</p>
              <p>{blog.description}</p>
              <h4>Related Event: {blog.events[0]?.name}</h4>
              <p><strong>Date:</strong> {blog.events[0]?.date}</p>
              <p><strong>Location:</strong> {blog.events[0]?.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
