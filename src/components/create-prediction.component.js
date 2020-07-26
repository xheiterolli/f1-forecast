import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import styles from "../index.css";
//import { Paper } from "@material-ui/core";
//import { Grid } from "@material-ui/core";
//import { classes } from "*.module.css";

const indexArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "turquoise" : "#1E88E5",
  color: isDragging ? "#000000" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "white" : "white",
  padding: grid,
  width: "100%",
  float: "right",
});

export default class CreatePrediction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      races: [],
      users: [],
      fastestLap: {},
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRace = this.onChangeRace.bind(this);
    this.onChangeFastestLap = this.onChangeFastestLap.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // getting users ---------------------------------------------------
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //getting drivers --------------------------------------------------
    const driversArray = [];
    fetch("http://ergast.com/api/f1/2020/drivers")
      .then(function (resp) {
        return resp.text();
      })
      .then(function (data) {
        let parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        for (let i = 0; i < 20; i++) {
          driversArray.push({
            id: `item-${i}`,
            content: xmlDoc.getElementsByTagName("FamilyName")[i].textContent,
          });
        }
      });

    this.setState((state) => {
      return { items: driversArray };
    });

    // getting races -----------------------------------------------------
    const racesArray = [];
    fetch("http://ergast.com/api/f1/2020/races")
      .then(function (resp) {
        return resp.text();
      })
      .then(function (data) {
        let parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        for (let i = 0; i < 8; i++) {
          racesArray.push(
            xmlDoc.getElementsByTagName("RaceName")[i].textContent
          );
        }
        console.log(racesArray);
      });

    this.setState((state) => {
      return { races: racesArray };
    });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) return;

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });

    console.log(items);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
    console.log(e.target.value);
  }

  onChangeRace(e) {
    this.setState({
      race: e.target.value,
    });
    console.log(e.target.value);
  }

  onChangeFastestLap(e) {
    //this.setState({
    //  fastestLap: e.target.value,
    //});
    const id = e.target.id;
    console.log(id);
  }

  onSubmit(e) {
    //e.preventDefault();

    const prediction = {
      username: this.state.username,
      race: this.state.race,
      items: this.state.items,
      fastestLap: this.state.fastestLap,
    };

    axios
      .post("http://localhost:5000/predictions/add", prediction)
      .then((res) => {
        console.log(res.data);
        console.log("Prediction Submitted");
      })
      .catch((error) => {
        console.log(error);
      });

    //window.location = "/";
  }

  render() {
    return (
      <div style={{ textAlign: "center" }} className="selectpicker">
        <h2>Make Prediction</h2>
        <div className="form-group">
          <label>Select User:</label>
          <select
            style={{
              textAlignLast: "center",
              textAlign: "center",
              msTextAlignLast: "center",
              mozTextAlignLast: "center",
            }}
            //className="selectpicker"
            //data-live-search="true"
            ref="userInput"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
          >
            {this.state.users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Select Race:</label>
          <select
            style={{
              textAlignLast: "center",
              textAlign: "center",
              msTextAlignLast: "center",
              mozTextAlignLast: "center",
            }}
            ref="userInput"
            required
            className="form-control"
            value={this.state.race}
            onChange={this.onChangeRace}
          >
            {this.state.races.map(function (item) {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div id="full">
          <div id="left">
            <div style={{ width: "calc(10% - 2px)", float: "right" }}>
              {indexArray.map(function (item) {
                return (
                  <AwesomeButton
                    style={{
                      width: "100%",
                      display: "block",
                      padding: "3px",
                    }}
                    type="primary"
                    ripple
                    onPress={() => {
                      //this.onChangeFastestLap();
                      console.log(); //---------------------------------------------------------
                    }}
                  >
                    {item}
                  </AwesomeButton>
                );
              })}
            </div>
          </div>
          <div id="right">
            <div style={{ width: "calc(25% - 2px)", float: "left" }}>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Select Fastest Lap:</label>
          <select
            style={{
              textAlignLast: "center",
              textAlign: "center",
              msTextAlignLast: "center",
              mozTextAlignLast: "center",
            }}
            ref="userInput"
            required
            className="form-control"
            value={this.state.fastestLap}
            onChange={this.onChangeFastestLap}
          >
            {this.state.items.map(function (item) {
              return (
                <option key={item.id} value={item.content}>
                  {item.content}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <AwesomeButton
            type="primary"
            ripple
            onPress={() => {
              console.log("Button Click");
              this.onSubmit();
            }}
          >
            Submit
          </AwesomeButton>
        </div>
      </div>
    );
  }
}
