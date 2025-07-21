const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testPdfExtraction() {
  try {
    // Path to your PDF file
    const pdfPath = path.join(__dirname, 'src/assets/Coaching Advice for Grappling Athletes_ Wrestling, Judo, and BJJ.pdf');
    
    if (!fs.existsSync(pdfPath)) {
      console.error('❁EPDF file not found:', pdfPath);
      console.log('Please make sure the PDF file exists in the correct location.');
      return;
    }

    console.log('📄 Testing PDF extraction with:', path.basename(pdfPath));
    
    // Create form data
    const form = new FormData();
    form.append('pdf', fs.createReadStream(pdfPath));

    // Make request to the API
    const response = await fetch('http://localhost:3001/api/extract-pdf', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✁EPDF extraction successful!');
      console.log('📊 Metadata:', data.metadata);
      console.log('📝 First 200 characters of extracted text:');
      console.log(data.text.substring(0, 200) + '...');
    } else {
      const errorData = await response.json();
      console.error('❁EPDF extraction failed:');
      console.error('Status:', response.status);
      console.error('Error:', errorData);
    }
  } catch (error) {
    console.error('❁ETest failed:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Make sure the backend server is running: node server.js');
    console.log('2. Check that the server is on port 3001');
    console.log('3. Verify the PDF file exists in src/assets/');
  }
}

// Run the test
testPdfExtraction(); 
