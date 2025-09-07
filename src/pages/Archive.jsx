import '../styles/Archive.css';
import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  useReducer,
  createContext,
  useContext,
  lazy,
  Suspense,
  memo,
  Component
} from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Download, 
  Calendar, 
  User, 
  BookOpen, 
  X, 
  Search,
  AlertCircle,
  Book,
  Users,
  FileText
} from 'lucide-react';

// Context
const ArchiveContext = createContext(null);

// Custom Hook
const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within ArchiveProvider');
  }
  return context;
};

// Reducer
const archiveReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_VOLUMES':
      return { ...state, volumes: action.payload };
    case 'SET_FILTERED_VOLUMES':
      return { ...state, filteredVolumes: action.payload };
    case 'SET_ALL_ARTICLES':
      return { ...state, allArticles: action.payload };
    case 'SET_PART_ARTICLES':
      return { 
        ...state, 
        partArticles: { 
          ...state.partArticles, 
          [action.payload.partId]: action.payload.articles 
        }
      };
    case 'TOGGLE_VOLUME':
      const newExpandedVolumes = new Set(state.expandedVolumes);
      if (newExpandedVolumes.has(action.payload)) {
        newExpandedVolumes.delete(action.payload);
      } else {
        newExpandedVolumes.add(action.payload);
      }
      return { ...state, expandedVolumes: newExpandedVolumes };
    case 'TOGGLE_ISSUE':
      const newExpandedIssues = new Set(state.expandedIssues);
      if (newExpandedIssues.has(action.payload)) {
        newExpandedIssues.delete(action.payload);
      } else {
        newExpandedIssues.add(action.payload);
      }
      return { ...state, expandedIssues: newExpandedIssues };
    case 'TOGGLE_PART':
      const newExpandedParts = new Set(state.expandedParts);
      if (newExpandedParts.has(action.payload)) {
        newExpandedParts.delete(action.payload);
      } else {
        newExpandedParts.add(action.payload);
      }
      return { ...state, expandedParts: newExpandedParts };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_YEAR':
      return { ...state, selectedYear: action.payload };
    case 'SET_SELECTED_ARTICLE':
      return { ...state, selectedArticle: action.payload };
    case 'SET_MODAL_OPEN':
      return { ...state, modalOpen: action.payload };
    case 'ADD_DOWNLOADING_ARTICLE':
      return { 
        ...state, 
        downloadingArticles: new Set([...state.downloadingArticles, action.payload])
      };
    case 'REMOVE_DOWNLOADING_ARTICLE':
      const newDownloading = new Set(state.downloadingArticles);
      newDownloading.delete(action.payload);
      return { ...state, downloadingArticles: newDownloading };
    case 'SET_DOWNLOAD_ERROR':
      return { ...state, downloadError: action.payload };
    default:
      return state;
  }
};

