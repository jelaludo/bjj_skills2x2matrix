const fs = require('fs');
const path = require('path');

console.log('Starting conversion test...');

// Test the conversion logic directly
const inputPath = path.join(__dirname, 'backups/BackupsSkillMasterLists/SkillsMasterListv5.ts');
const outputPath = path.join(__dirname, 'backups/BackupsSkillMasterLists/test_output.json');

console.log('Reading file:', inputPath);
console.log('File exists:', fs.existsSync(inputPath));

const tsText = fs.readFileSync(inputPath, 'utf8');
console.log('File size:', tsText.length, 'characters');

// Check what exports are available
const exports = tsText.match(/export const (\w+)/g);
console.log('Available exports:', exports);

function extractArray(name) {
  console.log(`Extracting ${name}...`);
  const regex = new RegExp(`export const ${name} ?= ?(\[([\s\S]*?)\]);`, 'm');
  const match = tsText.match(regex);
  if (!match) {
    console.error(`Could not find array: ${name}`);
    throw new Error(`Could not find array: ${name}`);
  }
  console.log(`Found ${name}, length:`, match[1].length);
  
  // Try to parse as JSON (fix trailing commas)
  let arrText = match[1];
  arrText = arrText.replace(/,\s*([\]\}])/g, '$1');
  
  try {
    const result = JSON.parse(arrText);
    console.log(`Successfully parsed ${name}, items:`, result.length);
    return result;
  } catch (err) {
    console.error(`Failed to parse ${name}:`, err.message);
    console.log('First 200 chars of array text:', arrText.substring(0, 200));
    throw err;
  }
}

try {
  console.log('Starting extraction...');
  const categories = extractArray('categories');
  const skillsMasterList = extractArray('skillsMasterList');

  const out = { categories, skillsMasterList };
  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2));
  console.log(`Successfully wrote ${outputPath}`);
} catch (error) {
  console.error('Conversion failed:', error.message);
  console.error('Stack trace:', error.stack);
} 