import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx"; 


// Import all main pages
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Archive from "./pages/Archive";
import Indexing from "./pages/Indexing";
import Contact from "./pages/Contact";
import Manuscript from "./pages/Manuscript";
import Instructions from "./pages/Instructions";
import Editorialboardform from "./pages/Editorialboardform";
import EditorialPoliciesPage from "./pages/EditorialPoliciesPage";
import MissionVisionPage from "./pages/MissionVisionPage.jsx";
import Editorialpage from "./pages/Editorialpage.jsx";

// Import all policy pages
import CopyrightPolicy from "./pages/CopyrightPolicy.jsx";
import OpenAccessPolicy from "./pages/OpenAccessPolicy.jsx";
import PeerReviewPolicy from "./pages/PeerReviewPolicy.jsx";
import PlagiarismPolicy from "./pages/PlagiarismPolicy.jsx";
import PublicationEthics from "./pages/PublicationEthics.jsx";

// Import quick links pages
import JoinAsReviewer from "./pages/JoinAsReviewer.jsx";
import JoinAsEditorialMember from "./pages/JoinAsEditorialMember.jsx";
import PublishYourPaper from "./pages/PublishYourPaper.jsx";
import PublicationCertificate from "./pages/PublicationCertificate.jsx";

// Import auth components
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";

// Import Admin Components
import AdminPanel from "./adminpanel/AdminPanel.jsx";
import AdminLoginPage from "./adminpanel/AdminLoginPage.jsx"; 



// Temporary placeholder component for missing pages (if any)
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">This page is under development.</p>
      <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
    </div>
  </div>
);

// Authentication Helper Function
const checkAdminAuth = () => {
  const adminToken = localStorage.getItem('adminToken');
  const adminSession = localStorage.getItem('adminSession');
  
  if (adminToken && adminSession) {
    try {
      const sessionData = JSON.parse(adminSession);
      const now = new Date().getTime();
      
      // Check if session is expired (24 hours = 86400000 ms)
      if (now - sessionData.loginTime < 86400000) {
        return true;
      } else {
        // Session expired, clear storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminSession');
        return false;
      }
    } catch (error) {
      // Invalid session data, clear storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminSession');
      return false;
    }
  }
  return false;
};

// Admin Route Handler Component - Handles /admin route with proper authentication
const AdminRouteHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = checkAdminAuth();
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If not authenticated, redirect to admin login
  return <Navigate to="/admin-login" replace />;
};

// Protected Route Component for Admin Panel
const ProtectedAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = checkAdminAuth();
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

// Admin Login Wrapper Component with Authentication Logic
const AdminLoginWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = checkAdminAuth();
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, []);

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, redirect to admin panel
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Otherwise, show login page
  return <AdminLoginPage />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ========== ADMIN ROUTES (Higher Priority - No Navbar/Footer) ========== */}
        
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLoginWrapper />} />
        
        {/* Admin Base Route - Handles Authentication Check */}
        <Route path="/admin" element={<AdminRouteHandler />} />
        
        {/* Admin Panel Routes - All Protected */}
        <Route path="/admin/*" element={
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        } />

        {/* ========== PUBLIC ROUTES (With Navbar/Footer) ========== */}
        
        {/* Main Pages */}
        <Route path="/" element={
          <>
            <Navbar />
            <div className="p-4">
              <Home />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/about-journal" element={
          <>
            <Navbar />
            <div className="p-4">
              <About />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/archive" element={
          <>
            <Navbar />
            <div className="p-4">
              <Archive />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/indexing" element={
          <>
            <Navbar />
            <div className="p-4">
              <Indexing />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/contact" element={
          <>
            <Navbar />
            <div className="p-4">
              <Contact />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/manuscript" element={
          <>
            <Navbar />
            <div className="p-4">
              <Manuscript />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/instructions" element={
          <>
            <Navbar />
            <div className="p-4">
              <Instructions />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/editorial-policy" element={
          <>
            <Navbar />
            <div className="p-4">
              <EditorialPoliciesPage />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/missionVisionPage" element={
          <>
            <Navbar />
            <div className="p-4">
              <MissionVisionPage />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/editorial-board" element={
          <>
            <Navbar />
            <div className="p-4">
              <Editorialpage />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/editorialboardform" element={
          <>
            <Navbar />
            <div className="p-4">
              <Editorialboardform />
            </div>
            <Footer />
          </>
        } />
        
        {/* ========== AUTH COMPONENTS ========== */}
        <Route path="/loginForm" element={
          <>
            <Navbar />
            <div className="p-4">
              <LoginForm />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/signupForm" element={
          <>
            <Navbar />
            <div className="p-4">
              <SignupForm />
            </div>
            <Footer />
          </>
        } />
        
        {/* ========== POLICY PAGES ========== */}
        <Route path="/OpenAccessPolicy" element={
          <>
            <Navbar />
            <div className="p-4">
              <OpenAccessPolicy />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/PeerReviewPolicy" element={
          <>
            <Navbar />
            <div className="p-4">
              <PeerReviewPolicy />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/copyrightPolicy" element={
          <>
            <Navbar />
            <div className="p-4">
              <CopyrightPolicy />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/PlagiarismPolicy" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlagiarismPolicy />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/PublicationEthics" element={
          <>
            <Navbar />
            <div className="p-4">
              <PublicationEthics />
            </div>
            <Footer />
          </>
        } />
        
        {/* ========== QUICK LINKS ========== */}
        <Route path="/JoinAsReviewer" element={
          <>
            <Navbar />
            <div className="p-4">
              <JoinAsReviewer />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/JoinAsEditorialMember" element={
          <>
            <Navbar />
            <div className="p-4">
              <JoinAsEditorialMember />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/PublishYourPaper" element={
          <>
            <Navbar />
            <div className="p-4">
              <PublishYourPaper />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/PublicationCertificate" element={
          <>
            <Navbar />
            <div className="p-4">
              <PublicationCertificate />
            </div>
            <Footer />
          </>
        } />
        
        {/* ========== ADDITIONAL PAGES ========== */}
        <Route path="/submission-guidelines" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Submission Guidelines" />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/author-guidelines" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Author Guidelines" />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/reviewer-guidelines" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Reviewer Guidelines" />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/current-issue" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Current Issue" />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/past-issues" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Past Issues" />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/special-issues" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Special Issues" />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/call-for-papers" element={
          <>
            <Navbar />
            <div className="p-4">
              <PlaceholderPage title="Call for Papers" />
            </div>
            <Footer />
          </>
        } />
        
        {/* ========== 404 PAGE (Must be LAST) ========== */}
        <Route path="*" element={
          <>
            <Navbar />
            <div className="p-4">
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
                  <p className="text-gray-500 mb-8">The page you are looking for does not exist.</p>
                  <a 
                    href="/" 
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Return to Home
                  </a>
                </div>
              </div>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;