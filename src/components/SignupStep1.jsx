import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function SignupStep1() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Tous les champs sont requis.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup-step-1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Inscription réussie, passez à l\'étape suivante.');
        navigate('/signup-step-2', { state: { email: formData.email } });
      } else {
        toast.error(data.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      toast.error(`Une erreur est survenue, veuillez réessayer. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center py-12 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <h2 className="text-h1 font-semibold text-center text-gray-700 mb-6">Inscrivez-vous</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[440px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm mb-2">Adresse e-mail</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaEnvelope className="text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="exemple@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm mb-2">Mot de passe</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaLock className="text-gray-400" />
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Au moins 8 caractères."
                value={formData.password}
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
            <label htmlFor="confirmPassword" className="block text-gray-600 text-sm mb-2">Confirmer mot de passe</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaLock className="text-gray-400" />
              <input
                id="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmer mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="text-gray-400"
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-6 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Continuer'}
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default SignupStep1;
