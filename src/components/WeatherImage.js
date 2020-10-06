import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCloud,
  faCloudSun,
  faCloudRain,
  faSun,
  faSmog,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

function WeatherImage({ weatherType }) {
  switch (weatherType) {
    case "Loading...":
      return <></>;
    case "broken clouds":
      return <FontAwesomeIcon icon={faCloudSun} />;
    case "clear sky":
      return <FontAwesomeIcon icon={faSun} />;
    case "few clouds":
    case "scattered clouds":
      return <FontAwesomeIcon icon={faCloud} />;
    case "light rain":
      return <FontAwesomeIcon icon={faCloudRain} />;
    case "overcast clouds":
      return <FontAwesomeIcon icon={faSmog} />;
    default:
      return <FontAwesomeIcon icon={faWind} />;
  }
}

export default WeatherImage;
