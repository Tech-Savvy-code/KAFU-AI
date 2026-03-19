import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaArrowLeft,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEdit,
  FaCamera,
  FaBook,
  FaAward,
  FaCalendarAlt
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
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
              <FaUserCircle size={40} />
            </motion.div>
            <div className="title-text">
              <h1>My Profile</h1>
              <p>Your account information</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* PROFILE CARD */}
      <motion.section
        className="profile-header-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="profile-card">
          <div className="profile-cover"></div>
          <div className="profile-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                <FaUserCircle size={80} />
              </div>
              <motion.button
                className="avatar-camera-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaCamera size={14} />
              </motion.button>
            </div>

            <div className="profile-info">
              <h2>Opiyo Nickson</h2>
              <p className="profile-major">Bachelor of Education - Year 2</p>
              <div className="profile-details">
                <div className="detail-item">
                  <FaEnvelope />
                  <span>opiyo.nickson@kafu.ac.ke</span>
                </div>
                <div className="detail-item">
                  <FaPhone />
                  <span>+254 700 123 456</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>Kaimosi, Kenya</span>
                </div>
              </div>
            </div>

            <motion.button
              className="edit-profile-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit />
              <span>Edit Profile</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* QUICK INFO CARDS */}
      <motion.section
        className="profile-stats-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-title">
          <FaGraduationCap />
          <h2>Academic Info</h2>
        </div>
        <div className="profile-info-cards">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="info-icon" style={{ color: "#10b981" }}>
              <FaBook size={28} />
            </div>
            <div className="info-content">
              <h3>Current Courses</h3>
              <p>6 courses this semester</p>
            </div>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -5 }}
          >
            <div className="info-icon" style={{ color: "#6366f1" }}>
              <FaAward size={28} />
            </div>
            <div className="info-content">
              <h3>Achievements</h3>
              <p>12 badges earned</p>
            </div>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <div className="info-icon" style={{ color: "#f59e0b" }}>
              <FaCalendarAlt size={28} />
            </div>
            <div className="info-content">
              <h3>Academic Year</h3>
              <p>Year 2 - Semester 3</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Profile;
