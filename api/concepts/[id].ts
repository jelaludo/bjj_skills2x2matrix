import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client = await clientPromise;
  const db = client.db('BJJSkillMatrix');
  const collection = db.collection('concepts');
  const { id } = req.query;

  if (req.method === 'GET') {
    const concept = await collection.findOne({ _id: new ObjectId(id as string) });
    res.status(200).json(concept);
  } else if (req.method === 'PUT') {
    const update = req.body;
    await collection.updateOne({ _id: new ObjectId(id as string) }, { $set: update });
    res.status(200).json({ message: 'Updated' });
  } else if (req.method === 'DELETE') {
    await collection.deleteOne({ _id: new ObjectId(id as string) });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 