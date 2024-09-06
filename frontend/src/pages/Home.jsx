import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import {ToastContainer} from "react-toastify"

const LandingPage = () => {

  const [loggedInUser,setLoggedInUser] = useState('');

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  },[])
  
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Our Website</h1>
      <p className="lead">Your one-stop solution for [add your purpose here]</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
      <h1>{loggedInUser}</h1>
    </div>
  );
};

export default LandingPage;
