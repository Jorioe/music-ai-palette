
import React, { useState } from 'react';
import { MusicTool } from '../types/MusicTool';
import AudioPlayer from './AudioPlayer';
import RatingStars from './RatingStars';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ToolCardProps {
  tool: MusicTool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [userRating, setUserRating] = useState<number | undefined>(tool.userRating);
  const { toast } = useToast();

  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Beoordeling opgeslagen",
      description: `Je hebt ${tool.name} een ${rating}-sterren beoordeling gegeven.`,
      duration: 3000,
    });
  };

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
    <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
      <div className="flex flex-col h-full">
        <div className="mb-4 flex flex-wrap gap-2">
          {tool.category.map(cat => getCategoryBadge(cat))}
        </div>
        
        <h2 className="text-xl font-medium mb-2">{tool.name}</h2>
        <p className="text-muted-foreground mb-4 flex-grow">{tool.description}</p>
        
        <div className="mb-4">
          <AudioPlayer audioSrc={tool.audioDemo} />
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <RatingStars 
            rating={tool.rating} 
            userRating={userRating}
            onRate={handleRating}
          />
          
          <Button asChild variant="outline" size="sm" className="gap-1">
            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
              Bezoek <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
