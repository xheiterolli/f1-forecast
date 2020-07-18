import React, { Component } from "react";
//import axios from "axios";

class SeasonComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { races: ["Race1", "Race2"] };
  }

  render() {
    return (
      <div>
        <h3>Season 2020</h3>
        <table className="SeasonTable">
          <tbody>{this.raceList()}</tbody>
        </table>
      </div>
    );
  }
}

export default SeasonComponent;
