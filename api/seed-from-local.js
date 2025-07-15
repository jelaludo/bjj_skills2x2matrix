const clientPromise = require('./lib/mongodb');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { localFile, clearExisting = false } = req.body;

    if (!localFile) {
      return res.status(400).json({ error: 'localFile is required' });
    }

    // Read the local file
    const filePath = path.join(process.cwd(), 'backups', 'BackupsSkillMasterLists', localFile);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Local file not found' });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract data from the file (simple regex approach)
    const categoriesMatch = fileContent.match(/export const categories = (\[[\s\S]*?\]);/);
    const conceptsMatch = fileContent.match(/export const skillsMasterList: BJJConcept\[\] = (\[[\s\S]*?\]);/);
    
    if (!categoriesMatch || !conceptsMatch) {
      return res.status(400).json({ error: 'Could not extract categories or concepts from the file' });
    }

    // Parse the extracted data
    const categories = eval(categoriesMatch[1]);
    const concepts = eval(conceptsMatch[1]);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'BJJSkillMatrix');
    const conceptsCollection = db.collection('concepts');
    const categoriesCollection = db.collection('categories');

    if (clearExisting) {
      console.log('Clearing existing data...');
      await conceptsCollection.deleteMany({});
      await categoriesCollection.deleteMany({});
    }

    // Prepare data for MongoDB (add timestamps and ensure proper IDs)
    const mongoCategories = categories.map(cat => ({
      _id: cat._id || require('mongodb').ObjectId.createFromHexString('000000000000000000000000'),
      name: cat.name,
      color: cat.color,
      xAxis: cat.xAxis || { left: 'Mental', right: 'Physical' },
      yAxis: cat.yAxis || { bottom: 'Self', top: 'Opponent' },
      created_date: new Date().toISOString().split('T')[0],
      last_modified: new Date().toISOString().split('T')[0]
    }));

    const mongoConcepts = concepts.map(concept => ({
      _id: new require('mongodb').ObjectId(),
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

    // Insert data
    console.log('Seeding categories...');
    const categoryResult = await categoriesCollection.insertMany(mongoCategories);
    
    console.log('Seeding concepts...');
    const conceptResult = await conceptsCollection.insertMany(mongoConcepts);

    console.log('Seeding completed successfully!');
    
    res.status(200).json({
      message: 'Seeding completed successfully',
      categoriesInserted: categoryResult.insertedCount,
      conceptsInserted: conceptResult.insertedCount,
      file: localFile
    });

  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ 
      error: 'Failed to seed MongoDB', 
      details: error.message 
    });
  }
}; 