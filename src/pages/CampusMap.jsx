import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { motion } from "framer-motion";
import "../styles/Home.css";

const containerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "12px",
  overflow: "hidden",
};

const campusCenter = { lat: 0.1284, lng: 34.8466 };

// Predefined campus locations
const campusLocations = [
  { name: "KAFU Library", position: { lat: 0.12870276929540347, lng: 34.847789094595264 } },
  { name: "Admin Office", position: { lat: 0.1278568206940331, lng: 34.84778497362738 } },
  { name: "Cafeteria", position: { lat: 0.1278486673907951, lng: 34.848760400753875 } },
  { name: "Campus Gate", position: { lat: 0.1276964427303656, lng: 34.84862656799445 } },
  { name: "Tuition Block", position: { lat: 0.12952626718556268, lng: 34.84603136640912 } },
  { name: "ICT Labs", position: { lat: 0.12868149757611938, lng: 34.84791759882965 } },
  { name: "Assembly Hall", position: { lat: 0.1282272747087612, lng: 34.84806193169177 } },
];

function CampusMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([{ position: campusCenter, name: "Campus Center" }]);
  const searchBoxRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDhkfpYRDnRaTqflKDV8ClYUYrd-a0qCNk", // Replace with your API key
    libraries: ["places"],
  });

  const onMapLoad = (mapInstance) => setMap(mapInstance);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const newMarkers = places.map((place) => ({
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      name: place.name,
    }));

    setMarkers(newMarkers);
    map.panTo(newMarkers[0].position);
    map.setZoom(17);
  };

  const goToLocation = (location) => {
    setMarkers([{ position: location.position, name: location.name }]);
    map.panTo(location.position);
    map.setZoom(18);
  };

  return isLoaded ? (
    <div
      className="main"
      style={{
        paddingBottom: "30px",
        maxHeight: "calc(100vh - 0px)",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      {/* Welcome */}
      <motion.div
        className="welcome"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Campus Map</h1>
        <p>Explore locations around Kaimosi Friends University</p>
      </motion.div>

      {/* Search Bar */}
      <div className="map-search-bar" style={{ padding: "0 30px", marginBottom: "20px" }}>
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a location..."
            className="search-map-input"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "2px solid #e5e7eb",
              fontSize: "14px",
              transition: "0.3s",
            }}
          />
        </StandaloneSearchBox>
      </div>

      {/* Feature Cards */}
      <div className="cards" style={{ padding: "0 30px 20px 30px" }}>
        {campusLocations.map((loc, idx) => (
          <motion.div
            key={idx}
            className="card"
            onClick={() => goToLocation(loc)}
            whileHover={{ scale: 1.05 }}
            style={{
              cursor: "pointer",
              padding: "20px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              marginBottom: "15px",
            }}
          >
            <h3>{loc.name}</h3>
            <p>Click to locate on map</p>
          </motion.div>
        ))}
      </div>

      {/* Google Map */}
      <div style={{ padding: "0 30px", marginBottom: "30px" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={campusCenter}
          zoom={16}
          onLoad={onMapLoad}
        >
          {markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={marker.position}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // standard red marker
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 40), // anchor the tip of the marker
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>Loading Map...</div>
  );
}

export default CampusMap;