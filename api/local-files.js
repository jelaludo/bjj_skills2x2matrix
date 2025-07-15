const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  // Use __dirname to resolve the path relative to this file
  const backupDir = path.resolve(__dirname, '../../backups/BackupsSkillMasterLists');
  console.log('Looking for backup files in:', backupDir);
  try {
    const files = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        return {
          name: file,
          path: `backups/BackupsSkillMasterLists/${file}`,
          lastModified: stats.mtime
        };
      });
    console.log('Found backup files:', files);
    res.status(200).json(files);
  } catch (error) {
    console.error('Failed to list backup files:', error);
    res.status(500).json({ error: 'Failed to list backup files', details: error.message });
  }
} 