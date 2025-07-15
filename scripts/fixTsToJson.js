const fs = require('fs');
const path = require('path');

// Function to convert TypeScript content to JSON
function convertTsToJson(tsContent) {
  // Extract categories
  const categoriesMatch = tsContent.match(/export const categories = (\[[\s\S]*?\]);/);
  if (!categoriesMatch) {
    throw new Error('Could not find categories in TypeScript file');
  }
  
  // Extract concepts
  const conceptsMatch = tsContent.match(/export const skillsMasterList: BJJConcept\[\] = (\[[\s\S]*?\]);/);
  if (!conceptsMatch) {
    throw new Error('Could not find skillsMasterList in TypeScript file');
  }
  
  // Parse the extracted data
  const categories = eval(categoriesMatch[1]);
  const concepts = eval(conceptsMatch[1]);
  
  return {
    categories,
    skillsMasterList: concepts
  };
}

// Fix the problematic file
const filePath = path.join(__dirname, '../backups/BackupsSkillMasterLists/BJJMasterList_20250715_124Nodes.json');
const backupPath = path.join(__dirname, '../backups/BackupsSkillMasterLists/BJJMasterList_20250715_124Nodes.backup.ts');

try {
  console.log('Reading TypeScript file...');
  const tsContent = fs.readFileSync(filePath, 'utf8');
  
  console.log('Converting to JSON...');
  const jsonData = convertTsToJson(tsContent);
  
  // Create backup of original TypeScript file
  console.log('Creating backup...');
  fs.writeFileSync(backupPath, tsContent);
  
  // Write proper JSON file
  console.log('Writing JSON file...');
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  
  console.log('✅ Successfully converted TypeScript to JSON!');
  console.log(`📁 Original saved as: ${path.basename(backupPath)}`);
  console.log(`📄 JSON file: ${path.basename(filePath)}`);
  console.log(`📊 Categories: ${jsonData.categories.length}`);
  console.log(`🎯 Concepts: ${jsonData.skillsMasterList.length}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} 