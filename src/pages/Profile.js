import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import StoryCard from '../components/StoryCard';
import SeeMoreButton from '../components/SeeMoreButton';
import { useNavigate } from 'react-router-dom';
import AddStory from './AddStory';
import EditStory from './EditStory';
import StoryDetail from '../components/StoryDetail';

const Profile = () => {
  const categories = ['All', 'Medical', 'Food', 'World', 'India'];

  const categoryImages = {
    All: '/images/all.png',
    Medical: '/images/medical.png',
    Food: '/images/food.png',
    World: '/images/world.png',
    India: '/images/india.png',
  };

  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [stories, setStories] = useState([]);
  const [yourStories, setYourStories] = useState([]);
  const [seeMore, setSeeMore] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [showEditStoryModal, setShowEditStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isStoryModalOpen, setStoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const username = 'Your Name';

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem('stories')) || [];
    setStories(storedStories);

    const storedYourStories = JSON.parse(localStorage.getItem('yourStories')) || [];
    setYourStories(storedYourStories);
  }, []);

  const handleCategorySelect = (category) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
        setSelectedCategories((prevSelected) => [...prevSelected.filter((c) => c !== 'All'), category]);
      }
    }
  };

  const handleSeeMore = (category) => {
    setSeeMore((prevState) => ({ ...prevState, [category]: true }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleBookmarkClick = () => {
    navigate('/bookmark');
  };

  const openStoryDetails = (story) => {
    setSelectedStory(story);
    setStoryModalOpen(true);
  };

  const closeStoryDetails = () => {
    setSelectedStory(null);
    setStoryModalOpen(false);
  };

  const openEditStory = (story) => {
    setSelectedStory(story);
    setShowEditStoryModal(true);
  };

  const closeEditStory = () => {
    setSelectedStory(null);
    setShowEditStoryModal(false);
  };

  const addNewStory = (newStory) => {
    const updatedStories = [...stories, newStory];
    const updatedYourStories = [...yourStories, newStory];

    setStories(updatedStories);
    setYourStories(updatedYourStories);

    localStorage.setItem('stories', JSON.stringify(updatedStories));
    localStorage.setItem('yourStories', JSON.stringify(updatedYourStories));
  };

  const updateStory = (updatedStory) => {
    const updatedYourStories = yourStories.map((story) => (story.id === updatedStory.id ? updatedStory : story));
    setYourStories(updatedYourStories);
    localStorage.setItem('yourStories', JSON.stringify(updatedYourStories));
  };

  const orderedCategories = [
    ...selectedCategories,
    ...categories.filter((category) => !selectedCategories.includes(category)),
  ];

  const filteredStories = selectedCategories.includes('All')
    ? stories
    : stories.filter((story) => selectedCategories.includes(story.category));

  return (
    <div className="profile-page">
      <div className="top-box">
        <button className="bookmark-btn" onClick={handleBookmarkClick}>
          Bookmarks
        </button>
        <button className="add-story-btn" onClick={() => setShowAddStoryModal(true)}>Add Story</button>
        <div className="profile-picture">
          <img src="/icons/profile.png" alt="Profile" />
        </div>
        <button className="hamburger-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <p>{username}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div className="category-list">
        {orderedCategories.map((category) => (
          <div
            key={category}
            className={`category-item ${selectedCategories.includes(category) ? 'selected' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            <img src={categoryImages[category]} alt={category} className="category-image" />
            <span className="category-label">{category}</span>
          </div>
        ))}
      </div>

      <div className="your-stories-section">
        <div className="story-heading">Your Stories</div>
        <div className="story-grid">
          {yourStories.length > 0 ? (
            yourStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onClick={() => openStoryDetails(story)}
                showEditButton={true}
                onEdit={() => openEditStory(story)}
              />
            ))
          ) : (
            <div className="no-stories">No stories available</div>
          )}
        </div>
      </div>

      {orderedCategories.map((category) => (
        <div key={category}>
          <div className="story-heading">
            Top Stories About {category === 'All' ? 'All Categories' : category}
          </div>
          {filteredStories.filter((story) => story.category === category || selectedCategories.includes('All')).length ? (
            <>
              <div className="story-grid">
                {seeMore[category]
                  ? filteredStories.filter(
                      (story) => story.category === category || selectedCategories.includes('All')
                    ).map((story, index) => (
                      <StoryCard key={index} story={story} onClick={() => openStoryDetails(story)} />
                    ))
                  : filteredStories.filter(
                      (story) => story.category === category || selectedCategories.includes('All')
                    )
                      .slice(0, 4)
                      .map((story, index) => (
                        <StoryCard key={index} story={story} onClick={() => openStoryDetails(story)} />
                      ))}
              </div>
              {filteredStories.filter((story) => story.category === category).length > 4 && !seeMore[category] && (
                <SeeMoreButton onClick={() => handleSeeMore(category)} />
              )}
            </>
          ) : (
            <div className="no-stories">No stories available</div>
          )}
        </div>
      ))}

      {showAddStoryModal && <AddStory closeModal={() => setShowAddStoryModal(false)} addNewStory={addNewStory} />}

      {showEditStoryModal && selectedStory && (
        <EditStory story={selectedStory} closeModal={closeEditStory} updateStory={updateStory} />
      )}

      {isStoryModalOpen && selectedStory && <StoryDetail story={selectedStory} closeModal={closeStoryDetails} />}
    </div>
  );
};

export default Profile;
