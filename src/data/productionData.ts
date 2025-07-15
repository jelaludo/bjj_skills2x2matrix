// Production data file - imports the latest master list for production
// This file is used by the production build (GitHub >> Vercel + MongoDB)
// Last updated: 2025-07-15
// Source file: BJJMasterList_20250715_134Nodes.ts

// Import the latest master list data
export { categories, skillsMasterList } from './BJJMasterList_20250715_134Nodes';

// Re-export the interface for type safety
export interface BJJConcept {
  _id?: string;
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
} 