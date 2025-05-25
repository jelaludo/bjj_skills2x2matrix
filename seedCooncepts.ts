import { MongoClient } from "mongodb";
import { skillsMasterList } from "../src/data/SkillsMasterList";

// Load your MongoDB URI from .env or paste it here
const uri = process.env.MONGODB_URI || "YOUR_MONGODB_URI_HERE";
const dbName = process.env.MONGODB_DB || "YOUR_DB_NAME_HERE";

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("concepts");
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(skillsMasterList);
      console.log("Seeded concepts!");
    } else {
      console.log("Concepts already exist, skipping seed.");
    }
  } catch (err) {
    console.error("Error seeding concepts:", err);
  } finally {
    await client.close();
  }
}

seed();
