const fs = require('fs');
const path = require('path');

function cleanProductionFile() {
  try {
    console.log('🧹 Cleaning production file...');
    
    const filePath = path.join(__dirname, '../src/data/BJJMasterList_20250716_144Nodes.ts');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract categories and concepts using regex
    const categoriesMatch = content.match(/export const categories = (\[[\s\S]*?\]);/);
    const conceptsMatch = content.match(/export const skillsMasterList: BJJConcept\[\] = (\[[\s\S]*?\]);/);
    
    if (!categoriesMatch || !conceptsMatch) {
      throw new Error('Could not extract categories or concepts from file');
    }
    
    // Parse the data
    const categories = eval(categoriesMatch[1]);
    const concepts = eval(conceptsMatch[1]);
    
    // Clean _id fields
    const cleanCategories = categories.map(({ _id, ...category }) => category);
    const cleanConcepts = concepts.map(({ _id, ...concept }) => concept);
    
    // Create clean content
    const cleanContent = `export const categories = ${JSON.stringify(cleanCategories, null, 2)};

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

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(cleanConcepts, null, 2)};
`;
    
    // Write the clean content back
    fs.writeFileSync(filePath, cleanContent, 'utf8');
    
    console.log(`✅ Cleaned production file: ${filePath}`);
    console.log(`📊 Categories: ${cleanCategories.length}`);
    console.log(`📊 Concepts: ${cleanConcepts.length}`);
    
  } catch (error) {
    console.error('❌ Failed to clean production file:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  cleanProductionFile();
}

module.exports = { cleanProductionFile }; 