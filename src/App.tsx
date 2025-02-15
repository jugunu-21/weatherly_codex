import './App.css'
import WeatherCard from './components/WeatherCard'
import SearchHistory from './components/SearchHistory'
import { WeatherProvider, useWeather } from './context/WeatherContext'

function WeatherApp() {
  const { city, setCity, setSubmittedCity, updateRecentSearches } = useWeather();

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSubmittedCity(city)
      updateRecentSearches(city)
    }
  }

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
        <WeatherCard />
      </div>
    </>
  )
}

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  )
}

export default App
