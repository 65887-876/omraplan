import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { RiUserVoiceFill } from 'react-icons/ri';

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/guide/${guide._id}`);
  };

  // Check if guide.languages is defined and is an array
  const languages = Array.isArray(guide.languages) ? guide.languages : [];
  
  // Limit the number of displayed languages to 2
  const displayedLanguages = languages.slice(0, 2);
  const remainingLanguagesCount = languages.length - displayedLanguages.length;

  return (
    <div
      className="flex flex-col justify-center items-center w-[350px] sm:w-[305px] h-[311.56px] bg-white border border-[#EBEEF0] shadow-sm rounded-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleDetailsClick}
    >
      {/* Top section: Image */}
      <div
        className="flex-shrink-0 w-full h-[171px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${guide.photos[0]})` }}
      ></div>

      {/* Bottom section: Content */}
      <div className="flex flex-col justify-between py-3 px-4 gap-2 h-1/2 w-full relative">
        <div>
          <div className="flex flex-col items-start gap-1 w-full">
            <h4 className="text-[24px] font-bold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {guide.userId.prenom}
            </h4>
            <div className="flex items-center font-medium font-plus-jakarta text-primary-5 text-sm">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
              <p>{guide.city}</p>
            </div>
            <div className="flex items-center font-medium font-plus-jakarta text-primary-5 text-sm">
              <RiUserVoiceFill className="mr-1" />
              {displayedLanguages.map((language, index) => (
                <span key={index} className="mr-1">
                  {language}
                </span>
              ))}
              {remainingLanguagesCount > 0 && <span>+{remainingLanguagesCount}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;