import React from 'react';
import { UserCheck, Award, TrendingUp, Users, Eye, Shield, CheckCircle, Clock, FileText, Mail, Star, Globe, Target } from 'lucide-react';
import '../styles/JoinAsReviewer.css';

const JoinAsReviewer = () => {
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

      // Update benefits grid
      const benefitsGrids = document.querySelectorAll('.benefits-grid');
      benefitsGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (width >= 640) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update contact item layout
      const contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach(item => {
        if (width >= 640) {
          item.style.flexDirection = 'row';
          item.style.textAlign = 'left';
        } else {
          item.style.flexDirection = 'column';
          item.style.textAlign = 'center';
        }
      });
    };

    updateResponsiveStyles();
    window.addEventListener('resize', updateResponsiveStyles);
    
    return () => window.removeEventListener('resize', updateResponsiveStyles);
  }, []);

  const handleLinkHover = (e, isHover) => {
    if (isHover) {
      e.target.style.color = '#14532d';
    } else {
      e.target.style.color = '#166534';
    }
  };

  return (
    <div className="reviewer-container">
      {/* Header */}
      <header className="reviewer-header">
        <div className="header-content">
          <h1 className="header-title">
            Join as Reviewer
          </h1>
          <p className="reviewer-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="reviewer-main">
        
        {/* Introduction Section */}
        <section className="reviewer-section">
          <h2 className="section-title">
            Shape Scientific Excellence Through Peer Review
          </h2>
          <p className="section-text">
            The <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> warmly 
            welcomes qualified researchers, academicians, and professionals to join our Reviewer Panel. Our reviewers play a crucial role 
            in maintaining the quality, integrity, and credibility of the journal by providing constructive feedback, ensuring originality, 
            and guiding authors toward academic excellence.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <UserCheck color="#16a34a" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Make an Impact:</strong> Join our distinguished panel of reviewers and help advance agricultural 
                  science through rigorous peer review and scholarly excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="reviewer-section">
          <h2 className="section-title">
            Why Join as a Reviewer?
          </h2>
          
          <div className="benefits-card">
            <div className="benefits-header">
              <Award color="#166534" size={32} />
              <div>
                <h3 className="benefits-title">Professional Impact & Recognition</h3>
                <p className="benefits-subtitle">Advance Science While Building Your Career</p>
              </div>
            </div>
            
            <div className="responsive-grid benefits-grid">
              {[
                {
                  icon: <Target color="#166534" size={24} />,
                  title: 'Contribute to Science',
                  description: 'Be a part of advancing agricultural research and supporting innovative ideas that can shape future policies and practices'
                },
                {
                  icon: <Award color="#166534" size={24} />,
                  title: 'Academic Recognition',
                  description: 'Reviewers receive official certificates of appreciation and acknowledgment on the journal\'s website'
                },
                {
                  icon: <TrendingUp color="#166534" size={24} />,
                  title: 'Enhance Expertise',
                  description: 'Reviewing manuscripts exposes you to the latest research trends, broadening your knowledge and critical thinking skills'
                },
                {
                  icon: <Star color="#166534" size={24} />,
                  title: 'Professional Growth',
                  description: 'Gain recognition as an expert in your area of specialization and strengthen your academic profile'
                },
                {
                  icon: <Users color="#166534" size={24} />,
                  title: 'Networking Opportunities',
                  description: 'Connect with fellow researchers, academicians, and professionals across the globe'
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

        {/* Eligibility & Responsibilities */}
        <section className="reviewer-section">
          <h2 className="section-title">
            Eligibility & Responsibilities
          </h2>
          
          <div className="responsive-grid">
            <div className="policy-section">
              <h3 className="policy-title">
                <CheckCircle color="#166534" size={24} />
                <span>Eligibility Criteria</span>
              </h3>
              <p className="policy-text">
                We invite applications from individuals who meet the following requirements:
              </p>
              <div className="bullet-list">
                {[
                  'A Ph.D. degree or equivalent professional qualification in agricultural sciences or related disciplines',
                  'Demonstrated research and publication record in reputed journals',
                  'Strong commitment to ethical reviewing and maintaining confidentiality',
                  'Ability to provide constructive, unbiased, and timely feedback'
                ].map((criterion, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{criterion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="policy-section">
              <h3 className="policy-title">
                <Shield color="#166534" size={24} />
                <span>Reviewer Responsibilities</span>
              </h3>
              <p className="policy-text">
                As a reviewer, you will be expected to:
              </p>
              <div className="bullet-list">
                {[
                  'Conduct fair and objective evaluations of submitted manuscripts',
                  'Maintain strict confidentiality of all materials under review',
                  'Identify strengths, weaknesses, and areas for improvement in manuscripts',
                  'Ensure compliance with journal\'s publication ethics and research integrity standards',
                  'Submit reviews within the stipulated timeline to support timely publication'
                ].map((responsibility, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{responsibility}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="reviewer-section">
          <h2 className="section-title">
            How to Apply
          </h2>
          
          <div className="application-card">
            <div className="application-content">
              <FileText color="#16a34a" size={28} className="application-icon" />
              <div className="application-text">
                <p>
                  <strong>Application Requirements:</strong> Interested candidates can apply by sending their CV, 
                  research profile, and area of expertise to the editorial office.
                </p>
                <div className="highlight-box" style={{marginTop: '1rem'}}>
                  <p className="highlight-box-text">
                    <strong>Important:</strong> Please mention "Application for Reviewer Panel" in the subject line. 
                    Our editorial team will review your application, and successful candidates will receive an official invitation to join the Reviewer Board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recognition Section */}
        <section className="reviewer-section">
          <h2 className="section-title">
            Reviewer Recognition
          </h2>
          
          <div className="recognition-card">
            <div className="recognition-header">
              <Star color="#166534" size={32} />
              <div>
                <h3 className="recognition-title">Acknowledging Excellence</h3>
                <p className="recognition-subtitle">We Highly Value Our Reviewers' Contributions</p>
              </div>
            </div>
            
            <p className="section-text">
              We highly value the contributions of our reviewers. To acknowledge their efforts, we provide:
            </p>
            
            <div className="bullet-list">
              {[
                'Reviewer Certificates for every completed review',
                'Annual recognition of top reviewers on our website',
                'Opportunities to be considered for Editorial Board membership based on performance and dedication'
              ].map((recognition, index) => (
                <div key={index} className="bullet-point">
                  <div className="bullet"></div>
                  <p className="bullet-text">{recognition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="reviewer-section">
          <div className="contact-section">
            <h2 className="contact-title">
              Submit Your Application
            </h2>
            <p className="contact-description">
              Ready to join our distinguished panel of reviewers? Send your application materials to our editorial office.
            </p>
            
            <div className="contact-item">
              <div className="icon-circle">
                <Mail color="white" size={24} />
              </div>
              <div>
                <p className="contact-label">Reviewer Applications</p>
                <a 
                  href="mailto:editor.ijarei@gmail.com" 
                  className="contact-link"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  editor.ijarei@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final Note */}
        <section className="reviewer-section">
          <div className="final-note-card">
            <div className="final-note-content">
              <Globe color="#16a34a" size={28} className="final-note-icon" />
              <div className="final-note-text">
                <h3 className="final-note-title">Join Our Mission</h3>
                <p>
                  By joining as a reviewer, you become an essential part of <strong className="highlight-text">IJAREI's mission</strong> to 
                  promote high-quality agricultural research and innovations for global progress. Your expertise and dedication help 
                  maintain the scientific integrity that drives agricultural advancement worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default JoinAsReviewer;