const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { fileName, content } = req.body;

    if (!fileName || !content) {
      return res.status(400).json({ error: 'FileName and content are required' });
    }

    // Create src/data directory if it doesn't exist
    const srcDataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(srcDataDir)) {
      fs.mkdirSync(srcDataDir, { recursive: true });
    }

    // Save the file to src/data/
    const filePath = path.join(srcDataDir, fileName);
    fs.writeFileSync(filePath, content);

    console.log(`✅ File saved to src/data/: ${fileName}`);

    res.status(200).json({
      success: true,
      message: 'File saved to src/data/ successfully',
      fileName,
      path: srcDataDir
    });

  } catch (error) {
    console.error('Failed to save file to src/data/:', error);
    res.status(500).json({ 
      error: 'Failed to save file to src/data/', 
      details: error.message 
    });
  }
}; 