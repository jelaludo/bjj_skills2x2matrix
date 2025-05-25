import React, { useState } from 'react';
import { BJJConcept, categories } from '../data/SkillsMasterList';

type SidebarProps = {
  concepts: BJJConcept[];
  addConcept: (concept: Omit<BJJConcept, 'id'>) => Promise<void>;
  updateConcept: (id: string, updates: Partial<BJJConcept>) => Promise<void>;
  deleteConcept: (id: string) => Promise<void>;
  categories: { name: string; color: string; }[];
  setCategories: React.Dispatch<React.SetStateAction<{ name: string; color: string; }[]>>;
  createMode: boolean;
  setCreateMode: (v: boolean) => void;
  filterCategory: string;
  setFilterCategory: (v: string) => void;
  filterBrightness: number;
  setFilterBrightness: (v: number) => void;
  filterSize: number;
  setFilterSize: (v: number) => void;
  labelSize: number;
  setLabelSize: (v: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ concepts, addConcept, updateConcept, deleteConcept, categories, setCategories, createMode, setCreateMode, filterCategory, setFilterCategory, filterBrightness, setFilterBrightness, filterSize, setFilterSize, labelSize, setLabelSize }) => {
  const [showExport, setShowExport] = useState(false);
  const [downloadName, setDownloadName] = useState('SkillsMasterList.ts');
  const [uploadPreview, setUploadPreview] = useState<BJJConcept[] | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

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
    // TODO: Add visual highlight or focus on the selected concept in the scatter plot
  };

  // Add label size state
  const labelSizeOptions = [
    { label: 'OFF', value: 0 },
    { label: 'Small', value: 12 },
    { label: 'Medium', value: 16 },
    { label: 'Large', value: 22 },
  ];

  // Download TypeScript handler (SkillsMasterList.ts format)
  const handleDownload = () => {
    const tsString = `\nexport const categories = ${JSON.stringify(categories, null, 2)};\n\nexport interface BJJConcept {\n  id: string;\n  concept: string;\n  description: string;\n  short_description: string;\n  category: string;\n  color: string;\n  axis_self_opponent: number;\n  axis_mental_physical: number;\n  brightness: number;\n  size: number;\n}\n\nexport const skillsMasterList: BJJConcept[] = ${JSON.stringify(concepts, null, 2)};\n`.trim();
    const blob = new Blob([tsString], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName || 'SkillsMasterList.ts';
    a.click();
    URL.revokeObjectURL(url);
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
  const handleAddCategory = () => {
    const cat = newCategory.trim();
    if (cat && !categories.some(c => c.name === cat)) {
      setCategories([...categories, { name: cat, color: '#888888' }]); // Default gray color
      setNewCategory('');
    }
  };
  const handleRemoveCategory = (catName: string) => {
    setCategories(categories.filter(c => c.name !== catName));
  };

  return (
    <div className="sidebar" style={{ padding: 24, background: '#222', height: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Categories</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => setFilterCategory('')}
            style={{
              background: filterCategory === '' ? '#4F8EF7' : 'transparent',
              color: filterCategory === '' ? '#fff' : '#aaa',
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
              key={cat.name}
              onClick={() => setFilterCategory(cat.name)}
              style={{
                background: filterCategory === cat.name ? cat.color : 'transparent',
                color: filterCategory === cat.name ? '#fff' : '#aaa',
                border: `1px solid ${cat.color}`,
                padding: '8px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
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
        <div style={{ display: 'flex', gap: 8 }}>
          {labelSizeOptions.map(opt => (
            <button
              key={opt.label}
              onClick={() => setLabelSize(opt.value)}
              style={{
                background: labelSize === opt.value ? '#4F8EF7' : 'transparent',
                color: labelSize === opt.value ? '#fff' : '#aaa',
                border: '1px solid #4F8EF7',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 14,
                cursor: 'pointer',
                fontWeight: labelSize === opt.value ? 700 : 400,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa', cursor: 'pointer' }} onClick={() => setShowCategories(v => !v)}>
          Categories
        </h3>
        <div style={{ color: '#ccc', fontSize: 14, cursor: 'pointer' }} onClick={() => setShowCategories(v => !v)}>
          [Category management UI]
        </div>
        {showCategories && (
          <div style={{ background: '#232323', padding: 10, borderRadius: 6, marginTop: 8 }}>
            <div style={{ marginBottom: 8 }}>
              {categories.map(cat => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ flex: 1 }}>{cat.name}</span>
                  <button onClick={() => handleRemoveCategory(cat.name)} style={{ marginLeft: 8, background: '#444', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add category" style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }} />
              <button onClick={handleAddCategory} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Add</button>
            </div>
          </div>
        )}
      </section>
      <section>
        <button
          onClick={() => setCreateMode(!createMode)}
          style={{ width: '100%', background: createMode ? '#4FF7A2' : '#4F8EF7', color: createMode ? '#222' : '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
        >
          {createMode ? 'Click on Matrix to Place Node' : 'Create Node'}
        </button>
      </section>
      <section>
        <button
          onClick={() => setShowExport(v => !v)}
          style={{ width: '100%', background: '#333', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
        >
          Download / Import JSON
        </button>
        {showExport && (
          <div style={{ background: '#232323', padding: 12, borderRadius: 8, marginTop: 8 }}>
            <div style={{ marginBottom: 8, fontSize: 14, color: '#aaa' }}>
              Download your concepts as JSON, then overwrite <code>bjj-skill-matrix/src/data/SkillsMasterList.ts</code> to update your master data.<br />
              You can also upload a JSON file to preview and apply it.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                value={downloadName}
                onChange={e => setDownloadName(e.target.value)}
                style={{ width: 180, padding: 6, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
                placeholder="Filename (e.g. SkillsMasterList.ts)"
              />
              <button onClick={handleDownload} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 14px', cursor: 'pointer' }}>
                Download JSON
              </button>
            </div>
            <div style={{ marginBottom: 8 }}>
              <input type="file" accept="application/json" onChange={handleUpload} style={{ color: '#fff' }} />
            </div>
            {uploadError && <div style={{ color: 'red', marginBottom: 8 }}>{uploadError}</div>}
            {/* Preview logic can be added here if needed */}
          </div>
        )}
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