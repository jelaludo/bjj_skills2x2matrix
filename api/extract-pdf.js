const pdfParse = require('pdf-parse');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle file upload
    upload.single('pdf')(req, res, async (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file provided' });
      }

      try {
        // Extract text from PDF
        const data = await pdfParse(req.file.buffer);
        
        // Clean up the extracted text
        let text = data.text;
        
        // Remove excessive whitespace and normalize line breaks
        text = text
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple consecutive empty lines
          .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
          .trim();

        // Add metadata
        const result = {
          text: text,
          metadata: {
            pages: data.numpages,
            info: data.info,
            extractedAt: new Date().toISOString(),
            originalFilename: req.file.originalname,
            fileSize: req.file.size
          }
        };

        console.log(`PDF extracted successfully: ${req.file.originalname} (${data.numpages} pages)`);
        
        res.status(200).json(result);
      } catch (parseError) {
        console.error('PDF parsing error:', parseError);
        res.status(500).json({ 
          error: 'Failed to parse PDF file',
          details: parseError.message 
        });
      }
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}; 