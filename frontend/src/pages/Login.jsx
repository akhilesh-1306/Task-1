import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { handleError,handleSuccess } from '../utils';

const Login = () => {

  const [loginInfo,setLoginInfo] = useState({
    email : "",
    password : "",
  });

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email,password} = loginInfo;
    if(!email || !password){
      return handleError("All fields are required")
    }
    try{
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url,{
        method:"POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const {success,message,jwtToken,name,error} = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("loggedInUser",name);

        setTimeout(()=>{
          navigate("/landing")
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
              <h3 className="text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    value={loginInfo.email}
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
                    value={loginInfo.password}
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    placeholder="Enter password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <ToastContainer/>
              <p className="text-center mt-3">
                Don't have an account? 
                <Link to="/signup">Signup here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
