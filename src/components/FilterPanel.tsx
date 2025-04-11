import React from 'react';
import { Star } from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  maxPrice: number;
  minRating: number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  priceRange,
  maxPrice,
  minRating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <div className="flex items-center justify-between mb-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`mr-1 ${rating <= minRating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star className={rating <= minRating ? 'fill-yellow-400' : ''} size={20} />
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onClearFilters}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel