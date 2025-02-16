const API_KEY = import.meta.env.VITE_API_KEY // Replace with your actual API key
console.log("api_key",API_KEY)
export const fetchWeatherData = async (city: string) => {
  try {
    if (!city.trim()) {
      throw new Error('Please enter a city name')
    }

    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    )

    if (!response.ok) {
      const errorData = await response.json()
      if (errorData.error.code === 1006) {
        throw new Error('City not found. Please check the spelling and try again')
      } else {
        throw new Error(errorData.error.message || 'Failed to fetch weather data')
      }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'An unexpected error occurred' }
  }
}


