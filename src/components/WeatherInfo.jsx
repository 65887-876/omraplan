/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const WeatherInfo = ({
  selectedLocation,
  isDropdownOpen,
  handleSelectLocation,
  toggleDropdown,
  handleDotClick,
  temperature,
  weatherCondition,
  weatherIconUrl,
  exchangeRate,
  getDayOfWeekInFrench,
}) => {
  const locations = ['Makkah, KSA', 'Madinah, KSA'];
  const [currentLocationIndex, setCurrentLocationIndex] = useState(
    locations.indexOf(selectedLocation)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 5000); // Change location every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    handleDotClick(locations[currentLocationIndex]);
  }, [currentLocationIndex]);

  return (
    <div className="p-4 w-full max-w-[400px] sm:max-w-[500px] h-auto bg-white rounded-lg shadow">
      {/* Location and Dropdown */}
      <div className="flex gap-20 items-center mb-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-lg font-medium text-gray-800"
          >
            {selectedLocation}
            <FiChevronDown className="text-gray-600" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow border rounded-md">
              {locations.map((location) => (
                <p
                  key={location}
                  onClick={() => handleSelectLocation(location)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {location}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Location Dots */}
        <div className="flex gap-2">
          {locations.map((location, index) => (
            <div
              key={location}
              onClick={() => handleDotClick(location)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                selectedLocation === location ? 'bg-yellow-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Weather Info */}
      <div className="flex justify-between items-center">
        {/* Weather Condition */}
        <div className="flex items-center">
          {weatherIconUrl && (
            <img
              src={weatherIconUrl}
              alt={weatherCondition}
              className="w-16 h-16"
            />
          )}
          <div>
            <p className="text-primary-6 font-plus">
              {temperature !== null
                ? getDayOfWeekInFrench(new Date())
                : 'Loading...'}
            </p>
            <p className="text-sm pr-6 font-bold text-gray-800 min-w-[100px]">
              {weatherCondition.split(' ')[0]}
            </p>

          </div>
        </div>

        {/* Temperature and Exchange Rate */}
        <p className="text-lg font-plus-jakarta px-2 text-[32px] sm:text-[39px] font-bold text-secondary-6">
          {temperature !== null ? `${temperature}°` : 'Loading...'}
        </p>
        <div className="bg-gray-600 mx-1 w-[1px] h-[28px]"></div>
        <div className="flex sm:mr-10 flex-col justify-between gap-2 w-[40%]">
          <p className="text-primary-5 font-plus-jakarta">Taux du jour</p>
          <p className=" pl-4 font-plus-jakarta font-bold text-primary-6 sm:text-[20px]">
            {exchangeRate ? ` 1 € = ${exchangeRate.toFixed(2)} SAR` : ' Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
