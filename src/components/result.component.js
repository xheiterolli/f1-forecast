import React, { Component } from "react";
import axios from "axios";

const resultsArray = [];

fetch("http://ergast.com/api/f1/2020/results")
  .then(function (resp) {
    return resp.text();
  })
  .then(function (data) {
    let parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    for (let i = 0; i < 2; i++) {
      resultsArray.push(
        "(" +
          xmlDoc.getElementsByTagName("RaceName")[i].textContent +
          ")" +
          xmlDoc.getElementsByTagName("FamilyName")[i].textContent
      );
    }
    console.log(resultsArray);
  });

export default function Season() {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h2 style={{ textAlign: "center" }}>Results</h2>
      <ul>
        {resultsArray.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}
