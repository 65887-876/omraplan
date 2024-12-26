import { Route, Routes } from 'react-router-dom'; // Importing React Router
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VentesFlash from './components/VentesFlash';
import Footer from './components/Footer';
import ReductionOmra from './components/ReductionOmra';
import AutresService from './components/AutresService';
import TousAnnonces from './components/TousAnnonce';

import Login from './components/Login';    
import Profile from './components/Profile';  
import Parametre from './components/parametre';
import SignUp from './components/SignUp';


const App = () => {
  
  return (
    <div className="min-h-screen overflow-x-hidden ">
      <div className="mx-auto max-w-full md:max-w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <VentesFlash />
              <TousAnnonces />
              <ReductionOmra />
              <AutresService />
            </>
          } />
          <Route path="/signup" element={<SignUp />} /> {/* Path for Step 2 of Signup */}
          <Route path="/login" element={<Login />} />     {/* Path for Login */}
          
          {/* Profile route */}
          <Route path="/profile" element={<Profile />} /> {/* Path for Profile page */}
          <Route path="/parametre" element={<Parametre />} /> {/* Path for Profile page */}
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
