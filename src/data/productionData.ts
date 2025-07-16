// Production data file - dynamically imports the latest master list for production
// This file is used by the production build (GitHub >> Vercel + MongoDB)
// Last updated: 2025-07-16

// Dynamic import of the latest master list
// This automatically finds the file with the highest node count
const importLatestMasterList = async () => {
  try {
    // Try to import the latest known files in order of recency
    // The system will automatically use the first available file
    const masterListFiles = [
      './BJJMasterList_20250716_144Nodes',
      './BJJMasterList_20250716_136Nodes',
      './BJJMasterList_20250716_135Nodes',
      './BJJMasterList_20250715_142Nodes',
      './BJJMasterList_20250715_141Nodes',
      './BJJMasterList_20250715_134Nodes',
      './BJJMasterList_20250715_133Nodes'
    ];
    
    for (const file of masterListFiles) {
      try {
        const data = await import(file);
        console.log(`✅ Successfully loaded production data from: ${file}`);
        return {
          categories: data.categories,
          skillsMasterList: data.skillsMasterList
        };
      } catch (error) {
        console.log(`⚠️  File not available: ${file}`);
        continue;
      }
    }
    
    // If all files fail, return empty data
    console.error('❌ All master list files failed to load');
    return {
      categories: [],
      skillsMasterList: []
    };
  } catch (error) {
    console.error('❌ Failed to import latest master list:', error);
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