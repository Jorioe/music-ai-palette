export type ToolCategory = 'music generation' | 'mastering' | 'stem separation' | 'other';

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
  whatLicence?: string;
  hasFreeVersion: boolean;
  priceModel: string;
  price: string; // Prijs informatie als string (bijv. "Gratis" of "€19.99/maand")
  // Nieuwe veld voor abonnementen
  subscriptionInfo: SubscriptionInfo[];
}
