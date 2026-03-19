import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "../styles/Home.css"

import {
  FaGraduationCap,
  FaSearch,
  FaArrowLeft,
  FaRobot,
  FaBookOpen,
  FaChalkboardTeacher,
  FaAward,
  FaClock,
  FaStar
} from "react-icons/fa"

function Programs() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const detailsRef = useRef(null)

  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [programDetails, setProgramDetails] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Education", "Business", "Technology", "Arts", "Science"]

  // Sample programs for demo
  const samplePrograms = [
    { name: "Bachelor of Education", category: "Education", icon: FaChalkboardTeacher, color: "#10b981" },
    { name: "Bachelor of Business Admin", category: "Business", icon: FaBookOpen, color: "#6366f1" },
    { name: "Computer Science", category: "Technology", icon: FaRobot, color: "#06b6d4" },
    { name: "Information Technology", category: "Technology", icon: FaRobot, color: "#059669" },
    { name: "Bachelor of Arts", category: "Arts", icon: FaAward, color: "#f59e0b" },
    { name: "Bachelor of Science", category: "Science", icon: FaStar, color: "#ec4899" },
  ]

  // Fetch programs from backend
  const fetchPrograms = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("http://localhost:5000/api/programs")
      if (!response.ok) throw new Error("Server responded with error")
      const data = await response.json()
      if (Array.isArray(data)) {
        setPrograms(data.map(name => ({
          name,
          category: "Education",
          icon: FaGraduationCap,
          color: "#10b981"
        })))
      } else {
        throw new Error("Invalid data format")
      }
    } catch (err) {
      console.error("FETCH ERROR:", err)
      setError("")
      setPrograms(samplePrograms)
    }
    setLoading(false)
  }

  // Fetch program details
  const fetchProgramDetails = async (program) => {
    setLoading(true)
    setProgramDetails("")
    setSelectedProgram(program.name || program)

    try {
      const response = await fetch(`http://localhost:5000/api/programs/${encodeURIComponent(program.name || program)}`)
      if (!response.ok) throw new Error("Server error")
      const data = await response.json()
      setProgramDetails(data.details)
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 200)
    } catch (err) {
      console.error("DETAILS FETCH ERROR:", err)
      setProgramDetails(`
📚 ${program.name || program}

🎯 Program Overview:
This program offers comprehensive training in the field with practical and theoretical knowledge.

📋 Admission Requirements:
- KCSE Mean Grade: C+ (Plus) and above
- Specific subject requirements vary by program
- English and Mathematics compulsory

📖 Course Duration: 4 Years (8 Semesters)

💼 Career Opportunities:
Graduates can work in various sectors including education, industry, and government.

🏆 Certification:
Upon completion, students receive a Bachelor's Degree from KAFU.
      `)
    }
    setLoading(false)
  }

  // Filter programs
  const filteredPrograms = programs.filter(program => {
    const name = program.name || program
    const category = program.category || "Education"
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === "All" || category === activeFilter
    return matchesSearch && matchesFilter
  })

  // Scroll handlers
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <div className="programs-page">
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
              <FaGraduationCap size={40} />
            </motion.div>
            <div className="title-text">
              <h1>Academic Programs</h1>
              <p>Discover your future at KAFU</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* AI FETCH BUTTON */}
      <motion.section
        className="ai-fetch-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className="ai-fetch-btn"
          onClick={fetchPrograms}
          whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(16,185,129,0.5)" }}
          whileTap={{ scale: 0.98 }}
        >
          <FaRobot className="robot-icon" />
          <span>Ask AI to Fetch Programs</span>
          <FaGraduationCap className="grad-icon" />
        </motion.button>
      </motion.section>

      {/* SEARCH & FILTERS */}
      <motion.section
        className="search-filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-chips">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* LOADING */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="spinner"
            />
            <p>🤖 AI is reading the university website...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR */}
      {error && (
        <motion.div
          className="error-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>{error}</p>
        </motion.div>
      )}

      {/* PROGRAM CARDS */}
      {filteredPrograms.length > 0 && (
        <motion.section
          className="programs-slider-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section-header">
            <h2>Available Programs</h2>
            <p>{filteredPrograms.length} programs found</p>
          </div>

          <div className="slider-container">
            <motion.button
              className="scroll-btn left"
              onClick={scrollLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ◀
            </motion.button>

            <div className="programs-slider" ref={containerRef}>
              {filteredPrograms.map((program, index) => {
                const IconComponent = program.icon || FaGraduationCap
                const programName = program.name || program
                return (
                  <motion.div
                    key={index}
                    className="program-card"
                    onClick={() => fetchProgramDetails(program)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: `linear-gradient(135deg, ${program.color}, ${program.color}dd)`
                    }}
                  >
                    <div className="program-icon-wrapper">
                      <IconComponent size={32} />
                    </div>
                    <h3>{programName}</h3>
                    <div className="program-category">
                      <FaAward size={14} />
                      <span>{program.category || "Program"}</span>
                    </div>
                    <div className="program-overlay"></div>
                  </motion.div>
                )
              })}
            </div>

            <motion.button
              className="scroll-btn right"
              onClick={scrollRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ▶
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* PROGRAM DETAILS */}
      {programDetails && (
        <motion.section
          className="details-section"
          ref={detailsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="details-header">
            <FaBookOpen className="details-icon" />
            <h2>{selectedProgram}</h2>
          </div>
          <div className="details-content">
            <pre>{programDetails}</pre>
          </div>
          <motion.button
            className="close-details-btn"
            onClick={() => setProgramDetails("")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close Details
          </motion.button>
        </motion.section>
      )}
    </div>
  )
}

export default Programs
