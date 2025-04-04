import React from "react";
import "../styles/header.css";
import TrollIcon from "../assets/Troll Face.png";

const Header = () => {
  return (
    <header>
      <img src={TrollIcon} alt="icon"></img>
      <h1>Meme Generator</h1>
    </header>
  );
};

export default Header;
