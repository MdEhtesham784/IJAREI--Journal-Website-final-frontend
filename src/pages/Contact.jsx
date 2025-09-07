import React, { useState } from 'react';
import '../styles/Contact.css'; // Changed from styles import to direct CSS import

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Enquiry message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (minimum 10 characters)';
    }

    // Optional phone validation (only if provided)
    if (formData.contactNumber.trim() && !validatePhoneNumber(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with proper backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({}); // Clear any previous errors

    try {
      // Prepare form data for submission
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        contactNumber: formData.contactNumber.trim(),
        message: formData.message.trim()
      };

      // Check if admin token exists for authentication
      const authToken = localStorage.getItem("authToken"); 
    const headers = {
      "Content-Type": "application/json"
    };

    // Add authorization header if auth token exists
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

      // Make API call to Spring Boot backend using REST convention
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(submitData)
      });

      // Handle different response types
      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // If response is not JSON, get text
        const responseText = await response.text();
        responseData = { message: responseText };
      }

      if (response.ok) {
        console.log('Form submitted successfully:', responseData);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          message: ''
        });

        setSubmitSuccess(true);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        // Handle different error status codes
        if (response.status === 400) {
          // Validation errors from backend
          if (responseData.errors && Array.isArray(responseData.errors)) {
            const backendErrors = {};
            responseData.errors.forEach(error => {
              if (error.field) {
                backendErrors[error.field] = error.message;
              }
            });
            setErrors(backendErrors);
          } else {
            setErrors({ 
              submit: responseData.message || 'Invalid data submitted. Please check your inputs.' 
            });
          }
        } else if (response.status === 401) {
          setErrors({ 
            submit: 'Authentication failed. Please log in and try again.' 
          });
        } else if (response.status === 403) {
          setErrors({ 
            submit: 'You do not have permission to submit this enquiry.' 
          });
        } else if (response.status === 500) {
          setErrors({ 
            submit: 'Server error occurred. Please try again later.' 
          });
        } else {
          setErrors({ 
            submit: responseData.message || 'There was an error submitting your message. Please try again.' 
          });
        }
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrors({ 
          submit: 'Unable to connect to server. Please check your internet connection and try again.' 
        });
      } else if (error.name === 'AbortError') {
        setErrors({ 
          submit: 'Request timed out. Please try again.' 
        });
      } else {
        setErrors({ 
          submit: 'There was an unexpected error. Please try again later.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contactUs-container">
      {/* Success Message */}
      {submitSuccess && (
        <div className="contactUs-successMessage">
          ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}

      {/* Professional Header Section */}
      <header className="contactUs-header">
        <div className="contactUs-headerContent">
          <h1 className="contactUs-headerTitle">Contact Us</h1>
          <p className="contactUs-headerSubtitle">
            We're here to assist you. Please fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="contactUs-mainContent">
        <div className="contactUs-contentWrapper">
          {/* Contact Form Card */}
          <div className="contactUs-formCard">
            <form className="contactUs-form" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="contactUs-fieldGroup">
                <label htmlFor="name" className="contactUs-label">
                  <span></span> Name <span className="contactUs-required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contactUs-input ${errors.name ? 'contactUs-inputError' : ''}`}
                  placeholder="Enter your full name"
                  maxLength={100}
                  autoComplete="name"
                  disabled={isSubmitting}
                />
                {errors.name && <span className="contactUs-errorText">⚠️ {errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="contactUs-fieldGroup">
                <label htmlFor="email" className="contactUs-label">
                  <span></span> Email Address <span className="contactUs-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contactUs-input ${errors.email ? 'contactUs-inputError' : ''}`}
                  placeholder="Enter your email address"
                  maxLength={255}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {errors.email && <span className="contactUs-errorText">⚠️ {errors.email}</span>}
              </div>

              {/* Contact Number Field */}
              <div className="contactUs-fieldGroup">
                <label htmlFor="contactNumber" className="contactUs-label">
                  <span></span> Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`contactUs-input ${errors.contactNumber ? 'contactUs-inputError' : ''}`}
                  placeholder="Enter your phone number (optional)"
                  maxLength={20}
                  autoComplete="tel"
                  disabled={isSubmitting}
                />
                {errors.contactNumber && <span className="contactUs-errorText">⚠️ {errors.contactNumber}</span>}
              </div>

              {/* Enquiry Field */}
              <div className="contactUs-fieldGroup">
                <label htmlFor="enquiry" className="contactUs-label">
                  <span></span> Enquiry <span className="contactUs-required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`contactUs-textarea ${errors.message ? 'contactUs-inputError' : ''}`}
                  placeholder="Please describe your enquiry or message in detail..."
                  maxLength={1000}
                  disabled={isSubmitting}
                />
                <div className="contactUs-characterCounter">
                  {formData.message.length}/1000 characters
                </div>
                {errors.message && <span className="contactUs-errorText">⚠️ {errors.message}</span>}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="contactUs-errorMessage">
                  ❌ {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`contactUs-submitButton ${isSubmitting ? 'contactUs-submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>📧</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;