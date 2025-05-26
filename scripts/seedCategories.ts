import { MongoClient } from "mongodb";
import { categories } from "../src/data/SkillsMasterList";

const uri = process.env.MONGODB_URI || "mongodb+srv://gfabrot:SZJ5SJ1e5zVO90ns@bjjskillmatrix.ynjznku.mongodb.net/?retryWrites=true&w=majority&appName=BJJSkillMatrix";
const dbName = process.env.MONGODB_DB || "BJJSkillMatrix";

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("categories");
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(categories);
      console.log("Seeded categories!");
    } else {
      console.log("Categories already exist, skipping seed.");
    }
  } catch (err) {
    console.error("Error seeding categories:", err);
  } finally {
    await client.close();
  }
}

seed();