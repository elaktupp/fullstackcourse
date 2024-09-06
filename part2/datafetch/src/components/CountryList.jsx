import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CountryInfo from "./CountryInfo";

const CountryList = ({ countries }) => {
  if (countries.length === 0) {
    return <div className="search-result">No matches found.</div>;
  } else if (countries.length > 10) {
    return (
      <div className="search-result">
        Too many matches, please refine your search.
      </div>
    );
  } else if (countries.length > 1) {
    return (
      <>
        <div key={uuidv4()} className="country-list">
          {countries.map((c) => (
            <div key={uuidv4()}>{JSON.stringify(c.name.common)}</div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div key={uuidv4()} className="country-list">
          {countries.map((c) => (
            <CountryInfo key={uuidv4()} country={JSON.stringify(c)} />
          ))}
        </div>
      </>
    );
  }
};

export default CountryList;
