import React from 'react';

interface WeatherHeaderProps {
  cityName: string;
  localTime: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ cityName, localTime }) => {
  return (
    <div>
      <h1 className=" text-xlmd:text-4xl font-light">{cityName}</h1>
      <p className="text-sm opacity-80">{localTime}</p>
    </div>
  );
};

export default WeatherHeader;