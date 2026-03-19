import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Home.css";

import {
  FaRobot,
  FaPaperPlane,
  FaMicrophone,
  FaTimes,
  FaExpand,
  FaCompress,
  FaTrash,
  FaDownload,
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaSpinner,
  FaExclamationCircle,
  FaComments
} from "react-icons/fa";

function AIChat({ isOpen, onClose, darkMode }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kafu-chat-history");
    if (saved) {
      setChatHistory(JSON.parse(saved));
    }
  }, []);

  // Save chat history
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("kafu-chat-history", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Fetch AI response from backend
  const fetchAIResponse = async (question) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          context: "university"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      return data.response || data.answer || data.message;
    } catch (error) {
      console.error("AI Response Error:", error);
      // Fallback response
      return getFallbackResponse(question);
    }
  };

  // Fallback responses based on keywords
  const getFallbackResponse = (question) => {
    const q = question.toLowerCase();
    
    if (q.includes("program") || q.includes("course") || q.includes("study")) {
      return `📚 **Academic Programs at KAFU**\n\nKaimosi Friends University offers various programs across different schools:\n\n• **School of Education**: Bachelor of Education (Arts & Science), Diploma in Teacher Education\n\n• **School of Business**: Bachelor of Business Administration, Accounting, Finance\n\n• **School of Arts & Social Sciences**: Bachelor of Arts, Sociology, Psychology\n\n• **School of Science**: Computer Science, Information Technology\n\nFor detailed admission requirements, visit the university website or ask me about specific programs!`;
    }
    
    if (q.includes("library") || q.includes("book") || q.includes("study")) {
      return `📖 **KAFU Library**\n\n**Location**: Main Campus, Building C\n\n**Opening Hours**:\n• Monday - Friday: 8:00 AM - 9:00 PM\n• Saturday: 9:00 AM - 5:00 PM\n• Sunday: 2:00 PM - 9:00 PM\n• Exam Period: 24 Hours\n\n**Services**:\n• Book borrowing and returns\n• Computer labs\n• Study rooms\n• Online resources access\n• Research assistance\n\nThe library has an extensive collection of academic resources to support your studies!`;
    }
    
    if (q.includes("exam") || q.includes("test") || q.includes("assessment")) {
      return `📝 **Examination Information**\n\n**Exam Periods**:\n• Mid-Semester: March & October\n• End of Semester: May & November\n\n**Exam Guidelines**:\n• Arrive 30 minutes early\n• Bring your student ID\n• No unauthorized materials\n• Follow all invigilator instructions\n\nCheck the student portal for your specific exam timetable. Results are published within 4 weeks after exams.`;
    }
    
    if (q.includes("admission") || q.includes("apply") || q.includes("join") || q.includes("requirement")) {
      return `🎓 **Admission Requirements**\n\n**Undergraduate Programs**:\n• KCSE Mean Grade: C+ (Plus) and above\n• English and Mathematics: C+ or higher\n• Science subjects for science programs\n\n**Diploma Programs**:\n• KCSE Mean Grade: C (Plain) and above\n\n**Application Process**:\n1. Visit www.kafu.ac.ke\n2. Click on 'Apply Now'\n3. Fill the online form\n4. Upload required documents\n5. Pay application fee\n6. Submit and wait for response\n\nFor assistance, contact admissions@kafu.ac.ke`;
    }
    
    if (q.includes("fee") || q.includes("payment") || q.includes("cost") || q.includes("tuition")) {
      return `💰 **Fee Structure**\n\n**Tuition Fees (Per Year)**:\n• Undergraduate Programs: KSh 80,000 - 120,000\n• Diploma Programs: KSh 50,000 - 70,000\n\n**Payment Options**:\n• M-Pesa Paybill: [Check website]\n• Bank Transfer\n• Online Payment Portal\n• Cash at Finance Office\n\n**Payment Deadlines**:\n• Semester 1: Before registration\n• Semester 2: Before exams\n\nContact the finance office for detailed fee structure and payment plans.`;
    }
    
    if (q.includes("location") || q.includes("where") || q.includes("campus") || q.includes("map")) {
      return `📍 **Campus Locations**\n\n**Main Campus**: Kaimosi, Vihiga County\n\n**Key Buildings**:\n• Administration Block\n• Lecture Halls (A, B, C)\n• Library\n• ICT Labs\n• Cafeteria\n• Student Center\n• Assembly Hall\n• Sports Ground\n\nUse the Campus Map feature to navigate and find specific locations. The university is easily accessible from major towns in Western Kenya.`;
    }
    
    if (q.includes("contact") || q.includes("phone") || q.includes("email")) {
      return `📞 **Contact Information**\n\n**Main Office**:\n• Phone: +254 700 123 456\n• Email: info@kafu.ac.ke\n\n**Admissions**:\n• Email: admissions@kafu.ac.ke\n\n**Support**:\n• IT Support: support@kafu.ac.ke\n• Library: library@kafu.ac.ke\n\n**Address**:\nP.O. Box [Check website]\nKaimosi, Kenya\n\nVisit www.kafu.ac.ke for more contact details.`;
    }
    
    // Default response
    return `Thank you for your question! 🎓\n\nI'm designed to help you with information about Kaimosi Friends University. For detailed information about "${question}", I recommend:\n\n1. **Visit the official website**: www.kafu.ac.ke\n2. **Check the student portal** for personalized information\n3. **Contact the relevant department** directly\n4. **Visit the administration office** for in-person assistance\n\nIs there anything specific about KAFU that I can help you with?`;
  };

  // Send message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await fetchAIResponse(input);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Add to chat history
      setChatHistory(prev => [...prev.slice(-19), {
        question: input,
        answer: aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting to the university database right now. Please try again in a moment or contact support for assistance.",
        sender: "ai",
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([]);
  };

  // Export chat
  const exportChat = () => {
    const chatText = messages.map(m => 
      `[${m.sender.toUpperCase()}]: ${m.text}`
    ).join("\n\n");
    
    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kafu-chat-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
  };

  // Copy message
  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Rate message
  const rateMessage = (messageId, rating) => {
    console.log(`Message ${messageId} rated: ${rating}`);
    // You can send this to backend for analytics
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className={`ai-chat-modal ${isExpanded ? "expanded" : ""} ${darkMode ? "dark" : ""}`}
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* HEADER */}
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">
            <FaRobot size={24} />
          </div>
          <div>
            <h3>KAFU AI Assistant</h3>
            <p className="chat-status">
              <span className="status-dot online"></span>
              Online • Powered by University Data
            </p>
          </div>
        </div>
        <div className="chat-header-actions">
          <motion.button
            className="header-action-btn"
            onClick={exportChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Export Chat"
          >
            <FaDownload />
          </motion.button>
          <motion.button
            className="header-action-btn"
            onClick={clearChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Clear Chat"
          >
            <FaTrash />
          </motion.button>
          <motion.button
            className="header-action-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <FaCompress /> : <FaExpand />}
          </motion.button>
          <motion.button
            className="header-action-btn close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes />
          </motion.button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`message ${message.sender}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="message-avatar">
              {message.sender === "ai" ? (
                <FaRobot size={20} />
              ) : (
                <FaComments size={20} />
              )}
            </div>
            <div className="message-body">
              <div className="message-content">
                {message.error ? (
                  <div className="error-message">
                    <FaExclamationCircle />
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <p className="message-text">{message.text}</p>
                )}
              </div>
              <div className="message-footer">
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </span>
                <div className="message-actions">
                  <button
                    className="message-action-btn"
                    onClick={() => copyMessage(message.text)}
                    title="Copy"
                  >
                    <FaCopy size={12} />
                  </button>
                  <button
                    className="message-action-btn"
                    onClick={() => rateMessage(message.id, "up")}
                    title="Helpful"
                  >
                    <FaThumbsUp size={12} />
                  </button>
                  <button
                    className="message-action-btn"
                    onClick={() => rateMessage(message.id, "down")}
                    title="Not helpful"
                  >
                    <FaThumbsDown size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="message ai typing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-avatar">
              <FaRobot size={20} />
            </div>
            <div className="message-body">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="typing-text">AI is thinking...</p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask anything about KAFU..."
            disabled={isTyping}
          />
          <motion.button
            className="mic-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Voice input (coming soon)"
          >
            <FaMicrophone />
          </motion.button>
        </div>
        <motion.button
          className="send-btn"
          onClick={sendMessage}
          disabled={input.trim() === "" || isTyping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isTyping ? (
            <FaSpinner className="spinner" />
          ) : (
            <FaPaperPlane />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default AIChat;
