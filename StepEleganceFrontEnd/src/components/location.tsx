import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Location: React.FC = () => {
  const storeLocation = [/* Your store's latitude */, /* Your store's longitude */];

  return (
    <MapContainer
      center={storeLocation}
      zoom={13}
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={storeLocation}>
        <Popup>Your Store</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Location;
