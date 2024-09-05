import React from 'react';

const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Our Website</h1>
      <p className="lead">Your one-stop solution for [add your purpose here]</p>
      <div className="mt-4">
        <a href="/login" className="btn btn-primary me-2">Login</a>
        <a href="/signup" className="btn btn-secondary">Sign Up</a>
      </div>
    </div>
  );
};

export default LandingPage;
