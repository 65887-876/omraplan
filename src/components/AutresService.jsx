/* eslint-disable react/prop-types */
import Service from '../assets/service.png';
import { FaUtensils, FaTrain, FaCar } from 'react-icons/fa';
import frame from '../assets/frame.png';
const AutresService = () => {
  return (
    <div className="relative flex flex-col lg:flex-row  justify-between py-24  sm:px-20 gap-10 w-full bg-yellow-50">
      
      <div className='absolute top-0 right-0 sm:block'>
        <img src={frame} alt="" />
      </div>

      {/* Left Section */}
      <div className="lg:w-1/2">
        <h2 className="text-4xl text-primary-10 font-bold font-plus-jakarta mb-6">
          Autres services
        </h2>
        <p className="font-plus-jakarta font-normal text-lg text-primary-6 mb-8">
          Explorez nos services complémentaires pour un voyage sans souci.
          Transferts, visites guidées, conseils locaux... tout ce dont vous avez
          besoin pour une expérience inoubliable est ici. Simplifiez votre
          voyage avec nous.
        </p>
        <div className="flex flex-col gap-4">
          <InfoCard
            title="Restaurants"
            subtitle="Trouver un bon restaurant"
            Icon={FaUtensils}
            iconStyle="text-[#0A2A3D] bg-[#EBEEF0]"
          />
          <InfoCard
            title="Trains"
            subtitle="Confort et rapidité"
            Icon={FaTrain}
            iconStyle="text-[#987306] bg-[#F5F1E6]"
          />
          <InfoCard
            title="Location de voitures"
            subtitle="Une omra en toute liberté"
            Icon={FaCar}
            iconStyle="text-[#F28B0E] bg-[#F5F1E6]"
          />
        </div>
      </div>

      {/* Right Section */}
      <img
        src={Service}
        alt="Service Illustration"
        className=" max-w-[600px]  hidden lg:block"
      />
    </div>
  );
};

const InfoCard = ({ title, subtitle, Icon, iconStyle  }) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-1/2">
      <div
        className={`flex justify-center items-center w-12 h-12 rounded-[2px] ${iconStyle}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>

  );
};

export default AutresService;
