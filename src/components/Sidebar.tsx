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
  categories: { 
    name: string; 
    color: string; 
    _id?: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }[];
  setCategories: React.Dispatch<React.SetStateAction<{ 
    name: string; 
    color: string; 
    _id?: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }[]>>;
  addCategory: (cat: { 
    name: string; 
    color: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }) => Promise<void>;
  updateCategory: (id: string, updates: { 
    name: string; 
    color: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }) => Promise<void>;
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

}) => {

  // Debug logging for categories
  React.useEffect(() => {
    console.log('Sidebar - Categories updated:', categories.length, categories);
  }, [categories]);

  // Debug logging for component re-renders
  React.useEffect(() => {
    console.log('Sidebar - Component re-rendered with categories:', categories.length);
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryColor, setEditCategoryColor] = useState('#888888');
  const [editCategoryXAxisLeft, setEditCategoryXAxisLeft] = useState('Mental');
  const [editCategoryXAxisRight, setEditCategoryXAxisRight] = useState('Physical');
  const [editCategoryYAxisBottom, setEditCategoryYAxisBottom] = useState('Self');
  const [editCategoryYAxisTop, setEditCategoryYAxisTop] = useState('Opponent');

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



  // Category management handlers
  const handleAddCategory = async () => {
    const cat = newCategory.trim();
    console.log('Sidebar - handleAddCategory called with:', cat);
    if (cat && !categories.some(c => c.name === cat)) {
      console.log('Sidebar - Adding new category:', cat);
      await addCategory({ 
        name: cat, 
        color: '#888888',
        xAxis: { left: 'Mental', right: 'Physical' },
        yAxis: { bottom: 'Self', top: 'Opponent' }
      });
      setNewCategory('');
      console.log('Sidebar - Category added successfully');
    } else {
      console.log('Sidebar - Category already exists or empty:', cat);
    }
  };
  const handleRemoveCategory = async (catId: string) => {
    await deleteCategory(catId);
  };
  const handleEditCategory = (cat: { 
    _id?: string; 
    name: string; 
    color: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }) => {
    setEditCategoryId(cat._id || '');
    setEditCategoryName(cat.name);
    setEditCategoryColor(cat.color);
    setEditCategoryXAxisLeft(cat.xAxis?.left || 'Mental');
    setEditCategoryXAxisRight(cat.xAxis?.right || 'Physical');
    setEditCategoryYAxisBottom(cat.yAxis?.bottom || 'Self');
    setEditCategoryYAxisTop(cat.yAxis?.top || 'Opponent');
  };
  const handleUpdateCategory = async () => {
    if (editCategoryId) {
      await updateCategory(editCategoryId, { 
        name: editCategoryName, 
        color: editCategoryColor,
        xAxis: { 
          left: editCategoryXAxisLeft, 
          right: editCategoryXAxisRight 
        },
        yAxis: { 
          bottom: editCategoryYAxisBottom, 
          top: editCategoryYAxisTop 
        }
      });
      setEditCategoryId(null);
      setEditCategoryName('');
      setEditCategoryColor('#888888');
      setEditCategoryXAxisLeft('Mental');
      setEditCategoryXAxisRight('Physical');
      setEditCategoryYAxisBottom('Self');
      setEditCategoryYAxisTop('Opponent');
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>All</span>
            <span style={{ 
              fontSize: '10px', 
              opacity: 0.7, 
              fontWeight: 'normal',
              marginLeft: '8px'
            }}>
              {concepts.length}
            </span>
          </button>
          {categories.map(cat => {
            const nodeCount = concepts.filter(concept => concept.category === cat.name).length;
            return (
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{cat.name}</span>
                <span style={{ 
                  fontSize: '10px', 
                  opacity: 0.7, 
                  fontWeight: 'normal',
                  marginLeft: '8px'
                }}>
                  {nodeCount}
                </span>
              </button>
            );
          })}
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
                <div style={{ marginTop: 8, background: '#333', padding: 12, borderRadius: 4 }}>
                  <div style={{ marginBottom: 8 }}>
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={e => setEditCategoryName(e.target.value)}
                      placeholder="Category name"
                      style={{ width: '100%', marginBottom: 4, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff' }}
                    />
                    <input
                      type="color"
                      value={editCategoryColor}
                      onChange={e => setEditCategoryColor(e.target.value)}
                      style={{ marginRight: 8 }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>X-Axis Labels:</div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      <input
                        type="text"
                        value={editCategoryXAxisLeft}
                        onChange={e => setEditCategoryXAxisLeft(e.target.value)}
                        placeholder="Left label"
                        style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                      />
                      <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>←→</span>
                      <input
                        type="text"
                        value={editCategoryXAxisRight}
                        onChange={e => setEditCategoryXAxisRight(e.target.value)}
                        placeholder="Right label"
                        style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>Y-Axis Labels:</div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      <input
                        type="text"
                        value={editCategoryYAxisBottom}
                        onChange={e => setEditCategoryYAxisBottom(e.target.value)}
                        placeholder="Bottom label"
                        style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                      />
                      <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>↑↓</span>
                      <input
                        type="text"
                        value={editCategoryYAxisTop}
                        onChange={e => setEditCategoryYAxisTop(e.target.value)}
                        placeholder="Top label"
                        style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={handleUpdateCategory} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', flex: 1 }}>Save</button>
                    <button onClick={() => setEditCategoryId(null)} style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', flex: 1 }}>Cancel</button>
                  </div>
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
      

      
      <section>
        <button
          onClick={() => setCreateMode(!createMode)}
          style={{ width: '100%', background: createMode ? '#4FF7A2' : '#4F8EF7', color: createMode ? '#222' : '#fff', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
        >
          {createMode ? 'Click on Matrix to Place Node' : 'Create Node'}
        </button>
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