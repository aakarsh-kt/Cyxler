// import React, { useEffect } from "react";
import { coordinates } from "./coordinates";
const apiKey = import.meta.env.VITE_API_KEY;
// async function initMap() {
//   // Request needed libraries.
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
//   const map = new Map(document.getElementById("map"), {
//     center: { lat: 26.473027, lng: 73.1140635 },
//     zoom: 17,
//     mapId: "4504f8b37365c3d0",
//   });
//   const marker = new AdvancedMarkerElement({
//     map,
//     position: { lat: 37.4239163, lng: -122.0947209 },
//   });
// }
// const Map =async (props) => {
    
//   //   useEffect(() => {
//   //   // Load the Google Maps JavaScript API script
//   //   const script = document.createElement("script");
//   //   script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
//   //   script.async = true;
//   //   document.head.appendChild(script);

//   //   // Initialize the map once the script is loaded
//   //   window.initMap = initMap;

//   //   // Clean up function to remove the script from the DOM
//   //   return () => {
//   //     document.head.removeChild(script);
//   //     delete window.initMap;
//   //   };
//   // }, [props]);
//   // Function to initialize the map
  
//   initMap();
//   // const initMap = () => {
//   //   // Create a new map instance
//   //   const map = new window.google.maps.Map(document.getElementById("map"), {
//   //     center: { lat: 26.473027, lng: 73.1140635 }, // Default center (San Francisco)
//   //     zoom: 17, // Default zoom level
//   //   });
//   //   console.log(props.markerPositions.length);
//   //   const marker = new google.maps.Marker({
//   //     position: { lat: 26.483, lng: 73.115 },
//   //     map: map, // Set the map for the marker
//   //   });
//   //   props.markerPositions.forEach((position) => {
//   //     const cor = coordinates.filter((cordi) => {
//   //       if (cordi.loc === position) {
//   //         return cordi;
//   //       }
//   //     });
//   //     const pinBackground = new PinElement({
//   //       background: "#FBBC04",
//   //     });
//   //     console.log(cor);
//   //     // new google.maps.Marker({
//   //     //   position: { lat: cor[0].cord.lat, lng: cor[0].cord.lng },
//   //     //   map: map, // Set the map for the marker
        
//   //     // });
//   //     // const markerViewBackground =
//   //      new AdvancedMarkerElement({
//   //       map,
//   //       position: { lat: 37.419, lng: -122.01 },
//   //       content: pinBackground.element,
//   //     });
//   //   });
    
//   //   // You can add more map options, markers, etc. here
//   // };

//   return <div id="map"></div>;
// };

// export default Map;
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
  const [mks,setMks]=React.useState([{ id: 1, cord: { lat: 26.483, lng: 73.115  } }]);
//   React.useEffect(() => {
//       console.log(mks)
//   props.markerPositions.forEach((position,item) => {
//     console.log(position,item);
//     coordinates.forEach((cordi) => {
//       console.log(cordi)
//       if (cordi.loc === position) {
//         setMks(prevMks => [...prevMks, { id: item, cord: cordi.cord }]);
//       }
//     });

//   })
// },[props.markerPositions]);
    
  // const markers = [...mks,
  //   { id: 1, cord: { lat: 26.483, lng: 73.115  } },
  //   { id: 2, cord: { lat: -34.389, lng: 150.654 } },
    
  // ]
  const getCustomIcon = (color) => ({
    url: `green_pin4.png`, // Path to the custom marker image
    scaledSize: new google.maps.Size(30, 45) // Adjust size as needed
  });

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
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
    </LoadScript>
  )
}

