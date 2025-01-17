import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick"; // For mobile swiper
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft, FaSuitcase, FaPlane, FaHotel } from "react-icons/fa";
import HebergementCard from './annonce/Hebergement/HebergementCard';
import SejourCard from './annonce/Sejour/SejourCard';
import VolsCard from './annonce/Vols/VolsCard';
import frame from '../assets/frame.png';
import './VenteFlash.css'; // Import the custom CSS for responsive margin

const VenteFlash = () => {
  const [hebergements, setHebergements] = useState([]);
  const [sejours, setSejours] = useState([]);
  const [vols, setVols] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Sejours');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track visible items for desktop

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    swipeToSlide: true,
  };

  const categoriesWithIcons = [
    { name: "Sejours", icon: <FaSuitcase /> },
    { name: "Vols", icon: <FaPlane /> },
    { name: "Hebergements", icon: <FaHotel /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hebergementResponse = await axios.get('http://localhost:5000/api/auth/hebergements');
        const sejourResponse = await axios.get('http://localhost:5000/api/auth/sejours');
        const volResponse = await axios.get('http://localhost:5000/api/auth/vols');

        setHebergements(hebergementResponse.data.filter(item => item.venteFlash));
        setSejours(sejourResponse.data.filter(item => item.venteFlash));
        setVols(volResponse.data.filter(item => item.venteFlash));
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    switch (activeCategory) {
      case 'Sejours':
        setFilteredData(sejours);
        break;
      case 'Vols':
        setFilteredData(vols);
        break;
      case 'Hebergements':
        setFilteredData(hebergements);
        break;
      default:
        setFilteredData([]);
    }
  }, [activeCategory, hebergements, sejours, vols]);

  useEffect(() => {
    setCurrentIndex(0); // Reset to first card
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleNext = () => {
    if (currentIndex + 4 < filteredData.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const getLinkForCategory = () => {
    switch (activeCategory) {
      case 'Sejours':
        return '/sejours';
      case 'Vols':
        return '/vols';
      case 'Hebergements':
        return '/hebergement';
      default:
        return '#';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative vente-flash-container py-8 bg-yellow-50 md:px-20 overflow-visible">
      {/* Title and Subtitle */}
      <p className="text-left text-h1 font-plus-jakarta font-bold sm:pl-0 pl-4 text-primary-9">Ventes Flash</p>
      <p className="text-left font-plus-jakarta font-normal sm:pl-0 pl-4 text-[#667085]">Offres spéciales à durée limitée</p>

      {/* Mobile Category Filter with Swiping */}
      <div className="md:hidden mt-4 overflow-x-auto whitespace-nowrap relative pl-4 py-2 bg-yellow-50">
        <div className="flex space-x-4">
          {categoriesWithIcons.map(({ name, icon }) => (
            <button
              key={name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-plus-jakarta h-[49px] font-bold ${
                activeCategory === name
                  ? "bg-[#987306] text-white shadow-md"
                  : "bg-white border border-solid border-primary-6 text-gray-700"
              } transition duration-300 ease-in-out transform hover:scale-105`}
              onClick={() => setActiveCategory(name)}
            >
              <span>{icon}</span>
              <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Category Filter */}
      <div className="hidden md:flex mt-4 justify-start space-x-4">
        {categoriesWithIcons.map(({ name, icon }) => (
          <button
            key={name}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-plus-jakarta h-[40px] font-bold ${
              activeCategory === name
                ? "bg-[#987306] text-white shadow-md"
                : "bg-white border border-solid border-primary-6 text-gray-700"
            } transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={() => setActiveCategory(name)}
          >
            <span>{icon}</span>
            <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Chevron Buttons */}
      <div className="hidden relative md:flex justify-end items-center mt-4 space-x-4 mr-16 z-10">
        <button
          className={`rounded-full p-3 ${currentIndex > 0 ? 'bg-primary-6' : 'bg-white'}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft className={`h-3 w-3 ${currentIndex > 0 ? 'text-white' : 'text-primary-6'}`} />
        </button>
        <button
          className={`rounded-full p-3 ${currentIndex + 4 < filteredData.length ? 'bg-primary-6' : 'bg-white'}`}
          onClick={handleNext}
          disabled={currentIndex + 4 >= filteredData.length}
        >
          <FaChevronRight className={`h-3 w-3 ${currentIndex + 4 < filteredData.length ? 'text-white' : 'text-primary-6'}`} />
        </button>
      </div>

      <div className="absolute top-6 right-0 z-0 hidden md:block">
        <img src={frame} alt="" className="w-1/2 md:w-auto" />
      </div>

      <div className="absolute top-[30%] right-0 sm:hidden">
        <img src={frame} alt="" />
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 mt-8">
        {filteredData.slice(currentIndex, currentIndex + 4).length > 0 ? (
          filteredData.slice(currentIndex, currentIndex + 4).map((item) => {
            if (activeCategory === 'Sejours') {
              return <SejourCard key={item._id} sejour={item} />;
            } else if (activeCategory === 'Vols') {
              return <VolsCard key={item._id} vol={item} />;
            } else if (activeCategory === 'Hebergements') {
              return <HebergementCard key={item._id} hebergement={item} />;
            }
            return null;
          })
        ) : (
          <p className="col-span-4 text-center text-gray-500">Aucune vente flash en cours.</p>
        )}
      </div>

      {/* Mobile Slider for Cards */}
      <div className="md:hidden sm:pl-0 pl-4 mt-8 relative">
        <Slider {...sliderSettings}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item._id} className="mobile-card-wrapper">
                {activeCategory === 'Sejours' && <SejourCard sejour={item} />}
                {activeCategory === 'Vols' && <VolsCard vol={item} />}
                {activeCategory === 'Hebergements' && <HebergementCard hebergement={item} />}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucune vente flash en cours.</p>
          )}
        </Slider>
      </div>

      <div className="px-4">
        <button className="text-secondary-7 w-full font-plus-jakarta font-bold sm:w-[230px] h-[50px] bg-neutral-1 rounded-xl mt-8 mx-auto border border-secondary-7 hover:bg-secondary-4 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <a href={getLinkForCategory()} className="flex justify-center gap-2 items-center">
            <span>Voir toutes les ventes</span>
            <FaChevronRight className="mt-[1px]" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default VenteFlash;