import React, { useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  Check,
  AlertCircle,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Redo,
  Type,
  Palette
} from 'lucide-react';
import '../styles/ArticleUploadForm.css';

const ArticleUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    abstract: '',
    keyword: '',
    subject: '',
    country: '',
    doi: '',
    month: '',
    year: '',
    volume: '',
    issue: '',
    part: '',
    pageNo: '',
    authorEmail: '',
    referenceNo: '',
    articleFile: null
  });

  const [editorContent, setEditorContent] = useState('');
  const [editorSelection, setEditorSelection] = useState(null);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volumes, setVolumes] = useState([]);
  const [issues, setIssues] = useState([]);
  const [parts, setParts] = useState([]);
  const [years, setYears] = useState([]);
  const [loadingVolumes, setLoadingVolumes] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingParts, setLoadingParts] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
  const fontFamilies = ['Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana', 'Calibri'];
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

  // Get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const getJsonAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
  'Content-Type': 'application/json'
});

  // Get auth headers for file upload (multipart)
  const getFileUploadHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`
      // Don't set Content-Type for multipart/form-data - let browser set it
    };
  };

  useEffect(() => {
  loadYears(); // Fetch all years from backend
}, []);

const loadYears = async () => {
  try {
    const response = await fetch('/api/admin/volumes/years', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to load years');
    const yearsData = await response.json();
    setYears(yearsData);  // populate year dropdown
  } catch (error) {
    console.error('Error loading years:', error);
    setSubmitError('Failed to load years. Please refresh the page.');
  }
};


      useEffect(() => {
        loadVolumes(); // Fetch all volumes from /api/admin/volumes
      }, []);


  const loadVolumes = async () => {
  try {
    setLoadingVolumes(true);
    const response = await fetch('/api/admin/volumes', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to load volumes');
    const data = await response.json();
    setVolumes(data); // Set all volumes, not filtered
  } catch (error) {
    setSubmitError('Failed to load volumes.');
  } finally {
    setLoadingVolumes(false);
  }
};


  const loadIssues = async (volumeId) => {
    setLoadingIssues(true);
    try {
      const response = await fetch(`/api/admin/issuesByVolume/${volumeId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch issues: ${response.statusText}`);
      }

      const issuesData = await response.json();
      setIssues(issuesData);

    } catch (error) {
      console.error('Error loading issues:', error);
      setSubmitError('Failed to load issues for selected volume.');
    } finally {
      setLoadingIssues(false);
    }
  };

  const loadParts = async (issueId) => {
    setLoadingParts(true);
    try {
      const response = await fetch(`/api/admin/partsByIssue/${issueId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }

      const partsData = await response.json();
      console.log('Parts data:', partsData)
      setParts(partsData);

    } catch (error) {
      console.error('Error loading parts:', error);
      setSubmitError('Failed to load parts for selected issue.');
    } finally {
      setLoadingParts(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Clear submit messages when user starts typing
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError('');
  };

    const handleYearChange = (e) => {
    const selectedYear = e.target.value;

    setFormData(prev => ({
      ...prev,
      year: selectedYear,
    }));

    if (errors.year) {
     setErrors(prev => ({ ...prev, year: '' }));
    }
    
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError('');
  };


  const handleVolumeChange = (e) => {
    const volumeId = e.target.value;
    setFormData(prev => ({
      ...prev,
      volume: volumeId,
      issue: '', // Reset issue and part when volume changes
      part: ''
    }));

    // Clear errors
    if (errors.volume) {
      setErrors(prev => ({ ...prev, volume: '' }));
    }

    // Load issues for selected volume
    if (volumeId) {
      loadIssues(volumeId);
    } else {
      setIssues([]);
      setParts([]);
    }
  };

  const handleIssueChange = (e) => {
    const issueId = e.target.value;
    setFormData(prev => ({
      ...prev,
      issue: issueId,
      part: '' // Reset part when issue changes
    }));

    // Clear errors
    if (errors.issue) {
      setErrors(prev => ({ ...prev, issue: '' }));
    }

    // Load parts for selected issue
    if (issueId) {
      loadParts(issueId);
    } else {
      setParts([]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, articleFile: 'Only PDF files are allowed' }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors(prev => ({ ...prev, articleFile: 'File size should be less than 10MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, articleFile: file }));
      setErrors(prev => ({ ...prev, articleFile: '' }));
    }
  };

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    document.getElementById('abstract-editor').focus();
  };

  const handleEditorChange = () => {
    const content = document.getElementById('abstract-editor').innerHTML;
    setEditorContent(content);
    setFormData(prev => ({ ...prev, abstract: content }));
    
    // Clear abstract error when user types
    if (errors.abstract) {
      setErrors(prev => ({ ...prev, abstract: '' }));
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          executeCommand('insertImage', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const validateForm = () => {
    const newErrors = {};

    const title = formData.title || '';
    const authorName = formData.authorName || '';
    const abstract = formData.abstract || '';
    const keyword = formData.keyword || '';


    if (!formData.title.trim()) newErrors.title = 'Article title is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    
    // Check both plain text and HTML content for abstract
    const abstractText = abstract.replace(/<[^>]*>/g, '').trim();
    if (!abstractText) newErrors.abstract = 'Article abstract is required';
    
    if (!formData.keyword.trim()) newErrors.keyword = 'Keywords are required';
    //if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.month) newErrors.month = 'Month is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.articleFile) newErrors.articleFile = 'Article file is required';
    if (!formData.authorEmail.trim()) {
      newErrors.authorEmail = 'Author email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) {
      newErrors.authorEmail = 'Enter a valid email address';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitSuccess(false);
  setSubmitError('');

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    // Step 1: Upload PDF file separately
    const formDataFile = new FormData();
    formDataFile.append('file', formData.articleFile);

    console.log('Headers:', {
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`
});


    const uploadResponse = await fetch('/api/admin/article/pdfUpload', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formDataFile,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'PDF upload failed');
    }

    const uploadResult = await uploadResponse.json();
    const pdfUrl = uploadResult.fileUrl;

    // Step 2: Submit article metadata including the uploaded pdf URL
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('authorName', formData.authorName);
    formDataToSend.append('abstract', formData.abstract);
    formDataToSend.append('keyword', formData.keyword);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('country', formData.country || '');
    formDataToSend.append('doi', formData.doi || '');
    formDataToSend.append('month', formData.month);
    formDataToSend.append('year', formData.year);
    formDataToSend.append('volume', formData.volume || '');
    formDataToSend.append('issue', formData.issue || '');
    formDataToSend.append('part', formData.part || '');
    formDataToSend.append('pageNo', formData.pageNo || '');
    formDataToSend.append('referenceNo', formData.referenceNo || '');
    formDataToSend.append('fileUrl', pdfUrl); 
    


  const yourJsonData = {
  title: formData.title || '',
  authorName: formData.authorName || '',
  abstract: formData.abstract || '',
  keyword: formData.keyword || '', 
  subject: formData.subject || '',
  country: formData.country || '',
  doi: formData.doi || '',
  month: formData.month || '',
  year: formData.year || '',
  part: formData.part ? { id: formData.part } : null,
  pageNumber: formData.pageNo || '',
  refNumber: formData.referenceNo || '',
  fileUrl: pdfUrl || '',
  authorEmail: formData.authorEmail || '',
};


    const publishResponse = await fetch('/api/admin/article/publish', {
      method: 'POST',
      headers: getJsonAuthHeaders(),
      body: JSON.stringify(yourJsonData),
    });

    if (!publishResponse.ok) {
      const errorData = await publishResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'Article publish failed');
    }

    const result = await publishResponse.json();
    setSubmitSuccess(true);
    setSubmitError('');

    // Reset form and editor content
    setFormData({
      title: '',
      authorName: '',
      authorEmail: '',
      abstract: '',
      keyword: '',
      subject: '',
      country: '',
      doi: '',
      month: '',
      year: '',
      volume: '',
      issue: '',
      part: '',
      pageNo: '',
      referenceNo: '',
      articleFile: null,
    });
    setEditorContent('');

    // Clear file input field if needed
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';

    // Clear dependent dropdown lists
    setIssues([]);
    setParts([]);

  } catch (error) {
    console.error(error);
    setSubmitError(error.message || 'Error publishing article. Please try again.');
    setSubmitSuccess(false);
  } finally {
    setIsSubmitting(false);
  }
};


  // Close success/error messages
  const closeMessages = () => {
    setSubmitSuccess(false);
    setSubmitError('');
  };

  return (
    <div className="auf-container">
      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="auf-success-message" style={{
          backgroundColor: '#d1fae5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>✅ Article published successfully!</span>
          <button onClick={closeMessages} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#065f46' }}>
            ✕
          </button>
        </div>
      )}

      {submitError && (
        <div className="auf-error-message" style={{
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
          <span>❌ {submitError}</span>
          <button onClick={closeMessages} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
            ✕
          </button>
        </div>
      )}

      <div className="auf-header">
        <div className="auf-header-icon">
          <FileText size={32} />
        </div>
        <div>
          <h1 className="auf-title">Upload New Article</h1>
          <p className="auf-subtitle">Fill in the article details and upload the PDF file</p>
        </div>
      </div>

      <div className="auf-form">
        {/* Article Information Section */}
        <div className="auf-section">
          <h2 className="auf-section-title">Article Information</h2>

          <div className="auf-form-group">
            <label className="auf-label">Article Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`auf-input ${errors.title ? 'auf-error' : ''}`}
              placeholder="Enter the complete article title"
            />
            {errors.title && <span className="auf-error-text">{errors.title}</span>}
          </div>

          <div className="auf-form-group">
            <label className="auf-label">Author Name *</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              className={`auf-input ${errors.authorName ? 'auf-error' : ''}`}
              placeholder="Enter author's full name"
            />
            {errors.authorName && <span className="auf-error-text">{errors.authorName}</span>}
          </div>

          <div className="auf-form-group">
            <label className="auf-label">Author Email *</label>
            <input
              type="email"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleInputChange}
              className={`auf-input ${errors.authorEmail ? 'auf-error' : ''}`}
              placeholder="Enter author's email"
            />
            {errors.authorEmail && <span className="auf-error-text">{errors.authorEmail}</span>}
          </div>


          <div className="auf-form-group">
            <label className="auf-label">Article Abstract *</label>

            {/* Rich Text Editor Toolbar */}
            <div className="auf-editor-toolbar">
              <div className="auf-toolbar-group">
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('bold')}
                  title="Bold"
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('italic')}
                  title="Italic"
                >
                  <Italic size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('underline')}
                  title="Underline"
                >
                  <Underline size={16} />
                </button>
              </div>

              <div className="auf-toolbar-divider"></div>

              <div className="auf-toolbar-group">
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('justifyLeft')}
                  title="Align Left"
                >
                  <AlignLeft size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('justifyCenter')}
                  title="Center"
                >
                  <AlignCenter size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('justifyRight')}
                  title="Align Right"
                >
                  <AlignRight size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('justifyFull')}
                  title="Justify"
                >
                  <AlignJustify size={16} />
                </button>
              </div>

              <div className="auf-toolbar-divider"></div>

              <div className="auf-toolbar-group">
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('insertUnorderedList')}
                  title="Bullet List"
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('insertOrderedList')}
                  title="Numbered List"
                >
                  <ListOrdered size={16} />
                </button>
              </div>

              <div className="auf-toolbar-divider"></div>

              <div className="auf-toolbar-group">
                <div className="auf-dropdown">
                  <button
                    type="button"
                    className="auf-toolbar-btn auf-dropdown-btn"
                    onClick={() => setShowFontMenu(!showFontMenu)}
                    title="Font Size"
                  >
                    <Type size={16} />
                  </button>
                  {showFontMenu && (
                    <div className="auf-dropdown-menu">
                      {fontSizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          className="auf-dropdown-item"
                          onClick={() => {
                            executeCommand('fontSize', size);
                            setShowFontMenu(false);
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="auf-dropdown">
                  <button
                    type="button"
                    className="auf-toolbar-btn auf-dropdown-btn"
                    onClick={() => setShowColorMenu(!showColorMenu)}
                    title="Text Color"
                  >
                    <Palette size={16} />
                  </button>
                  {showColorMenu && (
                    <div className="auf-dropdown-menu auf-color-menu">
                      {colors.map(color => (
                        <button
                          key={color}
                          type="button"
                          className="auf-color-item"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            executeCommand('foreColor', color);
                            setShowColorMenu(false);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="auf-toolbar-divider"></div>

              <div className="auf-toolbar-group">
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={insertLink}
                  title="Add Link"
                >
                  <Link size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={insertImage}
                  title="Add Image"
                >
                  <Image size={16} />
                </button>
              </div>

              <div className="auf-toolbar-divider"></div>

              <div className="auf-toolbar-group">
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('undo')}
                  title="Undo"
                >
                  <Undo size={16} />
                </button>
                <button
                  type="button"
                  className="auf-toolbar-btn"
                  onClick={() => executeCommand('redo')}
                  title="Redo"
                >
                  <Redo size={16} />
                </button>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div
              id="abstract-editor"
              className={`auf-rich-editor ${errors.abstract ? 'auf-error' : ''}`}
              contentEditable="true"
              onInput={handleEditorChange}
              onBlur={handleEditorChange}
              placeholder="Write your article abstract here..."
              suppressContentEditableWarning={true}
            />
            {errors.abstract && <span className="auf-error-text">{errors.abstract}</span>}
          </div>

          <div className="auf-row">
            <div className="auf-form-group">
              <label className="auf-label">Keyword *</label>
              <input
                type="text"
                name="keyword"
                value={formData.keyword}
                onChange={handleInputChange}
                className={`auf-input ${errors.keyword ? 'auf-error' : ''}`}
                placeholder="Enter keyword separated by commas"
              />
              {errors.keyword && <span className="auf-error-text">{errors.keyword}</span>}
            </div>

            <div className="auf-form-group">
              <label className="auf-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`auf-input ${errors.subject ? 'auf-error' : ''}`}
                placeholder="Enter article subject"
              />
              {errors.subject && <span className="auf-error-text">{errors.subject}</span>}
            </div>
          </div>

          <div className="auf-row">
            <div className="auf-form-group">
              <label className="auf-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="auf-input"
                placeholder="Author's country"
              />
            </div>

            <div className="auf-form-group">
              <label className="auf-label">DOI</label>
              <input
                type="text"
                name="doi"
                value={formData.doi}
                onChange={handleInputChange}
                className="auf-input"
                placeholder="Digital Object Identifier"
              />
            </div>
          </div>
        </div>

        {/* Publication Details Section */}
        <div className="auf-section">
          <h2 className="auf-section-title">Publication Details</h2>

          <div className="auf-row">
            <div className="auf-form-group">
              <label className="auf-label">Month *</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className={`auf-select ${errors.month ? 'auf-error' : ''}`}
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {errors.month && <span className="auf-error-text">{errors.month}</span>}
            </div>

            <div className="auf-form-group">
              <label className="auf-label">Year *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleYearChange}
                className={`auf-select ${errors.year ? 'auf-error' : ''}`}
                disabled={loadingVolumes}
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && <span className="auf-error-text">{errors.year}</span>}
            </div>
          </div>

          <div className="auf-row">
            <div className="auf-form-group">
              <label className="auf-label">Volume</label>
              <select
                name="volume"
                value={formData.volume}
                onChange={handleVolumeChange}
                className="auf-select"
                disabled={loadingVolumes}
              >
                <option value="">
                  {loadingVolumes ? 'Loading volumes...' : 'Select Volume'}
                </option>
                {volumes.map(volume => (
                  <option key={volume.id} value={volume.id}>
                    Volume {volume.number} ({volume.year})
                  </option>
                ))}
              </select>
            </div>

            <div className="auf-form-group">
              <label className="auf-label">Issue</label>
              <select
                name="issue"
                value={formData.issue}
                onChange={handleIssueChange}
                className="auf-select"
                disabled={loadingIssues || !formData.volume}
              >
                <option value="">
                  {!formData.volume ? 'Select Volume first' : 
                   loadingIssues ? 'Loading issues...' : 'Select Issue'}
                </option>
                {issues.map(issue => (
                  <option key={issue.id} value={issue.id}>
                    Issue {issue.number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="auf-row">
            <div className="auf-form-group">
              <label className="auf-label">Part</label>
              <select
                name="part"
                value={formData.part}
                onChange={handleInputChange}
                className="auf-select"
                disabled={loadingParts || !formData.issue}
              >
                <option value="">
                  {!formData.issue ? 'Select Issue first' : 
                   loadingParts ? 'Loading parts...' : 'Select Part'}
                </option>
                {parts.map(part => (
                  <option key={part.id} value={part.id}>
                    {part.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="auf-form-group">
              <label className="auf-label">Page No.</label>
              <input
                type="text"
                name="pageNo"
                value={formData.pageNo}
                onChange={handleInputChange}
                className="auf-input"
                placeholder="e.g., 1-10"
              />
            </div>
          </div>

          <div className="auf-form-group">
            <label className="auf-label">Reference No.</label>
            <input
              type="text"
              name="referenceNo"
              value={formData.referenceNo}
              onChange={handleInputChange}
              className="auf-input"
              placeholder="Reference number"
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div className="auf-section">
          <h2 className="auf-section-title">Article File</h2>

          <div className="auf-form-group">
            <label className="auf-label">Upload Article File * (PDF only)</label>
            <div className={`auf-file-upload ${errors.articleFile ? 'auf-error' : ''}`}>
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFileUpload}
                className="auf-file-input"
              />
              <label htmlFor="file-upload" className="auf-file-label">
                <Upload size={24} />
                <span className="auf-file-text">
                  {formData.articleFile ? formData.articleFile.name : 'Choose PDF file or drag and drop'}
                </span>
                <span className="auf-file-subtext">Maximum file size: 10MB</span>
              </label>
            </div>
            {errors.articleFile && <span className="auf-error-text">{errors.articleFile}</span>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="auf-submit-section">
          <button
            type="button"
            className="auf-submit-btn"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <div className="auf-spinner"></div>
                Publishing Article...
              </>
            ) : (
              <>
                <Check size={20} />
                Publish Article
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleUploadForm;