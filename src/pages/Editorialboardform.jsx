import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, GraduationCap, Building, FileText, Upload, CheckCircle, Users, Award, Globe } from 'lucide-react';
import { href } from 'react-router-dom';

const EditorialBoardForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        degree: '',
        department: '',
        post: '',
        file: null,
        imgf: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [cvFileUrl, setcvFileUrl] = useState('');
    const [professionalPhotoUrl, setprofessionalPhotoUrl] = useState('');
  
    // const getAuthHeaders = () => ({
    //     'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
    //     'Content-Type': 'application/json'
    // });
    

    // Upload function to send files to respective endpoints
  const uploadFile = async (file, endpoint) => {
  const data = new FormData();
  data.append('file', file);
  const res = await fetch(endpoint, { method: 'POST', body: data });
  if (!res.ok) throw new Error('Upload failed');
  const json = await res.json();
  return json.fileUrl;
};


  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];

    setFormData(prev => ({ ...prev, [name]: file }));

    try {
      if (name === 'file') {
        const url = await uploadFile(file, '/api/editor/upload-cv');
        setcvFileUrl(url);
        setSubmitError('');
      }
      if (name === 'imgf') {
        const url = await uploadFile(file, '/api/editor/upload-photo');
        setprofessionalPhotoUrl(url);
        setSubmitError('');
      }
    } catch (err) {
      setSubmitError('File upload failed, please try again.');
      if (name === 'file') setcvFileUrl('');
      if (name === 'imgf') setprofessionalPhotoUrl('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


    const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitMessage('');
    setSubmitError('');
    setIsSubmitting(true);

    if (!cvFileUrl || !professionalPhotoUrl) {
        setSubmitError('Please upload both CV and photo before submitting.');
        setIsSubmitting(false);
        return;
    }

    // Validate required fields
    const requiredTextFields = ['name', 'email', 'contactNumber', 'degree', 'department', 'post'];
    const missingTextFields = requiredTextFields.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missingTextFields.length > 0) {
        setSubmitError(`Please fill in all required text fields: ${missingTextFields.join(', ')}`);
        setIsSubmitting(false);
        return;
    }

    if (!formData.file) {
        setSubmitError('Please upload your CV/Resume (PDF file)');
        setIsSubmitting(false);
        return;
    }

    if (!formData.imgf) {
        setSubmitError('Please upload your professional photo (JPG/PNG file)');
        setIsSubmitting(false);
        return;
    }

    const applicationData = {
    fullName: formData.name.trim(),
    email: formData.email.trim(),
    contactNumber: formData.contactNumber.trim(),
    highestQualification: formData.degree.trim(),
    departmentAndInstitution: formData.department.trim(),
    currentPositionAndExperience: formData.post.trim(),
    cvFileUrl,
    professionalPhotoUrl: professionalPhotoUrl,
    submittedDate: new Date().toISOString().slice(0, 10),
    status: 'Pending',
  };

    try {
        // Check for user token
        //const userToken = localStorage.getItem("userToken");
        // const headers = getAuthHeaders();
        // //if (userToken) headers['Authorization'] = `Bearer ${userToken}`;

        // console.log('Sending token:', headers);


        const token = localStorage.getItem("authToken"); // or your key
        const response = await fetch("http://localhost:8080/api/editor/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ correct
        },
        body: JSON.stringify(applicationData)
        });


        if (response.ok) {
            let result = {};
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                const responseText = await response.text();
                result = { message: responseText };
            }

            console.log('Application submitted successfully:', result);
            setSubmitMessage("Application submitted successfully! We will review your application and contact you within 2-3 weeks.");
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                contactNumber: '',
                degree: '',
                department: '',
                post: '',
                file: null,
                imgf: null
            });
            
            // Reset file inputs
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.value = '';
            });
            
        } else {
            let errorMessage = 'Failed to submit application. Please try again.';
            
            try {
                const contentType = response.headers.get('content-type');
                let errorData = {};
                
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    const responseText = await response.text();
                    errorData = { message: responseText };
                }

                // Handle specific status codes
                switch (response.status) {
                    case 400:
                        if (errorData.errors && Array.isArray(errorData.errors)) {
                            errorMessage = errorData.errors.map(err => err.message || err).join(', ');
                        } else {
                            errorMessage = errorData.message || 'Invalid data submitted. Please check your inputs.';
                        }
                        break;
                    case 401:
                        errorMessage = 'Authentication failed. Please log in and try again.';
                        // Optionally redirect to login page
                        break;
                    case 403:
                        errorMessage = 'You do not have permission to submit this application.';
                        break;
                    case 413:
                        errorMessage = 'File size too large. Please upload smaller files (CV < 10MB, Photo < 5MB).';
                        break;
                    case 415:
                        errorMessage = 'Unsupported file format. Please upload PDF for CV and JPG/PNG for photo.';
                        break;
                    case 500:
                        errorMessage = 'Server error occurred. Please try again later.';
                        break;
                    default:
                        errorMessage = errorData.message || errorData.error || 'There was an error submitting your application. Please try again.';
                }
            } catch (parseError) {
                console.error('Error parsing response:', parseError);
                errorMessage = `Request failed with status ${response.status}. Please try again.`;
            }
            
            setSubmitError(errorMessage);
        }
        
    } catch (error) {
        console.error('Submission error:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            setSubmitError("Unable to connect to server. Please check your internet connection and try again.");
        } else if (error.name === 'AbortError') {
            setSubmitError("Request timed out. Please try again.");
        } else if (error.message.includes('Failed to fetch')) {
            setSubmitError("Network error occurred. Please check your internet connection and try again.");
        } else {
            setSubmitError("There was an unexpected error. Please try again later.");
        }
    } finally {
        setIsSubmitting(false);
    }
};

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6'
        },
        header: {
            backgroundColor: '#166534',
            color: 'white',
            padding: '4rem 1rem 3rem',
            textAlign: 'center'
        },
        headerContent: {
            maxWidth: '64rem',
            margin: '0 auto'
        },
        headerTitle: {
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            lineHeight: '1.1'
        },
        headerSubtitle: {
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: '#dcfce7',
            lineHeight: '1.5'
        },
        main: {
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '2rem 1rem'
        },
        section: {
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            marginBottom: '2rem'
        },
        sectionTitle: {
            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1.5rem',
            textAlign: 'center'
        },
        text: {
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '1rem'
        },
        formSection: {
            backgroundColor: '#f0fdf4',
            border: '2px solid #bbf7d0',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem'
        },
        formTitle: {
            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '2rem',
            textAlign: 'center'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
            marginBottom: '1.5rem'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        },
        label: {
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            fontWeight: '600',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        input: {
            padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 2.5vw, 1rem)',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            backgroundColor: 'white',
            outline: 'none',
            transition: 'all 0.2s ease',
            width: '100%',
            boxSizing: 'border-box'
        },
        inputFocus: {
            borderColor: '#16a34a',
            boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.1)'
        },
        textarea: {
            padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 2.5vw, 1rem)',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            backgroundColor: 'white',
            outline: 'none',
            resize: 'vertical',
            minHeight: 'clamp(100px, 15vw, 140px)',
            fontFamily: 'inherit',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease'
        },
        fileInput: {
            padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 2.5vw, 1rem)',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            backgroundColor: 'white',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease'
        },
        fileStatus: {
            color: '#6b7280',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            fontStyle: 'italic',
            marginTop: '0.25rem'
        },
        submitButton: {
            backgroundColor: isSubmitting ? '#9ca3af' : '#166534',
            color: 'white',
            padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            width: '100%',
            maxWidth: '400px',
            margin: '2rem auto 0',
            display: 'block',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(0)'
        },
        submitButtonHover: {
            backgroundColor: '#14532d',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)'
        },
        messageBox: {
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
        },
        successMessage: {
            backgroundColor: '#f0fdf4',
            color: '#15803d',
            border: '1px solid #bbf7d0'
        },
        errorMessage: {
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca'
        },
        requirementItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            backgroundColor: '#f0fdf4',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
        },
        requirementTitle: {
            fontWeight: '600',
            color: '#1f2937',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            marginBottom: '0.25rem'
        },
        requirementDesc: {
            color: '#6b7280',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            lineHeight: '1.5'
        },
        highlightBox: {
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.5rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: '1.5rem'
        },
        bulletPoint: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '1rem'
        },
        bullet: {
            width: '0.5rem',
            height: '0.5rem',
            backgroundColor: '#15803d',
            borderRadius: '50%',
            marginTop: '0.5rem',
            flexShrink: 0
        },
        alertCard: {
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.5rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)'
        },
        alertContent: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
        },
        benefitsGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(1rem, 3vw, 1.5rem)'
        },
        benefitCard: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            backgroundColor: '#f0fdf4',
            borderRadius: '0.5rem',
            border: '1px solid #bbf7d0'
        },
        benefitTitle: {
            fontWeight: '600',
            color: '#1f2937',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            marginBottom: '0.5rem'
        },
        benefitDesc: {
            color: '#6b7280',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            lineHeight: '1.5'
        },
        contactItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb'
        },
        iconCircle: {
            width: 'clamp(2.5rem, 6vw, 3rem)',
            height: 'clamp(2.5rem, 6vw, 3rem)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#15803d',
            flexShrink: 0
        },
        contactTitle: {
            fontWeight: '600',
            color: '#1f2937',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            marginBottom: '0.25rem'
        },
        link: {
            color: '#15803d',
            textDecoration: 'none',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            wordBreak: 'break-all',
            transition: 'color 0.2s ease'
        },
        linkHover: {
            color: '#14532d'
        }
    };

    useEffect(() => {
        const updateStyles = () => {
            const width = window.innerWidth;

            // Update form grid for larger screens
            const formGrids = document.querySelectorAll('.form-grid');
            formGrids.forEach(grid => {
                if (width >= 1024) {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    grid.style.gridTemplateColumns = '1fr';
                }
            });

            // Update benefits grid
            const benefitsGrids = document.querySelectorAll('.benefits-grid');
            benefitsGrids.forEach(grid => {
                if (width >= 768) {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    grid.style.gridTemplateColumns = '1fr';
                }
            });

            // Update contact item flex direction
            const contactItems = document.querySelectorAll('.contact-item');
            contactItems.forEach(item => {
                if (width >= 640) {
                    item.style.flexDirection = 'row';
                    item.style.alignItems = 'center';
                } else {
                    item.style.flexDirection = 'column';
                    item.style.alignItems = 'flex-start';
                }
            });

            // Update section padding
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                if (width >= 1024) {
                    section.style.padding = '2rem';
                } else if (width >= 640) {
                    section.style.padding = '1.5rem';
                } else {
                    section.style.padding = '1rem';
                }
            });

            // Update header padding
            const headers = document.querySelectorAll('.header');
            headers.forEach(header => {
                if (width >= 1024) {
                    header.style.padding = '8rem 2rem 6rem';
                } else if (width >= 640) {
                    header.style.padding = '5rem 1.5rem 4rem';
                } else {
                    header.style.padding = '4rem 1rem 3rem';
                }
            });
        };

        updateStyles();
        window.addEventListener('resize', updateStyles);

        return () => window.removeEventListener('resize', updateStyles);
    }, []);

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header} className="header">
                <div style={styles.headerContent}>
                    <h1 style={styles.headerTitle}>
                        Join Our Editorial Board
                    </h1>
                    <p style={styles.headerSubtitle}>
                        International Journal of Agricultural Research and Emerging Innovations (IJAREI)
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                {/* Application Form */}
                <section style={{ ...styles.formSection, ...styles.section }} className="section">
                    <h2 style={styles.formTitle}>
                        Editorial Board Application Form
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Name and Email Row */}
                        <div style={styles.formGrid} className="form-grid">
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <User size={18} color="#15803d" />
                                    Full Name *
                                </label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="name"
                                    placeholder="Dr. John Smith"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Mail size={18} color="#15803d" />
                                    Email Address *
                                </label>
                                <input
                                    style={styles.input}
                                    type="email"
                                    name="email"
                                    placeholder="your.email@university.edu"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact and Degree Row */}
                        <div style={styles.formGrid} className="form-grid">
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Phone size={18} color="#15803d" />
                                    Contact Number *
                                </label>
                                <input
                                    style={styles.input}
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <GraduationCap size={18} color="#15803d" />
                                    Highest Degree *
                                </label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="degree"
                                    placeholder="Ph.D. in Agricultural Sciences"
                                    value={formData.degree}
                                    onChange={handleInputChange}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Department - Full Width */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Building size={18} color="#15803d" />
                                Department & Institution *
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="department"
                                placeholder="Department of Agricultural Sciences, University of Agriculture"
                                value={formData.department}
                                onChange={handleInputChange}
                                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                required
                            />
                        </div>

                        {/* Experience - Full Width */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <FileText size={18} color="#15803d" />
                                Current Position & Experience *
                            </label>
                            <textarea
                                style={styles.textarea}
                                name="post"
                                placeholder="Please describe your current position, years of experience, research interests, and notable achievements in the field of agriculture..."
                                value={formData.post}
                                onChange={handleInputChange}
                                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                required
                            />
                        </div>

                        {/* File Upload Row */}
                        <div style={styles.formGrid} className="form-grid">
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Upload size={18} color="#15803d" />
                                    Upload CV/Resume * (PDF only)
                                </label>
                                <input
                                    style={styles.fileInput}
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                    required
                                />
                                <span style={styles.fileStatus}>
                                    {formData.file ? `✓ ${formData.file.name}` : 'No file selected'}
                                </span>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Upload size={18} color="#15803d" />
                                    Professional Photo * (JPG/PNG)
                                </label>
                                <input
                                    style={styles.fileInput}
                                    type="file"
                                    name="imgf"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png"
                                    required
                                />
                                <span style={styles.fileStatus}>
                                    {formData.imgf ? `✓ ${formData.imgf.name}` : 'No file selected'}
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={styles.submitButton}
                            disabled={isSubmitting}
                            onMouseEnter={(e) => !isSubmitting && Object.assign(e.target.style, styles.submitButtonHover)}
                            onMouseLeave={(e) => !isSubmitting && Object.assign(e.target.style, { ...styles.submitButton, backgroundColor: isSubmitting ? '#9ca3af' : '#166534' })}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>

                        {/* Success/Error Messages */}
                        {submitMessage && (
                            <div style={{ ...styles.messageBox, ...styles.successMessage }}>
                                {submitMessage}
                            </div>
                        )}

                        {submitError && (
                            <div style={{ ...styles.messageBox, ...styles.errorMessage }}>
                                {submitError}
                            </div>
                        )}
                    </form>
                </section>

                {/* Introduction Section */}
                <section style={styles.section} className="section">
                    <h2 style={styles.sectionTitle}>
                        Editorial Board Application
                    </h2>
                    <p style={styles.text}>
                        The <strong>International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>
                        invites applications from qualified and passionate researchers, academicians,
                        and industry experts to join our <strong>Editorial Board</strong>. As a member, you will play a key role in shaping the journal's
                        direction, maintaining academic excellence, and promoting innovative research in the field of agriculture and allied sciences.
                    </p>
                </section>

                {/* Requirements Section */}
                <section style={styles.section} className="section">
                    <h2 style={styles.sectionTitle}>
                        Requirements & Qualifications
                    </h2>
                    <p style={styles.text}>
                        <strong>We welcome applications from candidates who meet the following criteria:</strong>
                    </p>

                    <div>
                        {[
                            {
                                title: 'Academic & Professional Expertise',
                                desc: 'A Ph.D., Master\'s degree, or significant professional experience in agriculture, environmental sciences, or related fields.'
                            },
                            {
                                title: 'Research Contributions',
                                desc: 'A proven track record of publications in reputable peer-reviewed journals.'
                            },
                            {
                                title: 'Commitment to Peer Review',
                                desc: 'Ability to provide constructive, unbiased, and timely feedback to authors.'
                            },
                            {
                                title: 'Networking & Outreach',
                                desc: 'Willingness to promote the journal and encourage quality submissions from your professional network.'
                            }
                        ].map((item, index) => (
                            <div key={index} style={styles.requirementItem}>
                                <CheckCircle color="#15803d" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <div>
                                    <div style={styles.requirementTitle}>{item.title}</div>
                                    <p style={styles.requirementDesc}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Application Process Section */}
                <section style={styles.section} className="section">
                    <h2 style={styles.sectionTitle}>
                        Application Process
                    </h2>

                    <div style={styles.highlightBox}>
                        <p style={styles.text}>
                            <strong>Step-by-Step Guide:</strong>
                        </p>
                        <div>
                            {[
                                'Complete the application form above with accurate personal and professional details',
                                'Upload your CV/Resume in PDF format including publication history and achievements',
                                'Upload a professional photograph (JPG or PNG) for inclusion on our website',
                                'Submit the completed form and wait for our review process (2–3 weeks)'
                            ].map((step, index) => (
                                <div key={index} style={styles.bulletPoint}>
                                    <div style={styles.bullet}></div>
                                    <p style={{ color: '#374151', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.alertCard}>
                        <div style={styles.alertContent}>
                            <CheckCircle color="#16a34a" size={20} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                            <p style={{ color: '#166534', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                                <strong>Important:</strong> Applications will be reviewed by our editorial management team.
                                Selected candidates will receive an official appointment certificate and recognition.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section style={styles.section} className="section">
                    <h2 style={styles.sectionTitle}>
                        Benefits of Joining Our Editorial Board
                    </h2>

                    <div style={styles.benefitsGrid} className="benefits-grid">
                        {[
                            {
                                icon: <Award color="#15803d" size={24} />,
                                title: 'Academic Recognition',
                                desc: 'Enhance your professional profile and credibility within the research community'
                            },
                            {
                                icon: <Users color="#15803d" size={24} />,
                                title: 'Networking Opportunities',
                                desc: 'Collaborate with leading experts and researchers worldwide'
                            },
                            {
                                icon: <Globe color="#15803d" size={24} />,
                                title: 'Influence Research Trends',
                                desc: 'Contribute to the selection and review of cutting-edge research in agriculture'
                            },
                            {
                                icon: <FileText color="#15803d" size={24} />,
                                title: 'Certificate of Appointment',
                                desc: 'Official recognition of your role as an editorial board member'
                            }
                        ].map((benefit, index) => (
                            <div key={index} style={styles.benefitCard}>
                                <div style={{ flexShrink: 0 }}>
                                    {benefit.icon}
                                </div>
                                <div>
                                    <div style={styles.benefitTitle}>
                                        {benefit.title}
                                    </div>
                                    <p style={styles.benefitDesc}>{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section style={styles.section} className="section">
                    <h2 style={styles.sectionTitle}>
                        Contact Information
                    </h2>
                    <p style={{ ...styles.text, textAlign: 'center', marginBottom: '2rem' }}>
                        For questions regarding the <strong>Editorial Board Application</strong>, please contact us:
                    </p>

                    <div style={styles.contactItem} className="contact-item">
                        <div style={styles.iconCircle}>
                            <Mail color="white" size={24} />
                        </div>
                        <div>
                            <h3 style={styles.contactTitle}>Email Correspondence</h3>
                            <a
                                href="mailto:editor.ijterdjournal@gmail.com"
                                style={styles.link}
                                onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
                                onMouseLeave={(e) => e.target.style.color = styles.link.color}
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

export default EditorialBoardForm;