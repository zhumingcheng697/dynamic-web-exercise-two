import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weatherKey = `533b80186fdf8e8d8faa837ee7ada898`;

function Home() {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(`Shanghai`);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history.location.search]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        setCity(`Shanghai`);
        console.log(error);
      });
  }, [city]);

  const {
    weatherType,
    currentTemp,
    highTemp,
    lowTemp,
    cloudiness,
    humidity,
    windSpeed,
  } = useMemo(() => {
    let weatherType = "Loading...";
    let currentTemp = "Loading...";
    let highTemp = "Loading...";
    let lowTemp = "Loading...";
    let cloudiness = "Loading...";
    let humidity = "Loading...";
    let windSpeed = "Loading...";

    if (weatherData) {
      weatherType = `${weatherData.weather[0].description}`;
      currentTemp = `${weatherData.main.temp}`;
      highTemp = `${weatherData.main.temp_max}`;
      lowTemp = `${weatherData.main.temp_min}`;
      cloudiness = `${weatherData.clouds.all}%`;
      humidity = `${weatherData.main.humidity}%`;
      windSpeed = `${weatherData.wind.speed}km/h`;
    }

    return {
      weatherType,
      currentTemp,
      highTemp,
      lowTemp,
      cloudiness,
      humidity,
      windSpeed,
    };
  }, [weatherData]);

  return (
    <>
      <Header />
      <main className="Home">
        <h2>
          Weather in <span>{city}</span>
        </h2>
        <div className="WeatherInfo">
          <div className="WeatherInfoBasic">
            <div
              className="WeatherInfoImage"
              style={{
                opacity: weatherType === "Loading..." ? "0" : "1",
              }}
            >
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfoType">{weatherType}</p>
            <h3 className="Label">Current Temperature: </h3>
            <p className="WeatherInfoTemp">{currentTemp}</p>
          </div>
          <div className="WeatherInfoPlus">
            <div className="WeatherInfoColumn">
              <h3 className="Label">High Temperature: </h3>
              <p className="WeatherInfoTextSmall">{highTemp}</p>
              <h3 className="Label">Low Temperature: </h3>
              <p className="WeatherInfoTextSmall">{lowTemp}</p>
            </div>
            <div className="WeatherInfoColumn">
              <h3 className="Label">Cloudiness: </h3>
              <p className="WeatherInfoTextSmall">{cloudiness}</p>
              <h3 className="Label">Humidity: </h3>
              <p className="WeatherInfoTextSmall">{humidity}</p>
              <h3 className="Label">Wind Speed: </h3>
              <p className="WeatherInfoTextSmall">{windSpeed}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
