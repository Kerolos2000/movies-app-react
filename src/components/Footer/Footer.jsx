import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <>
      <footer className="text-center bg-dark">
        <p className="mb-2">created by Kerolos Magdy</p>
        <div className="icons">
          <a
            className="icon"
            href="https://www.linkedin.com/in/kerolos-magdy-314644212/"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a className="icon" href="https://github.com/Kerolos2000">
            <i className="fa-brands fa-github"></i>
          </a>
          <a className="icon" href="https://kerolos2000.github.io/portfolio/">
            <i className="fa-solid fa-bookmark"></i>
          </a>
        </div>
      </footer>
    </>
  );
}
