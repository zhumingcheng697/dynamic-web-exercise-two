import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weatherKey = `533b80186fdf8e8d8faa837ee7ada898`;

function Home() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(
    new URLSearchParams(history.location.search).get("city") || "Shanghai"
  );

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
      setIsLoading(true);
    }
  }, [history.location]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        if (city !== "Shanghai") {
          setCity(`Shanghai`);
        } else {
          setIsLoading(false);
        }
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
    let weatherType = "Loading";
    let currentTemp = "0";
    let highTemp = "0";
    let lowTemp = "0";
    let cloudiness = "0";
    let humidity = "0";
    let windSpeed = "0";

    if (weatherData) {
      weatherType = `${weatherData.weather[0].description}`;
      currentTemp = `${Math.round(weatherData.main.temp)}℉`;
      highTemp = `${Math.round(weatherData.main.temp_max)}℉`;
      lowTemp = `${Math.round(weatherData.main.temp_min)}℉`;
      cloudiness = `${weatherData.clouds.all}%`;
      humidity = `${weatherData.main.humidity}%`;
      windSpeed = `${weatherData.wind.speed}mph`;
      setIsLoading(false);
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
          <div
            className="WeatherInfoBasic"
            style={{
              background: `linear-gradient(rgba(${
                parseInt(currentTemp.slice(0, -1)) > 80
                  ? "200,100,50"
                  : "50,20,100"
              },${parseInt(cloudiness.slice(0, -1)) / 250 + 0.2}), rgba(${
                parseInt(currentTemp.slice(0, -1)) > 80 ? "100,30,10" : "5,0,30"
              },${parseInt(cloudiness.slice(0, -1)) / 250 + 0.2}))`,
            }}
          >
            <div
              className="WeatherInfoImage"
              style={{
                opacity: isLoading ? "0" : "1",
              }}
            >
              <WeatherImage weatherType={weatherType} />
            </div>
            <p
              className="WeatherInfoType"
              style={{
                opacity: isLoading ? "0" : "1",
              }}
            >
              {weatherType}
            </p>
            <h3 className="Label">Current Temperature: </h3>
            <p
              className="WeatherInfoTemp"
              style={{
                opacity: isLoading ? "0" : "1",
              }}
            >
              {currentTemp}
            </p>
          </div>
          <div className="WeatherInfoPlus">
            <div className="WeatherInfoColumn">
              <h3 className="Label">High Temperature: </h3>
              <p
                className="WeatherInfoTextSmall"
                style={{
                  opacity: isLoading ? "0" : "1",
                }}
              >
                {highTemp}
              </p>
              <h3 className="Label">Low Temperature: </h3>
              <p
                className="WeatherInfoTextSmall"
                style={{
                  opacity: isLoading ? "0" : "1",
                }}
              >
                {lowTemp}
              </p>
            </div>
            <div className="WeatherInfoColumn">
              <h3 className="Label">Cloudiness: </h3>
              <p
                className="WeatherInfoTextSmall"
                style={{
                  opacity: isLoading ? "0" : "1",
                }}
              >
                {cloudiness}
              </p>
              <h3 className="Label">Humidity: </h3>
              <p
                className="WeatherInfoTextSmall"
                style={{
                  opacity: isLoading ? "0" : "1",
                }}
              >
                {humidity}
              </p>
              <h3 className="Label">Wind Speed: </h3>
              <p
                className="WeatherInfoTextSmall"
                style={{
                  opacity: isLoading ? "0" : "1",
                }}
              >
                {windSpeed}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
