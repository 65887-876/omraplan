import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

// Function to fetch exchange rate with retry logic
const fetchExchangeRate = async (retryCount = 3) => {
  const url = 'https://v6.exchangerate-api.com/v6/a3b21661ae5e6d0aa32fb73d/pair/EUR/SAR';
  try {
    const response = await fetch(url);
    if (response.status === 429) {
      if (retryCount > 0) {
        console.log('Rate limit exceeded, retrying...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        return fetchExchangeRate(retryCount - 1);
      } else {
        throw new Error('Too many requests. Please try again later.');
      }
    }
    const data = await response.json();
    return data.conversion_rate;
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    return null;
  }
};

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
  const [rate, setRate] = useState(exchangeRate);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 5000); // Change location every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    handleDotClick(locations[currentLocationIndex]);
  }, [currentLocationIndex]);

  useEffect(() => {
    const fetchRate = async () => {
      const rate = await fetchExchangeRate();
      setRate(rate);
    };

    fetchRate(); // Fetch immediately on mount
    const interval = setInterval(fetchRate, 18000000); // Fetch every 5 hours

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

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
            {rate ? ` 1 € = ${rate.toFixed(2)} SAR` : ' Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;