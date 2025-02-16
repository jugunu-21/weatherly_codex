import React from 'react';


interface WeatherInfoProps {
  temperature: number;
  conditionText: string;
  conditionIcon: string;
  isCelsius: boolean;
  onToggleUnit: () => void;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  temperature,
  conditionText,
  conditionIcon,
  isCelsius,
 
}) => {
  return (
    <div className=" flex justify-between  items-center ">
       <img 
          src={conditionIcon} 
          alt={conditionText}
          className="w-32 h-32"
        />
      <div className="flex-col items-center justify-between pr-10">
       
        <p className="text-2xl">{conditionText}</p>
    
        <p className="text-4xl font-light">{Math.round(temperature)}°{isCelsius ? 'C' : 'F'}</p>
        </div>
    </div>
  );
};

export default WeatherInfo;