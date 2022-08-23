import React from "react";
import { rainToString } from "../util/myFunctions.js";

const Prediction = ({date, rainForDate}) => {
  return (
    <div className="prediction-box">
      <div className="date">{date}</div>
      <div className="prediction">{rainToString(rainForDate)}</div>
    </div>
  );
};

export default Prediction;
