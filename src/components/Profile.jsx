import { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Aucun token trouvé');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'PUT', 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 404) {
          setError('Profil non trouvé');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUserData(data.user);
        setOriginalData(data.user);
      } catch (error) {
        setError('Erreur lors de la récupération du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('companyDetails')) {
      const nestedField = name.split('.')[1];
      setUserData((prevData) => ({
        ...prevData,
        companyDetails: {
          ...prevData.companyDetails,
          [nestedField]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePhoneChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Aucun token trouvé');
      return;
    }
    console.log("Updated Data to Send:", userData);
    

    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData.user);
        setOriginalData(updatedData.user);
        alert('Profil mis à jour avec succès!');
        setIsEditing(false); // Disable editing after saving
      } else {
        setError('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  const handleCancel = () => {
    setUserData(originalData); // Revert to original data
    setIsEditing(false); // Disable editing
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-50 to-yellow-100">
              <div className="mb-4 text-gray-600">
          <span className="text-sm">/accueil/profile</span>
        </div>
        <h1 className="text-h1 font-semibold text-center text-gray-700 mb-6">Profil</h1>

      <div className="  px-4 py-6">
        {/* Path */}

        
        <div className="flex justify-start">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[840px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 text-sm mb-2">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={userData?.email || ''}
                  className="w-4/5 p-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label htmlFor="prenom" className="block text-gray-600 text-sm mb-2">Prénom</label>
                  <input
                    id="prenom"
                    type="text"
                    name="prenom"
                    value={userData?.prenom || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="kuniya" className="block text-gray-600 text-sm mb-2">Kuniya</label>
                  <input
                    id="kuniya"
                    type="text"
                    name="kuniya"
                    value={userData?.kuniya || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="sexe" className="block text-gray-600 text-sm mb-2">Sexe</label>
                <select
                  id="sexe"
                  name="sexe"
                  value={userData?.sexe || ''}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                >
                  <option value="Male">Homme</option>
                  <option value="Female">Femme</option>
                  <option value="Other">Autre</option>
                </select>
              </div>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label htmlFor="phoneNumber" className="block text-gray-600 text-sm mb-2">Numéro de téléphone</label>
                  <PhoneInput
                    name="phoneNumber"
                    value={userData?.phoneNumber || ''}
                    onChange={(value) => handlePhoneChange('phoneNumber', value)}
                    defaultCountry="fr"
                    className="w-full"
                    disabled={!isEditing}
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="whatsappNumber" className="block text-gray-600 text-sm mb-2">Numéro WhatsApp</label>
                  <PhoneInput
                    name="whatsappNumber"
                    value={userData?.whatsappNumber || ''}
                    onChange={(value) => handlePhoneChange('whatsappNumber', value)}
                    defaultCountry="fr"
                    className="w-full"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="facebook" className="block text-gray-600 text-sm mb-2">Facebook</label>
                <input
                  id="facebook"
                  type="url"
                  name="facebook"
                  value={userData?.socialLinks.facebook || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="instagram" className="block text-gray-600 text-sm mb-2">Instagram</label>
                <input
                  id="instagram"
                  type="url"
                  name="instagram"
                  value={userData?.socialLinks.instagram || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={!isEditing}
                />
              </div>

              {userData?.isProfessional && (
                <>
                  <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-600 text-sm mb-2">Nom de l'entreprise</label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyDetails.companyName"
                      value={userData?.companyDetails?.companyName || ''}
                      onChange={handleInputChange}
                      className="w-4/5 p-2 border border-gray-300 rounded-md"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="companyAddress" className="block text-gray-600 text-sm mb-2">Adresse de l'entreprise</label>
                    <input
                      id="companyAddress"
                      type="text"
                      name="companyDetails.companyAddress"
                      value={userData?.companyDetails?.companyAddress || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex mb-4 space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="website" className="block text-gray-600 text-sm mb-2">Site Web</label>
                      <input
                        id="website"
                        type="url"
                        name="companyDetails.website"
                        value={userData?.companyDetails?.website || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="companyPhone" className="block text-gray-600 text-sm mb-2">Numéro de téléphone de l'entreprise</label>
                      <PhoneInput
                        name="companyDetails.companyPhone"
                        value={userData?.companyDetails?.companyPhone || ''}
                        onChange={(value) => handlePhoneChange('companyDetails.companyPhone', value)}
                        defaultCountry="fr"
                        className="w-full"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex space-x-4 mt-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="py-2 px-4 bg-red-500 text-white rounded-md"
                      onClick={handleCancel}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-500 text-white rounded-md"
                    >
                      Sauvegarder
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="py-2 px-4 bg-green-500 text-white rounded-md"
                    onClick={() => setIsEditing(true)}
                  >
                    Modifier
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
