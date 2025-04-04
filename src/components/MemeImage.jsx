import React from "react";
import "../styles/memeImage.css";
const MemeImage = (props) => {
  return (
    <div className="ImageBox">
      <h1 className="firstMeme">{props.topText} </h1>
      <h1 className="secondMeme">{props.bottomText}</h1>
      <img className="memeImage" src={props.image} alt="memeImage"></img>
    </div>
  );
};

export default MemeImage;
