import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreatePrediction from "./components/create-prediction.component";
import Results from "./components/result.component";
import Submission from "./components/submission-page.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar className="mr-auto" />
        <Route path="/user" component={CreateUser} />
        <Route path="/prediction" component={CreatePrediction} />
        <Route path="/result" component={Results} />
        <Route path="/submission" component={Submission} />
      </div>
    </Router>
  );
}

export default App;
