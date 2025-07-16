// Production data file - dynamically imports the latest master list for production
// This file is used by the production build (GitHub >> Vercel + MongoDB)
// Last updated: 2025-07-15

// Dynamic import of the latest master list
// This automatically finds the file with the highest node count
const importLatestMasterList = async () => {
  try {
    // For now, import the latest known file (135 nodes from 2025-07-16)
    // In a more sophisticated setup, this could scan the directory
    // and find the file with the highest node count automatically
    const latestData = await import('./BJJMasterList_20250716_135Nodes');
    return {
      categories: latestData.categories,
      skillsMasterList: latestData.skillsMasterList
    };
  } catch (error) {
    console.error('Failed to import latest master list:', error);
    
    // Try fallback to any available master list files
    const fallbackFiles = [
      './BJJMasterList_20250716_135Nodes',
      './BJJMasterList_20250715_141Nodes',
      './BJJMasterList_20250715_134Nodes',
      './BJJMasterList_20250715_133Nodes'
    ];
    
    for (const file of fallbackFiles) {
      try {
        const fallbackData = await import(file);
        console.log(`Successfully loaded fallback file: ${file}`);
        return {
          categories: fallbackData.categories,
          skillsMasterList: fallbackData.skillsMasterList
        };
      } catch (fallbackError) {
        console.log(`Fallback file ${file} not available`);
        continue;
      }
    }
    
    // If all fallbacks fail, return empty data
    console.error('All master list files failed to load');
    return {
      categories: [],
      skillsMasterList: []
    };
  }
};

// Export the dynamic import function
export const getProductionData = importLatestMasterList;

// For backward compatibility, also export the interface
export interface BJJConcept {
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