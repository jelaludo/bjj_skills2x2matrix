const fetch = require('node-fetch');

async function testServerEndpoints() {
  const baseUrl = 'http://localhost:3001';
  
  console.log('剥 Testing server endpoints...\n');
  
  // Test 1: Check if server is running
  try {
    console.log('1・鞘Ε Testing server connectivity...');
    const response = await fetch(`${baseUrl}/api/master-lists`);
    console.log('笨・Server is running and responding');
    console.log('投 Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('刀 Master lists found:', data.files?.length || 0);
      if (data.files && data.files.length > 0) {
        console.log('搭 Available files:');
        data.files.slice(0, 3).forEach(file => {
          console.log(`   - ${file.displayName}`);
        });
        if (data.files.length > 3) {
          console.log(`   ... and ${data.files.length - 3} more`);
        }
      }
    } else {
      console.log('笶・Server responded with error:', response.status);
    }
  } catch (error) {
    console.log('笶・Cannot connect to server:', error.message);
    console.log('庁 Make sure to run: node server.js');
    return;
  }
  
  console.log('\n2・鞘Ε Testing backup directory access...');
  try {
    const response = await fetch(`${baseUrl}/backups`);
    console.log('刀 Backup directory status:', response.status);
  } catch (error) {
    console.log('笶・Backup directory error:', error.message);
  }
  
  console.log('\n3・鞘Ε Testing data directory access...');
  try {
    const response = await fetch(`${baseUrl}/data`);
    console.log('刀 Data directory status:', response.status);
  } catch (error) {
    console.log('笶・Data directory error:', error.message);
  }
  
  console.log('\n笨・Server endpoint test complete!');
}

testServerEndpoints().catch(console.error); 
