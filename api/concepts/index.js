const clientPromise = require('../lib/mongodb');

module.exports = async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'BJJSkillMatrix');
    const collection = db.collection('concepts');

    if (req.method === 'GET') {
      const concepts = await collection.find({}).toArray();
      console.log('Found concepts:', concepts.length);
      res.status(200).json(concepts);
    } else if (req.method === 'POST') {
      const concept = req.body;
      const result = await collection.insertOne(concept);
      res.status(201).json(result.ops ? result.ops[0] : { ...concept, _id: result.insertedId });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Concepts API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 