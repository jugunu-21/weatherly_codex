import React, { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { fetchWeatherData } from '../utils/weatherData';

interface CityWeather {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

const SearchHistory: React.FC = () => {
  const { recentSearches, handleCitySelect } = useWeather();
  const [cityWeathers, setCityWeathers] = useState<CityWeather[]>([]);

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const weatherPromises = recentSearches.map(async (city) => {
        const data = await fetchWeatherData(city);
        return {
          city,
          temp: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          icon: data.current.condition.icon
        };
      });
      const weathers = await Promise.all(weatherPromises);
      setCityWeathers(weathers);
    };

    fetchCitiesWeather();
  }, [recentSearches]);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md p-4 border-r border-white/20">
      <h2 className="text-white text-xl mb-4 font-light">Recent Searches</h2>
      <div className="flex flex-col gap-3">
        {cityWeathers.map((weather, index) => (
          <button
            key={`${weather.city}-${index}`}
            onClick={() => handleCitySelect(weather.city)}
            className="text-left p-4 text-white hover:bg-white/20 rounded-lg transition-colors bg-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{weather.city}</span>
              <span className="text-lg">{weather.temp}°</span>
            </div>
            <div className="flex items-center text-sm text-white/80">
              <img src={weather.icon} alt={weather.condition} className="w-6 h-6 mr-2" />
              <span>{weather.condition}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;