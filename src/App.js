import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getWeatherUrl } from "./util/myFunctions.js";
import Location from "./components/Location.js";
import Prediction from "./components/Prediction.js";

function App() {
  const [data, setData] = useState(null);
  const [place, setPlace] = useState("Rome, IT");
  const [coords, setCoords] = useState({ lat: "41.893", lng: "12.483" });
  const [rainToday, setRainTyoday] = useState(-1);
  const [rainTomorrow, setRainTomorrow] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const mapQuestKey = "cb0WGUj0cN4jOJDJDArGH75PkNrGxyFu";

  useEffect(() => {
    console.log("updating stuff");
    const coordUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${place}`;
    axios({
      url: coordUrl,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        console.log("in coords metto", res.data.results[0].locations[0].latLng);
        setCoords(res.data.results[0].locations[0].latLng);
        return res.data.results[0].locations[0].latLng;
      })
      .then((thisCoords) => {
        const weatherUrl = getWeatherUrl(thisCoords.lat, thisCoords.lng);
        axios({
          url: weatherUrl,
          method: "GET",
        })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [place]);

  useEffect(() => {
    console.log("datadatadata");
    if (data) {
      console.log("posto: " + place + ", " + coords.lat + " " + coords.lng);
      console.log("pioggia oggi: " + data.daily.precipitation_hours[0]);
      console.log("pioggia domani: " + data.daily.precipitation_hours[1]);
      setRainTyoday(data.daily.precipitation_hours[0]);
      setRainTomorrow(data.daily.precipitation_hours[1]);
    }
  }, [data]);

  const handleBodyClick = (e) => {
    if (editMode && e.target.className !== "active-form") {
      submitMyForm();
    }
  };

  const submitMyForm = () => {
    setEditMode(false);
    setPlace(inputValue.trim());
    // TODO: clean input better
  };

  return (
    <div className="App" onClick={(e) => handleBodyClick(e)}>
      <div className="app-content">
        <header>
          <h1>Rain?</h1>
        </header>
        <Location
          place={place}
          setPlace={setPlace}
          editMode={editMode}
          setEditMode={setEditMode}
          setInputValue={setInputValue}
          submitMyForm={submitMyForm}
        />
        <div className="pred-container">
          <div className="spacer"></div>
          <Prediction date="Today" rainForDate={rainToday} />
          <div className="spacer"></div>
          <Prediction date="Tomorrow" rainForDate={rainTomorrow} />
        </div>
      </div>
    </div>
  );
}

export default App;
