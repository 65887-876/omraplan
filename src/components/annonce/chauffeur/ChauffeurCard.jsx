import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiUserVoiceFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';

const ChauffeurCard = ({ chauffeur }) => {
  const user = chauffeur.userId; // We are using populated user data
  const navigate = useNavigate();

  // Function to format languages
  const formatLanguages = (languages) => {
    if (!languages || languages.length === 0) {
      return 'No languages specified';
    }
    if (languages.length <= 2) {
      return languages.join(', ');
    }
    return `${languages.slice(0, 2).join(', ')} +${languages.length - 2} more`;
  };

  const handleDetailsClick = () => {
    navigate(`/chauffeur/${chauffeur._id}`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-[305px] h-[337px] bg-white border border-[#EBEEF0] shadow-sm rounded-lg m-2 cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleDetailsClick}
    >
      {/* Top section: Image */}
      <div
        className="flex-shrink-0 w-full h-1/2 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${chauffeur.photos[0]})` }}
      ></div>

      {/* Bottom section: Content */}
      <div className="flex flex-col justify-between p-4 gap-2 w-full h-1/2">
        <div>
          <div className="flex flex-row items-center gap-1 w-full">
            {user ? (
              <h4 className="text-[24px] pb-1 font-semibold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {user.prenom} {user.kuniya}
              </h4>
            ) : (
              <h4 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Unknown User
              </h4>
            )}
          </div>
          <div className="flex py-1 flex-row items-center gap-1 w-full">
            <MdLocationOn className="w-5 h-5 text-gray-600" />
            <p className="text-sm font-medium text-body-small text-primary-6">
              {chauffeur.city}
            </p>
          </div>
          <div className="flex flex-row items-center gap-1 w-full">
            <RiUserVoiceFill className="w-5 h-5 text-gray-600" />
            <p className="text-sm font-medium text-body-small text-primary-6">
              {formatLanguages(chauffeur.languages)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChauffeurCard;