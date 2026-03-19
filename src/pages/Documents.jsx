import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaSearch,
  FaArrowLeft,
  FaDownload,
  FaEye,
  FaFolderOpen,
  FaCloudDownloadAlt,
  FaClock,
  FaStar
} from "react-icons/fa";

function Documents() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "PDF", "DOC", "XLS", "Images", "Other"];

  // Default documents
  const defaultDocuments = [
    { 
      name: "Admission Form 2024", 
      url: "#", 
      type: "PDF", 
      size: "2.4 MB",
      date: "2024-01-15",
      icon: FaFilePdf,
      color: "#ef4444",
      downloads: 1234
    },
    { 
      name: "Student Handbook", 
      url: "#", 
      type: "PDF", 
      size: "5.1 MB",
      date: "2024-02-01",
      icon: FaFilePdf,
      color: "#ef4444",
      downloads: 892
    },
    { 
      name: "Fee Structure", 
      url: "#", 
      type: "PDF", 
      size: "1.8 MB",
      date: "2024-01-20",
      icon: FaFilePdf,
      color: "#ef4444",
      downloads: 2156
    },
    { 
      name: "University Policies", 
      url: "#", 
      type: "DOC", 
      size: "856 KB",
      date: "2024-03-01",
      icon: FaFileWord,
      color: "#3b82f6",
      downloads: 567
    },
    { 
      name: "Academic Calendar", 
      url: "#", 
      type: "PDF", 
      size: "3.2 MB",
      date: "2024-01-10",
      icon: FaFilePdf,
      color: "#ef4444",
      downloads: 1890
    },
    { 
      name: "Research Guidelines", 
      url: "#", 
      type: "DOC", 
      size: "1.2 MB",
      date: "2024-02-15",
      icon: FaFileWord,
      color: "#3b82f6",
      downloads: 423
    },
    { 
      name: "Budget Template", 
      url: "#", 
      type: "XLS", 
      size: "456 KB",
      date: "2024-03-05",
      icon: FaFileExcel,
      color: "#10b981",
      downloads: 234
    },
    { 
      name: "Campus Map", 
      url: "#", 
      type: "Images", 
      size: "8.5 MB",
      date: "2024-01-05",
      icon: FaFileImage,
      color: "#f59e0b",
      downloads: 3421
    },
  ];

  // Fetch documents from backend
  const fetchDocuments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/documents");
      if (!res.ok) throw new Error("Failed to fetch documents");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setDocuments(data.map(doc => ({
          ...doc,
          icon: doc.type === "PDF" ? FaFilePdf : doc.type === "DOC" ? FaFileWord : FaFileAlt,
          color: doc.type === "PDF" ? "#ef4444" : doc.type === "DOC" ? "#3b82f6" : "#10b981",
          downloads: Math.floor(Math.random() * 2000) + 100
        })));
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error(err);
      setError("");
      setDocuments(defaultDocuments);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || doc.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Get file icon
  const getFileIcon = (type) => {
    switch (type) {
      case "PDF": return FaFilePdf;
      case "DOC": return FaFileWord;
      case "XLS": return FaFileExcel;
      case "Images": return FaFileImage;
      default: return FaFileAlt;
    }
  };

  // Get file color
  const getFileColor = (type) => {
    switch (type) {
      case "PDF": return "#ef4444";
      case "DOC": return "#3b82f6";
      case "XLS": return "#10b981";
      case "Images": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  return (
    <div className="documents-page">
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
              <FaFolderOpen size={40} />
            </motion.div>
            <div className="title-text">
              <h1>University Documents</h1>
              <p>Access important files and resources</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* SEARCH & FILTERS */}
      <motion.section
        className="search-filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

      {/* STATS CARDS */}
      <motion.section
        className="docs-stats-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="stat-card">
          <FaFilePdf className="stat-icon" style={{ color: "#ef4444" }} />
          <div className="stat-info">
            <h3>{documents.filter(d => d.type === "PDF").length}</h3>
            <p>PDF Files</p>
          </div>
        </div>
        <div className="stat-card">
          <FaFileWord className="stat-icon" style={{ color: "#3b82f6" }} />
          <div className="stat-info">
            <h3>{documents.filter(d => d.type === "DOC").length}</h3>
            <p>Word Docs</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCloudDownloadAlt className="stat-icon" style={{ color: "#10b981" }} />
          <div className="stat-info">
            <h3>{documents.reduce((acc, doc) => acc + (doc.downloads || 0), 0)}</h3>
            <p>Total Downloads</p>
          </div>
        </div>
        <div className="stat-card">
          <FaClock className="stat-icon" style={{ color: "#f59e0b" }} />
          <div className="stat-info">
            <h3>24/7</h3>
            <p>Available</p>
          </div>
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
            <p>🤖 AI is fetching documents...</p>
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

      {/* DOCUMENT GRID */}
      <motion.section
        className="documents-grid-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="section-header">
          <h2>All Documents</h2>
          <p>{filteredDocs.length} documents found</p>
        </div>

        <div className="documents-grid">
          {filteredDocs.map((doc, idx) => {
            const IconComponent = doc.icon || getFileIcon(doc.type);
            const docColor = doc.color || getFileColor(doc.type);
            
            return (
              <motion.div
                key={idx}
                className="document-card"
                onClick={() => window.open(doc.url, "_blank")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="doc-header">
                  <div 
                    className="doc-icon-wrapper"
                    style={{ background: `linear-gradient(135deg, ${docColor}, ${docColor}dd)` }}
                  >
                    <IconComponent size={32} />
                  </div>
                  <div className="doc-type-badge" style={{ color: docColor }}>
                    {doc.type}
                  </div>
                </div>
                
                <h3 className="doc-name">{doc.name}</h3>
                
                <div className="doc-meta">
                  <div className="doc-info">
                    <FaClock size={12} />
                    <span>{doc.size}</span>
                  </div>
                  <div className="doc-info">
                    <FaDownload size={12} />
                    <span>{doc.downloads?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="doc-actions">
                  <motion.button
                    className="action-btn view"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(doc.url, "_blank");
                    }}
                  >
                    <FaEye />
                    <span>View</span>
                  </motion.button>
                  <motion.button
                    className="action-btn download"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(doc.url, "_blank");
                    }}
                  >
                    <FaDownload />
                    <span>Download</span>
                  </motion.button>
                </div>

                <div className="card-overlay" style={{ background: `linear-gradient(135deg, ${docColor}22, transparent)` }}></div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}

export default Documents;
