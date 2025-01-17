import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faAt, faInfoCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md';
import { RiUserVoiceFill } from 'react-icons/ri';

const LeftSection = ({ previewPhotos, settings }) => {
  return (
    <div className="w-full md:w-[624px] h-[430px] bg-white p-8 rounded-2xl">
      <Slider {...settings}>
        {previewPhotos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo}
              alt={`Photo ${index}`}
              className="rounded-2xl object-cover w-[560px] h-[303px]"
            />
          </div>
        ))}
      </Slider>
      <h1 className="text-h4 pt-4 font-plus-jakarta font-bold text-neutral-13 text-left">Chauffeur</h1>
    </div>
  );
};

const RightSection = ({ formData, userData, showPhoneNumber, handleToggle }) => {
  const filteredLanguages = formData.languages.filter(language => language !== 'Autres');

  return (
    <div className="w-full flex flex-col items-start p-8 gap-6 bg-white rounded-2xl overflow-hidden">
      <div className="flex items-start gap-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
        <div>
          <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Ville</h4>
          <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{formData.city}</p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <RiUserVoiceFill className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
        <div>
          <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Langues</h4>
          <div className="flex gap-2 flex-wrap">
            {filteredLanguages.map((language, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm text-[#0A2A3D]">
                {language}
              </span>
            ))}
            {formData.otherLanguages && formData.otherLanguages.split(',').map((language, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm text-[#0A2A3D]">
                {language.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <MdOutlineAirlineSeatReclineNormal className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
        <div>
          <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Nombre des places</h4>
          <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{formData.vehicule.seats}</p>
        </div>
      </div>

      <hr className="border-gray-300 w-full" />

      <div className="flex">
        <div>
          <h4 className="font-plus-jakarta font-bold text-h4 text-left pb-2 text-[#0A2A3D]">Contact</h4>
          <div className="flex items-center pl-2 gap-2 font-plus-jakarta font-medium text-body-large">
            <FontAwesomeIcon icon={faAt} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
            <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{userData?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex pl-2 items-start gap-2">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="toggle"
              className="sr-only"
              checked={showPhoneNumber}
              onChange={handleToggle}
            />
            <div className={`block ${showPhoneNumber ? 'bg-secondary-6' : 'bg-primary-3'} w-12 h-6 rounded-full`}></div>
            <div className={`dot absolute ${showPhoneNumber ? 'right-1' : 'left-[3px]'} top-0.5 bg-white w-5 h-5 rounded-full transition transform duration-300`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">Afficher votre numéro de téléphone dans votre annonce</div>
        </label>
      </div>

      {showPhoneNumber && (
        <div className="flex flex-col pl-3 gap-2">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faPhone} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
            <p className="font-plus-jakarta font-bold text-base text-neutral-13">{userData?.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-5 mt-2 text-base font-bold text-neutral-13">
            <FontAwesomeIcon icon={faWhatsapp} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
            <p className="font-plus-jakarta font-bold text-base text-neutral-13">{userData?.whatsappNumber}</p>
          </div>
        </div>
      )}

      <hr className="border-gray-300 w-full" />

      <div className="flex items-start gap-2">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
        <div>
          <h4 className="font-plus-jakarta font-bold text-h4 text-[#0A2A3D]">Description</h4>
          <p className="font-plus-jakarta text-sm text-[#0A2A3D] overflow-hidden">
            {formData.description.length > 100 ? formData.description.substring(0, 100) + '...' : formData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Step7 = ({ formData, previewPhotos, setFormData, showPhoneNumber, setShowPhoneNumber }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
      });
    }
  }, []);

  const handleToggle = () => {
    setShowPhoneNumber(!showPhoneNumber);
    setFormData(prevData => ({
      ...prevData,
      showNumber: !showPhoneNumber,
    }));
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div className="mt-2">
        <ul className="slick-dots">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div
        className="custom-dot"
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#D0D6DB',
        }}
      ></div>
    ),
  };

  return (
    <div className="flex flex-col justify-between items-center mt-8 p-0 gap-4">
      <div className="flex flex-col items-center p-0 w-full">
        <h2 className="font-plus-jakarta font-bold text-2xl md:text-4xl leading-tight text-center text-[#2D3C59]">
          Vérifiez votre annonce
        </h2>
        <p className="font-plus-jakarta font-medium text-lg md:text-xl my-2 leading-6 text-center text-[#667085]">
          Voici ce que les voyageurs verront. Assurez-vous que tout est correct.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 w-full max-w-7xl rounded-md bg-inherit">
        <LeftSection previewPhotos={previewPhotos} settings={settings} />
        <RightSection
          formData={formData}
          userData={userData}
          showPhoneNumber={showPhoneNumber}
          handleToggle={handleToggle}
        />
      </div>
      <style jsx>{`
        .slick-dots li {
          margin: 0 3px;
        }
        .slick-dots li button:before {
          color: transparent;
          content: '';
        }
        .slick-dots li button {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #D0D6DB;
        }
        .slick-dots li.slick-active button {
          background: #987306; /* Change this to your secondary-6 color */
        }
      `}</style>
    </div>
  );
};

export default Step7;