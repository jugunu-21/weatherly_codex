import { useQuery } from '@tanstack/react-query';

import { useWeather } from '../context/WeatherContext';
import WeatherHeader from './weather/WeatherHeader';
import WeatherInfo from './weather/WeatherInfo';
import WeatherConditions from './weather/WeatherConditions';
import WeatherForecast from './weather/WeatherForecast';
import { fetchWeatherData } from '../utils/weatherData';
// type data = {
//   current: {
//     temp_c: number;
//     condition: {
//       text: string;
//       icon: string;
//     };
//     wind_kph: number;
//   };
//   location: {
//     name: string;
//     localtime: string;
//   };
// }

const WeatherCard: React.FC = () => {
  const { submittedCity, setError, error, clearError, isCelsius, toggleTemperatureUnit } = useWeather();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weather', submittedCity],
    queryFn: async () => {
      if (!submittedCity) return null;
      clearError();
      try {
        const result = await fetchWeatherData(submittedCity);
      
        if (result.success) {
          setError(null);
          // Ensure we have all required data fields
          if (!result.data || !result.data.current || !result.data.location) {
            throw new Error('Invalid data structure received from API');
          }
          // Return the raw API response
          return result.data;
        } else {
          const errorMessage = result.error || 'Unable to fetch weather data';
          setError(errorMessage + '. Please try again.');
          throw new Error(errorMessage);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
        setError(errorMessage + '. Please try again.');
        throw error;
      }
    },
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    retry: true
  });

  const convertToFahrenheit = (celsius: number) => {
    return (celsius * 9/5) + 32;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg flex items-center justify-center">
          <div className="animate-pulse flex items-center">
            <div className="h-6 w-6 mr-3 border-t-2 border-white rounded-full animate-spin"></div>
            <div className="text-xl">Loading weather data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || isError) {
    return (
      <div className="w-full max-w-4xl mx-auto text-white">
        <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg text-center">
          <p className="text-lg mb-2">{error || 'Failed to load weather data'}</p>
          {/* <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Try Again
          </button> */}
        </div>
      </div>
    );
  }
console.log("data",data)
  if (!data || !data.current) {
    if (!submittedCity) {
      return (
        <div className="w-full max-w-4xl mx-auto text-white">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg text-center">
            <p className="text-lg">Please enter a city name to see weather information</p>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full max-w-4xl mx-auto text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg text-center">
          <p className="text-lg">No weather data available. Please try again.</p>
        </div>
      </div>
    );
  }

  const temperature = isCelsius ? data.current.temp_c : convertToFahrenheit(data.current.temp_c);

  return (
    <div className="w-full max-w-4xl mx-auto text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <WeatherHeader
            cityName={data.location.name}
            localTime={data.location.localtime}
          />
          <WeatherInfo
            temperature={temperature}
            conditionText={data.current.condition.text}
            conditionIcon={data.current.condition.icon}
            isCelsius={isCelsius}
            onToggleUnit={toggleTemperatureUnit}
          />
        </div>
        
        <WeatherConditions windSpeed={data.current.wind_kph} />
        <WeatherForecast isCelsius={isCelsius} forecast={data.forecast} />
      </div>
    </div>
  );
};

export default WeatherCard;