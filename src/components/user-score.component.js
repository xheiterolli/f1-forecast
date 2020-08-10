import React, { Component } from "react";
import axios from "axios";

export default class UserScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.username,
      resultArray: this.props.result,
      racename: this.props.racename,
      resultFast: {},
      predictArray: [],
      predictFast: {},
      predictions: {},
      predict: {},
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
  }

  render() {
    return (
      <div>
        <div>
          <div>{this.state.user}</div>
        </div>
        <div>{this.state.predictArray}</div>
      </div>
    );
  }
}

//<div> {this.state.predict}</div>
