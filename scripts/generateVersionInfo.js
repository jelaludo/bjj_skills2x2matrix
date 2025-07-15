const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateVersionInfo() {
  try {
    // Get git information
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const commitMessage = execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf8' }).trim();
    const commitDate = execSync('git log -1 --pretty=format:"%cd" --date=short', { encoding: 'utf8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    
    const versionInfo = {
      commitHash,
      commitMessage,
      commitDate,
      branch,
      buildTime: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    };
    
    // Create the version info file
    const outputPath = path.join(__dirname, '../src/versionInfo.json');
    fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));
    
    console.log('✅ Version info generated:');
    console.log(`  Commit: ${commitHash}`);
    console.log(`  Message: ${commitMessage}`);
    console.log(`  Date: ${commitDate}`);
    console.log(`  Branch: ${branch}`);
    console.log(`  File: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Failed to generate version info:', error.message);
    
    // Create a fallback version info
    const fallbackInfo = {
      commitHash: 'unknown',
      commitMessage: 'Version info unavailable',
      commitDate: new Date().toISOString().split('T')[0],
      branch: 'unknown',
      buildTime: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    };
    
    const outputPath = path.join(__dirname, '../src/versionInfo.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackInfo, null, 2));
    console.log('📝 Created fallback version info');
  }
}

if (require.main === module) {
  generateVersionInfo();
}

module.exports = { generateVersionInfo }; 