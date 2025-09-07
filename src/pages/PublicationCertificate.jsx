import React from 'react';
import { Award, CheckCircle, FileText, Globe, Download, Shield, Star, TrendingUp, Users, BookOpen, Link, Mail } from 'lucide-react';
import '../styles/PublicationCertificate.css';

const PublicationCertificate = () => {
  // JavaScript for responsive behavior
  React.useEffect(() => {
    const updateResponsiveStyles = () => {
      const width = window.innerWidth;
      
      // Update grid layouts
      const grids = document.querySelectorAll('.responsive-grid');
      grids.forEach(grid => {
        if (width >= 768) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
          grid.style.gap = '1.5rem';
        } else {
          grid.style.gridTemplateColumns = '1fr';
          grid.style.gap = '1rem';
        }
      });

      // Update features grid
      const featuresGrids = document.querySelectorAll('.features-grid');
      featuresGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update benefits grid
      const benefitsGrids = document.querySelectorAll('.benefits-grid');
      benefitsGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (width >= 640) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update steps grid
      const stepsGrids = document.querySelectorAll('.steps-grid');
      stepsGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (width >= 640) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });
    };

    updateResponsiveStyles();
    window.addEventListener('resize', updateResponsiveStyles);
    
    return () => window.removeEventListener('resize', updateResponsiveStyles);
  }, []);

  return (
    <div className="certificate-container">
      {/* Header */}
      <header className="certificate-header">
        <div className="header-content">
          <h1 className="header-title">
            Publication Certificate
          </h1>
          <p className="certificate-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="certificate-main">
        
        {/* Introduction Section */}
        <section className="certificate-section">
          <h2 className="section-title">
            Recognizing Excellence in Research
          </h2>
          <p className="section-text">
            At the <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>, 
            we value the hard work, dedication, and scholarly contribution of our authors. To recognize and certify their efforts, 
            we provide an official Publication Certificate for every successfully published research article, review paper, or case study.
          </p>
          
          <p className="section-text">
            The Publication Certificate serves as an authentic acknowledgment of the author's contribution to the academic and research community. 
            It certifies that the submitted manuscript has undergone rigorous peer review, met the publication standards of the journal, 
            and has been successfully indexed as part of our global digital archive.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Award color="#d97706" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Official Recognition:</strong> Every published author receives a professionally designed certificate 
                  that validates their scholarly contribution to agricultural research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="certificate-section">
          <h2 className="section-title">
            Features of the Publication Certificate
          </h2>
          
          <div className="features-card">
            <div className="features-header">
              <Star color="#d97706" size={32} />
              <div>
                <h3 className="features-title">Comprehensive Certificate Features</h3>
                <p className="features-subtitle">Professional Recognition Elements</p>
              </div>
            </div>
            
            <div className="responsive-grid features-grid">
              {[
                {
                  icon: <Shield color="#d97706" size={24} />,
                  title: 'Official Recognition',
                  description: 'Issued by IJAREI with journal logo, ISSN number, and digital verification code'
                },
                {
                  icon: <FileText color="#d97706" size={24} />,
                  title: 'Proof of Publication',
                  description: 'Clearly mentions the article title, author(s) name(s), volume, issue, and year of publication'
                },
                {
                  icon: <Globe color="#d97706" size={24} />,
                  title: 'Globally Accepted',
                  description: 'Recognized by universities, research institutions, and funding agencies worldwide'
                },
                {
                  icon: <Download color="#d97706" size={24} />,
                  title: 'Digital & Printable',
                  description: 'Sent in high-quality PDF format, easily downloadable and printable'
                },
                {
                  icon: <Link color="#d97706" size={24} />,
                  title: 'Permanent Record',
                  description: 'Each certificate is linked with the article\'s DOI for long-term verification'
                }
              ].map((feature, index) => (
                <div key={index} className="features-card-item">
                  <div className="features-icon">
                    <CheckCircle color="#16a34a" size={20} className="check-icon" />
                    {feature.icon}
                  </div>
                  <h4 className="features-item-title">{feature.title}</h4>
                  <p className="features-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Importance Section */}
        <section className="certificate-section">
          <h2 className="section-title">
            Why is the Publication Certificate Important?
          </h2>
          
          <div className="importance-card">
            <div className="importance-header">
              <TrendingUp color="#7c3aed" size={32} />
              <div>
                <h3 className="importance-title">Career & Academic Impact</h3>
                <p className="importance-subtitle">Professional Recognition Benefits</p>
              </div>
            </div>
            
            <div className="responsive-grid benefits-grid">
              {[
                {
                  icon: <BookOpen color="#7c3aed" size={24} />,
                  title: 'Academic Growth',
                  description: 'Strengthens academic profiles for research scholars, Ph.D. candidates, and faculty members'
                },
                {
                  icon: <TrendingUp color="#7c3aed" size={24} />,
                  title: 'Career Advancement',
                  description: 'Useful for job applications, promotions, and research grant opportunities'
                },
                {
                  icon: <Award color="#7c3aed" size={24} />,
                  title: 'Research Recognition',
                  description: 'Provides formal acknowledgment of contribution to agricultural sciences and emerging innovations'
                },
                {
                  icon: <Globe color="#7c3aed" size={24} />,
                  title: 'International Credibility',
                  description: 'Enhances the visibility and authenticity of your published work worldwide'
                }
              ].map((benefit, index) => (
                <div key={index} className="benefits-card-item">
                  <div className="benefits-icon">
                    {benefit.icon}
                  </div>
                  <h4 className="benefits-item-title">{benefit.title}</h4>
                  <p className="benefits-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="certificate-section">
          <h2 className="section-title">
            How to Obtain Your Publication Certificate?
          </h2>
          
          <div className="process-card">
            <div className="process-header">
              <FileText color="#16a34a" size={32} />
              <div>
                <h3 className="process-title">Simple Three-Step Process</h3>
                <p className="process-subtitle">From Submission to Certificate</p>
              </div>
            </div>
            
            <div className="responsive-grid steps-grid">
              {[
                {
                  step: '1',
                  icon: <FileText color="#16a34a" size={24} />,
                  title: 'Submit Your Manuscript',
                  description: 'Submit your manuscript to IJAREI for review and publication through our online submission system'
                },
                {
                  step: '2',
                  icon: <CheckCircle color="#16a34a" size={24} />,
                  title: 'Publication & Processing',
                  description: 'Once accepted and published, the journal editorial team automatically generates the Publication Certificate'
                },
                {
                  step: '3',
                  icon: <Mail color="#16a34a" size={24} />,
                  title: 'Receive Your Certificate',
                  description: 'Authors will receive the certificate via email along with a link for online verification'
                }
              ].map((step, index) => (
                <div key={index} className="step-card-item">
                  <div className="step-number">
                    {step.step}
                  </div>
                  <div className="step-content">
                    <div className="step-icon">
                      {step.icon}
                    </div>
                    <h4 className="step-item-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Author Benefits Section */}
        <section className="certificate-section">
          <h2 className="section-title">
            Benefits for Authors
          </h2>
          
          <div className="author-benefits-card">
            <div className="author-benefits-header">
              <Users color="#dc2626" size={32} />
              <div>
                <h3 className="author-benefits-title">Exclusive Author Advantages</h3>
                <p className="author-benefits-subtitle">No Hidden Costs, Maximum Benefits</p>
              </div>
            </div>
            
            <div className="bullet-list">
              {[
                'No additional charges for certificate issuance',
                'Authors can request extra copies for institutional or personal records',
                'Certificates can be shared in professional profiles, resumes, and academic portfolios'
              ].map((benefit, index) => (
                <div key={index} className="bullet-point">
                  <CheckCircle color="#16a34a" size={20} className="bullet-icon" />
                  <p className="bullet-text">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Free Service:</strong> Certificate generation and delivery are completely free of charge - 
                part of our commitment to supporting academic excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Final Statement */}
        <section className="certificate-section">
          <div className="final-statement-card">
            <div className="final-statement-content">
              <Award color="#d97706" size={32} className="final-statement-icon" />
              <div className="final-statement-text">
                <h3 className="final-statement-title">Your Research Deserves Recognition</h3>
                <p>
                  At <strong className="highlight-text">IJAREI</strong>, we ensure that every author receives proper recognition 
                  for their valuable research contribution. The Publication Certificate stands as a testament to the originality, 
                  quality, and academic impact of their work.
                </p>
                <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                  "Excellence in research deserves excellence in recognition - your certificate is our commitment to your success."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default PublicationCertificate;