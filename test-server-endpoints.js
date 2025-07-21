const fetch = require('node-fetch');

async function testServerEndpoints() {
  const baseUrl = 'http://localhost:3001';
  
  console.log('🔍 Testing server endpoints...\n');
  
  // Test 1: Check if server is running
  try {
    console.log('1�E�⃣ Testing server connectivity...');
    const response = await fetch(`${baseUrl}/api/master-lists`);
    console.log('✁EServer is running and responding');
    console.log('📊 Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('📁 Master lists found:', data.files?.length || 0);
      if (data.files && data.files.length > 0) {
        console.log('📋 Available files:');
        data.files.slice(0, 3).forEach(file => {
          console.log(`   - ${file.displayName}`);
        });
        if (data.files.length > 3) {
          console.log(`   ... and ${data.files.length - 3} more`);
        }
      }
    } else {
      console.log('❁EServer responded with error:', response.status);
    }
  } catch (error) {
    console.log('❁ECannot connect to server:', error.message);
    console.log('💡 Make sure to run: node server.js');
    return;
  }
  
  console.log('\n2�E�⃣ Testing backup directory access...');
  try {
    const response = await fetch(`${baseUrl}/backups`);
    console.log('📁 Backup directory status:', response.status);
  } catch (error) {
    console.log('❁EBackup directory error:', error.message);
  }
  
  console.log('\n3�E�⃣ Testing data directory access...');
  try {
    const response = await fetch(`${baseUrl}/data`);
    console.log('📁 Data directory status:', response.status);
  } catch (error) {
    console.log('❁EData directory error:', error.message);
  }
  
  console.log('\n✁EServer endpoint test complete!');
}

testServerEndpoints().catch(console.error); 
