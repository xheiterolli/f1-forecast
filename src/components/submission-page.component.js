import React from "react";
import Toto from "../assets/toto.gif";

export default function Submission() {
  return (
    <div>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Toto} alt="Toto" />
      </div>
      <h2 style={{ color: "green", textAlign: "center" }}>
        Submission Successful ✓
      </h2>
    </div>
  );
}
