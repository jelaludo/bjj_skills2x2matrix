const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  // Use __dirname to resolve the path relative to this file
  const dataDir = path.resolve(__dirname, '../../src/data/local');
  console.log('Looking for files in:', dataDir);
  try {
    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.js'))
      .map(file => {
        const stats = fs.statSync(path.join(dataDir, file));
        return {
          name: file,
          path: `src/data/local/${file}`,
          lastModified: stats.mtime
        };
      });
    console.log('Found files:', files);
    res.status(200).json(files);
  } catch (error) {
    console.error('Failed to list local files:', error);
    res.status(500).json({ error: 'Failed to list local files', details: error.message });
  }
} 