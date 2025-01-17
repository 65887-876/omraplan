import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';

const svgToDataURL = (svg) => {
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);
  return url;
};

const iconSvgString = renderToStaticMarkup(
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="yellow">
    <FaMapMarkerAlt />
  </svg>
);

const iconUrl = svgToDataURL(iconSvgString);

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={L.icon({
      iconUrl: iconUrl, 
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
      shadowSize: [50, 50],
    })} />
  );
}

const MapSelector = ({ location, setLocation }) => {
  return (
    <MapContainer
      center={[24.4692, 39.6143]} 
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="bg-white"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker setLocation={setLocation} />
      {location && <Marker position={location} icon={L.icon({
        iconUrl: iconUrl, 
        iconSize: [50, 50], 
        iconAnchor: [25, 50], 
        popupAnchor: [0, -50],
        shadowSize: [50, 50],
      })} />}
    </MapContainer>
  );
};

export default MapSelector;