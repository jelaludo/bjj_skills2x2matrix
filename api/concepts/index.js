const clientPromise = require('../lib/mongodb');

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('BJJSkillMatrix');
  const collection = db.collection('concepts');

  if (req.method === 'GET') {
    const concepts = await collection.find({}).toArray();
    res.status(200).json(concepts);
  } else if (req.method === 'POST') {
    let concept = req.body;
    // Manually parse if needed
    if (typeof concept === 'string') {
      try {
        concept = JSON.parse(concept);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
        return;
      }
    }
    const result = await collection.insertOne(concept);
    res.status(201).json(result.ops ? result.ops[0] : concept);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 