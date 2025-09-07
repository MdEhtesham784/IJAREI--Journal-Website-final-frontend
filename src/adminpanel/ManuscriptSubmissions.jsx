import React, { useState, useEffect } from 'react';
import "../styles/ManuscriptSubmissions.css";
import { 
  Eye, 
  Download, 
  X, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  FileText, 
  Calendar,
  Search,
  Filter,
  File
} from 'lucide-react';

const ManuscriptAdmin = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [selectedManuscript, setSelectedManuscript] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth headers
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    'Content-Type': 'application/json'
  });

  // Fetch manuscripts from backend
  const fetchManuscripts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/manuscripts`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch manuscripts: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setManuscripts(data);
    } catch (err) {
      console.error('Error fetching manuscripts:', err);
      setError(err.message || 'Failed to load manuscript submissions');
    } finally {
      setLoading(false);
    }
  };

  // Load manuscripts on component mount
  useEffect(() => {
    fetchManuscripts();
  }, []);

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

  const handleView = async (manuscript) => {
    try {
      // Fetch detailed manuscript data if needed
      const response = await fetch(`/api/admin/manuscripts/${manuscript.id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch manuscript details: ${response.status} ${response.statusText}`);
      }

      const detailedManuscript = await response.json();
      setSelectedManuscript(detailedManuscript);
      setIsPopupOpen(true);
    } catch (err) {
      console.error('Error fetching manuscript details:', err);
      alert('Failed to load manuscript details. Please try again.');
    }
  };

  const handleDownload = async (manuscriptId, manuscriptTitle) => {
  try {
    const response = await fetch(`/api/admin/manuscripts/${manuscriptId}/download/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
    }

    // Extract filename from response headers
    const disposition = response.headers.get("content-disposition");
    let filename = "manuscript.pdf";
    if (disposition && disposition.includes("filename=")) {
      filename = disposition
        .split("filename=")[1]
        .split(";")[0]
        .replace(/["']/g, "");
    }

    // Convert response to blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create and click download link
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    alert(`Successfully downloaded "${manuscriptTitle}"`);
  } catch (err) {
    console.error('Error downloading manuscript:', err);
    alert('Failed to download manuscript. Please try again.');
  }
};

  
  // Delete manuscript
  const deleteManuscript = async (manuscriptId) => {
    if (!window.confirm('Are you sure you want to delete this manuscript? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/manuscripts/${manuscriptId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete manuscript: ${response.status} ${response.statusText}`);
      }

      // Refresh manuscripts list
      await fetchManuscripts();
      alert('Manuscript deleted successfully');
      
      // Close popup if the deleted manuscript was being viewed
      if (selectedManuscript && selectedManuscript.id === manuscriptId) {
        closePopup();
      }
    } catch (err) {
      console.error('Error deleting manuscript:', err);
      alert('Failed to delete manuscript. Please try again.');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedManuscript(null);
  };

  const filteredManuscripts = manuscripts.filter(manuscript =>
    manuscript.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manuscript.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manuscript.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="ma-admin-panel">
        <div className="ma-main-content">
          <div className="ma-content-header">
            <h1 className="ma-content-title">Manuscript</h1>
            <div className="ma-breadcrumb">
              <span>Admin</span>
              <span>›</span>
              <span>Manuscripts</span>
            </div>
          </div>
          <div className="ma-content-body">
            <div className="ma-loading-container">
              <div className="ma-loading-spinner"></div>
              <p>Loading manuscript submissions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ma-admin-panel">
        <div className="ma-main-content">
          <div className="ma-content-header">
            <h1 className="ma-content-title">Manuscript</h1>
            <div className="ma-breadcrumb">
              <span>Admin</span>
              <span>›</span>
              <span>Manuscripts</span>
            </div>
          </div>
          <div className="ma-content-body">
            <div className="ma-error-container">
              <p className="ma-error-message">Error: {error}</p>
              <button onClick={fetchManuscripts} className="ma-retry-btn">
                Retry Loading
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ma-admin-panel">
      <div className="ma-main-content">
        <div className="ma-content-header">
          <h1 className="ma-content-title">Manuscript</h1>
          <div className="ma-breadcrumb">
            <span>Admin</span>
            <span>›</span>
            <span>Manuscripts</span>
          </div>
        </div>
        
        <div className="ma-content-body">
          {/* Search and Filter Section */}
          <div className="ma-controls-section">
            <div className="ma-stats-container">
              <div className="ma-stat-item">
                <span className="ma-stat-number">{manuscripts.length}</span>
                <span className="ma-stat-label">Total Submissions</span>
              </div>
            </div>
          </div>

          {/* Manuscripts Table */}
          <div className="ma-table-container">
            <div className="ma-table-header">
              <h2>Recent Manuscript</h2>
              <p>Review and manage submitted research manuscripts</p>
            </div>
            
            <div className="ma-table-wrapper">
              <table className="ma-manuscripts-table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Article Title</th>
                    <th>Abstract Preview</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredManuscripts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="ma-no-data">
                        No manuscripts found
                      </td>
                    </tr>
                  ) : (
                    filteredManuscripts.map((manuscript) => (
                      <tr key={manuscript.id} className="ma-table-row">
                        <td>
                          <div className="ma-author-info">
                            <div className="ma-author-avatar">
                              {manuscript.name ? manuscript.name.split(' ').map(n => n[0]).join('') : 'N/A'}
                            </div>
                            <div className="ma-author-details">
                              <div className="ma-author-name">{manuscript.name || 'N/A'}</div>
                              <div className="ma-author-email">{manuscript.email || 'N/A'}</div>
                              <div className="ma-author-contact">{manuscript.contactNumber || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ma-article-title">
                            {truncateText(manuscript.title, 80)}
                          </div>
                        </td>
                        <td>
                          <div className="ma-abstract-preview">
                            {truncateText(manuscript.subject, 120)}
                          </div>
                        </td>
                        <td>
                          <div className="ma-date-info">
                            {manuscript.submittedAt ? formatDate(manuscript.submittedAt) : 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div className="ma-actions">
                            <button
                              onClick={() => handleView(manuscript)}
                              className="ma-action-btn ma-view-btn"
                              title="View Details"
                            >
                              <Eye size={16} />
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(manuscript.id, manuscript.filePath, manuscript.title)}
                              className="ma-action-btn ma-download-btn"
                              title="Download Manuscript"
                            >
                              <Download size={16} />
                              Download
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
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedManuscript && (
        <div className="ma-modal-overlay" onClick={closePopup}>
          <div className="ma-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="ma-modal-header">
              <h2>Manuscript Details</h2>
              <button onClick={closePopup} className="ma-modal-close">
                <X size={20} />
              </button>
            </div>
            
            <div className="ma-modal-body">
              <div className="ma-modal-section">
                <h3><User size={18} /> Author Information</h3>
                <div className="ma-info-grid">
                  <div className="ma-info-item">
                    <span className="ma-info-label">Author Name:</span>
                    <span className="ma-info-value">{selectedManuscript.name || 'N/A'}</span>
                  </div>
                  <div className="ma-info-item">
                    <span className="ma-info-label">Email:</span>
                    <span className="ma-info-value">{selectedManuscript.email || 'N/A'}</span>
                  </div>
                  <div className="ma-info-item">
                    <span className="ma-info-label">Contact:</span>
                    <span className="ma-info-value">{selectedManuscript.contactNumber || 'N/A'}</span>
                  </div>
                  <div className="ma-info-item">
                    <span className="ma-info-label">Submitted:</span>
                    <span className="ma-info-value">{selectedManuscript.submittedAt ? formatDate(selectedManuscript.submittedAt) : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="ma-modal-section">
                <h3><BookOpen size={18} /> Article Information</h3>
                <div className="ma-info-grid">
                  <div className="ma-info-item ma-full-width">
                    <span className="ma-info-label">Article Title:</span>
                    <span className="ma-info-value">{selectedManuscript.title || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="ma-modal-section">
                <h3><FileText size={18} /> Abstract / Subject</h3>
                <div className="ma-abstract-text">
                  {selectedManuscript.subject || 'No abstract available'}
                </div>
              </div>

              <div className="ma-modal-section">
                <h3><File size={18} /> Attached Manuscript</h3>
                <div className="ma-file-container">
                  <div className="ma-file-item">
                    <div className="ma-file-info">
                      <div className="ma-file-icon">
                        {selectedManuscript.filePath && selectedManuscript.filePath.endsWith('.pdf') ? '📄' : '📝'}
                      </div>
                      <div>
                        <div className="ma-file-name">Research Manuscript</div>
                        <div className="ma-file-size">{selectedManuscript.filePath || 'No file attached'}</div>
                      </div>
                    </div>
                    {selectedManuscript.filePath && (
                      <button
                        onClick={() => handleDownload(selectedManuscript.id, selectedManuscript.filePath, selectedManuscript.title)}
                        className="ma-file-download-btn"
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="ma-modal-section">
                <h3>Admin Actions</h3>
                <div className="ma-admin-actions">
                  <button
                    onClick={() => deleteManuscript(selectedManuscript.id)}
                    className="ma-action-btn ma-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManuscriptAdmin;