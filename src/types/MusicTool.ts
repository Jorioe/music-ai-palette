
export type ToolCategory = 'lyrics' | 'composition' | 'vocals' | 'mastering' | 'all';

export interface MusicTool {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  category: ToolCategory[];
  audioDemo: string;
  rating: number;
  userRating?: number;
}
