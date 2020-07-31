import React from "react";
import Toto from "../assets/toto.gif";

export default function Submission() {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <img
        style={{ paddingLeft: "27%", paddingRight: "40%" }}
        src={Toto}
        alt="Toto"
      />
      <br></br>
      <h2 style={{ color: "green", textAlign: "center" }}>
        Submission Successful ✔
      </h2>
    </div>
  );
}
