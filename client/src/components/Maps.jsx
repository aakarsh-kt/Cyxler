// import React, { useEffect } from "react";
import { coordinates } from "./coordinates";
const apiKey = import.meta.env.VITE_API_KEY;

import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const containerStyle = {
  width: '70vw',
  height: '70vh'
};

const center = {
  lat: 26.473027, lng: 73.1140635
};

export default  function (props) {
  const [selected, setSelected] = React.useState(null);
  

  const getCustomIcon = (color) => ({
    url: `green_pin4.png`, // Path to the custom marker image
    scaledSize: new google.maps.Size(30, 45) // Adjust size as needed
  });

  return (
    // <LoadScript
    //   googleMapsApiKey={apiKey}
    // >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
       
        
      >
      {  console.log(props.exportCord)}
        {props.exportCord.map(marker => (
          <Marker 
            key={marker.id}
            position={marker.cordi}
            backgroundColor="#green"
            onClick={() => setSelected(marker)}
            //     Optional: Custom marker icon
            icon={getCustomIcon('green')}
            // icon={{
            //   url: '/path/to/custom/icon.png',
            //   scaledSize: new wind ow.google.maps.Size(30, 30)
            // }}
          />
        ))}

        {selected && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.title}</h2>
              <p>Marker details can go here</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    // </LoadScript>
  )
}

