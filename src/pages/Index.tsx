import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ToolCard from '../components/ToolCard';
import CategoryFilter from '../components/CategoryFilter';
import PriceFilter, { PriceCategory } from '../components/PriceFilter';
import { musicTools } from '../data/musicTools';
import { ToolCategory } from '../types/MusicTool';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceCategory>('all');

  // Scroll naar bovenkant bij laden van de pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredTools = musicTools
    .filter(tool => {
      if (selectedCategory === 'all') return true;
      return tool.category.includes(selectedCategory);
    })
    .filter(tool => {
      if (selectedPrice === 'all') return true;
      if (selectedPrice === 'free') return tool.price.toLowerCase() === 'gratis';
      if (selectedPrice === 'freemium') return tool.hasFreeVersion && tool.price.toLowerCase() !== 'gratis';
      if (selectedPrice === 'paid') return !tool.hasFreeVersion && tool.price.toLowerCase() !== 'gratis';
      return true;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            AI Tools voor Muziekproductie
          </h1>
          <p className="text-muted-foreground">
            Ontdek de nieuwste AI-tools die je helpen bij het maken en masteren van muziek.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex flex-wrap gap-2">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <PriceFilter
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
        
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
          {/* <p>© {new Date().getFullYear()} AI Muziektools • Gemaakt met ♫</p> */}
          <p>© {new Date().getFullYear()} • Gemaakt door <a href='https://i458219.hera.fontysict.net/' target='blank'>Jorian Bracke</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
