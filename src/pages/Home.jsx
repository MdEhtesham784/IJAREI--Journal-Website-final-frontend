import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Users, Globe, Leaf, Award, ArrowRight, Download, Eye, FileText, CheckCircle, Calendar, Mail, Phone, ChevronRight, Star, TrendingUp, Shield, Play, ExternalLink, Search, Quote, BarChart3, Microscope, Wheat, Droplets, Sun, Zap, AlertCircle, Loader2, Clock, Heart, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file

// Helper function to render icons dynamically
const renderIcon = (iconName, size = 24) => {
  const iconMap = {
    Clock: <Clock size={size} />,
    Heart: <Heart size={size} />,
    Globe: <Globe size={size} />,
    Award: <Award size={size} />,
    Wheat: <Wheat size={size} />,
    Droplets: <Droplets size={size} />,
    Microscope: <Microscope size={size} />,
    Leaf: <Leaf size={size} />,
    Sun: <Sun size={size} />,
    Zap: <Zap size={size} />
  };
  return iconMap[iconName] || <Globe size={size} />;
};

// Image Components with Fallback
const OptimizedImage = ({ src, alt, className, style, fallback, onError }) => {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setImgError(true);
    onError?.();
  };

  if (imgError && fallback) {
    return fallback;
  }

  return (
    <div style={{ position: 'relative', ...style }}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
      {!loaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0fdf4'
        }}>
          <Loader2 size={24} className="animate-spin" color="#166534" />
        </div>
      )}
    </div>
  );
};

// Video Component with Fallback
const HeroVideo = ({ onError }) => {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
    onError?.();
  };

  if (videoError) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white', opacity: 0.8 }}>
          <Leaf size={64} />
          <p style={{ marginTop: '16px', fontSize: '1.1rem' }}>Agricultural Innovation</p>
        </div>
      </div>
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onError={handleVideoError}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(0.5px)',
        zIndex: 1
      }}
    >
      <source src="/videos/hero-background.mp4" type="video/mp4" />
    </video>
  );
};

