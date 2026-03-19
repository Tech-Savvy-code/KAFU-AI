import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaArrowLeft,
  FaBell,
  FaBook,
  FaCalendarAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaStar,
  FaClock,
  FaTrash,
  FaCheck,
  FaEnvelope,
  FaAward,
  FaMapMarkerAlt,
  FaFileAlt
} from "react-icons/fa";

function Notifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // all, unread, important
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Exam Schedule Released",
      message: "Final exam timetable for Spring 2024 is now available on the student portal.",
      type: "academic",
      time: "5 minutes ago",
      read: false,
      important: true,
      icon: FaBook,
      color: "#10b981"
    },
    {
      id: 2,
      title: "Fee Payment Reminder",
      message: "Your tuition fee payment is due in 7 days. Please pay before the deadline to avoid penalties.",
      type: "important",
      time: "1 hour ago",
      read: false,
      important: true,
      icon: FaExclamationCircle,
      color: "#ef4444"
    },
    {
      id: 3,
      title: "New Event: Career Fair 2024",
      message: "Join us for the annual career fair on November 8th. Top employers will be recruiting.",
      type: "event",
      time: "3 hours ago",
      read: false,
      important: false,
      icon: FaCalendarAlt,
      color: "#6366f1"
    },
    {
      id: 4,
      title: "Assignment Graded",
      message: "Your Educational Psychology assignment has been graded. Check your results.",
      type: "academic",
      time: "Yesterday",
      read: true,
      important: false,
      icon: FaFileAlt,
      color: "#06b6d4"
    },
    {
      id: 5,
      title: "Library Book Due",
      message: "The book 'Teaching Methods' is due for return in 3 days.",
      type: "reminder",
      time: "Yesterday",
      read: true,
      important: false,
      icon: FaClock,
      color: "#f59e0b"
    },
    {
      id: 6,
      title: "Achievement Unlocked!",
      message: "Congratulations! You've earned the 'Quick Learner' badge for completing 5 modules.",
      type: "achievement",
      time: "2 days ago",
      read: true,
      important: false,
      icon: FaAward,
      color: "#ec4899"
    },
    {
      id: 7,
      title: "Campus Maintenance",
      message: "ICT Labs will be closed for maintenance on Saturday, 9 AM - 2 PM.",
      type: "announcement",
      time: "3 days ago",
      read: true,
      important: false,
      icon: FaMapMarkerAlt,
      color: "#8b5cf6"
    },
    {
      id: 8,
      title: "New Message from Admin",
      message: "You have a new message regarding your student records. Please check your inbox.",
      type: "message",
      time: "Last week",
      read: true,
      important: false,
      icon: FaEnvelope,
      color: "#3b82f6"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read;
    if (filter === "important") return notif.important;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
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
              <FaBell size={40} />
            </motion.div>
            <div className="title-text">
              <h1>Notifications</h1>
              <p>{unreadCount > 0 ? `${unreadCount} unread messages` : "All caught up!"}</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* FILTER & ACTIONS */}
      <motion.section
        className="notifications-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-tab ${filter === "unread" ? "active" : ""}`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            className={`filter-tab ${filter === "important" ? "active" : ""}`}
            onClick={() => setFilter("important")}
          >
            Important
          </button>
        </div>

        <div className="action-buttons">
          {unreadCount > 0 && (
            <motion.button
              className="action-btn-small"
              onClick={markAllAsRead}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCheck />
              <span>Mark All Read</span>
            </motion.button>
          )}
          {notifications.length > 0 && (
            <motion.button
              className="action-btn-small danger"
              onClick={clearAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash />
              <span>Clear All</span>
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* NOTIFICATIONS LIST */}
      <motion.section
        className="notifications-list-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, idx) => {
              const IconComponent = notif.icon;
              return (
                <motion.div
                  key={notif.id}
                  className={`notification-card ${!notif.read ? "unread" : ""} ${notif.important ? "important" : ""}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notification-color-bar" style={{ background: notif.color }}></div>
                  
                  <div className="notification-content">
                    <div className="notification-header">
                      <div className="notification-icon-wrapper" style={{ color: notif.color }}>
                        <IconComponent size={22} />
                      </div>
                      
                      <div className="notification-actions">
                        {!notif.read && <div className="unread-dot"></div>}
                        {notif.important && <FaStar className="star-icon" />}
                        <motion.button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash size={14} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="notification-body">
                      <h4>{notif.title}</h4>
                      <p>{notif.message}</p>
                      <div className="notification-meta">
                        <FaClock size={12} />
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="no-notifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaBell size={60} />
              <h3>No notifications</h3>
              <p>
                {filter === "all"
                  ? "You're all caught up!"
                  : filter === "unread"
                  ? "No unread notifications"
                  : "No important notifications"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}

export default Notifications;
