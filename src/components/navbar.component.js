import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar navbar-brand bg-dark">
          Formula 1 Forecast
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/seasons" className="nav-link bg-dark">
                Seasons
              </Link>
            </li>
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
            <li className="navbar-item">
              <Link to="/drivers" className="nav-link bg-dark">
                Drivers
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