// Error Boundary Component
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return fallback || (
      <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444' }}>
        <AlertCircle size={48} />
        <p style={{ marginTop: '16px' }}>Something went wrong. Please refresh the page.</p>
      </div>
    );
  }

  return children;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Static data
  const valueShowcase = [
    {
      icon: 'Clock',
      title: 'Fastest Publication',
      description: 'Quickest Journal Publication for Quality Research',
      color: '#3b82f6'
    },
    {
      icon: 'Heart',
      title: 'Trusted by Researchers',
      description: 'A Global Platform Trusted by Researchers Worldwide',
      color: '#ef4444'
    },
    {
      icon: 'Globe',
      title: 'Global Impact',
      description: 'Indexed in major databases with worldwide accessibility and citation tracking',
      color: '#10b981'
    },
    {
      icon: 'Award',
      title: 'Excellence Recognized',
      description: 'Rigorous peer-review process ensuring highest quality academic standards',
      color: '#f59e0b'
    }
  ];

  const currentIssue = {
    title: "International Journal of Agricultural Research and Emerging Innovations (IJAREI)",
    description: "The International Journal of Agricultural Research and Emerging Innovations (IJAREI) is a peer-reviewed open-access journal that publishes high-quality research across agricultural sciences and allied fields. IJAREI provides a platform for original research papers, review articles, and case studies covering sustainable farming practices, crop improvement, soil and water management, food security, and climate-smart agriculture. With a fast and transparent review process, the journal connects researchers, academicians, and professionals globally, ensuring wide visibility and impactful contribution to agricultural advancements.",
    coverImage: "/Images/International Journal of Agricultural Research and Emerging Innovations (IJAREI) Cover page.png",
    downloadUrl: "/current-issue/download"
  };

  const researchAreas = [
    { icon: "Wheat", title: "Crop Science" },
    { icon: "Droplets", title: "Water Management" },
    { icon: "Microscope", title: "Biotechnology" },
    { icon: "Leaf", title: "Sustainable Agriculture" },
    { icon: "Sun", title: "Climate Adaptation" },
    { icon: "Zap", title: "Smart Farming" }
  ];

  const testimonials = [
    {
      id: 1,
      text: "IJAREI has been instrumental in disseminating our research on climate-resilient crops to a global audience.",
      author: "Dr. Rajesh Kumar",
      position: "Agricultural Scientist, ICAR",
      rating: 5,
      avatar: "/images/avatars/dr-rajesh.jpg"
    },
    {
      id: 2,
      text: "The peer-review process is thorough and the editorial team is incredibly supportive throughout the publication journey.",
      author: "Prof. Sarah Johnson",
      position: "University of California, Davis",
      rating: 5,
      avatar: "/images/avatars/prof-sarah.jpg"
    },
    {
      id: 3,
      text: "As a young researcher, IJAREI provided the perfect platform to showcase my work on precision agriculture.",
      author: "Dr. Priya Sharma",
      position: "IIT Delhi",
      rating: 5,
      avatar: "/images/avatars/dr-priya.jpg"
    }
  ];

  // Navigation Handler
  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // External Link Handler
  const handleExternalLink = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  return (
    <ErrorBoundary>
      <div className={`homepage-container ${isLoading ? 'loading' : ''}`}>
        {/* Loading Animation */}
        {isLoading && (
          <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
            <div className="loader-content">
              <div className="spinner"></div>
              <h2 className="loader-title">IJAREI</h2>
              <p className="loader-subtitle">Loading...</p>
            </div>
          </div>
        )}

        {/* Hero Banner Section - With Video */}
        <section className="hero-banner">
          <HeroVideo onError={() => console.log('Video failed to load')} />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              International Journal of Agricultural Research and Emerging Innovations
            </h1>
            <p className="hero-subtitle">
              IJAREI • Open Access • Peer-Reviewed • Global Impact
            </p>
            <p className="hero-description">
              Advancing agricultural science through rigorous research, innovative practices, and global collaboration.
            </p>
            <button
              onClick={() => handleNavigation('/archive')}
              className="hero-button"
            >
              <Eye size={18} />
              View Latest Issue
            </button>
          </div>
        </section>

        {/* Value Showcase Section - Static Content */}
        <section className="showcase-section">
          <div className="showcase-container">
            <div className="showcase-grid">
              {valueShowcase.map((item, index) => (
                <div
                  key={index}
                  className="showcase-card"
                  style={{ '--card-color': item.color }}
                >
                  <div className="showcase-icon" style={{ color: item.color }}>
                    {renderIcon(item.icon, 32)}
                  </div>
                  <h3 className="showcase-title">{item.title}</h3>
                  <p className="showcase-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journal Overview Section */}
        <section id="current-issue" className="current-issue-section">
          <h2 className="section-title">Journal Overview – IJAREI</h2>
          <div className="issue-container">
            <div className="issue-card">
              <div className="issue-cover">
                <OptimizedImage
                  src={currentIssue.coverImage}
                  alt="Current Issue Cover"
                  fallback={
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#15803d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      color: 'white'
                    }}>
                      <BookOpen size={48} />
                      <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>Issue Cover</p>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="issue-content">
              <h3 className="issue-title">{currentIssue.title}</h3>
              <p className="issue-description">
                Welcome to the International Journal of Agricultural Research and Emerging Innovations (IJAREI). We are dedicated to publishing high-quality research that advances agricultural science and promotes sustainable farming practices worldwide. Our journal serves as a premier platform for researchers, academics, and practitioners to share their innovative work in agriculture, food security, and rural development.
              </p>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleNavigation('/archive')}
                  className="read-button"
                >
                  <Eye size={16} />
                  Browse Articles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-container">
            <div>
              <h2 className="about-title">About IJAREI</h2>
              <p className="about-text">
                The International Journal of Agricultural Research and Emerging Innovations (IJAREI) is a premier
                peer-reviewed, open-access publication dedicated to advancing agricultural science through cutting-edge
                research and innovative practices.
              </p>
              <p className="about-text">
                Established in 2025, IJAREI publishes original research articles, comprehensive reviews, and case studies
                that contribute to sustainable agriculture, food security, climate adaptation, and rural development worldwide.
                Our editorial board comprises distinguished researchers from many countries across the globe.
              </p>
              <p className="about-text">
                With a strong focus on interdisciplinary approaches, we welcome submissions from all fields of agriculture,
                including but not limited to crop science, agricultural biotechnology, precision farming, sustainable agriculture,
                water management, and agribusiness innovation.
              </p>
              <button
                onClick={() => handleNavigation('/about-journal')}
                className="read-more-link"
              >
                Read Complete About Us
                <ArrowRight size={16} />
              </button>
            </div>
            <OptimizedImage
              src="/Images/AboutIJAREIimage.jpg"
              alt="Agricultural Research"
              style={{ height: '350px', borderRadius: '16px' }}
              fallback={
                <div style={{
                  height: '350px',
                  background: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <BookOpen size={64} />
                </div>
              }
            />
          </div>
        </section>

        {/* Research Areas Section - Static Content */}
        <section className="research-section">
          <h2 className="section-title">Research Areas</h2>
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="research-card"
              >
                <div className="research-icon">{renderIcon(area.icon, 24)}</div>
                <h3 className="research-title">{area.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Our Blogs Section - Static Content */}
        <section className="blogs-section">
          <h2 className="section-title">Our Blogs</h2>
          <div className="blogs-grid">
            <div className="blog-card" onClick={() => handleExternalLink('https://blog.example.com/future-sustainable-agriculture')}>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop"
                alt="Future of Sustainable Agriculture"
                style={{ height: '200px' }}
                fallback={
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#64748b'
                  }}>
                    <Lightbulb size={48} color="#166534" />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Blog Image</p>
                  </div>
                }
              />
              <div className="blog-content">
                <span className="blog-category">Technology</span>
                <h3 className="blog-title">Future of Sustainable Agriculture: Trends and Innovations</h3>
                <p className="blog-excerpt">Exploring cutting-edge technologies and practices shaping the future of sustainable farming worldwide...</p>
                <div className="blog-meta">
                  <span>August 12, 2025</span>
                  <span className="blog-read-more">
                    Read More
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </div>

            <div className="blog-card" onClick={() => handleExternalLink('https://blog.example.com/climate-resilient-crops')}>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop"
                alt="Climate-Resilient Crops"
                style={{ height: '200px' }}
                fallback={
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#64748b'
                  }}>
                    <Lightbulb size={48} color="#166534" />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Blog Image</p>
                  </div>
                }
              />
              <div className="blog-content">
                <span className="blog-category">Research</span>
                <h3 className="blog-title">Climate-Resilient Crops: Genetic Solutions for Food Security</h3>
                <p className="blog-excerpt">How genetic engineering and traditional breeding methods are creating crops that can withstand climate challenges...</p>
                <div className="blog-meta">
                  <span>August 10, 2025</span>
                  <span className="blog-read-more">
                    Read More
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </div>

            <div className="blog-card" onClick={() => handleExternalLink('https://blog.example.com/precision-agriculture-iot-ai')}>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop"
                alt="Precision Agriculture"
                style={{ height: '200px' }}
                fallback={
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#64748b'
                  }}>
                    <Lightbulb size={48} color="#166534" />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Blog Image</p>
                  </div>
                }
              />
              <div className="blog-content">
                <span className="blog-category">Innovation</span>
                <h3 className="blog-title">Precision Agriculture: IoT and AI in Modern Farming</h3>
                <p className="blog-excerpt">Discover how Internet of Things sensors and artificial intelligence are revolutionizing farm management...</p>
                <div className="blog-meta">
                  <span>August 8, 2025</span>
                  <span className="blog-read-more">
                    Read More
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </div>

            <div className="blog-card" onClick={() => handleExternalLink('https://blog.example.com/water-management-arid-regions')}>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&h=250&fit=crop"
                alt="Water Management"
                style={{ height: '200px' }}
                fallback={
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#64748b'
                  }}>
                    <Lightbulb size={48} color="#166534" />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Blog Image</p>
                  </div>
                }
              />
              <div className="blog-content">
                <span className="blog-category">Sustainability</span>
                <h3 className="blog-title">Water Management in Arid Regions: Sustainable Solutions</h3>
                <p className="blog-excerpt">Innovative irrigation techniques and water conservation methods for agriculture in water-scarce areas...</p>
                <div className="blog-meta">
                  <span>August 5, 2025</span>
                  <span className="blog-read-more">
                    Read More
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="center-content">
            <button
              onClick={() => handleExternalLink('https://blog.example.com')}
              className="read-button"
              style={{
                backgroundColor: 'transparent',
                color: '#166534',
                border: '2px solid #166534'
              }}
            >
              <ExternalLink size={16} />
              Visit Our Blog
            </button>
          </div>
        </section>

        {/* What Researchers Say Section - Static Content */}
        <section className="testimonials-section">
          <h2 className="section-title">What Researchers Say</h2>
          <div className="testimonial-card">
            <Quote size={32} color="#166534" style={{ marginBottom: '20px' }} />
            <p className="testimonial-text">
              "{testimonials[currentTestimonial]?.text}"
            </p>
            <div className="testimonial-author">
              {testimonials[currentTestimonial]?.author}
            </div>
            <div className="testimonial-position">
              {testimonials[currentTestimonial]?.position}
            </div>
            <div className="stars">
              {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="research-section">
          <h2 className="section-title">Why Choose IJAREI?</h2>
          <div className="features-grid">
            <div className="showcase-card">
              <div className="showcase-icon"><Globe size={32} color="#166534" /></div>
              <h3 className="showcase-title" style={{ marginBottom: '10px' }}>Open Access</h3>
              <p className="showcase-description">
                Free access to all published research worldwide with no subscription barriers
              </p>
            </div>
            <div className="showcase-card">
              <div className="showcase-icon"><Users size={32} color="#166534" /></div>
              <h3 className="showcase-title" style={{ marginBottom: '10px' }}>Expert Review</h3>
              <p className="showcase-description">
                Rigorous double-blind peer review by leading agricultural researchers
              </p>
            </div>
            <div className="showcase-card">
              <div className="showcase-icon"><Award size={32} color="#166534" /></div>
              <h3 className="showcase-title" style={{ marginBottom: '10px' }}>Global Indexing</h3>
              <p className="showcase-description">
                Indexed in major databases including Google Scholar, DOAJ, and ResearchGate
              </p>
            </div>
            <div className="showcase-card">
              <div className="showcase-icon"><TrendingUp size={32} color="#166534" /></div>
              <h3 className="showcase-title" style={{ marginBottom: '10px' }}>High Impact</h3>
              <p className="showcase-description">
                Promoting research that drives real-world agricultural innovations
              </p>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="about-section">
          <div className="seo-container">
            <h2 className="section-title">Agricultural Research Excellence</h2>
            <div className="seo-grid">
              <div className="seo-item">
                <h3>Sustainable Agriculture Research</h3>
                <p>
                  Our journal focuses on sustainable agriculture practices that address climate change challenges,
                  promote biodiversity conservation, and ensure food security for growing global populations.
                  We publish cutting-edge research on organic farming, agroecology, and regenerative agriculture.
                </p>
              </div>
              <div className="seo-item">
                <h3>Precision Agriculture Technology</h3>
                <p>
                  Explore the latest developments in precision agriculture, including IoT sensors, drone technology,
                  satellite imagery analysis, and AI-driven crop monitoring systems. Our articles cover smart
                  irrigation, variable rate technology, and data-driven farm management solutions.
                </p>
              </div>
              <div className="seo-item">
                <h3>Crop Biotechnology Innovation</h3>
                <p>
                  Discover groundbreaking research in plant genetics, molecular breeding, CRISPR gene editing,
                  and development of climate-resilient crop varieties. Our publications advance understanding
                  of plant-microbe interactions and stress tolerance mechanisms.
                </p>
              </div>
              <div className="seo-item">
                <h3>Water Resource Management</h3>
                <p>
                  Access comprehensive research on efficient irrigation systems, water-use efficiency,
                  drought management strategies, and watershed conservation. Our articles address critical
                  water scarcity challenges facing modern agriculture worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - JSX Component */}
        <section className="home-cta-section">
          <div className="home-cta-content">
            <h2 className="home-cta-title">Ready to Publish Your Research?</h2>
            <p className="home-cta-text">
              Join our global community of agricultural researchers and contribute to advancing
              sustainable farming practices worldwide. Fast-track review available.
            </p>
            <div className="home-cta-buttons">
              <button
                onClick={() => handleNavigation('/manuscript')}
                className="home-cta-button"
              >
                <FileText size={18} />
                Submit Your Paper
              </button>
              <button
                onClick={() => handleNavigation('/instructions')}
                className="home-cta-button outline"
              >
                <CheckCircle size={18} />
                Submission Guidelines
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-container">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-description">
              Have questions about submission or need editorial support? We're here to help.
            </p>
            <div className="contact-grid">
              <div className="contact-card">
                <Mail size={32} color="#166534" style={{ marginBottom: '15px' }} />
                <h3>Editorial Office</h3>
                <a href="mailto:editor.ijterdjournal@gmail.com">
                  editor.ijterdjournal@gmail.com
                </a>
              </div>
              <div className="contact-card">
                <Phone size={32} color="#166534" style={{ marginBottom: '15px' }} />
                <h3>WhatsApp Support</h3>
                <a href="https://wa.me/917053938407">
                  +91 7053938407
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ErrorBoundary>
  );
};

export default HomePage;