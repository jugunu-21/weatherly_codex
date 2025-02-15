const API_KEY = import.meta.env.VITE_API_KEY // Replace with your actual API key
console.log("api_key",API_KEY)
export  const fetchWeatherData = async (city:string) => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        )
        if (!response.ok) {
          throw new Error('Weather data not available')
        }
        const data = await response.json()
      return data
      } catch (error) {
        console.error('Error:', error)
        return error
      }
    }


