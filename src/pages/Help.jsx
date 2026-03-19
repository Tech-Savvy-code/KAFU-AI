import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaArrowLeft,
  FaQuestionCircle,
  FaSearch,
  FaBook,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaVideo,
  FaRobot,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaLifeRing,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaUserGraduate
} from "react-icons/fa";

function Help() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const faqs = [
    {
      id: 1,
      category: "general",
      question: "How do I register for courses?",
      answer: "To register for courses, log in to the student portal, navigate to the 'Course Registration' section, select your desired courses for the semester, and submit your registration. Make sure to consult with your academic advisor before finalizing your selections."
    },
    {
      id: 2,
      category: "general",
      question: "Where can I find my exam timetable?",
      answer: "Exam timetables are available on the student portal under the 'Examinations' section. You can also check the notice boards outside the administration building and receive notifications through the KAFU AI app."
    },
    {
      id: 3,
      category: "academic",
      question: "How do I check my results?",
      answer: "Results are published on the student portal at the end of each semester. Log in with your student credentials, go to 'Academic Records', and select 'View Results'. You can also download and print your transcript from the same section."
    },
    {
      id: 4,
      category: "academic",
      question: "What is the process for applying for transcripts?",
      answer: "To apply for transcripts, visit the administration office or access the online portal. Fill out the transcript request form, pay the required fee at the finance office, and submit the receipt. Official transcripts are processed within 5-7 working days."
    },
    {
      id: 5,
      category: "fees",
      question: "How can I pay my tuition fees?",
      answer: "Tuition fees can be paid through: 1) Bank transfer to the university account, 2) M-Pesa paybill number (available on the website), 3) Cash at the finance office, or 4) Online payment through the student portal. Always keep your payment receipt for reference."
    },
    {
      id: 6,
      category: "fees",
      question: "Are there scholarship opportunities available?",
      answer: "Yes! KAFU offers various scholarships including merit-based, need-based, and sports scholarships. Visit the financial aid office or check the university website for application deadlines and requirements. The KAFU AI can also provide detailed information about available scholarships."
    },
    {
      id: 7,
      category: "campus",
      question: "What are the library operating hours?",
      answer: "The KAFU library is open Monday to Friday from 8:00 AM to 9:00 PM, Saturday from 9:00 AM to 5:00 PM, and Sunday from 2:00 PM to 9:00 PM. During examination periods, the library operates 24 hours."
    },
    {
      id: 8,
      category: "campus",
      question: "How do I access the ICT labs?",
      answer: "ICT labs are accessible to all enrolled students during operating hours (8:00 AM - 8:00 PM). You need your student ID card for access. Some specialized labs may require prior booking or permission from the department."
    },
    {
      id: 9,
      category: "technical",
      question: "I forgot my student portal password. What should I do?",
      answer: "Click on 'Forgot Password' on the login page and follow the reset instructions sent to your registered email. If you don't receive the email, contact the ICT support team at support@kafu.ac.ke or visit the ICT office for assistance."
    },
    {
      id: 10,
      category: "technical",
      question: "How do I use the KAFU AI assistant?",
      answer: "Simply type your question in the chat box on the home page. The AI can help you with information about programs, campus locations, documents, academic calendar, and general university inquiries. For complex issues, it may direct you to the relevant department."
    }
  ];

  const helpCategories = [
    { icon: FaBook, label: "Academic", color: "#10b981", count: 15 },
    { icon: FaUserGraduate, label: "Admissions", color: "#6366f1", count: 8 },
    { icon: FaFileAlt, label: "Fees & Finance", color: "#f59e0b", count: 12 },
    { icon: FaMapMarkerAlt, label: "Campus Life", color: "#ec4899", count: 10 },
    { icon: FaRobot, label: "Technical Support", color: "#06b6d4", count: 6 },
  ];

  const contactOptions = [
    { icon: FaEnvelope, label: "Email Support", value: "support@kafu.ac.ke", color: "#10b981" },
    { icon: FaPhone, label: "Phone", value: "+254 700 123 456", color: "#6366f1" },
    { icon: FaComments, label: "Live Chat", value: "Available 24/7", color: "#f59e0b" },
    { icon: FaVideo, label: "Video Call", value: "Schedule Appointment", color: "#ec4899" },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="help-page">
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
              <FaQuestionCircle size={40} />
            </motion.div>
            <div className="title-text">
              <h1>Help Center</h1>
              <p>Find answers and get support</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* SEARCH */}
      <motion.section
        className="help-search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </motion.section>

      {/* AI ASSISTANT CARD */}
      <motion.section
        className="ai-help-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="ai-card-content">
          <div className="ai-icon-wrapper">
            <FaRobot size={40} />
          </div>
          <div className="ai-text">
            <h3>Ask KAFU AI</h3>
            <p>Get instant answers to your questions</p>
          </div>
          <motion.button
            className="chat-now-btn"
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chat Now
            <FaComments />
          </motion.button>
        </div>
      </motion.section>

      {/* HELP CATEGORIES */}
      <motion.section
        className="help-categories-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="section-title">
          <FaBook />
          <h2>Help Categories</h2>
        </div>
        <div className="categories-grid">
          {helpCategories.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.label}
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActiveCategory(category.label.toLowerCase().split(" ")[0].toLowerCase())}
              >
                <div className="category-icon" style={{ color: category.color }}>
                  <IconComponent size={32} />
                </div>
                <h3>{category.label}</h3>
                <p>{category.count} articles</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section
        className="faq-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="section-title">
          <FaLifeRing />
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {filteredFaqs.map((faq, idx) => (
            <motion.div
              key={faq.id}
              className="faq-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                className="faq-question"
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              >
                <div className="question-text">
                  <FaQuestionCircle className="question-icon" />
                  <span>{faq.question}</span>
                </div>
                {expandedFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {expandedFaq === faq.id && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                    <div className="feedback-section">
                      <span>Was this helpful?</span>
                      <div className="feedback-buttons">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaThumbsUp />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaThumbsDown />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT SUPPORT */}
      <motion.section
        className="contact-support-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="section-title">
          <FaEnvelope />
          <h2>Contact Support</h2>
        </div>
        <div className="contact-grid">
          {contactOptions.map((option, idx) => {
            const IconComponent = option.icon;
            return (
              <motion.div
                key={option.label}
                className="contact-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <div className="contact-icon" style={{ color: option.color }}>
                  <IconComponent size={28} />
                </div>
                <h4>{option.label}</h4>
                <p>{option.value}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* QUICK LINKS */}
      <motion.section
        className="quick-links-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="section-title">
          <FaGraduationCap />
          <h2>Quick Links</h2>
        </div>
        <div className="links-grid">
          <motion.a
            href="#"
            className="link-card"
            whileHover={{ x: 5 }}
          >
            <FaBook />
            <span>Student Handbook</span>
          </motion.a>
          <motion.a
            href="#"
            className="link-card"
            whileHover={{ x: 5 }}
          >
            <FaCalendarAlt />
            <span>Academic Calendar</span>
          </motion.a>
          <motion.a
            href="#"
            className="link-card"
            whileHover={{ x: 5 }}
          >
            <FaMapMarkerAlt />
            <span>Campus Map</span>
          </motion.a>
          <motion.a
            href="#"
            className="link-card"
            whileHover={{ x: 5 }}
          >
            <FaFileAlt />
            <span>University Policies</span>
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

export default Help;
