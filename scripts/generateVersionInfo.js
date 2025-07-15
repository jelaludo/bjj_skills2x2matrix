const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateVersionInfo() {
  try {
    // Get git information
    const gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const commitMessage = execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf8' }).trim();
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    
    // Get package.json version
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const version = packageJson.version;
    
    // Get build date
    const buildDate = new Date().toISOString().split('T')[0];
    const buildTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Create version info object
    const versionInfo = {
      version,
      gitHash,
      commitMessage,
      branch,
      buildDate,
      buildTime,
      fullBuildInfo: `${buildDate} ${buildTime}`
    };
    
    // Write to JSON file
    const outputPath = path.join(__dirname, '..', 'src', 'versionInfo.json');
    fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));
    
    console.log('✅ Version info generated:');
    console.log(`   Version: ${version}`);
    console.log(`   Git: ${gitHash} | "${commitMessage}"`);
    console.log(`   Branch: ${branch}`);
    console.log(`   Build: ${buildDate} ${buildTime}`);
    
    return versionInfo;
    
  } catch (error) {
    console.error('❌ Failed to generate version info:', error.message);
    
    // Fallback version info
    const fallbackInfo = {
      version: '0.1.0',
      gitHash: 'unknown',
      commitMessage: 'unknown',
      branch: 'unknown',
      buildDate: new Date().toISOString().split('T')[0],
      buildTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      fullBuildInfo: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
    
    const outputPath = path.join(__dirname, '..', 'src', 'versionInfo.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackInfo, null, 2));
    
    return fallbackInfo;
  }
}

// Run if called directly
if (require.main === module) {
  generateVersionInfo();
}

module.exports = { generateVersionInfo }; 