import { Route, Routes, useLocation } from 'react-router-dom'; // Importing React Router
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
import CreateAnnonce from './Pages/CreateAnnonce';
import MesAnnonces from './Pages/MesAnnonces';
import HorairePriereMain from './Pages/HorairePriere/HorairePriereMain'; 
import VolsPage from './components/annonce/Vols/VolsPage';
import ChauffeurPage from './components/annonce/chauffeur/ChauffeurPage';
import ChauffeurDetails from './components/annonce/chauffeur/ChauffeurDetails';
import VolsDetails from './components/annonce/Vols/VolsDetails';
import GuideDetails from './components/annonce/Guide/GuideDetails';
import GuidePages from './components/annonce/Guide/GuidePages';
import BabySittersPage from './components/annonce/BabySitter/BabySittersPage';
import BabySitterDetails from './components/annonce/BabySitter/BabySittersDetails';
import SejoursPage from './components/annonce/Sejour/SejoursPage';
import SejourDetails from './components/annonce/Sejour/SejourDetails';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import HebergementsPage from './components/annonce/Hebergement/HebergementsPage';
import HebergementDetails from './components/annonce/Hebergement/HebergementDetails';
import VenteFlashPage from './components/annonce/venteflash/VenteFlashPage';
import TousLesVentesPage from './components/annonce/touslesventes/TousLesVentesPage';
import ScrollToTop from '../src/components/ScrollToTop';

const App = () => {
  const location = useLocation();

  // Determine if the current path starts with "/createannonce"
  const isCreateAnnonceRoute = location.pathname.startsWith('/createannonce');

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-full md:max-w-full">
      <ScrollToTop/> {/* j'i fixer ce bug <3 */ }

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={
              <>
                <Hero />
                <VentesFlash />
                <TousAnnonces />
                <ReductionOmra />
                <AutresService />
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/parametre" element={<Parametre />} />
          <Route path="/createannonce/*" element={<CreateAnnonce />} />
          <Route path="/mesAnnonces" element={<MesAnnonces />} />
          <Route path="/horairepriere" element={<HorairePriereMain />} /> 
          <Route path="/vols" element={<VolsPage />} /> 
          <Route path="/chauffeur" element={<ChauffeurPage />} /> 
          <Route path="/chauffeur/:id" element={<ChauffeurDetails />} />
          <Route path="/vols" element={<VolsPage/>} /> 
          <Route path="/vols/:id" element={<VolsDetails />} /> 
          <Route path="/guide" element={<GuidePages/>} /> 
          <Route path="/guide/:id" element={<GuideDetails />} /> 
          <Route path="/babysitter" element={<BabySittersPage/>} /> 
          <Route path="/babysitter/:id" element={<BabySitterDetails />} /> 
          <Route path="/sejours" element={<SejoursPage/>} /> 
          <Route path="/sejour/:id" element={<SejourDetails />} /> 
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/hebergement" element={<HebergementsPage />} />
          <Route path="/hebergement/:id" element={<HebergementDetails />} /> 
          <Route path="/venteflash" element={<VenteFlashPage />} />
          <Route path="/touslesventes" element={<TousLesVentesPage />} />


        </Routes>
        {!isCreateAnnonceRoute && <Footer />}
      </div>
    </div>
  );
};

export default App;