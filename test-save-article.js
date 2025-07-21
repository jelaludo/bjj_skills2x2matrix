const fetch = require('node-fetch');

async function testSaveArticle() {
  try {
    console.log('🧪 Testing save-article endpoint...\n');
    
    const testArticle = {
      articleData: {
        id: 'test-article-123',
        title: 'Test Article',
        content: 'This is a test article content.',
        sourcePdf: 'test.pdf',
        createdAt: new Date().toISOString(),
        metadata: {
          pages: 1,
          fileSize: '10KB',
          extractedAt: new Date().toISOString()
        }
      },
      contentFileName: 'test-article-123.json'
    };

    const response = await fetch('http://localhost:3001/api/save-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testArticle),
    });

    console.log('📊 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Article saved successfully!');
      console.log('📄 Response:', data);
    } else {
      const errorData = await response.json();
      console.log('❌ Failed to save article:');
      console.log('📄 Error:', errorData);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Make sure the backend server is running: node server.js');
    console.log('2. Check that the server is on port 3001');
    console.log('3. Verify the src/articles directory exists');
  }
}

testSaveArticle(); 