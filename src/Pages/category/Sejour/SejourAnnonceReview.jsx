import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faAt, faInfoCircle, faPhone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const SejourAnnonceReview = ({ formData, previewPhotos, setFormData }) => {
  const [userData, setUserData] = useState(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(formData.shownumber);

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
      shownumber: !showPhoneNumber,
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

  const LeftSection = ({ previewPhotos, settings, formData }) => {
    const photos = Array.isArray(previewPhotos) ? previewPhotos : [];

    return (
      <div className="w-full md:w-[624px] h-[519.85px] bg-white p-8 rounded-tl-2xl rounded-br-none overflow-hidden relative">
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={photo}
                alt={`Photo ${index}`}
                className="rounded-2xl object-cover w-full h-[303px]"
              />
            </div>
          ))}
        </Slider>
        <h1 className="text-h4 pt-4 font-plus-jakarta font-bold text-neutral-13 text-left">
          {formData.typeAnnonce === 'Offre' ? formData.hotelName || 'Nom de l\'hébergement' : formData.hotelName || 'Nom de l\'appartement'}
        </h1>
        <div className="absolute bottom-8 right-8 text-right">
          {formData.typeAnnonce === 'Offre' ? (
            <>
              <p className="text-body-medium font-plus-jakarta text-neutral-13">{formData.distance || 'N/A'} metres</p>
              <div className="self-stretch flex flex-col justify-end items-end mt-2" style={{ height: '44px' }}>
                <p className="text-[24px] font-plus-jakarta font-bold text-red-500">
                  {formData.prixReduit} €
                </p>
                <p className="text-[16px] font-plus-jakarta font-semibold pb-[2px] text-danger-6 line-through">
                  {formData.prixBase} €
                </p>
              </div>
            </>
          ) : (
            <div className="self-stretch flex flex-col justify-end items-end mt-2" style={{ height: '44px' }}>
              <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
                {formData.prixBase} €
              </p>
              {formData.negociable && (
                <p className="text-body-medium font-plus-jakarta text-neutral-13">
                  Négociable
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const RightSection = ({ formData, userData, showPhoneNumber, handleToggle }) => {
    const formatDate = (dateStr) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    const formatDay = (dateStr) => {
      const options = { day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    const calculateDays = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
      <div className="w-full md:w-[624px] flex flex-col items-start p-8 gap-6 bg-white rounded-2xl overflow-hidden">
        {/* Date and Duration Section */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-6" style={{ fontSize: '1.5em' }} />
          <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Date</h4>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-plus-jakarta text-sm text-[#0A2A3D]">
            Du {formatDay(formData.dateDepart)} au {formatDate(formData.dateRetour)} ({calculateDays(formData.dateDepart, formData.dateRetour)} jours)
          </p>
        </div>
        <hr className="border-gray-300 w-full" />

        {/* Details Section */}
        <h4 className="font-plus-jakarta font-bold text-xl text-[#0A2A3D]">Détails du séjour</h4>
        <ul className="list-disc list-inside">
          <li className="font-plus-jakarta text-sm text-[#0A2A3D]">
            {formData.madinahNuits} nuits à Médina - hotel {formData.hotelMedina.nom} {formData.hotelMedina.distanceMasjidNabawi}m
          </li>
          <li className="font-plus-jakarta text-sm text-[#0A2A3D]">
            {formData.makkahNuits} nuits à Makkah - hotel {formData.hotelMakkah.nom} {formData.hotelMakkah.distanceKaba}m
          </li>
          <li className="font-plus-jakarta text-sm text-[#0A2A3D]">
            Vol avec {formData.compagnieAerienne}
          </li>
        </ul>
        <hr className="border-gray-300 w-full" />

        {/* Contact Section */}
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

        {/* Description Section */}
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
        <LeftSection previewPhotos={previewPhotos} settings={settings} formData={formData} />
        <RightSection
          formData={formData}
          userData={userData}
          showPhoneNumber={showPhoneNumber}
          handleToggle={handleToggle}
        />
      </div>
      <style>{`
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

export default SejourAnnonceReview;