import './App.css'
import WeatherCard from './components/WeatherCard'
import { useState } from 'react'

function App() {
  const [city, setCity] = useState<string>('london')
  const [submittedCity, setSubmittedCity] = useState<string>('london')

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSubmittedCity(city)
    }
  }

  return (
    <>
      <div className='w-full flex flex-col items-center gap-4 p-4'>
        <input
          type='text'
          value={city}
          onChange={handleCityChange}
          onKeyPress={handleKeyPress}
          placeholder='Enter city name'
          className='w-full max-w-md px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40'
        />
        <WeatherCard city={submittedCity}/>
      </div>
    </>
  )
}

export default App
