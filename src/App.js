import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

import Axios from "axios";

function App() {
  const [leftText, setLeftTextCon] = useState("");

  const [selectVal, setSelectVal] = useState("it");

  const [leftTextDisplay, setLeftTextDisplayCon] = useState("");

  const [translatedText, setTranslatedText] = useState("");

  const handleSelectChange = (event) => {
    // Update the state variable when the user selects an option
    setSelectVal(event.target.value);
  };

  const translateText = async () => {
    try {
      const response = await Axios.get(
        `https://api.mymemory.translated.net/get?q=${leftText}&langpair=en|${selectVal}`
      );
      setTranslatedText(response.data.matches[0].translation);

      setLeftTextCon("");
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-con">
        <h1>Translate</h1>
        <div className="container">
          <div className="left-side-con">
            <input
              value={leftText}
              placeholder="Text in English"
              onChange={(e) => {
                setLeftTextCon(e.target.value);
                setLeftTextDisplayCon(e.target.value);
              }}
              onBlur={translateText}
            />
            <div className="left-side-inner">
              <text>{leftTextDisplay}</text>
            </div>
          </div>
          <div className="right-side-con">
            <select
              name="language"
              value={selectVal}
              onChange={handleSelectChange}
            >
              <option value="it">Italian</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
              <option value="el">Greek</option>
            </select>
            {/* <input
              placeholder="English"
              onChange={(e) => setRightTextCon(e.target.value)}
            /> */}
            <div className="right-side-inner">
              <text>{translatedText}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
