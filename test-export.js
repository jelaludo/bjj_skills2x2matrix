const fs = require('fs');
const path = require('path');

// Simulate the data that would come from your app
const testCategories = [
  {
    "_id": "683334f56fd5182fa18c7833",
    "name": "Training",
    "color": "#00CED1"
  },
  {
    "_id": "683334f56fd5182fa18c7835", 
    "name": "32 Principles",
    "color": "#FFD700"
  },
  {
    "_id": "683334f56fd5182fa18c7834",
    "name": "Memes (Silly)",
    "color": "#8A2BE2",
    "axisXTop": "Self-deprecating vs Bragging",
    "axisXBottom": "",
    "axisYLeft": "hint-of-truth vs bullshit/delusional",
    "axisYRight": ""
  }
];

const testConcepts = [
  {
    "_id": "683409a61fa612ab8b07d094",
    "id": "BJJ-001",
    "concept": "Dilemmas",
    "description": "Create Dilemmas, not problems. Damned if they do, damned if they don't.",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.7,
    "axis_mental_physical": 0.6,
    "brightness": 3,
    "size": 3
  },
  {
    "_id": "683409a61fa612ab8b07d096",
    "id": "BJJ-003", 
    "concept": "Grip Fighting",
    "description": "Controlling and breaking grips to dominate exchanges.",
    "short_description": "",
    "category": "Technique",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.3,
    "brightness": 2,
    "size": 3
  }
];

// Test the export function (simulating what's in Sidebar.tsx)
function testExport() {
  console.log('Testing export function...');
  
  // Generate TS content (current format)
  const tsString = `export const categories = ${JSON.stringify(testCategories, null, 2)};

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

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(testConcepts, null, 2)};
`.trim();

  // Generate JSON content (new format for local dev)
  const jsonContent = {
    categories: testCategories,
    skillsMasterList: testConcepts
  };

  // Write both files
      const tsPath = path.join(__dirname, 'backups/BackupsSkillMasterLists/test_export.ts');
    const jsonPath = path.join(__dirname, 'backups/BackupsSkillMasterLists/test_export.json');
  
  fs.writeFileSync(tsPath, tsString);
  fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
  
  console.log(`✅ Generated ${tsPath}`);
  console.log(`✅ Generated ${jsonPath}`);
  console.log(`📊 Categories: ${testCategories.length}`);
  console.log(`📊 Concepts: ${testConcepts.length}`);
  
  // Test that the JSON can be parsed back
  try {
    const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log('✅ JSON file is valid and can be parsed');
    console.log('✅ JSON structure matches expected format');
  } catch (err) {
    console.error('❌ JSON file is invalid:', err.message);
  }
}

testExport(); 