import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pre-fill email from the first step if passed via navigation state
  const [profileData, setProfileData] = useState({
    prenom: '',
    kuniya: '',
    sexe: '',
    email: location.state?.email || '', // Retrieve email from the first step
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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/profile-setup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert('Profile completed successfully');
        navigate('/dashboard'); // Redirect to dashboard or another page
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Profile Setup Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={profileData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kuniya:</label>
          <input
            type="text"
            name="kuniya"
            value={profileData.kuniya}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sexe:</label>
          <select name="sexe" value={profileData.sexe} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            disabled // Email is pre-filled and cannot be changed
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>WhatsApp Number:</label>
          <input
            type="text"
            name="whatsappNumber"
            value={profileData.whatsappNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Facebook:</label>
          <input
            type="text"
            name="facebook"
            value={profileData.facebook}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={profileData.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Professional:
            <input
              type="checkbox"
              name="isProfessional"
              checked={profileData.isProfessional}
              onChange={handleChange}
            />
          </label>
        </div>
        {profileData.isProfessional && (
          <>
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={profileData.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Company Address:</label>
              <input
                type="text"
                name="companyAddress"
                value={profileData.companyAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Website:</label>
              <input
                type="text"
                name="website"
                value={profileData.website}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Company Phone:</label>
              <input
                type="text"
                name="companyPhone"
                value={profileData.companyPhone}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Complete Profile'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ProfileSetup;
