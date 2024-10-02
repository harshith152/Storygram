import React from 'react';
import './StoryCard.css';

const StoryCard = ({ story, onClick, showEditButton, onEdit }) => {
  const handleEditClick = (event) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div className="story-card" onClick={onClick}>
      <img src={story.slides[0]?.image || '/default.jpg'} alt={story.slides[0]?.heading || 'Story Image'} />
      <div className="story-card-content">
        <h3>{story.slides[0]?.heading || 'No Title'}</h3>
        <p>{story.slides[0]?.description || 'No Description'}</p>
      </div>
      {showEditButton && (
        <div className="edit-button-container">
          <button className="edit-story-btn" onClick={handleEditClick}>
            <img src="/icons/edit.png" alt="Edit" className="edit-icon" />
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryCard;
