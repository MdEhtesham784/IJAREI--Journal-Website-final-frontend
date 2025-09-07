import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Dashboard.css';
import {
    FileText,
    Users,
    Database,
    MessageSquare,
    BarChart3,
    Upload,
    UserCheck,
    List,
    Mail,
    TrendingUp,
    Activity
} from 'lucide-react';

// Stats Cards Component
const StatsSection = ({ stats, isLoading }) => {
    return (
        <div className="dashboard-stats-section">
            <div className="dashboard-stats-grid">
                <div className="dashboard-card dashboard-stats-card">
                    <div className="dashboard-card-icon-wrapper dashboard-card-articles">
                        <FileText className="dashboard-card-icon" />
                    </div>
                    <div className="dashboard-card-content">
                        <div className="dashboard-card-value">
                            {isLoading ? '...' : stats.totalArticles}
                        </div>
                        <div className="dashboard-card-label">Total Articles</div>
                        <div className="dashboard-card-trend dashboard-card-trend-up">
                        </div>
                    </div>
                </div>

                <div className="dashboard-card dashboard-stats-card">
                    <div className="dashboard-card-icon-wrapper dashboard-card-members">
                        <Users className="dashboard-card-icon" />
                    </div>
                    <div className="dashboard-card-content">
                        <div className="dashboard-card-value">
                            {isLoading ? '...' : stats.editorialMembers}
                        </div>
                        <div className="dashboard-card-label">Editorial Members</div>
                        <div className="dashboard-card-trend dashboard-card-trend-neutral">
                        </div>
                    </div>
                </div>

                <div className="dashboard-card dashboard-stats-card">
                    <div className="dashboard-card-icon-wrapper dashboard-card-indexings">
                        <Database className="dashboard-card-icon" />
                    </div>
                    <div className="dashboard-card-content">
                        <div className="dashboard-card-value">
                            {isLoading ? '...' : stats.indexings}
                        </div>
                        <div className="dashboard-card-label">Indexings</div>
                        <div className="dashboard-card-trend dashboard-card-trend-up">
                        </div>
                    </div>
                </div>

                <div className="dashboard-card dashboard-stats-card">
                    <div className="dashboard-card-icon-wrapper dashboard-card-enquiries">
                        <MessageSquare className="dashboard-card-icon" />
                    </div>
                    <div className="dashboard-card-content">
                        <div className="dashboard-card-value">
                            {isLoading ? '...' : stats.enquiries}
                        </div>
                        <div className="dashboard-card-label">Enquiries</div>
                        <div className="dashboard-card-trend dashboard-card-trend-up">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Navigation Shortcuts Component
const NavigationShortcuts = ({ onNavigate }) => {
    const shortcuts = [
        {
            title: 'Dashboard',
            description: 'Overview and analytics',
            icon: BarChart3,
            id: 'dashboard',
            color: 'dashboard-shortcut-primary'
        },
        {
            title: 'Article Upload',
            description: 'Submit new articles',
            icon: Upload,
            id: 'article-upload',
            color: 'dashboard-shortcut-success'
        },
        {
            title: 'Editorial Board',
            description: 'Manage editorial team',
            icon: UserCheck,
            id: 'editorial-board-management',
            color: 'dashboard-shortcut-info'
        },
        {
            title: 'Indexing',
            description: 'Database management',
            icon: Database,
            id: 'indexing',
            color: 'dashboard-shortcut-warning'
        },
        {
            title: 'All Articles',
            description: 'Browse article library',
            icon: List,
            id: 'all-articles',
            color: 'dashboard-shortcut-secondary'
        },
        {
            title: 'Enquiries',
            description: 'Review submissions',
            icon: Mail,
            id: 'enquiries',
            color: 'dashboard-shortcut-accent'
        }
    ];

    return (
        <div className="dashboard-shortcuts-section">
            <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">Quick Navigation</h2>
                <p className="dashboard-section-subtitle">Access key features and tools</p>
            </div>

            <div className="dashboard-shortcuts-grid">
                {shortcuts.map((shortcut, index) => {
                    const IconComponent = shortcut.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => onNavigate(shortcut.id)}
                            className={`dashboard-shortcut-card ${shortcut.color}`}
                        >
                            <div className="dashboard-shortcut-icon-wrapper">
                                <IconComponent className="dashboard-shortcut-icon" />
                            </div>
                            <div className="dashboard-shortcut-content">
                                <h3 className="dashboard-shortcut-title">{shortcut.title}</h3>
                                <p className="dashboard-shortcut-description">{shortcut.description}</p>
                            </div>
                            <div className="dashboard-shortcut-arrow">
                                <span className="dashboard-arrow-indicator">→</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Main Dashboard Component
const AdminDashboard = ({ onNavigate }) => {
    const [dashboardStats, setDashboardStats] = useState({
        totalArticles: 0,
        editorialMembers: 0,
        indexings: 0,
        enquiries: 0
    });

    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [error, setError] = useState(null);


    // Get auth headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem("adminToken");
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    };

    // Fetch dashboard statistics from backend
    const fetchDashboardData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/admin/dashboard/stats`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Authentication failed. Please login again.');
                    // Handle auth failure - redirect to login or show login modal
                    return;
                }
                throw new Error(`Failed to fetch dashboard data: ${response.status}`);
            }

            const data = await response.json();
            
            // Update stats with backend data
            setDashboardStats({
                totalArticles: data.totalArticles || data.articlesCount || 0,
                editorialMembers: data.editorialMembers || data.editorialBoardCount || 0,
                indexings: data.indexings || data.indexingCount || 0,
                enquiries: data.enquiries || data.enquiriesCount || 0
            });

            setLastUpdated(new Date());
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch additional stats if needed (alternative approach with multiple endpoints)
    const fetchIndividualStats = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const [articlesRes, membersRes, indexingsRes, enquiriesRes] = await Promise.allSettled([
                fetch(`/articles/count`, { headers: getAuthHeaders() }),
                fetch(`/editorial-board/count`, { headers: getAuthHeaders() }),
                fetch(`/indexings/count`, { headers: getAuthHeaders() }),
                fetch(`}/enquiries/count`, { headers: getAuthHeaders() })
            ]);

            const stats = {
                totalArticles: 0,
                editorialMembers: 0,
                indexings: 0,
                enquiries: 0
            };

            // Process articles count
            if (articlesRes.status === 'fulfilled' && articlesRes.value.ok) {
                const data = await articlesRes.value.json();
                stats.totalArticles = data.count || data.total || 0;
            }

            // Process editorial members count
            if (membersRes.status === 'fulfilled' && membersRes.value.ok) {
                const data = await membersRes.value.json();
                stats.editorialMembers = data.count || data.total || 0;
            }

            // Process indexings count
            if (indexingsRes.status === 'fulfilled' && indexingsRes.value.ok) {
                const data = await indexingsRes.value.json();
                stats.indexings = data.count || data.total || 0;
            }

            // Process enquiries count
            if (enquiriesRes.status === 'fulfilled' && enquiriesRes.value.ok) {
                const data = await enquiriesRes.value.json();
                stats.enquiries = data.count || data.total || 0;
            }

            setDashboardStats(stats);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            setError('Failed to load some dashboard data.');
        } finally {
            setIsLoading(false);
        }
    };

    // Load dashboard data on component mount
    useEffect(() => {
        fetchDashboardData();

        // Set up auto-refresh every 5 minutes
        const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Manual refresh handler
    const handleRefreshData = () => {
        fetchDashboardData();
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <div className="dashboard-header-content">
                        <div className="dashboard-title-section">
                            <h1 className="dashboard-title">Admin Dashboard</h1>
                            <p className="dashboard-subtitle">
                                Welcome back! Here's an overview of your journal management system.
                            </p>
                            {error && (
                                <div className="dashboard-error-message">
                                    <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</span>
                                </div>
                            )}
                        </div>

                        <div className="dashboard-header-actions">
                            <div className="dashboard-last-updated">
                                Last Updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                            <button
                                className="dashboard-refresh-btn"
                                onClick={handleRefreshData}
                                disabled={isLoading}
                            >
                                <Activity className={`dashboard-refresh-icon ${isLoading ? 'dashboard-refreshing' : ''}`} />
                                {isLoading ? 'Updating...' : 'Refresh'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="dashboard-main-content">
                    {/* Stats Section */}
                    <StatsSection stats={dashboardStats} isLoading={isLoading} />

                    {/* Content Grid */}
                    <div className="dashboard-content-grid">
                        {/* Navigation Shortcuts */}
                        <div className="dashboard-content-primary">
                            <NavigationShortcuts onNavigate={onNavigate} />
                        </div>
                    </div>
                </div>

                {/* Dashboard Footer */}
                <div className="dashboard-footer">
                    <div className="dashboard-footer-content">
                        <p className="dashboard-footer-text">
                            Journal Management System v2.1.0 •
                            <a href="/help" className="dashboard-footer-link" onClick={(e) => {
                                e.preventDefault();
                                console.log('Navigate to: /help');
                            }}>Help & Support</a> •
                            <a href="/settings" className="dashboard-footer-link" onClick={(e) => {
                                e.preventDefault();
                                console.log('Navigate to: /settings');
                            }}>Settings</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;