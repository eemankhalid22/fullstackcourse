import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`https://geocoding-api.open-meteo.com/v1/search?name=${capital}`)

      .then((response) => {
        const lat = response.data.results[0].latitude;

        const lon = response.data.results[0].longitude;

        return axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        );
      })

      .then((response) => {
        setWeather(response.data.current_weather);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [capital]);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>

      <p>
        Temperature: {weather.temperature}
        °C
      </p>

      <p>
        Wind: {weather.windspeed}
        m/s
      </p>
    </div>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital[0]}</p>

      <p>Area: {country.area}</p>

      <h3>Languages</h3>

      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} width="200" />

      <Weather capital={country.capital[0]} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags",
      )

      .then((response) => {
        setCountries(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const matches = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const showCountry = (name) => {
    setSearch(name);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      find countries:
      <input value={search} onChange={handleSearchChange} />
      {search !== "" && matches.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {matches.length <= 10 &&
        matches.length > 1 &&
        matches.map((country) => (
          <div key={country.name.common}>
            {country.name.common}

            <button onClick={() => showCountry(country.name.common)}>
              show
            </button>
          </div>
        ))}
      {matches.length === 1 && <CountryDetails country={matches[0]} />}
    </div>
  );
};

export default App;
