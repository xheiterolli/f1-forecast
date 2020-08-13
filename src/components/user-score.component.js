import React, { Component } from "react";
import axios from "axios";
import styles from "../index.css";

const pointsArray = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export default class UserScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.username,
      resultArray: this.props.result,
      racename: this.props.racename,
      resultFast: [],
      predictArray: [],
      predictFast: {},
      predictions: {},
      predict: {},
      score: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/predictions/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            predictions: response.data,
          });
          for (let i = 0; i < this.state.predictions.length; i++) {
            if (
              this.state.predictions[i].username === this.state.user &&
              this.state.predictions[i].race === this.state.racename
            ) {
              this.setState({
                predict: this.state.predictions[i],
              });

              let tempArray = [];
              for (let j = 0; j < this.state.predict.items.length; j++) {
                tempArray.push(this.state.predict.items[j].content);
              }

              this.setState({
                predictArray: tempArray,
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //console.log(this.props.racename);

    console.log(this.state.predictArray);
    console.log(this.state.resultArray);
  }

  compareResult() {
    let score = 0;
    let points = 0;
    for (let i = 0; i < 10; i++) {
      if (this.state.predictArray[i] === this.props.result[i].content) {
        points = pointsArray[i];
        score = score + points;
        //console.log(this.props.username + score + " 1");
        //console.log(score + " 1");
      }
    }
    //console.log(score + " 2");
    this.setState({
      score: score,
    });
    //console.log(score + " 3");
    //console.log(score);
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          paddingRight: "2%",
          margin: "1%",
          marginTop: "0%",
          marginLeft: "0%",
          backgroundColor: "#cdcdcd",
        }}
      >
        <div
          style={{
            backgroundColor: "#cdcdcd",
            padding: "1%",
            fontSize: "20px",
            borderBottom: "1px solid black",
            textAlign: "center",
          }}
        >
          <div>{this.state.user}</div>
        </div>
        <div>
          <div
            style={{
              fontSize: "50px",
              fontWeight: "bold",
            }}
          >
            100
          </div>
        </div>
      </div>
    );
  }
}

//<div> {this.state.predict}</div>

//#e7b9ff
//#805acb

/*
{this.props.racename}
        <div>{this.state.user}</div>
        <div>{this.state.predictArray}</div>
        <div>{this.state.fast_lap}</div>



        <div id="center" className="container" style={{ display: "table-row" }}>
          <div style={{ display: "table-cell", padding: "10px" }}>
            {this.state.user}
          </div>
          <div style={{ display: "table-cell", padding: "10px" }}>
            {"[" + this.state.predictArray + "]"}
          </div>
        </div>












        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "95%",
              margin: "1%",
              padding: "50px 1%",
              border: "3px solid grey",
              boxShadow: "3px 3px 3px 3px #9E9E9E",
              fontStyle: "oblique",
              color: "black",
            }}
          >
            <div>
              {this.props.racename} - {this.state.user}
            </div>
            <div>{"[" + this.state.predictArray + "]"}</div>
          </div>
        </div>

















        width: "60px",
              height: "60px",
              margin: "1%",
              padding: "10px 1%",
              boxShadow: "3px 3px 3px 3px #9E9E9E",
              fontStyle: "oblique",
              color: "black",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
*/
