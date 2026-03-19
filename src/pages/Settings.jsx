import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaArrowLeft,
  FaMoon,
  FaSun,
  FaBell,
  FaLock,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaPalette,
  FaVolumeUp,
  FaShieldAlt,
  FaDatabase,
  FaTrash,
  FaDownload,
  FaUpload,
  FaCog,
  FaCheck,
  FaGraduationCap
} from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState("en");

  const settingsSections = [
    {
      title: "Appearance",
      icon: FaPalette,
      items: [
        {
          icon: darkMode ? FaSun : FaMoon,
          label: "Dark Mode",
          type: "toggle",
          value: darkMode,
          onChange: () => setDarkMode(!darkMode)
        },
        {
          icon: FaGlobe,
          label: "Language",
          type: "select",
          value: language,
          options: [
            { value: "en", label: "English" },
            { value: "sw", label: "Swahili" }
          ],
          onChange: setLanguage
        }
      ]
    },
    {
      title: "Notifications",
      icon: FaBell,
      items: [
        {
          icon: FaBell,
          label: "Push Notifications",
          type: "toggle",
          value: notifications,
          onChange: () => setNotifications(!notifications)
        },
        {
          icon: FaEnvelope,
          label: "Email Alerts",
          type: "toggle",
          value: emailAlerts,
          onChange: () => setEmailAlerts(!emailAlerts)
        },
        {
          icon: FaVolumeUp,
          label: "Sound Effects",
          type: "toggle",
          value: soundEnabled,
          onChange: () => setSoundEnabled(!soundEnabled)
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: FaShieldAlt,
      items: [
        {
          icon: FaLock,
          label: "Change Password",
          type: "link"
        },
        {
          icon: FaUser,
          label: "Privacy Settings",
          type: "link"
        },
        {
          icon: FaDatabase,
          label: "Data & Storage",
          type: "link"
        }
      ]
    },
    {
      title: "Data Management",
      icon: FaDatabase,
      items: [
        {
          icon: FaDownload,
          label: "Export My Data",
          type: "link"
        },
        {
          icon: FaUpload,
          label: "Import Data",
          type: "link"
        },
        {
          icon: FaTrash,
          label: "Clear Cache",
          type: "link",
          danger: true
        }
      ]
    }
  ];

  return (
    <div className="settings-page">
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
              <FaCog size={40} />
            </motion.div>
            <div className="title-text">
              <h1>Settings</h1>
              <p>Customize your experience</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* SETTINGS SECTIONS */}
      <div className="settings-content">
        {settingsSections.map((section, sectionIdx) => {
          const SectionIcon = section.icon;
          return (
            <motion.section
              key={section.title}
              className="settings-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <div className="settings-section-header">
                <div className="section-icon-wrapper">
                  <SectionIcon size={24} />
                </div>
                <h2>{section.title}</h2>
              </div>

              <div className="settings-list">
                {section.items.map((item, itemIdx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="settings-item"
                      style={{ animationDelay: `${itemIdx * 0.05}s` }}
                    >
                      <div className="settings-item-left">
                        <div className="item-icon" style={{ color: item.danger ? "#ef4444" : "#10b981" }}>
                          <ItemIcon size={20} />
                        </div>
                        <span className="item-label">{item.label}</span>
                      </div>

                      <div className="settings-item-right">
                        {item.type === "toggle" && (
                          <motion.button
                            className={`toggle-switch ${item.value ? "active" : ""}`}
                            onClick={item.onChange}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="toggle-knob"></div>
                          </motion.button>
                        )}

                        {item.type === "select" && (
                          <select
                            className="settings-select"
                            value={item.value}
                            onChange={(e) => item.onChange(e.target.value)}
                          >
                            {item.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {item.type === "link" && (
                          <motion.button
                            className={`settings-link ${item.danger ? "danger" : ""}`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Configure</span>
                            <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* APP INFO */}
      <motion.section
        className="settings-app-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="app-version">
          <FaGraduationCap className="app-icon" />
          <h3>KAFU AI Assistant</h3>
          <p>Version 1.0.0</p>
          <p className="copyright">© 2024 Kaimosi Friends University</p>
        </div>
      </motion.section>
    </div>
  );
}

export default Settings;
