import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ALLAdminArticlesPanel.css'
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  Calendar,
  User,
  FileText,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  BookOpen,
  Globe,
  Tag,
  Hash,
  X,
  Save
} from 'lucide-react';

const AdminArticlesPanel = ({ onNavigateToUpload }) => {

  // State management
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [saving, setSaving] = useState(false);

  // Filter and search state
  const [filters, setFilters] = useState({
    search: '',
    // year: '',
    //specialIssue: ''
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchAllArticles = async () => {
    const response = await fetch('/api/admin/articles', {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error('Failed to fetch articles');
    }
    
    const data = await response.json();
    console.log('API Response:', data); // Debug log
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data.content && Array.isArray(data.content)) {
      return data.content;
    } else if (data.articles && Array.isArray(data.articles)) {
      return data.articles;
    } else {
      console.error('Unexpected data format:', data);
      return [];
    }
  };

  // API service functions
  const fetchArticles = async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination params
      queryParams.append('page', params.page || pagination.page);
      queryParams.append('limit', params.limit || pagination.limit);
      
      // Add filter params
      if (params.search) queryParams.append('search', params.search);
      // if (params.year) queryParams.append('year', params.year);
      if (params.status) queryParams.append('status', params.status);

      const response = await fetch(`/api/admin/articles?${queryParams.toString()}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        articles: data.content || data.articles || [],
        total: data.totalElements || data.total || 0,
        page: data.number ? data.number + 1 : data.page || 1,
        limit: data.size || data.limit || 10,
        totalPages: data.totalPages || Math.ceil((data.totalElements || data.total || 0) / (data.size || data.limit || 10))
      };
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  };

  const deleteArticle = async (id) => {
    try {
      const response = await fetch(`/api/admin/article/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete article: ${response.statusText}`);
      }

      return { success: true, message: 'Article deleted successfully' };
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };


  const downloadArticle = async (id) => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`/api/admin/article/download/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to download article: ${response.statusText}`);
      }

      // Get filename from response headers or use default
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `article_${id}.pdf`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) filename = filenameMatch[1];
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      console.error('Error downloading article:', error);
      throw error;
    }
  };

  const updateArticle = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/admin/article/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update article: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, message: 'Article updated successfully', data };
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const getArticleById = async (id) => {
    try {
      const response = await fetch(`/api/admin/article/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  };
 
  const deleteMultipleArticles = async (ids) => {
    try {
       const response = await fetch(`/api/admin/article/bulk-delete`, {
         method: 'DELETE',
         headers: getAuthHeaders(),
         body: JSON.stringify({ ids })
      });


      if (!response.ok) {
        throw new Error(`Failed to delete articles: ${response.statusText}`);
      }


        return { success: true, message: 'Articles deleted successfully' };
      } catch (error) {
        console.error('Error deleting articles:', error);
        throw error;
      }
    };

  const searchArticlesByKeyword = async (keyword) => {
    const response = await fetch(`/api/admin/article/search?keyword=${encodeURIComponent(keyword)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  };

  const navigate = useNavigate();


// const getArticlesByYear = async (year) => {
//   try {
//     const response = await fetch(`/api/admin/by-year/${year}`, {
//       headers: getAuthHeaders()
//     });
//     if (!response.ok) throw new Error('Failed to fetch articles by year');
//     const data = await response.json();
//     setArticles(data);
//     setPagination({
//       page: 1,
//       limit: data.length,
//       total: data.length,
//       totalPages: 1
//     });
//   } catch (error) {
//     setArticles([]);
//     setError('Failed to fetch articles by year');
//   }
// };


const handleSearch = async (keyword) => {
  try {
    const result = await searchArticlesByKeyword(keyword);
    setArticles(result);
    // Update pagination info if applicable
  } catch (err) {
    setError('Search failed');
  }
};

// const handleYearFilter = async (year) => {
//   setFilters(prev => ({ ...prev, year }));
//   if (year) getArticlesByYear(year);
//   else loadArticles({}, true);
// };


  const loadAllArticles = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAllArticles();
    console.log('Fetched all articles:', data); // Debug log
    
    // Ensure data is an array
    const articlesArray = Array.isArray(data) ? data : (data.articles || data.content || []);
    
    setArticles(articlesArray);
    
    // Update pagination with correct total
    setPagination(prev => ({
      ...prev,
      total: articlesArray.length,
      totalPages: Math.ceil(articlesArray.length / prev.limit),
      page: 1
    }));
  } catch (err) {
    console.error('Error loading articles:', err);
    setError('Failed to load articles');
    setArticles([]);
    setPagination(prev => ({
      ...prev,
      total: 0,
      totalPages: 0
    }));
  } finally {
    setLoading(false);
  }
};



  // Load articles
  const loadArticles = async (newFilters = {}, resetPage = false) => {
    try {
    setLoading(true);
    setError(null);

    const currentPage = resetPage ? 1 : pagination.page;
    const params = {
      ...filters,
      ...newFilters,
      page: currentPage,
      limit: pagination.limit
    };

    const response = await fetchArticles(params);

    // If current page is empty but there are still pages left, reload first page
    if (response.articles.length === 0 && response.totalPages > 0 && currentPage > 1) {
      const firstPageParams = { ...params, page: 1 };
      const firstPageResponse = await fetchArticles(firstPageParams);
      
      setArticles(firstPageResponse.articles);
      setPagination({
        page: firstPageResponse.page,
        limit: firstPageResponse.limit,
        total: firstPageResponse.total,
        totalPages: firstPageResponse.totalPages
      });
    } else {
      setArticles(response.articles);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages
      });
    }
  } catch (error) {
    console.error('Error loading articles:', error);
    setError('Failed to load articles. Please try again.');
    setArticles([]);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }

  };

  // Refresh data
  const handleRefresh = async () => {
  setRefreshing(true);
  try {
    await loadAllArticles(); // Use loadAllArticles instead of loadArticles
  } catch (error) {
    console.error('Refresh failed:', error);
  } finally {
    setRefreshing(false);
  }
};

  // Initial load
  useEffect(() => {
    loadAllArticles();
  }, [pagination.page, pagination.limit]);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    loadArticles(newFilters, true);
  };

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedArticles.size === articles.length) {
      setSelectedArticles(new Set());
    } else {
      setSelectedArticles(new Set(articles.map(article => article.id)));
    }
  };

  const handleSelectArticle = (id) => {
    const newSelected = new Set(selectedArticles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedArticles(newSelected);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
        setArticles(articles.filter(article => article.id !== id));
        // Show success notification
      } catch (error) {
        console.error('Error deleting article:', error);
        setError('Failed to delete article. Please try again.');
      }
    }
  };

  // Bulk delete handler
  const handleBulkDelete = async () => {
    if (selectedArticles.size === 0) return;

  if (window.confirm(`Are you sure you want to delete ${selectedArticles.size} selected articles?`)) {
    try {
      console.log('🔄 Starting bulk delete...');
      console.log('Selected articles:', Array.from(selectedArticles));
      
      // Perform bulk delete
      const deleteResult = await deleteMultipleArticles(Array.from(selectedArticles));
      console.log('✅ Bulk delete API response:', deleteResult);
      
      // Clear selections
      setSelectedArticles(new Set());
      console.log('🧹 Cleared selections');
      
      // Force refresh - try this approach:
      console.log('🔄 Starting refresh...');
      
      // Method 1: Direct API call without relying on state
      try {
        const response = await fetch('/api/admin/articles', {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        
        if (!response.ok) throw new Error('Failed to fetch updated articles');
        
        const freshArticles = await response.json();
        console.log('📊 Fresh articles from API:', freshArticles.length || freshArticles);
        
        setArticles(freshArticles);
        console.log('✅ Articles state updated');
        
      } catch (fetchError) {
        console.error('❌ Error fetching fresh articles:', fetchError);
        throw fetchError;
      }
      
    } catch (error) {
      console.error('❌ Error in bulk delete:', error);
      setError('Failed to delete selected articles. Please try again.');
    }
  }
  };

  // View handler - opens modal with article details
  const handleView = async (article) => {
    try {
      // Fetch complete article details
      const fullArticle = await getArticleById(article.id);
      console.log('Volume Number:', fullArticle.volumeNumber);
    console.log('Issue Number:', fullArticle.issueNumber);
    console.log('Full article:', fullArticle);
      setSelectedArticle(fullArticle);
      setViewModalOpen(true);
    } catch (error) {
      console.error('Error fetching article details:', error);
      setError('Failed to load article details.');
    }
  };

  // Edit handler - opens modal with editable form
  const handleEdit = async (articleId) => {
    try {
      const article = await getArticleById(articleId);
      setEditingArticle({ ...article });
      setEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching article for edit:', error);
      setError('Failed to load article for editing.');
    }
  };

  // Save edited article
  const handleSaveEdit = async () => {
    try {
      setSaving(true);
      const result = await updateArticle(editingArticle.id, editingArticle);

      // Update local state
      setArticles(articles.map(article =>
        article.id === editingArticle.id ? result.data || editingArticle : article
      ));

      setEditModalOpen(false);
      setEditingArticle(null);
      // Show success notification
    } catch (error) {
      console.error('Error updating article:', error);
      setError('Failed to update article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  

  // Download handler
  const handleDownload = async (id) => {
    try {
      await downloadArticle(id);
      // Show success notification
    } catch (error) {
      console.error('Error downloading article:', error);
      setError('Failed to download article. Please try again.');
    }
  };

  // Close modals
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedArticle(null);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingArticle(null);
  };

  // Handle edit form changes
  const handleEditChange = (field, value) => {
    setEditingArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Clear error handler
  const clearError = () => {
    setError(null);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      published: { label: 'Published', color: 'aap-status-published', icon: CheckCircle },
      draft: { label: 'Draft', color: 'aap-status-draft', icon: Edit },
      pending: { label: 'Pending', color: 'aap-status-pending', icon: Calendar },
      rejected: { label: 'Rejected', color: 'aap-status-rejected', icon: X }
    };

    const config = statusConfig[status] || statusConfig.published;
    const Icon = config.icon;

    return (
      <span className={`aap-status-badge ${config.color}`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  // Memoized filter options
//   const filterOptions = useMemo(() => {
//     const years = [...new Set(articles.map(a => a.year))].filter(Boolean).sort().reverse();
//     return { years };
//   }, [articles]);

//   useEffect(() => {
//   loadAllArticles();
// }, []);


  return (
    <div className="aap-container">
      {/* Error notification */}
      {error && (
        <div className="aap-error-notification" style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button onClick={clearError} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="aap-header">
        <div className="aap-header-left">
          <div className="aap-header-icon">
            <BookOpen size={32} />
          </div>
          <div>
            <h1 className="aap-title">Articles Management</h1>
            <p className="aap-subtitle">
              Manage all published articles and submissions
            </p>
          </div>
        </div>
        <div className="aap-header-right">
          <button
            className="aap-btn aap-btn-secondary"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'aap-spinning' : ''} />
            Refresh
          </button>
<button 
  className="aap-btn aap-btn-primary"
  onClick={onNavigateToUpload}
>
  <Plus size={16} />
  Add New Article
</button>

        </div>
      </div>

      {/* Statistics Cards */}
      <div className="aap-stats-grid">
        <div className="aap-stat-card">
          <div className="aap-stat-icon aap-stat-icon-primary">
            <FileText size={24} />
          </div>
          <div className="aap-stat-content">
            <h3 className="aap-stat-number">{pagination.total}</h3>
            <p className="aap-stat-label">Total Articles</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="aap-filters-section">
        <div className="aap-search-bar">
          <Search size={20} className="aap-search-icon" />
          <input
            type="text"
            placeholder="Search articles by title, author, subject, or keywords..."
            value={filters.search}
            onChange={e => {
              const keyword = e.target.value;
              setFilters(prev => ({ ...prev, search: keyword }));
              handleSearch(keyword);  // Call search handler here
            }}
            className="aap-search-input"
          />
        </div>

        <div className="aap-filter-controls">
          {/* <button
            className={`aap-btn aap-btn-outline ${showFilters ? 'aap-active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button> */}

          {selectedArticles.size > 0 && (
            <div className="aap-bulk-actions">
              <span className="aap-selected-count">
                {selectedArticles.size} selected
              </span>
              <button 
                className="aap-btn aap-btn-danger aap-btn-sm"
                onClick={handleBulkDelete}
              >
                <Trash2 size={14} />
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="aap-advanced-filters">
          <div className="aap-filter-grid">
            {/* <div className="aap-filter-item">
              <label className="aap-filter-label">Year</label>
              <select
                value={filters.year}
                onChange={e => {
                  const year = e.target.value;
                  setFilters(prev => ({ ...prev, year }));
                  handleYearFilter(year);  // Call year filter handler here
                }}
                className="aap-filter-select"
              >
                <option value="">All Years</option>
                {filterOptions.years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div> */}

            {/* <div className="aap-filter-item">
              <label className="aap-filter-label">Special Issue</label>
              <select
                value={filters.specialIssue}
                onChange={(e) => handleFilterChange('specialIssue', e.target.value)}
                className="aap-filter-select"
              >
                <option value="">All Articles</option>
                <option value="true">Special Issue Only</option>
                <option value="false">Regular Issue Only</option>
              </select>
            </div> */}
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="aap-table-container">
        {loading ? (
          <div className="aap-loading">
            <div className="aap-spinner-large"></div>
            <p>Loading articles...</p>
          </div>
        ) : (
          <table className="aap-table">
            <thead>
              <tr>
                <th className="aap-th aap-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedArticles.size === articles.length && articles.length > 0}
                    onChange={handleSelectAll}
                    className="aap-checkbox"
                  />
                </th>
                <th className="aap-th">Article Details</th>
                <th className="aap-th">Author</th>
                <th className="aap-th">Publication Info</th>
                <th className="aap-th">Status</th>
                <th className="aap-th">Stats</th>
                <th className="aap-th aap-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="aap-tr">
                  <td className="aap-td">
                    <input
                      type="checkbox"
                      checked={selectedArticles.has(article.id)}
                      onChange={() => handleSelectArticle(article.id)}
                      className="aap-checkbox"
                    />
                  </td>

                  <td className="aap-td">
                    <div className="aap-article-info">
                      <h3 className="aap-article-title">{article.title}</h3>
                      <p className="aap-article-abstract">
                        {article.abstract ? (article.abstract.length > 120 ? `${article.abstract.substring(0, 120)}...` : article.abstract) : 'No abstract available'}
                      </p>
                      <div className="aap-article-meta">
                        <span className="aap-meta-item">
                          <Hash size={12} />
                          {article.id}
                        </span>
                        <span className="aap-meta-item">
                          <Tag size={12} />
                          {article.keywords ? 
                            (article.keywords.split(',').length > 2 ? 
                              `${article.keywords.split(',').slice(0, 2).join(', ')}...` : 
                              article.keywords) : 
                            'No keywords'
                          }
                        </span>
                        {article.specialIssue && (
                          <span className="aap-special-badge">Special Issue</span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="aap-td">
                    <div className="aap-author-info">
                      <div className="aap-author-name">{article.authorName || 'Unknown Author'}</div>
                      <div className="aap-author-meta">
                        <Globe size={12} />
                        {article.country || 'Not specified'}
                      </div>
                    </div>
                  </td>

                  <td className="aap-td">
                    <div className="aap-publication-info">
                      <div className="aap-pub-item">
                        {article.volumeNumber ? `Vol ${article.volumeNumber}` : 'N/A'}
                        {article.issueNumber ? ` | Issue ${article.issueNumber}` : ''}
                        {article.volumeYear ? ` (${article.volumeYear})` : ''}
                      </div>

                      <div className="aap-pub-item">
                        {article.month || 'Unknown'} {article.year || 'Unknown'}
                      </div>
                      {article.pageNo && (
                        <div className="aap-pub-item">Pages: {article.pageNo}</div>
                      )}
                      <div className="aap-pub-subject">{article.subject || 'No subject'}</div>
                    </div>
                  </td>

                  <td className="aap-td">
                    <StatusBadge status={article.status || 'published'} />
                    {article.publishDate && (
                      <div className="aap-publish-date">
                        <Calendar size={12} />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>

                  <td className="aap-td">
                    <div className="aap-stats">
                      <div className="aap-stat-item">
                        <Download size={12} />
                        {article.downloadCount}
                      </div>
                      <div className="aap-stat-item">
                        <Eye size={12} />
                        Views: {article.viewCount}

                      </div>
                    </div>
                  </td>

                  <td className="aap-td">
                    <div className="aap-actions">
                      <button
                        className="aap-action-btn aap-action-btn-primary"
                        onClick={() => handleDownload(article.id)}
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </button>

                      <button
                        className="aap-action-btn aap-action-btn-secondary"
                        onClick={() => handleView(article)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="aap-action-btn aap-action-btn-secondary"
                        onClick={() => handleEdit(article.id)}
                        title="Edit Article"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        className="aap-action-btn aap-action-btn-danger"
                        onClick={() => handleDelete(article.id)}
                        title="Delete Article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && articles.length === 0 && (
          <div className="aap-empty-state">
            <FileText size={48} />
            <h3>No articles found</h3>
            <p>No articles match your current filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="aap-pagination">
          <div className="aap-pagination-info">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} articles
          </div>

          <div className="aap-pagination-controls">
            <button
              className="aap-pagination-btn"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="aap-pagination-numbers">
              {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                const pageNum = Math.max(1, pagination.page - 2) + index;
                if (pageNum <= pagination.totalPages) {
                  return (
                    <button
                      key={pageNum}
                      className={`aap-pagination-number ${pageNum === pagination.page ? 'aap-active' : ''
                        }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>

            <button
              className="aap-pagination-btn"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedArticle && (
        <div className="aap-modal-overlay" onClick={closeViewModal}>
          <div className="aap-modal aap-modal-large" onClick={e => e.stopPropagation()}>
            <div className="aap-modal-header">
              <h2 className="aap-modal-title">Article Details</h2>
              <button
                className="aap-modal-close"
                onClick={closeViewModal}
              >
                <X size={24} />
              </button>
            </div>

            <div className="aap-modal-body">
              <div className="aap-article-details">
                <div className="aap-detail-section">
                  <h3 className="aap-detail-heading">Basic Information</h3>
                  <div className="aap-detail-grid">
                    <div className="aap-detail-item">
                      <label>Article ID:</label>
                      <span>{selectedArticle.id}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Title:</label>
                      <span>{selectedArticle.title}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Author:</label>
                      <span>{selectedArticle.authorName || 'Unknown Author'}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Subject:</label>
                      <span>{selectedArticle.subject || 'No subject'}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Country:</label>
                      <span>{selectedArticle.country || 'Not specified'}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>DOI:</label>
                      <span>{selectedArticle.doi || 'Not available'}</span>
                    </div>
                  </div>
                </div>


                <div className="aap-detail-section">
                  <h3 className="aap-detail-heading">Publication Details</h3>
                  <div className="aap-detail-grid">
                    <div className="aap-detail-item">
                      <label>Volume:</label>
                      <span>{selectedArticle.volumeNumber || 'N/A'}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Issue:</label>
                      <span>{selectedArticle.issueNumber || 'N/A'}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Pages:</label>
                      <span>{selectedArticle.pageNumber || 'N/A'}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Month/Year:</label>
                      <span>{selectedArticle.month || 'Unknown'} {selectedArticle.year || 'Unknown'}</span>
                    </div>
                    {/* <div className="aap-detail-item">
                      <label>Special Issue:</label>
                      <span>{selectedArticle.specialIssue ? 'Yes' : 'No'}</span>
                    </div> */}
                    <div className="aap-detail-item">
                      <label>Reference No:</label>
                      <span>{selectedArticle.refNumber || 'Not available'}</span>
                    </div>
                  </div>
                </div>

                <div className="aap-detail-section">
                  <h3 className="aap-detail-heading">Abstract</h3>
                  <p className="aap-abstract-full">{selectedArticle.abstract || 'No abstract available'}</p>
                </div>

                <div className="aap-detail-section">
                  <h3 className="aap-detail-heading">Keywords</h3>
                  <p>{selectedArticle.keyword || 'No keywords'}</p>
                </div>

                <div className="aap-detail-section">
                  <h3 className="aap-detail-heading">Statistics</h3>
                  <div className="aap-detail-grid">
                    <div className="aap-detail-item">
                      <label>Views</label>
                      <span>{selectedArticle.viewCount || 0}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Downloads:</label>
                      <span>{selectedArticle.downloadCount || 0}</span>
                    </div>
                    <div className="aap-detail-item">
                      <label>Status:</label>
                      <span>{selectedArticle.status || 'published'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && editingArticle && (
        <div className="aap-modal-overlay" onClick={closeEditModal}>
          <div className="aap-modal aap-modal-large" onClick={e => e.stopPropagation()}>
            <div className="aap-modal-header">
              <h2 className="aap-modal-title">Edit Article</h2>
              <button
                className="aap-modal-close"
                onClick={closeEditModal}
              >
                <X size={24} />
              </button>
            </div>

            <div className="aap-modal-body">
              <form className="aap-edit-form">
                <div className="aap-form-section">
                  <h3 className="aap-form-heading">Basic Information</h3>
                  <div className="aap-form-grid">
                    <div className="aap-form-item">
                      <label className="aap-form-label">Title</label>
                      <input
                        type="text"
                        value={editingArticle.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">Author Name</label>
                      <input
                        type="text"
                        value={editingArticle.authorName || ''}
                        onChange={(e) => handleEditChange('authorName', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">Subject</label>
                      <input
                        type="text"
                        value={editingArticle.subject || ''}
                        onChange={(e) => handleEditChange('subject', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">Country</label>
                      <input
                        type="text"
                        value={editingArticle.country || ''}
                        onChange={(e) => handleEditChange('country', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="aap-form-section">
                  <h3 className="aap-form-heading">Publication Details</h3>
                  <div className="aap-form-grid">
                    {/* <div className="aap-form-item">
                      <label className="aap-form-label">Volume</label>
                      <input
                        type="text"
                        value={editingArticle.volume || ''}
                        onChange={(e) => handleEditChange('volume', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">Issue</label>
                      <input
                        type="text"
                        value={editingArticle.issue || ''}
                        onChange={(e) => handleEditChange('issue', e.target.value)}
                        className="aap-form-input"
                      />
                    </div> */}
                    <div className="aap-form-item">
                      <label className="aap-form-label">Pages</label>
                      <input
                        type="text"
                        value={editingArticle.pageNumber || ''}
                        onChange={(e) => handleEditChange('pageNumber', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">Month</label>
                      <input
                        type="text"
                        value={editingArticle.month || ''}
                        onChange={(e) => handleEditChange('month', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">Year</label>
                      <input
                        type="text"
                        value={editingArticle.year || ''}
                        onChange={(e) => handleEditChange('year', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                    <div className="aap-form-item">
                      <label className="aap-form-label">DOI</label>
                      <input
                        type="text"
                        value={editingArticle.doi || ''}
                        onChange={(e) => handleEditChange('doi', e.target.value)}
                        className="aap-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="aap-form-section">
                  <h3 className="aap-form-heading">Abstract</h3>
                  <textarea
                    value={editingArticle.abstract || ''}
                    onChange={(e) => handleEditChange('abstract', e.target.value)}
                    className="aap-form-textarea"
                    rows="4"
                  />
                </div>

                <div className="aap-form-section">
                  <h3 className="aap-form-heading">Keywords</h3>
                  <input
                    type="text"
                    value={editingArticle.keyword || ''}
                    onChange={(e) => handleEditChange('keyword', e.target.value)}
                    className="aap-form-input"
                    placeholder="Separate keywords with commas"
                  />
                </div>

                {/* <div className="aap-form-section">
                  <h3 className="aap-form-heading">Settings</h3>
                  <div className="aap-detail-item">
                    <label>Special Issue Status:</label>
                    <span className={editingArticle.specialIssue ? 'aap-special-indicator' : ''}>
                      {editingArticle.specialIssue ? '✓ Special Issue Article' : 'Regular Article'}
                    </span>
                  </div>
                </div> */}
              </form>
            </div>

            <div className="aap-modal-footer">
              <button
                className="aap-btn aap-btn-secondary"
                onClick={closeEditModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="aap-btn aap-btn-primary"
                onClick={handleSaveEdit}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="aap-spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticlesPanel;