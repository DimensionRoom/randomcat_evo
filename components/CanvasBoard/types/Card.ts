export interface Card {
  id: string;
  frontTitle: string;
  frontContent: string;
  backTitle: string;
  backContent: string;
  category: 'gamification' | 'career' | 'mission';
  color: string;
}

export interface BoardCard extends Card {
  x: number;
  y: number;
  isFlipped: boolean;
}

export interface TextAnnotation {
  id: string;
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
  createdAt: number;
}

export interface ProjectData {
  id: string;
  name: string;
  boardCards: BoardCard[];
  textAnnotations: TextAnnotation[];
  brainstormNotes: string;
  userName: string;
  createdAt: number;
  updatedAt: number;
  password?: string; // Optional password for project protection
  isPasswordProtected: boolean;
}