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
          console.log(this.state.predictions.length);
          for (let i = 0; i < this.state.predictions.length; i++) {
            console.log(this.state.predictions[i].username);
            console.log(this.props.username);
            console.log(this.state.predictions[i].race);
            console.log(this.props.racename);

            /*
            if (
              this.state.predictions[i].username === this.state.user &&
              this.state.predictions[i].race === this.state.racename
            ) {
              this.setState({
                predict: this.state.predictions[i],
              });

              console.log("------------------------------------");
              console.log(this.state.predict.items);
            } else {
              console.log("else ------------------------------------");
            }
            */
          }
          //console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //console.log(this.state.predictions.length);
  }

  render() {
    return <div>{this.state.user}</div>;
  }
}
