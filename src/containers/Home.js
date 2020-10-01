import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from "../components/Header";

const weatherKey = `533b80186fdf8e8d8faa837ee7ada898`;

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(`Tokyo`);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
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
        <h2>Weather in {city}</h2>
        <div className="WeatherInfo">
          <p>Weather Type: {weatherType}</p>
          <p>Current Temperature: {currentTemp}</p>
          <p>High Temperature: {highTemp}</p>
          <p>Low Temperature: {lowTemp}</p>
          <p>Cloudiness: {cloudiness}</p>
          <p>Humidity: {humidity}</p>
          <p>Wind Speed: {windSpeed}</p>
        </div>
      </main>
    </>
  );
}

export default Home;
