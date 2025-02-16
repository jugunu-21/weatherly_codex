import React from 'react';

interface WeatherForecastProps {
  isCelsius: boolean;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ isCelsius }) => {
  return (
    <div className="mt-8 grid grid-cols-7 gap-2">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <div key={day} className="text-center">
          <p className="text-xs">{day}</p>
          <div className="my-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
          </div>
          <p className="text-sm">31°{isCelsius ? 'C' : 'F'}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;