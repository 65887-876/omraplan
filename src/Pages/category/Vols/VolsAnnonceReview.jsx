import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faAt, faInfoCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { MdOutlineFlight } from 'react-icons/md';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const LeftSection = ({ previewPhotos, settings }) => (
  <div className="w-[624px] h-[519.85px] p-8 rounded-tl-2xl bg-white">
    <Slider {...settings}>
      {previewPhotos && previewPhotos.length > 0 ? (
        previewPhotos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo}
              alt={`Photo ${index}`}
              className="rounded-2xl object-cover w-full h-[303px]"
            />
          </div>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-neutral-13 font-plus-jakarta">No photos available</p>
        </div>
      )}
    </Slider>
    <h1 className="text-h4 pt-4 font-plus-jakarta font-bold text-neutral-13 text-left">Vol</h1>
  </div>
);

// RightSection component to display form data and user contact information
const RightSection = ({ formData, userData, showPhoneNumber, handleToggle }) => (
  <div className="w-full flex flex-col items-start p-8 gap-6 bg-white rounded-2xl overflow-hidden">
    {/* Compagnie Aérienne */}
    <div className="flex items-start gap-2">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
      <div>
        <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Compagnie Aérienne</h4>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{formData.compagnieAerienne}</p>
      </div>
    </div>

    {/* Itinéraire Aller */}
    <div className="flex items-start gap-2">
      <MdOutlineFlight className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
      <div>
        <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Itinéraire (Aller)</h4>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Date Aller: {formData.itineraire.aller.Aller}</p>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Date Retour: {formData.itineraire.aller.Date}</p>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Type: {formData.itineraire.aller.type}</p>
      </div>
    </div>

    {/* Itinéraire Retour */}
    <div className="flex items-start gap-2">
      <MdOutlineFlight className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
      <div>
        <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Itinéraire (Retour)</h4>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Date Aller: {formData.itineraire.retour.Aller}</p>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Date Retour: {formData.itineraire.retour.Date}</p>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Type: {formData.itineraire.retour.type}</p>
      </div>
    </div>

    {/* Prix */}
    <div className="flex items-start gap-2">
      <RiMoneyDollarCircleFill className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
      <div>
        <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Prix</h4>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Prix de Base: {formData.prixBase} €</p>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Prix Réduit: {formData.prixReduit} €</p>
        <p className="font-plus-jakarta text-sm text-[#0A2A3D]">Promotion: {formData.promotion ? 'Oui' : 'Non'}</p>
      </div>
    </div>

    <hr className="border-gray-300 w-full" />

    {/* Contact Information */}
    <div className="flex">
      <div>
        <h4 className="font-plus-jakarta font-bold text-h4 text-left pb-2 text-[#0A2A3D]">Contact</h4>
        <div className="flex items-center pl-2 gap-2 font-plus-jakarta font-medium text-body-large">
          <FontAwesomeIcon icon={faAt} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
          <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{userData?.email}</p>
        </div>
      </div>
    </div>

    {/* Toggle Phone Number */}
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

    {/* Display Phone and WhatsApp Number */}
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

    {/* Description */}
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

// Main VolsAnnonceReview component
const VolsAnnonceReview = ({ formData, previewPhotos = [], setFormData, showPhoneNumber, setShowPhoneNumber }) => {
  const [userData, setUserData] = useState(null);

  // Fetch user data
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
        className="w-[10px] h-[10px] rounded-full bg-[#D0D6DB]"
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

export default VolsAnnonceReview;