import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Your global CSS
import { AnnonceProvider } from './context/context'; // Adjust the path if necessary
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="859231843876-ue4golap0ndirm2tq03ddi0d3geiu65h.apps.googleusercontent.com"> {/* ce nait pas encore fait */ }
      <AnnonceProvider>
        <Router>
          <App />
        </Router>
      </AnnonceProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
