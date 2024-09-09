import React, { useEffect, useState } from "react";
import LocationWeather from "./LocationWeather";
import axios from "axios";

const CityWeather = ({ city }) => {
  const APIKEY = import.meta.env.VITE_OPEN_WEATHER_APIKEY;

  const [coords, setCoords] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`
      )
      .then((response) => {
        let jsonArray = JSON.parse(JSON.stringify(response.data));
        setCoords({ lat: jsonArray[0].lat, lon: jsonArray[0].lon });
      });
  }, [city]);

  return (
    <>
      {" "}
      <h2>Weather now in {city}</h2>
      <LocationWeather lat={coords.lat} lon={coords.lon} />
    </>
  );
};

export default CityWeather;
