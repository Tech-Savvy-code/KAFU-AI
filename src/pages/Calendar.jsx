import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaCalendarAlt,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaClock,
  FaMapMarkerAlt,
  FaBook,
  FaGraduationCap,
  FaTrophy,
  FaMusic,
  FaFlask,
  FaChalkboardTeacher,
  FaStar,
  FaHeart,
  FaFlag,
  FaUtensils,
  FaBus,
  FaExclamationCircle,
  FaCheckCircle
} from "react-icons/fa";

function Calendar() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("month"); // month, list, agenda

  const filters = ["All", "Academic", "Exams", "Sports", "Cultural", "Holidays"];

  // Comprehensive academic calendar events
  const academicEvents = [
    // January
    { 
      id: 1,
      title: "Semester Begins", 
      date: "2024-01-10", 
      time: "8:00 AM",
      location: "Main Campus",
      type: "Academic",
      description: "First day of classes for Spring Semester 2024. All students are expected to report and begin attendance.",
      icon: FaBook,
      color: "#10b981",
      priority: "high"
    },
    { 
      id: 2,
      title: "Course Registration Deadline", 
      date: "2024-01-20", 
      time: "5:00 PM",
      location: "Admin Office",
      type: "Academic",
      description: "Last day to register or add/drop courses without penalty.",
      icon: FaChalkboardTeacher,
      color: "#6366f1",
      priority: "high"
    },
    { 
      id: 3,
      title: "New Students Orientation", 
      date: "2024-01-08", 
      time: "9:00 AM",
      location: "Assembly Hall",
      type: "Academic",
      description: "Mandatory orientation program for all first-year students.",
      icon: FaGraduationCap,
      color: "#06b6d4",
      priority: "high"
    },
    
    // February
    { 
      id: 4,
      title: "Fee Payment Deadline", 
      date: "2024-02-15", 
      time: "5:00 PM",
      location: "Finance Office",
      type: "Academic",
      description: "Last day for tuition fee payment without late penalties.",
      icon: FaExclamationCircle,
      color: "#f59e0b",
      priority: "high"
    },
    { 
      id: 5,
      title: "Valentine's Day Celebration", 
      date: "2024-02-14", 
      time: "2:00 PM",
      location: "Student Center",
      type: "Cultural",
      description: "Annual Valentine's Day cultural event organized by the student body.",
      icon: FaHeart,
      color: "#ec4899",
      priority: "medium"
    },

    // March
    { 
      id: 6,
      title: "Mid-Semester Exams Begin", 
      date: "2024-03-18", 
      time: "8:00 AM",
      location: "Exam Halls",
      type: "Exams",
      description: "Mid-semester examinations commence. Check your exam timetable on the student portal.",
      icon: FaBook,
      color: "#ef4444",
      priority: "high"
    },
    { 
      id: 7,
      title: "Mid-Semester Exams End", 
      date: "2024-03-28", 
      time: "5:00 PM",
      location: "Exam Halls",
      type: "Exams",
      description: "Last day of mid-semester examinations.",
      icon: FaCheckCircle,
      color: "#10b981",
      priority: "high"
    },
    { 
      id: 8,
      title: "Inter-Class Football Tournament", 
      date: "2024-03-15", 
      time: "3:00 PM",
      location: "Sports Ground",
      type: "Sports",
      description: "Annual inter-class football competition begins.",
      icon: FaTrophy,
      color: "#3b82f6",
      priority: "medium"
    },

    // April
    { 
      id: 9,
      title: "Good Friday Holiday", 
      date: "2024-03-29", 
      time: "All Day",
      location: "Campus Wide",
      type: "Holidays",
      description: "University closed in observance of Good Friday.",
      icon: FaFlag,
      color: "#8b5cf6",
      priority: "high"
    },
    { 
      id: 10,
      title: "Easter Monday Holiday", 
      date: "2024-04-01", 
      time: "All Day",
      location: "Campus Wide",
      type: "Holidays",
      description: "University closed in observance of Easter Monday.",
      icon: FaFlag,
      color: "#8b5cf6",
      priority: "high"
    },
    { 
      id: 11,
      title: "Research Symposium", 
      date: "2024-04-12", 
      time: "9:00 AM",
      location: "ICT Labs",
      type: "Academic",
      description: "Annual student research presentations and poster sessions.",
      icon: FaFlask,
      color: "#06b6d4",
      priority: "medium"
    },

    // May
    { 
      id: 12,
      title: "End of Semester Classes", 
      date: "2024-05-10", 
      time: "5:00 PM",
      location: "Main Campus",
      type: "Academic",
      description: "Last day of regular classes before final examinations.",
      icon: FaBook,
      color: "#10b981",
      priority: "high"
    },
    { 
      id: 13,
      title: "Final Exams Begin", 
      date: "2024-05-15", 
      time: "8:00 AM",
      location: "Exam Halls",
      type: "Exams",
      description: "Final semester examinations commence.",
      icon: FaBook,
      color: "#ef4444",
      priority: "high"
    },
    { 
      id: 14,
      title: "Cultural Night", 
      date: "2024-05-20", 
      time: "6:00 PM",
      location: "Assembly Hall",
      type: "Cultural",
      description: "Annual cultural night showcasing diverse traditions.",
      icon: FaMusic,
      color: "#ec4899",
      priority: "low"
    },

    // June
    { 
      id: 15,
      title: "Final Exams End", 
      date: "2024-05-30", 
      time: "5:00 PM",
      location: "Exam Halls",
      type: "Exams",
      description: "Last day of final examinations.",
      icon: FaCheckCircle,
      color: "#10b981",
      priority: "high"
    },
    { 
      id: 16,
      title: "Graduation Ceremony", 
      date: "2024-06-15", 
      time: "10:00 AM",
      location: "Main Grounds",
      type: "Academic",
      description: "Annual graduation ceremony for the Class of 2024.",
      icon: FaGraduationCap,
      color: "#f59e0b",
      priority: "high"
    },
    { 
      id: 17,
      title: "Summer Break Begins", 
      date: "2024-06-20", 
      time: "All Day",
      location: "Campus Wide",
      type: "Holidays",
      description: "Official start of summer break.",
      icon: FaClock,
      color: "#10b981",
      priority: "medium"
    },

    // July
    { 
      id: 18,
      title: "Summer Session Begins", 
      date: "2024-07-08", 
      time: "8:00 AM",
      location: "Main Campus",
      type: "Academic",
      description: "Optional summer session for students who want to catch up or get ahead.",
      icon: FaBook,
      color: "#6366f1",
      priority: "medium"
    },

    // August
    { 
      id: 19,
      title: "Summer Session Ends", 
      date: "2024-08-15", 
      time: "5:00 PM",
      location: "Main Campus",
      type: "Academic",
      description: "End of summer session.",
      icon: FaCheckCircle,
      color: "#10b981",
      priority: "medium"
    },

    // September
    { 
      id: 20,
      title: "Fall Semester Begins", 
      date: "2024-09-05", 
      time: "8:00 AM",
      location: "Main Campus",
      type: "Academic",
      description: "First day of Fall Semester 2024.",
      icon: FaBook,
      color: "#10b981",
      priority: "high"
    },
    { 
      id: 21,
      title: "Sports Day", 
      date: "2024-09-20", 
      time: "9:00 AM",
      location: "Sports Ground",
      type: "Sports",
      description: "Annual university sports day with various competitions.",
      icon: FaTrophy,
      color: "#3b82f6",
      priority: "medium"
    },

    // October
    { 
      id: 22,
      title: "Mid-Semester Exams", 
      date: "2024-10-15", 
      time: "8:00 AM",
      location: "Exam Halls",
      type: "Exams",
      description: "Fall semester mid-term examinations.",
      icon: FaBook,
      color: "#ef4444",
      priority: "high"
    },

    // November
    { 
      id: 23,
      title: "Career Fair 2024", 
      date: "2024-11-08", 
      time: "10:00 AM",
      location: "Assembly Hall",
      type: "Academic",
      description: "Annual career fair with top employers recruiting KAFU graduates.",
      icon: FaGraduationCap,
      color: "#f59e0b",
      priority: "medium"
    },
    { 
      id: 24,
      title: "Final Exams Begin", 
      date: "2024-11-20", 
      time: "8:00 AM",
      location: "Exam Halls",
      type: "Exams",
      description: "Fall semester final examinations.",
      icon: FaBook,
      color: "#ef4444",
      priority: "high"
    },

    // December
    { 
      id: 25,
      title: "End of Fall Semester", 
      date: "2024-12-10", 
      time: "5:00 PM",
      location: "Main Campus",
      type: "Academic",
      description: "Official end of Fall Semester 2024.",
      icon: FaCheckCircle,
      color: "#10b981",
      priority: "high"
    },
    { 
      id: 26,
      title: "Christmas Break", 
      date: "2024-12-15", 
      time: "All Day",
      location: "Campus Wide",
      type: "Holidays",
      description: "University closed for Christmas holidays.",
      icon: FaFlag,
      color: "#8b5cf6",
      priority: "high"
    },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filter events
  const filteredEvents = academicEvents.filter(event => {
    const eventDate = new Date(event.date);
    const matchesMonth = eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
    const matchesFilter = activeFilter === "All" || event.type === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && matchesFilter && matchesSearch;
  });

  // Get events for selected date
  const getEventsForDate = (day) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return academicEvents.filter(event => event.date === dateStr);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      days.push({ 
        type: 'day', 
        day, 
        events,
        key: `day-${day}`
      });
    }

    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="priority-badge high">High</span>;
      case 'medium': return <span className="priority-badge medium">Medium</span>;
      case 'low': return <span className="priority-badge low">Low</span>;
      default: return null;
    }
  };

  return (
    <div className="calendar-page">
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
              <FaCalendarAlt size={40} />
            </motion.div>
            <div className="title-text">
              <h1>Academic Calendar</h1>
              <p>Stay updated with important dates</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* CONTROLS */}
      <motion.section
        className="calendar-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-filter-row">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>

        <div className="filter-chips">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* MONTH NAVIGATION */}
      <motion.section
        className="month-navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="nav-btn"
          onClick={() => {
            if (selectedMonth === 0) {
              setSelectedMonth(11);
              setSelectedYear(selectedYear - 1);
            } else {
              setSelectedMonth(selectedMonth - 1);
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ◀
        </motion.button>

        <div className="month-year-display">
          <motion.h2
            key={`${selectedMonth}-${selectedYear}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {months[selectedMonth]} {selectedYear}
          </motion.h2>
        </div>

        <motion.button
          className="nav-btn"
          onClick={() => {
            if (selectedMonth === 11) {
              setSelectedMonth(0);
              setSelectedYear(selectedYear + 1);
            } else {
              setSelectedMonth(selectedMonth + 1);
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ▶
        </motion.button>
      </motion.section>

      {/* CALENDAR VIEW */}
      {viewMode === 'month' ? (
        <motion.section
          className="calendar-grid-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="calendar-grid">
            {/* Week day headers */}
            <div className="calendar-header">
              {weekDays.map(day => (
                <div key={day} className="weekday-header">{day}</div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="calendar-body">
              {generateCalendarDays().map((cell) => {
                if (cell.type === 'empty') {
                  return <div key={cell.key} className="calendar-day empty"></div>;
                }

                const hasEvents = cell.events.length > 0;
                const hasHighPriority = cell.events.some(e => e.priority === 'high');

                return (
                  <motion.div
                    key={cell.key}
                    className={`calendar-day ${hasEvents ? 'has-events' : ''} ${hasHighPriority ? 'high-priority' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => hasEvents && setSelectedEvent(cell.events[0])}
                  >
                    <span className="day-number">{cell.day}</span>
                    {hasEvents && (
                      <div className="event-dots">
                        {cell.events.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className="event-dot"
                            style={{ background: event.color }}
                            title={event.title}
                          />
                        ))}
                        {cell.events.length > 3 && (
                          <span className="more-events">+{cell.events.length - 3}</span>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section
          className="list-view-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => {
                const IconComponent = event.icon;
                return (
                  <motion.div
                    key={event.id}
                    className="event-card"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div 
                      className="event-color-bar"
                      style={{ background: event.color }}
                    />
                    <div className="event-content">
                      <div className="event-header">
                        <div className="event-icon-wrapper" style={{ color: event.color }}>
                          <IconComponent size={24} />
                        </div>
                        <div className="event-title-section">
                          <h3>{event.title}</h3>
                          {getPriorityBadge(event.priority)}
                        </div>
                      </div>
                      <div className="event-details">
                        <div className="event-detail">
                          <FaCalendarAlt size={14} />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="event-detail">
                          <FaClock size={14} />
                          <span>{event.time}</span>
                        </div>
                        <div className="event-detail">
                          <FaMapMarkerAlt size={14} />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="no-events">
                <FaCalendarAlt size={60} />
                <h3>No events found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* EVENT STATS */}
      <motion.section
        className="events-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="stat-card">
          <FaBook className="stat-icon" style={{ color: "#10b981" }} />
          <div className="stat-info">
            <h3>{filteredEvents.filter(e => e.type === 'Academic').length}</h3>
            <p>Academic</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBook className="stat-icon" style={{ color: "#ef4444" }} />
          <div className="stat-info">
            <h3>{filteredEvents.filter(e => e.type === 'Exams').length}</h3>
            <p>Exams</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTrophy className="stat-icon" style={{ color: "#3b82f6" }} />
          <div className="stat-info">
            <h3>{filteredEvents.filter(e => e.type === 'Sports').length}</h3>
            <p>Sports</p>
          </div>
        </div>
        <div className="stat-card">
          <FaFlag className="stat-icon" style={{ color: "#8b5cf6" }} />
          <div className="stat-info">
            <h3>{filteredEvents.filter(e => e.type === 'Holidays').length}</h3>
            <p>Holidays</p>
          </div>
        </div>
      </motion.section>

      {/* EVENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="modal-header"
                style={{ background: `linear-gradient(135deg, ${selectedEvent.color}, ${selectedEvent.color}dd)` }}
              >
                <div className="modal-icon">
                  {(() => {
                    const IconComponent = selectedEvent.icon;
                    return <IconComponent size={40} />;
                  })()}
                </div>
                <h2>{selectedEvent.title}</h2>
                {getPriorityBadge(selectedEvent.priority)}
              </div>

              <div className="modal-body">
                <div className="detail-row">
                  <FaCalendarAlt className="detail-icon" />
                  <div>
                    <strong>Date</strong>
                    <p>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <FaClock className="detail-icon" />
                  <div>
                    <strong>Time</strong>
                    <p>{selectedEvent.time}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <FaMapMarkerAlt className="detail-icon" />
                  <div>
                    <strong>Location</strong>
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <FaBook className="detail-icon" />
                  <div>
                    <strong>Type</strong>
                    <p>{selectedEvent.type}</p>
                  </div>
                </div>

                <div className="detail-description">
                  <strong>Description</strong>
                  <p>{selectedEvent.description}</p>
                </div>
              </div>

              <motion.button
                className="modal-close-btn"
                onClick={() => setSelectedEvent(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Calendar;
