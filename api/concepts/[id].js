const { ObjectId } = require('mongodb');
const clientPromise = require('../lib/mongodb');

module.exports = async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'BJJSkillMatrix');
    const collection = db.collection('concepts');
    const { id } = req.query;

    // Handle both MongoDB ObjectIds and our custom BJJ-XXX format
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: new ObjectId(id) }
      : { id: id };  // Use our custom id field for BJJ-XXX format

    if (req.method === 'PUT') {
      const updates = req.body;
      await collection.updateOne(
        query,
        { $set: updates }
      );
      res.status(200).json({ message: 'Concept updated' });
    } else if (req.method === 'DELETE') {
      await collection.deleteOne(query);
      res.status(200).json({ message: 'Concept deleted' });
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Concept API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 