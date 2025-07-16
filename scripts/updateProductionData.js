const fs = require('fs');
const path = require('path');

// Function to extract node count from filename
function extractNodeCount(filename) {
  const match = filename.match(/(\d+)Nodes\.ts$/);
  return match ? parseInt(match[1], 10) : 0;
}

// Function to find the latest master list file
function findLatestMasterList() {
  const dataDir = path.join(__dirname, '../src/data');
  const files = fs.readdirSync(dataDir);
  
  // Filter for master list files
  const masterListFiles = files.filter(file => 
    file.startsWith('BJJMasterList_') && file.endsWith('.ts') && file !== 'productionData.ts'
  );
  
  if (masterListFiles.length === 0) {
    throw new Error('No master list files found');
  }
  
  // Sort by node count (descending) and then by date (descending)
  const sortedFiles = masterListFiles.sort((a, b) => {
    const aNodes = extractNodeCount(a);
    const bNodes = extractNodeCount(b);
    
    if (aNodes !== bNodes) {
      return bNodes - aNodes; // Higher node count first
    }
    
    // If same node count, sort by date (newer first)
    return b.localeCompare(a);
  });
  
  return sortedFiles[0];
}

// Function to update productionData.ts
function updateProductionData() {
  try {
    console.log('🔄 Updating production data...');
    
    const latestFile = findLatestMasterList();
    const nodeCount = extractNodeCount(latestFile);
    
    console.log(`📊 Found latest master list: ${latestFile} (${nodeCount} nodes)`);
    
    // Read the current productionData.ts
    const productionDataPath = path.join(__dirname, '../src/data/productionData.ts');
    let content = fs.readFileSync(productionDataPath, 'utf8');
    
    // Update the file list to put the latest file first
    const masterListFiles = [
      `'./${latestFile.replace('.ts', '')}'`,  // Latest file first
      "'./BJJMasterList_20250716_136Nodes'",
      "'./BJJMasterList_20250716_135Nodes'",
      "'./BJJMasterList_20250715_142Nodes'",
      "'./BJJMasterList_20250715_141Nodes'",
      "'./BJJMasterList_20250715_134Nodes'",
      "'./BJJMasterList_20250715_133Nodes'"
    ];
    
    // Remove duplicates and create the new array
    const uniqueFiles = [...new Set(masterListFiles)];
    const fileArrayString = `[\n      ${uniqueFiles.join(',\n      ')}\n    ]`;
    
    // Replace the masterListFiles array in the content
    const updatedContent = content.replace(
      /const masterListFiles = \[[\s\S]*?\];/,
      `const masterListFiles = ${fileArrayString};`
    );
    
    // Update the last updated comment
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '-');
    const finalContent = updatedContent.replace(
      /\/\/ Last updated: \d{4}-\d{2}-\d{2}/,
      `// Last updated: ${today}`
    );
    
    // Write the updated content back
    fs.writeFileSync(productionDataPath, finalContent, 'utf8');
    
    console.log(`✅ Production data updated to use: ${latestFile}`);
    console.log(`📅 Last updated: ${today}`);
    console.log(`🔢 Node count: ${nodeCount}`);
    
  } catch (error) {
    console.error('❌ Failed to update production data:', error.message);
    process.exit(1);
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateProductionData();
}

module.exports = { updateProductionData, findLatestMasterList }; 