
import React from 'react';
import { Music } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-background/90 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-accent" />
          <h1 className="font-semibold text-xl">AI Muziektools</h1>
        </div>
        <div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
