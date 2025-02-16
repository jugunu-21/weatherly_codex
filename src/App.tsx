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
    <>
      <SearchHistory />
      <div className='w-full flex flex-col items-center gap-4 p-4 ml-64'>
        <input
          type='text'
          value={city}
          onChange={handleCityChange}
          onKeyPress={handleKeyPress}
          placeholder='Enter city name'
          className='w-full max-w-md px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40'
        />
        {error && (
          <div className="w-full max-w-md p-4 bg-red-500/20 backdrop-blur-md rounded-lg border border-red-500/30 text-white text-center">
            <p>{error}</p>
          </div>
        )}
        <WeatherCard />
      </div>
    </>
  )
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
      <WeatherApp />
      </WeatherProvider>
    </QueryClientProvider>
  )
}
export default App



