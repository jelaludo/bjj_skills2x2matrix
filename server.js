const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the public folder
app.use('/data', express.static(path.join(__dirname, 'public/data')));

// Serve backup files
app.use('/backups', express.static(path.join(__dirname, 'backups')));

// API endpoint to list master list files
app.get('/api/master-lists', (req, res) => {
  const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
  console.log('Looking for master list files in:', backupDir);
  
  try {
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('BJJMasterList_') && file.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        
        // Parse filename to extract date and node count
        const match = file.match(/BJJMasterList_(\d{8})_(\d+)Nodes\.json/);
        const date = match ? match[1] : '';
        const nodeCount = match ? parseInt(match[2]) : 0;
        
        return {
          name: file,
          path: `backups/BackupsSkillMasterLists/${file}`,
          lastModified: stats.mtime,
          date: date,
          nodeCount: nodeCount,
          displayName: `${date} (${nodeCount} nodes)`
        };
      })
      .sort((a, b) => {
        // Sort by date (descending), then by node count (descending)
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date);
        }
        return b.nodeCount - a.nodeCount;
      });
    
    console.log('Found master list files:', files);
    res.json({ files, latest: files.length > 0 ? files[0] : null });
  } catch (error) {
    console.error('Failed to list master list files:', error);
    res.status(500).json({ error: 'Failed to list master list files', details: error.message });
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
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    const inputPath = path.join(backupDir, tsFile);
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
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    const filePath = path.join(backupDir, loadFile);
    
    // Security check: ensure the file is within the backup directory
    if (!filePath.startsWith(backupDir)) {
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

// API endpoint to create backups
app.post('/api/backup', (req, res) => {
  try {
    const { categories, concepts, backupName } = req.body;
    
    if (!categories || !concepts) {
      return res.status(400).json({ error: 'Missing categories or concepts data' });
    }
    
    // Generate backup filename with timestamp
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const nodeCount = concepts.length;
    
    const fileName = backupName || `BJJMasterList_${dateStr}_${nodeCount}Nodes`;
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    
    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Create TypeScript backup file
    const tsContent = `export const categories = ${JSON.stringify(categories, null, 2)};

export interface BJJConcept {
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
}

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(concepts, null, 2)};
`;
    
    const tsFilePath = path.join(backupDir, `${fileName}.ts`);
    fs.writeFileSync(tsFilePath, tsContent);
    
    // Create JSON backup file
    const jsonContent = JSON.stringify({
      categories,
      skillsMasterList: concepts
    }, null, 2);
    
    const jsonFilePath = path.join(backupDir, `${fileName}.json`);
    fs.writeFileSync(jsonFilePath, jsonContent);
    
    console.log(`Backup created: ${fileName}.ts and ${fileName}.json`);
    
    res.json({
      success: true,
      files: {
        ts: `${fileName}.ts`,
        json: `${fileName}.json`
      },
      nodeCount,
      timestamp: now.toISOString()
    });
    
  } catch (error) {
    console.error('Failed to create backup:', error);
    res.status(500).json({ 
      error: 'Failed to create backup', 
      details: error.message 
    });
  }
});

// API endpoint to list backups
app.get('/api/list-backups', (req, res) => {
  try {
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    
    if (!fs.existsSync(backupDir)) {
      return res.json({ backups: [] });
    }
    
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('BJJMasterList_') && file.endsWith('.ts'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        return {
          name: file,
          size: stats.size,
          lastModified: stats.mtime,
          path: `backups/BackupsSkillMasterLists/${file}`
        };
      })
      .sort((a, b) => b.lastModified - a.lastModified);
    
    res.json({ backups: files });
  } catch (error) {
    console.error('Failed to list backups:', error);
    res.status(500).json({ 
      error: 'Failed to list backups', 
      details: error.message 
    });
  }
});

// API endpoint to seed from local file
app.post('/api/seed-from-local', (req, res) => {
  try {
    const { localFile, clearExisting } = req.body;
    
    if (!localFile) {
      return res.status(400).json({ error: 'Missing localFile parameter' });
    }
    
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    const filePath = path.join(backupDir, localFile);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Local file not found' });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Here you would typically insert the data into MongoDB
    // For now, we'll just return success with the data structure
    const conceptsInserted = data.skillsMasterList ? data.skillsMasterList.length : 0;
    const categoriesInserted = data.categories ? data.categories.length : 0;
    
    console.log(`Seeded ${conceptsInserted} concepts and ${categoriesInserted} categories from ${localFile}`);
    
    res.json({
      success: true,
      conceptsInserted,
      categoriesInserted,
      file: localFile
    });
    
  } catch (error) {
    console.error('Failed to seed from local:', error);
    res.status(500).json({ 
      error: 'Failed to seed from local', 
      details: error.message 
    });
  }
});

// API endpoint to save master list file
app.post('/api/save-master-list', (req, res) => {
  try {
    const { fileName, data } = req.body;
    
    if (!fileName || !data) {
      return res.status(400).json({ error: 'Missing fileName or data' });
    }
    
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    
    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Save as JSON file
    const jsonFilePath = path.join(backupDir, fileName);
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    
    console.log(`Saved master list: ${fileName}`);
    
    res.json({
      success: true,
      fileName,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Failed to save master list:', error);
    res.status(500).json({ 
      error: 'Failed to save master list', 
      details: error.message 
    });
  }
});

// API endpoint to save MongoDB-ready files
app.post('/api/save-mongo-ready', (req, res) => {
  try {
    const { timestamp, nodeCount, categories, concepts, categoriesContent, conceptsContent, combinedContent } = req.body;
    
    if (!timestamp || !nodeCount || !categories || !concepts) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    // Create MongoDB-ready directory
    const mongoDir = path.resolve(__dirname, 'mongo-ready');
    if (!fs.existsSync(mongoDir)) {
      fs.mkdirSync(mongoDir, { recursive: true });
    }
    
    // Save individual files
    const categoriesFile = path.join(mongoDir, `categories-${timestamp}-${nodeCount}Nodes.js`);
    const conceptsFile = path.join(mongoDir, `concepts-${timestamp}-${nodeCount}Nodes.js`);
    const combinedFile = path.join(mongoDir, `mongo-ready-${timestamp}-${nodeCount}Nodes.ts`);
    const jsonFile = path.join(mongoDir, `mongo-ready-${timestamp}-${nodeCount}Nodes.json`);
    
    fs.writeFileSync(categoriesFile, categoriesContent);
    fs.writeFileSync(conceptsFile, conceptsContent);
    fs.writeFileSync(combinedFile, combinedContent);
    fs.writeFileSync(jsonFile, JSON.stringify({ categories, skillsMasterList: concepts }, null, 2));
    
    console.log(`Saved MongoDB-ready files: ${nodeCount} nodes, ${categories.length} categories`);
    
    res.json({
      success: true,
      files: {
        categories: path.basename(categoriesFile),
        concepts: path.basename(conceptsFile),
        combined: path.basename(combinedFile),
        json: path.basename(jsonFile)
      },
      nodeCount,
      categoryCount: categories.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Failed to save MongoDB-ready files:', error);
    res.status(500).json({ 
      error: 'Failed to save MongoDB-ready files', 
      details: error.message 
    });
  }
});

// API endpoint to save files to src/data/ for production
app.post('/api/save-to-src-data', (req, res) => {
  console.log('🔍 save-to-src-data endpoint called');
  console.log('🔍 Request body:', { fileName: req.body.fileName, contentLength: req.body.content?.length });
  console.log('🔍 __dirname:', __dirname);
  console.log('🔍 process.cwd():', process.cwd());
  
  try {
    const { fileName, content } = req.body;
    
    if (!fileName || !content) {
      console.log('❌ Missing fileName or content');
      return res.status(400).json({ error: 'FileName and content are required' });
    }
    
    // Create src/data directory if it doesn't exist
    const srcDataDir = path.resolve(__dirname, 'src', 'data');
    console.log('🔍 Resolved src/data directory:', srcDataDir);
    
    if (!fs.existsSync(srcDataDir)) {
      console.log('🔍 Creating src/data directory...');
      fs.mkdirSync(srcDataDir, { recursive: true });
    }
    
    // Save the file to src/data/
    const filePath = path.join(srcDataDir, fileName);
    console.log('🔍 Saving file to:', filePath);
    
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ File saved to src/data/: ${fileName}`);
    
    res.json({
      success: true,
      message: 'File saved to src/data/ successfully',
      fileName,
      path: srcDataDir
    });
    
  } catch (error) {
    console.error('❌ Failed to save file to src/data/:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to save file to src/data/', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 