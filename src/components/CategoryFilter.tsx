import React from 'react';
import { ToolCategory } from '../types/MusicTool';
import { TOOL_CATEGORIES } from '../data/musicTools';

interface CategoryFilterProps {
  selectedCategory: ToolCategory | 'all';
  setSelectedCategory: (category: ToolCategory | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories: { label: string; value: ToolCategory | 'all' }[] = [
    { label: 'Alle', value: 'all' },
    // { label: 'Vocals genereren', value: TOOL_CATEGORIES.VOCAL_GENERATION },
    { label: 'Stem isolatie', value: TOOL_CATEGORIES.STEM_SEPARATION },
    { label: 'Muziek genereren', value: TOOL_CATEGORIES.MUSIC_GENERATION },
    { label: 'Mastering', value: TOOL_CATEGORIES.MASTERING },
    // { label: 'Sound Design', value: TOOL_CATEGORIES.SOUND_DESIGN },
    { label: 'Afbeeldingen genereren', value: TOOL_CATEGORIES.VISUAL_AI }
  ];

  return (
    <>
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
    </>
  );
}

export default CategoryFilter;
