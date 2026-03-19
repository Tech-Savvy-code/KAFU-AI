import React, { useState, useEffect } from "react";
import "../styles/Home.css";

import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import AIChat from "../components/AIChat";
import { Link } from "react-router-dom";

import {
  FaRobot,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaCog,
  FaBell,
  FaQuestionCircle,
  FaMagic,
  FaGraduationCap,
  FaBook,
  FaClock,
  FaComments,
  FaTimes
} from "react-icons/fa";

import { MdSchool, MdOutlineEmojiEvents } from "react-icons/md";
import { IoLocationSharp, IoChatbubbleEllipses } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi";
import { BsCalendarEvent } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [input, setInput] = useState("");

  /* QUICK QUESTIONS */
  const quickQuestion = (question) => {
    setInput(question);
    setActiveFeature(question);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* GRADIENT ORBS */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* SHIMMER EFFECT */}
      <div className="shimmer-overlay"></div>

      {/* PARTICLE BACKGROUND */}
      <ParticlesBackground />

      {/* SIDEBAR */}
      <motion.aside 
        className="sidebar"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="logo">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaRobot size={32} className="logo-icon" />
          </motion.div>
          <div className="logo-text">
            <h2>KAFU AI</h2>
            <span className="logo-subtitle">Campus Assistant</span>
          </div>
        </div>

        <motion.button 
          className="newChat"
          whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(16,185,129,0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaMagic className="sparkle-icon" />
          <span>New Chat</span>
        </motion.button>

        <nav className="menu">
          <Link to="/map" className="menuItem">
            <IoLocationSharp className="menu-icon" />
            <span>Campus Map</span>
          </Link>

          <Link to="/programs" className="menuItem">
            <MdSchool className="menu-icon" />
            <span>Programs</span>
          </Link>

          <Link to="/documents" className="menuItem">
            <HiDocumentText className="menu-icon" />
            <span>Documents</span>
          </Link>

          <Link to="/calendar" className="menuItem">
            <BsCalendarEvent className="menu-icon" />
            <span>Academic Calendar</span>
          </Link>
        </nav>

        {/* SEPARATOR LINE */}
        <div className="sidebar-separator"></div>

        {/* EXTRA FEATURES */}
        <div className="menu extraMenu">
          <Link to="/profile" className="menuItem">
            <FaUserCircle className="menu-icon" />
            <span>Profile</span>
          </Link>
          <Link to="/settings" className="menuItem">
            <FaCog className="menu-icon" />
            <span>Settings</span>
          </Link>
          <Link to="/notifications" className="menuItem">
            <FaBell className="menu-icon" />
            <span>Notifications</span>
          </Link>
          <Link to="/help" className="menuItem">
            <FaQuestionCircle className="menu-icon" />
            <span>Help</span>
          </Link>
        </div>

        {/* UNIVERSITY BADGE */}
        <div className="university-badge">
          <FaGraduationCap size={24} />
          <div className="badge-text">
            <span>Kaimosi Friends</span>
            <strong>University</strong>
          </div>
        </div>
      </motion.aside>

      {/* MAIN AREA */}
      <main className="main">
        {/* TOP BAR */}
        <motion.header 
          className="topbar"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="search-container">
            <input 
              className="search" 
              placeholder="Search university information..." 
            />
            <div className="search-glow"></div>
          </div>
          
          <div className="controls">
            <motion.button 
              onClick={() => setDarkMode(!darkMode)} 
              className="iconBtn theme-toggle"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
            
            <motion.button 
              className="iconBtn notification-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBell />
              <span className="notification-dot"></span>
            </motion.button>
            
            <motion.div 
              className="user-avatar"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserCircle size={28} />
            </motion.div>
          </div>
        </motion.header>

        {/* WELCOME SECTION */}
        <motion.section 
          className="welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="welcome-content">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              className="welcome-icon"
            >
              <FaRobot size={40} />
            </motion.div>
            
            <div className="welcome-text">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to <span className="gradient-text">KAFU AI</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Your intelligent campus assistant powered by university data
              </motion.p>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="stats-container">
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <FaBook className="stat-icon" />
              <div className="stat-info">
                <h3>50+</h3>
                <p>Programs</p>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <GrTechnology className="stat-icon" />
              <div className="stat-info">
                <h3>AI</h3>
                <p>Powered</p>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <MdOutlineEmojiEvents className="stat-icon" />
              <div className="stat-info">
                <h3>24/7</h3>
                <p>Available</p>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <FaClock className="stat-icon" />
              <div className="stat-info">
                <h3>Real</h3>
                <p>Time Info</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* FEATURE CARDS */}
        <motion.section 
          className="cards-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="section-title">
            <IoChatbubbleEllipses className="title-icon" />
            <h2>Quick Access</h2>
          </div>

          <div className="cards">
            <motion.div 
              className="card location-card"
              onClick={() => quickQuestion("Where is the university library?")}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-wrapper">
                <IoLocationSharp size={32} />
              </div>
              <h3>Campus Map</h3>
              <p>Find locations & buildings</p>
              <div className="card-glow"></div>
            </motion.div>

            <motion.div 
              className="card programs-card"
              onClick={() => quickQuestion("What programs are offered at KAFU?")}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-wrapper">
                <MdSchool size={32} />
              </div>
              <h3>Programs</h3>
              <p>Explore academic courses</p>
              <div className="card-glow"></div>
            </motion.div>

            <motion.div 
              className="card documents-card"
              onClick={() => quickQuestion("Show university documents")}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-wrapper">
                <HiDocumentText size={32} />
              </div>
              <h3>Documents</h3>
              <p>Resources & files</p>
              <div className="card-glow"></div>
            </motion.div>

            <motion.div 
              className="card calendar-card"
              onClick={() => quickQuestion("Show academic calendar")}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-wrapper">
                <BsCalendarEvent size={32} />
              </div>
              <h3>Calendar</h3>
              <p>Important dates & events</p>
              <div className="card-glow"></div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* CHAT TOGGLE BUTTON */}
      <div className="chat-button-container">
        <motion.button
          className="chat-toggle-btn pulse"
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isChatOpen ? <FaTimes /> : <FaComments />}
        </motion.button>
        <div className="chat-tooltip">
          <span>💬 Chat with KAFU AI - Click here!</span>
        </div>
      </div>

      {/* AI CHAT MODAL */}
      <AnimatePresence>
        {isChatOpen && (
          <AIChat
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
