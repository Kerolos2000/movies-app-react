import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar({ userData, setUserData }) {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
    setUserData(null);
  }

  function search(val) {
    if (val.trim() !== "") {
      navigate(`/search/${val}`);
    } else {
      navigate("/");
    }
  }

  function toggleNav() {
    const navbar = document.getElementById("navbarSupportedContent");
    navbar.classList.toggle("show");
    const isExpanded = navbar.classList.contains("show");
    const button = document.getElementById("navbarToggleBtn");
    button.setAttribute("aria-expanded", isExpanded);
    button.classList.toggle("collapsed");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h3 className="fw-bold m-0">Noxe</h3>
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            id="navbarToggleBtn"
            aria-expanded="false"
            onClick={toggleNav}
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    aria-current="page"
                    to=""
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`${style.navLink} nav-link`} to="/movies">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`${style.navLink} nav-link`} to="/tvShow">
                    Tv Show
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`${style.navLink} nav-link`} to="/people">
                    People
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item nav-link">
                <input
                  onChange={(e) => {
                    search(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </li>
              <li className="nav-item d-flex nav-link align-items-center">
                <i
                  className={`${style.svg} fa-brands fa-facebook fa-fw me-2`}
                ></i>
                <i
                  className={`${style.svg} fa-brands fa-spotify fa-fw me-2`}
                ></i>
                <i
                  className={`${style.svg} fa-brands fa-instagram fa-fw me-2`}
                ></i>
                <i
                  className={`${style.svg} fa-brands fa-youtube fa-fw me-2`}
                ></i>
              </li>
              <div className="nav-item dropdown align-items-center d-md-flex">
                {userData !== null ? (
                  <>
                    <span
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="Dropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-regular fa-user"></i>
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="Dropdown">
                      <li>
                        <Link
                          to="/editData"
                          className={`${style.navLink} dropdown-item cursor-pointer`}
                        >
                          {userData.name}
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="nav-item">
                        <span
                          className={`${style.navLink} dropdown-item cursor-pointer`}
                          aria-current="page"
                          onClick={logout}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <li className="nav-item me-2">
                      <NavLink
                        className={`${style.navLink} nav-link`}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item me-2">
                      <NavLink
                        className={`${style.navLink} nav-link`}
                        to="/register"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}