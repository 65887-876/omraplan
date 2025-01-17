import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { CircleSpinner } from "react-spinners-kit";

const ALADHAN_API_BASE_URL = "https://api.aladhan.com/v1/timingsByCity";
const BIGDATACLOUD_BASE_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const HorairePriere = () => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [date, setDate] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value !== "") {
      setIsLoading(true);
      searchForLocation(inputRef.current.value);
    }
  };

  const searchForLocation = async (city) => {
    try {
      const response = await axios.get(ALADHAN_API_BASE_URL, {
        params: { city, country: city },
      });
      const data = response.data.data;
      const { day, month, weekday, year } = data.date.hijri;
      setDate({
        gregorian: data.date.readable,
        hijri: { day, month: month.number, weekday, year },
      });
      setPrayerTimes(data.timings);
      const { latitude, longitude, timezone } = data.meta;
      searchLocationName(latitude, longitude, timezone);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setIsError(true);
      toast.error("Aucun lieu trouvé avec ce nom");
    }
  };

  const searchLocationName = async (latitude, longitude, timezone) => {
    try {
      const response = await axios.get(BIGDATACLOUD_BASE_URL, {
        params: { latitude, longitude, localityLanguage: "fr" },
      });
      const { city, countryName } = response.data;
      setLocationName({ city, country: countryName, timezone });
    } catch (err) {
      console.error(err);
      if (inputRef.current) {
        setLocationName({ city: inputRef.current.value, country: "", timezone });
      }
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
    if (inputRef.current) {
      const firstLetter = inputRef.current.value[0];
      if (inputRef.current.value.length === 1) {
        if (firstLetter.match(/[A-Za-z]/)) {
          inputRef.current.classList.add("inputLTR");
        } else {
          inputRef.current.classList.remove("inputLTR");
        }
      }
    }
  };

  const hijriDate = `(${date?.hijri.year}/${date?.hijri.month}/${date?.hijri.day})`;
  const gregorianDate = date?.gregorian;

  const filteredPrayers = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
  ];

  return (
    <motion.div className="min-h-screen pt-5 px-5 sm:px-10 bg-primary-8 rounded-[16px] shadow-lg">
      <header>
        <nav>
          <ul className="flex flex-col gap-5 py-2">
            <li>
              <div className="flex flex-col items-center justify-center gap-1 font-bold p-3 border border-primary-200 shadow-lg rounded-lg max-w-xs mx-auto text-center">
                <span className="text-sm">L'Heure</span>
                <span className="text-3xl text-white">{currentTime}</span>
              </div>
            </li>
            <li>
              <form onSubmit={handleSubmit}>
                <div className="relative max-w-sm w-full mx-auto">
                  <BiSearchAlt className="w-5 h-5 fill-black absolute top-[50%] translate-y-[-50%] left-2" />
                  <input
                    ref={inputRef}
                    onChange={handleInput}
                    value={searchInput}
                    className="rounded-md ring-2 ring-primary-400 border-0 px-8 inputRTL w-full text-xl text-primary-800"
                    placeholder="Ville"
                    type="text"
                    name="search"
                  />
                </div>
              </form>
            </li>
          </ul>
        </nav>
      </header>
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircleSpinner loading={isLoading} size={40} />
        </div>
      ) : isError ? (
        <h1 className="p-3 mt-10 font-semibold text-3xl text-center">❌</h1>
      ) : (
        <main className="flex flex-col gap-5 justify-center items-center my-10">
          {locationName === null ? (
            <h1 className="p-3 font-semibold text-3xl text-center">
              Tapez le nom de la ville dans la barre de recherche
            </h1>
          ) : (
            <>
              <h1 className="py-2 px-10 rounded-full bg-primary-700 text-primary-200 text-xl mb-5">
                {locationName.city} {"," + locationName.country}
              </h1>
              <div className="flex flex-col items-center mb-10">
                <p className="text-5xl mb-3 text-white">
                  {date?.hijri.weekday.fr}
                </p>
                <p className="font-black text-5xl sm:text-6xl text-center text-white">
                  {currentTime}
                </p>
                <div className="flex gap-5 mt-3">
                  <p className="font-bold text-lg text-white">
                    {gregorianDate}
                  </p>
                  <p className="font-black text-lg text-white">{hijriDate}</p>
                </div>
              </div>
              <motion.ul
                variants={prayerListContainerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-stretch max-w-md w-full gap-3 overflow-hidden"
              >
                {prayerTimes &&
                  Object.entries(prayerTimes)
                    .filter(([prayerName]) =>
                      filteredPrayers.includes(prayerName)
                    )
                    .map(([prayerName, time]) => (
                      <motion.li
                        variants={prayerVariant}
                        key={prayerName}
                        className="flex py-3 px-5 bg-primary-3 items-center justify-between flex-1 w-full bg-primary-700 text-primary-200 rounded-md text-xl"
                      >
                        <p>{convertTime(time)}</p>
                        <p>{toFrench(prayerName)}</p>
                      </motion.li>
                    ))}
              </motion.ul>
            </>
          )}
        </main>
      )}
    </motion.div>
  );

  function toFrench(prayerName) {
    switch (prayerName) {
      case "Fajr":
        return "Fajr";
      case "Sunrise":
        return "Lever du soleil";
      case "Dhuhr":
        return "Dhuhr";
      case "Asr":
        return "Asr";
      case "Sunset":
        return "Coucher du soleil";
      case "Maghrib":
        return "Maghrib";
      case "Isha":
        return "Isha";
      default:
        return prayerName;
    }
  }

  function convertTime(time) {
    const split = time.split(":");
    const hours = Number(split[0]);
    const minutes = split[1];

    if (hours < 12) return time + " AM";
    return `${hours - 12}:${minutes} PM`;
  }
};

const prayerListContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const prayerVariant = {
  initial: { x: "100%" },
  animate: { x: "0" },
};

export default HorairePriere;
