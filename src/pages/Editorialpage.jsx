import React, { useState, useEffect } from 'react';
import '../styles/EditorialBoard.css';



const EditorialBoard = () => {
  const [editorialMembers, setEditorialMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch editorial members from backend
  useEffect(() => {
    const fetchEditorialMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/public/editors', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEditorialMembers(data);
      } catch (error) {
        console.error('Error fetching editorial members:', error);
        setError('Failed to load editorial board members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEditorialMembers();
  }, []);

  const fetchGroupedEditors = async () => {
  try {
    const response = await fetch('/api/public/editors/grouped', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const groupedData = await response.json();
    return groupedData; // This will be a Map-like object { Chief: [...], Associate: [...], Board Member: [...] }
  } catch (error) {
    console.error('Error fetching grouped editors:', error);
    throw error;
  }
};

  // Group members by editorType for organized display
  const groupedMembers = editorialMembers.reduce((acc, member) => {
    const editorType = member.editorType || 'Editorial Board Member';
    if (!acc[editorType]) {
      acc[editorType] = [];
    }
    acc[editorType].push(member);
    return acc;
  }, {});

  // Define editorType order for consistent display
  const editorTypeOrder = ['Editor-in-Chief', 'Associate Editor', 'Editorial Board Member'];

  if (loading) {
    return (
      <div className="editorialBoard-container">
        <div className="editorialBoard-loadingSpinner">
          <div className="editorialBoard-spinner"></div>
          <p>Loading Editorial Board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="editorialBoard-container">
        <div className="editorialBoard-error">
          <h2>Error Loading Editorial Board</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="editorialBoard-retryButton"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editorialBoard-container">
      {/* Header with content wrapper */}
      <header className="editorialBoard-header">
        <div className="editorialBoard-headerContent">
          <h1 className="editorialBoard-mainTitle">Editorial Board</h1>
          <p className="editorialBoard-subtitle">
            Meet our distinguished editorial team committed to advancing academic excellence
          </p>
        </div>
      </header>

      {/* Main content with proper wrapper */}
      <main className="editorialBoard-main">
        {editorialMembers.length === 0 ? (
          <div className="editorialBoard-noMembers">
            <p>No editorial board members found.</p>
          </div>
        ) : (
          editorTypeOrder.map(editorType => {
            const members = groupedMembers[editorType];
            if (!members || members.length === 0) return null;

            return (
              <section key={editorType} className="editorialBoard-editorTypeSection">
                <h2 className="editorialBoard-editorTypeTitle">{editorType}</h2>
                <div className="editorialBoard-membersGrid">
                  {members.map(member => (
                    <MemberCard 
                      key={member.id} 
                      member={member}
                      // onUpdate={updateEditorialMember}
                      // onDelete={deleteEditorialMember}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>
    </div>
  );
};

// Individual member card component
const MemberCard = ({ member, onUpdate, onDelete }) => {
  const handleUniversityClick = () => {
    if (member.universityLink) {
      window.open(member.universityLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmailClick = () => {
    if (member.email) {
      window.location.href = `mailto:${member.email}`;
    }
  };

  return (
    <article className="editorialBoard-memberCard">
      <div className="editorialBoard-cardHeader">
        <div className="editorialBoard-imageContainer">
          <img 
            src={member.photoUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgODBDMTEwLjQ5MyA4MCAxMTkgNzEuNDkzNCAxMTkgNjFDMTE5IDUwLjUwNjYgMTEwLjQ5MyA0MiAxMDAgNDJDODkuNTA2NiA0MiA4MSA1MC41MDY2IDgxIDYxQzgxIDcxLjQ5MzQgODkuNTA2NiA4MCAxMDAgODBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMDAgOTBDNzguNjcxNCA5MCA2MS4zMzA2IDEwNy4zNDEgNjEuMzMwNiAxMjguNjY5VjE1OEgxMzguNjY5VjEyOC42NjlDMTM4LjY2OSAxMDcuMzQxIDEyMS4zMjkgOTAgMTAwIDkwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'} 
            alt={`${member.name || 'Editorial member'} profile`}
            className="editorialBoard-profileImage"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgODBDMTEwLjQ5MyA4MCAxMTkgNzEuNDkzNCAxMTkgNjFDMTE5IDUwLjUwNjYgMTEwLjQ5MyA0MiAxMDAgNDJDODkuNTA2NiA0MiA4MSA1MC41MDY2IDgxIDYxQzgxIDcxLjQ5MzQgODkuNTA2NiA4MCAxMDAgODBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMDAgOTBDNzguNjcxNCA5MCA2MS4zMzA2IDEwNy4zNDEgNjEuMzMwNiAxMjguNjY5VjE1OEgxMzguNjY5VjEyOC42NjlDMTM4LjY2OSAxMDcuMzQxIDEyMS4zMjkgOTAgMTAwIDkwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
            }}
          />
        </div>
      </div>
      
      <div className="editorialBoard-cardContent">
        <h3 className="editorialBoard-memberName">{member.name || 'Name not available'}</h3>
        <p className="editorialBoard-qualifications">{member.degreeOrTitle || 'Qualifications not available'}</p>
        <p className="editorialBoard-position">{member.position || 'Position not available'}</p>
        
        <div className="editorialBoard-contactInfo">
          {member.email && (
            <button 
              className="editorialBoard-emailButton"
              onClick={handleEmailClick}
              aria-label={`Email ${member.name}`}
            >
              📧 {member.email}
            </button>
          )}
        </div>
      </div>
      
      <div className="editorialBoard-cardFooter">
        {member.universityLink && (
          <button 
            className="editorialBoard-universityButton"
            onClick={handleUniversityClick}
            aria-label={`Visit ${member.name}'s university`}
          >
            🏫 University Link
          </button>
        )}
      </div>
    </article>
  );
};

export default EditorialBoard;