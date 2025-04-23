
import React from 'react';
import { Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-background/90 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-accent" />
          <Link to="/" className="font-semibold text-xl">AI Muziektools</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            to="/compare" 
            className="text-sm hover:text-accent transition-colors"
          >
            Vergelijken
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
