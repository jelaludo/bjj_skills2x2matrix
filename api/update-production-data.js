const { updateProductionData } = require('../scripts/updateProductionData');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    console.log('🔄 API: Updating production data...');
    
    // Run the update script
    updateProductionData();
    
    res.status(200).json({
      success: true,
      message: 'Production data updated successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ API: Failed to update production data:', error);
    res.status(500).json({ 
      error: 'Failed to update production data', 
      details: error.message 
    });
  }
}; 