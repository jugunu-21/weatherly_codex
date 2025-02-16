import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  submittedCity: string;
  setSubmittedCity: (city: string) => void;
  recentSearches: string[];
  updateRecentSearches: (newCity: string) => void;
  handleCitySelect: (selectedCity: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedCity = localStorage.getItem('lastCity') || 'london';
  const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  const savedUnit = localStorage.getItem('temperatureUnit') !== 'F';

  const [city, setCity] = useState<string>(savedCity);
  const [submittedCity, setSubmittedCity] = useState<string>(savedCity);
  const [recentSearches, setRecentSearches] = useState<string[]>(savedSearches.length ? savedSearches : [savedCity]);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(savedUnit);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    localStorage.setItem('lastCity', submittedCity);
  }, [submittedCity]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('temperatureUnit', isCelsius ? 'C' : 'F');
  }, [isCelsius]);

  const updateRecentSearches = useCallback((newCity: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== newCity.toLowerCase());
      return [newCity, ...filtered].slice(0, 3);
    });
  }, []);

  const handleCitySelect = useCallback((selectedCity: string) => {
    setCity(selectedCity);
    setSubmittedCity(selectedCity);
  }, []);

  const toggleTemperatureUnit = useCallback(() => {
    setIsCelsius(prev => !prev);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        submittedCity,
        setSubmittedCity,
        recentSearches,
        updateRecentSearches,
        handleCitySelect,
        error,
        setError,
        clearError,
        isCelsius,
        toggleTemperatureUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};