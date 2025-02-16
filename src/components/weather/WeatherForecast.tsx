import React from 'react';

interface WeatherForecastProps {
  isCelsius: boolean;
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          icon: string;
          text: string;
        };
      };
    }>;
  };
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ isCelsius, forecast }) => {
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="mt-8 grid grid-cols-7 gap-2">
      {forecast.forecastday.map((day) => (
        <div key={day.date} className="text-center">
          <p className="text-xs">{getDayName(day.date)}</p>
          <div className="my-2">
            <img 
              src={day.day.condition.icon} 
              alt={day.day.condition.text}
              className="h-6 w-6 mx-auto"
            />
          </div>
          <p className="text-sm">
            {Math.round(isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f)}°{isCelsius ? 'C' : 'F'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;