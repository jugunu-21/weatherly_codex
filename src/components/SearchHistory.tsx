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
      <div className="h-full py-4 w-72 bg-white/5 backdrop-blur-lg p-4 border-r border-white/10 shadow-lg">
        <h2 className="text-white text-xl mb-4 font-light">Recent Searches</h2>
        <div className="flex flex-col gap-3">
          <div className="text-white/70 p-4 bg-white/5 backdrop-blur-md rounded-lg">
            <div className="animate-pulse flex items-center justify-center">
              <div className="h-5 w-5 mr-3 border-t-2 border-white/40 rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-start h-full'>
      <div className="h-full rounded-3xl flex flex-col w-72 bg-white/5 backdrop-blur-lg p-4 border-r border-white/10 shadow-lg">
        <h2 className="text-white text-xl mb-4 font-light">Recent Searches</h2>
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          {cityWeathers.map((weather, index) => (
            <button
              key={`${weather.location.name}-${index}`}
              onClick={() => handleCitySelect(weather.location.name)}
              className="text-left p-4 text-white hover:bg-white/10 rounded-lg transition-all duration-300 bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md border border-white/5 hover:border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{weather.location.name}</span>
                <span className="text-lg font-light">{Math.round(weather.current.temp_c)}°</span>
              </div>
              <div className="flex items-center text-sm text-white/70">
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-6 h-6 mr-2" />
                <span>{weather.current.condition.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;