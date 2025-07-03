import React, { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ScatterPlot } from './components/ScatterPlot';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Snackbar from '@mui/material/Snackbar';

type BJJConcept = {
  _id?: string;
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

type DataSource = 'mongodb' | 'local';

interface LocalFileInfo {
  name: string;
  path: string;
  lastModified: Date;
}

function App() {
  const [concepts, setConcepts] = useState<BJJConcept[]>([]);
  const [categories, setCategories] = useState<{ name: string; color: string; _id?: string }[]>([]);
  const [createMode, setCreateMode] = useState(false);
  const [createAt, setCreateAt] = useState<{ x: number; y: number } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterBrightness, setFilterBrightness] = useState(0);
  const [filterSize, setFilterSize] = useState(0);
  const [labelMode, setLabelMode] = useState<{ type: 'off' | 'hover' | 'selected' | 'smart' | 'all' | 'clustered'; description: string }>({ 
    type: 'smart', 
    description: 'Smart: hover + important items' 
  });
  const [selected, setSelected] = useState<BJJConcept | null>(null);
  
  // Data source management
  const [dataSource, setDataSource] = useState<DataSource>('mongodb');
  const [localFiles, setLocalFiles] = useState<LocalFileInfo[]>([]);
  const [selectedLocalFile, setSelectedLocalFile] = useState<string>('');
  const [isDevelopment] = useState(process.env.NODE_ENV === 'development');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Load data source preference from localStorage
  useEffect(() => {
    const savedDataSource = localStorage.getItem('bjj-data-source') as DataSource;
    const savedLocalFile = localStorage.getItem('bjj-selected-local-file');
    
    if (savedDataSource && isDevelopment) {
      setDataSource(savedDataSource);
      if (savedDataSource === 'local' && savedLocalFile) {
        setSelectedLocalFile(savedLocalFile);
      }
    }
  }, [isDevelopment]);

  // Save data source preference to localStorage
  useEffect(() => {
    if (isDevelopment) {
      localStorage.setItem('bjj-data-source', dataSource);
      if (dataSource === 'local' && selectedLocalFile) {
        localStorage.setItem('bjj-selected-local-file', selectedLocalFile);
      }
    }
  }, [dataSource, selectedLocalFile, isDevelopment]);

  // Load local files list
  useEffect(() => {
    if (isDevelopment && dataSource === 'local') {
      loadLocalFilesList();
    }
  }, [isDevelopment, dataSource]);

  // Load data based on current source
  useEffect(() => {
    if (dataSource === 'mongodb') {
      loadFromMongoDB();
    } else if (dataSource === 'local' && selectedLocalFile) {
      loadFromLocalFile(selectedLocalFile);
    }
  }, [dataSource, selectedLocalFile]);

  // Show snackbar when local file is loaded
  useEffect(() => {
    if (dataSource === 'local' && selectedLocalFile) {
      setSnackbarMessage(`Loaded local file: ${selectedLocalFile}`);
      setSnackbarOpen(true);
    }
  }, [dataSource, selectedLocalFile]);

  const loadLocalFilesList = async () => {
    try {
      const response = await fetch('/api/local-files');
      if (!response.ok) throw new Error('Failed to fetch local files');
      const files: LocalFileInfo[] = await response.json();
      setLocalFiles(files);

      // Auto-select the most recent file if none selected
      if (!selectedLocalFile && files.length > 0) {
        const mostRecent = files.reduce((latest, current) =>
          new Date(current.lastModified) > new Date(latest.lastModified) ? current : latest
        );
        setSelectedLocalFile(mostRecent.name);
      }
    } catch (error) {
      console.error('Failed to load local files list:', error);
    }
  };

  const loadFromLocalFile = async (fileName: string) => {
    try {
      // Fetch the JSON file from the public folder
      const response = await fetch(`/data/local/${fileName}`);
      if (!response.ok) throw new Error('File not found');
      const data = await response.json();

      if (data.skillsMasterList && Array.isArray(data.skillsMasterList)) {
        setConcepts(data.skillsMasterList);
      } else {
        throw new Error('skillsMasterList not found in file');
      }
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to load local file:', error);
    }
  };

  const loadFromMongoDB = async () => {
    try {
      // Your existing MongoDB loading logic
      const response = await fetch('/api/concepts');
      const data = await response.json();
      setConcepts(data);
      
      const catResponse = await fetch('/api/categories');
      const catData = await catResponse.json();
      setCategories(catData);
    } catch (error) {
      console.error('Failed to load from MongoDB:', error);
    }
  };

  const saveToLocalFile = async (updatedConcepts: BJJConcept[], updatedCategories: any[]) => {
    if (dataSource !== 'local' || !selectedLocalFile) return;
    
    try {
      // Create the TypeScript content
      const tsContent = `export const categories = ${JSON.stringify(updatedCategories, null, 2)};

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

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(updatedConcepts, null, 2)};
`;

      // Create a download link for the updated file
      const blob = new Blob([tsContent], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedLocalFile;
      a.click();
      URL.revokeObjectURL(url);
      
      // Update the file's last modified date
      const updatedFiles = localFiles.map(file => 
        file.name === selectedLocalFile 
          ? { ...file, lastModified: new Date() }
          : file
      );
      setLocalFiles(updatedFiles);
      
    } catch (error) {
      console.error('Failed to save to local file:', error);
    }
  };

  const fetchConcepts = () => {
    fetch('/api/concepts')
      .then(res => res.json())
      .then(data => setConcepts(data));
  };

  const fetchCategories = () => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  const addConcept = async (concept: Omit<BJJConcept, 'id'>) => {
    if (dataSource === 'mongodb') {
      await fetch('/api/concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(concept),
      });
      fetchConcepts();
    } else {
      // Local mode: add to local state and save
      const newConcept = { ...concept, id: generateId() };
      const updatedConcepts = [...concepts, newConcept];
      setConcepts(updatedConcepts);
      await saveToLocalFile(updatedConcepts, categories);
    }
  };

  const updateConcept = async (id: string, updates: Partial<BJJConcept>) => {
    if (dataSource === 'mongodb') {
      // Remove _id from updates if present
      const { _id, ...rest } = (updates as any);
      await fetch(`/api/concepts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
      fetchConcepts();
    } else {
      // Local mode: update local state and save
      const updatedConcepts = concepts.map(concept => 
        concept.id === id ? { ...concept, ...updates } : concept
      );
      setConcepts(updatedConcepts);
      await saveToLocalFile(updatedConcepts, categories);
    }
  };

  const deleteConcept = async (id: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`/api/concepts/${id}`, { method: 'DELETE' });
      fetchConcepts();
    } else {
      // Local mode: remove from local state and save
      const updatedConcepts = concepts.filter(concept => concept.id !== id);
      setConcepts(updatedConcepts);
      await saveToLocalFile(updatedConcepts, categories);
    }
  };

  const generateId = (): string => {
    const maxNum = concepts.reduce((max, c) => {
      const match = c.id && c.id.match(/^BJJ-(\d{3})$/);
      if (match) {
        const num = parseInt(match[1], 10);
        return Math.max(max, num);
      }
      return max;
    }, 0);
    return `BJJ-${String(maxNum + 1).padStart(3, '0')}`;
  };

  // Category CRUD
  const addCategory = async (cat: { name: string; color: string }) => {
    if (dataSource === 'mongodb') {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
      });
      fetchCategories();
    } else {
      // Local mode: add to local state and save
      const newCategory = { ...cat, _id: `local-${Date.now()}` };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      await saveToLocalFile(concepts, updatedCategories);
    }
  };

  const updateCategory = async (id: string, updates: { name: string; color: string }) => {
    if (dataSource === 'mongodb') {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchCategories();
    } else {
      // Local mode: update local state and save
      const updatedCategories = categories.map(cat => 
        cat._id === id ? { ...cat, ...updates } : cat
      );
      setCategories(updatedCategories);
      await saveToLocalFile(concepts, updatedCategories);
    }
  };

  const deleteCategory = async (id: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      fetchCategories();
    } else {
      // Local mode: remove from local state and save
      const updatedCategories = categories.filter(cat => cat._id !== id);
      setCategories(updatedCategories);
      await saveToLocalFile(concepts, updatedCategories);
    }
  };

  // Filter concepts based on selected filters
  const filteredConcepts = concepts.filter(concept => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(concept.category)) return false;
    if (filterBrightness > 0 && concept.brightness !== filterBrightness) return false;
    if (filterSize > 0 && concept.size !== filterSize) return false;
    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout
        header={<Header />}
        sidebar={
          <Sidebar
            concepts={filteredConcepts}
            addConcept={addConcept}
            updateConcept={updateConcept}
            deleteConcept={deleteConcept}
            categories={categories}
            setCategories={setCategories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            createMode={createMode}
            setCreateMode={setCreateMode}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            filterBrightness={filterBrightness}
            setFilterBrightness={setFilterBrightness}
            filterSize={filterSize}
            setFilterSize={setFilterSize}
            labelMode={labelMode}
            setLabelMode={setLabelMode}
            selected={selected}
            setSelected={setSelected}
            // Data source toggle props (development only)
            isDevelopment={isDevelopment}
            dataSource={dataSource}
            setDataSource={(v: string) => setDataSource(v as DataSource)}
            localFiles={localFiles}
            selectedLocalFile={selectedLocalFile}
            setSelectedLocalFile={setSelectedLocalFile}
          />
        }
      >
        <ScatterPlot
          concepts={filteredConcepts}
          addConcept={addConcept}
          updateConcept={updateConcept}
          deleteConcept={deleteConcept}
          categories={categories}
          setCategories={setCategories}
          createMode={createMode}
          setCreateMode={setCreateMode}
          createAt={createAt}
          setCreateAt={setCreateAt}
          labelMode={labelMode}
          selected={selected}
          setSelected={setSelected}
        />
      </MainLayout>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ThemeProvider>
  );
}

export default App; 