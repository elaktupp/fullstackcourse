import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationWeather = ({ lat, lon }) => {
  const APIKEY = import.meta.env.VITE_OPEN_WEATHER_APIKEY;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
      )
      .then((response) => {
        setWeatherData(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [lat, lon]);

  const getTemperatureAsCelcius = (data) => {
    if (data === null) {
      return ``;
    } else {
      return `${Math.round(data.main.temp - 273.15)} °C`;
    }
  };

  const getTemperatureFeelsAsCelcius = (data) => {
    if (data === null) {
      return ``;
    } else {
      return `${Math.round(data.main.feels_like - 273.15)} °C`;
    }
  };

  const getWeatherCondition = (data) => {
    if (data === null) {
      return ``;
    } else {
      return `${data.weather[0].main}`;
    }
  };

  return (
    <>
      <div className="weather-data">
        {weatherData !== null ? (
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather"
          />
        ) : (
          "no data"
        )}
        <div className="temperature">
          <div className="temp-big-text">
            {getTemperatureAsCelcius(weatherData)}
          </div>
          <div className="temp-small-text">
            {getWeatherCondition(weatherData)}
          </div>
          <div className="temp-small-text">
            feels like {getTemperatureFeelsAsCelcius(weatherData)}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationWeather;
