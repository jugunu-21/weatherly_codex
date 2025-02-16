import React from 'react';

interface WeatherConditionsProps {
  windSpeed: number;
}

const WeatherConditions: React.FC<WeatherConditionsProps> = ({ windSpeed }) => {
  return (
    <div className="flex items-center space-x-2 text-sm opacity-80">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      <span>{windSpeed} km/h</span>
    </div>
  );
};

export default WeatherConditions;