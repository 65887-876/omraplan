import Logo from "../assets/logo.png";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center px-4 py-8 md:p-16 gap-8 w-full bg-gray-200 z-7">
      {/* Container */}
      <div className="flex flex-col items-center w-full max-w-[1280px] gap-16">
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
          {/* Left Content: Heading and Supporting Text */}
          <div className="flex flex-col items-start text-center md:text-left gap-2 md:w-[788px]">
            {/* Heading */}
            <h4 className="text-gray-900 font-bold text-lg md:text-xl leading-8">
              S'abonner à notre newsletter
            </h4>
            {/* Supporting Text */}
            <p className="text-gray-600 font-medium text-base md:text-lg leading-7 text-left">
            Vous serez les premiers à recevoir les meilleures offres
            </p>

          </div>

          {/* Right Content: Input and Button */}
          <div className="flex flex-col items-start justify-start sm:flex-row  gap-4 w-full sm:w-auto">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full sm:w-[349px] h-10 p-2 bg-white border border-gray-400 rounded-md shadow-sm"
            />
            {/* Button */}
            <button className="sm:w-auto h-10 bg-gray-600 text-white text-sm font-bold rounded-md shadow-sm px-6">
            S'abonner
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-400 rounded-full"></div>

        {/* Main Section */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start md:items-start gap-4 md:w-[368px] text-center md:text-left">
            <img
              src={Logo}
              alt="Omra Bons Plans Logo"
              className="w-[140px] h-auto"
            />
            <p className="text-gray-900 text-left font-medium text-sm md:text-lg leading-7">
              Omra Bons Plans - Votre guide pour un voyage sacré inoubliable.
              Découvrez nos offres exclusives et nos conseils pour une Omra
              réussie.
            </p>
          </div>

          {/* Links Section */}
          <div className="md:flex md:flex-row md:w-full md:justify-evenly  flex flex-col gap-4  w-full ">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-gray-900 md:text-h5 font-bold text-lg leading-8">
                A propos
              </h4>
              <ul className="text-gray-900 font-medium text-sm md:text-lg leading-7">
                <li>Qui sommes nous ?</li>
                <li>Contact</li>
                <li>E-visa</li>
                <li>Vente flash</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="flex  flex-col gap-4">
              <h4 className="text-gray-900 md:text-h5 font-bold text-lg leading-8">
                Services
              </h4>
              <ul className="text-gray-900 font-medium text-sm md:text-lg leading-7">
                <li>Séjours</li>
                <li>Hebergements</li>
                <li>Vols</li>
                <li>Location voiture</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-gray-900 md:text-h5 font-bold text-lg leading-8">
                Autre
              </h4>
              <ul className="text-gray-900 font-medium text-sm md:text-lg leading-7">
                <li>Blog</li>
                <li>Activités</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-400 rounded-full"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full sm:gap-4">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <div className="flex items-center justify-center w-8 h-8 bg-[#987306] rounded-full">
              <FaFacebookF size={16} className="text-white" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-[#987306] rounded-full">
              <IoLogoInstagram size={16} className="text-white" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-[#987306] rounded-full">
              <CiLinkedin size={16} className="text-white" />
            </div>
          </div>

          {/* Copyright Text */}
          <p className="text-[#0A2A3D] font-normal text-sm md:text-base leading-7 text-center md:text-left">
            © 2021 Omra Bons Plans. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
