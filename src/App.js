import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CustomNavbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreatePrediction from "./components/create-prediction.component";
import Results from "./components/result.component";

function App() {
  return (
    <Router>
      <div className="container">
        <CustomNavbar />
        <Route path="/user" component={CreateUser} />
        <Route path="/prediction" component={CreatePrediction} />
        <Route path="/result" component={Results} />
      </div>
    </Router>
  );
}

export default App;
