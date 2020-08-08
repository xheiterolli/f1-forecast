import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreatePrediction from "./components/create-prediction.component";
import Submission from "./components/submission-page.component";
import AllScores from "./components/all-scores.component";
//import Score from "./components/score.component";
//import UserScore from "./components/user-score.component";

function App() {
  return (
    <Router>
      <Navbar className="mr-auto" />
      <Route path="/user" component={CreateUser} />
      <Route path="/prediction" component={CreatePrediction} />
      <Route path="/submission" component={Submission} />
      <Route path="/all-scores" component={AllScores} />
    </Router>
  );
}

export default App;
