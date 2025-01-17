import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhone, faTimes, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FaCalendarDay, FaGlobe, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import house from './house.png';
import copyIcon from './copy.png';
import linkIcon from './Link.png';
import playcircle from './Play circle.png'; // Ensure you have the playcircle image

const HebergementDetails = () => {
  const { id } = useParams();
  const [hebergement, setHebergement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchHebergement = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/hebergement/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Fetched hebergement:', response.data);
        setHebergement(response.data);
      } catch (error) {
        console.error('Error fetching hebergement details:', error);
        setError('Error fetching hebergement details');
      } finally {
        setLoading(false);
      }
    };

    fetchHebergement();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const handleBeforeChange = () => {
    if (isVideoPlaying) {
      setIsVideoPlaying(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!hebergement) {
    return <div>Hebergement not found</div>;
  }

  const {
    photos,
    videoUrl,
    showNumber,
    informations,
    disponibilites,
    prixBase,
    prixReduit,
    promotion,
    typeAnnonce,
    negociable,
    venteFlash,
    ville,
    description,
    userId,
    type
  } = hebergement;

  const user = userId;
  const socialLinks = user.socialLinks;
  const companyDetails = user.companyDetails;
  const isProfessional = user.isProfessional;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
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

  const calculateDaysBetween = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysBetween = calculateDaysBetween(disponibilites.startDate, disponibilites.endDate);

  const renderPhotos = () => {
    if (typeAnnonce === 'Demande') {
      return (
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dyikqziqi/image/upload/v1736835184/Hebergement/ymzyasvos4qdu4wavj5l.png"
            alt="Demande"
            className="w-full h-[303px] object-cover rounded-lg"
          />
        </div>
      );
    }

    return photos.map((photo, index) => (
      <div key={index} className="flex justify-center">
        <img
          src={photo}
          alt={`${user.prenom} ${user.kuniya}`}
          className="w-full h-[303px] object-cover rounded-lg"
        />
      </div>
    ));
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col px-4 items-center py-16 relative">
      {/* Breadcrumb Section */}
      <div className='flex justify-start md:mr-[550px] pr-28 sm:pr-10'>
        <div className="flex text-sm items-center font-plus-jakarta">
          <img className='px-1' src={house} alt="house icon" />
          <Link to="/" className="text-primary-4">Accueil</Link>
          <span className="text-primary-4 mx-2">/</span>
          <Link to="/hebergements" className="text-primary-4">Hebergements</Link>
          <span className="text-primary-4 mx-2">/</span>
          <span className="text-secondary-6 font-medium">{`${user.prenom} ${user.kuniya}`}</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="mb-8 w-full max-w-3xl mt-4">
        <Slider {...settings}>
          {videoUrl && (
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${videoUrl.split('v=')[1]}/0.jpg`}
                alt="Video thumbnail"
                className="w-full h-[303px] object-cover rounded-lg"
              />
              <div
                className="absolute flex bottom-2 right-2 text-black bg-white rounded-full p-2 cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
              >
                <img src={playcircle} className="mr-2" alt="Play button" />
                Visite vidéo
              </div>
            </div>
          )}
          {renderPhotos()}
        </Slider>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <ReactPlayer
              url={videoUrl}
              playing={true}
              controls
              width="85%"
              height="85%"
            />
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
              Omra-plan
            </div>
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsVideoPlaying(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </button>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="w-full max-w-3xl flex flex-col items-start p-8 bg-white rounded-2xl overflow-hidden relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 w-full">
          <div>
            {typeAnnonce !== 'Demande' || (type !== 'Appartement' && type !== 'Hôtel') ? (
              <h2 className="font-plus-jakarta font-bold text-[40px] text-neutral-13 mb-2">
                {isProfessional ? companyDetails.companyName : `${user.prenom}`}
              </h2>
            ) : (
              <h2 className="font-plus-jakarta font-bold text-[40px] text-neutral-13 mb-2">
                {type}
              </h2>
            )}
            <p className="font-plus-jakarta text-sm font-medium text-[#2D3C59]">
              Annonce publiée par : {user.prenom} {user.kuniya}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <div className="flex flex-row items-baseline justify-center sm:justify-start gap-2 w-full sm:w-auto">
              <p className="font-plus-jakarta font-bold text-[32px] leading-[44px] text-neutral-13">
                {prixReduit} €
              </p>
              {promotion && (
                <p className="font-plus-jakarta font-bold text-[20px] leading-[28px] text-danger-6 line-through">
                  {prixBase}€
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

        {/* Ville Section */}
        <div className="flex items-start gap-2 my-3">
          <FaCity className="text-primary-6 mt-1" style={{ fontSize: '1em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-black">Ville</h4>
            <p className="font-plus-jakarta text-[16px] text-black font-medium">
              {ville}
            </p>
          </div>
        </div>
        
        {/* Distance Section */}
        {typeAnnonce !== 'Demande' && informations.distance !== undefined && (
          <div className="flex items-start gap-2 my-3">
            <FaMapMarkerAlt className="text-primary-6 mt-1" style={{ fontSize: '1em' }} />
            <div>
              <h4 className="font-plus-jakarta font-bold text-lg text-black">Distance</h4>
              <p className="font-plus-jakarta text-[16px] text-black font-medium">
                {`${informations.distance} m`}
              </p>
            </div>
          </div>
        )}
        
        {/* Date Section */}
        <div className="flex items-start gap-2 my-3">
          <FaCalendarDay className="text-primary-6 mt-1" style={{ fontSize: '1em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-black">Date</h4>
            {disponibilites && disponibilites.startDate && disponibilites.endDate ? (
              <p className="font-plus-jakarta text-[16px] text-black font-medium">
                Du {new Date(disponibilites.startDate).toLocaleDateString()} au {new Date(disponibilites.endDate).toLocaleDateString()} ({daysBetween} Jours)
              </p>
            ) : (
              <p className="font-plus-jakarta text-[16px] text-black font-medium">
                Date non disponible
              </p>
            )}
          </div>
        </div>

        <hr className="border-gray-300 w-full" />

        {/* Service Section */}
        <div className="flex items-start gap-2 my-4">
          <div>
            <h4 className="font-plus-jakarta font-bold text-[32px] mb-2 text-[#0A2A3D]">
              {typeAnnonce === 'Demande' ? 'Service demandé:' : 'Service proposé:'}
            </h4>
            {informations ? (
              <ul className="list-disc ml-5 pl-5">
                <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                  {`${informations.voyageurs} Voyageurs`}
                </li>
                <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                  {`${informations.chambres} Chambres`}
                </li>
                <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                  {`${informations.litsSimples} Lits Simples`}
                </li>
                <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                  {`${informations.litsDoubles} Lits Doubles`}
                </li>
                {informations.salon && informations.salon > 0 && (
                  <li className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">
                    {`${informations.salon} Salon`}
                  </li>
                )}
              </ul>
            ) : (
              <p className="font-plus-jakarta text-[16px] font-medium text-[#0A2A3D]">No details available</p>
            )}
          </div>
        </div>

        <hr className="border-gray-300 w-full" />

        <div className="flex items-start gap-2 my-4">
          <div>
            <h4 className="font-plus-jakarta font-bold text-h4 text-[#0A2A3D]">Informations complémentaires</h4>
            <p className="font-plus-jakarta text-sm text-[#0A2A3D] overflow-hidden">
              {description}
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

export default HebergementDetails;