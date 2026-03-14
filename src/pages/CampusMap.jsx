import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const containerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "14px",
};

const campusCenter = { lat: 0.1284, lng: 34.8466 };

// Campus locations with descriptions
const campusLocations = [
  {
    name: "KAFU Library",
    description: "Main university library for study and research.",
    hours: "Open: 8AM – 9PM",
    position: { lat: 0.12870276929540347, lng: 34.847789094595264 },
  },
  {
    name: "Admin Office",
    description: "Main administration building.",
    hours: "Open: 8AM – 5PM",
    position: { lat: 0.1278568206940331, lng: 34.84778497362738 },
  },
  {
    name: "Cafeteria",
    description: "Student dining and refreshments area.",
    hours: "Open: 7AM – 8PM",
    position: { lat: 0.1278486673907951, lng: 34.848760400753875 },
  },
  {
    name: "Campus Gate",
    description: "Main entrance to the university campus.",
    hours: "Open: 24 Hours",
    position: { lat: 0.1276964427303656, lng: 34.84862656799445 },
  },
  {
    name: "Tuition Block",
    description: "Lecture halls and classrooms.",
    hours: "Open: 8AM – 6PM",
    position: { lat: 0.12952626718556268, lng: 34.84603136640912 },
  },
  {
    name: "ICT Labs",
    description: "Computer labs for programming and ICT studies.",
    hours: "Open: 8AM – 8PM",
    position: { lat: 0.12868149757611938, lng: 34.84791759882965 },
  },
  {
    name: "Assembly Hall",
    description: "Main hall for meetings and university events.",
    hours: "Open: Events Only",
    position: { lat: 0.1282272747087612, lng: 34.84806193169177 },
  },
];

function CampusMap() {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB_2_W77GP28ASsm0CER3MxAbN2o90kFQY",
    libraries: ["places"],
  });

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  // SEARCH
  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const newPosition = {
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
    };

    map.panTo(newPosition);
    map.setZoom(18);
  };

  // CARD CLICK
  const goToLocation = (location) => {
    if (!map) return;

    map.panTo(location.position);
    map.setZoom(19);
    setSelectedLocation(location);
  };

  return isLoaded ? (
    <div
      className="main"
      style={{
        paddingBottom: "40px",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      {/* BACK BUTTON */}
      <div style={{ padding: "20px 30px 0 30px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#16a34a",
            border: "none",
            color: "white",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* HEADER */}
      <motion.div
        style={{
          background: "linear-gradient(135deg,#22c55e,#16a34a)",
          padding: "40px",
          borderRadius: "0 0 20px 20px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          marginBottom: "30px",
        }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          Kaimosi Friends University Map
        </h1>
        <p style={{ opacity: 0.9 }}>
          Navigate campus buildings and facilities easily
        </p>
      </motion.div>

      {/* SEARCH */}
      <div style={{ padding: "0 30px", marginBottom: "30px" }}>
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <motion.input
            type="text"
            placeholder="🔍 Search campus or any location..."
            whileFocus={{ scale: 1.03 }}
            style={{
              width: "100%",
              padding: "15px 20px",
              borderRadius: "12px",
              border: "2px solid #22c55e",
              outline: "none",
              fontSize: "16px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          />
        </StandaloneSearchBox>
      </div>

      {/* CARD SLIDER */}
      <div style={{ padding: "0 30px", marginBottom: "35px" }}>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            scrollBehavior: "smooth",
            paddingBottom: "10px",
          }}
        >
          {campusLocations.map((loc, idx) => (
            <motion.div
              key={idx}
              onClick={() => goToLocation(loc)}
              whileHover={{ scale: 1.1 }}
              style={{
                minWidth: "240px",
                padding: "20px",
                borderRadius: "16px",
                cursor: "pointer",
                color: "white",
                background:
                  "linear-gradient(135deg,#3b82f6,#6366f1,#9333ea)",
                boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h3>{loc.name}</h3>
              <p style={{ opacity: 0.9 }}>Click to locate on map</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MAP */}
      <div style={{ padding: "0 30px" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={campusCenter}
          zoom={16}
          onLoad={onMapLoad}
        >
          {campusLocations.map((loc, idx) => (
            <Marker
              key={idx}
              position={loc.position}
              onClick={() => setSelectedLocation(loc)}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-pushpin.png",
              }}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div style={{ maxWidth: "200px" }}>
                <h3>{selectedLocation.name}</h3>
                <p>{selectedLocation.description}</p>
                <p style={{ color: "green", fontWeight: "bold" }}>
                  {selectedLocation.hours}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <div style={{ padding: "40px", textAlign: "center" }}>
      Loading Campus Map...
    </div>
  );
}

export default CampusMap;