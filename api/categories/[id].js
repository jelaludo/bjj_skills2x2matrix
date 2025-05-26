const clientPromise = require('../lib/mongodb');
const { ObjectId } = require('mongodb');

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('categories');
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, color } = req.body;
    if (!name || !color) {
      res.status(400).json({ error: 'Name and color are required.' });
      return;
    }
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name, color } });
    res.status(200).json({ message: 'Category updated.' });
  } else if (req.method === 'DELETE') {
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Category deleted.' });
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}; 