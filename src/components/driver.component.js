import React, { Component } from "react";

const driversArray = [];

fetch("http://ergast.com/api/f1/2020/drivers")
  .then(function (resp) {
    return resp.text();
  })
  .then(function (data) {
    let parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    for (let i = 0; i < 20; i++) {
      driversArray.push(
        xmlDoc.getElementsByTagName("FamilyName")[i].textContent
      );
    }
  });

export default function Driver() {
  return (
    <div>
      <h3 style={{ margin: 1, textAlign: "center" }}>
        {" "}
        2020 Formula 1 Drivers{" "}
      </h3>
      <ul style={{ margin: 1, textAlign: "center" }}>
        {driversArray.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}
