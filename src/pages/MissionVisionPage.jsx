import React from 'react';
import { Target, Eye, Globe, Users, BookOpen, Leaf, Shield, Award, ArrowRight, CheckCircle } from 'lucide-react';

const MissionVisionPage = () => {
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
      color: '#dcfce7',
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
    heroSection: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem 1.5rem',
      marginBottom: '2rem',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        padding: '3rem',
        marginBottom: '3rem'
      }
    },
    heroTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
      lineHeight: '1.3',
      '@media (min-width: 768px)': {
        fontSize: '2.25rem'
      }
    },
    heroText: {
      fontSize: '1rem',
      color: '#6b7280',
      lineHeight: '1.7',
      maxWidth: '48rem',
      margin: '0 auto',
      '@media (min-width: 768px)': {
        fontSize: '1.25rem'
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
        padding: '2.5rem',
        marginBottom: '2rem'
      }
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginBottom: '1.5rem',
      flexDirection: 'column',
      textAlign: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        gap: '1rem',
        marginBottom: '2rem'
      }
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0',
      '@media (min-width: 768px)': {
        fontSize: '2rem'
      }
    },
    sectionDescription: {
      fontSize: '1rem',
      color: '#374151',
      lineHeight: '1.7',
      marginBottom: '1.5rem',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        fontSize: '1.125rem',
        marginBottom: '2rem'
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
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)'
      }
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      marginBottom: '1.5rem',
      '@media (min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem'
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        marginBottom: '2rem'
      }
    },
    card: {
      padding: '1.25rem',
      backgroundColor: '#f0fdf4', // Changed from '#eff6ff'
      borderRadius: '0.5rem',
      border: '1px solid #bbf7d0', // Changed from '#bfdbfe'
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        padding: '1.5rem',
        textAlign: 'left'
      }
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      flexDirection: 'column',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        fontSize: '1.125rem',
        textAlign: 'left'
      }
    },
    cardText: {
      color: '#6b7280',
      lineHeight: '1.6',
      fontSize: '0.875rem',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        fontSize: '1rem',
        textAlign: 'left'
      }
    },
    highlightCard: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      '@media (min-width: 768px)': {
        padding: '2rem',
        marginBottom: '2rem'
      }
    },
    highlightHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      flexDirection: 'column',
      textAlign: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        textAlign: 'left'
      }
    },
    highlightTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#166534',
      margin: '0',
      '@media (min-width: 768px)': {
        fontSize: '1.5rem'
      }
    },
    highlightText: {
      color: '#166534',
      fontSize: '1rem',
      lineHeight: '1.7',
      textAlign: 'center',
      '@media (min-width: 640px)': {
        textAlign: 'left'
      },
      '@media (min-width: 768px)': {
        fontSize: '1.125rem'
      }
    },
    impactSection: {
      backgroundColor: '#f0fdf4', 
      border: '2px solid #bbf7d0', 
      borderRadius: '0.5rem',
      padding: '1.5rem',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        padding: '2.5rem'
      }
    },
    impactTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
      lineHeight: '1.3',
      '@media (min-width: 768px)': {
        fontSize: '1.875rem'
      }
    },
    impactText: {
      fontSize: '1rem',
      color: '#374151',
      lineHeight: '1.7',
      marginBottom: '1.5rem',
      '@media (min-width: 768px)': {
        fontSize: '1.125rem',
        marginBottom: '2rem'
      }
    },
    iconCircle: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
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
    purpleIcon: {
      backgroundColor: '#15803d'
    },
    orangeIcon: {
      backgroundColor: '#ea580c'
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      marginBottom: '0.75rem',
      textAlign: 'left'
    },
    listItemContent: {
      flex: 1
    },
    listItemTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.25rem',
      fontSize: '0.875rem',
      '@media (min-width: 768px)': {
        fontSize: '1rem'
      }
    },
    listItemDescription: {
      color: '#6b7280',
      margin: 0,
      fontSize: '0.75rem',
      lineHeight: '1.5',
      '@media (min-width: 768px)': {
        fontSize: '0.875rem'
      }
    }
  };

  // Function to apply responsive styles
  const getResponsiveStyle = (baseStyle) => {
    return baseStyle;
  };
  // Add this useEffect hook right before the return statement
  React.useEffect(() => {
    const updateStyles = () => {
      const width = window.innerWidth;

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
            Mission & Vision
          </h1>
          <p style={styles.headerSubtitle}>
            International Journal of Agricultural Research and Emerging Innovations (IJAREI)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={getResponsiveStyle(styles.main)}>

        {/* Hero Section */}
        <section style={getResponsiveStyle(styles.heroSection)}>
          <h2 style={getResponsiveStyle(styles.heroTitle)}>
            Advancing Agricultural Knowledge for a Sustainable Future
          </h2>
          <p style={getResponsiveStyle(styles.heroText)}>
            At IJAREI, we are committed to fostering innovation, promoting sustainability, and bridging
            the gap between cutting-edge research and practical agricultural solutions worldwide.
          </p>
        </section>

        {/* Mission Section */}
        <section style={getResponsiveStyle(styles.section)}>
          <div style={getResponsiveStyle(styles.sectionHeader)}>
            <Target color="#166534" size={window.innerWidth < 768 ? 28 : 32} />
            <h2 style={getResponsiveStyle(styles.sectionTitle)}>Our Mission</h2>
          </div>

          <p style={getResponsiveStyle(styles.sectionDescription)}>
            At the <strong>International Journal of Agricultural Research and Emerging Innovations (IJAREI)</strong>,
            our mission is to <strong>advance agricultural knowledge</strong> and promote <strong>sustainable innovations</strong> that
            address global food security, environmental challenges, and rural development.
          </p>

          <div style={getResponsiveStyle(styles.highlightCard)}>
            <div style={getResponsiveStyle(styles.highlightHeader)}>
              <Leaf color="#16a34a" size={24} />
              <h3 style={getResponsiveStyle(styles.highlightTitle)}>We are dedicated to:</h3>
            </div>
            <p style={getResponsiveStyle(styles.highlightText)}>
              Empowering innovation in agriculture, enhancing productivity, and contributing to a greener,
              more sustainable future for generations to come.
            </p>
          </div>

          <div style={getResponsiveStyle(styles.grid2)}>
            <div style={getResponsiveStyle(styles.card)}>
              <div style={getResponsiveStyle(styles.cardHeader)}>
                <BookOpen color="#166534" size={24} />
                <h3 style={getResponsiveStyle(styles.cardTitle)}>High-Quality Research</h3>
              </div>
              <p style={getResponsiveStyle(styles.cardText)}>
                Publishing <strong>peer-reviewed research</strong> that benefits farmers, scientists, and policymakers
                through rigorous academic standards and practical relevance.
              </p>
            </div>

            <div style={getResponsiveStyle(styles.card)}>
              <div style={getResponsiveStyle(styles.cardHeader)}>
                <Users color="#166534" size={24} />
                <h3 style={getResponsiveStyle(styles.cardTitle)}>Interdisciplinary Collaboration</h3>
              </div>
              <p style={getResponsiveStyle(styles.cardText)}>
                Encouraging <strong>collaborations</strong> between agricultural researchers, technologists,
                and industry leaders to foster innovative solutions.
              </p>
            </div>

            <div style={getResponsiveStyle(styles.card)}>
              <div style={getResponsiveStyle(styles.cardHeader)}>
                <Globe color="#16a34a" size={24} />
                <h3 style={getResponsiveStyle(styles.cardTitle)}>Global Platform</h3>
              </div>
              <p style={getResponsiveStyle(styles.cardText)}>
                Providing a <strong>worldwide platform</strong> for researchers to share groundbreaking
                findings that shape the future of agriculture.
              </p>
            </div>

            <div style={getResponsiveStyle(styles.card)}>
              <div style={getResponsiveStyle(styles.cardHeader)}>
                <Shield color="#ea580c" size={24} />
                <h3 style={getResponsiveStyle(styles.cardTitle)}>Open Access Movement</h3>
              </div>
              <p style={getResponsiveStyle(styles.cardText)}>
                Supporting <strong>open-access publishing</strong> to ensure agricultural knowledge is freely
                available to the worldwide scientific community.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section style={getResponsiveStyle(styles.section)}>
          <div style={getResponsiveStyle(styles.sectionHeader)}>
            <Eye color="#15803d" size={window.innerWidth < 768 ? 28 : 32} />
            <h2 style={getResponsiveStyle(styles.sectionTitle)}>Our Vision</h2>
          </div>

          <p style={getResponsiveStyle(styles.sectionDescription)}>
            Our vision is to become a <strong>leading global journal</strong> in the field of agricultural research,
            recognized for our commitment to <strong>excellence, innovation, and integrity</strong> in publishing.
          </p>

          <div style={getResponsiveStyle(styles.grid2)}>
            {[
              {
                icon: <Award color="white" size={20} />,
                iconBg: styles.blueIcon,
                title: 'First Choice for Authors',
                description: 'Be the preferred platform for authors seeking to publish pioneering research in agriculture and related sciences.'
              },
              {
                icon: <Leaf color="white" size={20} />,
                iconBg: styles.greenIcon,
                title: 'Transformative Solutions',
                description: 'Inspire agricultural innovations that improve livelihoods and protect natural resources for sustainable development.'
              },
              {
                icon: <Globe color="white" size={20} />,
                iconBg: styles.purpleIcon,
                title: 'International Cooperation',
                description: 'Foster global collaboration in agricultural research and development across diverse geographical regions.'
              },
              {
                icon: <ArrowRight color="white" size={20} />,
                iconBg: styles.orangeIcon,
                title: 'Research-to-Practice Bridge',
                description: 'Connect scientific research with practical agricultural applications, ensuring innovations reach those who need them most.'
              }
            ].map((item, index) => (
              <div key={index} style={getResponsiveStyle(styles.card)}>
                <div style={{ ...getResponsiveStyle(styles.iconCircle), ...item.iconBg }}>
                  {item.icon}
                </div>
                <h3 style={getResponsiveStyle(styles.cardTitle)}>{item.title}</h3>
                <p style={getResponsiveStyle(styles.cardText)}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section style={getResponsiveStyle(styles.section)}>
          <div style={getResponsiveStyle(styles.impactSection)}>
            <h2 style={getResponsiveStyle(styles.impactTitle)}>
              Creating Lasting Global Impact
            </h2>
            <p style={getResponsiveStyle(styles.impactText)}>
              With this vision, IJAREI seeks to create a <strong>lasting impact</strong> on global agricultural advancement
              and contribute to the achievement of the <strong>United Nations Sustainable Development Goals (SDGs)</strong>.
            </p>

            <div style={getResponsiveStyle(styles.grid3)}>
              {[
                {
                  title: 'Food Security',
                  description: 'Supporting research that enhances global food production and accessibility'
                },
                {
                  title: 'Climate Action',
                  description: 'Promoting sustainable agricultural practices that combat climate change'
                },
                {
                  title: 'Sustainable Land Use',
                  description: 'Advancing innovations in responsible land management and conservation'
                }
              ].map((sdg, index) => (
                <div key={index} style={getResponsiveStyle(styles.listItem)}>
                  <CheckCircle color="#16a34a" size={20} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                  <div style={styles.listItemContent}>
                    <h4 style={styles.listItemTitle}>{sdg.title}</h4>
                    <p style={styles.listItemDescription}>{sdg.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={getResponsiveStyle(styles.section)}>
          <div style={getResponsiveStyle(styles.impactSection)}>
            <h2 style={getResponsiveStyle(styles.impactTitle)}>
              Join Our Mission
            </h2>
            <p style={getResponsiveStyle(styles.impactText)}>
              Together, we can advance agricultural science, promote sustainable innovations, and create
              a more food-secure world for future generations. Your research contribution matters.
            </p>

            <div style={getResponsiveStyle(styles.highlightCard)}>
              <div style={getResponsiveStyle(styles.highlightHeader)}>
                <Target color="#16a34a" size={24} />
                <h3 style={getResponsiveStyle(styles.highlightTitle)}>Ready to Make an Impact?</h3>
              </div>
              <p style={getResponsiveStyle(styles.highlightText)}>
                Submit your research to IJAREI and be part of the global effort to transform
                agriculture through innovation, sustainability, and scientific excellence.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default MissionVisionPage;