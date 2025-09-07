import React from 'react';
import { Shield, Eye, Globe, AlertTriangle, Users, FileText, RotateCcw, FileX, Calendar, Mail, BookOpen, Award, Target, Search, CheckCircle, Star, TrendingUp } from 'lucide-react';

// Content data - easily updatable for backend integration
const CONTENT_DATA = {
  hero: {
    title: "About the Journal",
  },

  aboutJournal: {
    title: "About the Journal",
    content: "Our journal is a peer-reviewed, open-access academic publication dedicated to fostering scholarly dialogue, advancing research, and promoting the dissemination of knowledge across diverse fields of study. We serve as a trusted platform for researchers, academicians, professionals, and students to present original findings, review critical developments, and contribute to the global exchange of innovative ideas.\n\nWith a commitment to academic excellence, our editorial board upholds the highest standards of quality, ensuring that every published paper meets rigorous research, ethical, and methodological benchmarks. We encourage submissions from both established scholars and early-career researchers, aiming to create a dynamic and inclusive academic environment."
  },

  scope: {
    title: "Scope of the Journal",
    intro: "Our journal covers a broad spectrum of disciplines, ensuring a multidisciplinary approach to knowledge sharing. Topics include but are not limited to:",
    categories: [
      {
        title: "Science and Technology",
        description: "Innovations in engineering, applied sciences, computing, biotechnology, and environmental sciences.",
        icon: <Search />
      },
      {
        title: "Humanities and Social Sciences", 
        description: "Literature, history, sociology, education, linguistics, philosophy, and cultural studies.",
        icon: <BookOpen />
      },
      {
        title: "Business and Economics",
        description: "Strategic management, marketing, finance, entrepreneurship, and economic policy analysis.",
        icon: <TrendingUp />
      },
      {
        title: "Health and Medical Research",
        description: "Clinical studies, public health initiatives, medical advancements, and healthcare policy.",
        icon: <Shield />
      }
    ]
  },

  aimMission: {
    title: "Aim and Mission",
    intro: "The primary aim of the journal is to provide a credible, accessible, and globally recognized publication space for researchers and scholars. Our mission is to:",
    missions: [
      {
        title: "Promote Quality Research",
        description: "By publishing rigorously peer-reviewed articles.",
        icon: <Eye />
      },
      {
        title: "Encourage Global Collaboration",
        description: "Connecting researchers from different cultures, nations, and academic traditions.",
        icon: <Globe />
      },
      {
        title: "Enhance Knowledge Accessibility",
        description: "Making research freely available to a worldwide audience under our open-access policy.",
        icon: <FileText />
      }
    ]
  },

  submissionPolicy: {
    title: "Submission and Publication Policy",
    content: "We welcome high-quality original research articles, review papers, short communications, and case studies. Every submission undergoes a structured peer-review process involving domain experts who evaluate the manuscript's originality, methodology, relevance, and contribution to the field.\n\nAccepted papers are promptly published online, ensuring timely dissemination of research. Our editorial policy emphasizes transparency, plagiarism-free content, and adherence to international citation and formatting guidelines."
  },

  whyPublish: {
    title: "Why Publish With Us?",
    benefits: [
      {
        title: "Global Readership",
        description: "Your work will be accessible to researchers, practitioners, and institutions worldwide.",
        icon: <Globe />
      },
      {
        title: "Visibility and Impact",
        description: "Indexed in leading databases, ensuring greater reach and citation potential.",
        icon: <TrendingUp />
      },
      {
        title: "Expert Review Process",
        description: "Constructive feedback from experienced reviewers to improve the quality of your work.",
        icon: <Users />
      },
      {
        title: "Ethical Publishing Standards",
        description: "Compliance with COPE guidelines and best practices in academic publishing.",
        icon: <Shield />
      }
    ]
  },

  indexing: {
    title: "Indexing and Abstracting",
    content: "Our journal is actively working towards inclusion in reputed indexing and abstracting services to enhance research visibility and author recognition. Indexed papers gain higher citation counts and academic credibility, contributing to the career advancement of our authors."
  },

  community: {
    title: "Join Our Academic Community",
    content: "Whether you are an author, reviewer, or reader, our journal invites you to be part of an engaged, global network of knowledge creators. Together, we can advance research, encourage intellectual curiosity, and make meaningful contributions to society through evidence-based knowledge."
  }
};

