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
    <div className=" flex flex-col justify-end  ">
      <div className="flex items-center justify-end mt-2">
        <img 
          src={conditionIcon} 
          alt={conditionText}
          className="w-16 h-16"
        />
        <p className="text-2xl">{conditionText}</p>
      </div>
{/*      
        <div className="flex items-center justify-end mb-2">
         
        </div> */}
        <p className="text-4xl font-light">{Math.round(temperature)}°{isCelsius ? 'C' : 'F'}</p>

    </div>
  );
};

export default WeatherInfo;