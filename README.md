# Getting Started with Create React App

## 🚨 CRITICAL: File Segregation System

**NEVER mix _id fields between local and production files. This is a fundamental system rule.**

### File Types:
- **Local Files (JSON)**: `backups/BackupsSkillMasterLists/*.json` - WITH `_id` fields
- **Production Files (TS)**: `src/data/*.ts` - WITHOUT `_id` fields

### Backup System:
When creating a backup, the system automatically creates TWO files:
- JSON file (with `_id`) for local development
- TS file (no `_id`) for production builds

**The file segregation is intentional and necessary. Don't try to "fix" this by making files consistent.**

📖 **See `FILE_SEGREGATION_SYSTEM.md` for complete documentation.**

---

## ⚠️ IMPORTANT: Always Run Commands from the Correct Directory

**CRITICAL:** All npm commands (including `npm start`) must be run from the `bjj-skill-matrix` folder, NOT the parent directory.

```bash
# ❌ WRONG - This will fail
cd C:\Users\owner\Documents\02_CodingProjects\BJJSkill_MatrixMapping
npm start

# ✅ CORRECT - This will work
cd C:\Users\owner\Documents\02_CodingProjects\BJJSkill_MatrixMapping\bjj-skill-matrix
npm start
```

**Why?** The `package.json` file is located in the `bjj-skill-matrix` subfolder, not in the parent directory.

### Quick Commands Reference
```bash
# Navigate to project directory
cd C:\Users\owner\Documents\02_CodingProjects\BJJSkill_MatrixMapping\bjj-skill-matrix

# Start development server
npm start

# Kill process on port 3000 (if needed)
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Install dependencies
npm install
```

---

## Tech Stack
Frontend: React (TypeScript)
Backend/API: Vercel Serverless Functions (Node.js, CommonJS)
Database: MongoDB Atlas (Cloud)
Deployment: Vercel

Development Workflow
Local Development:
Use vercel dev (not npm start) to run both the React frontend and API endpoints locally, mirroring the production environment.
MongoDB Integration:
All concepts (nodes) and categories are stored in a MongoDB Atlas database.
Environment variables (MONGODB_URI, MONGODB_DB) must be set both locally (.env.local) and in Vercel’s dashboard for production.
Master List Logic:
The skillsMasterList.js file is used only for initial seeding or as a fallback if the database is empty.
All live data (nodes and categories) is read from and written to MongoDB.
Adding, editing, or deleting nodes/categories in the app updates MongoDB directly.
The master list file is not automatically updated when you make changes in the app.
To back up or version your data, use the app’s export feature and commit the exported file to GitHub manually.
Production Deployment
The app is deployed on Vercel and uses the same MongoDB database as local development (if environment variables are set correctly).
All changes made in the app are immediately reflected in MongoDB and visible to all users.
Tip:
If you update your environment variables in Vercel, always trigger a redeploy for changes to take effect.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).




Bugs so far:
 Compatibility Issues & Solutions
Node.js Version
Issue: Vercel now requires Node.js 18.x for builds and serverless functions. Older versions (16.x) are deprecated, and newer (22.x) are not yet supported by all tools.
Solution:
Set "engines": { "node": "18.x" } in package.json.
Ensure your local development environment matches, or use nvm to switch Node versions.
Webpack/OpenSSL Error
Issue:
Apply to README.md
This occurs when using Webpack 4 (used by react-scripts@3) on Node 17+ due to OpenSSL 3 changes.
Solution:
Set the environment variable NODE_OPTIONS=--openssl-legacy-provider in Vercel.
Best fix: Upgrade to react-scripts@5, which is fully compatible with Node 18+ and does not require this workaround.
TypeScript & MongoDB _id Field
Issue:
MongoDB adds an _id field to every document.
TypeScript types (BJJConcept) did not include _id, causing build errors when backup files included it.
Solution:
Use a “loose” type for backups:
Apply to README.md
Use BJJConceptWithId[] for backup/import/export files, and keep app logic using the strict BJJConcept type.
Fallback Data Files
Issue:
Having both skillsMasterList.js and SkillsMasterList.ts in the repo caused case-sensitivity and import issues, especially on case-sensitive file systems and in CI/CD.
Solution:
Remove all fallback logic and references to local master list files.
Rely solely on MongoDB as the source of truth, with manual backups as needed.
Environment Variables
Issue:
Missing or misconfigured MONGODB_URI and MONGODB_DB in Vercel led to empty data or connection errors.
Solution:
Set these variables in both local .env.local and Vercel’s dashboard for all environments.
General Best Practices
Always use vercel dev for local development to mirror production.
Keep backup files (with _id) outside of src to avoid TypeScript build errors.
Regularly export and commit backups for versioning if needed.


#7/15/2025
Step 1: Start Development
npm start

Step 2: Switch to Local Mode
Look for the "Development Mode" section in the sidebar
Toggle to "Local Development"
Select your local file (e.g., SkillsMasterListSourceOfTruth07032025.ts)

Step 3: Make Changes
Add new concepts by clicking on the matrix
Edit existing concepts
Add new categories
All changes save to your local file automatically

Step 4: Convert & Deploy
Click "Convert to MongoDB" → Downloads MongoDB-ready file
Click "Seed MongoDB" → Updates your production database
git add . && git commit -m "Updated master list"
Deploy your app