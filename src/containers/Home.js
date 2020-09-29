import React from "react";

import Header from "../components/Header";

const weatherKey = `533b80186fdf8e8d8faa837ee7ada898`;

function Home() {
  /*
  Weather Type (ex. Cloudy)
  Current Temperature
  High Temperature
  Low Temperature
  Cloudiness
  Humidity
  Wind Speed
  */
  return (
    <>
      <Header />
      <div className="Home">
        <h2>Weather in Shanghai</h2>
        <main>
          <p>Weather Type: Cloudy</p>
          <p>Current Temperature: 23 degrees</p>
          <p>High Temperature: 28 degrees</p>
          <p>Low Temperature: 18 degrees</p>
          <p>Cloudiness: 100</p>
          <p>Humidity: 35%</p>
          <p>Wind Speed: 2km/h</p>
        </main>
      </div>
    </>
  );
}

export default Home;
