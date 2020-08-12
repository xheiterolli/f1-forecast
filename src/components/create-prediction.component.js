import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import styles from "../index.css";
//import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
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

const grid = 3;

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
      indexFast: "1",
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
    fetch("http://ergast.com/api/f1/2020/4/results")
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
        //console.log(racesArray);
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

    const fastest = this.state.items[this.indexFast - 1];
    this.setState({
      fastestLap: fastest,
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
    const id = e.target.id;
    const fastest = this.state.items[id - 1];
    this.setState({
      indexFast: id,
      fastestLap: fastest,
    });
    console.log(this.state.fastestLap);
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
        window.location = "/submission";
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
      <div>
        <div class="container" id="left">
          <div>
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
          <div>
            <label>Select Race:</label>
            <select
              style={{
                textAlignLast: "center",
                textAlign: "center",
                msTextAlignLast: "center",
                mozTextAlignLast: "center",
                marginBottom: "none",
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
          <AwesomeButton
            style={{
              width: "140px",
              height: "40px",
              margin: "1% 41% 0",
              display: "block",
              justifyContent: "center",
              alignItems: "center",
            }}
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
        <div id="right">
          <div id="left" style={{ width: "calc(50% - 12px)" }}>
            <div style={{ width: "calc(10% - 12px)", float: "right" }}>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="1"
                onClick={this.onChangeFastestLap}
              >
                1
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="2"
                onClick={this.onChangeFastestLap}
              >
                2
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="3"
                onClick={this.onChangeFastestLap}
              >
                3
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="4"
                onClick={this.onChangeFastestLap}
              >
                4
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="5"
                onClick={this.onChangeFastestLap}
              >
                5
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="6"
                onClick={this.onChangeFastestLap}
              >
                6
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="7"
                onClick={this.onChangeFastestLap}
              >
                7
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="8"
                onClick={this.onChangeFastestLap}
              >
                8
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="9"
                onClick={this.onChangeFastestLap}
              >
                9
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="10"
                onClick={this.onChangeFastestLap}
              >
                10
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="11"
                onClick={this.onChangeFastestLap}
              >
                11
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="12"
                onClick={this.onChangeFastestLap}
              >
                12
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="13"
                onClick={this.onChangeFastestLap}
              >
                13
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="14"
                onClick={this.onChangeFastestLap}
              >
                14
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="15"
                onClick={this.onChangeFastestLap}
              >
                15
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="16"
                onClick={this.onChangeFastestLap}
              >
                16
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="17"
                onClick={this.onChangeFastestLap}
              >
                17
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="18"
                onClick={this.onChangeFastestLap}
              >
                18
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="19"
                onClick={this.onChangeFastestLap}
              >
                19
              </button>
              <button
                style={{
                  height: "39px",
                  width: "44px",
                  display: "block",
                  padding: "3px",
                  backgroundColor: "#1E88E5",
                  borderColor: "white",
                  color: "white",
                }}
                id="20"
                onClick={this.onChangeFastestLap}
              >
                20
              </button>
            </div>
          </div>
          <div id="right" style={{ width: "calc(50% - 12px)" }}>
            <div>
              <div style={{ width: "50%", float: "left" }}>
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
        </div>
      </div>
    );
  }
}

//http://ergast.com/api/f1/2020/drivers
