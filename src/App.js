import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreatePrediction from "./components/create-prediction.component";
import Season from "./components/season.component";
import Driver from "./components/driver.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/user" component={CreateUser} />
        <Route path="/prediction" component={CreatePrediction} />
        <Route path="/seasons" component={Season} />
        <Route path="/drivers" component={Driver} />
      </div>
    </Router>
  );
}

export default App;
