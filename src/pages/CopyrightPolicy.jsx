import React from 'react';
import { Shield, Users, Globe, AlertTriangle, FileText, RotateCcw, FileX, Mail, Copyright, Eye, Download, Share } from 'lucide-react';
import '../styles/CopyrightPolicy.css';

const CopyrightPolicy = () => {
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

      // Update rights grid
      const rightsGrids = document.querySelectorAll('.rights-grid');
      rightsGrids.forEach(grid => {
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
    <div className="copyright-container">
      {/* Header */}
      <header className="copyright-header">
        <div className="header-content">
          <h1 className="header-title">
            Copyright Policy
          </h1>
          <p className="copyright-header-subtitle" style={{textAlign: 'center'}}>
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="copyright-main">
        
        {/* Introduction Section */}
        <section className="copyright-section">
          <h2 className="section-title">
            Protecting Authors, Promoting Knowledge
          </h2>
          <p className="section-text">
            At the <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>, we are 
            committed to protecting the rights of authors while ensuring broad dissemination of scientific knowledge. 
            This <strong className="highlight-text">Copyright Policy</strong> outlines the ownership, licensing, and usage rights of the content published in our journal.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Copyright color="#16a34a" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Important:</strong> By submitting a manuscript to IJAREI, authors agree to comply with 
                  the terms and conditions described in this copyright policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright Ownership */}
        <section className="copyright-section">
          <h2 className="section-title">
            Copyright Ownership
          </h2>
          
          <div className="policy-section">
            <h3 className="policy-title">
              <Shield color="#166534" size={24} />
              <span>Authors Retain Copyright</span>
            </h3>
            <p className="policy-text">
              <strong className="highlight-text">Authors retain the copyright</strong> of their published articles in IJAREI. 
              However, by submitting and publishing with IJAREI, authors grant the journal a non-exclusive, worldwide, and perpetual license to:
            </p>
            
            <div className="bullet-list">
              {[
                'Publish the work in electronic and print formats',
                'Archive and distribute the work across various platforms',
                'Index the article in international databases for academic visibility'
              ].map((item, index) => (
                <div key={index} className="bullet-point">
                  <div className="bullet"></div>
                  <p className="bullet-text">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Note:</strong> Authors maintain full rights to reuse, republish, or distribute their work, 
                provided that the original publication in IJAREI is properly acknowledged.
              </p>
            </div>
          </div>
        </section>

        {/* Licensing Terms */}
        <section className="copyright-section">
          <h2 className="section-title">
            Licensing Terms
          </h2>
          
          <div className="license-card">
            <div className="license-header">
              <Globe color="#166534" size={32} />
              <div>
                <h3 className="license-title">Creative Commons Attribution (CC BY) License</h3>
                <p className="license-subtitle">Open Access for Global Research Community</p>
              </div>
            </div>
            
            <p className="section-text">
              All articles published in IJAREI are licensed under the <strong className="highlight-text">Creative Commons Attribution (CC BY) License</strong>. 
              This license allows others to:
            </p>
            
            <div className="responsive-grid rights-grid">
              {[
                {
                  icon: <Share color="#166534" size={24} />,
                  title: 'Share',
                  description: 'Copy and redistribute the material in any medium or format'
                },
                {
                  icon: <RotateCcw color="#166534" size={24} />,
                  title: 'Adapt',
                  description: 'Remix, transform, and build upon the material for any purpose'
                },
                {
                  icon: <Eye color="#166534" size={24} />,
                  title: 'Attribution',
                  description: 'Proper credit to the author(s) and journal must always be given'
                }
              ].map((item, index) => (
                <div key={index} className="rights-card">
                  <div className="rights-icon">
                    {item.icon}
                  </div>
                  <h4 className="rights-title">{item.title}</h4>
                  <p className="rights-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Author & Journal Rights */}
        <section className="copyright-section">
          <h2 className="section-title">
            Rights & Responsibilities
          </h2>
          
          <div className="responsive-grid">
            <div className="policy-section">
              <h3 className="policy-title">
                <Users color="#166534" size={24} />
                <span>Author Rights</span>
              </h3>
              <p className="policy-text">
                Authors publishing in IJAREI have the following rights:
              </p>
              <div className="bullet-list">
                {[
                  'Reuse their article in teaching materials, presentations, or future publications',
                  'Deposit their work in institutional repositories or personal websites',
                  'Distribute copies of their article for academic or professional purposes',
                  'Use figures, tables, or parts of their article in other works, with appropriate citation'
                ].map((right, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{right}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="policy-section">
              <h3 className="policy-title">
                <Shield color="#166534" size={24} />
                <span>Journal Rights</span>
              </h3>
              <p className="policy-text">
                IJAREI reserves the right to:
              </p>
              <div className="bullet-list">
                {[
                  'Format, edit, or adapt the manuscript for publication purposes',
                  'Promote and distribute the article through indexing platforms',
                  'Ensure compliance with international copyright standards',
                  'Protect authors\' works against unauthorized use'
                ].map((right, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{right}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Protection */}
        <section className="copyright-section">
          <h2 className="section-title">
            Compliance & Protection
          </h2>
          
          <div>
            {[
              {
                icon: <AlertTriangle color="#166534" size={24} />,
                title: 'Plagiarism and Copyright Compliance',
                content: [
                  'Authors must ensure that their submitted manuscripts are original and do not infringe on third-party copyright',
                  'Proper citations and permissions are required when reproducing content from other sources',
                  'IJAREI follows strict anti-plagiarism policies using advanced detection tools'
                ]
              },
              {
                icon: <FileText color="#166534" size={24} />,
                title: 'Third-Party Material',
                content: [
                  'Authors must obtain written permission from copyright holders before using third-party material',
                  'The source must be clearly acknowledged in the article',
                  'Images, charts, or datasets from other sources require proper attribution'
                ]
              },
              {
                icon: <FileX color="#166534" size={24} />,
                title: 'Withdrawal & Retraction',
                content: [
                  'IJAREI reserves the right to withdraw articles with significant copyright violations',
                  'Retraction notices will be published to maintain transparency',
                  'Academic trust and integrity are maintained through proper procedures'
                ]
              }
            ].map((policy, index) => (
              <div key={index} className="policy-section">
                <h3 className="policy-title">
                  <span className="policy-icon">{policy.icon}</span>
                  <span>{policy.title}</span>
                </h3>
                <div className="bullet-list">
                  {policy.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="bullet-point">
                      <div className="bullet"></div>
                      <p className="bullet-text">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="copyright-section">
          <h2 className="section-title">
            Disclaimer
          </h2>
          
          <div className="disclaimer-card">
            <div className="disclaimer-content">
              <AlertTriangle color="#16a34a" size={28} className="disclaimer-icon" />
              <div className="disclaimer-text">
                <p>
                  The views and opinions expressed in published articles are solely those of the author(s). 
                  <strong className="highlight-text"> IJAREI does not assume responsibility for the content</strong> but ensures 
                  compliance with copyright and ethical standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="copyright-section">
          <div className="contact-section">
            <h2 className="contact-title">
              Copyright Inquiries
            </h2>
            <p className="contact-description">
              For questions regarding copyright policies, licensing terms, or any publication-related inquiries, 
              please contact our editorial team.
            </p>
            
            <div className="contact-item">
              <div className="icon-circle">
                <Mail color="white" size={24} />
              </div>
              <div>
                <p className="contact-label">Editorial Correspondence</p>
                <a 
                  href="mailto:editor.ijterdjournal@gmail.com" 
                  className="contact-link"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  editor.ijterdjournal@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default CopyrightPolicy;