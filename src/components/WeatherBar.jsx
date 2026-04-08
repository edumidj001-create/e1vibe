import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Thermometer, MapPin } from 'lucide-react';
import { fetchWeather } from '../services/weatherService';

export default function WeatherBar() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather().then(setWeather).catch(console.error);
  }, []);

  if (!weather) return null;

  return (
    <div className="weather-bar glass animate-enter">
      <div className="weather-location">
        <MapPin size={18} />
        <span>Seoul / Headquarters</span>
      </div>
      <div className="weather-grid">
        <div className="weather-item">
          <Thermometer size={18} />
          <span>{weather.temp}°C</span>
        </div>
        <div className="weather-item">
          <CloudRain size={18} />
          <span>{weather.status}</span>
        </div>
        <div className="weather-item">
          <Wind size={18} />
          <span>{weather.wind}m/s</span>
        </div>
      </div>
    </div>
  );
}
