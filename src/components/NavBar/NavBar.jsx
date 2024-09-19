import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
function BasicExample({ userData, setUserData }) {
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
      navigate("");
    }
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="">
            <h3 className="fw-bold m-0">Noxe</h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {userData === null ? null : (
            <Nav className="me-auto">
              <Nav.Item>
                <NavLink className={`${style.navLink} nav-link`} to="/">
                  Home
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className={`${style.navLink} nav-link`} to="/movies">
                  Movies
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className={`${style.navLink} nav-link`} to="/tvShow">
                  Tv Show
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className={`${style.navLink} nav-link`} to="/people">
                  People
                </NavLink>
              </Nav.Item>
            </Nav>
          )}
          <Nav className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData !== null ? (
              <Nav.Item className="d-flex">
                <input
                  onChange={(e) => {
                    search(e.target.value);
                  }}
                  type="text"
                  className="form-control my-2"
                  placeholder="Search"
                />
              </Nav.Item>
            ) : null}
            <Nav.Item>
              <NavLink className="nav-item d-flex nav-link align-items-center">
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
              </NavLink>
            </Nav.Item>
          </Nav>

          {userData !== null ? (
            <Nav.Item>
              <DropdownButton
                variant="light"
                title={<i className="fa-regular fa-user"></i>}
              >
                <Dropdown>
                  <Link
                    className={`${style.navLink} dropdown-item cursor-pointer`}
                    to="/editData"
                  >
                    {userData?.name}
                  </Link>
                </Dropdown>

                <Dropdown.Divider className="bg-light" />
                <Dropdown
                  className={`${style.navLink} dropdown-item cursor-pointer`}
                  onClick={logout}
                >
                  Logout
                </Dropdown>
              </DropdownButton>
            </Nav.Item>
          ) : (
            <>
              <Nav>
                <Nav.Item className="nav-item">
                  <NavLink className={`${style.navLink} nav-link`} to="/login">
                    Login
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </Nav.Item>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
