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
        <div
          style={{
            float: "none",
            margin: "0 auto",
            width: "50%",
            height: "30%",
            backgroundColor: "red",
            border: "1px solid black",
            color: "white",
            marginTop: "1%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <div style={{ margin: "1%", marginLeft: "2%" }}>
            {this.props.racename}
          </div>
        </div>
        <div
          style={{
            float: "none",
            margin: "0 auto",
            width: "50%",
            height: "70%",
            backgroundColor: "blue",
            border: "1px solid black",
            color: "white",
            marginBottom: "2%",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <div style={{ margin: "4%", marginLeft: "2%" }}>
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
        </div>
      </div>
    );
  }
}

//          <div>{this.state.fast_lap}</div>

/*
<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            margin: "1%",
            padding: "1%",
            boxShadow: "2px 2px 2px 2px #D3D3D3",
            fontStyle: "oblique",
            color: "black",
            borderRadius: "10px",
          }}
        >
          {this.props.racename}
          <div
            style={{
              width: "80%",
              float: "right",
              display: "inline-block",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                margin: "1%",
                padding: "10px 1%",
                boxShadow: "3px 3px 3px 3px #9E9E9E",
                fontStyle: "oblique",
                color: "black",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
          </div>
        </div>
      </div>
*/

/*
 <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              margin: "1%",
              padding: "1%",
              boxShadow: "2px 2px 2px 2px #D3D3D3",
              fontStyle: "oblique",
              color: "black",
              borderRadius: "10px",
            }}
          >
            {this.props.racename}
          </div>
        </div>
        <div
          style={{
            width: "80%",
            float: "right",
            display: "inline-block",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: "1%",
              padding: "10px 1%",
              boxShadow: "3px 3px 3px 3px #9E9E9E",
              fontStyle: "oblique",
              color: "black",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
        </div>
      </div>
*/
