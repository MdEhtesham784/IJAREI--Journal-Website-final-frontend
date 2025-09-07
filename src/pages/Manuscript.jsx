import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, FileText, Upload, CheckCircle, Send, HelpCircle, AlertCircle, BookOpen } from 'lucide-react';
import '../styles/ManuscriptForm.css';

const ManuscriptForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        title: '',
        subject: '',
        filePath: null
    });

    const [showGuide, setShowGuide] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [manuscriptId, setManuscriptId] = useState('');

    // Optional: Load saved draft from localStorage on component mount
    useEffect(() => {
        const savedDraft = localStorage.getItem('manuscriptDraft');
        if (savedDraft) {
            try {
                const parsedDraft = JSON.parse(savedDraft);
                setFormData(prev => ({ ...prev, ...parsedDraft, filePath: null })); // Don't restore file from localStorage
            } catch (error) {
                console.error('Error loading saved draft:', error);
            }
        }
    }, []);

    // Auto-save draft to localStorage (excluding file)
    useEffect(() => {
        const draftData = { ...formData };
        delete draftData.filePath;
        if (Object.values(draftData).some(value =>value && value.toString().trim() !== '')) {
            localStorage.setItem('manuscriptDraft', JSON.stringify(draftData));
        }
    }, [formData]);

    const token = localStorage.getItem("authToken");


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        // Validate file size (10MB limit)
        if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            e.target.value = '';
            return;
        }

        // Validate file type
        const allowedTypes = ['.doc', '.docx'];
        const fileExtension = selectedFile?.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
        if (selectedFile && !allowedTypes.includes(fileExtension)) {
            alert('Please upload only DOC or DOCX');
            e.target.value = '';
            return;
        }

        setFormData(prev => ({
            ...prev,
            filePath: selectedFile
        }));
    };

    const uploadFile = async (file) => {
    try {
    const fileFormData = new FormData();
    fileFormData.append("file", file);  // must match @RequestParam("file")

    // Debug: log what is being sent
    for (let [key, value] of fileFormData.entries()) {
      console.log("FormData:", key, value);
    }

    const response = await fetch("/api/manuscripts/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ keep auth header
        // ❌ DO NOT set "Content-Type" here, browser will do it automatically
      },
      body: fileFormData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.text(); // backend returns String
    console.log("Upload success:", result);
    return result;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};


    const submitManuscript = async (manuscriptData) => {
  try {
    const metaData = new FormData();
    metaData.append("name", manuscriptData.name);
    metaData.append("email", manuscriptData.email);
    metaData.append("contactNumber", manuscriptData.contactNumber);
    metaData.append("title", manuscriptData.title);
    metaData.append("subject", manuscriptData.subject);
    metaData.append("filePath", manuscriptData.fileUrl); // backend expects this string

    const response = await fetch("/api/manuscripts/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ keep only auth header
      },
      body: metaData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `Submission failed with status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Manuscript submission error:", error);
    throw new Error(`Submission failed: ${error.message}`);
  }
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);
        setUploadProgress(0);

        try {
            // Validate required fields
            const requiredFields = ['name', 'email', 'contactNumber', 'title', 'subject'];
            for (const field of requiredFields) {
                if (typeof formData[field] !== 'string' || !formData[field].trim()) {
                    throw new Error(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
                }
            }

            if (!formData.filePath) {
                throw new Error('Please select a file to upload');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

           // Step 1: Upload file
            setUploadProgress(25);
            let fileUrl = null;
            if (formData.filePath) {
                fileUrl = await uploadFile(formData.filePath);
                setUploadProgress(50);
            }

            // Step 2: Submit manuscript data
            setUploadProgress(75);
            const result = await submitManuscript({
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                contactNumber: formData.contactNumber.trim(),
                title: formData.title.trim(),
                subject: formData.subject.trim(),
                fileUrl: fileUrl, // ✅ comes from uploadFile()
            });

            setUploadProgress(100);
            
            setSubmissionStatus('success');
            setManuscriptId(result.manuscriptId || result.id || '');
            
            // Clear form after successful submission
            setFormData({
                name: '',
                email: '',
                contactNumber: '',
                title: '',
                subject: '',
                filePath: null
            });

            // Clear saved draft
            localStorage.removeItem('manuscriptDraft');
            
            // Reset file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';

            // Show success message
            const successMessage = `Manuscript submitted successfully!${result.manuscriptId ? ` Your manuscript ID is: ${result.manuscriptId}` : ''}`;
            setTimeout(() => {
                alert(successMessage);
            }, 500);

        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionStatus('error');
            
            // More user-friendly error messages
            let errorMessage = error.message;
            if (error.message.includes('fetch')) {
                errorMessage = 'Network error. Please check your internet connection and try again.';
            } else if (error.message.includes('500')) {
                errorMessage = 'Server error. Please try again later or contact support.';
            } else if (error.message.includes('413')) {
                errorMessage = 'File is too large. Please upload a file smaller than 10MB.';
            }
            
            alert(`Submission failed: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    // Clear form function
    const clearForm = () => {
        setFormData({
            name: '',
            email: '',
            contactNumber: '',
            title: '',
            subject: '',
            filePath: null
        });
        setSubmissionStatus(null);
        localStorage.removeItem('manuscriptDraft');
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="manuscript-container">
            {/* Header */}
            <header className="manuscript-header">
                <div className="manuscript-header-content">
                    <h1 className="manuscript-header-title">
                        Submit Your Manuscript Here
                    </h1>
                    <p className="manuscript-header-subtitle">
                        International Journal of Agricultural Research and Emerging Innovations (IJAREI)
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="manuscript-main">

                {/* Form Guide Section */}
                <section className={`manuscript-form-section manuscript-section`}>
                    <h2 className="manuscript-form-title">
                        📄 Manuscript Submission Form
                    </h2>

                    {/* Submission Status Message */}
                    {submissionStatus === 'success' && (
                        <div className="manuscript-status-message manuscript-success-message">
                            ✅ Manuscript submitted successfully! You will receive a confirmation email shortly.
                            {manuscriptId && <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Manuscript ID: {manuscriptId}</div>}
                        </div>
                    )}
                    
                    {submissionStatus === 'error' && (
                        <div className="manuscript-status-message manuscript-error-message">
                            ❌ Submission failed. Please check your information and try again.
                        </div>
                    )}

                    {/* Upload Progress */}
                    {isSubmitting && uploadProgress > 0 && (
                        <div className="manuscript-status-message" style={{ backgroundColor: '#e0f2fe', color: '#0277bd', border: '1px solid #29b6f6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>Processing... {uploadProgress}%</span>
                                <div style={{ flex: 1, height: '4px', backgroundColor: '#b3e5fc', borderRadius: '2px' }}>
                                    <div style={{ 
                                        width: `${uploadProgress}%`, 
                                        height: '100%', 
                                        backgroundColor: '#0277bd', 
                                        borderRadius: '2px',
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Guide Toggle Button */}
                    <button
                        className="manuscript-guide-button"
                        onClick={() => setShowGuide(!showGuide)}
                    >
                        <HelpCircle size={20} />
                        {showGuide ? 'Hide Form Guide' : 'Show Form Guide'}
                    </button>

                    {/* Form Filling Guide */}
                    <div className={`manuscript-guide-box ${!showGuide ? 'hidden' : ''}`}>
                        <h3 className="manuscript-guide-title">
                            📝 How to Fill This Form - Complete Guide
                        </h3>

                        <div className="manuscript-tips-grid">
                            <div className="manuscript-tip-card">
                                <User color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-tip-title">Name Field</div>
                                    <p className="manuscript-tip-desc">
                                        Write your full name as it appears in your research papers.
                                        Example: 'Dr. Rajesh Kumar Singh' or 'Prof. Priya Sharma"
                                    </p>
                                </div>
                            </div>

                            <div className="manuscript-tip-card">
                                <Mail color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-tip-title">Email Address</div>
                                    <p className="manuscript-tip-desc">
                                        Provide an active email ID that you check regularly.
                                        Institutional email preferred: 'name@university.edu"
                                    </p>
                                </div>
                            </div>

                            <div className="manuscript-tip-card">
                                <Phone color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-tip-title">Contact Number</div>
                                    <p className="manuscript-tip-desc">
                                        10-digit mobile number with country code।
                                        Format: "+91 98765 43210" - WhatsApp number preferable
                                    </p>
                                </div>
                            </div>

                            <div className="manuscript-tip-card">
                                <BookOpen color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-tip-title">Article Title</div>
                                    <p className="manuscript-tip-desc">
                                        Write the exact title of the research paper. It should be clear and descriptive.
                                        Example: 'Impact of Organic Farming on Soil Health"
                                    </p>
                                </div>
                            </div>

                            <div className="manuscript-tip-card">
                                <FileText color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-tip-title">Subject/Abstract</div>
                                    <p className="manuscript-tip-desc">
                                        Write a brief summary of your research (200–300 words). Include: Research objective, methodology, and key findings.
                                    </p>
                                </div>
                            </div>

                            <div className="manuscript-tip-card">
                                <Upload color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-tip-title">File Upload</div>
                                    <p className="manuscript-tip-desc">
                                        Upload the complete manuscript. Accepted formats: DOC, DOCX. File size should not exceed 10MB.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="manuscript-alert-card" style={{ marginTop: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                            <div className="manuscript-alert-content">
                                <AlertCircle color="#0891b2" size={20} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                                <p style={{ color: '#166534', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                                    <strong>Important Tips:</strong> Carefully check all fields before submitting the form.
                                    Incorrect information may lead to manuscript rejection.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Name and Email Row */}
                        <div className="manuscript-form-grid">
                            <div className="manuscript-form-group">
                                <label className="manuscript-label">
                                    <User size={18} color="#166534" />
                                    Name *
                                </label>
                                <input
                                    className="manuscript-input"
                                    type="text"
                                    name="name"
                                    placeholder="Your Name.."
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    maxLength={100}
                                />
                            </div>

                            <div className="manuscript-form-group">
                                <label className="manuscript-label">
                                    <Mail size={18} color="#166534" />
                                    Email *
                                </label>
                                <input
                                    className="manuscript-input"
                                    type="email"
                                    name="email"
                                    placeholder="Email.."
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    maxLength={150}
                                />
                            </div>
                        </div>

                        {/* Contact and Article Title Row */}
                        <div className="manuscript-form-grid">
                            <div className="manuscript-form-group">
                                <label className="manuscript-label">
                                    <Phone size={18} color="#166534" />
                                    Contact Number *
                                </label>
                                <input
                                    className="manuscript-input"
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Contact Number.."
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    maxLength={20}
                                />
                            </div>

                            <div className="manuscript-form-group">
                                <label className="manuscript-label">
                                    <BookOpen size={18} color="#166534" />
                                    Title of the Article *
                                </label>
                                <input
                                    className="manuscript-input"
                                    type="text"
                                    name="title"
                                    placeholder="Article name.."
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    maxLength={200}
                                />
                            </div>
                        </div>

                        {/* Subject - Full Width */}
                        <div className="manuscript-form-group">
                            <label className="manuscript-label">
                                <FileText size={18} color="#166534" />
                                Subject/Abstract *
                                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '0.5rem' }}>
                                    ({formData.subject.length}/2000 characters)
                                </span>
                            </label>
                            <textarea
                                className="manuscript-textarea"
                                name="subject"
                                placeholder="Write something.."
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                                maxLength={2000}
                            />
                        </div>

                        {/* File Upload - Full Width */}
                        <div className="manuscript-form-group">
                            <label className="manuscript-label">
                                <Upload size={18} color="#166534" />
                                Choose Files * (DOC, DOCX - Max 10MB)
                            </label>
                            <input
                                className="manuscript-file-input"
                                type="file"
                                name="filePath"
                                onChange={handleFileChange}
                                accept=".doc,.docx"
                                required
                                disabled={isSubmitting}
                            />
                            <span className="manuscript-file-status">
                                {formData.filePath ? `✓ ${formData.filePath.name} (${(formData.filePath.size / 1024 / 1024).toFixed(2)} MB)` : 'No file chosen'}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                            <button
                                type="button"
                                onClick={clearForm}
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: '#6b7280',
                                    color: 'white',
                                    padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    opacity: isSubmitting ? 0.5 : 1
                                }}
                            >
                                Clear Form
                            </button>
                            
                            <button
                                type="submit"
                                className="manuscript-submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="manuscript-spinner" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Submit Manuscript
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Submission Guidelines */}
                <section className="manuscript-section">
                    <h2 className="manuscript-section-title">
                        Manuscript Submission Guidelines
                    </h2>
                    <p className="manuscript-text">
                        The <strong>International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>
                        welcomes original research articles, review papers, and case studies in the field of
                        agriculture and allied sciences. Please follow these guidelines for successful submission.
                    </p>
                </section>

                {/* Submission Requirements */}
                <section className="manuscript-section">
                    <h2 className="manuscript-section-title">
                        Submission Requirements
                    </h2>
                    <p className="manuscript-text">
                        <strong>Before submitting your manuscript, please ensure:</strong>
                    </p>

                    <div>
                        {[
                            {
                                title: 'Original Research',
                                desc: 'Your manuscript should contain original, unpublished research work not submitted elsewhere simultaneously.'
                            },
                            {
                                title: 'Proper Formatting',
                                desc: 'Follow standard academic format with proper citations, references, and structured sections (Abstract, Introduction, Methodology, Results, Conclusion).'
                            },
                            {
                                title: 'Language & Grammar',
                                desc: 'Manuscript should be written in clear, grammatically correct English with proper academic writing style.'
                            },
                            {
                                title: 'File Requirements',
                                desc: 'Submit in DOC, or DOCX format. Maximum file size 10MB. Include all figures, tables, and supplementary materials.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="manuscript-requirement-item">
                                <CheckCircle color="#166534" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div className="manuscript-requirement-title">{item.title}</div>
                                    <p className="manuscript-requirement-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Submission Process */}
                <section className="manuscript-section">
                    <h2 className="manuscript-section-title">
                        Submission Process
                    </h2>

                    <div className="manuscript-highlight-box">
                        <p className="manuscript-text">
                            <strong>📋 Step-by-Step Process:</strong>
                        </p>
                        <div>
                            {[
                                'Fill out the manuscript submission form above with accurate details',
                                'Upload your complete manuscript file in DOC or DOCX format only',
                                'Provide a comprehensive abstract/summary of your research work',
                                'Submit the form and wait for our acknowledgment email (within 24-48 hours)',
                                'Our editorial team will review and provide feedback within 2-4 weeks'
                            ].map((step, index) => (
                                <div key={index} className="manuscript-bullet-point">
                                    <div className="manuscript-bullet"></div>
                                    <p style={{ color: '#374151', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="manuscript-alert-card">
                        <div className="manuscript-alert-content">
                            <CheckCircle color="#16a34a" size={20} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                            <p style={{ color: '#166534', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                                <strong>Note:</strong> After submission, you will receive a manuscript ID for tracking.
                                Keep this ID safe for future correspondence regarding your submission.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="manuscript-section">
                    <h2 className="manuscript-section-title">
                        Contact Information
                    </h2>
                    <p style={{ ...{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: '#374151', lineHeight: '1.7', marginBottom: '1rem' }, textAlign: 'center', marginBottom: '2rem' }}>
                        For queries regarding <strong>manuscript submission</strong>, please contact us:
                    </p>

                    <div className="manuscript-contact-item">
                        <div className="manuscript-icon-circle">
                            <Mail color="white" size={24} />
                        </div>
                        <div>
                            <h3 className="manuscript-contact-title">Email Support</h3>
                            <a
                                href="mailto:editor.ijterdjournal@gmail.com"
                                className="manuscript-link"
                            >
                                editor.ijterdjournal@gmail.com
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ManuscriptForm;