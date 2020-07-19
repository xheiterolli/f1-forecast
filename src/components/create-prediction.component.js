import React, { PureComponent } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const closest = function (el, selector, rootNode) {
  rootNode = rootNode || document.body;
  console.log("rootNode:", rootNode);
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  //   console.log('matchesSelector:', matchesSelector);
  while (el) {
    const flagRoot = el === rootNode;
    //     console.log('flagRoot:', flagRoot);
    if (flagRoot || matchesSelector.call(el, selector)) {
      if (flagRoot) {
        el = null;
        //         console.log('flagRoot set el to null:', el);
      }
      //       console.log('break!');
      break;
    }
    el = el.parentElement;
    //     console.log('el = el.parentElement:', el);
  }
  //   console.log('closest:', el);
  el.setAttribute("style", "border: 50px solid red;");
  return el;
};

class CreatePrediction extends PureComponent {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFastestLap = this.onChangeFastestLap.bind(this);
    this.onChangePredictArray = this.onChangePredictArray.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.state = {
      fastestLap: "",
      users: [],
      data: [
        {
          title: "Hamilton",
          content: "Mercedes",
        },
        {
          title: "Bottas",
          content: "Mercedes",
        },
        {
          title: "Vettel",
          content: "Ferrari",
        },
        {
          title: "Leclerc",
          content: "Ferrari",
        },
        {
          title: "Verstappen",
          content: "Red Bull",
        },
        {
          title: "Albon",
          content: "Red Bull",
        },
        {
          title: "Sainz",
          content: "McLaren",
        },
        {
          title: "Norris",
          content: "McLaren",
        },
        {
          title: "Ricciardo",
          content: "Renault",
        },
        {
          title: "Ocon",
          content: "Renault",
        },
        {
          title: "Perez",
          content: "Racing Point",
        },
        {
          title: "Stroll",
          content: "Racing Point",
        },
        {
          title: "Gasly",
          content: "AlphaTauri",
        },
        {
          title: "Kvyat",
          content: "AlphaTauri",
        },
        {
          title: "Grosjean",
          content: "Haas",
        },
        {
          title: "Magnussen",
          content: "Haas",
        },
        {
          title: "Raikkonen",
          content: "Alfa Romeo",
        },
        {
          title: "Giovinazzi",
          content: "Alfa Romeo",
        },
        {
          title: "Russell",
          content: "Williams",
        },
        {
          title: "Latifi",
          content: "Williams",
        },
      ],
      dragIndex: -1,
      draggedIndex: -1,
    };
    this.columns = [
      {
        title: "Change Postion",
        render: (index) => (
          <span>
            {(this.state.dragIndex >= 0 &&
              this.state.dragIndex !== this.state.draggedIndex &&
              index === this.state.draggedIndex && (
                <span
                  className={`drag-target-line ${
                    this.state.draggedIndex < this.state.dragIndex
                      ? "drag-target-top"
                      : ""
                  }`}
                />
              )) ||
              ""}
            <a
              className="drag-handle"
              draggable="false"
              onMouseDown={this.onMouseDown}
              href="#"
            >
              ||
            </a>
          </span>
        ),
      },
      {
        title: "Driver",
        dataIndex: "title",
      },
      {
        title: "Team",
        dataIndex: "content",
      },
    ];
  }

  onMouseDown(e) {
    console.log("onMouseDown");
    const target = this.getTrNode(e.target);
    if (target) {
      target.setAttribute("draggable", true);
      target.ondragstart = this.onDragStart;
      target.ondragend = this.onDragEnd;
    }
  }

  onDragStart(e) {
    console.log("onDragStart");
    const target = this.getTrNode(e.target);
    if (target) {
      //       e.dataTransfer.setData('Text', '');
      e.dataTransfer.effectAllowed = "move";
      console.log("target.parentElement:", target.parentElement);
      target.parentElement.ondragenter = this.onDragEnter;
      target.parentElement.ondragover = function (ev) {
        //         console.log('Tbody ondragover:',ev)
        //         ev.target.dataTransfer.effectAllowed = 'none'
        ev.preventDefault();
        return true;
      };
      const dragIndex = target.rowIndex - 1;
      console.log("dragIndex:", dragIndex);
      this.setState({ dragIndex, draggedIndex: dragIndex });
    }
  }

  onDragEnter(e) {
    const target = this.getTrNode(e.target);
    console.log("onDragEnter TR index:", target.rowIndex - 1);
    this.setState({
      draggedIndex: target ? target.rowIndex - 1 : -1,
    });
  }

  onDragEnd(e) {
    console.log("onDragEnd");
    const target = this.getTrNode(e.target);
    if (target) {
      target.setAttribute("draggable", false);
      target.ondragstart = null;
      target.ondragend = null;
      target.parentElement.ondragenter = null;
      target.parentElement.ondragover = null;
      this.changeRowIndex();
    }
  }

  getTrNode(target) {
    console.log("dragContainer:", this.refs.dragContainer);
    //     return closest(target, 'tr', this.refs.dragContainer.tableNode);
    return closest(target, "tr");
  }

  changeRowIndex() {
    const result = {};
    const currentState = this.state;
    console.log("currentState:", currentState);
    result.dragIndex = result.draggedIndex = -1;
    if (
      currentState.dragIndex >= 0 &&
      currentState.dragIndex !== currentState.draggedIndex
    ) {
      const { dragIndex, draggedIndex, data: oldData } = currentState;
      const data = [...oldData];
      //       const data = oldData;
      const item = data.splice(dragIndex, 1)[0];
      data.splice(draggedIndex, 0, item);
      result.data = data;
      result.dragIndex = -1;
      result.draggedIndex = -1;
    }
    this.setState(result);
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
  }

  onChangePredictArray(e) {
    this.setState({
      data: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const prediciton = {
      username: this.state.username,
      predictArray: this.state.predictArray,
      fastestLap: this.state.fastestLap,
    };

    console.log(prediciton);

    axios
      .post("http://localhost:5000/predictions/add", prediciton)
      .then((res) => console.log(res.data));

    window.location = "/";
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
  }

  render() {
    return (
      <div style={{ margin: 1, textAlign: "center" }}>
        <h2>Make Prediction</h2>
        <form onSubmit={this.onSubmit}>
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
          <div className="form-group">
            <Table
              className={
                (this.state.dragIndex >= 0 && "dragging-container") || ""
              }
              //           ref="dragContainer"
              columns={this.columns}
              pagination={false}
              dataSource={this.state.data}
              onChange={this.onChangePredictArray}
            />
          </div>
          <div className="form-group">
            <label>Fastest Lap:</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.fastestLap}
              onChange={this.onChangeFastestLap}
            >
              <option value="Hamilton"> Hamilton </option>
              <option value="Bottas"> Bottas </option>
              <option value="Vettel"> Vettel </option>
              <option value="Leclerc"> Leclerc </option>
              <option value="Verstappen"> Verstappen </option>
              <option value="Albon"> Albon </option>
              <option value="Sainz"> Sainz </option>
              <option value="Norris"> Norris </option>
              <option value="Ricciardo"> Ricciardo </option>
              <option value="Ocon"> Ocon </option>
              <option value="Perez"> Perez </option>
              <option value="Stroll"> Stroll </option>
              <option value="Gasly"> Gasly </option>
              <option value="Kvyat"> Kvyat </option>
              <option value="Grosjean"> Grosjean </option>
              <option value="Magnussen"> Magnussen </option>
              <option value="Raikkonen"> Raikkonen </option>
              <option value="Giovinazzi"> Giovinazzi </option>
              <option value="Russell"> Russell </option>
              <option value="Latifi"> Latifi </option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="Submit"
              value="Submit Prediction"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default CreatePrediction;
