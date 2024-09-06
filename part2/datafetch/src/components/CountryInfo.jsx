import React from "react";
import { v4 as uuidv4 } from "uuid";

const CountryInfo = ({ country }) => {
  if (country === undefined) {
    return null;
  }

  // Conveniency variable
  const info = JSON.parse(country);
  // Parsing language names from JSON object
  const tempMap = new Map(Object.entries(info.languages));
  const languages = [...tempMap.values()];

  return (
    <div className="country-info">
      <h1>{info.name.common}</h1>
      <h2>{info.name.official}</h2>
      <b>Capital city: </b>
      <ul>
        {info.capital.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
      <p>
        <b>Population: </b>
        {info.population}
      </p>
      <p>
        <b>Land area: </b>
        {info.area} km²
      </p>
      <b>Official languages: </b>
      <ul>
        {languages.map((lang) => (
          <li key={uuidv4()}>{lang}</li>
        ))}
      </ul>
      <h4>Flag of {info.name.common}</h4>
      <img src={info.flags.png} alt="flag" />
      <h4>Coat of Arms of {info.name.common}</h4>
      <img src={info.coatOfArms.svg} alt="coat of arms" />
    </div>
  );
};

export default CountryInfo;
