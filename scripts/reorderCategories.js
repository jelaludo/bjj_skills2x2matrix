const fs = require('fs');
const path = require('path');

// Define the new category order and mappings
const NEW_CATEGORY_ORDER = [
  "Grappling Primitives",
  "Tactics", // was "Tactic"
  "Strategy", 
  "Training",
  "Coaching",
  "Memes",
  "21 Immutable Principles", // was "21 Immutable Principles (Paulo)"
  "32 Principles",
  "White Belt Tips",
  "Techniques", // was "Technique"
  "Internal"
];

// Category name mappings for concepts
const CATEGORY_MAPPINGS = {
  "Tactic": "Tactics",
  "21 Immutable Principles (Paulo)": "21 Immutable Principles", 
  "Technique": "Techniques"
};

// Categories to remove (concepts will be reassigned)
const CATEGORIES_TO_REMOVE = [
  "Biomechanics", // merge into Grappling Primitives
  "Mental", // merge into Training and Grappling Primitives
  "BJJ Definitions" // merge into Memes
];

// Categories to merge into (for reassigning removed categories)
const MERGE_MAPPINGS = {
  "Biomechanics": "Grappling Primitives",
  "Mental": "Training", // default merge, but some might go to Grappling Primitives
  "BJJ Definitions": "Memes"
};

function reorderCategories() {
  const filePath = path.join(__dirname, '../backups/BackupsSkillMasterLists/BJJMasterList_20250715_130Nodes.json');
  
  console.log('🔄 Reading master list file...');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log(`📊 Found ${data.categories.length} categories and ${data.skillsMasterList.length} concepts`);
  
  // Create backup
  const backupPath = filePath.replace('.json', '_backup_before_reorder.json');
  fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
  console.log(`💾 Created backup: ${path.basename(backupPath)}`);
  
  // Step 1: Update concept categories
  console.log('🔄 Updating concept categories...');
  let updatedCount = 0;
  
  data.skillsMasterList.forEach(concept => {
    const oldCategory = concept.category;
    
    // Apply category name mappings
    if (CATEGORY_MAPPINGS[oldCategory]) {
      concept.category = CATEGORY_MAPPINGS[oldCategory];
      updatedCount++;
      console.log(`  📝 Updated "${oldCategory}" → "${concept.category}"`);
    }
    
    // Handle categories to remove
    if (CATEGORIES_TO_REMOVE.includes(concept.category)) {
      const newCategory = MERGE_MAPPINGS[concept.category];
      concept.category = newCategory;
      updatedCount++;
      console.log(`  🔄 Merged "${oldCategory}" → "${newCategory}"`);
    }
  });
  
  console.log(`✅ Updated ${updatedCount} concepts`);
  
  // Step 2: Reorder and filter categories
  console.log('🔄 Reordering categories...');
  
  // Create new categories array in the specified order
  const newCategories = [];
  
  NEW_CATEGORY_ORDER.forEach(categoryName => {
    // Find existing category with this name (or similar name)
    let existingCategory = data.categories.find(cat => cat.name === categoryName);
    
    // Handle name variations
    if (!existingCategory) {
      if (categoryName === "Tactics") {
        existingCategory = data.categories.find(cat => cat.name === "Tactic");
      } else if (categoryName === "21 Immutable Principles") {
        existingCategory = data.categories.find(cat => cat.name === "21 Immutable Principles (Paulo)");
      } else if (categoryName === "Techniques") {
        existingCategory = data.categories.find(cat => cat.name === "Technique");
      }
    }
    
    if (existingCategory) {
      // Update name if needed
      if (existingCategory.name !== categoryName) {
        console.log(`  📝 Renaming category: "${existingCategory.name}" → "${categoryName}"`);
        existingCategory.name = categoryName;
      }
      
      newCategories.push(existingCategory);
    } else {
      console.log(`  ⚠️  Category "${categoryName}" not found in original data`);
    }
  });
  
  // Step 3: Update the data
  data.categories = newCategories;
  
  // Step 4: Update concept colors to match new category colors
  console.log('🔄 Updating concept colors...');
  const categoryColorMap = {};
  data.categories.forEach(cat => {
    categoryColorMap[cat.name] = cat.color;
  });
  
  data.skillsMasterList.forEach(concept => {
    const categoryColor = categoryColorMap[concept.category];
    if (categoryColor && concept.color !== categoryColor) {
      concept.color = categoryColor;
    }
  });
  
  // Step 5: Save the updated file
  const outputPath = filePath.replace('.json', '_reordered.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  // Step 6: Generate statistics
  const categoryStats = {};
  data.skillsMasterList.forEach(concept => {
    categoryStats[concept.category] = (categoryStats[concept.category] || 0) + 1;
  });
  
  console.log('\n📊 Final category distribution:');
  NEW_CATEGORY_ORDER.forEach(categoryName => {
    const count = categoryStats[categoryName] || 0;
    console.log(`  ${categoryName}: ${count} concepts`);
  });
  
  console.log(`\n✅ Reordering completed!`);
  console.log(`📁 Updated file: ${path.basename(outputPath)}`);
  console.log(`📁 Backup file: ${path.basename(backupPath)}`);
  
  return {
    originalFile: filePath,
    updatedFile: outputPath,
    backupFile: backupPath,
    categoryStats
  };
}

// Run the script
if (require.main === module) {
  try {
    reorderCategories();
  } catch (error) {
    console.error('❌ Error during reordering:', error.message);
    process.exit(1);
  }
}

module.exports = { reorderCategories }; 