import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link
          to="/"
          className="navbar navbar-brand bg-dark"
          style={{ margin: "2px" }}
        >
          Formula 1 Forecast
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item" style={{ margin: "2px" }}>
              <Link to="/prediction" className="nav-link bg-dark">
                Prediction
              </Link>
            </li>
            <li className="navbar-item" style={{ margin: "2px" }}>
              <Link to="/all-scores" className="nav-link bg-dark">
                All-Scores
              </Link>
            </li>
            <li className="navbar-item" style={{ margin: "2px" }}>
              <Link to="/user" className="nav-link bg-dark">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

/*
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar navbar-brand bg-dark">
          Formula 1 Forecast
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/prediction" className="nav-link bg-dark">
                Prediction
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link bg-dark">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>


style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
       
*/
