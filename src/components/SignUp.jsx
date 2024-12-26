import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Initial state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    prenom: '',
    kuniya: '',
    sexe: '',
    phoneNumber: '',
    whatsappNumber: '',
    facebook: '',
    instagram: '',
    isProfessional: false,
    companyName: '',
    companyAddress: '',
    website: '',
    companyPhone: '',
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track current step

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    updateProgress();
  };

  // Handle phone input change
  const handlePhoneChange = (name, value) => {
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle the professional toggle
  const handleToggleChange = () => {
    setSignupData((prevData) => ({
      ...prevData,
      isProfessional: !prevData.isProfessional,
    }));
  };


  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields for both steps
    if (currentStep === 1) {
      if (!signupData.email || !signupData.password || !signupData.confirmPassword) {
        toast.error('L\'email, le mot de passe et la confirmation du mot de passe sont requis.');
        return;
      }

      if (signupData.password !== signupData.confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas.');
        return;
      }

      // Proceed to next step
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate required fields for step 2
      if (!signupData.prenom || !signupData.kuniya || !signupData.sexe || !signupData.phoneNumber) {
        toast.error('Tous les champs sont requis pour la deuxième étape.');
        return;
      }

      if (signupData.isProfessional) {
        if (!signupData.companyName || !signupData.companyAddress || !signupData.website || !signupData.companyPhone) {
          toast.error('Le nom de l\'entreprise, l\'adresse et le téléphone sont requis.');
          return;
        }
      }

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Inscription réussie!');
          navigate('/login');
        } else {
          toast.error(data.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col items-center py-12 bg-yellow-50">
      <h2 className="text-h2 font-bold text-center text-primary-9 mb-6">Inscrivez-vous</h2>


      <div className={`bg-white p-8 rounded-lg shadow-lg ${currentStep === 1 ? 'w-[480px]' : 'w-[800px]'}`}>
  <form onSubmit={handleSubmit}>
    {/* Step 1: Email and Password */}
    {currentStep === 1 && (
      <>
        <div className="mb-4">
          <label htmlFor="email" className="block font-plus-jakarta font-bold text-primary-6 mb-2">Adresse e-mail</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3">
            <FaEnvelope className="text-gray-400" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="exemple@mail.com"
              value={signupData.email}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-plus-jakarta font-bold text-primary-6 mb-2">Mot de passe</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3">
            <FaLock className="text-gray-400" />
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Votre mot de passe"
              value={signupData.password}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-gray-400"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmpassword" className="block font-plus-jakarta font-bold text-primary-6 mb-2">Mot de passe</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3">
            <FaLock className="text-gray-400" />
            <input
              id="confirmpassword"
              type={passwordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="verifier votre mot de passe"
              value={signupData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-gray-400"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`w-full py-3 bg-primary-6 text-white rounded-md hover:bg-primary-5 focus:outline-none ${loading ? 'opacity-50' : 'hover:bg-yellow-600'}`}
          >
            {loading ? 'Chargement...' : 'Continuer'}
          </button>
        </div>
      </>
    )}

    {/* Step 2: Personal Details */}
    {currentStep === 2 && (
      <>
        <div className="flex mb-4 space-x-4 py-2">
          <div className="w-1/2">
            <label htmlFor="prenom" className="block text-neutral-13  font-bold text-sm mb-2">Prénom</label>
            <input      
              id="prenom"
              type="text"
              name="prenom"
              placeholder='Entrer votre prénom'
              value={signupData.prenom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="kuniya" className="block text-neutral-13 text-body-large font-bold text-sm mb-2">Kuniya</label>
            <input
              id="kuniya"
              placeholder='Entrer votre kuniya'
              type="text"
              name="kuniya"
              value={signupData.kuniya}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4 w-[48.5%] py-2">
          <label htmlFor="sexe" className="block text-neutral-13 text-body-large font-bold text-sm mb-2">Sexe</label>
          <select
            id="sexe"
            name="sexe"
            value={signupData.sexe}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Sélectionner</option>
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
            <option value="Other">Autre</option>
          </select>
        </div>
        <div className='w-[100%] h-[1px] my-4 mb-4 flex justify-center items-center border border-gray-300'>

        </div>
        <div className="flex mb-4 space-x-4 py-2">
          <div className="w-1/2">
            <label htmlFor="phoneNumber" className="block text-neutral-13 text-body-large font-bold text-sm mb-2">Numéro de téléphone</label>
            <PhoneInput
              name="phoneNumber"
              value={signupData.phoneNumber}
              onChange={(value) => handlePhoneChange('phoneNumber', value)}
              defaultCountry="fr"
              className="w-full"

              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="whatsappNumber" className="block text-neutral-13 text-body-large font-bold text-sm mb-2">Numéro WhatsApp</label>
            <PhoneInput
              name="whatsappNumber"
              value={signupData.whatsappNumber}
              onChange={(value) => handlePhoneChange('whatsappNumber', value)}
              defaultCountry="fr"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label htmlFor="facebook" className="block text-neutral-13 text-body-large font-bold text-sm mb-2">Facebook</label>
            <input
              id="facebook"
              placeholder='Lien facebook'
              type="url"
              name="facebook"
              value={signupData.facebook}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-1/2 ">
            <label htmlFor="instagram" className="block text-neutral-13 text-body-large font-bold text-sm mb-2">Instagram</label>
            <input
              id="instagram"
              type="url"
              placeholder='Lien instagram'
              name="instagram"
              value={signupData.instagram}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className='w-[100%] h-[1px] mb-4 flex justify-center items-center border border-gray-300'></div>
        <div className="flex flex-row items-center p-4 gap-4 w-[397px] h-[75px] bg-[#F5F6F7] rounded-[16px] flex-none order-4 flex-grow-0">
  <div className="flex flex-col items-start p-0 gap-2 w-[321px] h-[39px] flex-none order-0 flex-grow-0">
    <span className="w-[321px] h-[22px] font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[22px] flex items-center text-[#0A2A3D]">
      Passez à un compte professionnel
    </span>
    <span className="w-[321px] h-[15px] font-['Plus_Jakarta_Sans'] font-medium text-[12px] leading-[15px] flex items-center text-[#5D7485]">
      Vous êtes un professionnel ? Configurez votre entreprise
    </span>
  </div>
  <div className="flex flex-row justify-end items-center  w-[44px] h-[24px] bg-[#987306] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer" onClick={handleToggleChange}>
    <div className={`w-[20px] h-[20px] bg-[#FFFFFF] rounded-full shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)] transform transition-transform duration-200 ease-in-out ${signupData.isProfessional ? 'translate-x-[-2.5px]' : 'translate-x-[-22px]'}`}></div>
  </div>
</div>
      </>
    )}

    {/* Step 3: Professional Info (if applicable) */}
    {signupData.isProfessional && (
      <>
        <div className="mb-4 py-4">
          <label htmlFor="companyName" className="block text-neutral-13 font-bold text-sm mb-2">Nom de l'entreprise</label>
          <input
            id="companyName"
            placeholder="Nom de l'entreprise"
            type="text"
            name="companyName"
            value={signupData.companyName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="companyAddress" className="block text-neutral-13 font-bold text-sm mb-2">Adresse de l'entreprise</label>
          <input
            id="companyAddress"
            placeholder="Adresse de l'entreprise"
            type="text"
            name="companyAddress"
            value={signupData.companyAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className='flex mb-4 space-x-4'>
          <div className="mb-4 w-1/2">
            <label htmlFor="website" className="block text-neutral-13 font-bold text-sm mb-2">Site web</label>
            <input
              id="website"
              placeholder='https://www.example.com'
              type="url"
              name="website"
              value={signupData.website}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4 w-1/2">
            <label htmlFor="companyPhone" className="block text-neutral-13 font-bold text-sm mb-2">Numéro de téléphone de l'entreprise</label>
            <input
              id="companyPhone"
              type="tel"
              name="companyPhone"
              value={signupData.companyPhone}
              onChange={handleChange}
              placeholder='555 55 55 55'
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            
          </div>
          
        </div>
        <div className="flex justify-end mt-6">
          <button
          type="submit"
          className={` py-3 px-4 bg-primary-6 text-white rounded-md ${loading ? 'opacity-50' : 'hover:bg-primary-5'}`}
        >
          {loading ? 'Chargement...' : 'Enregistrer'}
        </button>
      </div>
      </>
      
    )}


  </form>
</div>

    <ToastContainer />
    </div>
  );
}

export default Signup;
