<<<<<<< HEAD
=======

>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
export type ToolCategory = 'lyrics' | 'composition' | 'vocals' | 'mastering' | 'all';

export interface MusicTool {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  category: ToolCategory[];
  audioDemo: string;
  rating: number;
  ratingsCount: number;
  imageUrl: string;
  extraInfo: string;
  userRating?: number;
  videoUrl?: string; // OPTIONAL: je kan nu ook een videoUrl meegeven.
<<<<<<< HEAD
  // Nieuwe eigenschappen voor vergelijkingsfuncties
  hasDesktopApp: boolean;
  hasMobileApp: boolean;
  hasExportOptions: boolean;
  hasFreeVersion: boolean;
  price: string; // Prijs informatie als string (bijv. "Gratis" of "€19.99/maand")
  useEase: number; // Gebruiksvriendelijkheid score (1-5)
=======
>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
}
