# BJJ Skill Matrix - Development Workflow

## Overview

This document explains the new development workflow that allows you to work locally with TypeScript files and then convert/sync to MongoDB for production.

## Workflow Summary

1. **Develop Locally**: Work with local TypeScript files in development mode
2. **Convert to MongoDB**: Convert local data to MongoDB-ready format
3. **Git Push**: Commit your local changes
4. **Deploy**: MongoDB contains the production-ready data

## Development Mode

### Enabling Development Mode

1. Start the development server: `npm start`
2. Look for the **"Dev MODE"** button in the bottom-right corner (only visible in development)
3. Click the button to open the development mode popup
4. Toggle the switch to **Local Development**
5. Select your local file from the dropdown

### Working Locally

When in local mode:
- All CRUD operations work on local TypeScript files
- Changes are saved to your local file
- You can add new categories, concepts, and modify existing ones
- The interface works exactly the same as MongoDB mode

### Local File Structure

Your local files should be in `public/data/local/` and follow this structure:

```typescript
export const categories = [
  {
    "_id": "683334f56fd5182fa18c7833",
    "name": "Strategy",
    "color": "#FF8C00",
    "xAxis": { "left": "Mental", "right": "Physical" },
    "yAxis": { "bottom": "Self", "top": "Opponent" }
  },
  {
    "_id": "683334f56fd5182fa18c7834",
    "name": "Meme Quadrant for BJJ",
    "color": "#8A2BE2",
    "xAxis": { "left": "Self-Deprecating", "right": "Bragging" },
    "yAxis": { "bottom": "Insightful", "top": "Buffoonery" }
  }
  // ... more categories
];

export interface BJJConcept {
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
}

export const skillsMasterList: BJJConcept[] = [
  {
    "_id": "683409a61fa612ab8b07d094",
    "id": "BJJ-001",
    "concept": "Dilemmas",
    "description": "Create Dilemmas, not problems...",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.7,
    "axis_mental_physical": 0.6,
    "brightness": 3,
    "size": 3
  }
  // ... more concepts
];
```

## Converting to MongoDB

### Option 1: Using the UI (Recommended)

1. Click the **"Dev MODE"** button in the bottom-right corner
2. Make sure you're in **Local Development** mode
3. Select your local file
4. Click **"Convert to MongoDB"** button
5. A JSON file will be downloaded with MongoDB-ready data
6. Use this file to seed your MongoDB database

### Option 2: Using Command Line

```bash
# Convert a local file to MongoDB format
npm run convert:local-to-mongo public/data/local/SkillsMasterListSourceOfTruth07032025.ts

# Seed MongoDB directly from a local file
npm run seed:from-local public/data/local/SkillsMasterListSourceOfTruth07032025.ts --clear
```

## Seeding MongoDB

### Option 1: Using the UI

1. Click the **"Dev MODE"** button in the bottom-right corner
2. Make sure you're in **Local Development** mode
3. Click **"Seed MongoDB"** button
4. The app will automatically convert and seed your MongoDB database
5. You'll see a success message with the number of items seeded

### Option 2: Using Command Line

```bash
# Seed MongoDB from a local file (keeps existing data)
npm run seed:from-local public/data/local/SkillsMasterListSourceOfTruth07032025.ts

# Seed MongoDB from a local file (clears existing data first)
npm run seed:from-local public/data/local/SkillsMasterListSourceOfTruth07032025.ts --clear
```

## Complete Workflow Example

### Step 1: Start Development
```bash
npm start
```

### Step 2: Switch to Local Mode
1. Open the app in your browser
2. Click the **"Dev MODE"** button in the bottom-right corner
3. Toggle to **Local Development**
4. Select your local file (e.g., `SkillsMasterListSourceOfTruth07032025.ts`)

### Step 3: Make Changes
- Add new concepts by clicking on the matrix
- Edit existing concepts by clicking on them
- Add new categories through the category manager
- All changes are saved to your local file

### Step 4: Convert and Deploy
1. Click **"Dev MODE"** button and then **"Convert to MongoDB"** to download the MongoDB-ready file
2. Click **"Dev MODE"** button and then **"Seed MongoDB"** to update your production database
3. Click **"Dev MODE"** button and then **"Create Backup"** to save a backup with timestamp and node count
4. Commit your local changes to git
5. Deploy your application

## File Management

### Creating New Local Files

1. Copy an existing `.ts` file in `public/data/local/`
2. Rename it with a descriptive name (e.g., `SkillsMasterList_v2.ts`)
3. Select it in the development mode dropdown
4. Start making your changes

### Backing Up Local Files

Your local files are automatically backed up when you:
- Export data (creates both `.ts` and `.json` versions)
- Convert to MongoDB (creates timestamped JSON files)

## Troubleshooting

### Local File Not Loading
- Check that the file exists in `public/data/local/`
- Ensure the file follows the correct TypeScript structure
- Check the browser console for any parsing errors

### MongoDB Seeding Fails
- Verify your MongoDB connection string in environment variables
- Check that the local file is valid and contains the expected data
- Look at the server logs for detailed error messages

### Development Mode Not Visible
- Ensure you're running in development mode (`NODE_ENV=development`)
- Check that the `isDevelopment` flag is set to `true`

## Environment Variables

Make sure these are set in your `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=BJJSkillMatrix
NODE_ENV=development
```

## Best Practices

1. **Always work locally first**: Make all changes in local mode before converting to MongoDB
2. **Use descriptive file names**: Include dates or version numbers in your local file names
3. **Backup regularly**: Export your data frequently to create backups
4. **Test in production mode**: Switch to MongoDB mode to verify your changes work correctly
5. **Commit local changes**: Always commit your local `.ts` files to git before deploying

## Future Enhancements

- [ ] Automatic sync between local and MongoDB
- [ ] Version control for local files
- [ ] Conflict resolution for concurrent edits
- [ ] Real-time collaboration features
- [ ] Advanced data validation and migration tools

## Category Axis Labels

### Custom Axis Labels
Each category can now have custom X and Y axis labels that make sense for that specific category:

**Examples:**
- **Strategy Category**: X: "Mental ←→ Physical", Y: "Self ←→ Opponent"
- **Meme Quadrant**: X: "Self-Deprecating ←→ Bragging", Y: "Insightful ←→ Buffoonery"
- **Training Category**: X: "Theory ←→ Practice", Y: "Individual ←→ Group"

### How to Set Axis Labels
1. Click on **Categories** in the sidebar
2. Click the edit button (✏️) next to any category
3. Fill in the X-Axis and Y-Axis label fields
4. Click **Save**

### Default Labels
If no custom labels are set, categories will use the default:
- X-Axis: "Mental ←→ Physical"
- Y-Axis: "Self ←→ Opponent" 