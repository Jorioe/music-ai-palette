
import React from 'react';
import { ToolCategory } from '../types/MusicTool';

interface CategoryFilterProps {
  selectedCategory: ToolCategory;
  setSelectedCategory: (category: ToolCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories: { label: string; value: ToolCategory }[] = [
    { label: 'Alle', value: 'all' },
    // { label: 'Compositie', value: 'composition' },
    // { label: 'Vocals', value: 'vocals' },
    { label: 'Muziek genereren', value: 'music generation' },
    { label: 'Stem isolatie', value: 'stem separation' },
    { label: 'Mastering', value: 'mastering' },
    // { label: 'Overig', value: 'other' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => setSelectedCategory(category.value)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedCategory === category.value
              ? 'bg-accent text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
