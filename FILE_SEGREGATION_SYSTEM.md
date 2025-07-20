# File Segregation System - BJJ Skill Matrix

## 🚨 CRITICAL: _id Field Management

**NEVER mix _id fields between local and production files. This is a fundamental system rule.**

## 📁 File Types & Purposes

### 1. Local Files (JSON) - WITH _id fields
- **Location**: `backups/BackupsSkillMasterLists/*.json`
- **Purpose**: Local development, MongoDB compatibility
- **Format**: Contains `_id` fields for both categories and concepts
- **Usage**: Loaded in local development mode

### 2. Production Files (TS) - WITHOUT _id fields
- **Location**: `src/data/*.ts`
- **Purpose**: Production builds, clean TypeScript
- **Format**: NO `_id` fields in categories or concepts
- **Usage**: Loaded in production mode

## 🔄 Backup Creation Process

When creating a backup, the system automatically creates TWO files:

```
Local Development → Create Backup → 2 Files Created:
├── SkillsMasterList_YYYYMMDD_HHMM_XXXNodes.json  (with _id)
└── SkillsMasterList_YYYYMMDD_HHMM_XXXNodes.ts    (clean, no _id)
```

### Code Location: `src/App.tsx` - `createBackup` function

```typescript
// Remove _id fields from both concepts and categories for production TS file
const cleanConcepts = data.skillsMasterList.map(({ _id, ...concept }: any) => concept);
const cleanCategories = data.categories.map(({ _id, ...category }: any) => category);
```

## 🎯 Data Flow

### Local Development:
1. **JSON files** (with `_id`) → Local development
2. **Edit data** → Save to JSON
3. **Create backup** → Generates both JSON and TS files

### Production:
1. **TS files** (no `_id`) → Production builds
2. **Production data** → Points to latest TS file
3. **Deploy** → Uses clean TS data

## 🚫 Common Mistakes to Avoid

### ❌ DON'T:
- Add `_id` fields to production TS files
- Remove `_id` fields from local JSON files
- Mix file types in wrong contexts
- Assume all files should have the same structure

### ✅ DO:
- Keep JSON files with `_id` for local development
- Keep TS files clean (no `_id`) for production
- Use the established backup system
- Let the system handle file segregation automatically

## 🔧 When Issues Occur

### If Production Shows Empty Matrix:
1. **Check**: Is the TS file clean (no `_id` fields)?
2. **Fix**: Run `node scripts/cleanProductionFile.js`
3. **Verify**: Production data points to correct file

### If Local Development Fails:
1. **Check**: Do JSON files have `_id` fields?
2. **Fix**: Use local backup files, not production TS files
3. **Verify**: Local mode loads from correct JSON files

## 📋 File Locations Summary

```
bjj-skill-matrix/
├── backups/BackupsSkillMasterLists/     # Local JSON files (with _id)
│   ├── SkillsMasterList_*.json
│   └── ...
├── src/data/                            # Production TS files (no _id)
│   ├── BJJMasterList_*.ts
│   ├── productionData.ts                # Points to latest TS file
│   └── ...
└── ...
```

## 🎯 Key Takeaway

**The file segregation system is intentional and necessary.**
- **Local files need `_id`** for MongoDB compatibility
- **Production files must NOT have `_id`** for clean builds
- **The backup system handles this automatically**
- **Don't try to "fix" this by making files consistent**

This system prevents build errors and maintains compatibility across different environments. 