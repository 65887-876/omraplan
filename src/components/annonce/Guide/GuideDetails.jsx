import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faAt, faInfoCircle, faPhone, faTimes, faGlobe, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FaCalendarDay } from 'react-icons/fa';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles.css'; // Import the custom CSS for slider dots
import house from './house.png'; // Import your local images
import copyIcon from './copy.png';
import linkIcon from './Link.png';
import { RiUserVoiceFill } from 'react-icons/ri';

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/guides/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setGuide(response.data);
      } catch (error) {
        console.error('Error fetching guide details:', error);
        setError('Error fetching guide details');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
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

  if (!guide) {
    return <div>Guide not found</div>;
  }

  const { photos, showNumber } = guide;
  const user = guide.userId;
  const socialLinks = user.socialLinks; // Assuming user has socialLinks
  const companyDetails = user.companyDetails; // Assuming user has companyDetails

  const filteredLanguages = guide.languages.filter(language => language !== 'Autres');

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

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col px-4 items-center py-16 relative">
      {/* Breadcrumb Section */}
      <div className='flex justify-start md:mr-[550px] pr-28 sm:pr-10'>
        <div className="flex text-sm items-center font-plus-jakarta">
          <img className='px-1' src={house} alt="house icon" />
          <Link to="/" className="text-primary-4">Accueil</Link>
          <span className="text-primary-4 mx-2">/</span>
          <Link to="/guides" className="text-primary-4">Guides</Link>
          <span className="text-primary-4 mx-2">/</span>
          <span className="text-secondary-6 font-medium">{guide.city}</span>
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
      <div className="w-full max-w-3xl flex flex-col items-start py-2 px-8 bg-white rounded-2xl overflow-hidden relative">
        <div className="flex flex-col sm:flex-row py-4 justify-between items-center w-full">
          <div>
            <h4 className="font-plus-jakarta font-bold text-h4 text-[#0A2A3D]">{user.prenom} {user.kunya} <span className='text-sm'>(je suis également Guide)  </span></h4>
          </div>
          <div className="flex flex-col items-end">
            <button className="mt-2 w-[300px] sm:w-[152px] py-2 bg-primary-6 text-white rounded-lg" onClick={() => setShowModal(true)}>Voir contact</button>
          </div>
        </div>

        <hr className="border-gray-300 w-full my-2" />
        <div className="flex items-start gap-2 my-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Ville</h4>
            <p className="font-plus-jakarta text-sm text-[#0A2A3D]">{guide.city}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-3">
          <RiUserVoiceFill className="text-primary-6 mt-1" style={{ fontSize: '1.5em' }} />
          <div>
            <h4 className="font-plus-jakarta font-bold text-lg text-[#0A2A3D]">Langues</h4>
            <div className="flex gap-2 flex-wrap">
              {filteredLanguages.map((language, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm text-[#0A2A3D]">
                  {language}
                </span>
              ))}
              {guide.otherLanguages && guide.otherLanguages.split(',').map((language, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm text-[#0A2A3D]">
                  {language.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-gray-300 w-full my-2" />
        <div className="flex items-start gap-2 my-3">
          <div>
            <h4 className="font-plus-jakarta text-h4 font-bold py-2 text-[#0A2A3D]">Service proposé</h4>
            <ul className="list-disc ml-5 pl-5">
              {guide.services.map((service, index) => (
                <li key={index} className="font-plus-jakarta text-neutral-13 font-medium text-base">{service}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 w-full" />

        <div className="flex items-start gap-2 my-4">
          <div>
            <h4 className="font-plus-jakarta font-bold text-h4 text-[#0A2A3D]">Informations supplémentaires</h4>
            <p className="font-plus-jakarta text-sm text-[#0A2A3D] overflow-hidden">{guide.description}</p>
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
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
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

export default GuideDetails;