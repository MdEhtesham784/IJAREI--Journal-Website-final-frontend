import React from 'react';
import { Shield, Eye, Globe, AlertTriangle, Users, FileText, RotateCcw, FileX, Calendar, Mail } from 'lucide-react';

const EditorialPoliciesPage = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6'
    },
    header: {
      backgroundColor: '#166534',
      color: 'white',
      padding: '4rem 1rem 3rem',
      textAlign: 'center'
    },
    headerContent: {
      maxWidth: '64rem',
      margin: '0 auto'
    },
    headerTitle: {
      fontSize: 'clamp(2rem, 5vw, 3.75rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      lineHeight: '1.1'
    },
    headerSubtitle: {
      fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
      color: '#rgba(220, 252, 231, 0.9)',
      lineHeight: '1.5'
    },
    main: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    text: {
      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
      color: '#4a5568',
      lineHeight: '1.7',
      marginBottom: '1rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    card: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'clamp(0.75rem, 2vw, 1rem)',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      backgroundColor: '#f0fdf4',
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0'
    },
    alertCard: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '0.5rem',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      marginBottom: '1.5rem'
    },
    alertContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem'
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: 'clamp(0.75rem, 2vw, 1rem)',
      backgroundColor: '#f0fdf4',
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    policySection: {
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      backgroundColor: '#f9fafb',
      marginBottom: '1.5rem'
    },
    policyTitle: {
      fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    bulletPoint: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '0.75rem'
    },
    bullet: {
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: '#166534',
      borderRadius: '50%',
      marginTop: '0.5rem',
      flexShrink: 0
    },
    highlightText: {
      fontWeight: '600',
      color: '#166534'
    },
    contactSection: {
      backgroundColor: '#f0fdf4',
      border: '2px solid #bbf7d0',
      borderRadius: '0.5rem',
      padding: 'clamp(1.5rem, 4vw, 2rem)',
      textAlign: 'center'
    },
    contactTitle: {
      fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '1rem'
    },
    contactItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0'
    },
    iconCircle: {
      width: 'clamp(2.5rem, 6vw, 3rem)',
      height: 'clamp(2.5rem, 6vw, 3rem)',
      borderRadius: '50%',
      backgroundColor: '#166534',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    link: {
      color: '#166534',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
      wordBreak: 'break-all',
      transition: 'color 0.2s ease'
    },
    linkHover: {
      color: '#14532d'
    },
    cardTitle: {
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '0.5rem',
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
    },
    cardDesc: {
      color: '#64748b',
      margin: 0,
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
      lineHeight: '1.5'
    }
  };

  // JavaScript for responsive behavior
  React.useEffect(() => {
    const updateStyles = () => {
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

      // Update research areas grid
      const researchGrids = document.querySelectorAll('.research-grid');
      researchGrids.forEach(grid => {
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

      // Update section padding
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        if (width >= 1024) {
          section.style.padding = '2rem';
        } else if (width >= 640) {
          section.style.padding = '1.5rem';
        } else {
          section.style.padding = '1rem';
        }
      });

      // Update header padding
      const headers = document.querySelectorAll('.header');
      headers.forEach(header => {
        if (width >= 1024) {
          header.style.padding = '8rem 2rem 6rem';
        } else if (width >= 640) {
          header.style.padding = '5rem 1.5rem 4rem';
        } else {
          header.style.padding = '4rem 1rem 3rem';
        }
      });
    };

    updateStyles();
    window.addEventListener('resize', updateStyles);
    
    return () => window.removeEventListener('resize', updateStyles);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header} className="header">
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>
            Editorial Policies
          </h1>
          <p style={styles.headerSubtitle}>
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        
        {/* Introduction Section */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Our Commitment to Excellence
          </h2>
          <p style={styles.text}>
            The <strong style={styles.highlightText}>International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> is 
            committed to maintaining the highest standards of academic integrity, transparency, and ethical publishing practices. 
            Our <strong style={styles.highlightText}>editorial policies</strong> are designed to ensure fairness, accuracy, and quality 
            in every stage of the publication process.
          </p>
          
          <div style={styles.alertCard}>
            <div style={styles.alertContent}>
              <Shield color="#16a34a" size={24} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
              <div>
                <p style={{ color: '#166534', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                  <strong>Quality Assurance:</strong> We follow international best practices to ensure every published article 
                  meets the highest academic and ethical standards in agricultural research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journal Scope */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Scope of the Journal
          </h2>
          <div style={styles.policySection}>
            <h3 style={styles.policyTitle}>
              <Globe color="#166534" size={24} style={{ flexShrink: 0 }} />
              Research Areas
            </h3>
            <p style={styles.text}>
              IJAREI publishes original research articles, review papers, short communications, and case studies in all areas of:
            </p>
            <div style={styles.grid} className="research-grid">
              {[
                'Agriculture & Crop Sciences',
                'Environmental Sciences',
                'Sustainable Farming Practices',
                'Agribusiness & Economics',
                'Agricultural Engineering',
                'Emerging Agricultural Innovations'
              ].map((area, index) => (
                <div key={index} style={styles.listItem}>
                  <FileText color="#166534" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                  <p style={{ color: '#4a5568', margin: 0, fontWeight: '500', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Peer Review Process */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Peer Review Process
          </h2>
          <p style={styles.text}>
            We follow a rigorous <strong style={styles.highlightText}>double-blind peer review process</strong>, ensuring that both the reviewers and authors 
            remain anonymous throughout the review to maintain objectivity and fairness.
          </p>
          
          <div>
            {[
              {
                icon: <Eye color="#166534" size={24} />,
                title: 'Initial Screening',
                description: 'All submissions are screened for plagiarism, relevance, and compliance with journal guidelines.'
              },
              {
                icon: <Users color="#166534" size={24} />,
                title: 'Review Assignment',
                description: 'Manuscripts are sent to at least two qualified reviewers with expertise in the subject area.'
              },
              {
                icon: <FileText color="#166534" size={24} />,
                title: 'Decision Making',
                description: 'Based on reviewer feedback, the editor may accept, request revisions, or reject the manuscript.'
              },
              {
                icon: <Shield color="#166534" size={24} />,
                title: 'Final Proofreading',
                description: 'Accepted manuscripts undergo a final check for formatting, grammar, and adherence to journal style.'
              }
            ].map((step, index) => (
              <div key={index} style={styles.policySection}>
                <h3 style={styles.policyTitle}>
                  <span style={{ flexShrink: 0 }}>{step.icon}</span>
                  <span>{step.title}</span>
                </h3>
                <p style={{ ...styles.text, margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Access & Ethics */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Open Access & Ethical Standards
          </h2>
          
          <div style={styles.grid} className="responsive-grid">
            <div style={styles.card}>
              <Globe color="#166534" size={24} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={styles.cardTitle}>Open Access Policy</h3>
                <p style={styles.cardDesc}>
                  IJAREI follows an <strong style={styles.highlightText}>open-access publishing model</strong>, making all published articles freely available to readers worldwide. 
                  Authors retain copyright under Creative Commons license.
                </p>
              </div>
            </div>
            
            <div style={styles.card}>
              <AlertTriangle color="#166534" size={24} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={styles.cardTitle}>Plagiarism Standards</h3>
                <p style={styles.cardDesc}>
                  All submissions are checked using advanced plagiarism detection software. 
                  Manuscripts with plagiarism above <strong>10%</strong> (excluding references) are automatically rejected.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.policySection}>
            <h3 style={styles.policyTitle}>
              <Shield color="#166534" size={24} style={{ flexShrink: 0 }} />
              Ethical Standards
            </h3>
            <div>
              {[
                'Fabrication and falsification of data are strictly prohibited',
                'Unethical research practices will result in immediate rejection',
                'All research must comply with international ethical guidelines',
                'Proper consent and approval for human/animal studies required'
              ].map((standard, index) => (
                <div key={index} style={styles.bulletPoint}>
                  <div style={styles.bullet}></div>
                  <p style={{ color: '#4a5568', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{standard}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Authorship & Conflicts */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Authorship & Conflict of Interest
          </h2>
          
          <div style={styles.grid} className="responsive-grid">
            <div style={styles.policySection}>
              <h3 style={styles.policyTitle}>
                <Users color="#166534" size={24} style={{ flexShrink: 0 }} />
                Authorship Criteria
              </h3>
              <div>
                {[
                  'Significant contribution to conception, design, or execution',
                  'Analysis and interpretation of research data',
                  'Drafting or critical revision of the manuscript',
                  'Final approval of the version to be published'
                ].map((criteria, index) => (
                  <div key={index} style={styles.bulletPoint}>
                    <div style={styles.bullet}></div>
                    <p style={{ color: '#4a5568', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{criteria}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyTitle}>
                <AlertTriangle color="#166534" size={24} style={{ flexShrink: 0 }} />
                Conflict of Interest
              </h3>
              <p style={{ ...styles.text, margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                Authors, reviewers, and editors must disclose any <strong style={styles.highlightText}>potential conflicts of interest</strong> that 
                could influence the research, review, or decision-making process. Full transparency is required.
              </p>
            </div>
          </div>
        </section>

        {/* Publication Policies */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Publication & Editorial Policies
          </h2>
          
          <div>
            {[
              {
                icon: <RotateCcw color="#166534" size={24} />,
                title: 'Retraction & Corrections Policy',
                content: [
                  'Significant errors affecting research conclusions',
                  'Proven cases of plagiarism or ethical violations',
                  'Misconduct or fraudulent data presentation'
                ]
              },
              {
                icon: <FileX color="#166534" size={24} />,
                title: 'Manuscript Withdrawal Policy',
                content: [
                  'Authors may request withdrawal before peer review begins',
                  'Withdrawal after review requires formal justification',
                  'Post-acceptance withdrawal strongly discouraged'
                ]
              },
              {
                icon: <Calendar color="#166534" size={24} />,
                title: 'Publication Frequency',
                content: [
                  'Journal published quarterly (four times per year)',
                  'Special issues for emerging agricultural trends',
                  'Continuous online publication upon acceptance'
                ]
              }
            ].map((policy, index) => (
              <div key={index} style={styles.policySection}>
                <h3 style={styles.policyTitle}>
                  <span style={{ flexShrink: 0 }}>{policy.icon}</span>
                  <span>{policy.title}</span>
                </h3>
                <div>
                  {policy.content.map((item, itemIndex) => (
                    <div key={itemIndex} style={styles.bulletPoint}>
                      <div style={styles.bullet}></div>
                      <p style={{ color: '#4a5568', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.section} className="section">
          <div style={styles.contactSection}>
            <h2 style={styles.contactTitle}>
              Contact Our Editorial Team
            </h2>
            <p style={{ ...styles.text, textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
              For inquiries regarding our editorial policies or any publication-related questions, 
              please reach out to our dedicated editorial team.
            </p>
            
            <div style={styles.contactItem} className="contact-item">
              <div style={styles.iconCircle}>
                <Mail color="white" size={24} />
              </div>
              <div>
                <p style={{ color: '#64748b', margin: '0 0 0.25rem 0', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>Editorial Correspondence</p>
                <a 
                  href="mailto:editor.ijterdjournal@gmail.com" 
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
                  onMouseLeave={(e) => e.target.style.color = styles.link.color}
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

export default EditorialPoliciesPage;