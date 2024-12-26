import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

function SignupStep2() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the email is passed from state (for example, after a Google login)
  const emailFromState = location.state?.email;
  const emailFromStorage = localStorage.getItem('userEmail');
  const email = emailFromState || emailFromStorage || ''; // Default to empty if no email is available

  const [profileData, setProfileData] = useState({
    email: email, // Pre-fill email field
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhoneChange = (name, value) => {
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggleChange = () => {
    setProfileData((prevData) => ({
      ...prevData,
      isProfessional: !prevData.isProfessional,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate required fields
    if (!profileData.prenom || !profileData.kuniya || !profileData.sexe || !profileData.phoneNumber) {
      toast.error('Tous les champs sont requis.');
      return;
    }
  
    // If isProfessional is true, validate the company fields
    if (profileData.isProfessional) {
      if (!profileData.companyName || !profileData.companyAddress || !profileData.website || !profileData.companyPhone) {
        toast.error('Le nom de l\'entreprise, l\'adresse et le téléphone sont requis.');
        return;
      }
    }
  
    console.log('Profile Data:', profileData); // Log to verify the data before sending to the backend
  
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/signup-step-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success('Profil complété avec succès!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center flex-col items-center py-12 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <h2 className="text-h1 font-semibold text-center text-gray-700 mb-6">Complétez votre profil</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[840px]">
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label htmlFor="prenom" className="block text-gray-600 text-sm mb-2">Prénom</label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                value={profileData.prenom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="kuniya" className="block text-gray-600 text-sm mb-2">Kuniya</label>
              <input
                id="kuniya"
                type="text"
                name="kuniya"
                value={profileData.kuniya}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="sexe" className="block text-gray-600 text-sm mb-2">Sexe</label>
            <select
              id="sexe"
              name="sexe"
              value={profileData.sexe}
              onChange={handleChange}
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner</option>
              <option value="Male">Homme</option>
              <option value="Female">Femme</option>
              <option value="Other">Autre</option>
            </select>
          </div>

          <hr className="my-6" />

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm mb-2">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-4/5 p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="flex mb-4 w-full space-x-4">
            <div className="w-full">
              <label htmlFor="phoneNumber" className="block text-gray-600 text-sm mb-2">Numéro de téléphone</label>
              <PhoneInput
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={(value) => handlePhoneChange('phoneNumber', value)}
                defaultCountry="fr"
                className="w-full"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="whatsappNumber" className="block text-gray-600 text-sm mb-2">Numéro WhatsApp</label>
              <PhoneInput
                name="whatsappNumber"
                value={profileData.whatsappNumber}
                onChange={(value) => handlePhoneChange('whatsappNumber', value)}
                defaultCountry="fr"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label htmlFor="facebook" className="block text-gray-600 text-sm mb-2">Facebook</label>
              <input
                id="facebook"
                type="text"
                name="facebook"
                value={profileData.facebook}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="instagram" className="block text-gray-600 text-sm mb-2">Instagram</label>
              <input
                id="instagram"
                type="text"
                name="instagram"
                value={profileData.instagram}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="isProfessional" className="text-gray-600 text-sm mr-4">Professionnel</label>
            <div
              onClick={handleToggleChange}
              className={`relative inline-block w-12 h-6 cursor-pointer ${profileData.isProfessional ? 'bg-[#987306]' : 'bg-gray-300'} rounded-full`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${profileData.isProfessional ? 'transform translate-x-6' : ''}`}
              ></span>
            </div>
          </div>

          {profileData.isProfessional && (
            <>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-gray-600 text-sm mb-2">Nom de l'entreprise</label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  onChange={handleChange}
                  className="w-4/5 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="companyAddress" className="block text-gray-600 text-sm mb-2">Adresse de l'entreprise</label>
                <input
                  id="companyAddress"
                  type="text"
                  name="companyAddress"
                  value={profileData.companyAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label htmlFor="website" className="block text-gray-600 text-sm mb-2">Site Web</label>
                  <input
                    id="website"
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="companyPhone" className="block text-gray-600 text-sm mb-2">Numéro de téléphone de l'entreprise</label>
                  <PhoneInput
                    name="companyPhone"
                    value={profileData.companyPhone}
                    onChange={(value) => handlePhoneChange('companyPhone', value)}
                    defaultCountry="fr"
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-primary-6 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Compléter le profil'}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignupStep2;
