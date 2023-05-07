import React, { useState } from "react";
import axios from "axios";


function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const search = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=f796fa1e416ee3797e71a184cbda4d04`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return ( 
    <div className="w-full h-screen relative text-black">
        <img className=" w-full h-screen object-cover" src="https://img.freepik.com/free-vector/flat-monsoon-season-background-with-person-walking-umbrella_23-2149427479.jpg?size=626&ext=jpg&ga=GA1.1.1941644407.1673371467&semt=robertav1_2_sidr" alt="weather img"/>
        
          <div className=' absolute justify-center text-center top-0 pt-20 w-full h-full font-bold text-4xl  text-black'>
             <h1 className="title ">Weather App</h1> 
             </div>
      <div className="absolute justify-center text-center top-0 w-full h-full pt-40  ">
        <input
          type="text"
          className="search-bar text-black p-1 bg-transparent box-border border-black  border-b-2"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(evt) => {
            if (evt.key === "Enter") {
              search();
            }
          }}
        />
        <button className="search-button p-1 ml-2 border border-black text-center bg-black font-bold text-white rounded-md" onClick={search}>
          Search
        </button>
      </div>
      {weather && (
        <div className=' absolute justify-center text-center top-0 flex flex-col w-full h-full'>

        
        <div className="weather-box box-border border-2 border-black rounded-md   bg-transparent w-[250px] ml-[580px] mt-11 ">
          <div className="location">
            <div className="city text-xl font-bold text-black p-2 box-border border-b-2 border-black">{weather.name}, {weather.sys.country}</div>
            <div className="date text-xl font-bold text-black p-2 box-border border-b-2 border-black">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-icon p-2 box-border border-b-2 border-black flex" >
            <img className=" ml-5  " src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
            <div className="temperature text-xl font-bold text-black p-2 ml-10">{Math.round(weather.main.temp - 273.15)}°C</div>
          </div>
          <div className="weather-description text-xl font-bold text-black p-2">{weather.weather[0].description}</div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
