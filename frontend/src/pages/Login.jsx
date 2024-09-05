import React from 'react';
import {Link} from "react-router-dom"
import {ToastContainer} from "react-toastify"

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Login</h3>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
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
                <Link to="/signup">Sign up here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
