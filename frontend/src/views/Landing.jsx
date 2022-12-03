import React from "react";
import "./Landing.css";
import Banner from "../components/Banner";
import Login from "./Login";
import Card1 from "../components/Card1";
import bg from "../assets/background.jpg"

function Landing({ user, dispatch }) {
  return (
    <div className="home">
      <img src={bg}></img>
      <Banner />
    </div>
  );
}

export default Landing;