const AboutUs = () => {
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
      color: 'rgba(220, 252, 231, 0.9)',
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
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: 'white',
      color: '#166534',
      textDecoration: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      margin: '0 0.5rem'
    },
    ctaButtonSecondary: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white'
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
            About the Journal
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
            About the Journal
          </h2>
          <p style={styles.text}>
            The <strong style={styles.highlightText}>International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong> is 
            a peer-reviewed, open-access academic publication dedicated to fostering scholarly dialogue, advancing research, and promoting the 
            dissemination of knowledge across diverse fields of agricultural study.
          </p>
          
          <div style={styles.alertCard}>
            <div style={styles.alertContent}>
              <Shield color="#16a34a" size={24} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
              <div>
                <p style={{ color: '#166534', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                  <strong>Academic Excellence:</strong> We serve as a trusted platform for researchers, academicians, 
                  professionals, and students to present original findings and contribute to the global exchange of innovative ideas.
                </p>
              </div>
            </div>
          </div>
          
          <p style={styles.text}>
            With a commitment to academic excellence, our editorial board upholds the highest standards of quality, ensuring that 
            every published paper meets rigorous research, ethical, and methodological benchmarks. We encourage submissions from both 
            established scholars and early-career researchers, aiming to create a dynamic and inclusive academic environment.
          </p>
        </section>

        {/* Scope Section */}
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
              Our journal covers a broad spectrum of disciplines, ensuring a multidisciplinary approach to knowledge sharing. Topics include but are not limited to:
            </p>
            <div style={styles.grid} className="research-grid">
              {CONTENT_DATA.scope.categories.map((category, index) => (
                <div key={index} style={styles.listItem}>
                  {React.cloneElement(category.icon, { color: "#166534", size: 20, style: { marginTop: '0.25rem', flexShrink: 0 } })}
                  <div>
                    <p style={{ color: '#1a202c', margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                      {category.title}
                    </p>
                    <p style={{ color: '#4a5568', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aim and Mission Section */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Aim and Mission
          </h2>
          <p style={styles.text}>
            The primary aim of the journal is to provide a <strong style={styles.highlightText}>credible, accessible, and globally recognized</strong> publication 
            space for researchers and scholars. Our mission is to:
          </p>
          
          <div>
            {CONTENT_DATA.aimMission.missions.map((mission, index) => (
              <div key={index} style={styles.policySection}>
                <h3 style={styles.policyTitle}>
                  <span style={{ flexShrink: 0 }}>
                    {React.cloneElement(mission.icon, { color: "#166534", size: 24 })}
                  </span>
                  <span>{mission.title}</span>
                </h3>
                <p style={{ ...styles.text, margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Submission Policy Section */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Submission and Publication Policy
          </h2>
          
          <div style={styles.policySection}>
            <h3 style={styles.policyTitle}>
              <FileText color="#166534" size={24} style={{ flexShrink: 0 }} />
              Submission Guidelines
            </h3>
            <p style={styles.text}>
              We welcome high-quality <strong style={styles.highlightText}>original research articles, review papers, short communications, and case studies</strong>. 
              Every submission undergoes a structured peer-review process involving domain experts who evaluate the manuscript's originality, 
              methodology, relevance, and contribution to the field.
            </p>
            <div style={styles.bulletPoint}>
              <div style={styles.bullet}></div>
              <p style={{ color: '#4a5568', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                Accepted papers are promptly published online, ensuring timely dissemination of research
              </p>
            </div>
            <div style={styles.bulletPoint}>
              <div style={styles.bullet}></div>
              <p style={{ color: '#4a5568', margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                Our editorial policy emphasizes transparency, plagiarism-free content, and adherence to international guidelines
              </p>
            </div>
          </div>
        </section>

        {/* Why Publish Section */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Why Publish With Us?
          </h2>
          
          <div style={styles.grid} className="responsive-grid">
            {CONTENT_DATA.whyPublish.benefits.map((benefit, index) => (
              <div key={index} style={styles.card}>
                {React.cloneElement(benefit.icon, { color: "#166534", size: 24, style: { marginTop: '0.25rem', flexShrink: 0 } })}
                <div>
                  <h3 style={styles.cardTitle}>{benefit.title}</h3>
                  <p style={styles.cardDesc}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Indexing Section */}
        <section style={styles.section} className="section">
          <h2 style={styles.sectionTitle}>
            Indexing and Abstracting
          </h2>
          
          <div style={styles.policySection}>
            <h3 style={styles.policyTitle}>
              <Award color="#166534" size={24} style={{ flexShrink: 0 }} />
              Database Inclusion
            </h3>
            <p style={{ ...styles.text, margin: 0, fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
              Our journal is actively working towards inclusion in reputed <strong style={styles.highlightText}>indexing and abstracting services</strong> to 
              enhance research visibility and author recognition. Indexed papers gain higher citation counts and academic credibility, 
              contributing to the career advancement of our authors.
            </p>
          </div>
        </section>

        {/* Community Section - CTA */}
        <section style={styles.section} className="section">
          <div style={styles.contactSection}>
            <h2 style={styles.contactTitle}>
              Join Our Academic Community
            </h2>
            <p style={{ ...styles.text, textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
              Whether you are an author, reviewer, or reader, our journal invites you to be part of an engaged, 
              global network of knowledge creators. Together, we can advance research, encourage intellectual curiosity, 
              and make meaningful contributions to society through evidence-based knowledge.
            </p>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={styles.ctaButton}>
                <FileText size={16} />
                Submit Your Research
              </button>
              <button style={{ ...styles.ctaButton, ...styles.ctaButtonSecondary }}>
                <Users size={16} />
                Join as Reviewer
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.section} className="section">
          <div style={styles.contactSection}>
            <h2 style={styles.contactTitle}>
              Contact Our Editorial Team
            </h2>
            <p style={{ ...styles.text, textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
              For inquiries regarding submissions, editorial policies, or any journal-related questions, 
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

export default AboutUs;