import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../utils/weatherData';
import { useWeather } from '../context/WeatherContext';
import WeatherHeader from './weather/WeatherHeader';
import WeatherInfo from './weather/WeatherInfo';
import WeatherConditions from './weather/WeatherConditions';
import WeatherForecast from './weather/WeatherForecast';

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
  const { submittedCity, setError, error, clearError, isCelsius, toggleTemperatureUnit } = useWeather();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const convertToFahrenheit = (celsius: number) => {
    return (celsius * 9/5) + 32;
  };

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

    // Initial fetch
    getWeather();

    // Set up polling interval
    const pollInterval = setInterval(getWeather, 30000); // 30 seconds

    // Cleanup function
    return () => clearInterval(pollInterval);
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

  const temperature = isCelsius ? weatherData.current.temp_c : convertToFahrenheit(weatherData.current.temp_c);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-green-800 text-white p-4 sm:p-8">
      <div className="w-full max-w-full mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <WeatherHeader
            cityName={weatherData.location.name}
            localTime={weatherData.location.localtime}
          />
          <WeatherInfo
            temperature={temperature}
            conditionText={weatherData.current.condition.text}
            conditionIcon={weatherData.current.condition.icon}
            isCelsius={isCelsius}
            onToggleUnit={toggleTemperatureUnit}
          />
        </div>
        
        <WeatherConditions windSpeed={weatherData.current.wind_kph} />
        <WeatherForecast isCelsius={isCelsius} />
      </div>
    </div>
  );
};

export default WeatherCard;