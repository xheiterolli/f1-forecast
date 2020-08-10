import React, { Component } from "react";
import PropTypes from "prop-types";
import UserScore from "./user-score.component";
import axios from "axios";

let race_number;

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      result: [],
      fast_lap: {},
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
          //console.log(this.state.users);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    race_number = this.props.races.indexOf(this.props.racename) + 1;
    const resultArray = [];
    //console.log(race_number + " race number");
    //console.log(this.props.racename + " race name");

    fetch("http://ergast.com/api/f1/2020/" + race_number + "/results")
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
      });
    this.setState((state) => {
      return { result: resultArray };
    });

    let fast_name;

    fetch("http://ergast.com/api/f1/2020/" + race_number + "/fastest/1/results")
      .then(function (resp) {
        return resp.text();
      })
      .then(function (data) {
        let parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        for (let i = 0; i < 1; i++) {
          fast_name = xmlDoc.getElementsByTagName("FamilyName")[i].textContent;
        }
        console.log(fast_name);
      });
    this.setState((state) => {
      return { fast_lap: fast_name };
    });
    //console.log(this.state.fast_lap + " fastlap");
  }

  render() {
    return (
      <div>
        <div>
          {this.state.users.map((user) => {
            return (
              <UserScore
                username={user}
                racename={this.props.racename}
                result={this.state.result}
              />
            );
          })}
        </div>
        <div></div>
      </div>
    );
  }
}

//          <div>{this.state.fast_lap}</div>
