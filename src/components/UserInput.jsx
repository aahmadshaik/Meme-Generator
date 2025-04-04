import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "../styles/userInput.css";
import MemeImage from "./MemeImage";

const UserInput = () => {
  const [memeImage, setMemeImage] = useState([]);
  const [meme, setMeme] = useState({
    topText: "Shut up",
    bottomText: "And take my money",
    image: "https://i.imgflip.com/3lmzyx.jpg",
  });

  const memeRef = useRef(null); // Reference to the meme container

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeImage(data.data.memes))
      .catch((error) => console.error(error, "Fetching Failed"));
  }, []);

  function handleTextChange(event) {
    const { name, value } = event.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function randomImageFunction(event) {
    event.preventDefault();
    let randomIndex = Math.floor(Math.random() * memeImage.length);
    let randomImage = memeImage[randomIndex].url;

    setMeme((prev) => ({
      ...prev,
      image: randomImage,
    }));
  }

  async function downloadMeme() {
    if (!memeRef.current) return;

    const canvas = await html2canvas(memeRef.current, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <form>
        <main>
          <div className="inputContainer">
            <div className="inputBox">
              <label>Top text</label>
              <input
                type="text"
                id="top"
                name="topText"
                value={meme.topText}
                onChange={handleTextChange}
              />
            </div>

            <div className="inputBox">
              <label>Bottom text</label>
              <input
                type="text"
                id="bottom"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleTextChange}
              />
            </div>
          </div>

          <button onClick={randomImageFunction}>Get a new meme image 🖼</button>
          <button type="button" onClick={downloadMeme}>
            📥 Download Meme
          </button>
        </main>
      </form>

      {/* Meme Image with Text inside a container */}
      <div ref={memeRef} className="meme-container">
        <MemeImage
          topText={meme.topText}
          bottomText={meme.bottomText}
          image={meme.image}
        />
      </div>
    </div>
  );
};

export default UserInput;
