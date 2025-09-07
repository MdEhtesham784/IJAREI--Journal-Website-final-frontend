import React, { useState, useEffect } from 'react';
import '../styles/VolumeManagement.css'; 
import { ChevronRight, Plus, Trash2, ArrowLeft } from 'lucide-react';

const VolumeManagement = () => {
  // States
  const [currentView, setCurrentView] = useState('volumes'); // 'volumes', 'issues', 'parts'
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  // Data states
  const [volumes, setVolumes] = useState([]);
  const [issues, setIssues] = useState([]);
  const [parts, setParts] = useState([]);
  
  // Modal states
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showPartModal, setShowPartModal] = useState(false);
  
  // Form states
  const [volumeForm, setVolumeForm] = useState({ number: '', year: '' });
  const [issueForm, setIssueForm] = useState({ number: '' });
  const [partForm, setPartForm] = useState({ title: '' });
  
  // Enhanced functionality
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [error, setError] = useState(null);

  

  // Get auth headers
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    'Content-Type': 'application/json'
  });

  // Utility functions
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const validateVolumeForm = () => {
    if (!volumeForm.number.trim()) {
      showToast('Please enter volume number', 'error');
      return false;
    }
    if (!volumeForm.year.trim()) {
      showToast('Please enter year', 'error');
      return false;
    }
    if (!/^\d{4}$/.test(volumeForm.year)) {
      showToast('Please enter a valid year (4 digits)', 'error');
      return false;
    }
    return true;
  };

  const validateIssueForm = () => {
    if (!issueForm.number.trim()) {
      showToast('Please enter issue number', 'error');
      return false;
    }
    return true;
  };

  const validatePartForm = () => {
    if (!partForm.title.trim()) {
      showToast('Please enter part title', 'error');
      return false;
    }
    return true;
  };

  const showConfirm = (message) => {
    return window.confirm(message);
  };

  // Load data functions
  const loadVolumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/volumes`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch volumes: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setVolumes(data);
    } catch (error) {
      console.error('Error loading volumes:', error);
      setError(error.message || 'Failed to load volumes');
      showToast('Failed to load volumes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadIssues = async (volumeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/issuesByVolume/${volumeId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch issues: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error loading issues:', error);
      setError(error.message || 'Failed to load issues');
      showToast('Failed to load issues', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadParts = async (issueId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/partsByIssue/${issueId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch parts: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setParts(data);
    } catch (error) {
      console.error('Error loading parts:', error);
      setError(error.message || 'Failed to load parts');
      showToast('Failed to load parts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolumes();
  }, []);

  // Volume operations
  const handleAddVolume = async () => {
    if (!validateVolumeForm()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/volumes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          number: volumeForm.number.trim(),
          year: volumeForm.year.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add volume: ${response.status} ${response.statusText}`);
      }

      const newVolume = await response.json();
      setVolumes([...volumes, newVolume]);
      setVolumeForm({ number: '', year: '' });
      setShowVolumeModal(false);
      showToast('Volume added successfully');
      
    } catch (error) {
      console.error('Error adding volume:', error);
      showToast(error.message || 'Error adding volume', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVolume = async (volumeId) => {
    if (!showConfirm('Are you sure you want to delete this volume?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/volumes/${volumeId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete volume: ${response.status} ${response.statusText}`);
      }

      setVolumes(volumes.filter(vol => vol.id !== volumeId));
      showToast('Volume deleted successfully');
    } catch (error) {
      console.error('Error deleting volume:', error);
      showToast(error.message || 'Error deleting volume', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Issue operations
  const handleAddIssue = async () => {
    if (!validateIssueForm()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/issues?volumeId=${selectedVolume.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          number: issueForm.number.trim(),
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add issue: ${response.status} ${response.statusText}`);
      }

      const newIssue = await response.json();
      setIssues([...issues, newIssue]);
      setIssueForm({ number: '' });
      setShowIssueModal(false);
      showToast('Issue added successfully');
      
    } catch (error) {
      console.error('Error adding issue:', error);
      showToast(error.message || 'Error adding issue', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIssue = async (issueId) => {
    if (!showConfirm('Are you sure you want to delete this issue?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/issues/${issueId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete issue: ${response.status} ${response.statusText}`);
      }

      setIssues(issues.filter(issue => issue.id !== issueId));
      showToast('Issue deleted successfully');
    } catch (error) {
      console.error('Error deleting issue:', error);
      showToast(error.message || 'Error deleting issue', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Part operations
  const handleAddPart = async () => {
    if (!validatePartForm()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/parts?issueId=${selectedIssue.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          label: partForm.title.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add part: ${response.status} ${response.statusText}`);
      }

      const newPart = await response.json();
      setParts([...parts, newPart]);
      setPartForm({ title: '' });
      setShowPartModal(false);
      showToast('Part added successfully');
      
    } catch (error) {
      console.error('Error adding part:', error);
      showToast(error.message || 'Error adding part', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePart = async (partId) => {
    if (!showConfirm('Are you sure you want to delete this part?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/parts/${partId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete part: ${response.status} ${response.statusText}`);
      }

      setParts(parts.filter(part => part.id !== partId));
      showToast('Part deleted successfully');
    } catch (error) {
      console.error('Error deleting part:', error);
      showToast(error.message || 'Error deleting part', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update volume
  const handleUpdateVolume = async (volumeId, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`/volumes/${volumeId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update volume: ${response.status} ${response.statusText}`);
      }

      const updatedVolume = await response.json();
      setVolumes(volumes.map(vol => vol.id === volumeId ? updatedVolume : vol));
      showToast('Volume updated successfully');
      
      // Refresh data if needed
      await loadVolumes();
    } catch (error) {
      console.error('Error updating volume:', error);
      showToast(error.message || 'Error updating volume', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update issue
  const handleUpdateIssue = async (issueId, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`/issues/${issueId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update issue: ${response.status} ${response.statusText}`);
      }

      const updatedIssue = await response.json();
      setIssues(issues.map(issue => issue.id === issueId ? updatedIssue : issue));
      showToast('Issue updated successfully');
    } catch (error) {
      console.error('Error updating issue:', error);
      showToast(error.message || 'Error updating issue', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update part
  const handleUpdatePart = async (partId, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`/parts/${partId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update part: ${response.status} ${response.statusText}`);
      }

      const updatedPart = await response.json();
      setParts(parts.map(part => part.id === partId ? updatedPart : part));
      showToast('Part updated successfully');
    } catch (error) {
      console.error('Error updating part:', error);
      showToast(error.message || 'Error updating part', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions
  const openVolume = (volume) => {
    setSelectedVolume(volume);
    setCurrentView('issues');
    loadIssues(volume.id);
  };

  const openIssue = (issue) => {
    setSelectedIssue(issue);
    setCurrentView('parts');
    loadParts(issue.id);
  };

  const goBack = () => {
    if (currentView === 'parts') {
      setCurrentView('issues');
      setSelectedIssue(null);
    } else if (currentView === 'issues') {
      setCurrentView('volumes');
      setSelectedVolume(null);
    }
  };

  // Retry function for error states
  const retryOperation = () => {
    setError(null);
    if (currentView === 'volumes') {
      loadVolumes();
    } else if (currentView === 'issues' && selectedVolume) {
      loadIssues(selectedVolume.id);
    } else if (currentView === 'parts' && selectedIssue) {
      loadParts(selectedIssue.id);
    }
  };

  const Breadcrumb = () => (
    <div className="volume-breadcrumb">
      <span onClick={() => {
        setCurrentView('volumes');
        setSelectedVolume(null);
        setSelectedIssue(null);
      }}>
        Volumes
      </span>
      {selectedVolume && (
        <>
          <ChevronRight size={16} className="volume-breadcrumb-chevron" />
          <span onClick={() => setCurrentView('issues')}>
            Volume {selectedVolume.number} ({selectedVolume.year})
          </span>
        </>
      )}
      {selectedIssue && (
        <>
          <ChevronRight size={16} className="volume-breadcrumb-chevron" />
          <span>Issue {selectedIssue.number}</span>
        </>
      )}
    </div>
  );

  // Error display component
  const ErrorDisplay = () => (
    <div className="volume-error-container">
      <p className="volume-error-message">Error: {error}</p>
      <button onClick={retryOperation} className="volume-retry-btn">
        Retry
      </button>
    </div>
  );

  return (
    <div className="volume-management">
      {toast.show && (
        <div className={`volume-toast ${toast.type === 'error' ? 'volume-toast-error' : 'volume-toast-success'}`}>
          <p className="volume-toast-message">{toast.message}</p>
        </div>
      )}
      
      <Breadcrumb />
      
      {currentView !== 'volumes' && (
        <button className="volume-back-button" onClick={goBack} disabled={loading}>
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      {loading && (
        <div className="volume-loading">
          <div className="volume-loading-spinner"></div>
          <p className="volume-loading-text">Loading...</p>
        </div>
      )}

      {error && !loading && <ErrorDisplay />}

      {/* Volumes View */}
      {currentView === 'volumes' && !loading && !error && (
        <div className="volume-view-container">
          <div className="volume-view-header">
            <h2 className="volume-view-title">Volumes ({volumes.length})</h2>
            <button className="volume-add-button" onClick={() => setShowVolumeModal(true)}>
              <Plus size={16} />
              Add New Volume
            </button>
          </div>
          
          {volumes.length === 0 ? (
            <div className="volume-empty-state">
              <p className="volume-empty-message">No volumes available. Add a new volume to get started.</p>
            </div>
          ) : (
            <div className="volume-table-container">
              <table className="volume-table">
                <thead>
                  <tr>
                    <th>Volume Number</th>
                    <th>Year</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volumes.map((volume) => (
                    <tr key={volume.id}>
                      <td className="volume-table-clickable" onClick={() => openVolume(volume)}>
                        Volume {volume.number || 'N/A'}
                      </td>
                      <td>{volume.year || 'N/A'}</td>
                      <td>{volume.createdAt ? new Date(volume.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <div className="volume-table-actions">
                          <button className="volume-delete-button" onClick={() => handleDeleteVolume(volume.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Issues View */}
      {currentView === 'issues' && selectedVolume && !loading && !error && (
        <div className="volume-view-container">
          <div className="volume-view-header">
            <h2 className="volume-view-title">Issues - Volume {selectedVolume.number} ({selectedVolume.year}) ({issues.length})</h2>
            <button className="volume-add-button" onClick={() => setShowIssueModal(true)}>
              <Plus size={16} />
              Add New Issue
            </button>
          </div>
          
          {issues.length === 0 ? (
            <div className="volume-empty-state">
              <p className="volume-empty-message">No issues available for this volume. Add a new issue to get started.</p>
            </div>
          ) : (
            <div className="volume-table-container">
              <table className="volume-table">
                <thead>
                  <tr>
                    <th>Issue Number</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="volume-table-clickable" onClick={() => openIssue(issue)}>
                        Issue {issue.number || 'N/A'}
                      </td>
                      <td>{issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <div className="volume-table-actions">
                          <button className="volume-delete-button" onClick={() => handleDeleteIssue(issue.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Parts View */}
      {currentView === 'parts' && selectedIssue && !loading && !error && (
        <div className="volume-view-container">
          <div className="volume-view-header">
            <h2 className="volume-view-title">Parts - Issue {selectedIssue.number} ({parts.length})</h2>
            <button className="volume-add-button" onClick={() => setShowPartModal(true)}>
              <Plus size={16} />
              Add New Part
            </button>
          </div>
          
          {parts.length === 0 ? (
            <div className="volume-empty-state">
              <p className="volume-empty-message">No parts available for this issue. Add a new part to get started.</p>
            </div>
          ) : (
            <div className="volume-table-container">
              <table className="volume-table">
                <thead>
                  <tr>
                    <th>Part Title</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part) => (
                    <tr key={part.id}>
                      <td>{part.label || part.name || 'Untitled'}</td>
                      <td>{part.createdAt ? new Date(part.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <div className="volume-table-actions">
                          <button className="volume-delete-button" onClick={() => handleDeletePart(part.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Volume Modal */}
      {showVolumeModal && (
        <div className="volume-modal-overlay">
          <div className="volume-modal">
            <div className="volume-modal-header">
              <h3 className="volume-modal-title">Add New Volume</h3>
            </div>
            <div className="volume-modal-body">
              <div className="volume-form-group">
                <label className="volume-form-label">Volume Number:</label>
                <input
                  className="volume-form-input"
                  type="text"
                  value={volumeForm.number}
                  onChange={(e) => setVolumeForm({ ...volumeForm, number: e.target.value })}
                  placeholder="Enter volume number"
                  disabled={loading}
                />
              </div>
              <div className="volume-form-group">
                <label className="volume-form-label">Year:</label>
                <input
                  className="volume-form-input"
                  type="text"
                  value={volumeForm.year}
                  onChange={(e) => setVolumeForm({ ...volumeForm, year: e.target.value })}
                  placeholder="Enter year (e.g., 2024)"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="volume-modal-footer">
              <button
                className="volume-modal-button volume-modal-button-cancel"
                onClick={() => {
                  setShowVolumeModal(false);
                  setVolumeForm({ number: '', year: '' });
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button className="volume-modal-button volume-modal-button-primary" onClick={handleAddVolume} disabled={loading}>
                {loading ? 'Processing...' : 'Add Volume'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Modal */}
      {showIssueModal && (
        <div className="volume-modal-overlay">
          <div className="volume-modal">
            <div className="volume-modal-header">
              <h3 className="volume-modal-title">Add New Issue</h3>
            </div>
            <div className="volume-modal-body">
              <div className="volume-form-group">
                <label className="volume-form-label">Issue Number:</label>
                <input
                  className="volume-form-input"
                  type="text"
                  value={issueForm.number}
                  onChange={(e) => setIssueForm({ ...issueForm, number: e.target.value })}
                  placeholder="Enter issue number"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="volume-modal-footer">
              <button
                className="volume-modal-button volume-modal-button-cancel"
                onClick={() => {
                  setShowIssueModal(false);
                  setIssueForm({ number: '' });
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button className="volume-modal-button volume-modal-button-primary" onClick={handleAddIssue} disabled={loading}>
                {loading ? 'Processing...' : 'Add Issue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Part Modal */}
      {showPartModal && (
        <div className="volume-modal-overlay">
          <div className="volume-modal">
            <div className="volume-modal-header">
              <h3 className="volume-modal-title">Add New Part</h3>
            </div>
            <div className="volume-modal-body">
              <div className="volume-form-group">
                <label className="volume-form-label">Part Title:</label>
                <input
                  className="volume-form-input"
                  type="text"
                  value={partForm.title}
                  onChange={(e) => setPartForm({ ...partForm, title: e.target.value })}
                  placeholder="Enter part title"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="volume-modal-footer">
              <button
                className="volume-modal-button volume-modal-button-cancel"
                onClick={() => {
                  setShowPartModal(false);
                  setPartForm({ title: '' });
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button className="volume-modal-button volume-modal-button-primary" onClick={handleAddPart} disabled={loading}>
                {loading ? 'Processing...' : 'Add Part'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeManagement;