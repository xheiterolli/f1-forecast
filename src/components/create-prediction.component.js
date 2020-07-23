import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgrey" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightgrey" : "lightgrey",
  padding: grid,
  width: 250,
});

export default class CreatePrediction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      users: [],
      fastestLap: {},
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFastestLap = this.onChangeFastestLap.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
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

    console.log("Component did mount -> driversArray");
    console.log(driversArray);

    this.setState((state) => {
      return { items: driversArray };
    });

    console.log("this.items");
    console.log(this.items);
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

  onChangeFastestLap(e) {
    this.setState({
      fastestLap: e.target.value,
    });
    console.log(e.target.value);
  }

  onSubmit(e) {
    //e.preventDefault();

    const prediction = {
      items: this.state.items,
      username: this.state.username,
      fastestLap: this.state.fastestLap,
    };

    console.log("on drag end -> this.items");
    console.log(this.items);

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
      <div style={{ margin: 1, alignItems: "center" }}>
        <h2>Make Prediction</h2>
        <div className="form-group">
          <label>Select User:</label>
          <select
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
        <div className="form-group">
          <label>Select Fastest Lap</label>
          <select
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
        <br></br>
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
