import React, { useState, useEffect } from 'react';
import './StoryDetail.css';

const StoryDetail = ({ story, closeModal }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); 

  useEffect(() => {
    if (story && story.id) {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedStories')) || [];
      const isAlreadyBookmarked = storedBookmarks.some((s) => s.id === story.id);
      setIsBookmarked(isAlreadyBookmarked);
    }
  }, [story]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmarkClick = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedStories')) || [];
    const isAlreadyBookmarked = storedBookmarks.some((s) => s.id === story.id);

    let updatedBookmarks;
    if (isAlreadyBookmarked) {
      updatedBookmarks = storedBookmarks.filter((s) => s.id !== story.id);
    } else {
      updatedBookmarks = [...storedBookmarks, story];
    }

    localStorage.setItem('bookmarkedStories', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleShareClick = () => {
    const currentPageUrl = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(currentPageUrl).then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => {
          setShowCopiedMessage(false);
        }, 4000);
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    } else {
      alert('Clipboard API not supported in your browser');
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  if (!story || !story.slides || !story.slides.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story-detail-overlay">
      <button className="x-button" onClick={closeModal}>
        <img src="/icons/close.png" alt="Close" />
      </button>

      <button className="prev-slide-btn" onClick={handlePreviousSlide} disabled={currentSlideIndex === 0}>
        <img src="/icons/previous.png" alt="Previous Slide" />
      </button>
      <button className="next-slide-btn" onClick={handleNextSlide} disabled={currentSlideIndex === story.slides.length - 1}>
        <img src="/icons/next.png" alt="Next Slide" />
      </button>

      <div className="story-detail-modal" style={{ backgroundImage: `url(${story.slides[currentSlideIndex]?.image})` }}>
        <div className="story-detail-header">
          <button className="share-btn" onClick={handleShareClick}>
            <img src="/icons/share.png" alt="Share" />
          </button>
        </div>

        <div className="story-detail-content">
          {showCopiedMessage && <div className="copied-message">Link copied to clipboard</div>}

          <h3 className="story-heading">{story.slides[currentSlideIndex]?.heading}</h3>
          <p className="story-description">{story.slides[currentSlideIndex]?.description}</p>

          <div className="story-detail-footer">
            <button className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} onClick={handleBookmarkClick}>
              <img src={isBookmarked ? "/icons/bookmark-active.png" : "/icons/bookmark.png"} alt="Bookmark" />
            </button>
            <button className={`like-btn ${isLiked ? 'active' : ''}`} onClick={handleLikeClick}>
              <img src={isLiked ? "/icons/like-active.png" : "/icons/like.png"} alt="Like" />
              {likeCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
