import { createContext, useContext, useState } from 'react';
import annonce from '../assets/assets';  // Assuming 'assets.js' is in the same folder

// Create a Context for the annonce data
const AnnonceContext = createContext();

// Create a provider component
export const AnnonceProvider = ({ children }) => {
  const [annonces, setAnnonces] = useState(annonce); // Set the initial state from the assets file

  return (
    <AnnonceContext.Provider value={{ annonces, setAnnonces }}>
      {children}
    </AnnonceContext.Provider>
  );
};

// Create a custom hook to use the context in other components
export const useAnnonces = () => useContext(AnnonceContext);
