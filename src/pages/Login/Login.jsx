import React, { useState, useContext } from 'react';
import { StoreContext } from './../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../service/authService';
import "./Login.css";

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await login(formData);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        await loadCartData(response.data.token);
        navigate('/');
      } else {
        toast.error("Unable to login, Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Unable to login, Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="login-box mt-2">
        <div className="modal-content">
          <div className="banner-header"></div>
          <div className="modal-header border-0">
            <h5 className="modal-title">Welcome Back!</h5>
          </div>
          
          <div className="container">
            <div className="modal-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={onChangeHandler}
                      required
                    />
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={onChangeHandler}
                      required
                    />
                    <span className="input-group-text password-toggle" onClick={togglePasswordVisibility}>
                      <i className={passwordVisible ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>

                <div className="text-center mb-3">
                  <span className="text-muted">or continue with</span>
                </div>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  <button type="button" className="btn btn-outline-danger d-flex align-items-center gap-1">
                    <i className="bi bi-google"></i> Google
                  </button>
                  <button type="button" className="btn btn-outline-primary d-flex align-items-center gap-1">
                    <i className="bi bi-facebook"></i> Facebook
                  </button>
                </div>

                <div className="text-center">
                  Don't have an account?{" "}
                  <a href="#" className="text-decoration-none">
                    Register now
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
