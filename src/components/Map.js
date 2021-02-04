import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { showDataOnMap } from '../utils';

const Map = ({ casesType }) => {
  const covidData = useSelector((state) => state.covid.covidData);
  const { lat, lng, zoom } = useSelector((state) => state.covid.coordinates);
  
  


  return (
    <div className="map">
      <LeafletMap center={[lat, lng]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(covidData, casesType)}
      </LeafletMap>
    </div>
  );
};

// function MyComponent() {
//   const map = useMap();
//   console.log('map center:', map.getCenter());
//   return null;
// }

export default Map;
