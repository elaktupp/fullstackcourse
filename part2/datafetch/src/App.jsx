import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CountryList from "./components/CountryList";

const App = () => {
  const [value, setValue] = useState("");
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log("effect run, currency is now", currency);

    // skip if currency is not defined
    if (currency) {
      console.log("fetching exchange rates...");
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((response) => {
          setRates(response.data.rates);
        });
    } else {
      // If currency is empty, clear rates list
      setRates({});
    }
  }, [currency]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCurrency(value);
  };

  // COUNTRY PART

  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch ALL DATA - since amount of it is reasonably small.
  useEffect(() => {
    console.log("effect run, get all countries");
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        let allCountries = [];
        response.data.forEach((c) => {
          allCountries.push(JSON.parse(JSON.stringify(c)));
        });
        setAllCountries(allCountries);
      });
  }, []);

  // Search ALL READY FETCHED DATA - to prevent excessive network traffic
  // i.e. reqest/response on every change to the find input field.
  useEffect(() => {
    console.log("effect run, filter all countries with", search);
    let matchingCountries = allCountries.filter((c) => {
      // console.log(c.name.common, search, c.name.common.includes(search));
      let lowerName = c.name.common.toLowerCase();
      let lowerSearch = search.toLowerCase();
      return lowerName.includes(lowerSearch);
    });
    setCountries(matchingCountries);
  }, [search]);

  const handleCountryChange = (event) => {
    setSearch(event.target.value);
  };

  // Check and reminder if returning to this code later.
  if (!import.meta.env.VITE_OPEN_WEATHER_APIKEY) {
    return <h1>VITE_OPEN_WEATHER_APIKEY environment variable not defined!</h1>;
  }

  return (
    <div>
      <h3>Currency</h3>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre className="currency-list">{JSON.stringify(rates, null, 2)}</pre>
      <hr />
      <h3>Country</h3>
      <form>
        find countries: <input value={search} onChange={handleCountryChange} />
      </form>
      <CountryList countries={countries} />
    </div>
  ); // <CountryList countries={countries} />
};

export default App;
