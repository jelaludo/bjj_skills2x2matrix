const fs = require('fs');
const path = require('path');

// Function to find the latest master list file
function findLatestMasterList() {
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  const files = fs.readdirSync(dataDir);
  
  // Filter for master list files
  const masterListFiles = files.filter(file => 
    file.startsWith('BJJMasterList_') && file.endsWith('.ts')
  );
  
  if (masterListFiles.length === 0) {
    throw new Error('No master list files found in src/data/');
  }
  
  // Sort by node count (extract number from filename)
  masterListFiles.sort((a, b) => {
    const aMatch = a.match(/(\d+)Nodes/);
    const bMatch = b.match(/(\d+)Nodes/);
    const aCount = aMatch ? parseInt(aMatch[1]) : 0;
    const bCount = bMatch ? parseInt(bMatch[1]) : 0;
    return bCount - aCount; // Descending order
  });
  
  return masterListFiles[0].replace('.ts', ''); // Remove .ts extension
}

// Function to update productionData.ts
function updateProductionData() {
  try {
    const latestFile = findLatestMasterList();
    console.log(`Latest master list file: ${latestFile}`);
    
    const productionDataPath = path.join(__dirname, '..', 'src', 'data', 'productionData.ts');
    
    // Read current content
    let content = fs.readFileSync(productionDataPath, 'utf8');
    
    // Update the import statement
    const importRegex = /import\('\.\/[^']+'\)/;
    const newImport = `import('./${latestFile}')`;
    
    if (importRegex.test(content)) {
      content = content.replace(importRegex, newImport);
    } else {
      console.warn('Could not find import statement to update');
    }
    
    // Update the comment
    const commentRegex = /\/\/ Source file: [^\n]+/;
    const newComment = `// Source file: ${latestFile}.ts`;
    
    if (commentRegex.test(content)) {
      content = content.replace(commentRegex, newComment);
    }
    
    // Write updated content
    fs.writeFileSync(productionDataPath, content);
    
    console.log(`✅ Updated productionData.ts to use ${latestFile}`);
    return latestFile;
    
  } catch (error) {
    console.error('Failed to update production data:', error);
    throw error;
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateProductionData();
}

module.exports = { updateProductionData, findLatestMasterList }; 