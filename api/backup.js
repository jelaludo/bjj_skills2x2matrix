const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { categories, concepts, backupName } = req.body;

    if (!categories || !concepts) {
      return res.status(400).json({ error: 'Categories and concepts are required' });
    }

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups', 'BackupsSkillMasterLists');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Generate backup filename
    const now = new Date();
    const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${now.getFullYear()}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const nodeCount = concepts.length;
    
    const fileName = backupName || `SkillsMasterList_BackUp_${dateStr}_${timeStr}_${nodeCount}Nodes.ts`;
    const filePath = path.join(backupDir, fileName);

    // Create the TypeScript content
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

    // Write the backup file
    fs.writeFileSync(filePath, tsContent);

    // Also create a JSON version for easier processing
    const jsonFileName = fileName.replace('.ts', '.json');
    const jsonFilePath = path.join(backupDir, jsonFileName);
    const jsonContent = {
      categories,
      skillsMasterList: concepts,
      metadata: {
        backupDate: now.toISOString(),
        nodeCount,
        version: '1.0'
      }
    };
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null, 2));

    console.log(`✅ Backup created: ${fileName}`);
    console.log(`✅ JSON backup created: ${jsonFileName}`);

    res.status(200).json({
      success: true,
      message: 'Backup created successfully',
      files: {
        ts: fileName,
        json: jsonFileName
      },
      path: backupDir,
      nodeCount
    });

  } catch (error) {
    console.error('Failed to create backup:', error);
    res.status(500).json({ 
      error: 'Failed to create backup', 
      details: error.message 
    });
  }
}; 