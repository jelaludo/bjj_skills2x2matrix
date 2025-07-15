const fs = require('fs');
const path = require('path');

function createTsVersion() {
  const jsonPath = path.join(__dirname, '../backups/BackupsSkillMasterLists/BJJMasterList_20250715_130Nodes.json');
  const tsPath = path.join(__dirname, '../backups/BackupsSkillMasterLists/BJJMasterList_20250715_130Nodes.ts');
  
  console.log('🔄 Reading JSON file...');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  console.log('🔄 Creating TypeScript version...');
  
  const tsContent = `export const categories = ${JSON.stringify(data.categories, null, 2)};

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

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(data.skillsMasterList, null, 2)};
`;

  fs.writeFileSync(tsPath, tsContent);
  
  console.log('✅ TypeScript version created!');
  console.log(`📁 File: ${path.basename(tsPath)}`);
  
  // Generate statistics
  const categoryStats = {};
  data.skillsMasterList.forEach(concept => {
    categoryStats[concept.category] = (categoryStats[concept.category] || 0) + 1;
  });
  
  console.log('\n📊 Category distribution:');
  Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count} concepts`);
    });
}

if (require.main === module) {
  try {
    createTsVersion();
  } catch (error) {
    console.error('❌ Error creating TypeScript version:', error.message);
    process.exit(1);
  }
}

module.exports = { createTsVersion }; 