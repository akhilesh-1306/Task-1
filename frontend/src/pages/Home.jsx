import React from 'react';
import {Link} from "react-router-dom"
import {ToastContainer} from "react-toastify"

const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Our Website</h1>
      <p className="lead">Your one-stop solution for [add your purpose here]</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
