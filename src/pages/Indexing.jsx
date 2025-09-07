import React, { useState, useEffect } from 'react';
import { ExternalLink, Award, Check, Globe, BookOpen, Users, Shield } from 'lucide-react';
import '../styles/IndexingRecognitionPage.css';

const IndexingRecognitionPage = () => {
  // State management for backend data
  const [indexingData, setIndexingData] = useState([]);
  const [trustBadges, setTrustBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch indexing data and trust badges from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch indexing data and trust badges in parallel
        const [indexingResponse, badgesResponse] = await Promise.all([
          fetch('/api/public/indexing', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
          }),
          fetch('/api/public/trust-badges', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
          })
        ]);

        if (!indexingResponse.ok) {
          throw new Error(`Failed to fetch indexing data: ${indexingResponse.status}`);
        }

        if (!badgesResponse.ok) {
          throw new Error(`Failed to fetch trust badges: ${badgesResponse.status}`);
        }

        const indexingJson = await indexingResponse.json();
        const badgesJson = await badgesResponse.json();
        
        setIndexingData(indexingJson || []);
        setTrustBadges(badgesJson || []);
        
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
        
        // Set fallback empty arrays
        setIndexingData([]);
        setTrustBadges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Icon mapping for trust badges (now using logo field as icon name)
  const getIconComponent = (iconName) => {
    const iconMap = {
      'Users': Users,
      'BookOpen': BookOpen,
      'Globe': Globe,
      'Check': Check,
      'Shield': Shield,
      'Award': Award
    };
    return iconMap[iconName] || Check;
  };

  // Helper function to check if logo URL is valid
  const hasValidLogo = (logo) => {
    return logo && typeof logo === 'string' && logo.trim() !== '';
  };

  // Loading state
  if (loading) {
    return (
      <div className="irp-main-wrapper">
        <div className="irp-loading-container">
          <div className="irp-loading-spinner"></div>
          <p>Loading indexing data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="irp-error-container">
        <div className="irp-error-content">
          <p className="irp-error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="irp-retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="irp-main-wrapper">
      {/* Hero Section */}
      <section className="irp-hero-section">
        <div className="irp-hero-background"></div>
        <div className="irp-hero-content">
          <h1 className="irp-hero-title">
            Our Journal is Indexed & Recognized Globally
          </h1>
          <p className="irp-hero-subtitle">
            We are proud to be listed in globally recognized academic and research databases,
            ensuring maximum visibility and accessibility for published research.
          </p>
        </div>
      </section>

      {/* Logo Grid Section */}
      <section className="irp-logo-grid-section">
        <div className="irp-container">
          <h2 className="irp-section-title">
            Indexed In Leading Academic Databases
          </h2>
          {indexingData.length === 0 ? (
            <div className="irp-no-data-message">
              <p>No indexing platforms available at the moment.</p>
            </div>
          ) : (
            <div className="irp-indexing-grid">
              {indexingData.map((platform) => (
                <div key={platform.id} className="irp-indexing-logo">
                  <div className="irp-logo-container">
                    {hasValidLogo(platform.logo) ? (
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name || 'Platform'} logo`}
                        className="irp-logo-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.parentNode.querySelector('.irp-logo-fallback');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="irp-logo-fallback" 
                      style={{ display: hasValidLogo(platform.logo) ? 'none' : 'flex' }}
                    >
                      <span>{(platform.name || 'P').charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <span className="irp-logo-name">{platform.name || 'Platform'}</span>
                  {platform.hasProfile && platform.profileLink && (
                    <a 
                      href={platform.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="irp-profile-link"
                    >
                      <ExternalLink className="irp-external-link-icon" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Indexing Cards Section */}
      <section className="irp-indexing-cards-section">
        <div className="irp-container">
          <h2 className="irp-section-title">Database Profiles & Recognition</h2>
          <p className="irp-section-description">
            Explore our presence across major academic and research platforms
          </p>
          {indexingData.length === 0 ? (
            <div className="irp-no-data-message">
              <p>No database profiles available at the moment.</p>
            </div>
          ) : (
            <div className="irp-cards-grid">
              {indexingData.map((platform) => (
                <div key={platform.id} className="irp-indexing-card">
                  <div className="irp-card-header">
                    <div className="irp-card-logo-container">
                      {hasValidLogo(platform.logo) ? (
                        <img 
                          src={platform.logo} 
                          alt={`${platform.name || 'Platform'} logo`}
                          className="irp-card-logo-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.irp-card-logo-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="irp-card-logo-fallback" 
                        style={{ display: hasValidLogo(platform.logo) ? 'none' : 'flex' }}
                      >
                        <span>{(platform.name || 'P').charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <h3 className="irp-card-title">{platform.name || 'Platform'}</h3>
                  </div>
                  <p className="irp-card-description">{platform.description || 'No description available'}</p>
                  {platform.hasProfile && platform.profileLink && (
                    <a 
                      href={platform.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="irp-card-link"
                    >
                      View Profile
                      <ExternalLink className="irp-card-link-icon" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Indexed Table Section */}
      <section className="irp-indexed-table-section">
        <div className="irp-container">
          <h2 className="irp-section-title">Complete Indexing Overview</h2>
          {indexingData.length === 0 ? (
            <div className="irp-no-data-message">
              <p>No indexing data available at the moment.</p>
            </div>
          ) : (
            <div className="irp-table-wrapper">
              <table className="irp-indexing-table">
                <thead>
                  <tr>
                    <th>Database Name</th>
                    <th>Profile Link</th>
                    <th>Year Indexed</th>
                  </tr>
                </thead>
                <tbody>
                  {indexingData.map((platform) => (
                    <tr key={platform.id}>
                      <td>
                        <div className="irp-table-name-cell">
                          <div className="irp-table-logo-container">
                            {hasValidLogo(platform.logo) ? (
                              <img 
                                src={platform.logo} 
                                alt={`${platform.name || 'Platform'} logo`}
                                className="irp-table-logo-image"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const fallback = e.target.parentNode.querySelector('.irp-table-logo-fallback');
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="irp-table-logo-fallback" 
                              style={{ display: hasValidLogo(platform.logo) ? 'none' : 'flex' }}
                            >
                              <span>{(platform.name || 'P').charAt(0).toUpperCase()}</span>
                            </div>
                          </div>
                          <span className="irp-table-name">{platform.name || 'Platform'}</span>
                        </div>
                      </td>
                      <td>
                        {platform.hasProfile && platform.profileLink ? (
                          <a 
                            href={platform.profileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="irp-table-link"
                          >
                            View Profile
                            <ExternalLink className="irp-table-link-icon" />
                          </a>
                        ) : (
                          <span className="irp-coming-soon">Coming Soon</span>
                        )}
                      </td>
                      <td className="irp-year-cell">{platform.yearIndexed || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="irp-trust-badges-section">
        <div className="irp-container">
          <h2 className="irp-section-title">Quality & Trust Indicators</h2>
          <p className="irp-section-description">
            Our commitment to academic excellence and publishing standards
          </p>
          {trustBadges.length === 0 ? (
            <div className="irp-no-data-message">
              <p>No trust badges available at the moment.</p>
            </div>
          ) : (
            <div className="irp-trust-badges">
              {trustBadges.map((badge) => {
                const IconComponent = getIconComponent(badge.logo); // Use logo field as icon name
                return (
                  <div key={badge.id} className="irp-trust-badge">
                    <div className="irp-badge-icon-container">
                      <IconComponent className="irp-badge-icon" />
                    </div>
                    <h3 className="irp-badge-title">{badge.name || 'Badge'}</h3>
                    <p className="irp-badge-description">{badge.description || 'No description available'}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="irp-cta-section">
        <div className="irp-cta-container">
          <h2 className="irp-cta-title">Join Our Global Research Community</h2>
          <p className="irp-cta-description">
            Submit your research to a journal that's recognized worldwide
          </p>
          <div className="irp-cta-buttons">
            <button className="irp-cta-button-primary">Submit Article</button>
            <button className="irp-cta-button-secondary">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexingRecognitionPage;