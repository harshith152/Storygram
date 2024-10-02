import React from 'react';

const CategoryFilter = ({ categories, selectedCategories, onCategorySelect }) => {
  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category}
          className={selectedCategories.includes(category) ? 'active' : ''}
          onClick={() => onCategorySelect(category)}
        >
          <img src={`/path/to/${category.toLowerCase()}.jpg`} alt={category} />
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
