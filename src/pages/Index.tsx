
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ToolCard from '../components/ToolCard';
import CategoryFilter from '../components/CategoryFilter';
import { musicTools } from '../data/musicTools';
import { ToolCategory } from '../types/MusicTool';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');

  const filteredTools = selectedCategory === 'all'
    ? musicTools
    : musicTools.filter(tool => tool.category.includes(selectedCategory));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            AI Tools voor Muziekproductie
          </h1>
          <p className="text-muted-foreground">
            Ontdek de nieuwste AI-tools die je helpen bij het maken, produceren en masteren van muziek.
          </p>
        </div>
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Geen tools gevonden in deze categorie.</p>
          </div>
        )}
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Muziektools • Gemaakt met ♫</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
