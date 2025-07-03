const fs = require('fs');

if (process.argv.length < 4) {
  console.error('Usage: node convertTsDataToJson.js input.ts output.json');
  process.exit(1);
}

const [,, inputPath, outputPath] = process.argv;
const tsText = fs.readFileSync(inputPath, 'utf8');

function extractArray(name) {
  const regex = new RegExp(`export const ${name} ?= ?(\[([\s\S]*?)\]);`, 'm');
  const match = tsText.match(regex);
  if (!match) throw new Error(`Could not find array: ${name}`);
  // Try to parse as JSON (fix trailing commas)
  let arrText = match[1];
  arrText = arrText.replace(/,\s*([\]\}])/g, '$1');
  return JSON.parse(arrText);
}

const categories = extractArray('categories');
const skillsMasterList = extractArray('skillsMasterList');

const out = { categories, skillsMasterList };
fs.writeFileSync(outputPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${outputPath}`); 