import React, { useState, useEffect } from 'react';
import "../styles/EnquiriesManagement.css";
import { 
    FileText, 
    Users, 
    MessageCircle, 
    ChevronRight
} from 'lucide-react';

const EnquiriesManagement = ({ updateNotificationCount, onNavigateToEnquiry, ...props }) => {
    // Mock navigate function for demonstration
    const navigate = (route) => {
        // In actual implementation with react-router-dom:
        // window.location.href = route; // Simple approach
        // OR use proper React Router navigation
        console.log(`Navigating to: ${route}`);
        alert(`Would navigate to: ${route}`);
    };
    const [enquiryCounts, setEnquiryCounts] = useState({
        editorial: 0,
        manuscripts: 0,
        contact: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Placeholder async functions for backend integration
    const fetchEditorialApplications = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/editor/applications', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            setError('Failed to load enquiries!');
            return { applications: [], count: 0 }; 
        }

    };

    const fetchManuscriptSubmissions = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/manuscripts', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            });
                const data = await response.json();
                return data;
        } catch (error) {
            setError('Failed to load enquiries!');
            return { applications: [], count: 0 };
        }
    };

    const fetchContactEnquiries = async () => {
        try {const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/enquires', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        });
            const data = await response.json();
            return data;
        } catch (error) {
            setError('Failed to load enquiries!');
            return { applications: [], count: 0 };
        }
    };

    const fetchAllEnquiryData = async () => {
        try {
            setLoading(true);
            const [editorial, manuscripts, contact] = await Promise.all([
                fetchEditorialApplications(),
                fetchManuscriptSubmissions(),
                fetchContactEnquiries()
            ]);

            const newCounts = {
                editorial: editorial.count || 0,
                manuscripts: manuscripts.count || 0,
                contact: contact.count || 0
            };

            setEnquiryCounts(newCounts);

            // Update total notification count
            const totalNotifications = newCounts.editorial + newCounts.manuscripts + newCounts.contact;
            if (updateNotificationCount) {
                updateNotificationCount(totalNotifications);
            }
        } catch (error) {
            console.error('Error fetching enquiry data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllEnquiryData();
    }, []);

    const handleManageClick = (route) => {
        // Extract the enquiry type from route
        const enquiryType = route.split('/').pop(); // Gets 'contact', 'editorial', or 'manuscripts'
        
        // Call parent component's navigation handler with specific enquiry type
        if (onNavigateToEnquiry) {
            onNavigateToEnquiry(enquiryType);
        } else {
            // Fallback - log for debugging
            console.log(`Would navigate to: ${route} for ${enquiryType} enquiries`);
            alert(`Navigation handler not provided. Would navigate to: ${route}`);
        }
    };

    const enquiryModules = [
        {
            id: 'editorial',
            title: 'Editorial Applications',
            description: 'Manage applications from researchers and academics interested in joining the editorial board. Review qualifications, expertise areas, and process new member applications.',
            icon: Users,
            route: '/enquiries/editorial',
            count: enquiryCounts.editorial,
            color: 'var(--eq-accent-green)'
        },
        {
            id: 'manuscripts',
            title: 'Manuscript',
            description: 'Handle manuscript submission enquiries, track submission status requests, and manage author communications regarding the peer review process.',
            icon: FileText,
            route: '/enquiries/manuscripts',
            count: enquiryCounts.manuscripts,
            color: 'var(--eq-accent-gold)'
        },
        {
            id: 'contact',
            title: 'Contact Page Enquiries',
            description: 'Respond to general inquiries from the contact page including partnership requests, technical support, and general journal information requests.',
            icon: MessageCircle,
            route: '/enquiries/contact',
            count: enquiryCounts.contact,
            color: 'var(--eq-accent-brown)'
        }
    ];

    if (loading) {
        return (
            <div className="eq-loading-container">
                <div className="eq-loading-spinner"></div>
                <p>Loading enquiry data...</p>
            </div>
        );
    }

    return (
        <div className="eq-enquiries-management">
            <div className="eq-header">
                <h2 className="eq-title">Enquiries Management</h2>
                <p className="eq-subtitle">
                    Manage and respond to various types of enquiries received through different channels
                </p>
            </div>



            <div className="eq-modules-grid">
                {enquiryModules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                        <div key={module.id} className="eq-module-card">
                            <div className="eq-card-header">
                                <div className="eq-card-icon" style={{ backgroundColor: module.color }}>
                                    <IconComponent size={28} />
                                </div>
                                {module.count > 0 && (
                                    <div className="eq-notification-badge">
                                        {module.count}
                                    </div>
                                )}
                            </div>
                            
                            <div className="eq-card-content">
                                <h3 className="eq-card-title">{module.title}</h3>
                                <p className="eq-card-description">{module.description}</p>
                            </div>

                            <div className="eq-card-footer">
                                <button 
                                    className="eq-manage-btn"
                                    onClick={() => handleManageClick(module.route)}
                                >
                                    <span>Manage</span>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="eq-refresh-section">
                <button 
                    className="eq-refresh-btn"
                    onClick={fetchAllEnquiryData}
                    disabled={loading}
                >
                    Refresh Data
                </button>
                <p className="eq-last-updated">
                    Last updated: {new Date().toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default EnquiriesManagement;