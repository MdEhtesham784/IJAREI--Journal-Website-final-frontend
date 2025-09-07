import React from 'react';
import { Shield, AlertTriangle, FileText, Users, Eye, Award, CheckCircle, XCircle, AlertCircle, Scale, Search, BookOpen } from 'lucide-react';
import '../styles/PlagiarismPolicy.css';

const PlagiarismPolicy = () => {
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

      // Update types grid
      const typesGrids = document.querySelectorAll('.types-grid');
      typesGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update screening grid
      const screeningGrids = document.querySelectorAll('.screening-grid');
      screeningGrids.forEach(grid => {
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
    <div className="plagiarism-container">
      {/* Header */}
      <header className="plagiarism-header">
        <div className="header-content">
          <h1 className="header-title">
            Plagiarism Policy
          </h1>
          <p className="plagiarism-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="plagiarism-main">
        
        {/* Introduction Section */}
        <section className="plagiarism-section">
          <h2 className="section-title">
            Upholding Academic Integrity & Ethical Publishing
          </h2>
          <p className="section-text">
            At the <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>, 
            we uphold the highest standards of academic integrity and ethical publishing. Plagiarism in any form is considered a serious 
            violation of scholarly ethics and is strictly prohibited. To maintain transparency, credibility, and originality in scientific 
            communication, IJAREI has established the following detailed plagiarism policy.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Shield color="#dc2626" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Zero Tolerance Policy:</strong> We maintain the strictest standards against plagiarism 
                  to protect scholarly integrity and original research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Definition Section */}
        <section className="plagiarism-section">
          <h2 className="section-title">
            Definition of Plagiarism
          </h2>
          
          <div className="definition-card">
            <div className="definition-header">
              <AlertTriangle color="#dc2626" size={32} />
              <div>
                <h3 className="definition-title">What Constitutes Plagiarism</h3>
                <p className="definition-subtitle">Understanding Unethical Academic Practices</p>
              </div>
            </div>
            
            <p className="section-text">
              Plagiarism is the unethical act of presenting someone else's intellectual work—whether text, ideas, data, 
              figures, or methods—without proper acknowledgment. This includes but is not limited to:
            </p>
            
            <div className="responsive-grid types-grid">
              {[
                {
                  icon: <FileText color="#dc2626" size={24} />,
                  title: 'Direct Plagiarism',
                  description: 'Copying content word-for-word without citation'
                },
                {
                  icon: <Users color="#dc2626" size={24} />,
                  title: 'Self-Plagiarism',
                  description: 'Reusing one\'s previously published work without disclosure or citation'
                },
                {
                  icon: <BookOpen color="#dc2626" size={24} />,
                  title: 'Mosaic Plagiarism',
                  description: 'Interweaving phrases or ideas from multiple sources without credit'
                },
                {
                  icon: <Eye color="#dc2626" size={24} />,
                  title: 'Improper Paraphrasing',
                  description: 'Rewriting content from another source with minimal changes but without proper attribution'
                },
                {
                  icon: <AlertCircle color="#dc2626" size={24} />,
                  title: 'Image/Data Plagiarism',
                  description: 'Using figures, tables, or datasets without permission or acknowledgment'
                }
              ].map((type, index) => (
                <div key={index} className="types-card-item">
                  <div className="types-icon">
                    {type.icon}
                  </div>
                  <h4 className="types-item-title">{type.title}</h4>
                  <p className="types-description">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screening Process Section */}
        <section className="plagiarism-section">
          <h2 className="section-title">
            Plagiarism Screening Process
          </h2>
          
          <div className="screening-card">
            <div className="screening-header">
              <Search color="#166534" size={32} />
              <div>
                <h3 className="screening-title">Comprehensive Detection & Review</h3>
                <p className="screening-subtitle">Multi-Stage Verification Process</p>
              </div>
            </div>
            
            <div className="responsive-grid screening-grid">
              {[
                {
                  icon: <Search color="#166534" size={24} />,
                  title: 'Initial Screening',
                  description: 'All submitted manuscripts are subjected to plagiarism detection using advanced software tools such as Turnitin, iThenticate, or Grammarly Premium'
                },
                {
                  icon: <AlertCircle color="#f59e0b" size={24} />,
                  title: 'Threshold Limits',
                  description: 'Below 15%: Acceptable | 15-25%: Requires revision | Above 25%: Immediate rejection'
                },
                {
                  icon: <Eye color="#7c3aed" size={24} />,
                  title: 'Editorial Verification',
                  description: 'The editorial board carefully reviews all similarity reports to distinguish between acceptable overlaps and unethical copying'
                }
              ].map((step, index) => (
                <div key={index} className="screening-card-item">
                  <div className="screening-icon">
                    {step.icon}
                  </div>
                  <h4 className="screening-item-title">{step.title}</h4>
                  <p className="screening-description">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="threshold-info">
              <h4 className="threshold-title">Similarity Index Guidelines:</h4>
              <div className="threshold-items">
                <div className="threshold-item acceptable">
                  <CheckCircle color="#16a34a" size={20} />
                  <span>Below 15%: Generally Acceptable (excluding references, tables, and standard phrases)</span>
                </div>
                <div className="threshold-item warning">
                  <AlertTriangle color="#f59e0b" size={20} />
                  <span>15-25%: Returned to authors for revision</span>
                </div>
                <div className="threshold-item rejected">
                  <XCircle color="#dc2626" size={20} />
                  <span>Above 25%: Rejected outright</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Responsibility Section */}
        <section className="plagiarism-section">
          <h2 className="section-title">
            Author's Responsibility
          </h2>
          
          <div className="responsibility-card">
            <div className="responsibility-header">
              <Users color="#166534" size={32} />
              <div>
                <h3 className="responsibility-title">Ethical Obligations of Authors</h3>
                <p className="responsibility-subtitle">Ensuring Originality and Proper Attribution</p>
              </div>
            </div>
            
            <div className="bullet-list">
              {[
                'Authors must ensure that their work is original, properly cited, and referenced according to the journal\'s guidelines',
                'If using content (text, tables, images, or figures) from previously published work, authors must obtain formal permissions and provide appropriate acknowledgments',
                'Authors submitting revised manuscripts must clearly indicate corrections if plagiarism was flagged in earlier rounds'
              ].map((responsibility, index) => (
                <div key={index} className="bullet-point">
                  <div className="bullet"></div>
                  <p className="bullet-text">{responsibility}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consequences Section */}
        <section className="plagiarism-section">
          <h2 className="section-title">
            Consequences of Plagiarism
          </h2>
          
          <div className="consequences-card">
            <div className="consequences-header">
              <Scale color="#dc2626" size={32} />
              <div>
                <h3 className="consequences-title">Strict Enforcement Measures</h3>
                <p className="consequences-subtitle">Actions Taken Against Plagiarism Violations</p>
              </div>
            </div>
            
            <p className="section-text">
              If plagiarism is detected at any stage of the publication process:
            </p>
            
            <div className="consequences-stages">
              <div className="stage-item before">
                <div className="stage-header">
                  <XCircle color="#dc2626" size={24} />
                  <h4 className="stage-title">Before Publication</h4>
                </div>
                <p className="stage-description">The manuscript will be immediately rejected.</p>
              </div>
              
              <div className="stage-item during">
                <div className="stage-header">
                  <AlertTriangle color="#f59e0b" size={24} />
                  <h4 className="stage-title">After Acceptance but Before Publication</h4>
                </div>
                <p className="stage-description">The acceptance will be withdrawn, and the paper will not be published.</p>
              </div>
              
              <div className="stage-item after">
                <div className="stage-header">
                  <AlertCircle color="#7c3aed" size={24} />
                  <h4 className="stage-title">After Publication</h4>
                </div>
                <p className="stage-description">The article will be retracted, a retraction notice will be published on the journal's website, and the author's institution will be informed.</p>
              </div>
            </div>
            
            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Important:</strong> Authors found guilty of repeated plagiarism may face permanent blacklisting from future submissions to IJAREI.
              </p>
            </div>
          </div>
        </section>

        {/* Publisher Commitment Section */}
        <section className="plagiarism-section">
          <h2 className="section-title">
            Publisher's Commitment
          </h2>
          
          <div className="commitment-card">
            <div className="commitment-content">
              <Award color="#16a34a" size={28} className="commitment-icon" />
              <div className="commitment-text">
                <h3 className="commitment-title">Fostering Academic Excellence</h3>
                <p>
                  <strong className="highlight-text">IJAREI</strong> is committed to fostering a culture of honesty, originality, 
                  and accountability in agricultural research. By enforcing a strict plagiarism policy, we aim to:
                </p>
                
                <div className="commitment-goals" style={{marginTop: '1rem'}}>
                  <div className="goal-item">
                    <CheckCircle color="#16a34a" size={16} />
                    <span>Protect the rights of original authors and researchers</span>
                  </div>
                  <div className="goal-item">
                    <CheckCircle color="#16a34a" size={16} />
                    <span>Promote the publication of authentic and innovative scientific work</span>
                  </div>
                  <div className="goal-item">
                    <CheckCircle color="#16a34a" size={16} />
                    <span>Ensure the credibility of the journal as a trusted platform for agricultural research</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Declaration Section */}
        <section className="plagiarism-section">
          <div className="declaration-card">
            <div className="declaration-content">
              <Shield color="#16a34a" size={32} className="declaration-icon" />
              <div className="declaration-text">
                <h3 className="declaration-title">Author Declaration</h3>
                <p>
                  By submitting a manuscript to <strong className="highlight-text">IJAREI</strong>, authors acknowledge that 
                  their work is original, free from plagiarism, and complies with the ethical standards outlined in this policy.
                </p>
                <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                  "Integrity in research is not just a policy—it's the foundation of scientific progress and trust."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default PlagiarismPolicy;