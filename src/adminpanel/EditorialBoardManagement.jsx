import React, { useState, useEffect } from 'react';
import '../styles/EditorialBoardManagement.css';    
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Power, 
  Trash2, 
  Upload,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

const EditorialBoardManagement = () => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    post: '',
    affiliation: '',
    contact: '',
    universityProfileLink: '',
    photoUrl: null,
    editorType: '' ,
    degreeOrTitle: '',
  });

  const [errors, setErrors] = useState({});

  const statuses = ['ACTIVE', 'DEACTIVATE'];

    const editorialCategories = [
      'Editor-in-Chief',
      'Associate Editor', 
      'Editorial Board Member'
    ];

  // Fetch editorial board members from backend
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/editors`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMembers(data);
    } catch (err) {
      console.error('Error fetching members:', err);
      setError(err.message || 'Failed to load editorial board members. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      // Only allow JPG files
      if (file && file.type !== 'image/jpeg') {
        setErrors(prev => ({ ...prev, photoUrl: 'Only JPG files are allowed' }));
        return;
      }
      // Check file size (max 2MB)
      if (file && file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photoUrl: 'File size must be less than 2MB' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
  const newErrors = {};

  const name = (formData.name || '').trim();
  const email = (formData.email || '').trim();
  const post = (formData.post || '').trim();
  const affiliation = (formData.affiliation || '').trim();
  const contact = (formData.contact || '').trim();
  const universityProfileLink = (formData.universityProfileLink || '').trim();

  if (!name) newErrors.name = 'Name is required';
  if (!email) newErrors.email = 'Email is required';
  if (!post) newErrors.post = 'Post is required';
  if (!affiliation) newErrors.affiliation = 'Affiliation is required';
  if (!contact) newErrors.contact = 'Contact is required';
  if (!universityProfileLink) newErrors.universityProfileLink = 'University Profile Link is required';

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  if (universityProfileLink && !/^https?:\/\/.+/.test(universityProfileLink)) {
    newErrors.universityProfileLink = 'Please enter a valid URL (starting with http:// or https://)';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  
  const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }

    let photoUrlUrl = null;

    // Step 1: Upload profile picture first if present
    if (formData.photoUrl && formData.photoUrl instanceof File) {
      try {
        const photoFormData = new FormData();
        photoFormData.append('file', formData.photoUrl);

        const photoResponse = await fetch('/api/admin/editors/upload-photo', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: photoFormData
        });

        if (!photoResponse.ok) {
          throw new Error(`Failed to upload photo: ${photoResponse.status} ${photoResponse.statusText}`);
        }

        const photoResult = await photoResponse.json();
        photoUrlUrl = photoResult.url || photoResult.path || photoResult; // Adjust based on your upload response
      } catch (photoError) {
        console.error('Photo upload error:', photoError);
        alert('Failed to upload profile picture. Please try again.');
        return;
      }
    } else {
  // No new file uploaded, keep existing photo URL
      photoUrlUrl = editingMember?.photoUrl || null;
    }

    // Step 2: Create/Update editor with JSON data
    const editorData = {
      name: formData.name,
      email: formData.email,
      position: formData.post,
      affiliation: formData.affiliation,
      contact: formData.contact,
      universityLink: formData.universityProfileLink,
      photoUrl: photoUrlUrl,
      // Optional/null fields if your form does not provide them
      degreeOrTitle: formData.degreeOrTitle || '', // if available
      country: formData.country || '', // if available
      editorType: formData.editorType || '', // if available
      joinDate: formData.joinDate || null, // or omit, backend can default to now
      status: formData.status || 'ACTIVE', 
    };

    let response;
    
    if (editingMember) {
      // Update existing member
      response = await fetch(`/api/admin/editors/${editingMember.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editorData)
      });
    } else {
      // Add new member
      response = await fetch(`/api/admin/editors`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editorData)
      });
    }

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.text();
        if (errorData) {
          try {
            const jsonError = JSON.parse(errorData);
            errorMessage = jsonError.message || jsonError.error || errorMessage;
          } catch {
            errorMessage = errorData;
          }
        }
      } catch (e) {
        console.log('Could not read error response body:', e);
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    if (editingMember) {
      setMembers(prev => prev.map(member => 
        member.id === editingMember.id ? result : member
      ));
      alert('Editorial board member updated successfully!');
    } else {
      setMembers(prev => [...prev, result]);
      alert('Editorial board member added successfully!');
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      post: '',
      affiliation: '',
      contact: '',
      universityLink: '',
      photoUrl: null,
      editorType: ''
    });
    setIsAddingMember(false);
    setEditingMember(null);
    setErrors({});
    
  } catch (err) {
    console.error('Error saving member:', err);
    alert(`Error ${editingMember ? 'updating' : 'adding'} member: ${err.message}`);
  } finally {
    setIsSubmitting(false);
  }
};
  const handleEdit = (member) => {
  setFormData({
    name: member.name || '',
    email: member.email || '',
    post: member.position || '',
    affiliation: member.affiliation || '',
    contact: member.contact || '',
    universityProfileLink: member.universityLink || '',        
    photoUrl: null,
    editorType: member.editorType || '',
    degreeOrTitle: member.degreeOrTitle || '',
    country: member.country || '',
    editorType: member.editorType || '',
    joinDate: member.joinDate || '',
    status: member.status || 'ACTIVE',
    photoUrl: member.photoUrl || '', 
  });
  setEditingMember(member);
  setIsAddingMember(true);
};


  const handleStatusToggle = async (id) => {
  try {
    const member = members.find(m => m.id === id);
    const newStatus = member.status === 'ACTIVE' ? 'DEACTIVATE' : 'ACTIVE';
    
    // Backend expects @RequestParam, so use query parameter
    const response = await fetch(`/api/admin/editors/${id}/status?status=${newStatus}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to update status: ${response.status} ${response.statusText}`);
    }

    // Update local state - since backend returns "Status updated" string, 
    // we need to manually update the member
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, status: newStatus } : member
    ));
    
  } catch (err) {
    console.error('Error updating status:', err);
    alert('Failed to update member status. Please try again.');
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/editors/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete member: ${response.status} ${response.statusText}`);
      }

      setMembers(prev => prev.filter(member => member.id !== id));
      alert('Editorial board member deleted successfully!');
    } catch (err) {
      console.error('Error deleting member:', err);
      alert('Failed to delete member. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsAddingMember(false);
    setEditingMember(null);
    setFormData({
      name: '',
      email: '',
      post: '',
      affiliation: '',
      contact: '',
      universityProfileLink: '',
      photoUrl: null,
      editorType: ''
    });
    setErrors({});
  };

  const filteredMembers = members.filter(member => {
  if (!member) return false; // safety check

  const name = (member.name ?? '').toString().toLowerCase();
  const email = (member.email ?? '').toString().toLowerCase();
  const affiliation = (member.affiliation ?? '').toString().toLowerCase();
  const post = (member.position ?? '').toString().toLowerCase();

  const matchesSearch = 
    name.includes(searchTerm.toLowerCase()) ||
    email.includes(searchTerm.toLowerCase()) ||
    affiliation.includes(searchTerm.toLowerCase()) ||
    post.includes(searchTerm.toLowerCase());

  const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

  return matchesSearch && matchesStatus;
});

  if (loading) {
    return (
      <div className="ebm-container">
        <div className="ebm-loading-container">
          <div className="ebm-loading-spinner"></div>
          <p>Loading editorial board members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ebm-container">
        <div className="ebm-error-container">
          <h2>Error Loading Members</h2>
          <p>{error}</p>
          <button 
            onClick={fetchMembers}
            className="ebm-retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ebm-container">
      {/* Header */}
      <div className="ebm-header">
        <div className="ebm-header-icon">
          <Users size={32} />
        </div>
        <div>
          <h1 className="ebm-title">Editorial Board Management</h1>
          <p className="ebm-subtitle">Manage editorial board members, their roles, and status</p>
        </div>
      </div>

      {/* Add/Edit Member Form */}
      {isAddingMember && (
        <div className="ebm-form-section">
          <div className="ebm-section-header">
            <h2 className="ebm-section-title">
              {editingMember ? 'Edit Editorial Board Member' : 'Add New Editorial Board Member'}
            </h2>
            <button 
              type="button" 
              className="ebm-cancel-btn"
              onClick={handleCancel}
            >
              <X size={16} /> Cancel
            </button>
          </div>
          
          <div className="ebm-form">
            {/* Member Information */}
            <div className="ebm-form-section-group">
              <h3 className="ebm-group-title">Member Information</h3>
              
              <div className="ebm-row">
                <div className="ebm-form-group">
                  <label className="ebm-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.name ? 'ebm-error' : ''}`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <span className="ebm-error-text">{errors.name}</span>}
                </div>
                
                <div className="ebm-form-group">
                  <label className="ebm-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.email ? 'ebm-error' : ''}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="ebm-error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="ebm-row">
                <div className="ebm-form-group">
                  <label className="ebm-label">Post *</label>
                  <input
                    type="text"
                    name="post"
                    value={formData.post}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.post ? 'ebm-error' : ''}`}
                    placeholder="Enter post/designation"
                  />
                  {errors.post && <span className="ebm-error-text">{errors.post}</span>}
                </div>

                <div className="ebm-form-group">
                  <label className="ebm-label">Editorial Category *</label>
                  <select
                    name="editorType"
                    value={formData.editorType}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.editorType ? 'ebm-error' : ''}`}
                  >
                    <option value="">Select Editorial Category</option>
                    {editorialCategories.map(editorType => (
                      <option key={editorType} value={editorType}>
                        {editorType}
                      </option>
                    ))}
                  </select>
                  {errors.editorType && <span className="ebm-error-text">{errors.editorType}</span>}
                </div>
              </div>

              <div className="ebm-row">
                <div className="ebm-form-group">
                  <label className="ebm-label">Affiliation *</label>
                  <input
                    type="text"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.affiliation ? 'ebm-error' : ''}`}
                    placeholder="Enter institution/organization"
                  />
                  {errors.affiliation && <span className="ebm-error-text">{errors.affiliation}</span>}
                </div>
                <div className="ebm-form-group">
                  <label className="ebm-label">Contact *</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.contact ? 'ebm-error' : ''}`}
                    placeholder="Enter phone number"
                  />
                  {errors.contact && <span className="ebm-error-text">{errors.contact}</span>}
                </div>               
              </div>

              <div className="ebm-row">
                <div className="ebm-form-group">
                  <label className="ebm-label">Qualification</label>
                  <input
                    type="text"
                    name="degreeOrTitle"
                    value={formData.degreeOrTitle}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.degreeOrTitle ? 'ebm-error' : ''}`}
                    placeholder="Enter highest qualification or title"
                  />
                  {errors.degreeOrTitle && <span className="ebm-error-text">{errors.degreeOrTitle}</span>}
                </div>

                <div className="ebm-form-group">
                  <label className="ebm-label">University Profile Link *</label>
                  <input
                    type="url"
                    name="universityProfileLink"
                    value={formData.universityProfileLink}
                    onChange={handleInputChange}
                    className={`ebm-input ${errors.universityProfileLink ? 'ebm-error' : ''}`}
                    placeholder="https://university.edu/profile/..."
                  />
                  {errors.universityProfileLink && <span className="ebm-error-text">{errors.universityProfileLink}</span>}
                </div>               
              </div>

              <div className="ebm-form-group">
                 
                <label className="ebm-label">Profile Picture (JPG only)</label>
                <div className={`ebm-file-upload ${errors.photoUrl ? 'ebm-error' : ''}`}>
                  <input
                    type="file"
                    name="photoUrl"
                    accept=".jpg,.jpeg"
                    onChange={handleInputChange}
                    className="ebm-file-input"
                  />
                  <label className="ebm-file-label">
                    <Upload size={24} />
                    <span className="ebm-file-text">
                      {formData.photoUrl ? formData.photoUrl.name : 'Choose JPG image or drag and drop'}
                    </span>
                    <span className="ebm-file-subtext">Maximum file size: 2MB (JPG only)</span>
                  </label>
                </div>
                {errors.photoUrl && <span className="ebm-error-text">{errors.photoUrl}</span>}
              </div>
            </div>

            {/* Submit Section */}
            <div className="ebm-submit-section">
              <button
                type="button"
                className="ebm-submit-btn"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <div className="ebm-spinner"></div>
                    {editingMember ? 'Updating Member...' : 'Adding Member...'}
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="ebm-list-section">
        <div className="ebm-list-header">
          <div className="ebm-section-header" style={{ border: 'none', padding: 0, background: 'none' }}>
            <h2 className="ebm-section-title">Editorial Board Members ({members.length})</h2>
            {!isAddingMember && (
              <button 
                type="button" 
                className="ebm-submit-btn"
                style={{ fontSize: '14px', padding: '12px 24px', minWidth: 'auto' }}
                onClick={() => setIsAddingMember(true)}
              >
                <Plus size={16} />
                Add New Member
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="ebm-controls">
            <div className="ebm-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by name, email, affiliation, or post..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ebm-search-input"
              />
            </div>
            
            <div className="ebm-filters">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="ebm-filter-select"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="ebm-table-container">
          {filteredMembers.length > 0 ? (
            <table className="ebm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Post</th>
                  <th>Affiliation</th>
                  <th>Contact</th>
                  <th>University Profile</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="ebm-member-info">
                        <div className="ebm-profile-pic">
                          {member.photoUrl ? (
                            <img 
                              src={member.photoUrl} 
                              alt={member.name} 
                              className="ebm-profile-img" 
                            />
                          ) : (
                            <div style={{ 
                              width: '100%', 
                              height: '100%', 
                              background: 'linear-gradient(135deg, #d4c4a8, #c9a876)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="ebm-member-name">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{member.email}</td>
                    <td>{member.position}</td>
                    <td>{member.affiliation}</td>
                    <td>{member.contact}</td>
                    <td>                      
                        {member.universityLink ? (
                          <a 
                            href={member.universityLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ebm-profile-link"
                            style={{
                              color: '#22c55e',
                              textDecoration: 'none',
                              fontSize: '12px',
                              padding: '4px 4px',
                              background: '#f0fdf4',
                              borderRadius: '2px'
                            }}
                          >View Profile</a>
                        ) : (
                          'N/A'
                        )}
                    </td>
                    <td>
                      <span className={`ebm-status-badge ebm-status-${(member.status || '').toLowerCase()}`}>
                        {member.status}
                      </span>
                    </td>
                    <td>
                      {member.joinDate
                        ? new Date(member.joinDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'N/A'}
                    </td>

                    <td>
                      <div className="ebm-actions">
                        <button
                          className="ebm-action-btn ebm-edit-btn"
                          onClick={() => handleEdit(member)}
                          title="Edit Member"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="ebm-action-btn ebm-status-btn"
                          onClick={() => handleStatusToggle(member.id)}
                          title={`${member.status === 'Active' ? 'Deactivate' : 'Activate'} Member`}
                        >
                          <Power size={14} />
                        </button>
                        <button
                          className="ebm-action-btn ebm-delete-btn"
                          onClick={() => handleDelete(member.id)}
                          title="Delete Member"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="ebm-no-data">
              <div className="ebm-no-data-content">
                <AlertCircle size={48} />
                <h3>No members found</h3>
                <p>No editorial board members match your current search and filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorialBoardManagement;