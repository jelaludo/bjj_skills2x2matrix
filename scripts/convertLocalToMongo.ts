import fs from 'fs';
import path from 'path';

interface LocalBJJConcept {
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

interface LocalCategory {
  _id?: string;
  name: string;
  color: string;
  xAxis?: { left: string; right: string };
  yAxis?: { bottom: string; top: string };
}

interface MongoBJJConcept extends LocalBJJConcept {
  _id?: string;
  created_date?: string;
  last_modified?: string;
}

interface MongoCategory {
  _id?: string;
  name: string;
  color: string;
  xAxis?: { left: string; right: string };
  yAxis?: { bottom: string; top: string };
  created_date?: string;
  last_modified?: string;
}

function generateMongoId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function convertLocalToMongo(localFilePath: string, outputDir: string = './converted') {
  try {
    // Read the local TypeScript file
    const fileContent = fs.readFileSync(localFilePath, 'utf8');
    
    // Extract the data using regex (simple approach)
    const categoriesMatch = fileContent.match(/export const categories = (\[[\s\S]*?\]);/);
    const conceptsMatch = fileContent.match(/export const skillsMasterList: BJJConcept\[\] = (\[[\s\S]*?\]);/);
    
    if (!categoriesMatch || !conceptsMatch) {
      throw new Error('Could not extract categories or concepts from the file');
    }
    
    // Parse the extracted data
    const localCategories: LocalCategory[] = eval(categoriesMatch[1]);
    const localConcepts: LocalBJJConcept[] = eval(conceptsMatch[1]);
    
    // Convert to MongoDB format
    const mongoCategories: MongoCategory[] = localCategories.map(cat => ({
      _id: cat._id || generateMongoId(),
      name: cat.name,
      color: cat.color,
      xAxis: cat.xAxis || { left: 'Mental', right: 'Physical' },
      yAxis: cat.yAxis || { bottom: 'Self', top: 'Opponent' },
      created_date: new Date().toISOString().split('T')[0],
      last_modified: new Date().toISOString().split('T')[0]
    }));
    
    const mongoConcepts: MongoBJJConcept[] = localConcepts.map(concept => ({
      _id: generateMongoId(),
      id: concept.id,
      concept: concept.concept,
      description: concept.description,
      short_description: concept.short_description,
      category: concept.category,
      color: concept.color,
      axis_self_opponent: concept.axis_self_opponent,
      axis_mental_physical: concept.axis_mental_physical,
      brightness: concept.brightness,
      size: concept.size,
      created_date: new Date().toISOString().split('T')[0],
      last_modified: new Date().toISOString().split('T')[0]
    }));
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write MongoDB-ready files
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const conceptsFile = path.join(outputDir, `concepts-${timestamp}.json`);
    const categoriesFile = path.join(outputDir, `categories-${timestamp}.json`);
    
    fs.writeFileSync(conceptsFile, JSON.stringify(mongoConcepts, null, 2));
    fs.writeFileSync(categoriesFile, JSON.stringify(mongoCategories, null, 2));
    
    console.log(`✅ Conversion completed!`);
    console.log(`📁 Output directory: ${outputDir}`);
    console.log(`📄 Concepts: ${conceptsFile}`);
    console.log(`📄 Categories: ${categoriesFile}`);
    console.log(`📊 Converted ${mongoConcepts.length} concepts and ${mongoCategories.length} categories`);
    
    return {
      concepts: mongoConcepts,
      categories: mongoCategories,
      conceptsFile,
      categoriesFile
    };
    
  } catch (error) {
    console.error('❌ Conversion failed:', error);
    throw error;
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const localFile = args[0];
  const outputDir = args[1] || './converted';
  
  if (!localFile) {
    console.error('Usage: ts-node convertLocalToMongo.ts <local-file-path> [output-directory]');
    process.exit(1);
  }
  
  convertLocalToMongo(localFile, outputDir);
}

export { convertLocalToMongo, generateMongoId }; 