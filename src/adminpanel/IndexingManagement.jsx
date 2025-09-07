import '../styles/IndexingManagement.css';
import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    ExternalLink,
    Image,
    Calendar,
    Link,
    FileText,
    Database,
    Search,
    Check,
    AlertCircle
} from 'lucide-react';

const IndexingManagement = () => {
    const [indexingList, setIndexingList] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        description: '',
        profileLink: '',
        yearIndexed: new Date().getFullYear(),
        hasProfile: true,
        logoFile: null,
        isActive: true,
        type: 'INDEXING'
    });

    const [formErrors, setFormErrors] = useState({});

    // Load data on component mount
    useEffect(() => {
        loadIndexingDatabases();
    }, []);

    const loadIndexingDatabases = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("adminToken");
            if (!token) {
                setError("Authentication token not found");
                return;
            }

            const response = await fetch('/api/admin/indexing', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setIndexingList(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error loading indexing databases:', err);
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const validateFormData = () => {
        const errors = {};
        
        // Required fields
        if (!formData.name?.trim()) {
            errors.name = 'Database name is required';
        }
        
        if (!formData.description?.trim()) {
            errors.description = 'Description is required';
        }

        // Year validation
        const currentYear = new Date().getFullYear();
        const year = parseInt(formData.yearIndexed);
        if (isNaN(year) || year < 1990 || year > currentYear + 1) {
            errors.yearIndexed = `Year must be between 1990 and ${currentYear + 1}`;
        }

        // Profile link validation
        if (formData.hasProfile) {
            if (!formData.profileLink?.trim()) {
                errors.profileLink = 'Profile link is required when profile is enabled';
            } else if (!isValidURL(formData.profileLink.trim())) {
                errors.profileLink = 'Please enter a valid URL';
            }
        }

        // Logo URL validation
        if (formData.logo?.trim() && !isValidURL(formData.logo.trim())) {
            errors.logo = 'Please enter a valid URL for logo';
        }

        // File validation
        if (formData.logoFile) {
            const file = formData.logoFile;
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            
            if (file.size > maxSize) {
                errors.logoFile = 'Logo file must be less than 5MB';
            }
            
            if (!allowedTypes.includes(file.type)) {
                errors.logoFile = 'Logo must be JPEG, PNG, GIF, or WebP';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const updateFormField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error for this field
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const submitForm = async () => {
        if (!validateFormData()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                throw new Error("Authentication token not found");
            }

            let logoUrl = formData.logo?.trim() || '';
            
            // Upload logo file if provided
            if (formData.logoFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', formData.logoFile);
                
                const uploadResponse = await fetch('/api/admin/indexing/upload-logo', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: uploadFormData
                });

                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    throw new Error(`Logo upload failed: ${errorText}`);
                }

                const uploadResult = await uploadResponse.json();
                logoUrl = uploadResult.url || uploadResult.path || uploadResult.filePath || '';
            }

            // Prepare clean data for API
            const apiData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                logo: logoUrl,
                profileLink: formData.hasProfile ? (formData.profileLink?.trim() || '') : '',
                yearIndexed: parseInt(formData.yearIndexed),
                hasProfile: Boolean(formData.hasProfile),
                isActive: Boolean(formData.isActive),      
                type: formData.type                       
            };

            // Debug log
            console.log('Sending to API:', apiData);

            const isUpdate = editingId !== null;
            const url = isUpdate ? `/api/admin/indexing/${editingId}` : '/api/admin/indexing';
            const method = isUpdate ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiData)
            });

            

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('API Success Response:', result);

            // Update state
            if (isUpdate) {
                setIndexingList(prev => 
                    prev.map(item => item.id === editingId ? result : item)
                );
                alert('Database updated successfully!');
            } else {
                setIndexingList(prev => [...prev, result]);
                alert('Database added successfully!');
            }

            closeForm();

        } catch (err) {
            console.error('Submit Error:', err);
            alert(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeForm = () => {
        setFormData({
            name: '',
            logo: '',
            description: '',
            profileLink: '',
            yearIndexed: new Date().getFullYear(),
            hasProfile: true,
            isActive: true,
            logoFile: null
        });
        setFormErrors({});
        setIsFormOpen(false);
        setEditingId(null);
    };

    const editItem = (item) => {
        setFormData({
            name: item.name ?? '',
            logo: item.logo ?? '',
            description: item.description ?? '',
            profileLink: item.profileLink ?? '',
            yearIndexed: item.yearIndexed ?? new Date().getFullYear(),
            hasProfile: typeof item.hasProfile === 'boolean' ? item.hasProfile : false,
            logoFile: null,
            isActive: typeof item.isActive === "boolean" ? item.isActive : true,
            type: item.type ?? 'INDEXING'
        });

        setEditingId(item.id);
        setIsFormOpen(true);
    };


    const deleteItem = async (itemId) => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                throw new Error("Authentication token not found");
            }

            const response = await fetch(`/api/admin/indexing/${itemId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Delete failed: ${errorText}`);
            }

            setIndexingList(prev => prev.filter(item => item.id !== itemId));
            setShowDeleteConfirm(null);
            alert('Database deleted successfully!');
        } catch (err) {
            console.error('Delete Error:', err);
            alert(`Delete failed: ${err.message}`);
        }
    };

    const renderLogoFallback = (name) => {
        return (
            <div className="idx-mgmt-logo-fallback">
                {(name || '?').charAt(0).toUpperCase()}
            </div>
        );
    };

    const handleLogoError = (e, itemName) => {
        e.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'idx-mgmt-logo-fallback';
        fallback.textContent = (itemName || '?').charAt(0).toUpperCase();
        e.target.parentNode.appendChild(fallback);
    };

    // Filter data based on search and year
    const getFilteredData = () => {
        return indexingList.filter(item => {
            const matchesSearch = 
                (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = !selectedYear || (item.yearIndexed && item.yearIndexed.toString() === selectedYear);
            return matchesSearch && matchesYear;
        });
    };

    const getUniqueYears = () => {
        return [...new Set(indexingList.map(item => item.yearIndexed).filter(year => year))]
            .sort((a, b) => b - a);
    };

    const filteredData = getFilteredData();
    const uniqueYears = getUniqueYears();

    // Loading state
    if (loading) {
        return (
            <div className="idx-mgmt-container">
                <div className="idx-mgmt-loading-container">
                    <div className="idx-mgmt-loading-spinner"></div>
                    <p>Loading indexing databases...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="idx-mgmt-container">
                <div className="idx-mgmt-wrapper">
                    <div className="idx-mgmt-header">
                        <div className="idx-mgmt-header-content">
                            <div>
                                <div className="idx-mgmt-title-section">
                                    <div className="idx-mgmt-icon-wrapper">
                                        <Database className="idx-mgmt-title-icon" />
                                    </div>
                                    <h1 className="idx-mgmt-title">
                                        Indexing Management
                                    </h1>
                                </div>
                                <p className="idx-mgmt-subtitle">
                                    Manage journal indexing databases and their information
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="idx-mgmt-error-container">
                        <div className="idx-mgmt-error-content">
                            <AlertCircle size={48} />
                            <h3>Error Loading Indexing Databases</h3>
                            <p>{error}</p>
                            <button 
                                onClick={loadIndexingDatabases}
                                className="idx-mgmt-retry-button"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="idx-mgmt-container">
            <div className="idx-mgmt-wrapper">
                {/* Header Section */}
                <div className="idx-mgmt-header">
                    <div className="idx-mgmt-header-content">
                        <div>
                            <div className="idx-mgmt-title-section">
                                <div className="idx-mgmt-icon-wrapper">
                                    <Database className="idx-mgmt-title-icon" />
                                </div>
                                <h1 className="idx-mgmt-title">
                                    Indexing Management
                                </h1>
                            </div>
                            <p className="idx-mgmt-subtitle">
                                Manage journal indexing databases and their information
                            </p>
                        </div>
                        <button 
                            className="idx-mgmt-add-btn"
                            onClick={() => setIsFormOpen(true)}
                        >
                            <Plus size={20} />
                            Add Indexing Database
                        </button>
                    </div>
                </div>

                {/* Filters and Search Section */}
                <div className="idx-mgmt-filters-section">
                    <div className="idx-mgmt-filters-content">
                        <div className="idx-mgmt-search-controls">
                            <div className="idx-mgmt-search-wrapper">
                                <Search className="idx-mgmt-search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search databases..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="idx-mgmt-search-input"
                                />
                            </div>
                            
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="idx-mgmt-year-select"
                            >
                                <option value="">All Years</option>
                                {uniqueYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="idx-mgmt-view-toggle">
                            <button
                                className={`idx-mgmt-view-btn ${viewMode === 'grid' ? 'idx-mgmt-view-active' : 'idx-mgmt-view-inactive'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                Grid View
                            </button>
                            <button
                                className={`idx-mgmt-view-btn idx-mgmt-view-btn-right ${viewMode === 'table' ? 'idx-mgmt-view-active' : 'idx-mgmt-view-inactive'}`}
                                onClick={() => setViewMode('table')}
                            >
                                Table View
                            </button>
                        </div>
                    </div>

                    <div className="idx-mgmt-results-count">
                        {filteredData.length} database{filteredData.length !== 1 ? 's' : ''} found
                    </div>
                </div>

                {/* Main Content Area */}
                {viewMode === 'grid' ? (
                    // Grid View
                    <div className="idx-mgmt-grid">
                        {filteredData.map((item) => (
                            <div key={item.id} className="idx-mgmt-card">
                                <div className="idx-mgmt-card-content">
                                    <div className="idx-mgmt-card-header">
                                        <div className="idx-mgmt-card-logo-section">
                                            <div className="idx-mgmt-logo-wrapper">
                                                {item.logo ? (
                                                    <img 
                                                        src={item.logo} 
                                                        alt={`${item.name} logo`}
                                                        className="idx-mgmt-logo-img"
                                                        onError={(e) => handleLogoError(e, item.name)}
                                                    />
                                                ) : (
                                                    renderLogoFallback(item.name)
                                                )}
                                            </div>
                                        </div>
                                        <div className="idx-mgmt-card-actions">
                                            <button
                                                className="idx-mgmt-action-btn idx-mgmt-edit-btn"
                                                onClick={() => editItem(item)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="idx-mgmt-action-btn idx-mgmt-delete-btn"
                                                onClick={() => setShowDeleteConfirm(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="idx-mgmt-card-title">
                                        {item.name}
                                    </h3>
                                    <p className="idx-mgmt-card-description">
                                        {item.description}
                                    </p>
                                    
                                    <div className="idx-mgmt-card-badges">
                                        <span className="idx-mgmt-badge idx-mgmt-year-badge">
                                            <Calendar size={10} />
                                            {item.yearIndexed}
                                        </span>
                                        {item.profileLink && (
                                            <span className="idx-mgmt-badge idx-mgmt-profile-badge">
                                                <Check size={10} />
                                                Has Profile
                                            </span>
                                        )}
                                    </div>

                                    {item.profileLink && (
                                        <a
                                            href={item.profileLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="idx-mgmt-profile-link"
                                        >
                                            <ExternalLink size={14} />
                                            View Profile
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Table View
                    <div className="idx-mgmt-table-container">
                        <div className="idx-mgmt-table-wrapper">
                            <table className="idx-mgmt-table">
                                <thead className="idx-mgmt-table-header">
                                    <tr>
                                        <th className="idx-mgmt-table-th">Database</th>
                                        <th className="idx-mgmt-table-th">Description</th>
                                        <th className="idx-mgmt-table-th">Year</th>
                                        <th className="idx-mgmt-table-th">Profile</th>
                                        <th className="idx-mgmt-table-th">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="idx-mgmt-table-body">
                                    {filteredData.map((item) => (
                                        <tr key={item.id} className="idx-mgmt-table-row">
                                            <td className="idx-mgmt-table-td">
                                                <div className="idx-mgmt-table-name-cell">
                                                    <div className="idx-mgmt-table-logo-wrapper">
                                                        {item.logo ? (
                                                            <img 
                                                                src={item.logo} 
                                                                alt={`${item.name} logo`}
                                                                className="idx-mgmt-table-logo-img"
                                                                onError={(e) => handleLogoError(e, item.name)}
                                                            />
                                                        ) : (
                                                            renderLogoFallback(item.name)
                                                        )}
                                                    </div>
                                                    <div className="idx-mgmt-table-name">{item.name}</div>
                                                </div>
                                            </td>
                                            <td className="idx-mgmt-table-td">
                                                <div className="idx-mgmt-table-description">{item.description}</div>
                                            </td>
                                            <td className="idx-mgmt-table-td">
                                                <span className="idx-mgmt-table-year-badge">
                                                    {item.yearIndexed}
                                                </span>
                                            </td>
                                            <td className="idx-mgmt-table-td">
                                                {item.profileLink ? (
                                                    <a
                                                        href={item.profileLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="idx-mgmt-table-profile-link"
                                                    >
                                                        <ExternalLink size={12} />
                                                        View
                                                    </a>
                                                ) : (
                                                    <span className="idx-mgmt-table-no-profile">No Profile</span>
                                                )}
                                            </td>
                                            <td className="idx-mgmt-table-td">
                                                <div className="idx-mgmt-table-actions">
                                                    <button
                                                        className="idx-mgmt-action-btn idx-mgmt-edit-btn"
                                                        onClick={() => editItem(item)}
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        className="idx-mgmt-action-btn idx-mgmt-delete-btn"
                                                        onClick={() => setShowDeleteConfirm(item.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Add/Edit Form Modal */}
                {isFormOpen && (
                    <div className="idx-mgmt-modal-overlay">
                        <div className="idx-mgmt-modal">
                            <div className="idx-mgmt-modal-header">
                                <h2 className="idx-mgmt-modal-title">
                                    {editingId !== null ? 'Edit Indexing Database' : 'Add Indexing Database'}
                                </h2>
                                <button className="idx-mgmt-modal-close" onClick={closeForm}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="idx-mgmt-modal-content">
                                <div className="idx-mgmt-form-grid">
                                    {/* Database Name */}
                                    <div>
                                        <label className="idx-mgmt-form-label">
                                            <div className="idx-mgmt-label-with-icon">
                                                <Database size={16} />
                                                Database Name *
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => updateFormField('name', e.target.value)}
                                            className={`idx-mgmt-form-input ${formErrors.name ? 'idx-mgmt-input-error' : ''}`}
                                            placeholder="e.g., Google Scholar"
                                        />
                                        {formErrors.name && (
                                            <div className="idx-mgmt-error-message">
                                                <AlertCircle size={14} />
                                                {formErrors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Year Indexed */}
                                    <div>
                                        <label className="idx-mgmt-form-label">
                                            <div className="idx-mgmt-label-with-icon">
                                                <Calendar size={16} />
                                                Year Indexed *
                                            </div>
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.yearIndexed}
                                            onChange={(e) => updateFormField('yearIndexed', parseInt(e.target.value) || new Date().getFullYear())}
                                            className={`idx-mgmt-form-input ${formErrors.yearIndexed ? 'idx-mgmt-input-error' : ''}`}
                                            min="1990"
                                            max={new Date().getFullYear() + 1}
                                        />
                                        {formErrors.yearIndexed && (
                                            <div className="idx-mgmt-error-message">
                                                <AlertCircle size={14} />
                                                {formErrors.yearIndexed}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Logo Upload */}
                                <div className="idx-mgmt-form-field">
                                    <label className="idx-mgmt-form-label">
                                        <div className="idx-mgmt-label-with-icon">
                                            <Image size={16} />
                                            Logo Upload
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp"
                                        onChange={(e) => updateFormField('logoFile', e.target.files[0])}
                                        className="idx-mgmt-form-input"
                                    />
                                    {formErrors.logoFile && (
                                        <div className="idx-mgmt-error-message">
                                            <AlertCircle size={14} />
                                            {formErrors.logoFile}
                                        </div>
                                    )}
                                    <p className="idx-mgmt-help-text">Upload a logo image (optional, max 5MB - JPEG/PNG/GIF/WebP)</p>
                                </div>

                                <div className="idx-mgmt-form-field">
                                    <label className="idx-mgmt-form-label">
                                        <div className="idx-mgmt-label-with-icon">
                                            <Image size={16} />
                                            Entry Type
                                        </div>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => updateFormField('type', e.target.value)}
                                        >
                                            <option value="INDEXING">Indexing</option>
                                            <option value="TRUST_BADGE">Trust Badge</option>
                                        </select>
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => updateFormField('isActive', e.target.checked)}
                                        />
                                        Active
                                    </label>
                                </div>

                                {/* Description */}
                                <div className="idx-mgmt-form-field">
                                    <label className="idx-mgmt-form-label">
                                        <div className="idx-mgmt-label-with-icon">
                                            <FileText size={16} />
                                            Description *
                                        </div>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => updateFormField('description', e.target.value)}
                                        className={`idx-mgmt-form-textarea ${formErrors.description ? 'idx-mgmt-input-error' : ''}`}
                                        rows={3}
                                        placeholder="Brief description of the database..."
                                        maxLength={500}
                                    />
                                    {formErrors.description && (
                                        <div className="idx-mgmt-error-message">
                                            <AlertCircle size={14} />
                                            {formErrors.description}
                                        </div>
                                    )}
                                    <p className="idx-mgmt-help-text">
                                        {formData.description.length}/500 characters
                                    </p>
                                </div>

                                {/* Has Profile Checkbox */}
                                <div className="idx-mgmt-form-field">
                                    <label className="idx-mgmt-checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.hasProfile}
                                            onChange={(e) => updateFormField('hasProfile', e.target.checked)}
                                            className="idx-mgmt-checkbox"
                                        />
                                        <span className="idx-mgmt-checkbox-text">
                                            This database has a profile/listing page
                                        </span>
                                    </label>
                                </div>

                                {/* Profile Link (conditional) */}
                                {formData.hasProfile && (
                                    <div className="idx-mgmt-form-field">
                                        <label className="idx-mgmt-form-label">
                                            <div className="idx-mgmt-label-with-icon">
                                                <Link size={16} />
                                                Profile Link *
                                            </div>
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.profileLink}
                                            onChange={(e) => updateFormField('profileLink', e.target.value)}
                                            className={`idx-mgmt-form-input ${formErrors.profileLink ? 'idx-mgmt-input-error' : ''}`}
                                            placeholder="https://example.com/journal-profile"
                                        />
                                        {formErrors.profileLink && (
                                            <div className="idx-mgmt-error-message">
                                                <AlertCircle size={14} />
                                                {formErrors.profileLink}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Form Actions */}
                                <div className="idx-mgmt-form-actions">
                                    <button 
                                        type="button" 
                                        className="idx-mgmt-cancel-btn"
                                        onClick={closeForm}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className="idx-mgmt-submit-btn"
                                        onClick={submitForm}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="idx-mgmt-spinner"></div>
                                                {editingId !== null ? 'Updating...' : 'Adding...'}
                                            </>
                                        ) : (
                                            <>
                                                <Save size={16} />
                                                {editingId !== null ? 'Update Database' : 'Add Database'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="idx-mgmt-modal-overlay">
                        <div className="idx-mgmt-confirm-modal">
                            <div className="idx-mgmt-confirm-content">
                                <h3 className="idx-mgmt-confirm-title">Confirm Delete</h3>
                                <p className="idx-mgmt-confirm-text">Are you sure you want to delete this indexing database?</p>
                                <p className="idx-mgmt-confirm-warning">This action cannot be undone.</p>
                                <div className="idx-mgmt-confirm-actions">
                                    <button 
                                        className="idx-mgmt-cancel-btn"
                                        onClick={() => setShowDeleteConfirm(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="idx-mgmt-confirm-delete-btn"
                                        onClick={() => deleteItem(showDeleteConfirm)}
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="idx-mgmt-empty-state">
                        <Database size={48} className="idx-mgmt-empty-icon" />
                        <h3 className="idx-mgmt-empty-title">No Indexing Databases Found</h3>
                        <p className="idx-mgmt-empty-text">
                            {searchTerm || selectedYear 
                                ? 'No databases match your current filters.' 
                                : 'Start by adding your first indexing database.'
                            }
                        </p>
                        {!searchTerm && !selectedYear && (
                            <button 
                                className="idx-mgmt-empty-btn"
                                onClick={() => setIsFormOpen(true)}
                            >
                                <Plus size={16} />
                                Add First Database
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndexingManagement;