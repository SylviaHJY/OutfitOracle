// WeatherForecast.js
import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import Grid from '@mui/material/Grid';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=new%20york&timesteps=1d&apikey=${weatherApiKey}`);
        const data = await response.json();
        if (data && data.timelines && data.timelines.daily) {
          setWeatherData(data.timelines.daily); 
        } else {
          console.log("Weather data not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Grid container spacing={2}>
      {weatherData.map((day, index) => (
       <Grid item key={index} xs={2} sm={2} md={2} lg={2}>
        <WeatherCard dayWeather={day} />
       </Grid>
      ))}
    </Grid>
  );
};

export default WeatherForecast;
