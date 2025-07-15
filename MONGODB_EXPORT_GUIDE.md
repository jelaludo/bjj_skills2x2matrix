# MongoDB Export Guide

This guide explains how to export your local BJJ Skill Matrix data to MongoDB format for production deployment.

## Overview

The export process creates MongoDB-ready files that can be used to seed your production database. The system generates multiple file formats for different use cases.

## Export Process

### 1. Prepare Your Data
1. Switch to **Local Development** mode in the app
2. Select your master list file
3. Make sure all your categories and concepts are up to date

### 2. Export to MongoDB Format
1. Click the **"Dev MODE"** button in the bottom-right corner
2. Click **"Convert to MongoDB"**
3. The system will automatically download multiple files:
   - `categories-[date]-[nodeCount]Nodes.js` - Categories for MongoDB seeding
   - `concepts-[date]-[nodeCount]Nodes.js` - Concepts for MongoDB seeding
   - `mongo-ready-[date]-[nodeCount]Nodes.ts` - Combined TypeScript file
   - `mongo-ready-[date]-[nodeCount]Nodes.json` - Combined JSON file

### 3. Files Generated

#### Individual Files (for direct seeding)
- **categories-[date]-[nodeCount]Nodes.js**: Contains only categories in CommonJS format
- **concepts-[date]-[nodeCount]Nodes.js**: Contains only concepts in CommonJS format

#### Combined Files (for reference/backup)
- **mongo-ready-[date]-[nodeCount]Nodes.ts**: TypeScript file with both categories and concepts
- **mongo-ready-[date]-[nodeCount]Nodes.json**: JSON file with both categories and concepts

## Seeding MongoDB

### Option 1: Automatic Seeding (Recommended)
```bash
npm run seed:from-mongo-ready
```

This script will:
1. Find the most recent mongo-ready file
2. Connect to your MongoDB database
3. Clear existing data
4. Seed categories and concepts
5. Verify the seeding was successful

### Option 2: Manual Seeding
If you prefer to seed manually:

```bash
# Seed categories
node scripts/seedCategories.js

# Seed concepts  
node scripts/seedConcepts.js
```

**Note**: You'll need to update the `require()` statements in these scripts to point to your generated files.

### Option 3: Using the Generated Files Directly
Copy the generated `.js` files to `src/data/` and update the seeding scripts:

```javascript
// In scripts/seedCategories.js
const categories = require("../src/data/categories-[date]-[nodeCount]Nodes.js");

// In scripts/seedConcepts.js  
const skillsMasterList = require("../src/data/concepts-[date]-[nodeCount]Nodes.js");
```

## File Locations

### Downloaded Files
- Files are downloaded to your browser's default download folder
- Each file is timestamped and includes the node count for easy identification

### Backend Storage
- Files are also saved to `mongo-ready/` directory in your project
- This allows the seeding script to automatically find the latest export

## Production Deployment

### 1. Export Your Data
Follow the export process above to create MongoDB-ready files.

### 2. Deploy Your Application
Deploy your React app to your hosting platform (Vercel, Netlify, etc.)

### 3. Seed Your Production Database
Run the seeding script against your production MongoDB instance:

```bash
# Set your production MongoDB URI
export MONGODB_URI="your-production-mongodb-uri"
export MONGODB_DB="your-production-database-name"

# Run the seeding
npm run seed:from-mongo-ready
```

### 4. Verify Deployment
- Check that your app loads data from MongoDB
- Verify all categories and concepts are present
- Test the application functionality

## Troubleshooting

### No mongo-ready files found
- Make sure you've run "Convert to MongoDB" in the app
- Check that the `mongo-ready/` directory exists
- Verify files were downloaded successfully

### Seeding fails
- Check your MongoDB connection string
- Ensure your database user has write permissions
- Verify the mongo-ready files are valid JSON/JavaScript

### Data mismatch
- Make sure you're using the latest export
- Check that your local data is up to date before exporting
- Verify the node count matches your expectations

## File Format Examples

### Categories File (categories-[date]-[nodeCount]Nodes.js)
```javascript
// Auto-generated MongoDB-ready categories file
// Generated on: 2025-01-15T10:30:00.000Z
// Node count: 125

module.exports = [
  {
    "_id": "local-1705312200000",
    "name": "Technique",
    "color": "#4F8EF7",
    "xAxis": { "left": "Mental", "right": "Physical" },
    "yAxis": { "bottom": "Self", "top": "Opponent" }
  },
  // ... more categories
];
```

### Concepts File (concepts-[date]-[nodeCount]Nodes.js)
```javascript
// Auto-generated MongoDB-ready concepts file
// Generated on: 2025-01-15T10:30:00.000Z
// Node count: 125

module.exports = [
  {
    "id": "BJJ-001",
    "concept": "Guard Pull",
    "description": "A technique to bring the opponent into your guard...",
    "short_description": "Bringing opponent into guard",
    "category": "Technique",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.8,
    "axis_mental_physical": 0.3,
    "brightness": 5,
    "size": 3
  },
  // ... more concepts
];
```

## Best Practices

1. **Always export before deployment** - Ensure your production data is current
2. **Keep backups** - Save the generated files for rollback if needed
3. **Test seeding locally** - Verify the process works before production
4. **Monitor node counts** - Ensure the exported data matches your expectations
5. **Version your exports** - Use descriptive file names with dates and counts 