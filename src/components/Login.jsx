import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'password') {
      setError(''); // Clear error message when user starts typing in the password field
    }
  };

  // Basic email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error
  
    if (!formData.email || !formData.password) {
      toast.error('Les deux champs sont requis.');
      return;
    }
  
    if (!isValidEmail(formData.email)) {
      toast.error('Veuillez entrer une adresse e-mail valide.');
      return;
    }
  
    setLoading(true);
  
    // Make the API request for login
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // If login is successful, save token and redirect
        localStorage.setItem('token', data.token); // Save the token to local storage
        toast.success('Connexion réussie');
        setFormData({ email: '', password: '' });
        navigate('/'); // Redirect to the home page or dashboard
        window.location.reload(); // Refresh the page

      } else {
        // If login fails (incorrect credentials or other error)
        setError(data.message || 'Échec de la connexion');
        toast.error(data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      toast.error('Erreur lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center py-24 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <h2 className="text-h2 font-semibold text-center text-gray-700 mb-6">Connectez-vous</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[380px] sm:w-[440px]">
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-plus-jakarta font-bold text-primary-6 mb-2">Adresse e-mail</label>
            <div className="flex items-center  border border-gray-300 rounded-md px-3">
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

          <div className="mb-6">
            <label htmlFor="password" className="block font-plus-jakarta font-bold text-primary-6 mb-2">Mot de passe</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaLock className="text-gray-400" />
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Votre mot de passe"
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

          <button
            type="submit"
            className="w-full py-3 bg-primary-6 text-white rounded-md hover:bg-primary-5 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400">Ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
          
        </div>
        <button
      className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-lg font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <FaGoogle className="w-5 h-5 text-red-500" />
      Continuer avec Google
      </button>
      </div>
      <div className="text-center mt-4">
          <p className="text-body-large font-medium text-gray-600">
            Vous n'avez pas de compte ? 
            <Link to="/signup" className="text-secondary-7 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
