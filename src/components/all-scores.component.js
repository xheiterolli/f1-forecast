import React, { Component } from "react";
import axios from "axios";
import Score from "./score.component";
import PropTypes from "prop-types";

//const pointsArray = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
//const arr = [0, 1, 2, 3];

export default class AllScores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      races: [],
    };
  }

  componentDidMount() {
    const found_races = [];

    fetch("http://ergast.com/api/f1/2020/results?limit=400")
      .then(function (resp) {
        return resp.text();
      })
      .then(function (data) {
        let parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const raceTagLength = xmlDoc.getElementsByTagName("RaceName").length;
        for (let i = 0; i < raceTagLength; i++) {
          found_races.push(
            xmlDoc.getElementsByTagName("RaceName")[i].textContent
          );
        }
        //console.log(found_races);
      });
    this.setState((state) => {
      return { races: found_races };
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.races.map((race) => {
            return <Score racename={race} races={this.state.races} />;
          })}
        </div>
      </div>
    );
  }
}
