import React from "react";
import logo from "../../nav-icon.jpg";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-minty justify-content-between">
    <img src={logo} className="App-logo float-left" width="50" height ="50" alt="Search" />
    <p className="navbar-brand">Google Books Search</p>
    <div className="navbar-nav">
      <Link to="/" className="ml-2">Home</Link>
      <Link to="saved" className="ml-2">Saved</Link>
    </div>
  </nav>
);

export default Nav;
