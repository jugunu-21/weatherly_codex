import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../utils/weatherData';
import { useWeather } from '../context/WeatherContext';

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
  };
  location: {
    name: string;
    localtime: string;
  };
}

const WeatherCard: React.FC = () => {
  const { submittedCity, setError, error, clearError } = useWeather();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      if (!submittedCity) {
        setError('Please enter a city name');
        setWeatherData(null);
        setLoading(false);
        return;
      }

      clearError();
      setLoading(true);
      const result = await fetchWeatherData(submittedCity);
      if (result.success) {
        setWeatherData(result.data);
        setError(null);
      } else {
        setError(result.error || 'Unable to fetch weather data. Please try again.');
        setWeatherData(null);
      }
      setLoading(false);
    };
    getWeather();
  }, [submittedCity, clearError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-green-800 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-green-800 text-white flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-md p-4 rounded-lg border border-red-500/30 text-center">
          <p className="text-lg">{error}</p>
          {/* <button
            onClick={clearError}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
          >
            Try Again
          </button> */}
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-green-800 text-white flex items-center justify-center">
        <div className="text-xl">No weather data available</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-green-800 text-white p-4 sm:p-8">
      <div className="w-full max-w-full mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-light">{weatherData.location.name}</h1>
            <p className="text-sm opacity-80">{weatherData.location.localtime}</p>
          </div>
          <div className="text-right">
            <p className="text-6xl font-light">{Math.round(weatherData.current.temp_c)}°</p>
            <div className="flex items-center justify-end mt-2">
              <img 
                src={weatherData.current.condition.icon} 
                alt={weatherData.current.condition.text}
                className="w-8 h-8"
              />
              <p className="ml-2 text-sm">{weatherData.current.condition.text}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span>{weatherData.current.wind_kph} km/h</span>
        </div>

        <div className="mt-8 grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center">
              <p className="text-xs">{day}</p>
              <div className="my-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <p className="text-sm">31°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;