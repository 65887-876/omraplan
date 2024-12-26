import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing the eye icons
import 'react-toastify/dist/ReactToastify.css';

function Parametre() {
  const [userEmail, setUserEmail] = useState(null); // State to hold the logged-in user's email
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
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
        setUserEmail(data.user.email); // Set the fetched email
        setEmail(data.user.email); // Prefill the email state
      } catch (error) {
        setError('Erreur lors de la récupération du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Function to handle saving the email
  const handleSaveEmail = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token manquant');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }), // Send updated email
    });

    if (response.ok) {
      toast.success('Email mis à jour avec succès!');
      setIsEditingEmail(false);
      setUserEmail(email); // Update the local state with the new email
    } else {
      toast.error('Erreur lors de la mise à jour de l\'email.');
    }
  };

  const handleSavePassword = async () => {
    // Basic password match validation
    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
  
    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token manquant');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          email,             // Send email if updating
          newPassword,       // Send new password
          confirmPassword    // Send confirm password
        }),
      });
  
      const responseData = await response.json();
      console.log('Backend response:', responseData); // Check backend response
      if (response.ok) {
        toast.success('Mot de passe mis à jour avec succès!');
        setIsEditingPassword(false); // Exit edit mode
        setNewPassword(''); // Clear the input fields
        setConfirmPassword('');
      } else {
        toast.error('Erreur lors de la mise à jour du mot de passe.');
      }
    } catch (error) {
      console.error('Error during password update:', error);
      setError('Erreur lors de la mise à jour du mot de passe.');
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setEmail(userEmail); // Reset email to the fetched user email
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex justify-center flex-col items-center px-4 py-12 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <h2 className="text-4xl font-semibold text-center text-gray-700 mb-6">Paramètres</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[600px] lg:w-[800px]">
        <form>
          {/* Row 1: Email */}
          <div className="flex flex-col mb-6 space-y-4">
            <div className="flex justify-between">
              <div className="w-2/3">
                <label htmlFor="email" className="text-primary-6 font-bold text-xl mb-2">Adresse e-mail</label>
              </div>
              <div className="w-1/3 text-right">
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={() => setIsEditingEmail(!isEditingEmail)} // Toggle editing mode
                >
                  {isEditingEmail ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>
            <div className="w-full">
              {isEditingEmail ? (
                <div className="flex flex-col gap-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Entrez votre e-mail"
                  />
                  <p className="text-sm text-gray-600">Ceci sera utilisé pour la connexion et la récupération du compte.</p>
                  <button
                    type="button"
                    onClick={handleSaveEmail} // Call handleSaveEmail to update the email
                    className="mt-2 flex justify-center items-center bg-[#3A556A] border-[#3A556A] text-white font-bold text-sm py-2 px-4 rounded-md shadow-md w-[110px] h-[40px] gap-0 rounded-l-md transition-opacity duration-300 ease-in-out opacity-100"
                  >
                    Enregistrer
                  </button>
                </div>
              ) : (
                <p className="text-lg text-gray-700">{email}</p> // Prefilled email
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-6"></div>

          {/* Row 2: Password */}
          <div className="flex flex-col mb-6 space-y-4">
            <div className="flex justify-between">
              <div className="w-2/3">
                <label htmlFor="password" className="text-primary-6 font-bold text-xl mb-2">Mot de passe</label>
              </div>
              <div className="w-1/3 text-right">
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={() => setIsEditingPassword(!isEditingPassword)} // Toggle editing mode
                >
                  {isEditingPassword ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>
            <div className="w-full">
              {isEditingPassword ? (
                <div className="flex flex-col gap-4">
                  {/* New Password */}
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={passwordVisible ? 'text' : 'password'}
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Nouveau mot de passe"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2"
                    >
                      {passwordVisible ? <FaEyeSlash size={20} className="text-gray-500" /> : <FaEye size={20} className="text-gray-500" />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={passwordVisible ? 'text' : 'password'}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Confirmer le mot de passe"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2"
                    >
                      {passwordVisible ? <FaEyeSlash size={20} className="text-gray-500" /> : <FaEye size={20} className="text-gray-500" />}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSavePassword} // Call handleSavePassword to update the password
                    className="mt-2 flex justify-center items-center bg-[#3A556A] border-[#3A556A] text-white font-bold text-sm py-2 px-4 rounded-md shadow-md w-[110px] h-[40px] gap-0 rounded-l-md transition-opacity duration-300 ease-in-out opacity-100"
                  >
                    Enregistrer
                  </button>
                </div>
              ) : (
                <p className="text-lg text-gray-700">******</p> // Placeholder for password field
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default Parametre;
