import React, { Component } from "react";
import PropTypes from "prop-types";
import UserScore from "./user-score.component";
import axios from "axios";

let raceNumber;

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      races: this.props.races,
      racename: this.props.racename,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });

          console.log(this.state.users);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    raceNumber = this.state.races.indexOf(this.state.racename) + 1;
    const resultArray = [];
    console.log(raceNumber);

    fetch("http://ergast.com/api/f1/2020/" + raceNumber + "/results")
      .then(function (resp) {
        return resp.text();
      })
      .then(function (data) {
        let parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        for (let i = 0; i < 20; i++) {
          resultArray.push(
            xmlDoc.getElementsByTagName("FamilyName")[i].textContent
          );
        }
        console.log(resultArray);
      });
    this.setState((state) => {
      return { result: resultArray };
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.users.map((user) => {
            return (
              <UserScore
                username={user}
                racename={this.state.racename}
                result={this.state.result}
              />
            );
          })}
        </div>
        <div>
          <div>{this.state.racename}</div>
        </div>
      </div>
    );
  }
}
