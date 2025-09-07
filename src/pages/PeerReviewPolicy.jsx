import React from 'react';
import { Shield, Users, CheckCircle, FileText, Eye, Clock, Award, AlertTriangle, Target, Zap, RefreshCw, BookOpen } from 'lucide-react';
import '../styles/PeerReviewPolicy.css';

const PeerReviewPolicy = () => {
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

      // Update process grid
      const processGrids = document.querySelectorAll('.process-grid');
      processGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      });

      // Update decision grid
      const decisionGrids = document.querySelectorAll('.decision-grid');
      decisionGrids.forEach(grid => {
        if (width >= 1024) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (width >= 640) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
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
    };

    updateResponsiveStyles();
    window.addEventListener('resize', updateResponsiveStyles);
    
    return () => window.removeEventListener('resize', updateResponsiveStyles);
  }, []);

  return (
    <div className="review-container">
      {/* Header */}
      <header className="review-header">
        <div className="header-content">
          <h1 className="header-title">
            Peer Review Policy
          </h1>
          <p className="review-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="review-main">
        
        {/* Introduction Section */}
        <section className="review-section">
          <h2 className="section-title">
            Commitment to Academic Excellence & Integrity
          </h2>
          <p className="section-text">
            At the <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>, 
            we are committed to maintaining the highest standards of academic integrity, transparency, and quality in the dissemination of scholarly work. 
            Peer review is at the core of our publication process and ensures that all submitted manuscripts are evaluated fairly, rigorously, 
            and without bias. This process not only strengthens the credibility of our journal but also upholds the trust of the academic community, 
            readers, and authors.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <Shield color="#dc2626" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Quality Assurance:</strong> Every manuscript undergoes rigorous evaluation by subject matter experts 
                  to ensure the highest academic standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="review-section">
          <h2 className="section-title">
            Purpose of Peer Review
          </h2>
          
          <div className="purpose-card">
            <div className="purpose-header">
              <Target color="#dc2626" size={32} />
              <div>
                <h3 className="purpose-title">Ensuring Scholarly Excellence</h3>
                <p className="purpose-subtitle">Maintaining International Standards</p>
              </div>
            </div>
            
            <p className="section-text">
              The primary purpose of peer review is to evaluate the originality, accuracy, relevance, and overall contribution 
              of submitted research. By involving experts in the field, the review process ensures that published articles meet 
              internationally recognized standards of scholarship and add meaningful value to ongoing academic discourse.
            </p>
            
            <div className="responsive-grid purpose-grid">
              {[
                {
                  icon: <BookOpen color="#dc2626" size={24} />,
                  title: 'Originality Assessment',
                  description: 'Ensuring research contributes new knowledge to the field'
                },
                {
                  icon: <CheckCircle color="#dc2626" size={24} />,
                  title: 'Accuracy Verification',
                  description: 'Validating methodological rigor and data integrity'
                },
                {
                  icon: <Eye color="#dc2626" size={24} />,
                  title: 'Relevance Evaluation',
                  description: 'Assessing significance to agricultural research community'
                },
                {
                  icon: <Award color="#dc2626" size={24} />,
                  title: 'Quality Enhancement',
                  description: 'Improving manuscript quality through expert feedback'
                }
              ].map((purpose, index) => (
                <div key={index} className="purpose-card-item">
                  <div className="purpose-icon">
                    {purpose.icon}
                  </div>
                  <h4 className="purpose-item-title">{purpose.title}</h4>
                  <p className="purpose-description">{purpose.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Process Section */}
        <section className="review-section">
          <h2 className="section-title">
            Double-Blind Review Process
          </h2>
          
          <div className="process-card">
            <div className="process-header">
              <Eye color="#dc2626" size={32} />
              <div>
                <h3 className="process-title">Anonymous & Unbiased Evaluation</h3>
                <p className="process-subtitle">Ensuring Fairness and Objectivity</p>
              </div>
            </div>
            
            <p className="section-text">
              All manuscripts submitted to <strong className="highlight-text">IJAREI</strong> undergo a double-blind peer review process. 
              This system ensures maximum objectivity by maintaining anonymity between authors and reviewers throughout the evaluation process.
            </p>
            
            <div className="responsive-grid process-grid">
              {[
                {
                  icon: <FileText color="#dc2626" size={24} />,
                  title: 'Initial Editorial Assessment',
                  description: 'Editorial team evaluates manuscript suitability for journal scope and guidelines before proceeding to peer review'
                },
                {
                  icon: <Users color="#dc2626" size={24} />,
                  title: 'Expert Reviewer Assignment',
                  description: 'Suitable manuscripts are assigned to at least two independent reviewers with expertise in the relevant subject area'
                },
                {
                  icon: <Shield color="#dc2626" size={24} />,
                  title: 'Anonymous Identity Protection',
                  description: 'Both author and reviewer identities are kept completely anonymous to minimize bias and ensure objective evaluation'
                },
                {
                  icon: <CheckCircle color="#dc2626" size={24} />,
                  title: 'Comprehensive Evaluation',
                  description: 'Reviewers assess originality, methodology, clarity, validity, ethical compliance, and field contribution'
                }
              ].map((step, index) => (
                <div key={index} className="process-card-item">
                  <div className="process-icon">
                    {step.icon}
                  </div>
                  <h4 className="process-item-title">{step.title}</h4>
                  <p className="process-description">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviewer Responsibilities Section */}
        <section className="review-section">
          <h2 className="section-title">
            Reviewer Responsibilities
          </h2>
          
          <div className="responsibilities-card">
            <div className="responsibilities-header">
              <Users color="#dc2626" size={32} />
              <div>
                <h3 className="responsibilities-title">Guardians of Academic Quality</h3>
                <p className="responsibilities-subtitle">Expert Evaluation & Constructive Feedback</p>
              </div>
            </div>
            
            <p className="section-text">
              Reviewers play a vital role in safeguarding the quality of academic publishing. Their expert evaluation ensures that 
              only high-quality, ethically sound research reaches the academic community.
            </p>
            
            <div className="responsive-grid responsibilities-grid">
              {[
                {
                  icon: <CheckCircle color="#dc2626" size={24} />,
                  title: 'Objective Evaluation',
                  description: 'Providing fair, constructive, and timely assessment of manuscripts'
                },
                {
                  icon: <Eye color="#dc2626" size={24} />,
                  title: 'Strength Identification',
                  description: 'Highlighting manuscript strengths and areas requiring improvement'
                },
                {
                  icon: <Shield color="#dc2626" size={24} />,
                  title: 'Ethical Standards',
                  description: 'Ensuring proper citations, originality, and ethical compliance'
                },
                {
                  icon: <AlertTriangle color="#dc2626" size={24} />,
                  title: 'Conflict Declaration',
                  description: 'Declaring any conflicts of interest before undertaking review'
                },
                {
                  icon: <FileText color="#dc2626" size={24} />,
                  title: 'Confidentiality',
                  description: 'Treating all manuscripts as confidential documents'
                },
                {
                  icon: <Clock color="#dc2626" size={24} />,
                  title: 'Timely Response',
                  description: 'Completing reviews within specified timeframes'
                }
              ].map((responsibility, index) => (
                <div key={index} className="responsibilities-card-item">
                  <div className="responsibilities-icon">
                    {responsibility.icon}
                  </div>
                  <h4 className="responsibilities-item-title">{responsibility.title}</h4>
                  <p className="responsibilities-description">{responsibility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Decision Making Section */}
        <section className="review-section">
          <h2 className="section-title">
            Editorial Decision-Making Process
          </h2>
          
          <div className="decision-card">
            <div className="decision-header">
              <Award color="#dc2626" size={32} />
              <div>
                <h3 className="decision-title">Fair & Transparent Evaluation</h3>
                <p className="decision-subtitle">Merit-Based Decision Making</p>
              </div>
            </div>
            
            <p className="section-text">
              Based on the reviewers' recommendations, the editorial board makes informed decisions that ensure only 
              high-quality research is published. Authors receive prompt notification with constructive feedback 
              to guide any necessary revisions.
            </p>
            
            <div className="responsive-grid decision-grid">
              {[
                {
                  icon: <CheckCircle color="#16a34a" size={24} />,
                  title: 'Accept without Revisions',
                  description: 'The manuscript meets all standards and is ready for publication in its current form',
                  color: '#16a34a'
                },
                {
                  icon: <Zap color="#eab308" size={24} />,
                  title: 'Accept with Minor Revisions',
                  description: 'The manuscript requires small changes before publication can proceed',
                  color: '#eab308'
                },
                {
                  icon: <RefreshCw color="#f59e0b" size={24} />,
                  title: 'Major Revisions Required',
                  description: 'The manuscript shows potential but needs significant improvements before reconsideration',
                  color: '#f59e0b'
                },
                {
                  icon: <AlertTriangle color="#dc2626" size={24} />,
                  title: 'Reject',
                  description: 'The manuscript does not meet the journal\'s standards or scope requirements',
                  color: '#dc2626'
                }
              ].map((decision, index) => (
                <div key={index} className="decision-card-item" style={{borderColor: decision.color}}>
                  <div className="decision-icon">
                    {decision.icon}
                  </div>
                  <h4 className="decision-item-title" style={{color: decision.color}}>{decision.title}</h4>
                  <p className="decision-description">{decision.description}</p>
                </div>
              ))}
            </div>
            
            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Conflict Resolution:</strong> In cases of conflicting reviewer reports, the editor may seek 
                additional expert opinions to ensure a fair and balanced outcome.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency & Ethics Section */}
        <section className="review-section">
          <h2 className="section-title">
            Transparency, Integrity & Ethical Standards
          </h2>
          
          <div className="responsive-grid">
            <div className="policy-section">
              <h3 className="policy-title">
                <Shield color="#dc2626" size={24} />
                <span>Transparency & Integrity</span>
              </h3>
              <p className="policy-text">
                Our journal is dedicated to ensuring transparency in the peer review process. We carefully monitor 
                the quality of reviews and provide guidance to reviewers when necessary. The editorial board ensures 
                that decisions are made solely on academic merit, free from personal, institutional, or commercial bias.
              </p>
              <div className="bullet-list">
                {[
                  'Regular monitoring of review quality and consistency',
                  'Guidance and training provided to reviewers',
                  'Decisions based solely on academic merit',
                  'Freedom from personal or institutional bias',
                  'Transparent communication with authors'
                ].map((point, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="policy-section">
              <h3 className="policy-title">
                <AlertTriangle color="#dc2626" size={24} />
                <span>Ethical Considerations</span>
              </h3>
              <p className="policy-text">
                We strictly follow international ethical publishing standards, including those set by the Committee 
                on Publication Ethics (COPE). Manuscripts that fail to meet ethical requirements are rejected outright, 
                ensuring the integrity of published research.
              </p>
              <div className="bullet-list">
                {[
                  'Zero tolerance for plagiarism and data fabrication',
                  'Prevention of duplicate submissions',
                  'Strict adherence to COPE guidelines',
                  'Ethical research practices verification',
                  'Immediate rejection of non-compliant manuscripts'
                ].map((standard, index) => (
                  <div key={index} className="bullet-point">
                    <div className="bullet"></div>
                    <p className="bullet-text">{standard}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Continuous Improvement Section */}
        <section className="review-section">
          <div className="improvement-card">
            <div className="improvement-content">
              <RefreshCw color="#16a34a" size={32} className="improvement-icon" />
              <div className="improvement-text">
                <h3 className="improvement-title">Continuous Improvement & Evolution</h3>
                <p>
                  Peer review is a dynamic process that evolves with the changing landscape of academic publishing. 
                  Our journal regularly reviews and updates its policies to ensure that the process remains fair, 
                  efficient, and aligned with international best practices.
                </p>
                <p style={{marginTop: '1rem'}}>
                  We actively welcome feedback from authors, reviewers, and readers to further strengthen our editorial system 
                  and maintain our commitment to excellence in agricultural research publication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Statement */}
        <section className="review-section">
          <div className="final-statement-card">
            <div className="final-statement-content">
              <Award color="#16a34a" size={32} className="final-statement-icon" />
              <div className="final-statement-text">
                <h3 className="final-statement-title">Upholding Trust in Agricultural Research</h3>
                <p>
                  Through our rigorous peer review process, <strong className="highlight-text">IJAREI</strong> ensures that 
                  every published article contributes meaningfully to the advancement of agricultural science. We remain 
                  committed to fostering trust, transparency, and excellence in scholarly communication.
                </p>
                <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                  "Excellence in research deserves excellence in review - together we advance agricultural science."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default PeerReviewPolicy;