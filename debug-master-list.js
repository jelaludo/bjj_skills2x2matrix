const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging master list loading...\n');

// Check if backup directory exists
const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
console.log('1�E�⃣ Checking backup directory:', backupDir);

if (fs.existsSync(backupDir)) {
  console.log('✁EBackup directory exists');
  
  // List all files in the directory
  const allFiles = fs.readdirSync(backupDir);
  console.log('📁 All files in directory:', allFiles.length);
  
  // Filter for master list files
  const masterListFiles = allFiles.filter(file => 
    file.startsWith('BJJMasterList_') && file.endsWith('.json')
  );
  
  console.log('📋 Master list JSON files found:', masterListFiles.length);
  masterListFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  
  // Also check for TS files
  const tsFiles = allFiles.filter(file => 
    file.startsWith('BJJMasterList_') && file.endsWith('.ts')
  );
  
  console.log('📋 Master list TS files found:', tsFiles.length);
  tsFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  
} else {
  console.log('❁EBackup directory does not exist');
  console.log('💡 Creating directory...');
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('✁ECreated backup directory');
}

// Check if server is running
console.log('\n2�E�⃣ Testing server connection...');
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/master-lists',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('📊 Server response status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('✁EServer responded with data');
      console.log('📁 Files returned:', jsonData.files?.length || 0);
    } catch (error) {
      console.log('❁EFailed to parse server response:', error.message);
      console.log('📄 Raw response:', data.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.log('❁ECannot connect to server:', error.message);
  console.log('💡 Make sure to run: node server.js');
});

req.end();

console.log('\n✁EDebug complete!'); 
