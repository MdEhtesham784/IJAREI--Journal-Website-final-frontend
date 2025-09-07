import React, { useState, useEffect } from 'react';
import '../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token validity with backend if needed
      setIsAuthenticated(true);
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateOTP = (otp) => {
    return otp.length === 6 && /^\d+$/.test(otp);
  };

  const handleLogin = async () => {
    setErrors({});
    
    // Validation
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email, 
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        const userInfo = { email, token: data.token };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        

        setIsAuthenticated(true);
        setUserInfo(userInfo);
        console.log('Login successful:', data);
        navigate('/');
      } else {
        setErrors({ general: data.error || 'Login failed' });
      }
      // navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   setLoading(true);
  //   setErrors({});
    
  //   try {
  //     // Redirect to Spring Boot Google OAuth endpoint
  //     window.location.href = 'http://localhost:8080/oauth2/authorization/google';  // Correct - Spring Boot backend
  //   } catch (error) {
  //     console.error('Google login error:', error);
  //     setErrors({ general: 'Google login failed. Please try again.' });
  //     setLoading(false);
  //   }
  // };

  const handleSendOTP = async () => {
    setErrors({});
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      const data = await response.json();

      setOtpSent(true);
      setTimer(60);
      setCanResendOtp(false);

    } catch (error) {
      console.error('Send OTP error:', error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResendOtp) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      const data = await response.json();
      console.log('OTP resent:', data);

      // Reset timer and disable resending immediately again
      setTimer(60);
      setCanResendOtp(false);

    } catch (error) {
      console.error('Resend OTP error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setErrors({});
    
    // Validation
    const newErrors = {};
    if (!validateOTP(otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }
    if (!validatePassword(newPassword)) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          otp, 
          newPassword 
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setShowForgotPassword(false);
        setOtpSent(false);
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setTimer(0);
        
        setErrors({ success: 'Password reset successfully! You can now login with your new password.' });
      } else {
        setErrors({ general: data.error || 'Password reset failed' });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate('/login');
  };

  // Render authenticated state (Dashboard)
  if (isAuthenticated) {
    return (
      <div className="container">
        <div className="form-card">
          <h2 className="title">Dashboard 📊</h2>
          <div className="dashboard-welcome">
            <h3>Welcome to your Dashboard!</h3>
            <p>
              You are successfully logged in as: <strong>{userInfo?.email}</strong>
            </p>
            {userInfo?.name && (
              <p>
                Name: <strong>{userInfo.name}</strong>
              </p>
            )}
          </div>
          
          <div className="dashboard-stats">
            <div className="stats-card">
              <h4>Quick Stats</h4>
              <p>
                Last login: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="container">
      <div className="form-card">
        <h2 className="title">
          {showForgotPassword ? '🔐 Reset Password' : '👋 Welcome Back'}
        </h2>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        {errors.success && (
          <div className="success-message">
            {errors.success}
          </div>
        )}

        {!showForgotPassword ? (
          <div>
            {/* <button 
              type="button"
              className={`google-button ${loading ? 'button-loading' : ''}`}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <span className="google-icon">🔍</span>
                  Continue with Google
                </>
              )}
            </button> */}

            {/* <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or login with email</span>
            </div> */}

            <div className="input-group">
              <label className="label">Email Address</label>
              <input
                type="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="input-group">
              <label className="label">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input ${errors.password ? 'input-error' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <button 
              type="button" 
              className={`button ${!(email && password && !loading) ? 'button-disabled' : ''}`}
              onClick={handleLogin}
              disabled={!email || !password || loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <a 
              className="forgot-link"
              onClick={() => {
                setShowForgotPassword(true);
                setErrors({});
              }}
            >
              Forgot your password?
            </a>
          </div>
        ) : (
          <div>
            <div className="input-group">
              <label className="label">Email Address</label>
              <input
                type="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={otpSent}
                required
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
          

            {!otpSent ? (
              <button 
                type="button"
                className={`button ${!(email && !loading) ? 'button-disabled' : ''}`}
                onClick={handleSendOTP}
                disabled={!email || loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  'Send OTP Code'
                )}
              </button>
            ) : (
              <>
                <div className="input-group">
                  <label className="label">OTP Code</label>
                  <input
                    type="text"
                    className={`input ${errors.otp ? 'input-error' : ''}`}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    required
                  />
                  {errors.otp && <div className="field-error">{errors.otp}</div>}
                  
                  <div className="otp-note">
                    📧 OTP sent to your email address
                  </div>
                  
                  {timer > 0 ? (
                    <div className="timer-text">
                      Resend available in {timer} seconds
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="resend-button"
                      onClick={handleResendOTP}
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Resend OTP'}
                    </button>
                  )}
                </div>
                

                <div className="input-group">
                  <label className="label">New Password</label>
                  <div className="password-container">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className={`input ${errors.newPassword ? 'input-error' : ''}`}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 6 chars)"
                      required
                    />
                    <button
                      type="button"
                      className="eye-button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                  {errors.newPassword && <div className="field-error">{errors.newPassword}</div>}
                </div>

                <div className="input-group">
                  <label className="label">Confirm New Password</label>
                  <div className="password-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      className="eye-button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
                </div>

                <button 
                  type="button" 
                  className={`button ${!(otp && newPassword && confirmPassword && !loading) ? 'button-disabled' : ''}`}
                  onClick={handleResetPassword}
                  disabled={!otp || !newPassword || !confirmPassword || loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </>
            )}

            <a 
              className="forgot-link"
              onClick={() => {
                setShowForgotPassword(false);
                setOtpSent(false);
                setOtp('');
                setNewPassword('');
                setConfirmPassword('');
                setTimer(0);
                setCanResendOtp(false);
                setErrors({});
              }}
            >
              ← Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;