import React from 'react';

interface WeatherConditionsProps {
  windSpeed: number;
  humidity?: number;
  aqi?: number;
}

const WeatherConditions: React.FC<WeatherConditionsProps> = ({ windSpeed, humidity, aqi }) => {
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    if (aqi <= 200) return 'text-red-500';
    if (aqi <= 300) return 'text-purple-500';
    return 'text-rose-700';
  };

  const getAqiText = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
        <div className="flex items-center space-x-2 mb-1 text-xs uppercase tracking-wider opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span>Wind Speed</span>
        </div>
        <div className="text-3xl font-light mb-1">{windSpeed} km/h</div>
        <div className="text-xs opacity-70">Light breeze</div>
      </div>

      {humidity && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-1 text-xs uppercase tracking-wider opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4m16 0l-8 4-8-4m16 4l-8 4-8-4M4 11l8 4 8-4" />
            </svg>
            <span>Humidity</span>
          </div>
          <div className="text-3xl font-light mb-1">{humidity}%</div>
          <div className="text-xs opacity-70">{humidity > 60 ? 'High' : humidity > 30 ? 'Normal' : 'Low'} humidity</div>
        </div>
      )}

      {aqi && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-1 text-xs uppercase tracking-wider opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Air Quality</span>
          </div>
          <div className={`text-3xl font-light mb-1 ${getAqiColor(aqi)}`}>AQI {aqi}</div>
          <div className="text-xs opacity-70">{getAqiText(aqi)}</div>
        </div>
      )}
    </div>
  );
};

export default WeatherConditions;