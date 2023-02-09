import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageButton from "./PageButton";
import TextButton from "./TextButton";
import LoadingIndicator from "./LoadingIndicator";
import RandomButton from "./RandomButton";
import TextInput from "./TextInput";
import Meme from "./Meme";

function MemePage() {
  const navigation = useNavigate();
  const [upperText, setUpperText] = useState("");
  const [lowerText, setLowerText] = useState("");
  const [upperMeme, setUpperMeme] = useState("");
  const [lowerMeme, setLowerMeme] = useState("");
  const [error, setError] = useState(null);
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { memeId } = useParams();
  const [num, setNum] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => {
        if (!response.ok) {
          alert(`${response.status}`);
          return setError(`HTTP Status Error: ${response.status}`);
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        setMemes(json.data.memes);
        console.log(json.data.memes);
      })
      .catch((errorMessage) => {
        setError(`${errorMessage}`);
        alert(`${errorMessage}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRandomMemeGenerator = () => {
    const randomNum = Math.floor(Math.random() * 100);
    setLowerMeme("");
    setLowerText("");
    setUpperMeme("");
    setUpperText("");
    setSelectedImage(null);
    navigation(`/meme/${memes[randomNum].id}`);
  };

  const handleOnClick = (e) => {
    if (e.target.value === "Next") {
      setNum(num + 1);
      setLowerMeme("");
      setLowerText("");
      setUpperMeme("");
      setUpperText("");
      setSelectedImage(null);
      navigation(`/meme/${memes[num + 1].id}`);
    } else if (e.target.value === "Back") {
      setNum(num - 1);
      setLowerMeme("");
      setLowerText("");
      setUpperMeme("");
      setUpperText("");
      setSelectedImage(null);
      navigation(`/meme/${memes[num - 1].id}`);
    }
  };
  const handleValueChange = (e) => {
    if (e.target.id === "upperText") {
      setUpperText(e.target.value);
    } else if (e.target.id === "lowerText") {
      setLowerText(e.target.value);
    }
  };

  const handleTextSubmit = (e) => {
    if (e.target.value == "Input Upper Text") {
      setUpperMeme(upperText);
      setUpperText("");
    } else if (e.target.value == "Input Lower Text") {
      setLowerMeme(lowerText);
      setLowerText("");
    }
  };

  useEffect(() => {
    if (memeId && memes.length) {
      const currentMeme = memes.filter((meme) => {
        if (meme.id === memeId) {
          return meme;
        } else {
          return null;
        }
      });

      for (let i = 0; i < memes.length; i++) {
        if (memes[i].id === currentMeme[0].id) {
          setNum(i);
        }
      }
    } else {
      setNum(0);
    }
  }, [memeId]);

  return (
    <div>
      {isLoading ? (
        <LoadingIndicator />
      ) : memes.length ? (
        <>
          <div className="memeDiv">
            {selectedImage ? (
              <>
                <div className="imageDiv">
                  <Meme
                    url={URL.createObjectURL(selectedImage)}
                    upperText={upperMeme}
                    lowerText={lowerMeme}
                  />

                  <br />
                  <br />
                  <button
                    style={{ width: 65 + "px" }}
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : memeId ? (
              <Meme
                url={memes[num].url}
                upperText={upperMeme}
                lowerText={lowerMeme}
              />
            ) : (
              <Meme
                url={memes[Math.floor(Math.random() * 100)].url}
                upperText={upperMeme}
                lowerText={lowerMeme}
              />
            )}
          </div>
          <div className="textInputDiv">
            <TextInput
              placeholder="Input Upper Text"
              onChange={handleValueChange}
              value={upperText}
              id="upperText"
            />
            <TextButton value="Input Upper Text" onClick={handleTextSubmit} />
            <TextInput
              placeholder="Input Lower Text"
              onChange={handleValueChange}
              value={lowerText}
              id="lowerText"
            />
            <TextButton value="Input Lower Text" onClick={handleTextSubmit} />
          </div>
          <div className="buttonDiv">
            <PageButton value="Back" onClick={handleOnClick} />
            <RandomButton value="Random" onClick={handleRandomMemeGenerator} />
            <PageButton value="Next" onClick={handleOnClick} />
          </div>
          <div className="resetDiv">
            <button
              onClick={() => {
                setLowerMeme("");
                setLowerText("");
                setUpperMeme("");
                setUpperText("");
              }}
            >
              Reset
            </button>
          </div>
          <div className="ownImageDiv">
            <label for="myImage">{"Upload Own Image:  "} </label>
            <input
              type="file"
              name="myImage"
              id="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default MemePage;
