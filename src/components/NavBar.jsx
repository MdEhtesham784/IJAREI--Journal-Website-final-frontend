import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthPopup from "./AuthPopup";
import '../styles/Navbar.css';
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorialOpen, setEditorialOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      if (!exp) return true;
      return Date.now() >= exp * 1000;
    } catch {
      return true; // treat as expired if token invalid
    }
  };

  useEffect(() => {
    setShowAuthPopup(false);
    setMenuOpen(false);
    setEditorialOpen(false);
    setAboutOpen(false);
    
    // Check if user is logged in (you can modify this logic based on your auth implementation)
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [location]);


  
  const handleSubmitClick = () => {
    if (isLoggedIn) {
      navigate("/submit");
    } else {
      setIsLoginMode(true);
      setShowAuthPopup(true);
    }
  };

  const handleLoginSignupClick = () => {
    setIsLoginMode(true);
    setShowAuthPopup(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthPopup(false);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    // Clear any other user data you might have stored
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">IJAREI</Link>
        </div>

        {/* Hamburger Button */}
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
          >
            <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/archive" className="nav-link">Archive</Link>
          {/* Editorial Dropdown */}
          <div
            className="dropdown-container"
            onMouseEnter={() => setEditorialOpen(true)}
            onMouseLeave={() => setEditorialOpen(false)}
          >
            <button
              className="nav-link dropdown-trigger"
              onClick={() => setEditorialOpen(!editorialOpen)}
            >
              Editorial
              <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {editorialOpen && (
              <div className="dropdown-menu">
                <Link to="/editorial-board" className="dropdown-link">Editorial Board</Link>
                <Link to="/editorial-policy" className="dropdown-link">Editorial Policy</Link>
                <Link to="/editorialboardform" className="dropdown-link">Apply for Editor</Link>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div
            className="dropdown-container"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              className="nav-link dropdown-trigger"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About
              <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {aboutOpen && (
              <div className="dropdown-menu">
                <Link to="/about-journal" className="dropdown-link">About Journal</Link>
                <Link to="/missionVisionPage" className="dropdown-link">Mission & Vision</Link>
                <Link to="/instructions" className="dropdown-link">Instructions</Link>
              </div>
            )}
          </div>
          <Link to="/indexing" className="nav-link">Indexing</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/manuscript" className="submit-btn">Submit Manuscript</Link>
          
          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      ) : (
        <>
          <div className="auth-button-wrapper">
            <Link to="/loginForm" className="LoginForm">Login</Link>
          </div>
          <div className="auth-button-wrapper">
            <Link to="/signupForm" className="SignupForm">Sign Up</Link>
          </div>
        </>
      )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/archive" className="nav-link">Archive</Link>
          {/* Mobile Editorial Dropdown */}
          <div className="mobile-dropdown">
            <button
              className="nav-link mobile-dropdown-trigger"
              onClick={() => setEditorialOpen(!editorialOpen)}
            >
              Editorial
              <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {editorialOpen && (
              <div className="mobile-dropdown-menu">
                <Link to="/editorial-board" className="dropdown-link">Editorial Board</Link>
                <Link to="/editorial-policy" className="dropdown-link">Editorial Policy</Link>
                <Link to="/editorialboardform" className="dropdown-link">Apply for Editor</Link>
              </div>
            )}
          </div>

          {/* Mobile About Dropdown */}
          <div className="mobile-dropdown">
            <button
              className="nav-link mobile-dropdown-trigger"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About
              <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {aboutOpen && (
              <div className="mobile-dropdown-menu">
                <Link to="/about-journal" className="dropdown-link">About Journal</Link>
                <Link to="/missionVisionPage" className="dropdown-link">Mission & Vision</Link>
                <Link to="/instructions" className="dropdown-link">Instructions</Link>
              </div>
            )}
          </div>
          <Link to="/indexing" className="nav-link">Indexing</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/manuscript" className="submit-btn">Submit Manuscript</Link>

          {/* Mobile conditional rendering based on login status */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn mobile-logout-btn">
              Logout
            </button>
          ) : (
            <>
              <div className="auth-button-wrapper">
                <Link to="/loginForm" className="LoginForm">Login</Link>
              </div>
              <div className="auth-button-wrapper">
                <Link to="/signupForm" className="SignupForm">Sign Up</Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* Auth Modal */}
      {showAuthPopup && (
        <AuthPopup
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          onClose={() => setShowAuthPopup(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </nav>
  );
}