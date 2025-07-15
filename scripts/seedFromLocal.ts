import { MongoClient, ObjectId } from 'mongodb';
import { convertLocalToMongo } from './convertLocalToMongo';

interface SeedOptions {
  localFilePath: string;
  mongoUri?: string;
  dbName?: string;
  clearExisting?: boolean;
}

async function seedFromLocal(options: SeedOptions) {
  const {
    localFilePath,
    mongoUri = process.env.MONGODB_URI,
    dbName = process.env.MONGODB_DB || 'BJJSkillMatrix',
    clearExisting = false
  } = options;

  if (!mongoUri) {
    throw new Error('MongoDB URI is required. Set MONGODB_URI environment variable or pass mongoUri option.');
  }

  let client: MongoClient | undefined;

  try {
    console.log('🔄 Converting local file to MongoDB format...');
    const converted = convertLocalToMongo(localFilePath, './temp-converted');
    
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(mongoUri);
    await client.connect();
    
    const db = client.db(dbName);
    const conceptsCollection = db.collection('concepts');
    const categoriesCollection = db.collection('categories');
    
    if (clearExisting) {
      console.log('🗑️  Clearing existing data...');
      await conceptsCollection.deleteMany({});
      await categoriesCollection.deleteMany({});
    }
    
    // Convert string IDs to ObjectIds for MongoDB
    const mongoCategories = converted.categories.map(cat => ({
      ...cat,
      _id: cat._id ? new ObjectId(cat._id) : new ObjectId()
    }));
    
    const mongoConcepts = converted.concepts.map(concept => ({
      ...concept,
      _id: concept._id ? new ObjectId(concept._id) : new ObjectId()
    }));
    
    console.log('📤 Seeding categories...');
    const categoryResult = await categoriesCollection.insertMany(mongoCategories);
    console.log(`✅ Inserted ${categoryResult.insertedCount} categories`);
    
    console.log('📤 Seeding concepts...');
    const conceptResult = await conceptsCollection.insertMany(mongoConcepts);
    console.log(`✅ Inserted ${conceptResult.insertedCount} concepts`);
    
    console.log('🎉 Seeding completed successfully!');
    console.log(`📊 Database: ${dbName}`);
    console.log(`📄 Categories: ${categoryResult.insertedCount}`);
    console.log(`📄 Concepts: ${conceptResult.insertedCount}`);
    
    return {
      categoriesInserted: categoryResult.insertedCount,
      conceptsInserted: conceptResult.insertedCount
    };
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const localFile = args[0];
  const clearExisting = args.includes('--clear');
  
  if (!localFile) {
    console.error('Usage: ts-node seedFromLocal.ts <local-file-path> [--clear]');
    console.error('  --clear: Clear existing data before seeding');
    process.exit(1);
  }
  
  seedFromLocal({
    localFilePath: localFile,
    clearExisting
  }).catch(error => {
    console.error('Failed to seed:', error);
    process.exit(1);
  });
}

export { seedFromLocal }; 