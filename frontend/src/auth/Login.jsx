import React from 'react';

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
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <a href="/signup">Sign up here</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
