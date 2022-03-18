import React from "react";
import cities from "../lib/city.list.json";
import Router from "next/router";
import { useState, useEffect } from "react";

export default function SearchBox({
  placeholder,
  handleChange,
  handleSelectCity,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hideDropdown, setHideDropDown] = useState(true);


  const handleWeather = (city) => {
    setTimeout(() => {
      setQuery('');
    }, 2);
    handleSelectCity(city);
    setTimeout(() => {
      setHideDropDown(false);
    }, 2);
  };
  //taking input city name and shows suggestions accoring to city name
  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setTimeout(() => {
      setHideDropDown(true);
    }, 2);
    let matchingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
          handleChange(matchingCities);
          continue;
        }
      }
    }

    return setResults(matchingCities);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
      />

      {query.length > 3 && hideDropdown && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => {
              return (
                <>
                  <li key={city.slug}>
                    <a onClick={() => handleWeather(city)}>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}{" "}
                      <span>({city.country})</span>
                    </a>
                  </li>
                </>
              );
            })
          ) : (
            <li className="search__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
