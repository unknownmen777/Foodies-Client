import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Menubar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Menubar() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);

  // FIX: safe fallback if quantities is undefined
  const uniqueItemsCart = Object.values(quantities || {}).filter(
    (qty) => qty > 0
  ).length;

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img src={assets.logo} alt="" className="mx-4" height={50} width={50} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={active === "home" ? "nav-link fw-bold active" : "nav-link"}
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={active === "explore" ? "nav-link fw-bold active" : "nav-link"}
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={active === "contact-us" ? "nav-link fw-bold active" : "nav-link"}
                to="/contact"
                onClick={() => setActive("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4">
            <Link to={`/cart`}>
              <div className="position-relative">
                <img
                  src={assets.cart}
                  alt=""
                  height={32}
                  width={32}
                  className="position-relative"
                />
                {uniqueItemsCart > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {uniqueItemsCart}
                  </span>
                )}
              </div>
            </Link>

            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-outline-success"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle no-arrow"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={assets.user}
                    alt=""
                    width={45}
                    height={45}
                    className="rounded-circle cursor-pointer"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  <li className="dropdown-item" onClick={() => navigate('/myorders')}>Orders</li>
                  <li className="dropdown-item" onClick={logout}>LogOut</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menubar;
