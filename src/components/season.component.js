import React, { Component } from "react";

const racesArray = [];

fetch("http://ergast.com/api/f1/2020/races")
  .then(function (resp) {
    return resp.text();
  })
  .then(function (data) {
    let parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    for (let i = 0; i < 8; i++) {
      racesArray.push(xmlDoc.getElementsByTagName("RaceName")[i].textContent);
    }
    console.log(racesArray);
  });

export default function Season() {
  return (
    <div>
      <h3 style={{ margin: 1, textAlign: "center" }}>Season 2020</h3>
      <ul style={{ margin: 1, textAlign: "center" }}>
        {racesArray.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}
