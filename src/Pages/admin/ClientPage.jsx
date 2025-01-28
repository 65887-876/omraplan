import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ClientPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.kuniya.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleAnnoncesClick = (id) => {
    navigate(`/mesannonces/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-16 gap-16 bg-yellow-50 w-full min-h-screen">
      <div className="flex flex-col items-start gap-4 self-start">
        <div>
          <a href="/" className="text-secondary-6 font-medium">Accueil</a>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">Clients</span>
        </div>
        <h2 className="text-primary-8 font-plus-jakarta text-[40px] font-bold">Clients</h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Tous les clients ({filteredUsers.length})</h2>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            />
            <span className="absolute right-2 top-2 text-gray-400">

            </span>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kunya</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Société</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d’inscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre d'annonces</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.kuniya}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(user.dateInscription).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.totalAnnoncesCount}</td>
                <td className="px-6 py-4 whitespace-nowrap relative">
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="text-gray-500 hover:text-gray-700 p-2 focus:outline-none"
                  >
                    <FaEllipsisV />
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => handleAnnoncesClick(user._id)}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-left w-full"
                      >
                        Voir annonces
                      </button>
                      <button
                        onClick={() => handleProfileClick(user._id)}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-left w-full"
                      >
                        Voir fiche client
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPage;