import React from 'react';
import { Users, Award, Globe, TrendingUp, FileCheck, Mail, CheckCircle, Star, BookOpen, Network, Shield } from 'lucide-react';
import '../styles/JoinAsEditorialMember.css';

const JoinAsEditorialMember = () => {
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
    <div className="editorial-container">
      {/* Header */}
      <header className="editorial-header">
        <div className="header-content">
          <h1 className="header-title">
            Join as Editorial Member
          </h1>
          <p className="header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="editorial-main">
        
        {/* Introduction Section */}
        <section className="editorial-section">
          <h2 className="section-title">
            Shape the Future of Agricultural Research
          </h2>
          <p className="section-text">
            The <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> warmly 
            welcomes distinguished scholars, researchers, and academicians to join our Editorial Board. As a peer-reviewed, 
            open-access journal committed to advancing the latest knowledge in agriculture, agri-technology, sustainable farming, 
            and related disciplines, we believe that the strength of our journal lies in the expertise and dedication of our editorial team.
          </p>
          <p className="section-text">
            By becoming an Editorial Board Member, you will not only contribute to the growth of scientific knowledge but also 
            play a crucial role in shaping the future of global agricultural research.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Users color="#16a34a" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Join Our Mission:</strong> Be part of a distinguished team dedicated to advancing agricultural 
                  science and promoting innovative research worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="editorial-section">
          <h2 className="section-title">
            Why Join the Editorial Board?
          </h2>
          
          <div className="benefits-card">
            <div className="benefits-header">
              <Award color="#166534" size={32} />
              <div>
                <h3 className="benefits-title">Professional Excellence & Recognition</h3>
                <p className="benefits-subtitle">Elevate Your Academic Profile</p>
              </div>
            </div>
            
            <div className="responsive-grid benefits-grid">
              {[
                {
                  icon: <Star color="#166534" size={24} />,
                  title: 'Academic Recognition',
                  description: 'Gain visibility and recognition as an expert in your area of specialization'
                },
                {
                  icon: <FileCheck color="#166534" size={24} />,
                  title: 'Professional Contribution',
                  description: 'Play a leading role in reviewing, guiding, and improving the quality of published manuscripts'
                },
                {
                  icon: <Network color="#166534" size={24} />,
                  title: 'Networking Opportunities',
                  description: 'Connect with international researchers, scholars, and professionals working on cutting-edge agricultural innovations'
                },
                {
                  icon: <TrendingUp color="#166534" size={24} />,
                  title: 'Career Enhancement',
                  description: 'Being an editorial board member is a mark of prestige that strengthens your academic and professional profile'
                },
                {
                  icon: <Globe color="#166534" size={24} />,
                  title: 'Global Impact',
                  description: 'Support the dissemination of innovative, sustainable, and practical agricultural research worldwide'
                },
                {
                  icon: <BookOpen color="#166534" size={24} />,
                  title: 'Knowledge Advancement',
                  description: 'Contribute to the growth of scientific knowledge in your field of expertise'
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

        {/* Roles and Responsibilities */}
        <section className="editorial-section">
          <h2 className="section-title">
            Roles & Responsibilities
          </h2>
          
          <div className="policy-section">
            <h3 className="policy-title">
              <Shield color="#166534" size={24} />
              <span>As an Editorial Board Member of IJAREI, you will:</span>
            </h3>
            
            <div className="bullet-list">
              {[
                'Review and provide constructive feedback for submitted manuscripts',
                'Assist in maintaining the highest standards of publication ethics and peer review integrity',
                'Recommend and attract high-quality submissions from fellow researchers',
                'Suggest special issues, themes, or innovative research directions',
                'Promote the journal within your academic and professional networks'
              ].map((responsibility, index) => (
                <div key={index} className="bullet-point">
                  <div className="bullet"></div>
                  <p className="bullet-text">{responsibility}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Benefits */}
        <section className="editorial-section">
          <h2 className="section-title">
            Eligibility & Benefits
          </h2>
          
          <div className="responsive-grid">
            <div className="policy-section">
              <h3 className="policy-title">
                <CheckCircle color="#166534" size={24} />
                <span>Eligibility Criteria</span>
              </h3>
              <p className="policy-text">
                We invite applications from qualified individuals who meet the following requirements:
              </p>
              <div className="bullet-list">
                {[
                  'A Ph.D. or equivalent degree in agriculture, allied sciences, environmental sciences, or related disciplines',
                  'Demonstrated research experience with publications in reputed peer-reviewed journals',
                  'Strong commitment to academic excellence, publication ethics, and integrity',
                  'Willingness to dedicate time to manuscript reviews and editorial responsibilities'
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
                <Award color="#166534" size={24} />
                <span>Member Benefits</span>
              </h3>
              <p className="policy-text">
                Benefits of being an Editorial Member:
              </p>
              <div className="bullet-list">
                {[
                  'Recognition as an official Editorial Board Member of IJAREI',
                  'A certificate of appointment acknowledging your contribution',
                  'Opportunities to collaborate in special issues and editorial initiatives',
                  'Access to a network of global scholars and researchers',
                  'Priority consideration for your own manuscripts'
                ].map((benefit, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="editorial-section">
          <h2 className="section-title">
            How to Apply
          </h2>
          
          <div className="application-card">
            <div className="application-content">
              <FileCheck color="#16a34a" size={28} className="application-icon" />
              <div className="application-text">
                <p>
                  <strong>Application Requirements:</strong> Interested candidates can apply by sending the following 
                  to our editorial office:
                </p>
                <div className="bullet-list" style={{marginTop: '1rem'}}>
                  {[
                    'Updated Curriculum Vitae (CV) with recent publications',
                    'A short statement of interest explaining your motivation to join',
                    'Contact details and institutional affiliation'
                  ].map((requirement, index) => (
                    <div key={index} className="bullet-point">
                      <div className="bullet"></div>
                      <p className="bullet-text">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="editorial-section">
          <div className="contact-section">
            <h2 className="contact-title">
              Submit Your Application
            </h2>
            <p className="contact-description">
              Ready to join our distinguished editorial team? Send your application materials to our editorial office.
            </p>
            
            <div className="contact-item">
              <div className="icon-circle">
                <Mail color="white" size={24} />
              </div>
              <div>
                <p className="contact-label">Editorial Applications</p>
                <a 
                  href="mailto:editor.ijareijournal@gmail.com" 
                  className="contact-link"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  editor.ijareijournal@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final Note */}
        <section className="editorial-section">
          <div className="final-note-card">
            <div className="final-note-content">
              <Globe color="#16a34a" size={28} className="final-note-icon" />
              <div className="final-note-text">
                <h3 className="final-note-title">Our Commitment to Excellence</h3>
                <p>
                  At <strong className="highlight-text">IJAREI</strong>, we firmly believe that the growth of agricultural research 
                  depends on collective knowledge and collaborative effort. By joining our Editorial Board, you will contribute 
                  not only to the advancement of science but also to building a sustainable and innovative future for global agriculture.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default JoinAsEditorialMember;