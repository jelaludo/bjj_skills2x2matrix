const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const backupDir = path.join(process.cwd(), 'backups', 'BackupsSkillMasterLists');
    
    if (!fs.existsSync(backupDir)) {
      return res.status(200).json({ backups: [] });
    }

    const files = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.ts') || file.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        const isJson = file.endsWith('.json');
        
        // Extract metadata from filename
        const match = file.match(/SkillsMasterList_BackUp_(\d{2})(\d{2})(\d{4})_(\d{2})(\d{2})_(\d+)Nodes/);
        let metadata = null;
        
        if (match) {
          const [, month, day, year, hour, minute, nodeCount] = match;
          metadata = {
            date: `${month}/${day}/${year}`,
            time: `${hour}:${minute}`,
            nodeCount: parseInt(nodeCount),
            fullDate: new Date(`${year}-${month}-${day}T${hour}:${minute}:00`)
          };
        }

        return {
          name: file,
          path: `backups/BackupsSkillMasterLists/${file}`,
          lastModified: stats.mtime,
          size: stats.size,
          type: isJson ? 'json' : 'typescript',
          metadata
        };
      })
      .sort((a, b) => {
        // Sort by date (newest first)
        if (a.metadata && b.metadata) {
          return b.metadata.fullDate - a.metadata.fullDate;
        }
        // Fallback to file modification time
        return new Date(b.lastModified) - new Date(a.lastModified);
      });

    res.status(200).json({ 
      backups: files,
      backupDir: backupDir
    });

  } catch (error) {
    console.error('Failed to list backups:', error);
    res.status(500).json({ 
      error: 'Failed to list backups', 
      details: error.message 
    });
  }
}; 