import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { handleError,handleSuccess } from '../utils';

const Signup = () => {

  const [signupInfo,setSignupInfo] = useState({
    name : "",
    email : "",
    password : "",
  });

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    const {name,email,password} = signupInfo;
    if(!name || !email || !password){
      return handleError("All fields are required")
    }
    try{
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url,{
        method:"POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const {success,message,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message);
      }
    }
    catch(err){
      handleError(err);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Sign Up</h3>
              <form onSubmit={handleSignup}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleChange}
                    value={signupInfo.name}
                    type="text"
                    className="form-control"
                    id="name"
                    name='name'
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    value={signupInfo.email}
                    type="email"
                    className="form-control"
                    id="email"
                    name='email'
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handleChange}
                    value={signupInfo.password}
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    placeholder="Enter password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <ToastContainer/>
              <p className="text-center mt-3">
                Already have an account? 
                <Link to="/login">Login here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
