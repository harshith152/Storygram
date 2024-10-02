import React, { useState, useEffect } from 'react';
import './AddStory.css';

const EditStory = ({ story, closeModal, updateStory }) => {
  const [slides, setSlides] = useState([{ heading: '', description: '', image: '' }]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (story) {
      setSlides(story.slides || [{ heading: '', description: '', image: '' }]);
      setCategory(story.category || '');
    }
  }, [story]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: '', description: '', image: '' }]);
      setCurrentSlide(slides.length);
    }
  };

  const removeSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);

    if (currentSlide >= updatedSlides.length) {
      setCurrentSlide(updatedSlides.length - 1);
    }
  };

  const updateSlide = (field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlide] = { ...updatedSlides[currentSlide], [field]: value };
    setSlides(updatedSlides);
  };

  const handleUpdate = () => {
    if (!category) {
      alert('Please select a category');
      return;
    }

    const updatedStory = {
      ...story, 
      slides,   
      category, 
    };

    updateStory(updatedStory);
    closeModal();
  };

  const currentSlideData = slides[currentSlide] || {};

  if (!story) {
    return <div>No story selected for editing.</div>; 
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>✖</button>
        <div className="slides">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slide-btn ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleSlideChange(index)}
            >
              Slide {index + 1}
              {index > 0 && <span className="remove-slide" onClick={() => removeSlide(index)}>✖</span>}
            </button>
          ))}
          {slides.length < 6 && (
            <button className="add-slide-btn" onClick={addSlide}>Add +</button>
          )}
        </div>
        <div className="form">
          <div className="form-group">
            <label>Heading:</label>
            <input
              type="text"
              value={currentSlideData.heading || ''} 
              onChange={(e) => updateSlide('heading', e.target.value)}
              placeholder="Your heading"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={currentSlideData.description || ''} 
              onChange={(e) => updateSlide('description', e.target.value)}
              placeholder="Story Description"
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="text"
              value={currentSlideData.image || ''}
              onChange={(e) => updateSlide('image', e.target.value)}
              placeholder="Add Image URL"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Medical">Medical</option>
              <option value="World">World</option>
              <option value="India">India</option>
            </select>
            <p className="category-note">This field will be common for all slides</p>
          </div>
        </div>
        <div className="actions">
          <button className="prev-btn" disabled={currentSlide === 0} onClick={() => setCurrentSlide(currentSlide - 1)}>Previous</button>
          <button className="next-btn" disabled={currentSlide === slides.length - 1} onClick={() => setCurrentSlide(currentSlide + 1)}>Next</button>
          <button className="post-btn" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditStory;
