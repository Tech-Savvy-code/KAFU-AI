import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "@react-google-maps/api";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaMapMarkedAlt,
  FaSearch,
  FaArrowLeft,
  FaClock,
  FaInfoCircle,
  FaWalking,
  FaBuilding,
  FaBook,
  FaUtensils,
  FaLaptop,
  FaUsers
} from "react-icons/fa";

const containerStyle = {
  width: "100%",
  minHeight: "550px",
  borderRadius: "20px"
};

const campusCenter = { lat: 0.1284, lng: 34.8466 };
const campusGate = { lat: 0.1276964427303656, lng: 34.84862656799445 };

const campusLocations = [
  {
    name: "KAFU Library",
    description: "Main university library for study and research.",
    hours: "Open: 8AM – 9PM",
    position: { lat: 0.12828600563406842, lng: 34.84731776287294 },
    icon: FaBook,
    color: "#10b981"
  },
  {
    name: "Admin Office",
    description: "Main administration building.",
    hours: "Open: 8AM – 5PM",
    position: { lat: 0.1278568206940331, lng: 34.84778497362738 },
    icon: FaBuilding,
    color: "#6366f1"
  },
  {
    name: "Cafeteria",
    description: "Student dining area.",
    hours: "Open: 7AM – 8PM",
    position: { lat: 0.1278486673907951, lng: 34.848760400753875 },
    icon: FaUtensils,
    color: "#f59e0b"
  },
  {
    name: "Campus Gate",
    description: "Main entrance to university",
    hours: "Open: 24 Hours",
    position: { lat: 0.1276964427303656, lng: 34.84862656799445 },
    icon: FaMapMarkedAlt,
    color: "#ec4899"
  },
  {
    name: "Tuition Block",
    description: "Lecture halls and classrooms",
    hours: "Open: 8AM – 6PM",
    position: { lat: 0.12952626718556268, lng: 34.84603136640912 },
    icon: FaUsers,
    color: "#8b5cf6"
  },
  {
    name: "ICT Labs",
    description: "Computer labs for ICT students",
    hours: "Open: 8AM – 8PM",
    position: { lat: 0.12868149757611938, lng: 34.84791759882965 },
    icon: FaLaptop,
    color: "#06b6d4"
  },
  {
    name: "Assembly Hall",
    description: "University events hall",
    hours: "Open: Events Only",
    position: { lat: 0.1282272747087612, lng: 34.84806193169177 },
    icon: FaUsers,
    color: "#ef4444"
  }
];

function CampusMap() {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [search, setSearch] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDhkfpYRDnRaTqflKDV8ClYUYrd-a0qCNk",
    libraries: ["places"]
  });

  // Route calculation
  useEffect(() => {
    if (!destination || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: campusGate,
        destination: destination,
        travelMode: window.google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.log("Directions request failed:", status);
        }
      }
    );
  }, [destination]);

  // Search function
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const found = campusLocations.find(loc =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );

    if (found) {
      setSelectedLocation(found);
      setDestination(found.position);

      if (mapRef.current) {
        mapRef.current.panTo(found.position);
        mapRef.current.setZoom(18);
      }
    }
  };

  // Go to location
  const goToLocation = (location) => {
    setSelectedLocation(location);
    setDestination(location.position);

    if (mapRef.current) {
      mapRef.current.panTo(location.position);
      mapRef.current.setZoom(18);
    }
  };

  return isLoaded ? (
    <div className="campus-map-page">
      {/* GRADIENT ORBS */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      {/* HEADER */}
      <motion.header
        className="page-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.button
            className="back-btn"
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </motion.button>

          <div className="header-title">
            <motion.div
              className="title-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <FaMapMarkedAlt size={40} />
            </motion.div>
            <div className="title-text">
              <h1>Campus Map</h1>
              <p>Navigate KAFU buildings with ease</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* SEARCH BAR */}
      <motion.section
        className="search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search campus buildings..."
            className="search-input"
          />
          {search && (
            <motion.button
              className="clear-btn"
              onClick={() => setSearch("")}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ×
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* LOCATION CARDS */}
      <motion.section
        className="cards-slider-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-label">
          <FaInfoCircle />
          <span>Tap a card to locate on map</span>
        </div>
        <div className="cards-slider">
          {campusLocations.map((loc, idx) => {
            const IconComponent = loc.icon;
            return (
              <motion.div
                key={idx}
                className="location-card"
                onClick={() => goToLocation(loc)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: `linear-gradient(135deg, ${loc.color}, ${loc.color}dd)`
                }}
              >
                <div className="card-icon-wrapper">
                  <IconComponent size={28} />
                </div>
                <h3>{loc.name}</h3>
                <div className="card-hours">
                  <FaClock size={12} />
                  <span>{loc.hours}</span>
                </div>
                <div className="card-overlay"></div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* MAP */}
      <motion.section
        className="map-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={campusCenter}
            zoom={16}
            onLoad={(map) => (mapRef.current = map)}
          >
            {campusLocations.map((loc, idx) => (
              <Marker
                key={idx}
                position={loc.position}
                onClick={() => setSelectedLocation(loc)}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="${loc.color}" stroke="white" stroke-width="3"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${idx + 1}</text></svg>`
                  )}`
                }}
              />
            ))}

            <AnimatePresence>
              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.position}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className="info-window">
                    <h3>{selectedLocation.name}</h3>
                    <p>{selectedLocation.description}</p>
                    <div className="info-hours">
                      <FaClock />
                      <span>{selectedLocation.hours}</span>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </AnimatePresence>

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#10b981",
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                  }
                }}
              />
            )}
          </GoogleMap>

          {/* MAP LEGEND */}
          <div className="map-legend">
            <FaWalking />
            <span>Walking directions from Campus Gate</span>
          </div>
        </div>
      </motion.section>
    </div>
  ) : (
    <div className="loading-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="spinner"
      />
      <p>Loading Campus Map...</p>
    </div>
  );
}

export default CampusMap;
