import React from 'react';
import { Mail, MessageCircle, CheckCircle, FileText, Users, Globe } from 'lucide-react';

const AuthorGuidelines = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6'
    },
    header: {
      backgroundColor: '#166534', // Changed from '#1e3a8a'
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
      color: '#dcfce7', // Changed from '#dbeafe'
      lineHeight: '1.5'
    },
    main: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '1.5rem 1rem',
      '@media (min-width: 768px)': {
        padding: '3rem 1.5rem'
      }
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      '@media (min-width: 768px)': {
        padding: '2rem',
        marginBottom: '2rem'
      }
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
      textAlign: 'center',
      lineHeight: '1.3',
      '@media (min-width: 768px)': {
        fontSize: '1.875rem'
      }
    },
    text: {
      fontSize: '1rem',
      color: '#374151',
      lineHeight: '1.7',
      marginBottom: '1rem',
      '@media (min-width: 768px)': {
        fontSize: '1.125rem'
      }
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      marginBottom: '1.5rem',
      '@media (min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem'
      }
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      marginBottom: '1.5rem',
      '@media (min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        marginBottom: '2rem'
      }
    },
    card: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#f0fdf4', // Changed from '#eff6ff'
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0', // Changed from '#bfdbfe'
      flexDirection: 'column',
      textAlign: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        textAlign: 'left',
        gap: '1rem'
      }
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem',
      justifyContent: 'center',
      '@media (min-width: 640px)': {
        justifyContent: 'flex-start',
        marginBottom: '0'
      }
    },
    cardTitle: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '1rem',
      margin: '0',
      '@media (min-width: 768px)': {
        fontSize: '1.125rem'
      }
    },
    cardText: {
      color: '#6b7280',
      fontSize: '0.875rem',
      lineHeight: '1.5',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    alertCard: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '0.5rem',
      padding: '1rem'
    },
    alertContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      flexDirection: 'column',
      textAlign: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        textAlign: 'left'
      }
    },
    alertText: {
      color: '#166534',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    languageCard: {
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb'
    },
    languageTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    languageFont: {
      fontSize: '0.75rem',
      color: '#6b7280',
      '@media (min-width: 768px)': {
        fontSize: '0.875rem'
      }
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#f0fdf4', // Changed from '#eff6ff'
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    listItemContent: {
      flex: 1
    },
    structureSection: {
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      marginBottom: '1.5rem',
      '@media (min-width: 768px)': {
        padding: '1.5rem'
      }
    },
    structureTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      '@media (min-width: 768px)': {
        fontSize: '1.25rem'
      }
    },
    bulletPoint: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    bullet: {
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: '#166534', // Changed from '#2563eb'
      borderRadius: '50%',
      marginTop: '0.5rem',
      flexShrink: 0
    },
    bulletText: {
      color: '#374151',
      margin: 0,
      fontSize: '0.875rem',
      lineHeight: '1.6',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    ctaSection: {
      backgroundColor: '#f0fdf4', // Changed from '#eff6ff'
      border: '2px solid #bbf7d0', // Changed from '#bfdbfe'
      borderRadius: '0.5rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        padding: '2rem',
        marginBottom: '2rem'
      }
    },
    ctaTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
      lineHeight: '1.3',
      '@media (min-width: 768px)': {
        fontSize: '1.875rem'
      }
    },
    ctaSubtitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#166534', // Changed from '#1e3a8a'
      marginBottom: '1rem',
      '@media (min-width: 768px)': {
        fontSize: '1.25rem'
      }
    },
    feesCard: {
      backgroundColor: 'white',
      border: '1px solid #bfdbfe',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginTop: '1.5rem',
      '@media (min-width: 768px)': {
        padding: '1.5rem'
      }
    },
    feesTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      textAlign: 'center',
      marginBottom: '1.5rem',
      '@media (min-width: 768px)': {
        fontSize: '1.5rem'
      }
    },
    feeItem: {
      textAlign: 'center',
      padding: '1.25rem',
      backgroundColor: '#f0fdf4', // Changed from '#eff6ff'
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0',
      '@media (min-width: 768px)': {
        padding: '1.5rem'
      }
    },
    feeAmount: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#166534', // Changed from '#1e3a8a'
      marginBottom: '0.5rem',
      '@media (min-width: 768px)': {
        fontSize: '2rem'
      }
    },
    feeLabel: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    feeDescription: {
      color: '#6b7280',
      margin: 0,
      fontSize: '0.75rem',
      '@media (min-width: 768px)': {
        fontSize: '0.875rem'
      }
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.25rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      flexDirection: 'column',
      textAlign: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        textAlign: 'left',
        padding: '1.5rem'
      }
    },
    iconCircle: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      '@media (min-width: 768px)': {
        width: '3rem',
        height: '3rem'
      }
    },
    blueIcon: {
       backgroundColor: '#166534'
    },
    greenIcon: {
      backgroundColor: '#16a34a'
    },
    contactTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.25rem',
      fontSize: '0.875rem',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    link: {
      color: '#166534', // Changed from '#2563eb'
      textDecoration: 'none',
      fontSize: '0.875rem',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    greenLink: {
      color: '#16a34a',
      textDecoration: 'none',
      fontSize: '0.875rem',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    additionalTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      '@media (min-width: 768px)': {
        fontSize: '1.25rem'
      }
    }
  };

  // Function to get responsive styles
  const getResponsiveStyle = (baseStyle) => {
    return baseStyle;
  };

  React.useEffect(() => {
    const updateStyles = () => {
      const width = window.innerWidth;

      // Header padding
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
            Instructions to Authors
          </h1>
          <p style={styles.headerSubtitle}>
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={getResponsiveStyle(styles.main)}>

        {/* Introduction Section */}
        <section style={getResponsiveStyle(styles.section)}>
          <h2 style={getResponsiveStyle(styles.sectionTitle)}>
            Manuscript Submission Guidelines
          </h2>
          <p style={getResponsiveStyle(styles.text)}>
            The <strong>International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>
            invites high-quality, original research manuscripts in the fields of agriculture, agricultural technology,
            crop science, soil science, sustainable farming, agribusiness, agricultural engineering, and emerging
            innovations in the agricultural sector.
          </p>
          <p style={getResponsiveStyle(styles.text)}>
            We welcome submissions from researchers, scholars, academicians, and practitioners worldwide who are
            contributing to the advancement of agricultural sciences and sustainable food systems.
          </p>
        </section>

        {/* Submission Methods */}
        <section style={getResponsiveStyle(styles.section)}>
          <h2 style={getResponsiveStyle(styles.sectionTitle)}>
            Manuscript Submission Methods
          </h2>
          <p style={getResponsiveStyle(styles.text)}>
            Authors can submit manuscripts to IJAREI through the following channels:
          </p>

          <div style={getResponsiveStyle(styles.grid2)}>
            <div style={getResponsiveStyle(styles.card)}>
              <div style={getResponsiveStyle(styles.cardHeader)}>
                <Mail color="#166534" size={24} />
                <h3 style={getResponsiveStyle(styles.cardTitle)}>Email Submission</h3>
              </div>
              <div style={styles.listItemContent}>
                <p style={getResponsiveStyle(styles.cardText)}>
                  Send your manuscript as an attachment to{' '}
                  <a href="mailto:editor.ijterdjournal@gmail.com" style={getResponsiveStyle(styles.link)}>
                    editor.ijterdjournal@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div style={getResponsiveStyle(styles.card)}>
              <div style={getResponsiveStyle(styles.cardHeader)}>
                <Globe color="#166534" size={24} />
                <h3 style={getResponsiveStyle(styles.cardTitle)}>Online Submission</h3>
              </div>
              <div style={styles.listItemContent}>
                <p style={getResponsiveStyle(styles.cardText)}>
                  Submit your manuscript through our official Manuscript Submission Form on our website
                </p>
              </div>
            </div>
          </div>

          <div style={getResponsiveStyle(styles.alertCard)}>
            <div style={getResponsiveStyle(styles.alertContent)}>
              <CheckCircle color="#16a34a" size={20} style={{ flexShrink: 0 }} />
              <div>
                <p style={getResponsiveStyle(styles.alertText)}>
                  <strong>Important Note:</strong> All submissions must be original, unpublished work that is not
                  under review by any other journal or publication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Language & Typography */}
        <section style={getResponsiveStyle(styles.section)}>
          <h2 style={getResponsiveStyle(styles.sectionTitle)}>
            Language & Typography Requirements
          </h2>
          <p style={getResponsiveStyle(styles.text)}>
            Manuscripts may be submitted in multiple languages with specific typeface requirements:
          </p>

          <div style={getResponsiveStyle(styles.grid3)}>
            {[
              { lang: 'English', font: 'Times New Roman' },
              { lang: 'Hindi', font: 'Kruti Dev 10' },
              { lang: 'Kannada', font: 'Nudi 01 k' },
              { lang: 'Bengali', font: 'STM-BNT-Arjun' },
              { lang: 'Punjabi', font: 'Gurmukhi or ASEES' },
              { lang: 'Other Languages', font: 'Unicode font (contact us)' }
            ].map((item, index) => (
              <div key={index} style={getResponsiveStyle(styles.languageCard)}>
                <h3 style={getResponsiveStyle(styles.languageTitle)}>{item.lang}</h3>
                <p style={getResponsiveStyle(styles.languageFont)}>{item.font}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 style={getResponsiveStyle(styles.additionalTitle)}>
              Additional Requirements:
            </h3>
            <div style={getResponsiveStyle(styles.grid2)}>
              <div style={getResponsiveStyle(styles.listItem)}>
                <FileText color="#166534" size={20}  style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                <div style={styles.listItemContent}>
                  <strong style={{ color: '#1f2937' }}>Font Size:</strong>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>All content should be formatted in 10 pt size</p>
                </div>
              </div>
              <div style={getResponsiveStyle(styles.listItem)}>
                <FileText color="#166534" size={20}  style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                <div style={styles.listItemContent}>
                  <strong style={{ color: '#1f2937' }}>Scientific Terms:</strong>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>Use <em>italics</em> for all scientific words and nomenclature</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Letter Requirements */}
        <section style={getResponsiveStyle(styles.section)}>
          <h2 style={getResponsiveStyle(styles.sectionTitle)}>
            Cover Letter Requirements
          </h2>
          <p style={getResponsiveStyle(styles.text)}>
            Each manuscript submission must include a comprehensive cover letter containing:
          </p>

          <div>
            {[
              'Confirmation of originality and unpublished status of the work',
              'Statement that the work is not under consideration elsewhere',
              'Complete contact details of the corresponding author including name, affiliation, address, email, and phone number',
              'Optional: Names and contact details of two potential reviewers in your field'
            ].map((item, index) => (
              <div key={index} style={getResponsiveStyle(styles.listItem)}>
                <CheckCircle color="#166534" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                <div style={styles.listItemContent}>
                  <p style={{ color: '#374151', margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manuscript Structure */}
        <section style={getResponsiveStyle(styles.section)}>
          <h2 style={getResponsiveStyle(styles.sectionTitle)}>
            Manuscript Structure
          </h2>
          <p style={getResponsiveStyle(styles.text)}>
            Your manuscript should follow our standard academic format and include the following sections in order:
          </p>

          <div>
            {[
              {
                title: '1. Title Page',
                items: [
                  'Clear, concise, and relevant title of the paper',
                  'Complete author names and institutional affiliations',
                  'Corresponding author\'s full contact information'
                ]
              },
              {
                title: '2. Abstract (≤ 300 words)',
                items: [
                  'Concise summary of research objectives and methodology',
                  'Key findings and significant conclusions',
                  '3–6 relevant keywords following the abstract',
                  'Avoid acronyms, citations, and taxonomic authorities'
                ]
              },
              {
                title: '3. Introduction',
                items: [
                  'Clear outline of the research problem and its significance',
                  'Comprehensive background and literature review with proper citations'
                ]
              },
              {
                title: '4. Materials and Methods',
                items: [
                  'Detailed description of experimental procedures and protocols',
                  'Information about tools, software, and study location',
                  'Appropriate citations for established methodologies'
                ]
              },
              {
                title: '5. Results',
                items: [
                  'Clear presentation of findings using past tense',
                  'Include relevant tables, graphs, and figures'
                ]
              },
              {
                title: '6. Discussion',
                items: [
                  'Interpretation of findings with reference to previous studies',
                  'Highlight significance and practical implications of your research'
                ]
              },
              {
                title: '7. Conclusion',
                items: [
                  'Concise summary of main findings and potential applications'
                ]
              },
              {
                title: '8. Acknowledgments',
                items: [
                  'Credit funding sources, institutions, and research collaborators'
                ]
              },
              {
                title: '9. References',
                items: [
                  'Follow Vancouver style citation format consistently'
                ]
              }
            ].map((section, index) => (
              <div key={index} style={getResponsiveStyle(styles.structureSection)}>
                <h3 style={getResponsiveStyle(styles.structureTitle)}>{section.title}</h3>
                <div>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} style={getResponsiveStyle(styles.bulletPoint)}>
                      <div style={styles.bullet}></div>
                      <p style={getResponsiveStyle(styles.bulletText)}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call for Papers */}
        <section style={getResponsiveStyle(styles.ctaSection)}>
          <h2 style={getResponsiveStyle(styles.ctaTitle)}>
            📢 Call for Papers
          </h2>
          <p style={getResponsiveStyle(styles.ctaSubtitle)}>
            Manuscript Submissions are Currently Open
          </p>
          <p style={{ ...getResponsiveStyle(styles.text), textAlign: 'center', marginBottom: '2rem' }}>
            We are actively accepting high-quality research papers for our upcoming issues.
            Join our community of agricultural researchers and contribute to advancing the field.
          </p>

          <div style={getResponsiveStyle(styles.feesCard)}>
            <h3 style={getResponsiveStyle(styles.feesTitle)}>
              Publication Fees
            </h3>
            <div style={getResponsiveStyle(styles.grid2)}>
              <div style={getResponsiveStyle(styles.feeItem)}>
                <div style={getResponsiveStyle(styles.feeAmount)}>₹1,500</div>
                <div style={getResponsiveStyle(styles.feeLabel)}>Indian Authors</div>
                <p style={getResponsiveStyle(styles.feeDescription)}>Inclusive of processing and publication</p>
              </div>
              <div style={getResponsiveStyle(styles.feeItem)}>
                <div style={getResponsiveStyle(styles.feeAmount)}>$45 USD</div>
                <div style={getResponsiveStyle(styles.feeLabel)}>International Authors</div>
                <p style={getResponsiveStyle(styles.feeDescription)}>Competitive global pricing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={getResponsiveStyle(styles.section)}>
          <h2 style={getResponsiveStyle(styles.sectionTitle)}>
            Contact Us
          </h2>
          <p style={{ ...getResponsiveStyle(styles.text), textAlign: 'center', marginBottom: '2rem' }}>
            For any queries regarding manuscript submission or publication process,
            please reach out to our editorial team:
          </p>

          <div style={getResponsiveStyle(styles.grid2)}>
            <div style={getResponsiveStyle(styles.contactItem)}>
              <div style={{ ...getResponsiveStyle(styles.iconCircle), ...styles.blueIcon }}>
                <Mail color="white" size={20} />
              </div>
              <div>
                <h3 style={getResponsiveStyle(styles.contactTitle)}>Email Correspondence</h3>
                <a
                  href="mailto:editor.ijterdjournal@gmail.com"
                  style={getResponsiveStyle(styles.link)}
                >
                  editor.ijterdjournal@gmail.com
                </a>
              </div>
            </div>

            <div style={getResponsiveStyle(styles.contactItem)}>
              <div style={{ ...getResponsiveStyle(styles.iconCircle), ...styles.greenIcon }}>
                <MessageCircle color="white" size={20} />
              </div>
              <div>
                <h3 style={getResponsiveStyle(styles.contactTitle)}>WhatsApp Support</h3>
                <a
                  href="https://wa.me/917053938407"
                  style={getResponsiveStyle(styles.greenLink)}
                >
                  +91 7053938407
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AuthorGuidelines;