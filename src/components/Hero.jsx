import { useState, useEffect } from 'react';
import HeroPics from '../assets/Hero-pics.png';
import axios from 'axios';
import WeatherInfo from './WeatherInfo';

const WEATHER_API_KEY = 'a4b07eefcd674fa6a7f132612242012';
const EXCHANGE_API_KEY = '3dffdd961074be3f51a2453e';

const Hero = () => {
  const [selectedLocation, setSelectedLocation] = useState('Makkah, KSA');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState('');
  const [weatherIconUrl, setWeatherIconUrl] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  const getDayOfWeekInFrench = (date) => {
    const daysInFrench = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return daysInFrench[date.getDay()];
  };

  const translateWeatherConditionToFrench = (condition) => {
    const translations = {
      'Clear': 'Clair',
      'Rain': 'Pluie',
      'Snow': 'Neige',
      'Cloudy': 'Nuageux',
      'Partly Cloudy': 'Partiellement nuageux',
      'Windy': 'Venteux',
      'Fog': 'Brouillard',
      'Storm': 'Tempête',
    };
    return translations[condition] || condition;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const city = selectedLocation === 'Makkah, KSA' ? 'Makkah' : 'Madinah';
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
        );
        const currentWeather = response.data.current;
        setTemperature(Math.round(currentWeather.temp_c)); // Round to the nearest integer
        setWeatherCondition(translateWeatherConditionToFrench(currentWeather.condition.text));
        setWeatherIconUrl(`https:${currentWeather.condition.icon}`);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [selectedLocation]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/pair/EUR/SAR`
      );
      const data = await response.json();
      setExchangeRate(data.conversion_rate);
    };

    fetchExchangeRate();
  }, []);

  const handleDotClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex flex-col md:flex-row items-center sm:gap-10 justify-between py-6 px-4 md:px-20 overflow-hidden bg-gradient-to-br from-yellow-200 via-yellow-50 to-yellow-50">
      <div className="w-full pt-6 sm:pt-0 md:w-1/2 flex flex-col gap-6 md:pb-0">
        <p className="sm:font-volkhov font-plus-jakarta w-[100%] md:w-[70%] md:text-display-1 text-h2 sm:text-display-2  font-bold text-neutral-13">
          Organisez votre <span className="sm:font-bold font-extrabold text-[#987306] ">OMRA 2025</span> et partez au meilleur prix !
        </p>
        <p className="sm:text-h3 text-h6  font-plus-jakarta font-bold text-primary-7">
          Réduisez vos coûts, pas vos rêves
        </p>

        {/* Weather Info */}
        <WeatherInfo
            selectedLocation={selectedLocation}
            isDropdownOpen={isDropdownOpen}
            handleSelectLocation={handleSelectLocation}
            toggleDropdown={toggleDropdown}
            handleDotClick={handleDotClick}
            temperature={temperature}
            weatherCondition={weatherCondition}
            weatherIconUrl={weatherIconUrl}
            exchangeRate={exchangeRate}
            getDayOfWeekInFrench={getDayOfWeekInFrench}
          />
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0 hidden md:block">
        <img src={HeroPics} alt="the hero illustration" className="w-full object-cover max-h-full" />
      </div>
    </div>
  );
};

export default Hero;
