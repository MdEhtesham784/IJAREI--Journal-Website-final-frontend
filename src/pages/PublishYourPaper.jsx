import React from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  FileText, 
  Globe, 
  Users, 
  Shield, 
  Star, 
  TrendingUp, 
  Zap, 
  Clock,
  Database,
  Eye,
  Beaker,
  Leaf,
  BarChart3,
  Microscope,
  Edit,
  Send,
  Search,
  MessageSquare,
  Award,
  Lightbulb,
  Target
} from 'lucide-react';
import '../styles/PublishPaper.css';

const PublishPaper = () => {
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

      // Update areas grid
      const areasGrids = document.querySelectorAll('.areas-grid');
      areasGrids.forEach(grid => {
        if (width >= 1024) {
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
    <div className="publish-container">
      {/* Header */}
      <header className="publish-header">
        <div className="header-content">
          <h1 className="header-title">
            Publish Your Paper
          </h1>
          <p className="publish-header-subtitle">
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="publish-main">
        
        {/* Introduction Section */}
        <section className="publish-section">
          <h2 className="section-title">
            Global Platform for Agricultural Innovation
          </h2>
          <p className="section-text">
            The <strong className="highlight-text">International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> warmly 
            invites researchers, scholars, and professionals from around the globe to submit their original research contributions for publication. 
            Our journal provides a global platform for advancing knowledge in agricultural sciences, innovative practices, and emerging technologies 
            that shape the future of sustainable farming, food security, and rural development.
          </p>
          
          <div className="alert-card">
            <div className="alert-content">
              <BookOpen color="#d97706" size={24} className="alert-icon" />
              <div>
                <p className="alert-text">
                  <strong>Open Access Journal:</strong> Your research reaches both academics and practitioners worldwide 
                  without subscription barriers, ensuring maximum impact and visibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Publish Section */}
        <section className="publish-section">
          <h2 className="section-title">
            Why Publish with IJAREI?
          </h2>
          
          <div className="why-publish-card">
            <div className="why-publish-header">
              <Star color="#d97706" size={32} />
              <div>
                <h3 className="why-publish-title">Excellence in Publication Standards</h3>
                <p className="why-publish-subtitle">Professional Publishing Experience</p>
              </div>
            </div>
            
            <div className="responsive-grid benefits-grid">
              {[
                {
                  icon: <Globe color="#d97706" size={24} />,
                  title: 'Global Reach',
                  description: 'Your paper will be accessible to a worldwide audience through our open-access platform, ensuring maximum visibility and impact'
                },
                {
                  icon: <Shield color="#d97706" size={24} />,
                  title: 'Rigorous Peer Review',
                  description: 'Each manuscript undergoes a transparent double-blind peer review process to maintain high academic standards and credibility'
                },
                {
                  icon: <Clock color="#d97706" size={24} />,
                  title: 'Fast Processing',
                  description: 'With our streamlined editorial system, authors receive timely feedback and prompt publication decisions without compromising quality'
                },
                {
                  icon: <Database color="#d97706" size={24} />,
                  title: 'Indexing & Visibility',
                  description: 'Published articles are indexed in major databases, making your work discoverable by scholars, practitioners, and policymakers'
                },
                {
                  icon: <Eye color="#d97706" size={24} />,
                  title: 'No Barriers to Knowledge',
                  description: 'We support free access to scientific knowledge, ensuring your research reaches both academics and practitioners'
                }
              ].map((benefit, index) => (
                <div key={index} className="benefits-card-item">
                  <div className="benefits-icon">
                    <CheckCircle color="#16a34a" size={20} className="check-icon" />
                    {benefit.icon}
                  </div>
                  <h4 className="benefits-item-title">{benefit.title}</h4>
                  <p className="benefits-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas of Publication Section */}
        <section className="publish-section">
          <h2 className="section-title">
            Areas of Publication
          </h2>
          
          <div className="areas-card">
            <div className="areas-header">
              <Microscope color="#7c3aed" size={32} />
              <div>
                <h3 className="areas-title">Research Domains & Specializations</h3>
                <p className="areas-subtitle">Wide Range of Agricultural Sciences</p>
              </div>
            </div>
            
            <div className="responsive-grid areas-grid">
              {[
                {
                  icon: <Beaker color="#7c3aed" size={24} />,
                  title: 'Crop Science and Production',
                  description: 'Research on crop improvement, breeding techniques, and production optimization'
                },
                {
                  icon: <Microscope color="#7c3aed" size={24} />,
                  title: 'Agricultural Biotechnology',
                  description: 'Cutting-edge biotechnology applications in agriculture and food systems'
                },
                {
                  icon: <Leaf color="#7c3aed" size={24} />,
                  title: 'Soil and Water Management',
                  description: 'Sustainable management practices for soil health and water conservation'
                },
                {
                  icon: <Globe color="#7c3aed" size={24} />,
                  title: 'Climate-Smart Agriculture',
                  description: 'Adaptation and mitigation strategies for climate change in agriculture'
                },
                {
                  icon: <Users color="#7c3aed" size={24} />,
                  title: 'Food Security and Nutrition',
                  description: 'Research on food systems, nutrition, and global food security challenges'
                },
                {
                  icon: <BarChart3 color="#7c3aed" size={24} />,
                  title: 'Agricultural Economics',
                  description: 'Economic analysis, policy research, and market studies in agriculture'
                },
                {
                  icon: <Zap color="#7c3aed" size={24} />,
                  title: 'Precision Agriculture',
                  description: 'Technology-driven farming solutions and emerging agricultural innovations'
                },
                {
                  icon: <TrendingUp color="#7c3aed" size={24} />,
                  title: 'Sustainable Farming',
                  description: 'Environmentally friendly farming practices and sustainable agriculture systems'
                }
              ].map((area, index) => (
                <div key={index} className="areas-card-item">
                  <div className="areas-icon">
                    {area.icon}
                  </div>
                  <h4 className="areas-item-title">{area.title}</h4>
                  <p className="areas-description">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types of Manuscripts Section */}
        <section className="publish-section">
          <h2 className="section-title">
            Types of Manuscripts Accepted
          </h2>
          
          <div className="manuscript-card">
            <div className="manuscript-header">
              <FileText color="#16a34a" size={32} />
              <div>
                <h3 className="manuscript-title">Diverse Publication Formats</h3>
                <p className="manuscript-subtitle">Multiple Ways to Share Your Research</p>
              </div>
            </div>
            
            <div className="bullet-list">
              {[
                'Original Research Articles - Comprehensive studies with novel findings',
                'Review Papers - Systematic reviews and meta-analyses of current research',
                'Short Communications - Brief reports of significant preliminary findings',
                'Case Studies - Real-world applications and field experiences',
                'Technical Notes - Methodology improvements and technical innovations',
                'Perspective and Opinion Pieces - Expert viewpoints on emerging trends'
              ].map((type, index) => (
                <div key={index} className="bullet-point">
                  <CheckCircle color="#16a34a" size={20} className="bullet-icon" />
                  <p className="bullet-text">{type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Submit Section */}
        <section className="publish-section">
          <h2 className="section-title">
            How to Submit Your Paper
          </h2>
          
          <div className="submission-card">
            <div className="submission-header">
              <Send color="#dc2626" size={32} />
              <div>
                <h3 className="submission-title">Step-by-Step Submission Process</h3>
                <p className="submission-subtitle">From Preparation to Publication</p>
              </div>
            </div>
            
            <div className="responsive-grid steps-grid">
              {[
                {
                  step: '1',
                  icon: <Edit color="#dc2626" size={24} />,
                  title: 'Prepare Your Manuscript',
                  description: 'Follow the Author Guidelines carefully to ensure your paper meets our formatting and referencing requirements'
                },
                {
                  step: '2',
                  icon: <Send color="#dc2626" size={24} />,
                  title: 'Online Submission',
                  description: 'Submit your manuscript through our Submission Portal or via email to the editorial office'
                },
                {
                  step: '3',
                  icon: <Search color="#dc2626" size={24} />,
                  title: 'Initial Screening',
                  description: 'The editorial team will conduct a preliminary check for scope, formatting, and plagiarism'
                },
                {
                  step: '4',
                  icon: <MessageSquare color="#dc2626" size={24} />,
                  title: 'Peer Review',
                  description: 'Manuscripts are sent to expert reviewers for evaluation of originality, methodology, and contribution'
                },
                {
                  step: '5',
                  icon: <Award color="#dc2626" size={24} />,
                  title: 'Decision & Publication',
                  description: 'After the review process, accepted papers are published online and assigned a DOI'
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

            <div className="highlight-box">
              <p className="highlight-box-text">
                <strong>Author Support:</strong> Our editorial team is committed to assisting authors throughout the submission process. 
                From formatting assistance to responding to reviewer comments, we aim to make publishing a rewarding and professional experience.
              </p>
            </div>
          </div>
        </section>

        {/* Author Support Section */}
        <section className="publish-section">
          <h2 className="section-title">
            Author Support & Benefits
          </h2>
          
          <div className="bullet-list">
            {[
              'Comprehensive author guidelines and formatting templates',
              'Dedicated editorial support throughout the submission process',
              'Professional assistance with manuscript preparation and revision',
              'Timely communication and transparent review process',
              'Free publication certificate upon successful publication',
              'Global indexing and maximum research visibility'
            ].map((support, index) => (
              <div key={index} className="bullet-point">
                <CheckCircle color="#16a34a" size={20} className="bullet-icon" />
                <p className="bullet-text">{support}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="publish-section">
          <div className="cta-card">
            <div className="cta-content">
              <Target color="#d97706" size={32} className="cta-icon" />
              <div className="cta-text">
                <h3 className="cta-title">Call for Papers – Ongoing</h3>
                <p>
                  <strong className="highlight-text">IJAREI</strong> invites submissions on a rolling basis. 
                  Researchers, academics, and industry experts are encouraged to share their innovations, fieldwork, 
                  and theoretical contributions that can help address pressing challenges in agriculture.
                </p>
                <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                  "By publishing with IJAREI, your work becomes part of a global effort to drive innovation, 
                  sustainability, and knowledge-sharing in agriculture and allied sciences."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default PublishPaper;