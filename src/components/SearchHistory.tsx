import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { fetchWeatherData } from '../utils/weatherData';
import { useQueries } from '@tanstack/react-query';
const SearchHistory: React.FC = () => {
  const { recentSearches, handleCitySelect } = useWeather();
  const results = useQueries({
    queries: recentSearches.map((city) => ({
      queryKey: ['weather', city],
      queryFn: async () => {
        const result = await fetchWeatherData(city);
        if (result.success) {
          return result.data;
        }
        return null;
      },
      refetchInterval: 30000,
      refetchOnWindowFocus: true,
      retry: true
    }))
  });

  // Check if any queries are still loading
  const isLoading = results.some(result => result.isLoading);

  // Filter out loading and error states, then map to weather data
  const cityWeathers = results
    .filter(result => !result.isLoading && !result.isError && result.data !== null)
    .map(result => result.data);

  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md p-4 border-r border-white/20">
        <h2 className="text-white text-xl mb-4 font-light">Recent Searches</h2>
        <div className="flex flex-col gap-3">
          <div className="text-white opacity-60">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md p-4 border-r border-white/20">
      <h2 className="text-white text-xl mb-4 font-light">Recent Searches</h2>
      <div className="flex flex-col gap-3">
        {cityWeathers.map((weather, index) => (
          <button
            key={`${weather.location.name}-${index}`}
            onClick={() => handleCitySelect(weather.location.name)}
            className="text-left p-4 text-white hover:bg-white/20 rounded-lg transition-colors bg-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{weather.location.name}</span>
              <span className="text-lg">{Math.round(weather.current.temp_c)}°</span>
            </div>
            <div className="flex items-center text-sm text-white/80">
              <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-6 h-6 mr-2" />
              <span>{weather.current.condition.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;