import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import axios from 'axios';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ categories: false, autres: false });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const menuRef = useRef();
  const profileMenuRef = useRef();
  const mobileProfileMenuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target) && !event.target.closest(".profile-menu-link")) {
        setIsProfileMenuOpen(false);
      }
      if (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target) && !event.target.closest(".profile-menu-link")) {
        setIsProfileMenuOpen(false);
      }
      if (menuRef.current && profileMenuRef.current && !menuRef.current.contains(event.target) && !profileMenuRef.current.contains(event.target)) {
        setDropdownOpen({ categories: false, autres: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsConnected(true);
      axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUserData(response.data.user);
      }).catch(error => {
        console.error('Failed to fetch user data:', error);
      });
    }
  }, []);

  const handleLoginLogout = () => {
    if (isConnected) {
      localStorage.removeItem('token');
      setIsConnected(false);
      setIsProfileMenuOpen(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setDropdownOpen({ categories: false, autres: false });
    setIsProfileMenuOpen(false); // Ensure the profile menu closes
  };

  const getUserInitials = () => {
    if (userData) {
      const firstNameInitial = userData.prenom ? userData.prenom.charAt(0) : '';
      const kuniyaInitial = userData.kuniya ? userData.kuniya.charAt(0) : '';
      return `${firstNameInitial}${kuniyaInitial}`;
    }
    return '';
  };

  return (
    <nav className="md:py-2 md:px-20 px-6 py-2 text-neutral-13 h-[72px] flex items-center justify-between w-full bg-[#FAF8ED] z-50">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="w-24 hidden sm:block cursor-pointer" onClick={() => { navigate('/'); handleLinkClick(); }} />
      </div>

      <ul className="hidden md:flex space-x-6 relative mx-auto">
        <li><Link to="/venteflash" className="text-neutral-13 hover:text-gray-400 text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px] text-left" onClick={handleLinkClick}>Vente Flash</Link></li>
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
            <ul className="absolute mt-6 top-5 left-0 bg-white px-4 py-2 rounded-lg text-neutral-13 p-2 space-y-4 w-60 shadow-lg border border-gray-200 z-50">
              <li><Link to="/sejours" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Séjours</Link></li>
              <li><Link to="/hebergement" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Hébergements</Link></li>
              <li><Link to="/vols" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Vols</Link></li>
              <li><Link to="/guide" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Guides</Link></li>
              <li><Link to="/chauffeur" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Chauffeurs</Link></li>
              <li><Link to="/babysitter" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Baby-sitting</Link></li>
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
            <ul className="absolute top-5 left-0 bg-white text-neutral-13 px-4 py-2 rounded-lg space-y-4 w-60 shadow-lg border border-gray-200 mt-6 z-50">
              <li><Link to="/horairepriere" onClick={handleLinkClick}>Horaires de prière</Link></li>
              <li><Link to="/blog" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Blog</Link></li>
              <li><Link to="/restaurants" className="text-[14px] font-[Plus Jakarta Sans] font-semibold leading-[24px] text-[#0A2A3D] hover:text-gray-400" onClick={handleLinkClick}>Restaurants</Link></li>
            </ul>
          )}
        </li>
      </ul>

      <div className="hidden md:flex items-center space-x-4">
        {!isConnected ? (
          <>
            <button
              className="text-[#0A2A3D] text-body-large font-bold font-plus-jakarta"
              onClick={handleLoginLogout}
            >
              Se connecter
            </button>
            <Link to="/createannonce">
              <button className="rounded-md gap-1 bg-primary-6 px-4 py-2 font-plus-jakarta font-bold text-left text-neutral-1 flex items-center">
                <FiPlus className="mt-1/2 w-6 h-6 text-neutral-1" />
                Créer une annonce
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/createannonce">
              <button className="rounded-md gap-1 bg-primary-6 px-4 py-2 font-plus-jakarta font-bold text-left text-neutral-1 flex items-center" onClick={handleLinkClick}>
                <FiPlus className="mt-1/2 w-6 h-6 text-neutral-1" />
                Créer une annonce
              </button>
            </Link>
            <div className="relative">
              <div className="w-8 h-8 bg-primary-6 text-white rounded-full flex items-center justify-center cursor-pointer" onClick={toggleProfileMenu}>
                {getUserInitials()}
              </div>
              {isProfileMenuOpen && (
                <div ref={profileMenuRef} className="absolute z-50 right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li className="flex items-center space-x-2 px-4 py-2">
                      <div className="w-8 h-8 bg-primary-6 text-white rounded-full flex items-center justify-center">{getUserInitials()}</div>
                      <div>
                        <div className="font-bold">{userData?.prenom} {userData?.kuniya}</div>
                        <div className="text-sm text-gray-500">{userData?.email}</div>
                      </div>
                    </li>
                    <li className="border-t my-2"></li>
                    <li><a href="/mesAnnonces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 profile-menu-link" onClick={handleLinkClick}>Mes annonces</a></li>
                    <li><a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 profile-menu-link" onClick={handleLinkClick}>Profils</a></li>
                    <li className="border-t my-2"></li>
                    <li><a href="/parametre" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 profile-menu-link" onClick={handleLinkClick}>Parametres</a></li>
                    <li><button onClick={handleLoginLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Se déconnecter</button></li>
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
          <img src={Logo} alt="Logo" className="w-20 cursor-pointer" onClick={() => { navigate('/'); handleLinkClick(); }} />
        </div>
        <div>
          <div
            className="w-8 h-8 bg-primary-6 text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={toggleProfileMenu}
          >
            {getUserInitials()}
          </div>
          {isProfileMenuOpen && (
            <div ref={mobileProfileMenuRef} className="absolute top-12 right-0 bg-white text-neutral-13 p-4 rounded-lg shadow-lg border border-gray-200 z-50">
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
                  <Link to="/createannonce">
                    <button className="w-full rounded-md gap-1 bg-primary-6 px-4 py-2 font-plus-jakarta font-bold text-left text-neutral-1 flex items-center" onClick={handleLinkClick}>
                      <FiPlus className="w-6 h-6 text-neutral-1" />
                      Publier une annonce
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-0 left-0 h-full w-[67%] bg-white text-neutral-13 p-4 md:hidden z-50"
        >
          <button
            className="absolute top-4 right-[-55px] bg-white rounded-full flex justify-center items-center h-11 w-11 z-30"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiX className="text-2xl text-neutral-13" />
          </button>

          <ul className="space-y-6">
            <li><Link to="/venteflash" className="text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px] text-neutral-13 block" onClick={handleLinkClick}>Vente Flash</Link></li>
            <li className="relative">
              <button
                onClick={() => {
                  setDropdownOpen({ ...dropdownOpen, categories: !dropdownOpen.categories });
                }}
                className="text-neutral-13 w-full text-left flex justify-between items-center text-[14px] font-[Plus Jakarta Sans] font-bold leading-[24px]"
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
                  <li><Link to="/sejours" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Séjours</Link></li>
                  <li><Link to="/hebergement" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Hébergements</Link></li>
                  <li><Link to="/vols" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Vols</Link></li>
                  <li><Link to="/guide" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Guides</Link></li>
                  <li><Link to="/chauffeur" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Chauffeurs</Link></li>
                  <li><Link to="/babysitter" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Baby-sitting</Link></li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                onClick={() => {
                  setDropdownOpen({ ...dropdownOpen, autres: !dropdownOpen.autres });
                }}
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
                  <li><Link to="/horairepriere" onClick={handleLinkClick}>Horaires de prière</Link></li>
                  <li><Link to="/blog" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Blog</Link></li>
                  <li><Link to="/restaurants" className="block pl-2 text-[14px] font-[Plus Jakarta Sans] font-medium leading-[24px] text-primary-6 hover:text-primary-5" onClick={handleLinkClick}>Restaurants</Link></li>
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