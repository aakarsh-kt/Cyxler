import React, { useEffect } from "react";
import { coordinates } from "./coordinates";
const apiKey = import.meta.env.VITE_API_KEY;

const Map = (props) => {
  useEffect(() => {
    // Load the Google Maps JavaScript API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize the map once the script is loaded
    window.initMap = initMap;

    // Clean up function to remove the script from the DOM
    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, [props]);
  // Function to initialize the map
  const initMap = () => {
    // Create a new map instance
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 26.473027, lng: 73.1140635 }, // Default center (San Francisco)
      zoom: 17, // Default zoom level
    });
    console.log(props.markerPositions.length);
    const marker = new google.maps.Marker({
      position: { lat: 26.483, lng: 73.115 },
      map: map, // Set the map for the marker
    });
    props.markerPositions.forEach((position) => {
      const cor = coordinates.filter((cord) => {
        if (cord.loc === position) {
          return cord;
        }
      });
      
      console.log(cor);
      new google.maps.Marker({
        position: { lat: cor[0].cord.lat, lng: cor[0].cord.lng },
        map: map, // Set the map for the marker
      });
    });
    // You can add more map options, markers, etc. here
  };

  return <div id="map"></div>;
};

export default Map;
