import { fetchWeatherData } from './weatherData';

interface LocationDetectionResult {
  success: boolean;
  data?: {
    city: string;
    weatherData?: any;
  };
  error?: string;
}

export const detectCurrentLocation = async (): Promise<LocationDetectionResult> => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  try {
    if (!API_KEY) {
      return {
        success: false,
        error: 'Weather API key is not configured. Please check your environment variables.'
      };
    }

    const response = await fetch(`https://api.weatherapi.com/v1/ip.json?key=${API_KEY}&q=auto:ip`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.status === 403) {
      return {
        success: false,
        error: 'API key is invalid or IP lookup is not enabled for your API key'
      };
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.error) {
      return {
        success: false,
        error: 'Could not detect location: ' + data.error.message
      };
    }
    
    if (data.city) {
      const weatherResult = await fetchWeatherData(data.city);
      if (weatherResult.success) {
        return {
          success: true,
          data: {
            city: weatherResult.data.location.name,
            weatherData: weatherResult.data
          }
        };
      } else {
        return {
          success: false,
          error: weatherResult.error || 'Could not fetch weather data for detected location'
        };
      }
    }
    
    return {
      success: false,
      error: 'Could not detect location'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to detect location';
    return {
      success: false,
      error: errorMessage
    };
  }
};