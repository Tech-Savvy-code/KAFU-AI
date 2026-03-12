import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css";

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // 10 seconds / 100 = 100ms per percent

    // Main timer for navigation
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        navigate("/home");
      }, 500); // Smooth transition delay
    }, 10000); // 10 seconds

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="splash-container">
      
      {/* Animated Background */}
      <div className="background-grid"></div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="splash-content">
        
        {/* Logo Section */}
        <div className="logo-container enhanced">
          <div className="logo-glow"></div>
          <div className="logo-ring"></div>
          <img 
            src="/src/assets/kafu logo.png" 
            alt="KAFU Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.style.display = 'none'
              const parent = e.target.parentElement
              parent.innerHTML = '<span className="text-6xl font-bold text-white">🎓</span>'
            }}
          />
        </div>

        {/* Title */}
        <div className="title-container">
          <h1 className="splash-title">
            KAFU AI
          </h1>
          <div className="subtitle-container">
            <span className="subtitle-text">Smart Campus Assistant</span>
            <div className="subtitle-underline"></div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="features-preview">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <div className="feature-content">
              <h3>AI Assistant</h3>
              <p>Intelligent campus guidance</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <div className="feature-content">
              <h3>Campus Navigation</h3>
              <p>Find locations instantly</p>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="loading-container">
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="loading-text">
            <span className="loading-label">Initializing System</span>
            <span className="loading-percent">{progress}%</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="status-indicators">
          <div className="status-item">
            <div className="status-dot online"></div>
            <span>System Online</span>
          </div>
          <div className="status-item">
            <div className="status-dot ready"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <div className={`fixed inset-0 bg-slate-900 z-50 transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}></div>
    </div>
  );
}

export default Splash;