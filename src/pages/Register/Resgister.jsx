import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { registerUser } from '../../service/authService';
import { useNavigate } from 'react-router-dom';

 const Resgister = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
   const response =  await registerUser(data);
      if(response.status === 201){
        toast.success("Resgister completed, Please login.");
        navigate("/login");     
      }else{
        toast.error("Unable to register, Please try again.");
      }
    } catch (error) {
      toast.error("Unable to register, Please try again.");
    }
  }

  return (
    <div
        className="container mt-2 vh-100" 
      >
      
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content">
          <div className=" banner-header ">
              </div>
            <div className="modal-header border-0">
              <h5 className="modal-title">Create An Account</h5>
        
            </div>

            <div className="container">
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                      <span className="input-group-text">
                        <i className="bi bi-person-fill"></i>
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={data.email}
                        onChange={handleChange}
                        name="email"
                      />
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        value={data.password}
                        onChange={handleChange}
                        name="password"
                      />
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                      />
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success w-100 mb-3">
                    Register
                  </button>

                  <div className="text-center mb-3">
                    <span className="text-muted">or sign up with</span>
                  </div>

                  <div className="d-flex justify-content-center gap-2 mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger d-flex align-items-center gap-1"
                    >
                      <i className="bi bi-google"></i> Google
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary d-flex align-items-center gap-1"
                    >
                      <i className="bi bi-facebook"></i> Facebook
                    </button>
                  </div>

                  <div className="text-center">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-decoration-none"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal2"
                    >
                      Sign in
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Resgister;