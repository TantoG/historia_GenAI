export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  type: 'intro' | 'timeline' | 'interactive-cnn' | 'interactive-alexnet' | 'interactive-resnet' | 'interactive-attention' | 'interactive-vit' | 'interactive-diffusion' | 'interactive-gen-image' | 'interactive-video-search' | 'future-ethics' | 'conclusion';
  researcher?: {
    name: string;
    role: string;
    description: string;
    imageUrl?: string;
  };
  authorInfo?: { 
    name: string;
    role: string;
    imageUrl: string;
  };
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ImageSize {
  Size1K = '1K',
  Size2K = '2K',
  Size4K = '4K',
}

export interface SearchResult {
  title: string;
  uri: string;
}