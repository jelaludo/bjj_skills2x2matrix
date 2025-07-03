async function testAPI() {
  const fetch = (await import('node-fetch')).default;
  try {
    console.log('Testing local-files API...');
    
    // Test GET request to list files
    const listResponse = await fetch('http://localhost:3000/api/local-files');
    console.log('List files response status:', listResponse.status);
    
    if (listResponse.ok) {
      const files = await listResponse.json();
      console.log('Found files:', files.map(f => f.name));
      
      if (files.length > 0) {
        // Test loading a specific file
        const testFile = files[0].name;
        console.log(`Testing load of file: ${testFile}`);
        
        const loadResponse = await fetch('http://localhost:3000/api/local-files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ loadFile: testFile })
        });
        
        console.log('Load file response status:', loadResponse.status);
        
        if (loadResponse.ok) {
          const result = await loadResponse.json();
          console.log('Load result keys:', Object.keys(result));
          if (result.data) {
            console.log('Data keys:', Object.keys(result.data));
            if (result.data.skillsMasterList) {
              console.log(`Loaded ${result.data.skillsMasterList.length} concepts`);
            }
          }
        } else {
          const error = await loadResponse.json();
          console.log('Load error:', error);
        }
      }
    } else {
      console.log('List files error:', await listResponse.text());
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI(); 