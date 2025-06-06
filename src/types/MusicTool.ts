import { TOOL_CATEGORIES } from '../data/musicTools';

// Create a type from the values of TOOL_CATEGORIES
export type ToolCategory = typeof TOOL_CATEGORIES[keyof typeof TOOL_CATEGORIES];

// Media types voor demo content
export type MediaType = 'audio' | 'video' | 'image';

// Nieuwe types voor beschrijvingsblokken
export type DescriptionBlockType = 'paragraph' | 'list' | 'heading' | 'image';

export interface DescriptionBlock {
  type: DescriptionBlockType;
  content: string | string[]; // String voor paragraaf/heading/image, string[] voor lijsten
  caption?: string; // Bijschrift voor afbeeldingen
  alt?: string; // Alt-tekst voor afbeeldingen
}

export interface SubscriptionInfo {
  name: string;
  price: string;
  features: string[];
  exportOptions?: string[];
}

export interface DemoContent {
  url: string;
  type: MediaType;
  description: string;
  thumbnail?: string;
}

export interface MusicTool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  descriptionBlocks?: DescriptionBlock[];
  review?: string;
  reviewDesc?: string;
  reviewBlocks?: DescriptionBlock[];
  websiteUrl: string;
  category: ToolCategory[];
  
  // Demo content - flexibel voor audio, video of afbeeldingen
  demoContent?: DemoContent[];
  
  // Legacy demo velden (voor backwards compatibility)
  audioDemo?: string;
  audioDemo2?: string;
  audioDemo3?: string;
  demoText?: string;
  demoText2?: string;
  demoText3?: string;
  rating: number;
  ratingsCount: number;
  imageUrl: string;
  extraInfo?: string;
  userRating?: number;
  videoUrl?: string; // OPTIONAL: je kan nu ook een videoUrl meegeven.
  // Nieuwe eigenschappen voor vergelijkingsfuncties
  typeTool: string;
  hasDesktopApp: boolean;
  hasMobileApp: boolean;
  hasVoice?: boolean;
  whatStems?: string;
  genreSupport?: string;
  exportOptions: string;
  useEase: number; // Gebruiksvriendelijkheid score (1-5)
  speed: number; // Snelheid score (1-5)
  outputQuality: number; // Kwaliteit van output score (1-5)
  whatLicence?: string;
  hasFreeVersion: boolean;
  priceModel: string;
  price: string; // Prijs informatie als string (bijv. "Gratis" of "€19.99/maand")
  // Nieuwe veld voor abonnementen
  subscriptionInfo: SubscriptionInfo[];

  //visuele Ai
  inputOptions?: string;
  resolution?: string;
  styleOptions?: string;

  //vocals
  canSing?: boolean;
  canSpeak?: boolean;
  voiceCloning?: boolean;
  languageSupport?: string;

};
