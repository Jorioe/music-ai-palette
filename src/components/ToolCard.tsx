import React from 'react';
import { MusicTool } from '../types/MusicTool';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Zap, Award, DollarSign } from 'lucide-react';
import RatingStars from './RatingStars';
import { useNavigate } from 'react-router-dom';

interface ToolCardProps {
  tool: MusicTool;
}

const getPriceLabel = (tool: MusicTool): string => {
  if (tool.price && tool.price.toLowerCase() === 'gratis') {
    return 'Gratis';
  }
  if (tool.hasFreeVersion) {
    return 'Gratis versie';
  }
  return 'Betaald';
};

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      "vocal generation": "bg-[#FFE2E6] text-[#9E1B32]",
      "stem separation": "bg-[#E5DEFF] text-[#4F3B99]",
      "music generation": "bg-[#D3E4FD] text-[#1E4784]",
      "mastering": "bg-[#F2FCE2] text-[#3B7A1E]",
      "visual ai": "bg-[#FFF3D6] text-[#946B00]",
      "sound design": "bg-[#FFE8D9] text-[#A74C00]"
    };
    const [bgColor, textColor] = (colors[category] || "bg-gray-100 text-gray-700").split(" ");
    return (
      <span key={category} className={`${bgColor} ${textColor} text-xs px-2 py-1 rounded-full font-medium`}>
        {category === 'vocal generation' ? 'Vocals genereren' :
         category === 'stem separation' ? 'Stem isolatie' :
         category === 'music generation' ? 'Muziek genereren' :
         category === 'mastering' ? 'Mastering' :
         category === 'visual ai' ? 'Afbeeldingen genereren' : category}
      </span>
    );
  };

  const getMetricBadge = (icon: React.ReactNode, value: number, label: string) => (
    <div className="flex items-center gap-1 text-sm">
      {icon}
      <span className="font-medium">{value}/5</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );

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
        
        {/* Belangrijke metrics uit de enquête */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {getMetricBadge(<Star className="w-4 h-4" />, tool.useEase, "Gebruiksgemak")}
          {getMetricBadge(<Award className="w-4 h-4" />, tool.outputQuality, "Kwaliteit")}
          {getMetricBadge(<Zap className="w-4 h-4" />, tool.speed, "Snelheid")}
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="w-4 h-4" />
            <span className="text-muted-foreground text-xs">{getPriceLabel(tool)}</span>
          </div>
        </div>

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

