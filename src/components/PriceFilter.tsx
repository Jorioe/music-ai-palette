import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

export type PriceCategory = 'all' | 'free' | 'freemium' | 'paid';

interface PriceFilterProps {
  selectedPrice: PriceCategory;
  setSelectedPrice: (price: PriceCategory) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ selectedPrice, setSelectedPrice }) => {
  const priceOptions: { label: string; value: PriceCategory }[] = [
    { label: 'Alle prijsmodellen', value: 'all' },
    { label: 'Gratis', value: 'free' },
    { label: 'Freemium', value: 'freemium' },
    { label: 'Betaald', value: 'paid' }
  ];

  const selectedLabel = priceOptions.find(option => option.value === selectedPrice)?.label || 'Alle prijsmodellen';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1 ${
            selectedPrice !== 'all'
              ? 'bg-accent text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }`}
        >
          {selectedLabel}
          <ChevronDown className="w-4 h-4 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {priceOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => setSelectedPrice(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PriceFilter; 