import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FaCalendarDay, FaGlobe } from 'react-icons/fa';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles.css'; // Import the custom CSS for slider dots
import house from './house.png';
import copyIcon from './copy.png';
import linkIcon from './Link.png';

const SejourDetails = () => {
  const { id } = useParams();
  const [sejour, setSejour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSejour = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/sejour/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSejour(response.data);
      } catch (error) {
        console.error('Error fetching sejour details:', error);
        setError('Error fetching sejour details');
      } finally {
        setLoading(false);
      }
    };

    fetchSejour();
  }, [id]);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!sejour) {
    return <div>Sejour not found</div>;
  }

  const { photos, showNumber } = sejour;
  const user = sejour.userId;
  const socialLinks = user.socialLinks;
  const companyDetails = user.companyDetails;
  const isProfessional = user.isProfessional;

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <ul style={{ margin: "0px" }}> {dots} </ul>
    ),
    customPaging: i => (
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "grey"
        }}
      ></div>
    )
  };

  // Calculate the number of days between two dates
  const calculateDaysBetween = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const daysBetween = calculateDaysBetween(sejour.dateDepart, sejour.dateRetour);

  // Determine the badge text based on the sejour type
  const getBadgeText = (type) => {
    switch (type) {
      case 'Confort':
        return 'Confort';
      case 'Reco':
        return 'Reco';
      case 'Essentiel':
        return 'Essentiel';
      case 'Eco':
        return 'Eco';
      default:
        return '';
    }
  };

  const badgeText = getBadgeText(sejour.type);

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col px-4 items-center py-16 relative">
      {/* Breadcrumb Section */}
      <div className='flex justify-start md:mr-[550px] pr-28 sm:pr-10'>
        <div className="flex text-sm items-center font-plus-jakarta">
          <img className='px-1' src={house} alt="house icon" />
          <Link to="/" className="text-primary-4">Accueil</Link>
          <span className="text-primary-4 mx-2">/</span>
          <Link to="/sejours" className="text-primary-4">Séjours</Link>
          <span className="text-primary-4 mx-2">/</span>
          <span className="text-secondary-6 font-medium">{`${user.prenom} ${user.kuniya}`}</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="mb-8 w-full max-w-3xl mt-4">
        {photos.length > 1 ? (
          <Slider {...settings}>
            {photos.map((photo, index) => (
              <div key={index} className="flex justify-center">
                <img src={photo} alt={`${user.prenom} ${user.kuniya}`} className="w-full h-[303px] object-cover rounded-lg" />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center">
            <img src={photos[0]} alt={`${user.prenom} ${user.nom}`} className="w-full h-[303px] object-cover rounded-lg" />
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="w-full max-w-3xl flex flex-col items-start p-8  bg-white rounded-2xl overflow-hidden relative">
        <div className="flex flex-col sm:flex-row justify-between items-start py-2 w-full">
          <div>
            <h2 className="font-plus-jakarta font-bold text-[40px] text-neutral-13 mb-2 sm:mb-0">
              {isProfessional ? companyDetails.companyName : `${user.prenom}`}
              {badgeText && (
                <span className="inline-flex ml-2 justify-center items-center w-[85px] h-[32px] bg-white rounded-full border border-gray-300 relative" style={{ top: "-4px" }}>
                  <span className="w-[85px] h-[24px] text-center font-plus-jakarta font-bold text-[14px] leading-[24px] text-neutral-13" >
                    {badgeText}
                  </span>
                </span>
              )}
            </h2>
            <p className="font-plus-jakarta text-sm font-medium text-[#2D3C59]">
              Annonce publiée par : {user.prenom} {user.kuniya}
            </p>
          </div>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-end sm:items-center gap-2 mt-2 sm:mt-0">
            <div className="flex flex-row items-baseline gap-2">
              <p className="font-plus-jakarta font-bold text-[32px] leading-[44px] text-neutral-13">
                {sejour.prixReduit} €
              </p>
              {sejour.promotion && (
                <p className="font-plus-jakarta font-bold text-[20px] leading-[28px] text-danger-6 line-through">
                  {sejour.prixBase}€
                </p>
              )}
            </div>
            <button className="w-full sm:w-auto py-2 bg-primary-6 text-white rounded-lg border border-gray-700 shadow-sm" onClick={() => setShowModal(true)}>
              <span className="font-plus-jakarta font-bold text-[14px] leading-[24px]">
                Voir contact
              </span>
            </button>
          </div>
        </div>

        <hr className="border-gray-300 w-full my-2" />
        <div className="flex items-start gap-2 my-3">
          <FaCalendarDay className="text-primary-6 mt-1" style={{ fontSize: '1em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-black">Date</h4>
            <p className="font-plus-jakarta text-[16px] text-black font-medium">
              Du {new Date(sejour.dateDepart).toLocaleDateString()} au {new Date(sejour.dateRetour).toLocaleDateString()} ({daysBetween} Jours)
            </p>
          </div>
        </div>
        <hr className="border-gray-300 w-full" />

        <div className="flex items-start gap-2 my-3">
          <div>
            <h4 className="font-plus-jakarta font-bold text-[32px] mb-2 text-[#0A2A3D]">Service proposé</h4>
            <ul className="list-disc ml-5 pl-5">
              <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                {sejour.madinahNuits} nuits à Médina - hotel {sejour.hotelMedina.nom} {sejour.hotelMedina.distanceMasjidNabawi}m
              </li>
              <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                {sejour.makkahNuits} nuits à Makkah - hotel {sejour.hotelMakkah.nom} {sejour.hotelMakkah.distanceKaba}m
              </li>
              <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                Vol avec {sejour.compagnieAerienne}
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 w-full" />

        <div className="flex items-start gap-2 my-4">
          <div>
            <h4 className="font-plus-jakarta font-bold text-h4 text-[#0A2A3D]">Informations complémentaires</h4>
            <p className="font-plus-jakarta text-sm text-[#0A2A3D] overflow-hidden">
              {sejour.description.length > 100 ? sejour.description : sejour.description}
            </p>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white py-4 px-8 rounded-lg" style={{ width: '572px', height: '300px', borderRadius: '16px', opacity: 1 }}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-plus-jakarta font-bold text-h4 text-left text-[#0A2A3D]">Contact</h4>
                <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-[#0A2A3D]" onClick={() => setShowModal(false)} />
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faAt} className="mr-2 text-primary-6" />
                  <p className="text-sm text-[#0A2A3D] font-plus-jakarta">{user.email}</p>
                </div>
                <img src={copyIcon} alt="Copy Icon" className="cursor-pointer" onClick={() => copyToClipboard(user.email)} />
              </div>
              <hr className="border-gray-300 my-2" />
              {companyDetails && companyDetails.website && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0A2A3D] flex items-center font-plus-jakarta">
                      <FaGlobe className="mr-2" />
                      {companyDetails.website}
                    </a>
                    <img src={linkIcon} alt="Link Icon" className="cursor-pointer" />
                  </div>
                  <hr className="border-gray-300 my-2" />
                </>
              )}
              {socialLinks && socialLinks.facebook && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0A2A3D] flex items-center font-plus-jakarta">
                      <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                      Facebook
                    </a>
                    <img src={linkIcon} alt="Link Icon" className="cursor-pointer" />
                  </div>
                  <hr className="border-gray-300 my-2" />
                </>
              )}
              {showNumber && user.whatsappNumber && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-primary-6" />
                      <p className="text-sm text-[#0A2A3D] font-plus-jakarta">{user.whatsappNumber}</p>
                    </div>
                    <img src={copyIcon} alt="Copy Icon" className="cursor-pointer" onClick={() => copyToClipboard(user.whatsappNumber)} />
                  </div>
                  <hr className="border-gray-300 my-2" />
                </>
              )}
              {showNumber && user.phoneNumber && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-primary-6" />
                      <p className="text-sm text-[#0A2A3D] font-plus-jakarta">{user.phoneNumber}</p>
                    </div>
                    <img src={copyIcon} alt="Copy Icon" className="cursor-pointer" onClick={() => copyToClipboard(user.phoneNumber)} />
                  </div>
                  <hr className="border-gray-300 my-2" />
                </>
              )}
              {socialLinks && socialLinks.instagram && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0A2A3D] flex items-center font-plus-jakarta">
                      <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                      Instagram
                    </a>
                    <img src={linkIcon} alt="Link Icon" className="cursor-pointer" />
                  </div>
                  <hr className="border-gray-300 my-2" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SejourDetails;