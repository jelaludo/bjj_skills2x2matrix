const { MongoClient } = require('mongodb');

async function updateMemesCategory() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'BJJSkillMatrix');
    const collection = db.collection('categories');
    
    // Update the Memes category with custom axis labels
    const result = await collection.updateOne(
      { name: 'Memes' },
      { 
        $set: { 
          xAxis: { left: 'Self-Deprecating', right: 'Bragging' },
          yAxis: { bottom: 'Insightful', top: 'Buffoonery' }
        } 
      }
    );
    
    if (result.matchedCount > 0) {
      console.log('✅ Successfully updated Memes category with custom axis labels');
      console.log('X-Axis: Self-Deprecating ←→ Bragging');
      console.log('Y-Axis: Insightful ←→ Buffoonery');
    } else {
      console.log('❌ Memes category not found in database');
    }
    
  } catch (error) {
    console.error('Error updating Memes category:', error);
  } finally {
    await client.close();
  }
}

updateMemesCategory(); 