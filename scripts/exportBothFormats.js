const fs = require('fs');
const path = require('path');

// Function to extract data from TypeScript file
function extractFromTsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract categories array
  const categoriesMatch = content.match(/export const categories = (\[[\s\S]*?\]);/);
  if (!categoriesMatch) {
    throw new Error('Could not find categories export in TypeScript file');
  }
  
  // Extract skillsMasterList array
  const skillsMatch = content.match(/export const skillsMasterList: BJJConcept\[\] = (\[[\s\S]*?\]);/);
  if (!skillsMatch) {
    throw new Error('Could not find skillsMasterList export in TypeScript file');
  }
  
  try {
    const categories = JSON.parse(categoriesMatch[1]);
    const skillsMasterList = JSON.parse(skillsMatch[1]);
    
    return { categories, skillsMasterList };
  } catch (err) {
    throw new Error(`Failed to parse JSON from TypeScript file: ${err.message}`);
  }
}

// Function to generate TypeScript content
function generateTsContent(categories, skillsMasterList) {
  return `export const categories = ${JSON.stringify(categories, null, 2)};

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

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(skillsMasterList, null, 2)};
`.trim();
}

// Function to generate JSON content
function generateJsonContent(categories, skillsMasterList) {
  return {
    categories,
    skillsMasterList
  };
}

// Main function
function exportBothFormats() {
      const sourceFile = path.join(__dirname, '../backups/BackupsSkillMasterLists/SkillsMasterListSourceOfTruth07032025.ts');
    const outputDir = path.join(__dirname, '../backups/BackupsSkillMasterLists');
  
  console.log('🔄 Reading source file...');
  console.log(`📁 Source: ${sourceFile}`);
  
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Source file not found: ${sourceFile}`);
    process.exit(1);
  }
  
  try {
    // Extract data from source file
    const { categories, skillsMasterList } = extractFromTsFile(sourceFile);
    
    console.log(`✅ Extracted ${categories.length} categories and ${skillsMasterList.length} concepts`);
    
    // Generate base filename (without extension)
    const baseName = path.basename(sourceFile, '.ts');
    
    // Generate TypeScript version
    const tsContent = generateTsContent(categories, skillsMasterList);
    const tsPath = path.join(outputDir, `${baseName}.ts`);
    fs.writeFileSync(tsPath, tsContent);
    console.log(`✅ Generated: ${tsPath}`);
    
    // Generate JSON version
    const jsonContent = generateJsonContent(categories, skillsMasterList);
    const jsonPath = path.join(outputDir, `${baseName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
    console.log(`✅ Generated: ${jsonPath}`);
    
    // Verify JSON can be parsed back
    try {
      const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      console.log('✅ JSON file is valid and can be parsed');
    } catch (err) {
      console.error('❌ JSON file is invalid:', err.message);
    }
    
    console.log('\n🎉 Export completed successfully!');
    console.log(`📊 Categories: ${categories.length}`);
    console.log(`📊 Concepts: ${skillsMasterList.length}`);
    
  } catch (err) {
    console.error('❌ Error during export:', err.message);
    process.exit(1);
  }
}

// Run the script
exportBothFormats(); 