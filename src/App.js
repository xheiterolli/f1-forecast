import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreatePrediction from "./components/create-prediction.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/user" component={CreateUser} />
        <Route path="/prediction" component={CreatePrediction} />
      </div>
    </Router>
  );
}

export default App;
