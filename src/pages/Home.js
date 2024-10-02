import React, { useState, useEffect } from 'react';
import './Home.css';
import StoryCard from '../components/StoryCard';
import SeeMoreButton from '../components/SeeMoreButton';
import StoryDetail from '../components/StoryDetail';

const Home = ({ openLogin, openRegister }) => {
  const categories = ['All', 'Medical', 'Food', 'World', 'India'];
  
  const categoryImages = {
    All: '/images/all.png',
    Medical: '/images/medical.png',
    Food: '/images/food.png',
    World: '/images/world.png',
    India: '/images/india.png'
  };

  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [stories, setStories] = useState([]);
  const [seeMore, setSeeMore] = useState({});
  const [selectedStory, setSelectedStory] = useState(null);
  const [isStoryModalOpen, setStoryModalOpen] = useState(false);

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem('stories')) || [];
    setStories(storedStories);
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

  const openStoryDetails = (story) => {
    setSelectedStory(story);
    setStoryModalOpen(true);
  };

  const closeStoryDetails = () => {
    setSelectedStory(null);
    setStoryModalOpen(false);
  };

  const orderedCategories = [
    ...selectedCategories,
    ...categories.filter((category) => !selectedCategories.includes(category)),
  ];

  const filteredStories = selectedCategories.includes('All')
    ? stories
    : stories.filter((story) => selectedCategories.includes(story.category));

  return (
    <div className="home-page">
      <div className="navbar">
        <button className="register-btn" onClick={openRegister}>Register Now</button>
        <button className="login-btn" onClick={openLogin}>Sign In</button>
      </div>

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

      {filteredStories.length === 0 ? (
        <div className="no-stories">No stories available</div>
      ) : (
        orderedCategories.map((category) => (
          <div key={category}>
            <div className="story-heading">
              Top Stories About {category === 'All' ? 'All Categories' : category}
            </div>
            {filteredStories.filter((story) => story.category === category || selectedCategories.includes('All'))
              .length ? (
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
                      ).slice(0, 4).map((story, index) => (
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
        ))
      )}

      {isStoryModalOpen && selectedStory && (
        <StoryDetail story={selectedStory} closeModal={closeStoryDetails} />
      )}
    </div>
  );
};

export default Home;
