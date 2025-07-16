// Test script to verify production data loading
const { getProductionData } = require('./src/data/productionData.ts');

async function testProductionData() {
  try {
    console.log('🧪 Testing production data loading...');
    
    const data = await getProductionData();
    
    console.log('✅ Production data loaded successfully');
    console.log('📊 Categories count:', data.categories?.length || 0);
    console.log('📊 Concepts count:', data.skillsMasterList?.length || 0);
    
    if (data.categories && data.categories.length > 0) {
      console.log('📋 First category:', data.categories[0]);
    }
    
    if (data.skillsMasterList && data.skillsMasterList.length > 0) {
      console.log('📋 First concept:', data.skillsMasterList[0]);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testProductionData(); 