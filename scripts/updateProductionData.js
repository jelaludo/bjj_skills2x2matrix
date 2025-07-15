const fs = require('fs');
const path = require('path');

function updateProductionData() {
  const backupDir = path.join(__dirname, '../backups/BackupsSkillMasterLists');
  const productionDataPath = path.join(__dirname, '../src/data/productionData.ts');
  
  console.log('🔄 Looking for latest master list file...');
  
  try {
    // Find all TypeScript master list files
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('BJJMasterList_') && file.endsWith('.ts'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        const match = file.match(/BJJMasterList_(\d{8})_(\d+)Nodes\.ts/);
        const date = match ? match[1] : '';
        const nodeCount = match ? parseInt(match[2]) : 0;
        
        return {
          name: file,
          path: file,
          lastModified: stats.mtime,
          date: date,
          nodeCount: nodeCount
        };
      })
      .sort((a, b) => {
        // Sort by date (descending), then by node count (descending)
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date);
        }
        return b.nodeCount - a.nodeCount;
      });
    
    if (files.length === 0) {
      throw new Error('No TypeScript master list files found');
    }
    
    const latestFile = files[0];
    console.log(`📁 Latest file: ${latestFile.name} (${latestFile.nodeCount} nodes, ${latestFile.date})`);
    
    // Create the production data content
    const productionDataContent = `// Production data file - imports the latest master list
// This file should be updated when deploying new versions
// Last updated: ${new Date().toISOString()}
// Source file: ${latestFile.name}

// Import the latest master list data
export { categories, skillsMasterList } from '../../backups/BackupsSkillMasterLists/${latestFile.name.replace('.ts', '')};

// Re-export the interface for type safety
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
`;
    
    // Write the production data file
    fs.writeFileSync(productionDataPath, productionDataContent);
    
    console.log('✅ Production data updated!');
    console.log(`📁 File: ${path.basename(productionDataPath)}`);
    console.log(`📊 Source: ${latestFile.name} (${latestFile.nodeCount} nodes)`);
    console.log(`📅 Date: ${latestFile.date}`);
    
    return {
      productionDataPath,
      sourceFile: latestFile.name,
      nodeCount: latestFile.nodeCount,
      date: latestFile.date
    };
    
  } catch (error) {
    console.error('❌ Failed to update production data:', error.message);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  try {
    updateProductionData();
  } catch (error) {
    process.exit(1);
  }
}

module.exports = { updateProductionData }; 