const fs = require('fs');
const path = require('path');

function findLatestMasterList() {
  const backupDir = path.join(__dirname, '../backups/BackupsSkillMasterLists');
  
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
    
    return latestFile;
    
  } catch (error) {
    console.error('❌ Failed to find latest master list:', error.message);
    throw error;
  }
}

// Create a dynamic import file that can be used in production
function createDynamicImport() {
  const latestFile = findLatestMasterList();
  const dynamicImportPath = path.join(__dirname, '../src/data/dynamicMasterList.ts');
  const srcDataPath = path.join(__dirname, '../src/data');
  
  // Ensure src/data directory exists
  if (!fs.existsSync(srcDataPath)) {
    fs.mkdirSync(srcDataPath, { recursive: true });
  }
  
  // Copy the latest master list file to src/data/
  const sourceFilePath = path.join(__dirname, '../backups/BackupsSkillMasterLists', latestFile.name);
  const destFilePath = path.join(srcDataPath, latestFile.name);
  
  fs.copyFileSync(sourceFilePath, destFilePath);
  console.log(`📋 Copied ${latestFile.name} to src/data/`);
  
  const dynamicImportContent = `// Dynamic master list import - auto-generated
// This file is automatically updated to import the latest master list
// Last updated: ${new Date().toISOString()}
// Source file: ${latestFile.name}

// Import the latest master list data
export { categories, skillsMasterList } from './${latestFile.name.replace('.ts', '')}';

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

// Export metadata about the current file
export const masterListMetadata = {
  fileName: '${latestFile.name}',
  nodeCount: ${latestFile.nodeCount},
  date: '${latestFile.date}',
  lastModified: '${latestFile.lastModified.toISOString()}'
};
`;
  
  fs.writeFileSync(dynamicImportPath, dynamicImportContent);
  console.log('✅ Dynamic import file created!');
  console.log(`📁 File: ${path.basename(dynamicImportPath)}`);
  
  return {
    dynamicImportPath,
    sourceFile: latestFile.name,
    nodeCount: latestFile.nodeCount,
    date: latestFile.date
  };
}

// Run the script
if (require.main === module) {
  try {
    createDynamicImport();
  } catch (error) {
    process.exit(1);
  }
}

module.exports = { findLatestMasterList, createDynamicImport }; 