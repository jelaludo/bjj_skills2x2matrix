const { MongoClient } = require("mongodb");
const categories = require("../src/data/categories");

const uri = process.env.MONGODB_URI || "mongodb+srv://gfabrot:SZJ5SJ1e5zVO90ns@bjjskillmatrix.ynjznku.mongodb.net/?retryWrites=true&w=majority&appName=BJJSkillMatrix";
const dbName = process.env.MONGODB_DB || "BJJSkillMatrix";

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("categories");
    
    // Drop the collection to force a reseed
    await collection.drop().catch(err => {
      if (err.code !== 26) { // Ignore error if collection doesn't exist
        throw err;
      }
    });
    
    // Insert the categories
    await collection.insertMany(categories);
    console.log("Seeded categories!");
    
    // Verify the insert
    const count = await collection.countDocuments();
    console.log(`Inserted ${count} categories`);
    
  } catch (err) {
    console.error("Error seeding categories:", err);
  } finally {
    await client.close();
  }
}

seed();
