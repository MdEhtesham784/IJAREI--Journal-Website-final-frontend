import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Download, 
  X, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building, 
  FileText, 
  Calendar,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import "../styles/EditorialApplications.css";

const EditorialApplications = ({ onBack }) => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth headers
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    'Content-Type': 'application/json'
  });

  // Fetch editorial applications from backend
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/editor/applications`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch applications: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
        const mappedData = data.map(item => ({
        id: item.id,
        name: item.fullName,
        email: item.email,
        degree: item.highestQualification,
        department: item.departmentAndInstitution,
        file: item.cvFileUrl,
        imgf: item.professionalPhotoUrl,
        submittedAt: item.submittedDate,
        contactNumber: item.contactNumber,
        post: item.currentPositionAndExperience
      }));
      setInquiries(mappedData);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message || 'Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely split department string
  const parseDepartment = (departmentString) => {
    if (!departmentString || typeof departmentString !== 'string') {
      return { department: 'N/A', institution: 'N/A' };
    }
    
    const parts = departmentString.split(',');
    return {
      department: parts[0]?.trim() || 'N/A',
      institution: parts[1]?.trim() || parts[0]?.trim() || 'N/A'
    };
  };

  // Helper function to safely get applicant initials
  const getApplicantInitials = (name) => {
    if (!name || typeof name !== 'string') {
      return 'NA';
    }
    return name.split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2); // Limit to 2 characters
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsPopupOpen(true);
  };

  const handleDownload = async (fileType, inquiryId, inquiryName) => {
  try {
    const endpointMap = {
      cv: 'download-cv',
      photo: 'download-photo'
    };

    const url = `/api/admin/editor/applications/${inquiryId}/${endpointMap[fileType]}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
      }
    });

    if (response.status === 401 || response.status === 403) {
      alert("Unauthorized: Please log in as an admin to download files.");
      return;
    }

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = fileType === 'cv' ? `CV_${inquiryId}.pdf` : `Photo_${inquiryId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlBlob);

    alert(`Successfully downloaded ${fileType.toUpperCase()} for ${inquiryName}`);
  } catch (err) {
    console.error('Error downloading file:', err);
    alert(`Failed to download ${fileType}. Please try again.`);
  }
};


  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedInquiry(null);
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    (inquiry.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inquiry.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inquiry.department || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  if (loading) {
    return (
      <div className="ea-container">
        <div className="ea-loading-container">
          <div className="ea-loading-spinner"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ea-container">
        <div className="ea-error-container">
          <h2>Error Loading Applications</h2>
          <p>{error}</p>
          <button 
            onClick={fetchApplications}
            className="ea-retry-button"
          >
            Retry
          </button>
          {onBack && (
            <button 
              onClick={onBack}
              className="ea-back-button"
            >
              Back to Enquiries
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ea-container">
      {/* Header */}
      <div className="ea-header">
        {onBack && (
          <button 
            className="ea-back-button"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back to Enquiries
          </button>
        )}
        <h1 className="ea-title">Editorial Board Applications</h1>
        <p className="ea-subtitle">
          Review and manage editorial board applications from researchers and academics
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="ea-controls-section">
        <div className="ea-stats-container">
          <div className="ea-stat-item">
            <span className="ea-stat-number">{inquiries.length}</span>
            <span className="ea-stat-label">Total Applications</span>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="ea-table-container">
        <div className="ea-table-header">
          <h2>Recent Applications</h2>
          <p>Review and manage editorial board applications</p>
        </div>
        
        <div className="ea-table-wrapper">
          {filteredInquiries.length === 0 ? (
            <div className="ea-no-data">
              <p>No editorial board applications found.</p>
            </div>
          ) : (
            <table className="ea-applications-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Institution</th>
                  <th>Degree</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => {
                  const departmentInfo = parseDepartment(inquiry.department);
                  
                  return (
                    <tr key={inquiry.id} className="ea-table-row">
                      <td>
                        <div className="ea-applicant-info">
                          <div className="ea-applicant-avatar">
                            {getApplicantInitials(inquiry.name)}
                          </div>
                          <div className="ea-applicant-details">
                            <div className="ea-applicant-name">{inquiry.name || 'N/A'}</div>
                            <div className="ea-applicant-email">{inquiry.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="ea-institution-info">
                          <div className="ea-institution-name">
                            {departmentInfo.institution}
                          </div>
                          <div className="ea-department-name">
                            {departmentInfo.department}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="ea-degree-badge">
                          {inquiry.degree || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="ea-date-info">
                          {inquiry.submittedAt ? formatDate(inquiry.submittedAt) : 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="ea-actions">
                          <button
                            onClick={() => handleView(inquiry)}
                            className="ea-action-btn ea-view-btn"
                            title="View Details"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <button
                            onClick={() => handleDownload('cv', inquiry.id, inquiry.name)}
                            className="ea-action-btn ea-download-btn"
                            title="Download CV"
                          >
                            <Download size={16} />
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedInquiry && (
        <div className="ea-modal-overlay" onClick={closePopup}>
          <div className="ea-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="ea-modal-header">
              <h2>Application Details</h2>
              <button onClick={closePopup} className="ea-modal-close">
                <X size={20} />
              </button>
            </div>
            
            <div className="ea-modal-body">
              <div className="ea-modal-section">
                <h3><User size={18} /> Personal Information</h3>
                <div className="ea-info-grid">
                  <div className="ea-info-item">
                    <span className="ea-info-label">Full Name:</span>
                    <span className="ea-info-value">{selectedInquiry.name || 'N/A'}</span>
                  </div>
                  <div className="ea-info-item">
                    <span className="ea-info-label">Email:</span>
                    <span className="ea-info-value">{selectedInquiry.email || 'N/A'}</span>
                  </div>
                  <div className="ea-info-item">
                    <span className="ea-info-label">Contact:</span>
                    <span className="ea-info-value">{selectedInquiry.contactNumber || 'N/A'}</span>
                  </div>
                  <div className="ea-info-item">
                    <span className="ea-info-label">Submitted:</span>
                    <span className="ea-info-value">
                      {selectedInquiry.submittedAt ? formatDate(selectedInquiry.submittedAt) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ea-modal-section">
                <h3><GraduationCap size={18} /> Academic Information</h3>
                <div className="ea-info-grid">
                  <div className="ea-info-item ea-full-width">
                    <span className="ea-info-label">Degree:</span>
                    <span className="ea-info-value">{selectedInquiry.degree || 'N/A'}</span>
                  </div>
                  <div className="ea-info-item ea-full-width">
                    <span className="ea-info-label">Department & Institution:</span>
                    <span className="ea-info-value">{selectedInquiry.department || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="ea-modal-section">
                <h3><FileText size={18} /> Professional Experience</h3>
                <div className="ea-experience-text">
                  {selectedInquiry.post || 'No information provided'}
                </div>
              </div>

              <div className="ea-modal-section">
                <h3><Download size={18} /> Attached Files</h3>
                <div className="ea-files-grid">
                  <div className="ea-file-item">
                    <div className="ea-file-info">
                      <div className="ea-file-icon">📄</div>
                      <div>
                        <div className="ea-file-name">CV/Resume</div>
                        <div className="ea-file-size">{selectedInquiry.file || 'No file'}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload('cv', selectedInquiry.id, selectedInquiry.name)}
                      className="ea-file-download-btn"
                      disabled={!selectedInquiry.file}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                  <div className="ea-file-item">
                    <div className="ea-file-info">
                      <div className="ea-file-icon">🖼️</div>
                      <div>
                        <div className="ea-file-name">Professional Photo</div>
                        <div className="ea-file-size">{selectedInquiry.imgf || 'No file'}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload('photo', selectedInquiry.id, selectedInquiry.name)}
                      className="ea-file-download-btn"
                      disabled={!selectedInquiry.imgf}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorialApplications;