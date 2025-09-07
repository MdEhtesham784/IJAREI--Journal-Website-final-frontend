import React, { useState, useEffect } from 'react';

const SignupForm = ({ 
  onSignup, 
  onGoogleSignup, 
  enableGoogleSignup = true,
  redirectOnSuccess = false,
  onRedirect
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent && !otpVerified) {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent, otpVerified]);

  // Password strength calculator
  useEffect(() => {
    const calculateStrength = (pass) => {
      let strength = 0;
      if (pass.length >= 8) strength += 25;
      if (/[a-z]/.test(pass)) strength += 25;
      if (/[A-Z]/.test(pass)) strength += 25;
      if (/[0-9]/.test(pass)) strength += 25;
      return strength;
    };
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  // Clear errors when form fields change
  useEffect(() => {
    if (errors.firstName && firstName.length >= 2) {
      setErrors(prev => ({ ...prev, firstName: '' }));
    }
  }, [firstName, errors.firstName]);

  useEffect(() => {
    if (errors.lastName && lastName.length >= 2) {
      setErrors(prev => ({ ...prev, lastName: '' }));
    }
  }, [lastName, errors.lastName]);

  useEffect(() => {
    if (errors.email && validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  }, [email, errors.email]);

  useEffect(() => {
    if (errors.password && validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [password, errors.password]);

  useEffect(() => {
    if (errors.confirmPassword && password === confirmPassword && password.length > 0) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  }, [password, confirmPassword, errors.confirmPassword]);

  useEffect(() => {
    if (errors.otp && validateOTP(otp)) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  }, [otp, errors.otp]);

  // Clear general errors when any field changes
  useEffect(() => {
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  }, [firstName, lastName, email, password, confirmPassword, otp, errors.general]);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '15px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    formCard: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '420px',
      border: '1px solid #e9ecef'
    },
    title: {
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '25px',
      textAlign: 'center',
      letterSpacing: '-0.5px'
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative'
    },
    inputRow: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px'
    },
    inputHalf: {
      flex: '1'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: 'clamp(13px, 2.5vw, 14px)',
      fontWeight: '600',
      color: '#2c3e50'
    },
    input: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 14px)',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3vw, 16px)',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff'
    },
    inputWithIcon: {
      paddingRight: '45px'
    },
    inputError: {
      borderColor: '#e74c3c'
    },
    inputSuccess: {
      borderColor: '#27ae60'
    },
    inputFocus: {
      borderColor: '#3498db',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)'
    },
    eyeButton: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#7f8c8d',
      padding: '5px'
    },
    button: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 15px)',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3vw, 16px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '15px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      position: 'relative'
    },
    buttonHover: {
      backgroundColor: '#2980b9',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
    },
    buttonDisabled: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    buttonSecondary: {
      backgroundColor: '#95a5a6',
      color: 'white'
    },
    buttonSecondaryHover: {
      backgroundColor: '#7f8c8d',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(149, 165, 166, 0.3)'
    },
    buttonLoading: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    googleButton: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 15px)',
      backgroundColor: '#ffffff',
      color: '#2c3e50',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3vw, 16px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    googleButtonHover: {
      backgroundColor: '#f8f9fa',
      borderColor: '#3498db',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    divider: {
      textAlign: 'center',
      margin: '25px 0',
      position: 'relative',
      color: '#7f8c8d',
      fontSize: 'clamp(12px, 2.5vw, 14px)'
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: '0',
      right: '0',
      height: '1px',
      backgroundColor: '#e9ecef',
      zIndex: '1'
    },
    dividerText: {
      backgroundColor: '#ffffff',
      padding: '0 15px',
      position: 'relative',
      zIndex: '2'
    },
    otpNote: {
      fontSize: 'clamp(11px, 2vw, 12px)',
      color: '#7f8c8d',
      textAlign: 'center',
      marginTop: '8px',
      lineHeight: '1.4'
    },
    timerText: {
      fontSize: 'clamp(11px, 2vw, 12px)',
      color: '#e74c3c',
      textAlign: 'center',
      marginTop: '8px',
      fontWeight: '600'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: 'clamp(12px, 3vw, 15px)',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px',
      border: '1px solid #c3e6cb',
      fontSize: 'clamp(13px, 2.5vw, 14px)',
      fontWeight: '500'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '15px',
      border: '1px solid #f5c6cb'
    },
    fieldError: {
      color: '#e74c3c',
      fontSize: '12px',
      marginTop: '5px'
    },
    fieldSuccess: {
      color: '#27ae60',
      fontSize: '12px',
      marginTop: '5px'
    },
    progressSteps: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '25px',
      gap: '10px'
    },
    step: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    stepActive: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    stepCompleted: {
      backgroundColor: '#27ae60',
      color: 'white'
    },
    stepInactive: {
      backgroundColor: '#e9ecef',
      color: '#7f8c8d'
    },
    stepLine: {
      width: '40px',
      height: '2px',
      backgroundColor: '#e9ecef',
      transition: 'all 0.3s ease'
    },
    stepLineActive: {
      backgroundColor: '#27ae60'
    },
    passwordStrengthBar: {
      width: '100%',
      height: '4px',
      backgroundColor: '#e9ecef',
      borderRadius: '2px',
      marginTop: '5px',
      overflow: 'hidden'
    },
    passwordStrengthFill: {
      height: '100%',
      transition: 'all 0.3s ease',
      borderRadius: '2px'
    },
    passwordStrengthText: {
      fontSize: '12px',
      marginTop: '5px'
    },
    passwordRequirements: {
      fontSize: '11px',
      color: '#7f8c8d',
      marginTop: '5px',
      lineHeight: '1.3'
    },
    resendButton: {
      background: 'none',
      border: 'none',
      color: '#3498db',
      cursor: 'pointer',
      fontSize: '12px',
      textDecoration: 'underline',
      marginTop: '5px'
    },
    backButton: {
      background: 'none',
      border: 'none',
      color: '#3498db',
      cursor: 'pointer',
      fontSize: '14px',
      textDecoration: 'underline',
      marginBottom: '15px',
      padding: '5px 0'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderRadius: '50%',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    },
    stepTitle: {
      fontSize: '18px',
      color: '#2c3e50',
      marginBottom: '15px',
      textAlign: 'center',
      fontWeight: '500'
    }
  };

  // Add CSS animation for spinner
  const spinnerCSS = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateOTP = (otp) => {
    return otp.length === 6 && /^\d+$/.test(otp);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#e74c3c';
    if (passwordStrength < 50) return '#f39c12';
    if (passwordStrength < 75) return '#f1c40f';
    return '#27ae60';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  // Backend API call implementation
  const backendApiCall = async (endpoint, data, method = 'POST') => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Handle both JSON and non-JSON responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return { success: true, message: 'Operation completed successfully' };
      }
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  };

  const getCurrentStep = () => {
    if (!otpSent) return 1;
    if (!otpVerified) return 2;
    return 3;
  };

  // Step navigation functions
  const goBackToStep1 = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp('');
    setTimer(0);
    setCanResendOtp(false);
    setErrors({});
  };

  const goBackToStep2 = () => {
    setOtpVerified(false);
    setPassword('');
    setConfirmPassword('');
    setPasswordStrength(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
  };

  // API call wrapper to handle custom callbacks or use backend
  const callAPI = async (endpoint, data) => {
    if (endpoint === 'signup' && onSignup) {
      return await onSignup(data);
    }
    if (endpoint === 'google-signup' && onGoogleSignup) {
      return await onGoogleSignup();
    }
    
    // Map endpoints to backend routes
    const endpointMap = {
      'send-otp': 'auth/signup/send-otp',
      'verify-otp': 'auth/signup/verify-otp', 
      'signup': 'auth/signup',
      'google-signup': 'auth/google-signup'
    };

    return await backendApiCall(endpointMap[endpoint] || endpoint, data);
  };

  const handleSendOTP = async () => {
    setErrors({});
    
    // Validation
    const newErrors = {};
    if (!validateName(firstName)) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    if (!validateName(lastName)) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      await callAPI('send-otp', { 
        email
      });
      setOtpSent(true);
      setTimer(60);
      setCanResendOtp(false);
    } catch (error) {
      setErrors({ general: error.message || 'Failed to send OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResendOtp) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      await callAPI('send-otp', { 
        email,
        firstName,
        lastName,
        resend: true 
      });
      setTimer(60);
      setCanResendOtp(false);
      setOtp(''); // Clear previous OTP
    } catch (error) {
      setErrors({ general: error.message || 'Failed to resend OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setErrors({});
    
    if (!validateOTP(otp)) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setLoading(true);
    
    try {
      await callAPI('verify-otp', { 
        email, 
        otp 
      });
      setOtpVerified(true);
      setTimer(0); // Clear timer after successful verification
    } catch (error) {
      setErrors({ general: error.message || 'Invalid OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!enableGoogleSignup) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const response = await callAPI('google-signup', {});
      console.log('Google signup successful:', response);
      setSignupSuccess(true);
    } catch (error) {
      setErrors({ general: error.message || 'Google signup failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setErrors({});
    
    // Validation
    const newErrors = {};
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await callAPI('signup', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        //otpVerified: true
      });
      console.log('Signup successful:', response);
      
      setSignupSuccess(true);
      
      if (redirectOnSuccess && onRedirect) {
        setTimeout(() => {
          onRedirect({ email, firstName, lastName });
        }, 2000);
      }
    } catch (error) {
      setErrors({ general: error.message || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSignupSuccess(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
    setTimer(0);
    setCanResendOtp(false);
    setErrors({});
    setLoading(false);
    setPasswordStrength(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Success page
  if (signupSuccess) {
    return (
      <div style={styles.container}>
        <div style={styles.formCard}>
          <h2 style={styles.title}>Welcome Aboard!</h2>
          <div style={styles.successMessage}>
            Your account has been created successfully!
          </div>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '25px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>What's next?</h3>
            <ul style={{ 
              textAlign: 'left', 
              color: '#7f8c8d', 
              fontSize: '14px',
              lineHeight: '1.6',
              paddingLeft: '20px'
            }}>
              <li>Check your email for verification</li>
              <li>Complete your profile setup</li>
              <li>Explore our features</li>
              <li>Start using your new account</li>
            </ul>
          </div>

          {onRedirect && (
            <button 
              style={{...styles.button, backgroundColor: '#27ae60'}}
              onClick={() => onRedirect({ email, firstName, lastName })}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#219a52';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#27ae60';
                e.target.style.transform = 'none';
              }}
            >
              Go to Dashboard
            </button>
          )}
          
          <button 
            style={{...styles.button, ...styles.buttonSecondary}}
            onClick={resetForm}
            onMouseOver={(e) => {
              Object.assign(e.target.style, styles.buttonSecondaryHover);
            }}
            onMouseOut={(e) => {
              Object.assign(e.target.style, {...styles.button, ...styles.buttonSecondary});
            }}
          >
            Create Another Account
          </button>
        </div>
      </div>
    );
  }

  const getInputStyles = (field, hasError, isValid) => {
    const baseStyle = {...styles.input};
    if (hasError) Object.assign(baseStyle, styles.inputError);
    else if (isValid) Object.assign(baseStyle, styles.inputSuccess);
    return baseStyle;
  };

  const getPasswordInputStyles = (hasError, isValid) => {
    const baseStyle = {...styles.input, ...styles.inputWithIcon};
    if (hasError) Object.assign(baseStyle, styles.inputError);
    else if (isValid) Object.assign(baseStyle, styles.inputSuccess);
    return baseStyle;
  };

  return (
    <div style={styles.container}>
      <style>{spinnerCSS}</style>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Join Us Today</h2>
        
        {/* Progress Steps */}
        <div style={styles.progressSteps}>
          <div style={{
            ...styles.step,
            ...(getCurrentStep() === 1 ? styles.stepActive : 
                getCurrentStep() > 1 ? styles.stepCompleted : styles.stepInactive)
          }}>
            1
          </div>
          <div style={{
            ...styles.stepLine,
            ...(getCurrentStep() > 1 ? styles.stepLineActive : {})
          }}></div>
          <div style={{
            ...styles.step,
            ...(getCurrentStep() === 2 ? styles.stepActive : 
                getCurrentStep() > 2 ? styles.stepCompleted : styles.stepInactive)
          }}>
            2
          </div>
          <div style={{
            ...styles.stepLine,
            ...(getCurrentStep() > 2 ? styles.stepLineActive : {})
          }}></div>
          <div style={{
            ...styles.step,
            ...(getCurrentStep() === 3 ? styles.stepActive : styles.stepInactive)
          }}>
            3
          </div>
        </div>

        {/* Step Titles */}
        {getCurrentStep() === 1 && <div style={styles.stepTitle}>Basic Information</div>}
        {getCurrentStep() === 2 && <div style={styles.stepTitle}>Verify Your Email</div>}
        {getCurrentStep() === 3 && <div style={styles.stepTitle}>Create Password</div>}

        {/* Error Messages */}
        {errors.general && (
          <div style={styles.errorMessage}>
            {errors.general}
          </div>
        )}

        {/* Google Signup Button - Only on Step 1 */}
        {enableGoogleSignup && getCurrentStep() === 1 && (
          <>
            <button 
              type="button"
              style={loading ? {...styles.googleButton, ...styles.buttonLoading} : styles.googleButton}
              onClick={handleGoogleSignup}
              disabled={loading}
              onMouseOver={(e) => {
                if (!loading) Object.assign(e.target.style, styles.googleButtonHover);
              }}
              onMouseOut={(e) => {
                if (!loading) Object.assign(e.target.style, styles.googleButton);
              }}
            >
              {loading ? (
                <>
                  <div style={styles.loadingSpinner}></div>
                  Signing up...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '18px' }}>G</span>
                  Sign up with Google
                </>
              )}
            </button>

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or create account with email</span>
            </div>
          </>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Step 1: Basic Info */}
          {getCurrentStep() === 1 && (
            <>
              <div style={styles.inputRow}>
                <div style={styles.inputHalf}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                      type="text"
                      style={getInputStyles('firstName', errors.firstName, firstName.length >= 2)}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => Object.assign(e.target.style, styles.input)}
                      placeholder="John"
                      required
                    />
                    {errors.firstName && <div style={styles.fieldError}>{errors.firstName}</div>}
                    {firstName.length >= 2 && !errors.firstName && <div style={styles.fieldSuccess}>Valid</div>}
                  </div>
                </div>
                <div style={styles.inputHalf}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      type="text"
                      style={getInputStyles('lastName', errors.lastName, lastName.length >= 2)}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => Object.assign(e.target.style, styles.input)}
                      placeholder="Doe"
                      required
                    />
                    {errors.lastName && <div style={styles.fieldError}>{errors.lastName}</div>}
                    {lastName.length >= 2 && !errors.lastName && <div style={styles.fieldSuccess}>Valid</div>}
                  </div>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  style={getInputStyles('email', errors.email, validateEmail(email))}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  placeholder="john.doe@example.com"
                  required
                />
                {errors.email && <div style={styles.fieldError}>{errors.email}</div>}
                {validateEmail(email) && !errors.email && <div style={styles.fieldSuccess}>Valid email</div>}
              </div>

              <button 
                type="button"
                style={
                  (validateEmail(email) && validateName(firstName) && validateName(lastName) && !loading) ? 
                  styles.button : 
                  {...styles.button, ...styles.buttonDisabled}
                }
                onClick={handleSendOTP}
                disabled={!validateEmail(email) || !validateName(firstName) || !validateName(lastName) || loading}
                onMouseOver={(e) => {
                  if (validateEmail(email) && validateName(firstName) && validateName(lastName) && !loading) {
                    Object.assign(e.target.style, styles.buttonHover);
                  }
                }}
                onMouseOut={(e) => {
                  Object.assign(e.target.style, (validateEmail(email) && validateName(firstName) && validateName(lastName) && !loading) ? styles.button : {...styles.button, ...styles.buttonDisabled});
                }}
              >
                {loading ? (
                  <>
                    <div style={styles.loadingSpinner}></div>
                    Sending OTP...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {getCurrentStep() === 2 && (
            <>
              <button 
                type="button"
                style={styles.backButton}
                onClick={goBackToStep1}
              >
                Back to edit details
              </button>

              <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#1565c0' }}>
                  We've sent a verification code to<br />
                  <strong>{email}</strong>
                </p>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Enter 6-digit verification code</label>
                <input
                  type="text"
                  style={getInputStyles('otp', errors.otp, validateOTP(otp))}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 6);
                    setOtp(value);
                  }}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  placeholder="123456"
                  maxLength="6"
                  required
                />
                {errors.otp && <div style={styles.fieldError}>{errors.otp}</div>}
                {validateOTP(otp) && !errors.otp && <div style={styles.fieldSuccess}>Valid code</div>}
              </div>

              {timer > 0 && (
                <div style={styles.timerText}>
                  Resend code in {timer} seconds
                </div>
              )}

              {canResendOtp && !loading && (
                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button"
                    style={styles.resendButton}
                    onClick={handleResendOTP}
                  >
                    Resend verification code
                  </button>
                </div>
              )}

              <button 
                type="button"
                style={
                  (validateOTP(otp) && !loading) ? 
                  styles.button : 
                  {...styles.button, ...styles.buttonDisabled}
                }
                onClick={handleVerifyOTP}
                disabled={!validateOTP(otp) || loading}
                onMouseOver={(e) => {
                  if (validateOTP(otp) && !loading) {
                    Object.assign(e.target.style, styles.buttonHover);
                  }
                }}
                onMouseOut={(e) => {
                  Object.assign(e.target.style, (validateOTP(otp) && !loading) ? styles.button : {...styles.button, ...styles.buttonDisabled});
                }}
              >
                {loading ? (
                  <>
                    <div style={styles.loadingSpinner}></div>
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
            </>
          )}

          {/* Step 3: Password Setup */}
          {getCurrentStep() === 3 && (
            <>
              <button 
                type="button"
                style={styles.backButton}
                onClick={goBackToStep2}
              >
                Back to OTP verification
              </button>

              <div style={{
                backgroundColor: '#e8f5e8',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#2e7d32' }}>
                  Email verified successfully!<br />
                  Now create a secure password
                </p>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    style={getPasswordInputStyles(errors.password, validatePassword(password))}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => Object.assign(e.target.style, styles.input)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    style={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <div style={styles.fieldError}>{errors.password}</div>}
                
                {password.length > 0 && (
                  <>
                    <div style={styles.passwordStrengthBar}>
                      <div 
                        style={{
                          ...styles.passwordStrengthFill,
                          width: `${passwordStrength}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <div style={{
                      ...styles.passwordStrengthText,
                      color: getPasswordStrengthColor()
                    }}>
                      Password strength: {getPasswordStrengthText()}
                    </div>
                    <div style={styles.passwordRequirements}>
                      Password requirements: At least 8 characters
                      {password.length >= 8 && ' ✅'}
                    </div>
                  </>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    style={getPasswordInputStyles(
                      errors.confirmPassword, 
                      password === confirmPassword && password.length > 0
                    )}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => Object.assign(e.target.style, styles.input)}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    style={styles.eyeButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && <div style={styles.fieldError}>{errors.confirmPassword}</div>}
                {password === confirmPassword && password.length > 0 && !errors.confirmPassword && (
                  <div style={styles.fieldSuccess}>Passwords match</div>
                )}
              </div>

              <button 
                type="button"
                style={
                  (validatePassword(password) && password === confirmPassword && !loading) ? 
                  {...styles.button, backgroundColor: '#27ae60'} : 
                  {...styles.button, ...styles.buttonDisabled}
                }
                onClick={handleSignup}
                disabled={!validatePassword(password) || password !== confirmPassword || loading}
                onMouseOver={(e) => {
                  if (validatePassword(password) && password === confirmPassword && !loading) {
                    e.target.style.backgroundColor = '#219a52';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (validatePassword(password) && password === confirmPassword && !loading) {
                    e.target.style.backgroundColor = '#27ae60';
                    e.target.style.transform = 'none';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={styles.loadingSpinner}></div>
                    Creating Account...
                  </>
                ) : (
                  'Create My Account'
                )}
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '15px',
                fontSize: '12px',
                color: '#7f8c8d',
                lineHeight: '1.4'
              }}>
                By creating an account, you agree to our<br />
                <a href="#" style={{ color: '#3498db' }}>Terms of Service</a> and{' '}
                <a href="#" style={{ color: '#3498db' }}>Privacy Policy</a>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;