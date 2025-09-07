import React, { useState, useEffect } from 'react';
import "../styles/Contactpageenquiries.css";
import { 
    Eye, 
    Trash2, 
    X, 
    Mail, 
    Phone, 
    User,
    Calendar,
    AlertCircle
} from 'lucide-react';

const Contactpageenquiries = ({ onBack }) => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // Get auth headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem("adminToken");
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    };

    // Fetch all enquiries from backend
    const fetchAllEnquiries = async () => {
        try {
            const response = await fetch(`/api/admin/enquires`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                if (response.status === 401) {
                    showToast('Authentication failed. Please login again.', 'error');
                    // Handle auth failure - redirect to login
                    return [];
                }
                throw new Error(`Failed to fetch enquiries: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching enquiries:', error);
            showToast('Failed to load enquiries. Please try again.', 'error');
            return [];
        }
    };

    // Delete enquiry from backend
    const deleteEnquiry = async (id) => {
        try {
            const response = await fetch(`/api/admin/enquiries/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    showToast('Authentication failed. Please login again.', 'error');
                    return;
                } else if (response.status === 404) {
                    showToast('Enquiry not found.', 'error');
                    return;
                }
                throw new Error(`Failed to delete enquiry: ${response.status}`);
            }
            
            // Some APIs return empty response for DELETE, handle both cases
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return { success: true };
        } catch (error) {
            console.error('Error deleting enquiry:', error);
            throw error;
        }
    };

    // Load enquiries on component mount
    useEffect(() => {
        loadEnquiries();
    }, []);

    const loadEnquiries = async () => {
        try {
            setLoading(true);
            const data = await fetchAllEnquiries();
            setEnquiries(data);
        } catch (error) {
            console.error('Error loading enquiries:', error);
            showToast('Failed to load enquiries', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await deleteEnquiry(id);
                setEnquiries(prevEnquiries =>
                    prevEnquiries.filter(enquiry => enquiry.id !== id)
                );
                showToast('Enquiry deleted successfully', 'success');
            } catch (error) {
                showToast('Failed to delete enquiry', 'error');
            }
        }
    };

    const handleViewDetails = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEnquiry(null);
    };

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 3000);
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    if (loading) {
        return (
            <div className="cpe-loading-container">
                <div className="cpe-loading-spinner"></div>
                <p>Loading enquiries...</p>
            </div>
        );
    }

    return (
        <div className="cpe-container">
            {/* Header */}
            <div className="cpe-header">
                {onBack && (
                    <button 
                        className="cpe-back-button"
                        onClick={onBack}
                        style={{
                            position: 'absolute',
                            left: '2.5rem',
                            top: '2rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--cpe-gray-600)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}
                    >
                        ← Back to Enquiries
                    </button>
                )}
                <h1 className="cpe-title">Contact Page Enquiries</h1>
                <p className="cpe-subtitle">
                    Manage user messages and enquiries submitted from Contact Us page
                </p>
            </div>

            {/* Table Container */}
            <div className="cpe-table-container">
                <div className="cpe-table-wrapper">
                    <table className="cpe-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Enquiry</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {enquiries.length === 0 ? (
                            <tr>
                            <td colSpan="6" className="cpe-no-data">
                                <div className="cpe-no-data-content">
                                <Mail size={48} />
                                <p>No enquiries found</p>
                                </div>
                            </td>
                            </tr>
                        ) : (
                            enquiries.map((enquiry) => (
                            <tr key={enquiry.id}>
                                <td>
                                <div className="cpe-name-cell">
                                    <User size={16} />
                                    <span>{enquiry.name || 'N/A'}</span>
                                </div>
                                </td>
                                <td>{enquiry.email || 'N/A'}</td>
                                <td>{enquiry.contactNumber || 'N/A'}</td>
                                <td>
                                <div className="cpe-enquiry-cell">
                                    <span>{truncateText(enquiry.message)}</span>
                                    <button
                                    className="cpe-view-btn"
                                    onClick={() => handleViewDetails(enquiry)}
                                    >
                                    <Eye size={14} />
                                    View Details
                                    </button>
                                </div>
                                </td>
                                <td>
                                <div className="cpe-date-cell">
                                    <Calendar size={14} />
                                    <span>{formatDate(enquiry.submittedAt)}</span>
                                </div>
                                </td>
                                <td>
                                <div className="cpe-actions">
                                    <button
                                    className="cpe-delete-btn"
                                    onClick={() => handleDelete(enquiry.id)}
                                    title="Delete Enquiry"
                                    >
                                    <Trash2 size={16} />
                                    </button>
                                </div>
                                </td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedEnquiry && (
            <div className="cpe-modal-overlay" onClick={closeModal}>
                <div className="cpe-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cpe-modal-header">
                    <h3>Enquiry Details</h3>
                    <button className="cpe-modal-close" onClick={closeModal}>
                    <X size={20} />
                    </button>
                </div>
                <div className="cpe-modal-content">
                    <div className="cpe-detail-row">
                    <label>Name:</label>
                    <span>{selectedEnquiry.name || 'N/A'}</span>
                    </div>
                    <div className="cpe-detail-row">
                    <label>Email:</label>
                    <span>{selectedEnquiry.email || 'N/A'}</span>
                    </div>
                    <div className="cpe-detail-row">
                    <label>Contact Number:</label>
                    <span>{selectedEnquiry.contactNumber || 'N/A'}</span>
                    </div>
                    <div className="cpe-detail-row">
                    <label>Date Submitted:</label>
                    <span>{formatDate(selectedEnquiry.submittedAt)}</span>
                    </div>
                    <div className="cpe-detail-full">
                    <label>Full Enquiry:</label>
                    <p>{selectedEnquiry.message || 'No message content'}</p>
                    </div>
                </div>
                <div className="cpe-modal-footer">
                    <button className="cpe-modal-cancel-btn" onClick={closeModal}>
                    Close
                    </button>
                </div>
                </div>
            </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
                <div className={`cpe-toast cpe-toast-${toast.type}`}>
                    <div className="cpe-toast-content">
                        <AlertCircle size={20} />
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contactpageenquiries;