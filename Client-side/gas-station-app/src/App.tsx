import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet'
import './App.css';


function App() {
  return (
   
    <MapContainer center={[42.585444, 13.257684]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

          <Popup position={[42.585444, 13.257684]}>
            <div>
              <h2>italie</h2>
            </div>
          </Popup>
    </MapContainer>
  );
}

export default App;
