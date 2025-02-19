import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick"; // For mobile swiper
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft, FaSuitcase, FaPlane, FaHotel, FaMapMarkedAlt, FaCar, FaBabyCarriage } from "react-icons/fa";
import BabySitterCard from './annonce/BabySitter/BabySitterCard';
import ChauffeurCard from './annonce/Chauffeur/ChauffeurCard';
import GuideCard from './annonce/Guide/GuideCard';
import HebergementCard from './annonce/Hebergement/HebergementCard';
import SejourCard from './annonce/Sejour/SejourCard';
import VolsCard from './annonce/Vols/VolsCard';
import './TousAnnonce.css'; // Import the custom CSS for responsive margin

const TousAnnonce = () => {
  const [sejours, setSejours] = useState([]);
  const [vols, setVols] = useState([]);
  const [hebergements, setHebergements] = useState([]);
  const [guides, setGuides] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [babysitters, setBabysitters] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Active category filter
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
    { name: "sejours", icon: <FaSuitcase /> },
    { name: "vols", icon: <FaPlane /> },
    { name: "hebergement", icon: <FaHotel /> },
    { name: "guide", icon: <FaMapMarkedAlt /> },
    { name: "chauffeur", icon: <FaCar /> },
    { name: "babysitter", icon: <FaBabyCarriage /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sejourResponse = await axios.get('http://localhost:5000/api/auth/sejours');
        const volResponse = await axios.get('http://localhost:5000/api/auth/vols');
        const hebergementResponse = await axios.get('http://localhost:5000/api/auth/hebergements');
        const guideResponse = await axios.get('http://localhost:5000/api/auth/guides');
        const chauffeurResponse = await axios.get('http://localhost:5000/api/auth/chauffeurs');
        const babysitterResponse = await axios.get('http://localhost:5000/api/auth/babysitters');

        setSejours(sejourResponse.data);
        setVols(volResponse.data);
        setHebergements(hebergementResponse.data);
        setGuides(guideResponse.data);
        setChauffeurs(chauffeurResponse.data);
        setBabysitters(babysitterResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tousAnnonces = {
    sejours,
    vols,
    hebergement: hebergements,
    guide: guides,
    chauffeur: chauffeurs,
    babysitter: babysitters,
  };

  const availableCategories = categoriesWithIcons.filter(({ name }) => tousAnnonces[name]?.length > 0);

  useEffect(() => {
    if (availableCategories.length > 0 && activeCategory === null) {
      setActiveCategory(availableCategories[0].name); // Automatically set the first button active only if no category is selected
    }
  }, [availableCategories, activeCategory]);

  useEffect(() => {
    setCurrentIndex(0); // Reset to first card
  }, [activeCategory]);

  const filteredAnnonces = activeCategory
    ? tousAnnonces[activeCategory]
    : categoriesWithIcons.reduce((all, { name }) => [...all, ...tousAnnonces[name]], []);

  const handleNext = () => {
    if (currentIndex + 4 < filteredAnnonces.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="relative tous-annonce-container py-8 bg-yellow-50 md:px-20 overflow-visible">
      {/* Title and Subtitle */}
      <p className="text-left text-h2 w-[95%] sm:w-full sm:text-h1 font-plus-jakarta font-bold sm:pl-0 pl-4 text-primary-6">Tout ce dont vous avez besoin en un seul endroit</p>
      <p className="text-left font-plus-jakarta font-normal sm:pl-0 pl-4 text-[#667085]">Un seul lieu, toutes les solutions</p>

      {/* Mobile Category Filter with Swiping */}
      <div className="md:hidden mt-4 overflow-x-auto whitespace-nowrap relative pl-4 py-2 bg-yellow-50">
        <div className="flex space-x-4">
          {availableCategories.map(({ name, icon }) => (
            <button
              key={name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-plus-jakarta h-[49px] font-bold ${
                activeCategory === name
                  ? "bg-[#987306] text-white shadow-md"
                  : "bg-white border border-solid border-primary-6 text-gray-700"
              } transition duration-300 ease-in-out transform hover:scale-105 `}
              onClick={() => setActiveCategory(name === activeCategory ? null : name)}
            >
              <span>{icon}</span>
              <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Category Filter */}
      <div className="hidden md:flex mt-4 justify-start space-x-4">
        {availableCategories.map(({ name, icon }) => (
          <button
            key={name}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-plus-jakarta h-[40px] font-bold ${
              activeCategory === name
                ? "bg-[#987306] text-white shadow-md"
                : "bg-white border border-solid border-primary-6 text-gray-700"
            } transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={() => setActiveCategory(name === activeCategory ? null : name)}
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
          className={`rounded-full p-3 ${currentIndex + 4 < filteredAnnonces.length ? 'bg-primary-6' : 'bg-white'}`}
          onClick={handleNext}
          disabled={currentIndex + 4 >= filteredAnnonces.length}
        >
          <FaChevronRight className={`h-3 w-3 ${currentIndex + 4 < filteredAnnonces.length ? 'text-white' : 'text-primary-6'}`} />
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 mt-8">
        {filteredAnnonces.slice(currentIndex, currentIndex + 4).length > 0 ? (
          filteredAnnonces.slice(currentIndex, currentIndex + 4).map((item) => {
            const category = categoriesWithIcons.find(({ name }) =>
              tousAnnonces[name]?.includes(item)
            )?.name;
            return (
              <div key={item.id} className="desktop-card-wrapper">
                {category === 'sejours' && <SejourCard sejour={item} />}
                {category === 'vols' && <VolsCard vol={item} />}
                {category === 'hebergement' && <HebergementCard hebergement={item} />}
                {category === 'guide' && <GuideCard guide={item} />}
                {category === 'chauffeur' && <ChauffeurCard chauffeur={item} />}
                {category === 'babysitter' && <BabySitterCard babysitter={item} />}
              </div>
            );
          })
        ) : (
          <p className="col-span-4 text-center text-gray-500">Aucune annonce en cours.</p>
        )}
      </div>

      {/* Mobile Slider for Cards */}
      <div className="md:hidden sm:pl-0 pl-4 mt-8 relative">
        <Slider {...sliderSettings}>
          {filteredAnnonces.length > 0 ? (
            filteredAnnonces.map((item) => {
              const category = categoriesWithIcons.find(({ name }) =>
                tousAnnonces[name]?.includes(item)
              )?.name;
              return (
                <div key={item.id} className="mobile-card-wrapper">
                  {category === 'sejours' && <SejourCard sejour={item} />}
                  {category === 'vols' && <VolsCard vol={item} />}
                  {category === 'hebergement' && <HebergementCard hebergement={item} />}
                  {category === 'guide' && <GuideCard guide={item} />}
                  {category === 'chauffeur' && <ChauffeurCard chauffeur={item} />}
                  {category === 'babysitter' && <BabySitterCard babysitter={item} />}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">Aucune annonce en cours.</p>
          )}
        </Slider>
      </div>

      <div className="px-4">
        <button className="text-secondary-7 w-full font-plus-jakarta font-bold sm:w-[230px] h-[50px] bg-neutral-1 rounded-xl mt-8 mx-auto border border-secondary-7 hover:bg-secondary-4 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <a className="flex justify-center gap-2 items-center">
            <span>Voir toutes les annonces</span>
            <FaChevronRight className="mt-[1px]" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default TousAnnonce;