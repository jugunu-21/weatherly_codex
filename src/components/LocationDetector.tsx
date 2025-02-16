import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { detectCurrentLocation } from '../utils/locationDetector';

const LocationDetector: React.FC = () => {
  const { setCity, setSubmittedCity, updateRecentSearches, setError } = useWeather();

  const handleLocationDetection = async () => {
    const result = await detectCurrentLocation();
    if (result.success && result.data) {
      setCity(result.data.city);
      setSubmittedCity(result.data.city);
      updateRecentSearches(result.data.city);
      setError(null);
    } else {
      setError(result.error || 'Failed to detect location');
    }
  };

  return (
    <button
      onClick={handleLocationDetection}
      className="px-2 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm"
    >
      <span className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Current location
      </span>
    </button>
  );
};

export default LocationDetector;