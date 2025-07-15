const clientPromise = require('../lib/mongodb');

module.exports = async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'BJJSkillMatrix');
    const collection = db.collection('categories');

    if (req.method === 'GET') {
      const categories = await collection.find({}).toArray();
      console.log('Found categories:', categories);
      res.status(200).json(categories);
    } else if (req.method === 'POST') {
      const { name, color, xAxis, yAxis } = req.body;
      if (!name || !color) {
        res.status(400).json({ error: 'Name and color are required.' });
        return;
      }
      const categoryData = { 
        name, 
        color,
        xAxis: xAxis || { left: 'Mental', right: 'Physical' },
        yAxis: yAxis || { bottom: 'Self', top: 'Opponent' }
      };
      const result = await collection.insertOne(categoryData);
      res.status(201).json(result.ops ? result.ops[0] : { ...categoryData, _id: result.insertedId });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Categories API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 