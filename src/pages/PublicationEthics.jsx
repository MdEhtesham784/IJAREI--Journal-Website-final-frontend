import React from 'react';
import { Shield, Users, UserCheck, Settings, Heart, AlertTriangle, Eye, CheckCircle, Scale, Globe, FileText, BookOpen } from 'lucide-react';
import '../styles/PublicationEthics.css';

const PublicationEthics = () => {
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

      // Update responsibilities grid
      const responsibilitiesGrids = document.querySelectorAll('.responsibilities-grid');
      responsibilitiesGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (width >= 640) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update ethics grid
      const ethicsGrids = document.querySelectorAll('.ethics-grid');
      ethicsGrids.forEach(grid => {
        if (width >= 1024) {
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
    <div className="ethics-container">
      {/* Header */}
      <header className="ethics-header">
        <div className="header-content">
          <h1 className="header-title">
            Publication Ethics
          </h1>
          <p className="ethics-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="ethics-main">
        
        {/* Introduction Section */}
        <section className="ethics-section">
          <h2 className="section-title">
            Upholding the Highest Standards of Publication Ethics
          </h2>
          <p className="section-text">
            The <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> 
            is firmly committed to upholding the highest standards of publication ethics and integrity. We recognize that ethical practices 
            are the foundation of quality scholarly communication and essential to building trust between authors, editors, reviewers, and readers.
          </p>
          
          <p className="section-text">
            Our ethical policies are aligned with the <strong className="highlight-text">Committee on Publication Ethics (COPE)</strong> 
            guidelines and best practices followed by leading international academic publishers.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Shield color="#7c3aed" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>COPE Compliant:</strong> Our ethical framework follows internationally recognized standards 
                  to ensure integrity in scholarly communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stakeholder Responsibilities Section */}
        <section className="ethics-section">
          <h2 className="section-title">
            Stakeholder Responsibilities
          </h2>
          
          <div className="responsibilities-card">
            <div className="responsibilities-header">
              <Users color="#7c3aed" size={32} />
              <div>
                <h3 className="responsibilities-title">Ethical Obligations for All</h3>
                <p className="responsibilities-subtitle">Authors, Reviewers, and Editors</p>
              </div>
            </div>
            
            <div className="responsive-grid responsibilities-grid">
              {[
                {
                  icon: <FileText color="#7c3aed" size={24} />,
                  title: 'Authors',
                  color: '#7c3aed',
                  bgColor: '#ede9fe'
                },
                {
                  icon: <Eye color="#16a34a" size={24} />,
                  title: 'Reviewers',
                  color: '#16a34a',
                  bgColor: '#ecfdf5'
                },
                {
                  icon: <Settings color="#d97706" size={24} />,
                  title: 'Editors',
                  color: '#d97706',
                  bgColor: '#fffbeb'
                }
              ].map((stakeholder, index) => (
                <div key={index} className="responsibility-card-item">
                  <div className="responsibility-icon" style={{ backgroundColor: stakeholder.bgColor }}>
                    {stakeholder.icon}
                  </div>
                  <h4 className="responsibility-title" style={{ color: stakeholder.color }}>
                    Responsibilities of {stakeholder.title}
                  </h4>
                  <div className="responsibility-content">
                    {index === 0 && (
                      <div className="bullet-list">
                        {[
                          'Ensure research is original, accurate, and has not been published elsewhere',
                          'Provide proper acknowledgment of sources, data, and previous work',
                          'Avoid all forms of plagiarism, duplicate submission, and data fabrication',
                          'Disclose potential conflicts of interest at submission',
                          'Reflect actual contributions in authorship',
                          'Follow journal guidelines and maintain transparency'
                        ].map((item, idx) => (
                          <div key={idx} className="bullet-point">
                            <CheckCircle color="#7c3aed" size={16} className="bullet-icon" />
                            <p className="bullet-text">{item}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {index === 1 && (
                      <div className="bullet-list">
                        {[
                          'Provide objective, constructive, and timely feedback',
                          'Maintain confidentiality of manuscripts under review',
                          'Declare conflicts of interest immediately',
                          'Identify potential ethical concerns and violations',
                          'Maintain impartiality throughout the review process'
                        ].map((item, idx) => (
                          <div key={idx} className="bullet-point">
                            <CheckCircle color="#16a34a" size={16} className="bullet-icon" />
                            <p className="bullet-text">{item}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {index === 2 && (
                      <div className="bullet-list">
                        {[
                          'Ensure fair, impartial, and transparent manuscript handling',
                          'Base decisions solely on academic merit and relevance',
                          'Maintain confidential and unbiased peer review process',
                          'Take action against suspected ethical misconduct',
                          'Maintain integrity through corrections and retractions'
                        ].map((item, idx) => (
                          <div key={idx} className="bullet-point">
                            <CheckCircle color="#d97706" size={16} className="bullet-icon" />
                            <p className="bullet-text">{item}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethical Concerns in Research Section */}
        <section className="ethics-section">
          <h2 className="section-title">
            Ethical Concerns in Research
          </h2>
          
          <div className="research-ethics-card">
            <div className="research-ethics-header">
              <Heart color="#dc2626" size={32} />
              <div>
                <h3 className="research-ethics-title">Research Ethics Compliance</h3>
                <p className="research-ethics-subtitle">Human, Animal, and Environmental Safety</p>
              </div>
            </div>
            
            <div className="responsive-grid ethics-grid">
              {[
                {
                  icon: <Users color="#dc2626" size={24} />,
                  title: 'Human Subjects',
                  description: 'Studies involving humans must include proper ethical approval from recognized institutions and transparent reporting of potential risks'
                },
                {
                  icon: <Heart color="#dc2626" size={24} />,
                  title: 'Animal Welfare',
                  description: 'Research involving animals must comply with ethical standards and obtain necessary approvals from institutional review boards'
                },
                {
                  icon: <Globe color="#dc2626" size={24} />,
                  title: 'Environmental Safety',
                  description: 'Authors must ensure compliance with environmental safety standards and report any potential environmental impacts'
                },
                {
                  icon: <Shield color="#dc2626" size={24} />,
                  title: 'Risk Assessment',
                  description: 'Any potential risk or harm caused by the research should be transparently reported and properly assessed'
                }
              ].map((concern, index) => (
                <div key={index} className="ethics-card-item">
                  <div className="ethics-icon">
                    {concern.icon}
                  </div>
                  <h4 className="ethics-item-title">{concern.title}</h4>
                  <p className="ethics-description">{concern.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Handling of Misconduct Section */}
        <section className="ethics-section">
          <h2 className="section-title">
            Handling of Misconduct
          </h2>
          
          <div className="misconduct-card">
            <div className="misconduct-header">
              <AlertTriangle color="#dc2626" size={32} />
              <div>
                <h3 className="misconduct-title">Zero-Tolerance Policy</h3>
                <p className="misconduct-subtitle">Swift Action Against Unethical Behavior</p>
              </div>
            </div>
            
            <p className="section-text">
              The journal adopts a <strong className="highlight-text">zero-tolerance policy</strong> towards unethical behavior, 
              including plagiarism, data falsification, image manipulation, and duplicate submissions.
            </p>
            
            <div className="misconduct-actions">
              <h4 className="actions-title">If misconduct is detected:</h4>
              <div className="actions-list">
                <div className="action-item immediate">
                  <AlertTriangle color="#dc2626" size={20} />
                  <span>The manuscript may be rejected immediately</span>
                </div>
                <div className="action-item retraction">
                  <AlertTriangle color="#f59e0b" size={20} />
                  <span>Already published articles may be retracted with a formal notice</span>
                </div>
                <div className="action-item notification">
                  <AlertTriangle color="#7c3aed" size={20} />
                  <span>Institutions or funding bodies may be informed of the misconduct</span>
                </div>
              </div>
            </div>

            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Important:</strong> We maintain detailed records of misconduct cases to prevent 
                repeat offenses and protect the integrity of the scholarly record.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency and Integrity Section */}
        <section className="ethics-section">
          <h2 className="section-title">
            Transparency & Integrity
          </h2>
          
          <div className="transparency-card">
            <div className="transparency-header">
              <Eye color="#16a34a" size={32} />
              <div>
                <h3 className="transparency-title">Open Research Practices</h3>
                <p className="transparency-subtitle">Promoting Transparency in Scientific Communication</p>
              </div>
            </div>
            
            <div className="bullet-list">
              {[
                'IJAREI encourages openness in research by promoting proper data sharing and transparency in methodologies',
                'Funding sources, sponsorships, and potential conflicts of interest must always be disclosed',
                'Any corrections or retractions will be published promptly to maintain the accuracy of the scholarly record'
              ].map((principle, index) => (
                <div key={index} className="bullet-point">
                  <CheckCircle color="#16a34a" size={20} className="bullet-icon" />
                  <p className="bullet-text">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="ethics-section">
          <h2 className="section-title">
            Our Commitment to Academic Integrity
          </h2>
          
          <div className="commitment-card">
            <div className="commitment-content">
              <Scale color="#7c3aed" size={28} className="commitment-icon" />
              <div className="commitment-text">
                <h3 className="commitment-title">Excellence in Scholarly Publishing</h3>
                <p>
                  By adhering to these ethical practices, <strong className="highlight-text">IJAREI</strong> ensures that 
                  every published article contributes responsibly to the global body of agricultural research and emerging innovations.
                </p>
                <p style={{marginTop: '1rem'}}>
                  Our mission is to foster trust, credibility, and excellence in scholarly publishing, thereby strengthening 
                  the scientific community and supporting sustainable growth in agriculture worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Statement */}
        <section className="ethics-section">
          <div className="final-statement-card">
            <div className="final-statement-content">
              <BookOpen color="#7c3aed" size={32} className="final-statement-icon" />
              <div className="final-statement-text">
                <h3 className="final-statement-title">Building Trust Through Ethical Excellence</h3>
                <p>
                  Ethical publishing is not just a requirement—it's our commitment to advancing agricultural science 
                  with integrity, transparency, and responsibility.
                </p>
                <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                  "In the pursuit of knowledge, integrity is our compass, and ethics is our foundation."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default PublicationEthics;