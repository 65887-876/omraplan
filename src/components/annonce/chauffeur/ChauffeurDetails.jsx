import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faAt, faInfoCircle, faCopy, faExternalLinkAlt, faPhone, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { RiUserVoiceFill } from 'react-icons/ri';
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ChauffeurDetails = () => {
  const { id } = useParams();
  const [chauffeur, setChauffeur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchChauffeur = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/chauffeurs/${id}`);
        console.log(response.data); // Log the entire response to check socialLinks
        setChauffeur(response.data);
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError('Error fetching chauffeur details');
      } finally {
        setLoading(false);
      }
    };

    fetchChauffeur();
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

  if (!chauffeur) {
    return <div>Chauffeur not found</div>;
  }

  const { photos, showNumber } = chauffeur;
  const user = chauffeur.userId;
  const socialLinks = user.socialLinks;

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
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "grey"
        }}
      ></div>
    )
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col items-center px-4 py-16 relative">
      {/* Breadcrumb Section */}
      <div className='flex justify-start md:mr-[550px]'>
        <div className="flex text-sm items-center">
          <FontAwesomeIcon icon={faHome} className="text-primary-4 mr-2" />
          <Link to="/" className="text-primary-4">Accueil</Link>
          <span className="text-primary-4 mx-2">/</span>
          <Link to="/chauffeur" className="text-primary-4">Chauffeurs</Link>
          <span className="text-primary-4 mx-2">/</span>
          <span className="text-secondary-6">{user.kuniya} {user.prenom}</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="mb-8 w-full max-w-3xl mt-4">
        {photos.length > 1 ? (
          <Slider {...settings}>
            {photos.map((photo, index) => (
              <div key={index} className="flex justify-center">
                <img src={photo} alt={`${user.prenom} ${user.nom}`} className="w-full h-[303px] object-cover rounded-lg" />
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
      <div className="w-full max-w-3xl flex flex-col items-start p-8 gap-6 bg-white rounded-2xl overflow-hidden relative">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-plus-jakarta font-bold text-h2 text-[#0A2A3D]">{user.kuniya} {user.prenom}</h2>
          <button
            className="bg-primary-6 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Voir contact
          </button>
        </div>
        <hr className="border-gray-300 w-full" />
        <div className="flex items-start gap-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Ville</h4>
            <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{chauffeur.city}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <RiUserVoiceFill className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Langues</h4>
            <div className="flex gap-2 flex-wrap">
              {chauffeur.languages.map((language, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm text-[#0A2A3D]">
                  {language}
                </span>
              ))}
              {chauffeur.otherLanguages && chauffeur.otherLanguages.split(',').map((language, index) => (
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
            <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{chauffeur.vehicule.seats}</p>
          </div>
        </div>

        <hr className="border-gray-300 w-full" />

        <div className="flex items-start gap-2">
          <FontAwesomeIcon icon={faInfoCircle} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-h4 text-[#0A2A3D]">Description</h4>
            <p className="font-plus-jakarta text-sm text-[#0A2A3D] overflow-hidden">
              {chauffeur.description.length > 100 ? chauffeur.description.substring(0, 100) + '...' : chauffeur.description}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Contact Info */}
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
              <FontAwesomeIcon icon={faCopy} className="cursor-pointer" onClick={() => copyToClipboard(user.email)} />
            </div>
            <hr className="border-gray-300 my-2" />
            {socialLinks && socialLinks.facebook && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0A2A3D] flex items-center font-plus-jakarta">
                    <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                    Facebook
                  </a>
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="cursor-pointer" />
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
                  <FontAwesomeIcon icon={faCopy} className="cursor-pointer" onClick={() => copyToClipboard(user.whatsappNumber)} />
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
                  <FontAwesomeIcon icon={faCopy} className="cursor-pointer" onClick={() => copyToClipboard(user.phoneNumber)} />
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
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="cursor-pointer" />
                </div>
                <hr className="border-gray-300 my-2" />
              </>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for slider dots */}
      <style jsx>{`
        .slick-dots li button:before {
          color: grey; /* Non-active dot color */
        }
        .slick-dots li.slick-active button:before {
          color: #6c757d; /* Secondary-6 color for active dot */
        }
      `}</style>
    </div>
  );
};

export default ChauffeurDetails;