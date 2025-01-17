import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiUserVoiceFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';

const BabySitterCard = ({ babysitter }) => {
  const navigate = useNavigate();

  // Check if babysitter and userId are defined
  if (!babysitter || !babysitter.userId) {
    return null; // or display a placeholder/error message
  }

  const user = babysitter.userId;

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
    navigate(`/babysitter/${babysitter._id}`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-[305px] h-[337.56px] bg-white border border-[#EBEEF0] shadow-sm rounded-lg m-2 cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleDetailsClick}
    >
      {/* Top section: Image */}
      <div
        className="flex-shrink-0 w-full h-1/2 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${babysitter.photos[0]})` }}
      ></div>

      {/* Bottom section: Content */}
      <div className="flex flex-col justify-between p-4 gap-2 w-full h-1/2">
        <div>
          <div className="flex flex-row items-center gap-1 w-full">
            <h4 className="text-[24px] pb-1 font-semibold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {user.prenom} {user.kuniya}
            </h4>
          </div>
          <div className="flex py-1 flex-row items-center gap-1 w-full">
            <MdLocationOn className="w-5 h-5 text-gray-600" />
            <p className="text-sm font-medium text-body-small text-primary-6">
              {babysitter.city}
            </p>
          </div>
          <div className="flex flex-row items-center gap-1 w-full">
            <RiUserVoiceFill className="w-5 h-5 text-gray-600" />
            <p className="text-sm font-medium text-body-small text-primary-6">
              {formatLanguages(babysitter.languages)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabySitterCard;