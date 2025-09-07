import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    X,
    BarChart3,
    FileText,
    Users,
    Bookmark,
    Archive,
    MessageCircle,
    Bell,
    PlusIcon,
    ChevronRight,
    Settings
} from 'lucide-react';
import '../styles/AdminPanel.css';
import { jwtDecode } from "jwt-decode";

// Import existing components
import ArticleUploadForm from '../adminpanel/ArticleUploadForm';
import EditorialBoardManagement from '../adminpanel/EditorialBoardManagement';
import IndexingManagement from '../adminpanel/IndexingManagement';
import Dashboard from '../adminpanel/Dashboard';
import AllArticles from '../adminpanel/AllArticles';
import EnquiriesManagement from '../adminpanel/EnquiriesManagement';
import Volumeissue from '../adminpanel/Volumeissue';
import Assignadmin from '../adminpanel/Assignadmin';
 

// Import enquiry-specific components
import Contactpageenquiries from '../adminpanel/Contactpageenquiries';
import ManuscriptSubmissions from '../adminpanel/ManuscriptSubmissions';
import EditorialApplications from '../adminpanel/EditorialApplications';

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true; // treat invalid token as expired
  }
}

const AdminPanel = () => {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("adminToken"));


    // State to track which enquiry type is active
    const [activeEnquiryType, setActiveEnquiryType] = useState(null);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/admin/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            
            const data = await response.json();
            setNotifications(data);
            
            // Count unread notifications
            const unreadCount = data.filter(notification => !notification.readStatus).length;
            setNotificationCount(unreadCount);
            
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Mark notification as read
    const markNotificationAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/api/admin/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }
            
            // Refresh notifications after marking as read
            await fetchNotifications();
            
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const unreadNotifications = notifications.filter(n => !n.readStatus);
            
            // Mark all unread notifications as read
            await Promise.all(
                unreadNotifications.map(notification => 
                    fetch(`/api/admin/notifications/${notification.id}/read`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                )
            );
            
            // Refresh notifications
            await fetchNotifications();
            
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const formatNotificationTime = (dateTime) => {
        const date = new Date(dateTime);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const updateNotificationCount = (count) => {
        setNotificationCount(count);
    };
    
    

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken || isTokenExpired(token)) {
      // Token missing or expired, redirect to login page
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminSession");
      localStorage.removeItem("isAdminLoggedIn");
      navigate("/admin-login");
    } else {
            setToken(adminToken);
        }
  }, [navigate]);

  useEffect(() => {
        if (token) {
            fetchNotifications();
            
            // Poll for new notifications every 30 seconds
            const interval = setInterval(fetchNotifications, 30000);
            
            return () => clearInterval(interval);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminSession');
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin-login');
    };

    const handleAssignAdmin = () => {
        // Navigate to assign-admin section within the admin panel
        setActiveSection('assign-admin');
        setMobileMenuOpen(false);
    };

    

    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'volume-issues', label: 'Volume & Issues', icon: PlusIcon },
        { id: 'article-upload', label: 'Article Upload', icon: FileText },
        { id: 'editorial-board-management', label: 'Editorial Board Management', icon: Users },
        { id: 'indexing', label: 'Indexing Management', icon: Bookmark },
        { id: 'all-articles', label: 'All Articles', icon: Archive },
        { id: 'enquiries', label: 'Enquiries Management', icon: MessageCircle },
        { id: 'assign-admin', label: 'Admin Management', icon: Settings }
    ];

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        setActiveEnquiryType(null); // Reset enquiry type when switching sections
        setMobileMenuOpen(false);
        setShowNotificationDropdown(false);
    };

    // Function to handle enquiry type navigation
    const handleEnquiryNavigation = (enquiryType) => {
        setActiveSection('enquiries');
        setActiveEnquiryType(enquiryType);
        setMobileMenuOpen(false);
        setShowNotificationDropdown(false);
    };

    // Function to go back to main enquiries page
    const handleBackToEnquiries = () => {
        setActiveEnquiryType(null);
    };

    const getCurrentSectionLabel = () => {
        if (activeSection === 'enquiries' && activeEnquiryType) {
            switch (activeEnquiryType) {
                case 'contact':
                    return 'Contact Page Enquiries';
                case 'editorial':
                    return 'Editorial Applications';
                case 'manuscripts':
                    return 'Manuscript';
                default:
                    return 'Enquiries Management';
            }
        }

        const currentItem = navigationItems.find(item => item.id === activeSection);
        return currentItem ? currentItem.label : 'Dashboard';
    };

    // Function to render content based on active section
    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard onNavigate={handleSectionChange} />;

            case 'volume-issues':
                return <Volumeissue />;

            case 'article-upload':
                return <ArticleUploadForm />;

            case 'editorial-board-management':
                return <EditorialBoardManagement />;

            case 'indexing':
                return <IndexingManagement />;

            case 'all-articles':
                return <AllArticles onNavigateToUpload={() => setActiveSection('article-upload')} />;


            case 'assign-admin':
                return <Assignadmin />;

            case 'enquiries':
                switch (activeEnquiryType) {
                    case 'contact':
                        return <Contactpageenquiries onBack={handleBackToEnquiries} />;

                    case 'editorial':
                        return <EditorialApplications onBack={handleBackToEnquiries} />;

                    case 'manuscripts':
                        return <ManuscriptSubmissions onBack={handleBackToEnquiries} />;

                    default:
                        return (
                            <EnquiriesManagement
                                updateNotificationCount={updateNotificationCount}
                                onNavigateToEnquiry={handleEnquiryNavigation}
                            />
                        );
                }

            default:
                return (
                    <div className="ap-placeholder-content">
                        <div className="ap-placeholder-icon">
                            <FileText size={48} />
                        </div>
                        <h3>Selected Page Content Here</h3>
                        <p>This is where the content for "{getCurrentSectionLabel()}" will be displayed.</p>
                    </div>
                );
        }
    };

    return (
        <div className="ap-admin-panel">
            {/* Topbar */}
            <header className="ap-topbar">
                <div className="ap-topbar-left">
                    <button
                        className="ap-mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                    >
                        <Menu size={24} />
                    </button>
                    <div className="ap-logo-section">
                        <h1>IJAREI</h1>
                        <span className="ap-journal-subtitle">Editorial System</span>
                    </div>
                </div>
                <div className="ap-topbar-right">
                    {/* Enhanced Notification Dropdown */}
                    <div className="ap-notification-container">
                        <button
                            className="ap-topbar-icon ap-notification-btn"
                            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                        >
                            <Bell size={20} />
                            {notificationCount > 0 && (
                                <span className="ap-notification-badge">{notificationCount}</span>
                            )}
                        </button>
                        
                        {showNotificationDropdown && (
                            <div className="ap-notification-dropdown">
                                <div className="ap-notification-header">
                                    <h3>Notifications</h3>
                                    <div className="ap-notification-actions">
                                        {notificationCount > 0 && (
                                            <button 
                                                className="ap-mark-all-read"
                                                onClick={markAllAsRead}
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                        <button
                                            className="ap-close-notifications"
                                            onClick={() => setShowNotificationDropdown(false)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="ap-notification-list">
                                    {notifications.length === 0 ? (
                                        <div className="ap-no-notifications">
                                            <p>No notifications</p>
                                        </div>
                                    ) : (
                                        notifications.slice(0, 10).map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`ap-notification-item ${!notification.readStatus ? 'ap-unread' : ''}`}
                                            >
                                                <div className="ap-notification-content">
                                                    <div className="ap-notification-type">
                                                        {notification.type}
                                                    </div>
                                                    <div className="ap-notification-message">
                                                        {notification.message}
                                                    </div>
                                                    <div className="ap-notification-time">
                                                        {formatNotificationTime(notification.createdAt)}
                                                    </div>
                                                </div>
                                                {!notification.readStatus && (
                                                    <button
                                                        className="ap-mark-read-btn"
                                                        onClick={() => markNotificationAsRead(notification.id)}
                                                        title="Mark as read"
                                                    >
                                                        •
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                                
                                {notifications.length > 10 && (
                                    <div className="ap-notification-footer">
                                        <button 
                                            className="ap-view-all-notifications"
                                            onClick={() => {
                                                setShowNotificationDropdown(false);
                                                handleSectionChange('enquiries');
                                            }}
                                        >
                                            View all notifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <button
                        className="ap-logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button
                        className="ap-assign-admin-btn"
                        onClick={handleAssignAdmin}
                    >
                        Assign Admin
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`ap-sidebar ${sidebarCollapsed ? 'ap-collapsed' : ''} ${mobileMenuOpen ? 'ap-mobile-open' : ''}`}>
                <div className="ap-sidebar-header">
                    <button
                        className="ap-sidebar-toggle ap-desktop-only"
                        onClick={toggleSidebar}
                    >
                        <Menu size={20} />
                    </button>
                    <button
                        className="ap-sidebar-close ap-mobile-only"
                        onClick={toggleMobileMenu}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="ap-sidebar-nav">
                    {navigationItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`ap-nav-item ${activeSection === item.id ? 'ap-active' : ''}`}
                                onClick={() => handleSectionChange(item.id)}
                                title={sidebarCollapsed ? item.label : ''}
                            >
                                <IconComponent size={20} />
                                {!sidebarCollapsed && (
                                    <>
                                        <span className="ap-nav-label">{item.label}</span>
                                        <ChevronRight size={16} className="ap-nav-arrow" />
                                    </>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Overlay */}
            {mobileMenuOpen && <div className="ap-mobile-overlay" onClick={toggleMobileMenu}></div>}

            {/* Main Content */}
            <main className={`ap-main-content ${sidebarCollapsed ? 'ap-sidebar-collapsed' : ''}`}>
                {/* Show header for most sections, but handle enquiry sub-pages and assign-admin */}
                {!['article-upload', 'editorial-board-management', 'assign-admin'].includes(activeSection) && (
                    <div className="ap-content-header">
                        <h2 className="ap-content-title">
                            {getCurrentSectionLabel()}
                            {/* Show back button for enquiry sub-pages */}
                            {activeSection === 'enquiries' && activeEnquiryType && (
                                <button
                                    className="ap-back-button"
                                    onClick={handleBackToEnquiries}
                                    style={{
                                        marginLeft: '20px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: 'var(--ap-accent-brown)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    ← Back to Enquiries
                                </button>
                            )}
                        </h2>
                        <div className="ap-breadcrumb">
                            <span>Admin Panel</span>
                            <ChevronRight size={14} />
                            <span>{getCurrentSectionLabel()}</span>
                            {activeEnquiryType && (
                                <>
                                    <ChevronRight size={14} />
                                    <span>
                                        {activeEnquiryType === 'contact' && 'Contact Page Enquiries'}
                                        {activeEnquiryType === 'editorial' && 'Editorial Applications'}
                                        {activeEnquiryType === 'manuscripts' && 'Manuscript'}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className={`ap-content-body ${['article-upload', 'editorial-board-management', 'assign-admin'].includes(activeSection) ? 'ap-no-padding' : ''}`}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;