// API Service with better error handling and data normalization
const DataService = {
  getHeaders() {
    const headers = {
      "Content-Type": "application/json"
    };
    
    return headers;
  },

  // Normalize volume data to match frontend expectations
  normalizeVolume(volume) {
    return {
      ...volume,
      number: volume.number || volume.volumeNumber,
      issues: volume.issues?.map(issue => ({
        ...issue,
        number: issue.number || issue.issueNumber,
        parts: issue.parts?.map(part => ({
          ...part,
          label: part.label || part.name
        })) || []
      })) || []
    };
  },

  // Normalize article data
  normalizeArticle(article) {
    return {
      ...article,
      authors: article.authors || (article.authorName ? [article.authorName] : []),
      publishedDate: article.publishedDate || article.createdAt,
      abstract: article.abstract || article.summary || ''
    };
  },

  async fetchArchive() {
    try {
      console.log('Fetching archive data...');
      const response = await fetch('/api/archive/full', {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch archive: ${response.status} ${response.statusText}`);
      }

      const volumes = await response.json();
      console.log('Raw archive data:', volumes);

      // Normalize the data
      const normalizedVolumes = volumes.map(volume => this.normalizeVolume(volume));
      console.log('Normalized archive data:', normalizedVolumes);

      return { volumes: normalizedVolumes };
    } catch (error) {
      console.error('Error fetching archive:', error);
      throw error;
    }
  },

  async fetchArticles(partId) {
    try {
      console.log(`Fetching articles for part ${partId}...`);
      const response = await fetch(`/api/articles/by-part/${partId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
      }

      const articles = await response.json();
      console.log('Raw articles data:', articles);

      // Normalize articles
      const normalizedArticles = articles.map(article => this.normalizeArticle(article));
      console.log('Normalized articles data:', normalizedArticles);

      return { articles: normalizedArticles };
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  async fetchArticleDetails(articleId) {
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch article details: ${response.status} ${response.statusText}`);
      }

      const article = await response.json();
      return this.normalizeArticle(article);
    } catch (error) {
      console.error('Error fetching article details:', error);
      throw error;
    }
  },

  async downloadArticle(articleId, type = 'full') {
    try {
      console.log(`Attempting to download article ${articleId} (${type})`);
      
      // Use the correct endpoints based on your backend routes
      const endpoint = type === 'abstract' 
        ? `/api/articles/${articleId}/download-abstract`
        : `/api/articles/${articleId}/download`;
      
      console.log(`Using endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      console.log(`Success with endpoint: ${endpoint}`);
      
      // Get the blob from response
      const blob = await response.blob();
      
      // Get filename from Content-Disposition header or create default
      let filename = `article-${articleId}-${type}.${type === 'abstract' ? 'txt' : 'pdf'}`;
      const disposition = response.headers.get('Content-Disposition');
      if (disposition) {
        const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);

      return true;
      
    } catch (error) {
      console.error('Error downloading article:', error);
      throw error;
    }
  },

  async searchArticles(searchTerm, year = null) {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('keyword', searchTerm);
      if (year && year !== 'all') params.append('year', year);

      const response = await fetch(`/api/archive/search?${params.toString()}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to search articles: ${response.status} ${response.statusText}`);
      }

      const articles = await response.json();
      return articles.map(article => this.normalizeArticle(article));
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  },

  async fetchAllArticles() {
    try {
      const response = await fetch('/api/articles/all', {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch all articles: ${response.status} ${response.statusText}`);
      }

      const articles = await response.json();
      return articles.map(article => this.normalizeArticle(article));
    } catch (error) {
      console.error('Error fetching all articles:', error);
      throw error;
    }
  }
};

// Utility Functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Archive component error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
          reset={() => this.setState({ hasError: false, error: null, errorInfo: null })} 
        />
      );
    }
    return this.props.children;
  }
}

// Default Error Fallback
const DefaultErrorFallback = ({ error, reset }) => (
  <div className="error-container">
    <div className="error-content">
      <AlertCircle className="error-icon" size={48} />
      <h2>Something went wrong!</h2>
      <p>{error?.message || 'An unexpected error occurred'}</p>
      <button onClick={reset} className="retry-btn">
        Try Again
      </button>
    </div>
  </div>
);

// Loading Skeleton
const LoadingSkeleton = memo(() => (
  <div className="loading-container">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="skeleton-item">
        <div className="skeleton-header" />
        <div className="skeleton-content">
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      </div>
    ))}
  </div>
));

// Components
const SearchControls = memo(() => {
  const { state, dispatch } = useArchive();

  const debouncedSearch = useMemo(
    () => debounce((term) => {
      dispatch({ type: 'SET_SEARCH_TERM', payload: sanitizeInput(term) });
    }, 300),
    [dispatch]
  );

  const handleSearchChange = useCallback((e) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  const handleYearChange = useCallback((e) => {
    dispatch({ type: 'SET_SELECTED_YEAR', payload: e.target.value });
  }, [dispatch]);

  const availableYears = useMemo(() => 
    [...new Set(state.volumes.map(volume => volume.year))].sort((a, b) => b - a)
  , [state.volumes]);

  return (
    <div className="search-controls" role="search" aria-label="Archive search">
      <div className="search-input-wrapper">
        <div className="search-icon" aria-hidden="true">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search articles by title or author..."
          className="search-input"
          onChange={handleSearchChange}
          aria-label="Search articles by title or author"
        />
      </div>
      <div className="filter-wrapper">
        <select
          className="year-filter"
          value={state.selectedYear}
          onChange={handleYearChange}
          aria-label="Filter articles by year"
        >
          <option value="all">All Years</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

SearchControls.displayName = 'SearchControls';

const StatsSection = memo(() => {
  const { state } = useArchive();

  const stats = useMemo(() => {
    const totalIssues = state.volumes.reduce((sum, vol) => sum + (vol.issues?.length || 0), 0);
    const allAuthors = state.allArticles.flatMap(article => {
      if (Array.isArray(article.authors)) {
        return article.authors.filter(author => author && author.trim());
      }
      return [];
    });
    const totalAuthors = [...new Set(allAuthors)].length;
    
    return {
      articles: state.allArticles.length,
      issues: totalIssues,
      authors: totalAuthors
    };
  }, [state.volumes, state.allArticles]);

  return (
    <div className="stats-section" role="region" aria-label="Archive statistics">
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{stats.articles}</div>
          <div className="stat-label">Articles</div>
          <FileText className="stat-icon" aria-hidden="true" />
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.issues}</div>
          <div className="stat-label">Issues</div>
          <Book className="stat-icon" aria-hidden="true" />
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.authors}</div>
          <div className="stat-label">Authors</div>
          <Users className="stat-icon" aria-hidden="true" />
        </div>
        <div className="stat-card highlight">
          <div className="stat-number">Free</div>
          <div className="stat-label">Access</div>
          <BookOpen className="stat-icon" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});

StatsSection.displayName = 'StatsSection';

const ArticleCard = memo(({ article, onClick }) => {
  const authors = useMemo(() => {
    if (Array.isArray(article.authors)) {
      return article.authors.filter(author => author && author.trim());
    } else if (article.authorName) {
      return [article.authorName];
    }
    return ['Unknown Author'];
  }, [article.authors, article.authorName]);

  return (
    <div
      className="article-card"
      onClick={() => onClick(article)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(article);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View article: ${article.title}`}
    >
      <div className="article-content">
        <h4 className="article-title">{article.title}</h4>
        <div className="article-meta">
          <div className="meta-item">
            <User size={14} aria-hidden="true" />
            <span>{authors.join(', ')}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} aria-hidden="true" />
            <time dateTime={article.publishedDate || ""}>
              {article.publishedDate && !isNaN(Date.parse(article.publishedDate))
                ? new Date(article.publishedDate).toLocaleDateString()
                : 'Date not available'}
            </time>
          </div>
        </div>
      </div>
      {article.thumbnail && (
        <div className="article-thumbnail">
          <img src={article.thumbnail} alt="" loading="lazy" />
        </div>
      )}
    </div>
  );
});

ArticleCard.displayName = 'ArticleCard';

const ArticleModal = memo(() => {
  const { state, dispatch } = useArchive();

  const handleClose = useCallback(() => {
    dispatch({ type: 'SET_MODAL_OPEN', payload: false });
    dispatch({ type: 'SET_SELECTED_ARTICLE', payload: null });
    dispatch({ type: 'SET_DOWNLOAD_ERROR', payload: null });
  }, [dispatch]);

  const handleDownload = useCallback(async (articleId, type) => {
    const downloadKey = `${articleId}-${type}`;
    dispatch({ type: 'ADD_DOWNLOADING_ARTICLE', payload: downloadKey });
    dispatch({ type: 'SET_DOWNLOAD_ERROR', payload: null });
    
    try {
      await DataService.downloadArticle(articleId, type);
    } catch (error) {
      console.error('Download failed:', error);
      dispatch({ type: 'SET_DOWNLOAD_ERROR', payload: `Download failed: ${error.message}` });
    } finally {
      dispatch({ type: 'REMOVE_DOWNLOADING_ARTICLE', payload: downloadKey });
    }
  }, [dispatch]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (state.modalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [state.modalOpen, handleKeyDown]);

  if (!state.modalOpen || !state.selectedArticle) return null;

  const article = state.selectedArticle;
  const isDownloading = (articleId, type) => 
    state.downloadingArticles.has(`${articleId}-${type}`);

  const authors = Array.isArray(article.authors) 
    ? article.authors.filter(author => author && author.trim())
    : (article.authorName ? [article.authorName] : ['Unknown Author']);

  return (
    <div 
      className="modal-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{article.title}</h2>
          <button 
            className="modal-close" 
            onClick={handleClose} 
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="article-info">
            <div className="info-item">
              <User size={16} aria-hidden="true" />
              <span>Authors: {authors.join(', ')}</span>
            </div>
            <div className="info-item">
              <Calendar size={16} aria-hidden="true" />
              <span>Published: {article.publishedDate && !isNaN(Date.parse(article.publishedDate)) 
                ? new Date(article.publishedDate).toLocaleDateString()
                : 'Date not available'}</span>
            </div>
            {article.doi && (
              <div className="info-item">
                <BookOpen size={16} aria-hidden="true" />
                <span>DOI: {article.doi}</span>
              </div>
            )}
          </div>

          <div className="abstract-section">
            <h3>Abstract</h3>
            <p>{article.abstract || 'Abstract not available'}</p>
          </div>

          {state.downloadError && (
            <div className="download-error">
              <AlertCircle size={16} />
              <span>{state.downloadError}</span>
            </div>
          )}

          <div className="download-actions">
            <button
              className={`download-btn primary ${isDownloading(article.id, 'full') ? 'downloading' : ''}`}
              onClick={() => handleDownload(article.id, 'full')}
              disabled={isDownloading(article.id, 'full')}
              aria-describedby="download-full-desc"
            >
              <Download size={18} aria-hidden="true" />
              {isDownloading(article.id, 'full') ? 'Downloading...' : 'Download Full Article'}
            </button>
            <button
              className={`download-btn secondary ${isDownloading(article.id, 'abstract') ? 'downloading' : ''}`}
              onClick={() => handleDownload(article.id, 'abstract')}
              disabled={isDownloading(article.id, 'abstract')}
              aria-describedby="download-abstract-desc"
            >
              <Download size={18} aria-hidden="true" />
              {isDownloading(article.id, 'abstract') ? 'Downloading...' : 'Download Abstract'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ArticleModal.displayName = 'ArticleModal';

const PartSection = memo(({ part, isExpanded, onToggle }) => {
  const { state, dispatch } = useArchive();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate article count from state or fetched articles
  const articleCount = articles.length;


  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      if (isExpanded && articles.length === 0) {
        setLoading(true);
        try {
          const response = await DataService.fetchArticles(part.id);
          if (isMounted && !abortController.signal.aborted) {
            setArticles(response.articles);
            // Also store in global state for article counting
            dispatch({ 
              type: 'SET_PART_ARTICLES', 
              payload: { partId: part.id, articles: response.articles }
            });
          }
        } catch (error) {
          if (isMounted && !abortController.signal.aborted) {
            console.error('Failed to fetch articles:', error);
          }
        } finally {
          if (isMounted && !abortController.signal.aborted) {
            setLoading(false);
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [isExpanded, articles.length, part.id, dispatch]);

  const handleArticleClick = useCallback(async (article) => {
    try {
      const fullArticle = await DataService.fetchArticleDetails(article.id);
      if (fullArticle) {
        dispatch({ type: 'SET_SELECTED_ARTICLE', payload: fullArticle });
        dispatch({ type: 'SET_MODAL_OPEN', payload: true });
      }
    } catch (error) {
      console.error('Failed to fetch article details:', error);
    }
  }, [dispatch]);

  return (
    <div className="part-section">
      <button 
        className="part-header" 
        onClick={onToggle} 
        aria-expanded={isExpanded}
        aria-controls={`part-content-${part.id}`}
        aria-describedby={`part-description-${part.id}`}
      >
        <div className="part-info">
          <span className="part-name">Part {part.label || part.name}</span>
          <div className="part-meta">
            <span className="part-description" id={`part-description-${part.id}`}>
              {part.description}
            </span>
            <span className="article-count">({articleCount} articles)</span>
          </div>
        </div>
        <div className="chevron-icon" aria-hidden="true">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className="part-content" id={`part-content-${part.id}`}>
          {loading ? (
            <LoadingSkeleton />
          ) : articles.length > 0 ? (
            <div className="articles-grid">
              {articles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          ) : (
            <div className="no-articles">
              <p>No articles found in this part.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

PartSection.displayName = 'PartSection';

const IssueSection = memo(({ issue, volumeNumber, isExpanded, onToggle }) => {
  const { state, dispatch } = useArchive();

  const togglePart = useCallback((partId) => {
    dispatch({ type: 'TOGGLE_PART', payload: partId });
  }, [dispatch]);

  return (
    <div className="issue-section">
      <button 
        className="issue-header" 
        onClick={onToggle} 
        aria-expanded={isExpanded}
        aria-controls={`issue-content-${issue.id}`}
      >
        <div className="issue-title-section">
          <h3 className="issue-title">
            Issue {issue.number}
          </h3>
          <time className="issue-date" dateTime={issue.publishedDate || ""}>
            {issue.publishedDate && !isNaN(Date.parse(issue.publishedDate))
              ? new Date(issue.publishedDate).toLocaleDateString()
              : "Date not available"}
          </time>
        </div>
        <div className="chevron-icon" aria-hidden="true">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className="issue-content" id={`issue-content-${issue.id}`}>
          {issue.parts && issue.parts.length > 0 ? (
            issue.parts.map(part => (
              <PartSection
                key={part.id}
                part={part}
                isExpanded={state.expandedParts.has(part.id)}
                onToggle={() => togglePart(part.id)}
              />
            ))
          ) : (
            <div className="no-parts">
              <p>No parts found in this issue.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

IssueSection.displayName = 'IssueSection';

const VolumeSection = memo(({ volume, isExpanded, onToggle }) => {
  const { state, dispatch } = useArchive();

  const toggleIssue = useCallback((issueId) => {
    dispatch({ type: 'TOGGLE_ISSUE', payload: issueId });
  }, [dispatch]);

  return (
    <div className="volume-section">
      <button 
        className="volume-header" 
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`volume-content-${volume.id}`}
      >
        <h2 className="volume-title">Volume {volume.number} ({volume.year})</h2>
        <div className="chevron-icon" aria-hidden="true">
          {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </div>
      </button>

      {isExpanded && (
        <div className="volume-content" id={`volume-content-${volume.id}`}>
          {volume.issues && volume.issues.length > 0 ? (
            volume.issues.map(issue => (
              <IssueSection
                key={issue.id}
                issue={issue}
                volumeNumber={volume.number}
                isExpanded={state.expandedIssues.has(issue.id)}
                onToggle={() => toggleIssue(issue.id)}
              />
            ))
          ) : (
            <div className="no-issues">
              <p>No issues found in this volume.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

VolumeSection.displayName = 'VolumeSection';

// Main Archive Hook
const useArchiveLogic = () => {
  const { state, dispatch } = useArchive();

  const loadArchiveData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Load volumes structure
      const data = await DataService.fetchArchive();
      dispatch({ type: 'SET_VOLUMES', payload: data.volumes });

      // Load all articles for search functionality and statistics
      const articles = await DataService.fetchAllArticles();
      dispatch({ type: 'SET_ALL_ARTICLES', payload: articles });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to load archive data' });
      console.error('Archive data loading failed:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const filterContent = useCallback(async () => {
    if (state.searchTerm.trim() || state.selectedYear !== 'all') {
      try {
        // Use backend search API for filtering
        const filteredArticles = await DataService.searchArticles(state.searchTerm, state.selectedYear);
        
        // Build filtered volume structure based on search results
        let filtered = [...state.volumes];

        if (state.selectedYear !== 'all') {
          filtered = filtered.filter(volume => volume.year.toString() === state.selectedYear);
        }

        if (state.searchTerm.trim() && filteredArticles.length > 0) {
          filtered = filtered.map(volume => {
            const volumeArticles = filteredArticles.filter(article => 
              article.volumeNumber === volume.number || article.volumeNumber === volume.volumeNumber
            );
            if (volumeArticles.length === 0) return null;

            const filteredIssues = volume.issues.map(issue => {
              const issueArticles = volumeArticles.filter(article => 
                article.issueNumber === issue.number || article.number === issue.number
              );
              if (issueArticles.length === 0) return null;

              const filteredParts = issue.parts.filter(part =>
                issueArticles.some(article => article.partId === part.id)
              );

              return filteredParts.length > 0 ? { ...issue, parts: filteredParts } : null;
            }).filter(Boolean);

            return filteredIssues.length > 0 ? { ...volume, issues: filteredIssues } : null;
          }).filter(Boolean);
        } else if (state.searchTerm.trim() && filteredArticles.length === 0) {
          filtered = [];
        }

        dispatch({ type: 'SET_FILTERED_VOLUMES', payload: filtered });
      } catch (error) {
        console.error('Failed to filter content:', error);
        // Fallback to client-side filtering
        clientSideFilter();
      }
    } else {
      dispatch({ type: 'SET_FILTERED_VOLUMES', payload: state.volumes });
    }
  }, [state.volumes, state.searchTerm, state.selectedYear, dispatch]);

  // Fallback client-side filtering
  const clientSideFilter = useCallback(() => {
    let filtered = [...state.volumes];

    if (state.selectedYear !== 'all') {
      filtered = filtered.filter(volume => volume.year.toString() === state.selectedYear);
    }

    if (state.searchTerm.trim()) {
      const searchLower = state.searchTerm.toLowerCase();
      const matchingArticles = state.allArticles.filter(article => {
        const title = (article.title || '').toLowerCase();
        const authors = Array.isArray(article.authors) 
          ? article.authors.filter(author => author && author.trim())
          : [];
        
        return title.includes(searchLower) ||
               authors.some(author => author.toLowerCase().includes(searchLower));
      });

      if (matchingArticles.length > 0) {
        filtered = filtered.map(volume => {
          const volumeArticles = matchingArticles.filter(article => 
            article.volumeNumber === volume.number || article.volumeNumber === volume.volumeNumber
          );
          if (volumeArticles.length === 0) return null;

          const filteredIssues = volume.issues.map(issue => {
            const issueArticles = volumeArticles.filter(article => 
              article.issueNumber === issue.number || article.number === issue.number
            );
            if (issueArticles.length === 0) return null;

            const filteredParts = issue.parts.filter(part =>
              issueArticles.some(article => article.partId === part.id)
            );

            return filteredParts.length > 0 ? { ...issue, parts: filteredParts } : null;
          }).filter(Boolean);

          return filteredIssues.length > 0 ? { ...volume, issues: filteredIssues } : null;
        }).filter(Boolean);
      } else {
        filtered = [];
      }
    }

    dispatch({ type: 'SET_FILTERED_VOLUMES', payload: filtered });
  }, [state.volumes, state.searchTerm, state.selectedYear, state.allArticles, dispatch]);

  const toggleVolume = useCallback((volumeId) => {
    dispatch({ type: 'TOGGLE_VOLUME', payload: volumeId });
  }, [dispatch]);

  useEffect(() => {
    loadArchiveData();
  }, [loadArchiveData]);

  useEffect(() => {
    filterContent();
  }, [filterContent]);

  return {
    loadArchiveData,
    toggleVolume
  };
};

const ArchiveProvider = ({ children }) => {
  const initialState = {
    volumes: [],
    filteredVolumes: [],
    allArticles: [],
    partArticles: {}, // Store articles by part ID
    loading: false,
    error: null,
    expandedVolumes: new Set(),
    expandedIssues: new Set(),
    expandedParts: new Set(),
    searchTerm: '',
    selectedYear: 'all',
    selectedArticle: null,
    modalOpen: false,
    downloadingArticles: new Set(),
    downloadError: null
  };

  const [state, dispatch] = useReducer(archiveReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ArchiveContext.Provider value={contextValue}>
      {children}
    </ArchiveContext.Provider>
  );
};

ArchiveProvider.displayName = 'ArchiveProvider';

// Archive Content Component
const ArchiveContent = memo(() => {
  const { state } = useArchive();
  const { loadArchiveData, toggleVolume } = useArchiveLogic();

  if (state.loading) {
    return (
      <div className="archive-container">
        <div className="archive-header">
          <h1>Journal Archive</h1>
        </div>
        <div className="archive-content">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="archive-container">
        <div className="archive-header">
          <h1>Journal Archive</h1>
        </div>
        <div className="archive-content">
          <div className="error-message">
            <AlertCircle size={48} className="error-icon" />
            <h2>Error Loading Archive</h2>
            <p>{state.error}</p>
            <button onClick={loadArchiveData} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="archive-container">
      {/* Header */}
      <header className="archive-header">
        <div className="header-content">
          <h1>Journal Archive</h1>
          <p className="archive-header-subtitle">
            Explore our comprehensive collection of peer-reviewed research articles, 
            spanning multiple volumes and covering cutting-edge developments in science and technology.
          </p>
        </div>
      </header>

      {/* Statistics */}
      <StatsSection />

      {/* Main Content */}
      <main className="archive-content">
        {/* Search Controls */}
        <SearchControls />

        {/* Results */}
        {state.filteredVolumes.length === 0 ? (
          <div className="no-results" role="status">
            <div className="no-results-content">
              <div className="no-results-icon" aria-hidden="true">📚</div>
              <h3>No Results Found</h3>
              <p>
                No articles found matching your search criteria. 
                Try adjusting your search terms or year filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="volumes-list" role="region" aria-label="Archive volumes">
            {state.filteredVolumes.map(volume => (
              <VolumeSection
                key={volume.id}
                volume={volume}
                isExpanded={state.expandedVolumes.has(volume.id)}
                onToggle={() => toggleVolume(volume.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Article Modal */}
      <ArticleModal />

      {/* Footer */}
      <footer className="archive-footer">
        <div className="footer-content">
          <div className="footer-main">
            <h2>About Our Archive</h2>
            <p>
              The International Journal of Agricultural Research and Emerging Innovations (IJAREI)
              maintains a comprehensive digital archive of peer-reviewed research articles,
              review papers, and scholarly contributions. Our archive serves researchers,
              academicians, and professionals worldwide with free access to cutting-edge
              agricultural research and innovations.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🔓</div>
              <h3>Open Access Policy</h3>
              <p>All articles are freely available for download without subscription or payment.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">📖</div>
              <h3>Citation Guidelines</h3>
              <p>Proper citation format and DOI links are provided for academic referencing.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">✅</div>
              <h3>Quality Assurance</h3>
              <p>All published articles undergo rigorous peer-review process.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

ArchiveContent.displayName = 'ArchiveContent';

// Main Archive Component
const Archive = () => {
  return (
    <ErrorBoundary>
      <ArchiveProvider>
        <Suspense fallback={<LoadingSkeleton />}>
          <ArchiveContent />
        </Suspense>
      </ArchiveProvider>
    </ErrorBoundary>
  );
};

Archive.displayName = 'Archive';

export default Archive;