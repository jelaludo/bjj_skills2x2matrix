import React, { useState } from 'react';

type BJJConcept = {
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
};

type SidebarProps = {
  concepts: BJJConcept[];
  addConcept: (concept: Omit<BJJConcept, 'id'>) => Promise<void>;
  updateConcept: (id: string, updates: Partial<BJJConcept>) => Promise<void>;
  deleteConcept: (id: string) => Promise<void>;
  categories: { name: string; color: string; _id?: string }[];
  setCategories: React.Dispatch<React.SetStateAction<{ name: string; color: string; _id?: string }[]>>;
  addCategory: (cat: { name: string; color: string }) => Promise<void>;
  updateCategory: (id: string, updates: { name: string; color: string }) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  createMode: boolean;
  setCreateMode: (v: boolean) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  filterBrightness: number;
  setFilterBrightness: (v: number) => void;
  filterSize: number;
  setFilterSize: (v: number) => void;
  labelMode: { type: 'off' | 'hover' | 'selected' | 'smart' | 'all' | 'clustered'; description: string };
  setLabelMode: (v: { type: 'off' | 'hover' | 'selected' | 'smart' | 'all' | 'clustered'; description: string }) => void;
  selected: BJJConcept | null;
  setSelected: React.Dispatch<React.SetStateAction<BJJConcept | null>>;
  // Data source toggle props (development only)
  isDevelopment?: boolean;
  dataSource?: string;
  setDataSource?: (v: string) => void;
  localFiles?: { name: string; path: string; lastModified: Date }[];
  selectedLocalFile?: string;
  setSelectedLocalFile?: (v: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  concepts, 
  addConcept, 
  updateConcept, 
  deleteConcept, 
  categories, 
  setCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  createMode, 
  setCreateMode, 
  selectedCategories, 
  setSelectedCategories, 
  filterBrightness, 
  setFilterBrightness, 
  filterSize, 
  setFilterSize, 
  labelMode, 
  setLabelMode, 
  selected, 
  setSelected,
  isDevelopment = false,
  dataSource = 'mongodb',
  setDataSource,
  localFiles = [],
  selectedLocalFile = '',
  setSelectedLocalFile
}) => {
  const [showExport, setShowExport] = useState(false);
  const [downloadName, setDownloadName] = useState('SkillsMasterList.ts');
  const [uploadPreview, setUploadPreview] = useState<BJJConcept[] | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryColor, setEditCategoryColor] = useState('#888888');

  // Filter concepts based on search text
  const searchResults = searchText.trim() ? concepts.filter(concept => 
    concept.concept.toLowerCase().includes(searchText.toLowerCase()) ||
    concept.description.toLowerCase().includes(searchText.toLowerCase()) ||
    concept.short_description.toLowerCase().includes(searchText.toLowerCase())
  ).slice(0, 5) : [];

  // Handle search result click
  const handleSearchResultClick = (concept: BJJConcept) => {
    setSearchText(concept.concept);
    setShowSearchResults(false);
    setSelected(concept);
    // TODO: Add visual highlight or focus on the selected concept in the scatter plot
  };

  // Label mode options
  const labelModeOptions = [
    { type: 'off' as const, description: 'No labels' },
    { type: 'hover' as const, description: 'Show on hover only' },
    { type: 'selected' as const, description: 'Show selected item only' },
    { type: 'smart' as const, description: 'Smart: hover + important items' },
    { type: 'clustered' as const, description: 'Group nearby items' },
    { type: 'all' as const, description: 'Show all labels' },
  ];

  // Download handler: Export both .ts and .json
  const handleDownload = () => {
    // --- TypeScript file ---
    const tsString = `\nexport const categories = ${JSON.stringify(categories, null, 2)};\n\nexport interface BJJConcept {\n  id: string;\n  concept: string;\n  description: string;\n  short_description: string;\n  category: string;\n  color: string;\n  axis_self_opponent: number;\n  axis_mental_physical: number;\n  brightness: number;\n  size: number;\n}\n\nexport const skillsMasterList: BJJConcept[] = ${JSON.stringify(concepts, null, 2)};\n`.trim();
    const tsBlob = new Blob([tsString], { type: 'text/typescript' });
    const tsUrl = URL.createObjectURL(tsBlob);
    const tsName = (downloadName.endsWith('.ts') ? downloadName : downloadName.replace(/\.[^.]+$/, '') + '.ts') || 'SkillsMasterList.ts';
    const aTs = document.createElement('a');
    aTs.href = tsUrl;
    aTs.download = tsName;
    aTs.click();
    URL.revokeObjectURL(tsUrl);

    // --- JSON file ---
    const jsonObj = { categories, skillsMasterList: concepts };
    const jsonBlob = new Blob([JSON.stringify(jsonObj, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonName = tsName.replace(/\.ts$/, '.json');
    const aJson = document.createElement('a');
    aJson.href = jsonUrl;
    aJson.download = jsonName;
    aJson.click();
    URL.revokeObjectURL(jsonUrl);
  };

  // Upload JSON handler (expect categories and sampleConcepts)
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json.sampleConcepts) && Array.isArray(json.categories)) {
          setCategories(json.categories);
          for (const concept of json.sampleConcepts) {
            await addConcept(concept);
          }
        } else if (Array.isArray(json) && json.every(obj => obj.id && obj.concept)) {
          for (const concept of json) {
            await addConcept(concept);
          }
        } else {
          setUploadError('Invalid JSON format: must be an object with categories and sampleConcepts, or an array of concepts.');
        }
      } catch (err) {
        setUploadError('Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleApplyUpload = () => {
    // Removed setUploadPreview(null) as it is no longer needed
  };

  // Category management handlers
  const handleAddCategory = async () => {
    const cat = newCategory.trim();
    if (cat && !categories.some(c => c.name === cat)) {
      await addCategory({ name: cat, color: '#888888' });
      setNewCategory('');
    }
  };
  const handleRemoveCategory = async (catId: string) => {
    await deleteCategory(catId);
  };
  const handleEditCategory = (cat: { _id?: string; name: string; color: string }) => {
    setEditCategoryId(cat._id || '');
    setEditCategoryName(cat.name);
    setEditCategoryColor(cat.color);
  };
  const handleUpdateCategory = async () => {
    if (editCategoryId) {
      await updateCategory(editCategoryId, { name: editCategoryName, color: editCategoryColor });
      setEditCategoryId(null);
      setEditCategoryName('');
      setEditCategoryColor('#888888');
    }
  };

  // Multi-select toggle logic
  const handleCategoryToggle = (catName: string) => {
    setSelectedCategories(prev =>
      prev.includes(catName)
        ? prev.filter(name => name !== catName)
        : [...prev, catName]
    );
  };
  const handleAllClick = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="sidebar" style={{ padding: 24, background: '#222', height: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12, cursor: 'pointer' }} onClick={() => setShowCategoryModal(true)}>Categories</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={handleAllClick}
            style={{
              background: selectedCategories.length === 0 ? '#4F8EF7' : 'transparent',
              color: selectedCategories.length === 0 ? '#fff' : '#aaa',
              border: '1px solid #4F8EF7',
              padding: '8px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat._id || cat.name}
              onClick={() => handleCategoryToggle(cat.name)}
              style={{
                background: selectedCategories.includes(cat.name) ? cat.color : 'transparent',
                color: selectedCategories.includes(cat.name) ? '#fff' : '#aaa',
                border: `1px solid ${cat.color}`,
                padding: '8px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                marginBottom: 4,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {/* Category Management Modal */}
        {showCategoryModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            onClick={() => setShowCategoryModal(false)}
          >
            <div
              style={{
                background: '#232323',
                padding: 32,
                borderRadius: 10,
                minWidth: 350,
                boxShadow: '0 4px 24px #0008',
                position: 'relative',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCategoryModal(false)}
                style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}
                aria-label="Close"
              >
                ×
              </button>
              <h2 style={{ color: '#fff', marginBottom: 16 }}>Manage Categories</h2>
              <div style={{ marginBottom: 16 }}>
                {categories.map(cat => (
                  <div key={cat._id || cat.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ flex: 1, color: cat.color }}>{cat.name}</span>
                    <button onClick={() => handleEditCategory(cat)} style={{ color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => handleRemoveCategory(cat._id || '')} style={{ color: '#F74F4F', background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="Add category"
                  style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
                />
                <button onClick={handleAddCategory} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}>Add</button>
              </div>
              {editCategoryId && (
                <div style={{ marginTop: 8, background: '#333', padding: 8, borderRadius: 4 }}>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={e => setEditCategoryName(e.target.value)}
                    placeholder="Category name"
                    style={{ marginRight: 4, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff' }}
                  />
                  <input
                    type="color"
                    value={editCategoryColor}
                    onChange={e => setEditCategoryColor(e.target.value)}
                    style={{ marginRight: 4 }}
                  />
                  <button onClick={handleUpdateCategory} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', marginRight: 4 }}>Save</button>
                  <button onClick={() => setEditCategoryId(null)} style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <section style={{ position: 'relative', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa' }}>Search</h3>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            placeholder="Search concepts..."
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #333',
              background: '#181818',
              color: '#fff',
              fontSize: 14,
            }}
          />
          {showSearchResults && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#181818',
              border: '1px solid #333',
              borderRadius: 4,
              marginTop: 4,
              maxHeight: 200,
              overflowY: 'auto',
              zIndex: 1000,
            }}>
              {searchResults.map(concept => (
                <div
                  key={concept.id}
                  onClick={() => handleSearchResultClick(concept)}
                  className="search-result-item"
                  style={{
                    padding: 8,
                    cursor: 'pointer',
                    borderBottom: '1px solid #333',
                    color: '#fff',
                    fontSize: 14,
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{concept.concept}</div>
                  {concept.short_description && (
                    <div style={{ color: '#aaa', fontSize: 12, marginTop: 2 }}>
                      {concept.short_description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa' }}>Filters</h3>
        <div style={{ color: '#ccc', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label>Brightness:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={filterBrightness}
                onChange={e => setFilterBrightness(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <span style={{ minWidth: 24, fontSize: 13 }}>
                {filterBrightness === 0 ? 'All' : filterBrightness}
              </span>
            </div>
          </div>
          <div>
            <label>Size:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={filterSize}
                onChange={e => setFilterSize(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <span style={{ minWidth: 24, fontSize: 13 }}>
                {filterSize === 0 ? 'All' : filterSize}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa' }}>Labels</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {labelModeOptions.map((option, index) => (
            <button
              key={option.type}
              onClick={() => setLabelMode(option)}
              style={{
                background: labelMode.type === option.type ? '#4F8EF7' : 'transparent',
                color: labelMode.type === option.type ? '#fff' : '#aaa',
                border: '1px solid #4F8EF7',
                padding: '8px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                fontSize: 13,
              }}
            >
              <div style={{ fontWeight: 'bold' }}>
                {option.type.charAt(0).toUpperCase() + option.type.slice(1)}
              </div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </section>
      
      {/* Data Source Toggle - Development Only */}
      {isDevelopment && (
        <section>
          <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa' }}>Data Source</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => setDataSource?.('mongodb')}
                style={{
                  background: dataSource && dataSource === 'mongodb' ? '#4F8EF7' : 'transparent',
                  color: dataSource && dataSource === 'mongodb' ? '#fff' : '#aaa',
                  border: '1px solid #4F8EF7',
                  padding: '8px 12px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  flex: 1,
                  fontSize: 13,
                }}
              >
                MongoDB
              </button>
              <button
                onClick={() => setDataSource?.('local')}
                style={{
                  background: dataSource && dataSource === 'local' ? '#4F8EF7' : 'transparent',
                  color: dataSource && dataSource === 'local' ? '#fff' : '#aaa',
                  border: '1px solid #4F8EF7',
                  padding: '8px 12px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  flex: 1,
                  fontSize: 13,
                }}
              >
                Local Data
              </button>
            </div>
            
            {dataSource && dataSource === 'local' && (
              <div style={{ marginTop: 8 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: '#aaa' }}>
                  Select Local File:
                </label>
                <select
                  value={selectedLocalFile}
                  onChange={(e) => setSelectedLocalFile?.(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 6,
                    borderRadius: 4,
                    border: '1px solid #333',
                    background: '#181818',
                    color: '#fff',
                    fontSize: 12,
                    marginBottom: 6
                  }}
                >
                  {localFiles.map(file => (
                    <option key={file.name} value={file.name}>
                      {file.name} ({new Date(file.lastModified).toLocaleDateString()})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or enter filename (e.g. SkillsMasterList07032025.js)"
                  value={selectedLocalFile}
                  onChange={e => setSelectedLocalFile?.(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') setSelectedLocalFile?.(e.currentTarget.value);
                  }}
                  style={{
                    width: '100%',
                    padding: 6,
                    borderRadius: 4,
                    border: '1px solid #333',
                    background: '#181818',
                    color: '#fff',
                    fontSize: 12,
                    marginBottom: 6
                  }}
                />
                <div style={{ 
                  fontSize: 11, 
                  color: '#888',
                  marginBottom: 6,
                  padding: 4,
                  background: '#1a1a1a',
                  borderRadius: 4,
                  border: '1px solid #333'
                }}>
                  💡 <strong>Note:</strong> Enter only the filename (e.g., "SkillsMasterList.json"), not the full path. The app automatically looks in public\data\local.
                </div>
                <div style={{ 
                  marginTop: 4, 
                  fontSize: 11, 
                  color: '#666',
                  padding: 4,
                  background: '#1a1a1a',
                  borderRadius: 4
                }}>
                  Current: {String(dataSource) === 'mongodb' ? 'MongoDB' : `Local: ${selectedLocalFile}`}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
      <section>
        <button
          onClick={() => setCreateMode(!createMode)}
          style={{ width: '100%', background: createMode ? '#4FF7A2' : '#4F8EF7', color: createMode ? '#222' : '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
        >
          {createMode ? 'Click on Matrix to Place Node' : 'Create Node'}
        </button>
      </section>
      <section>
        <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa' }}>Export or Import Data</h3>
        <div style={{ background: '#232323', padding: 12, borderRadius: 8, marginTop: 8, marginBottom: 16, maxWidth: 1000, minWidth: 0, overflow: 'visible', boxSizing: 'border-box' }}>
          <button
            onClick={() => setShowExport(v => !v)}
            style={{ width: '100%', background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, cursor: 'pointer', marginBottom: 12, fontSize: 15, display: 'block' }}
          >
            Export Data (.ts & .json)
          </button>
          {showExport && (
            <div>
              <div style={{ marginBottom: 10, fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>
                <strong>Click "Export Data" to generate both:</strong><br />
                <ul style={{ margin: '8px 0 8px 18px', padding: 0, color: '#aaa', fontSize: 13 }}>
                  <li>A TypeScript file (<code>.ts</code>) for production/MongoDB use</li>
                  <li>A JSON file (<code>.json</code>) for local development</li>
                </ul>
                Files will be saved to your browser's downloads folder.<br />
                <br />
                To update your master data, overwrite the <code>.ts</code> file in <code>bjj-skill-matrix/src/data/</code>.<br />
                To use local data, select the <code>.json</code> file in the Local Data section.<br />
                <br />
                <strong>Import:</strong> You can also upload a JSON file below to preview and apply it.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={downloadName}
                  onChange={e => setDownloadName(e.target.value)}
                  style={{ width: 180, minWidth: 120, padding: 6, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
                  placeholder="Filename (e.g. SkillsMasterList.ts)"
                />
                <button onClick={handleDownload} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13, minWidth: 120 }}>
                  Export Data
                </button>
              </div>
              <div style={{ marginBottom: 10 }}>
                <input type="file" accept="application/json" onChange={handleUpload} style={{ color: '#fff' }} />
              </div>
              {uploadError && <div style={{ color: 'red', marginBottom: 8 }}>{uploadError}</div>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Add styles at the top of the file, after imports
const styles = `
  .search-result-item:hover {
    background: #333;
  }
`;

// Add style tag to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Sidebar; 