import './App.css'
import WeatherCard from './components/WeatherCard'
import SearchHistory from './components/SearchHistory'
import { WeatherProvider, useWeather } from './context/WeatherContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fetchWeatherData } from './utils/weatherData'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    }
  }
})
function WeatherApp() {
  const { city, setCity, setSubmittedCity, updateRecentSearches, setError, error } = useWeather();
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    if (error) setError(null); // Clear error when user starts typing
  }
  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!city.trim()) {
        setError('Please enter a city name');
        return;
      }
      const result = await fetchWeatherData(city);
      if (result.success) {
        const fullCityName = result.data.location.name;
        setCity(fullCityName);
        setSubmittedCity(fullCityName);
        updateRecentSearches(fullCityName);
        setError(null);
      } else {
        setError(result.error || 'City not found. Please check the spelling and try again.');
      }
    }
  };
  return (
    <div className='h-full w-full flex flex-col md:flex-row p-4'>
      <div className='flex-1 order-2 md:order-1 flex justify-center'>
        <SearchHistory />
      </div>
    
      <div className='flex-1 order-1 md:order-2 flex flex-col items-end gap-6 px-6 py-4 max-w-screen-2xl mx-auto min-w-0'>
        <input
          type='text'
          value={city}
          onChange={handleCityChange}
          onKeyPress={handleKeyPress}
          placeholder='Enter city name'
          className='w-80 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40'
        />
        {error && (
          <div className="w-full max-w-4xl p-4 bg-red-500/20 backdrop-blur-md rounded-lg border border-red-500/30 text-white text-center">
            <p>{error}</p>
          </div>
        )}
        <WeatherCard />
      </div>
    </div>
  )
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <div className="min-h-screen min-w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-auto">
          <WeatherApp />
        </div>
      </WeatherProvider>
    </QueryClientProvider>
  );
}
export default App



