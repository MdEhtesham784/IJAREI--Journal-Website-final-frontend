import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, UserPlus, Calendar, Trash2, AlertTriangle, Check, X } from 'lucide-react';
import "../styles/Assignadmin.css";

const Assignadmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [toast, setToast] = useState(null);

  // Get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  };

  // Fetch all admin users with better error handling
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/adminUsers`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          showToast('Authentication failed. Please login again.', 'error');
          return;
        }
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response - Fetched users:', data);
      
      // Handle different response formats
      let usersList = [];
      if (Array.isArray(data)) {
        usersList = data;
      } else if (data && Array.isArray(data.users)) {
        usersList = data.users;
      } else if (data && Array.isArray(data.data)) {
        usersList = data.data;
      } else {
        console.warn('Unexpected data format:', data);
        usersList = [];
      }
      
      setUsers(usersList);
      console.log('Users set to state:', usersList);
      
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Failed to load admin users. Please try again.', 'error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.username.trim()) {
      errors.username = 'Email is required';
    } else if (!emailRegex.test(formData.username)) {
      errors.username = 'Please enter a valid email address';
    } else if (users.some(user => 
      typeof user.username === 'string' &&
      user.username.toLowerCase() === formData.username.toLowerCase()
    )) {
      errors.username = 'Email already exists';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission - Create new admin user with better handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/assign-admin/${encodeURIComponent(formData.username)}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          showToast('Authentication failed. Please login again.', 'error');
          return;
        } else if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.message === 'User already has admin role') {
            setFormErrors({ username: 'Email already has admin role' });
            showToast('Email already has admin role. Please use a different email.', 'error');
            return;
          }
        }
        throw new Error(`Failed to assign admin role: ${response.status}`);
      }

      // Try to get response data
      let responseData = null;
      try {
        responseData = await response.json();
        console.log('API Response - New admin created:', responseData);
      } catch (jsonError) {
        console.log('No JSON response or empty response');
      }

      showToast('Admin role assigned to user successfully!');
      
      // Clear form
      setFormData({ username: '' });
      setFormErrors({});
      
      // Force refresh the users list
      console.log('Refreshing users list...');
      await fetchUsers();
      
    } catch (error) {
      console.error('Error assigning admin role:', error);
      showToast('Failed to assign admin role. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({ username: '' });
    setFormErrors({});
  };

  // Handle user actions
  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setConfirmAction({
      type: 'delete',
      userId,
      message: `Are you sure you want to delete admin user "${user?.username}"? This action cannot be undone.`
    });
    setShowConfirmModal(true);
  };

  // Delete admin user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/adminUser/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          showToast('Authentication failed. Please login again.', 'error');
          return;
        } else if (response.status === 404) {
          showToast('User not found.', 'error');
          return;
        }
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      setUsers(prev => prev.filter(user => user.id !== userId));
      showToast('Admin user deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Failed to delete admin user. Please try again.', 'error');
    }
  };

  // Execute confirmed action
  const executeConfirmedAction = () => {
    if (confirmAction.type === 'delete') {
      deleteUser(confirmAction.userId);
    }
    
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const getUserFullName = (user) => {
    return user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user.email || 'Unknown User';
  };

  const getUserInitials = (user) => {
    const name = getUserFullName(user);
    if (!name) return 'AD';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };


  // Format date
  const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid Date';
  }
};


  const totalUsersCount = users.length;

  return (
    <div className="aum-container">
      {/* Debug Info - Remove in production */}
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0', borderRadius: '5px', fontSize: '12px' }}>
        <strong>Debug Info:</strong> Users Count: {users.length} | Loading: {loading.toString()} | Submitting: {isSubmitting.toString()}
      </div>

      {/* Header */}
      <div className="aum-header">
        <button className="aum-back-button">
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <h1 className="aum-title">Admin User Management</h1>
        <p className="aum-subtitle">
          Create and manage administrative users with access to the system
        </p>
      </div>

      {/* Add New User Section */}
      <div className="aum-add-section">
        <div className="aum-add-header">
          <h2>Add New Admin User</h2>
          <p>Create a new administrative user account with system access</p>
        </div>
        
        <div className="aum-add-form">
          <form onSubmit={handleSubmit}>
            <div className="aum-form-grid">
              <div className="aum-form-group">
                <label className="aum-form-label" htmlFor="username">
                  Email *
                </label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  className={`aum-form-input ${formErrors.username ? 'error' : ''}`}
                  placeholder="Enter email address"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {formErrors.username && (
                  <div className="aum-error-message">{formErrors.username}</div>
                )}
              </div>
            </div>

            <div className="aum-form-actions">
              <button 
                type="button" 
                className="aum-btn aum-btn-secondary"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                <X size={16} />
                Reset
              </button>
              <button 
                type="submit" 
                className="aum-btn aum-btn-primary"
                disabled={isSubmitting}
              >
                <UserPlus size={16} />
                {isSubmitting ? 'Creating...' : 'Create Admin User'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="aum-table-container">
        <div className="aum-table-header">
          <div className="aum-table-header-content">
            <h2>Admin Users</h2>
            <p>Manage existing administrative users and their access permissions</p>
          </div>
          <div className="aum-stats-container">
            <div className="aum-stat-item">
              <span className="aum-stat-number">{totalUsersCount}</span>
              <span className="aum-stat-label">Total Users</span>
            </div>
          </div>
        </div>

        <div className="aum-table-wrapper">
          {loading ? (
            <div className="aum-loading-container">
              <div className="aum-loading-spinner"></div>
              <p>Loading admin users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="aum-no-data">
              <div className="aum-no-data-content">
                <Users size={64} />
                <p>No admin users found. Create your first admin user above.</p>
              </div>
            </div>
          ) : (
            <table className="aum-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Created</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="aum-table-row">
                    <td>
                      <div className="aum-user-info">
                        <div className="aum-user-avatar">
                          {getUserInitials(user)}
                        </div>
                        <div className="aum-user-details">
                          <div className="aum-user-name">{getUserFullName(user)}</div>
                          <div className="aum-user-role">{user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="aum-date-cell">
                        <Calendar size={14} />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="aum-date-cell">
                        <Calendar size={14} />
                        {formatDate(user.lastLogin)}
                      </div>
                    </td>
                    <td>
                      <div className="aum-actions">
                        <button
                          className="aum-action-btn aum-delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="aum-modal-overlay">
          <div className="aum-modal">
            <div className="aum-modal-header">
              <AlertTriangle size={20} style={{ color: 'var(--cpe-accent-red)' }} />
              <h3>Confirm Action</h3>
            </div>
            <div className="aum-modal-content">
              <p>{confirmAction?.message}</p>
            </div>
            <div className="aum-modal-actions">
              <button 
                className="aum-btn aum-btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                <X size={16} />
                Cancel
              </button>
              <button 
                className="aum-btn aum-btn-primary"
                onClick={executeConfirmedAction}
              >
                <Check size={16} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`aum-toast aum-toast-${toast.type}`}>
          <div className="aum-toast-content">
            <Check size={16} />
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignadmin;