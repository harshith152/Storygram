import React, { useState, useEffect } from 'react';
import './Bookmark.css'; 
import StoryCard from '../components/StoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Bookmark = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const username = 'Your Name';

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedStories')) || [];
    setBookmarkedStories(storedBookmarks);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddStoryClick = () => {
    navigate('/add-story');
  };

  const handleBookmarkClick = () => {
    navigate('/bookmarks');
  };

  const openStoryDetails = (id) => {
    navigate(`/bookmark/${id}`);
  };

  return (
    <div className="bookmark-page">
      <div className="top-box">
        <button className="bookmark-btn" onClick={handleBookmarkClick}>Bookmarks</button>
        <button className="add-story-btn" onClick={handleAddStoryClick}>Add Story</button>
        <div className="profile-picture">
          <img src="/path/to/profile-pic.jpg" alt="Profile" />
        </div>
        <button
          className="hamburger-btn"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <p>{username}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <h1 className="bookmark-heading">Your Bookmarks</h1>

      {bookmarkedStories.length === 0 ? (
        <div className="no-bookmarks">No bookmarks available</div>
      ) : (
        <div className="story-grid">
          {bookmarkedStories.map((story, index) => (
            <StoryCard 
              key={index} 
              story={story} 
              onClick={() => openStoryDetails(story.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
