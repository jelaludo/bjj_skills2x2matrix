const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use('/data', express.static(path.join(__dirname, 'public/data')));

// API endpoint to list local files
app.get('/api/local-files', (req, res) => {
  const dataDir = path.resolve(__dirname, 'public/data/local');
  console.log('Looking for files in:', dataDir);
  
  try {
    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.ts'))
      .map(file => {
        const stats = fs.statSync(path.join(dataDir, file));
        return {
          name: file,
          path: `public/data/local/${file}`,
          lastModified: stats.mtime
        };
      });
    console.log('Found files:', files);
    res.json(files);
  } catch (error) {
    console.error('Failed to list local files:', error);
    res.status(500).json({ error: 'Failed to list local files', details: error.message });
  }
});

// API endpoint to handle file operations
app.post('/api/local-files', (req, res) => {
  const { tsFile, loadFile } = req.body;
  
  // Handle TS to JSON conversion
  if (tsFile) {
    if (!tsFile.endsWith('.ts')) {
      return res.status(400).json({ error: 'Invalid TS file' });
    }
    const dataDir = path.resolve(__dirname, 'public/data/local');
    const inputPath = path.join(dataDir, tsFile);
    const outputPath = inputPath.replace(/\.ts$/, '.json');
    try {
      execSync(`node scripts/convertTsDataToJson.js "${inputPath}" "${outputPath}"`);
      return res.json({ jsonFile: path.basename(outputPath) });
    } catch (err) {
      return res.status(500).json({ error: 'Conversion failed', details: err.message });
    }
  }
  
  // Handle loading a specific file
  if (loadFile) {
    const dataDir = path.resolve(__dirname, 'public/data/local');
    const filePath = path.join(dataDir, loadFile);
    
    // Security check: ensure the file is within the data directory
    if (!filePath.startsWith(dataDir)) {
      return res.status(400).json({ error: 'Invalid file path' });
    }
    
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // If it's a TS file, convert it first
      if (loadFile.endsWith('.ts')) {
        const outputPath = filePath.replace(/\.ts$/, '.json');
        try {
          execSync(`node scripts/convertTsDataToJson.js "${filePath}" "${outputPath}"`);
          const jsonContent = fs.readFileSync(outputPath, 'utf8');
          return res.json({ 
            data: JSON.parse(jsonContent),
            convertedFrom: loadFile,
            convertedTo: path.basename(outputPath)
          });
        } catch (err) {
          return res.status(500).json({ error: 'TS conversion failed', details: err.message });
        }
      }
      
      // If it's a JSON file, parse and return
      if (loadFile.endsWith('.json')) {
        return res.json({ 
          data: JSON.parse(fileContent),
          file: loadFile
        });
      }
      
      // If it's a JS file, try to parse as JSON (assuming it's already in JSON format)
      if (loadFile.endsWith('.js')) {
        return res.json({ 
          data: JSON.parse(fileContent),
          file: loadFile
        });
      }
      
      return res.status(400).json({ error: 'Unsupported file type' });
      
    } catch (err) {
      return res.status(500).json({ error: 'Failed to load file', details: err.message });
    }
  }
  
  return res.status(400).json({ error: 'Invalid request' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 