import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const JournalFooter = () => {
  const navigate = useNavigate();

  // Navigation handler using React Router
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <style>
        {`
          .ijarei-footer {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }

          .ijarei-footer-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 32px 24px 20px;
          }

          .ijarei-footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 32px;
            margin-bottom: 24px;
          }

          @media (max-width: 1024px) {
            .ijarei-footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 24px;
            }
          }

          @media (max-width: 640px) {
            .ijarei-footer-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }

          .ijarei-journal-info {
            padding-right: 16px;
          }

          .ijarei-journal-title {
            font-size: 24px;
            font-weight: 700;
            color: #22c55e;
            margin-bottom: 12px;
            letter-spacing: -0.025em;
          }

          .ijarei-journal-desc {
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 16px;
          }

          .ijarei-social-links {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .ijarei-social-link {
            background-color: #334155;
            padding: 8px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: white;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
            cursor: pointer;
          }

          .ijarei-social-link:hover {
            background-color: #22c55e;
            border-color: #22c55e;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          }

          .ijarei-section-title {
            font-size: 16px;
            font-weight: 600;
            color: #22c55e;
            margin-bottom: 16px;
            position: relative;
            padding-bottom: 6px;
          }

          .ijarei-section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background-color: #22c55e;
            border-radius: 1px;
          }

          .ijarei-links-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .ijarei-links-list li {
            margin-bottom: 8px;
          }

          .ijarei-nav-link {
            color: #cbd5e1;
            text-decoration: none;
            font-size: 13px;
            transition: all 0.3s ease;
            cursor: pointer;
            display: inline-block;
            padding: 2px 0;
          }

          .ijarei-nav-link:hover {
            color: #22c55e;
            transform: translateX(4px);
          }

          .ijarei-contact-item {
            margin-bottom: 16px;
            padding: 12px;
            background-color: rgba(30, 41, 59, 0.5);
            border-radius: 6px;
            border: 1px solid #334155;
          }

          .ijarei-contact-text {
            color: #94a3b8;
            font-size: 12px;
            margin-bottom: 6px;
            font-weight: 500;
          }

          .ijarei-contact-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #cbd5e1;
            text-decoration: none;
            font-size: 13px;
            transition: all 0.3s ease;
          }

          .ijarei-contact-link:hover {
            color: #22c55e;
            transform: translateX(3px);
          }

          .ijarei-footer-bottom {
            border-top: 1px solid #334155;
            background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
            text-align: center;
            padding: 16px 0;
          }

          .ijarei-copyright {
            font-size: 12px;
            color: #94a3b8;
            font-weight: 400;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }

          @media (max-width: 640px) {
            .ijarei-footer-container {
              padding: 24px 16px 16px;
            }
            
            .ijarei-journal-title {
              font-size: 20px;
            }
            
            .ijarei-journal-desc {
              font-size: 13px;
            }
            
            .ijarei-copyright {
              font-size: 11px;
              padding: 0 16px;
            }
          }
        `}
      </style>

      <footer className="ijarei-footer">
        {/* Main Footer Content */}
        <div className="ijarei-footer-container">
          <div className="ijarei-footer-grid">
            
            {/* Journal Info */}
            <div className="ijarei-journal-info">
              <h3 className="ijarei-journal-title">IJAREI</h3>
              <p className="ijarei-journal-desc">
                International Journal of Agricultural Research and Emerging Innovations — an open-access, 
                peer-reviewed online journal dedicated to publishing quality research in all areas of agricultural sciences.
              </p>
              
              {/* Social Media */}
              <div className="ijarei-social-links">
                <a href="#" className="ijarei-social-link" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href="#" className="ijarei-social-link" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
                <a href="#" className="ijarei-social-link" aria-label="Twitter">
                  <Twitter size={16} />
                </a>
                <a href="#" className="ijarei-social-link" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="ijarei-social-link" aria-label="YouTube">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* IJAREI Policies */}
            <div>
              <h4 className="ijarei-section-title">Policies</h4>
              <ul className="ijarei-links-list">
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/OpenAccessPolicy')}
                  >
                    Open Access Policy
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/PeerReviewPolicy')}
                  >
                    Peer Review Policy
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/copyrightPolicy')}
                  >
                    Copyright Policy
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/PlagiarismPolicy')}
                  >
                    Plagiarism Policy
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/PublicationEthics')}
                  >
                    Publication Ethics
                  </span>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="ijarei-section-title">Quick Links</h4>
              <ul className="ijarei-links-list">
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/JoinAsReviewer')}
                  >
                    Join As Reviewer
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/JoinAsEditorialMember')}
                  >
                    Editorial Member
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/PublishYourPaper')}
                  >
                    Publish Paper
                  </span>
                </li>
                <li>
                  <span 
                    className="ijarei-nav-link"
                    onClick={() => handleNavigation('/PublicationCertificate')}
                  >
                    Certificate
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="ijarei-section-title">Contact</h4>
              <div className="ijarei-contact-item">
                <p className="ijarei-contact-text">Queries & Suggestions</p>
                <a href="mailto:editor.ijareijournal@gmail.com" 
                   className="ijarei-contact-link">
                  <Mail size={14} color="#22c55e" />
                  editor.ijareijournal@gmail.com
                </a>
              </div>
              
              <div className="ijarei-contact-item">
                <p className="ijarei-contact-text">Support Helpline</p>
                <a href="tel:+917053938407" 
                   className="ijarei-contact-link">
                  <Phone size={14} color="#22c55e" />
                  +91 7053938407
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ijarei-footer-bottom">
          <div className="ijarei-copyright">
            © 2025 International Journal of Agricultural Research and Emerging Innovations. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default JournalFooter;