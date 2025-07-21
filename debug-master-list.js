const fs = require('fs');
const path = require('path');

console.log('剥 Debugging master list loading...\n');

// Check if backup directory exists
const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
console.log('1・鞘Ε Checking backup directory:', backupDir);

if (fs.existsSync(backupDir)) {
  console.log('笨・Backup directory exists');
  
  // List all files in the directory
  const allFiles = fs.readdirSync(backupDir);
  console.log('刀 All files in directory:', allFiles.length);
  
  // Filter for master list files
  const masterListFiles = allFiles.filter(file => 
    file.startsWith('BJJMasterList_') && file.endsWith('.json')
  );
  
  console.log('搭 Master list JSON files found:', masterListFiles.length);
  masterListFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  
  // Also check for TS files
  const tsFiles = allFiles.filter(file => 
    file.startsWith('BJJMasterList_') && file.endsWith('.ts')
  );
  
  console.log('搭 Master list TS files found:', tsFiles.length);
  tsFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  
} else {
  console.log('笶・Backup directory does not exist');
  console.log('庁 Creating directory...');
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('笨・Created backup directory');
}

// Check if server is running
console.log('\n2・鞘Ε Testing server connection...');
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/master-lists',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('投 Server response status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('笨・Server responded with data');
      console.log('刀 Files returned:', jsonData.files?.length || 0);
    } catch (error) {
      console.log('笶・Failed to parse server response:', error.message);
      console.log('塘 Raw response:', data.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.log('笶・Cannot connect to server:', error.message);
  console.log('庁 Make sure to run: node server.js');
});

req.end();

console.log('\n笨・Debug complete!'); 
