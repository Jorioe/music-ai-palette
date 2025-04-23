
import React from 'react';
import { MusicTool } from '../types/MusicTool';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import RatingStars from './RatingStars';
import { useNavigate } from 'react-router-dom';

interface ToolCardProps {
  tool: MusicTool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      "lyrics": "bg-soft-pink/50",
      "composition": "bg-soft-purple/50",
      "vocals": "bg-soft-blue/50",
      "mastering": "bg-soft-green/50"
    };
    return (
      <span key={category} className={`${colors[category] || "bg-gray-100"} text-xs px-2 py-1 rounded-full`}>
        {category === 'lyrics' ? 'Songteksten' : 
         category === 'composition' ? 'Compositie' :
         category === 'vocals' ? 'Vocals' :
         category === 'mastering' ? 'Mastering' : category}
      </span>
    );
  };

  return (
    <div
      className="bg-card rounded-xl p-0 overflow-hidden shadow-sm card-hover cursor-pointer flex flex-col h-full transition"
      onClick={() => navigate(`/tool/${tool.id}`)}
      tabIndex={0}
      role="button"
      aria-label={`Toon details van ${tool.name}`}
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/tool/${tool.id}`);
      }}
    >
      <img
        src={tool.imageUrl}
        alt={tool.name}
        className="w-full h-44 object-cover"
        loading="lazy"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {tool.category.map(cat => getCategoryBadge(cat))}
        </div>
        <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
        <p className="text-muted-foreground mb-4 flex-grow">{tool.description}</p>
        {/* Alleen gemiddelde beoordeling en aantal stemmen, geen interactieve beoordeling */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <RatingStars
            rating={tool.rating}
            ratingsCount={tool.ratingsCount}
            readOnly
          />
          <Button asChild variant="outline" size="sm" className="gap-1 pointer-events-auto" onClick={e => e.stopPropagation()}>
            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
              Bezoek <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;

