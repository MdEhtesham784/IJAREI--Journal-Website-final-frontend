import React from 'react';
import { Globe, Unlock, Share, Users, Eye, Download, BookOpen, Award, TrendingUp, Heart, Zap, Scale } from 'lucide-react';
import '../styles/OpenAccessPolicy.css';

const OpenAccessPolicy = () => {
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
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update access rights grid
      const accessGrids = document.querySelectorAll('.access-grid');
      accessGrids.forEach(grid => {
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

  return (
    <div className="access-container">
      {/* Header */}
      <header className="access-header">
        <div className="header-content">
          <h1 className="header-title">
            Open Access Policy
          </h1>
          <p className="OpenAccess-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="access-main">
        
        {/* Introduction Section */}
        <section className="access-section">
          <h2 className="section-title">
            Committed to Open Science & Knowledge Sharing
          </h2>
          <p className="section-text">
            The <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> is fully 
            committed to the principles of open access publishing. All articles published in our journal are freely available online to 
            readers worldwide without any subscription or access fees. This ensures that research findings and innovations in agriculture 
            are widely accessible, promoting global knowledge exchange, academic growth, and practical applications in farming and allied sciences.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Unlock color="#16a34a" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Free Access for All:</strong> No barriers, no fees, no restrictions - just open science 
                  accessible to everyone, everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="access-section">
          <h2 className="section-title">
            Accessibility & Free Use
          </h2>
          
          <div className="accessibility-card">
            <div className="accessibility-header">
              <Globe color="#166534" size={32} />
              <div>
                <h3 className="accessibility-title">Universal Access Rights</h3>
                <p className="accessibility-subtitle">Freedom to Access, Share, and Use</p>
              </div>
            </div>
            
            <p className="section-text">
              Our open access policy guarantees that authors, researchers, students, policymakers, and practitioners can 
              freely access all published content. This approach supports academic transparency, rapid dissemination of knowledge, 
              and equitable access to scientific literature.
            </p>
            
            <div className="responsive-grid access-grid">
              {[
                {
                  icon: <BookOpen color="#166534" size={24} />,
                  title: 'Read',
                  description: 'Access full text of all articles online'
                },
                {
                  icon: <Download color="#166534" size={24} />,
                  title: 'Download',
                  description: 'Save articles for offline reading and reference'
                },
                {
                  icon: <Share color="#166534" size={24} />,
                  title: 'Share',
                  description: 'Distribute and link to published research'
                },
                {
                  icon: <Users color="#166534" size={24} />,
                  title: 'Collaborate',
                  description: 'Use research for academic and professional purposes'
                },
                {
                  icon: <Eye color="#166534" size={24} />,
                  title: 'Print',
                  description: 'Create physical copies for educational use'
                },
                {
                  icon: <Unlock color="#166534" size={24} />,
                  title: 'No Permission',
                  description: 'Use content without prior authorization'
                }
              ].map((access, index) => (
                <div key={index} className="access-card-item">
                  <div className="access-icon">
                    {access.icon}
                  </div>
                  <h4 className="access-item-title">{access.title}</h4>
                  <p className="access-description">{access.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Licensing Section */}
        <section className="access-section">
          <h2 className="section-title">
            Licensing & Copyright
          </h2>
          
          <div className="license-card">
            <div className="license-header">
              <Scale color="#166534" size={32} />
              <div>
                <h3 className="license-title">Creative Commons Attribution (CC BY) License</h3>
                <p className="license-subtitle">Maximum Freedom with Proper Attribution</p>
              </div>
            </div>
            
            <p className="section-text">
              All published articles are licensed under the <strong className="highlight-text">Creative Commons Attribution License (CC BY)</strong>. 
              This means that users are permitted to share and adapt the material for any purpose, provided proper credit is given to the 
              original author(s) and source.
            </p>
            
            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Important:</strong> Authors retain copyright of their work while granting the journal the right to first publication. 
                This ensures maximum protection for authors while maintaining open access principles.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="access-section">
          <h2 className="section-title">
            Benefits of Open Access
          </h2>
          
          <div className="benefits-card">
            <div className="benefits-header">
              <Award color="#166534" size={32} />
              <div>
                <h3 className="benefits-title">Advancing Global Agricultural Science</h3>
                <p className="benefits-subtitle">Impact Beyond Boundaries</p>
              </div>
            </div>
            
            <div className="responsive-grid benefits-grid">
              {[
                {
                  icon: <Globe color="#166534" size={24} />,
                  title: 'Global Visibility',
                  description: 'Open access ensures that agricultural research reaches international audiences, enhancing the visibility and impact of authors\' work'
                },
                {
                  icon: <Zap color="#166534" size={24} />,
                  title: 'Faster Dissemination',
                  description: 'Researchers, institutions, and practitioners gain immediate access to new findings, accelerating innovation and practical solutions'
                },
                {
                  icon: <Users color="#166534" size={24} />,
                  title: 'Knowledge Sharing',
                  description: 'By removing access barriers, we encourage collaboration between scientists, policymakers, industry professionals, and educators'
                },
                {
                  icon: <Scale color="#166534" size={24} />,
                  title: 'Equity in Research',
                  description: 'Scholars and readers from developing countries can access the same high-quality research as those in resource-rich settings, bridging the knowledge gap'
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

        {/* Commitment Section */}
        <section className="access-section">
          <h2 className="section-title">
            Commitment to Authors & Readers
          </h2>
          
          <div className="commitment-card">
            <div className="commitment-content">
              <Heart color="#16a34a" size={28} className="commitment-icon" />
              <div className="commitment-text">
                <h3 className="commitment-title">Empowering the Global Research Community</h3>
                <p>
                  <strong className="highlight-text">IJAREI</strong> believes that open access publishing empowers both authors and readers. 
                  Authors benefit from increased citation and recognition of their work, while readers gain unrestricted access to the 
                  latest agricultural advancements.
                </p>
                <p style={{marginTop: '1rem'}}>
                  By adopting open access, the journal contributes to building a more sustainable and informed global agricultural community, 
                  fostering innovation and collaboration across borders and institutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Author & Reader Benefits */}
        <section className="access-section">
          <h2 className="section-title">
            Mutual Benefits for All Stakeholders
          </h2>
          
          <div className="responsive-grid">
            <div className="policy-section">
              <h3 className="policy-title">
                <TrendingUp color="#166534" size={24} />
                <span>Author Advantages</span>
              </h3>
              <div className="bullet-list">
                {[
                  'Increased visibility and global reach for published research',
                  'Higher citation rates due to unrestricted access',
                  'Enhanced academic reputation and recognition',
                  'Faster dissemination of research findings',
                  'Greater collaboration opportunities with international researchers'
                ].map((advantage, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="policy-section">
              <h3 className="policy-title">
                <Users color="#166534" size={24} />
                <span>Reader Benefits</span>
              </h3>
              <div className="bullet-list">
                {[
                  'Free access to cutting-edge agricultural research',
                  'No subscription fees or institutional barriers',
                  'Immediate availability of new research findings',
                  'Freedom to share and use content for educational purposes',
                  'Equal access regardless of geographic location or economic status'
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

        {/* Final Statement */}
        <section className="access-section">
          <div className="final-statement-card">
            <div className="final-statement-content">
              <Globe color="#16a34a" size={32} className="final-statement-icon" />
              <div className="final-statement-text">
                <h3 className="final-statement-title">Building a Better Future Through Open Science</h3>
                <p>
                  Our commitment to open access reflects our belief that scientific knowledge should be a global public good. 
                  By ensuring free and unrestricted access to agricultural research, <strong className="highlight-text">IJAREI</strong> 
                  contributes to solving global challenges in food security, sustainable agriculture, and environmental conservation.
                </p>
                <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                  "Knowledge shared is knowledge multiplied. Together, we advance agricultural science for the benefit of all."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default OpenAccessPolicy;