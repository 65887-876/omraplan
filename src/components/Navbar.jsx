import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ categories: false, autres: false });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef();
  const profileMenuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsConnected(true);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isConnected) {
      console.log("Logging out");
      localStorage.removeItem('token');
      setIsConnected(false);
      setIsProfileMenuOpen(false);  // Close the profile menu
      navigate('/login');  // Redirect to login page after logout
    } else {
      navigate('/login');  // Navigate to login page if the user isn't logged in
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className=" md:py-2 md:px-20 px-6 py-2 text-neutral-13 flex items-center justify-between w-full bg-[#FAF8ED] ">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="w-24 hidden sm:block cursor-pointer" onClick={() => navigate('/')} />
      </div>

      <ul className="hidden md:flex space-x-6 relative mx-auto">
        <li><a href="#" className="text-neutral-13 hover:text-gray-400 text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px] text-left">Vente Flash</a></li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, categories: !dropdownOpen.categories })}
            className="text-neutral-13 hover:text-gray-400 flex items-center text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px] text-left"
          >
            Catégories
            {dropdownOpen.categories ? (
              <FiChevronUp className="ml-1 text-xl text-neutral-13" />
            ) : (
              <FiChevronDown className="ml-1 text-xl text-neutral-13" />
            )}
          </button>
          {dropdownOpen.categories && (
            <ul className="absolute mt-6 top-5 left-0 bg-white px-4 py-2 rounded-lg text-neutral-13 p-2 space-y-4 w-60 shadow-lg border border-gray-200 ">
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Séjours</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Hébergements</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Vols</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Guides</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Chauffeurs</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Baby-sitting</a></li>
            </ul>
          )}
        </li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen({ ...dropdownOpen, autres: !dropdownOpen.autres })}
            className="text-neutral-13 hover:text-gray-400 flex items-center text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px] text-left"
          >
            Autres
            {dropdownOpen.autres ? (
              <FiChevronUp className="ml-1 text-xl text-neutral-13" />
            ) : (
              <FiChevronDown className="ml-1 text-xl text-neutral-13" />
            )}
          </button>
          {dropdownOpen.autres && (
            <ul className="absolute top-5 left-0 bg-white text-neutral-13 px-4 py-2 rounded-lg space-y-4 w-60 shadow-lg border border-gray-200 mt-6">
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">E-visa</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Blog</a></li>
              <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400">Restaurants</a></li>
            </ul>
          )}
        </li>
      </ul>

      <div className="hidden md:flex items-center space-x-4">
        {!isConnected ? (
          <>
            <button
              className="text-[#0A2A3D] text-body-large font-bold  font-plus-jakarta"
              onClick={handleLoginLogout}
            >
              Se connecter
            </button>
            <button className="rounded-md gap-1 bg-primary-6 px-4 py-2 font-plus-jakarta font-bold text-left text-neutral-1 flex items-center">
              <FiPlus className="mt-1/2 w-6 h-6 text-neutral-1" />
              Créer une annonce
            </button>
          </>
        ) : (
          <>
            <button className="rounded-md gap-1 bg-primary-6 px-4 py-2 font-plus-jakarta font-bold text-left text-neutral-1 flex items-center">
              <FiPlus className="mt-1/2 w-6 h-6 text-neutral-1" />
              Créer une annonce
            </button>
            <div className="relative">
              <div className="w-8 h-8 bg-gray-500 rounded-full cursor-pointer" onClick={toggleProfileMenu}></div>
              {isProfileMenuOpen && (
                <div ref={profileMenuRef} className="absolute z-1 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li><a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a></li>
                    <li><a href="/parametre" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">parametre</a></li>
                    <li><button onClick={handleLoginLogout} className="block w-full  text-left px-4 py-2 text-gray-700 hover:bg-gray-100">se deconnecter</button></li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex md:hidden w-full items-center justify-between">
        <button className="text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          &#9776;
        </button>

        <div className="text-xl font-bold text-neutral-13 pr-44">
          <img src={Logo} alt="Logo" className="w-20 cursor-pointer" onClick={() => navigate('/')} />
        </div>
{/* Profile Menu */}
<div>
  <div
    className="w-8 h-8 bg-gray-500 rounded-full cursor-pointer flex items-center justify-center"
    onClick={toggleProfileMenu}
  >
    <FaUser className="text-white w-4 h-4" />
  </div>
  
  {isProfileMenuOpen && (
    <div className="absolute top-12 right-0 bg-white text-neutral-13 p-4 rounded-lg shadow-lg border border-gray-200">
      <ul className="space-y-2">
        <li>
          <button
            className="w-full text-[#0A2A3D] py-2 text-body-large font-bold font-plus-jakarta"
            onClick={handleLoginLogout}
          >
            {isConnected ? 'Se déconnecter' : 'Se connecter'}
          </button>
        </li>
        <li>
          <button className="w-full rounded-md gap-1 bg-primary-6 px-4 py-2 font-plus-jakarta font-bold text-left text-neutral-1 flex items-center">
            <FiPlus className="w-6 h-6 text-neutral-1" />
            Publier une annonce
          </button>
        </li>
      </ul>
    </div>
  )}
</div>


      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {isMenuOpen && (
  <div
  ref={menuRef}
  className="absolute top-0 left-0 h-full w-[67%] bg-white text-neutral-13 p-4 md:hidden z-20 "
>
  <button
    className="absolute top-4 right-[-55px] bg-white rounded-full flex  justify-center items-center h-11 w-11 z-30"
    onClick={() => setIsMenuOpen(false)}
  >
    <FiX className="text-2xl text-neutral-13" />
          </button>

          <ul className="space-y-6">
            <li><a href="#" className="text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px] text-neutral-13 block">Vente Flash</a></li>
            <li className="relative">
              <button
                onClick={() => setDropdownOpen({ ...dropdownOpen, categories: !dropdownOpen.categories })}
                className="text-neutral-13  w-full text-left flex justify-between items-center text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px]"
              >
                Catégories
                {dropdownOpen.categories ? (
                  <FiChevronUp className="ml-1 text-xl text-neutral-13" />
                ) : (
                  <FiChevronDown className="ml-1 text-xl text-neutral-13" />
                )}
              </button>
              {dropdownOpen.categories && (
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5">Séjours</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5">Hébergements</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5">Vols</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5">Guides</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5">Chauffeurs</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5">Baby-sitting</a></li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                onClick={() => setDropdownOpen({ ...dropdownOpen, autres: !dropdownOpen.autres })}
                className="text-neutral-13 w-full text-left flex justify-between items-center text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px]"
              >
                Autres
                {dropdownOpen.autres ? (
                  <FiChevronUp className="ml-1 text-xl text-neutral-13" />
                ) : (
                  <FiChevronDown className="ml-1 text-xl text-neutral-13" />
                )}
              </button>
              {dropdownOpen.autres && (
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium  leading-[24px] text-primary-6 hover:text-gray-400">E-visa</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium  leading-[24px] text-primary-6 hover:text-gray-400">Blog</a></li>
                  <li><a href="#" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium  leading-[24px] text-primary-6 hover:text-gray-400">Restaurants</a></li>
                </ul>
              )}
            </li>
            
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
