import React, { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ScatterPlot } from './components/ScatterPlot';
import { DevModeToggle } from './components/DevModeToggle';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Snackbar from '@mui/material/Snackbar';
// Production data fallback
import { getProductionData } from './data/productionData';

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

type DataSource = 'mongodb' | 'local' | 'production';

interface LocalFileInfo {
  name: string;
  path: string;
  lastModified: Date;
}

function App() {
  const [concepts, setConcepts] = useState<BJJConcept[]>([]);
  const [categories, setCategories] = useState<{ 
    name: string; 
    color: string; 
    _id?: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }[]>([]);
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
  
  const [isDevelopment] = useState(process.env.NODE_ENV === 'development');
  
  // Data source management
  const [dataSource, setDataSource] = useState<DataSource>(isDevelopment ? 'mongodb' : 'production');
  const [masterLists, setMasterLists] = useState<Array<{
    name: string;
    path: string;
    lastModified: Date;
    date: string;
    nodeCount: number;
    displayName: string;
  }>>([]);
  const [selectedMasterList, setSelectedMasterList] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Load data source preference from localStorage
  useEffect(() => {
    const savedDataSource = localStorage.getItem('bjj-data-source') as DataSource;
    const savedMasterList = localStorage.getItem('bjj-selected-master-list');
    
    if (savedDataSource && isDevelopment) {
      setDataSource(savedDataSource);
      if (savedDataSource === 'local' && savedMasterList) {
        setSelectedMasterList(savedMasterList);
      }
    }
  }, [isDevelopment]);

  // Debug logging for categories state changes
  useEffect(() => {
    console.log('App - Categories state changed:', categories.length, categories);
  }, [categories]);

  // Save data source preference to localStorage
  useEffect(() => {
    if (isDevelopment) {
      localStorage.setItem('bjj-data-source', dataSource);
      if (dataSource === 'local' && selectedMasterList) {
        localStorage.setItem('bjj-selected-master-list', selectedMasterList);
      }
    }
  }, [dataSource, selectedMasterList, isDevelopment]);

  // Load master list files
  useEffect(() => {
    console.log('App - useEffect triggered:', { isDevelopment, dataSource });
    if (isDevelopment && dataSource === 'local') {
      console.log('App - Loading master list files...');
      loadMasterLists();
    }
  }, [isDevelopment, dataSource]);

  // Load data based on current source
  useEffect(() => {
    if (dataSource === 'mongodb') {
      loadFromMongoDB();
    } else if (dataSource === 'local' && selectedMasterList) {
      loadFromMasterList(selectedMasterList);
    } else if (dataSource === 'production') {
      loadFromProduction();
    }
  }, [dataSource, selectedMasterList]);

  // Show snackbar when master list is loaded
  useEffect(() => {
    if (dataSource === 'local' && selectedMasterList) {
      setSnackbarMessage(`Loaded master list: ${selectedMasterList}`);
      setSnackbarOpen(true);
    }
  }, [dataSource, selectedMasterList]);

  const loadMasterLists = async () => {
    try {
      console.log('App - Fetching master lists...');
      const response = await fetch('http://localhost:3001/api/master-lists');
      if (!response.ok) throw new Error('Failed to fetch master lists');
      const data = await response.json();
      console.log('App - Received master lists:', data);
      setMasterLists(data.files);

      // Auto-select the latest file if none selected
      if (!selectedMasterList && data.latest) {
        console.log('App - Auto-selecting latest master list:', data.latest.name);
        setSelectedMasterList(data.latest.name);
      }
    } catch (error) {
      console.error('Failed to load master lists:', error);
    }
  };

  const loadFromMasterList = async (fileName: string) => {
    try {
      console.log('App - Loading master list:', fileName);
      
      // Load the JSON file from the backend server
      const response = await fetch(`http://localhost:3001/backups/BackupsSkillMasterLists/${fileName}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('App - Load result:', data);
      
      // Handle the response data
      if (data.skillsMasterList && Array.isArray(data.skillsMasterList)) {
        console.log('App - Setting concepts:', data.skillsMasterList.length);
        setConcepts(data.skillsMasterList);
      } else {
        throw new Error('skillsMasterList not found in file');
      }
      if (data.categories && Array.isArray(data.categories)) {
        console.log('App - Setting categories:', data.categories.length, data.categories);
        setCategories(data.categories);
      } else {
        console.warn('App - No categories found in file, setting empty array');
        setCategories([]);
      }
      
      setSnackbarMessage(`✅ Loaded master list: ${fileName}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to load master list:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSnackbarMessage(`❌ Failed to load master list: ${errorMessage}`);
      setSnackbarOpen(true);
    }
  };

  const loadFromMongoDB = async () => {
    try {
      // Your existing MongoDB loading logic
      const response = await fetch('http://localhost:3001/api/concepts');
      const data = await response.json();
      setConcepts(data);
      
      const catResponse = await fetch('http://localhost:3001/api/categories');
      const catData = await catResponse.json();
      setCategories(catData);
    } catch (error) {
      console.error('Failed to load from MongoDB:', error);
      // Fallback to production data in production builds
      if (!isDevelopment) {
        console.log('Loading production data fallback...');
        try {
          const productionData = await getProductionData();
          setConcepts(productionData.skillsMasterList);
          setCategories(productionData.categories);
        } catch (fallbackError) {
          console.error('Failed to load production data fallback:', fallbackError);
          setConcepts([]);
          setCategories([]);
        }
      }
    }
  };

  const loadFromProduction = async () => {
    try {
      console.log('Loading production data...');
      const productionData = await getProductionData();
      setConcepts(productionData.skillsMasterList);
      setCategories(productionData.categories);
      setSnackbarMessage('✅ Loaded production data');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to load production data:', error);
      setSnackbarMessage('❌ Failed to load production data');
      setSnackbarOpen(true);
      setConcepts([]);
      setCategories([]);
    }
  };

  const saveToLocalFile = async (updatedConcepts: BJJConcept[], updatedCategories: any[]) => {
    if (dataSource !== 'local' || !selectedMasterList) return;
    
    console.log('App - saveToLocalFile called with:', { 
      conceptsCount: updatedConcepts.length, 
      categoriesCount: updatedCategories.length,
      fileName: selectedMasterList 
    });
    
    try {
      // Create JSON content for the backend
      const jsonContent = {
        categories: updatedCategories,
        skillsMasterList: updatedConcepts
      };

      // Save the file to the backend
      const response = await fetch('http://localhost:3001/api/save-master-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: selectedMasterList,
          data: jsonContent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save file to backend');
      }

      console.log('App - File saved successfully to backend');

      // Also create a TypeScript backup for download
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

      // Create a download link for the TypeScript version
      const blob = new Blob([tsContent], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedMasterList.replace('.json', '.ts');
      a.click();
      URL.revokeObjectURL(url);
      
      // Update the file's last modified date
      const updatedFiles = masterLists.map(file => 
        file.name === selectedMasterList 
          ? { ...file, lastModified: new Date() }
          : file
      );
      setMasterLists(updatedFiles);
      
      setSnackbarMessage(`✅ Saved changes to ${selectedMasterList}`);
      setSnackbarOpen(true);
      console.log('App - saveToLocalFile completed successfully');
      
    } catch (error) {
      console.error('Failed to save to local file:', error);
      setSnackbarMessage('❌ Failed to save changes');
      setSnackbarOpen(true);
    }
  };

  // Convert local data to MongoDB format
  const convertToMongo = async () => {
    if (dataSource !== 'local' || !selectedMasterList) {
      setSnackbarMessage('Please switch to local mode and select a file first');
      setSnackbarOpen(true);
      return;
    }

    try {
      setSnackbarMessage('Converting to MongoDB format...');
      setSnackbarOpen(true);

      // Create the conversion data
      const conversionData = {
        categories,
        skillsMasterList: concepts
      };

      // Generate timestamp for file naming
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const nodeCount = concepts.length;

      // Create TypeScript content for categories
      const categoriesTsContent = `// Auto-generated MongoDB-ready categories file
// Generated on: ${new Date().toISOString()}
// Node count: ${nodeCount}

module.exports = ${JSON.stringify(categories, null, 2)};
`;

      // Create TypeScript content for concepts
      const conceptsTsContent = `// Auto-generated MongoDB-ready concepts file
// Generated on: ${new Date().toISOString()}
// Node count: ${nodeCount}

module.exports = ${JSON.stringify(concepts, null, 2)};
`;

      // Create combined TypeScript file for easy import
      const combinedTsContent = `// Auto-generated MongoDB-ready data file
// Generated on: ${new Date().toISOString()}
// Node count: ${nodeCount}

export const categories = ${JSON.stringify(categories, null, 2)};

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

export const skillsMasterList = ${JSON.stringify(concepts, null, 2)};

// MongoDB-ready exports
module.exports = {
  categories,
  skillsMasterList
};
`;

      // Create download links for all formats
      const files = [
        {
          name: `categories-${timestamp}-${nodeCount}Nodes.js`,
          content: categoriesTsContent,
          type: 'application/javascript'
        },
        {
          name: `concepts-${timestamp}-${nodeCount}Nodes.js`,
          content: conceptsTsContent,
          type: 'application/javascript'
        },
        {
          name: `mongo-ready-${timestamp}-${nodeCount}Nodes.ts`,
          content: combinedTsContent,
          type: 'text/typescript'
        },
        {
          name: `mongo-ready-${timestamp}-${nodeCount}Nodes.json`,
          content: JSON.stringify(conversionData, null, 2),
          type: 'application/json'
        }
      ];

      // Download all files
      files.forEach(file => {
        const blob = new Blob([file.content], { type: file.type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      });

      setSnackbarMessage(`✅ MongoDB-ready files downloaded! (${nodeCount} nodes, ${categories.length} categories)`);
      setSnackbarOpen(true);

      // Also save to backend for easy access
      try {
        const saveResponse = await fetch('http://localhost:3001/api/save-mongo-ready', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp,
            nodeCount,
            categories,
            concepts,
            categoriesContent: categoriesTsContent,
            conceptsContent: conceptsTsContent,
            combinedContent: combinedTsContent
          })
        });

        if (saveResponse.ok) {
          console.log('MongoDB-ready files also saved to backend');
        }
      } catch (error) {
        console.error('Failed to save MongoDB files to backend:', error);
      }

    } catch (error) {
      console.error('Failed to convert to MongoDB format:', error);
      setSnackbarMessage('Failed to convert data');
      setSnackbarOpen(true);
    }
  };

  // Seed MongoDB from local data
  const seedFromLocal = async () => {
    if (dataSource !== 'local' || !selectedMasterList) {
      setSnackbarMessage('Please switch to local mode and select a file first');
      setSnackbarOpen(true);
      return;
    }

    try {
      setSnackbarMessage('Seeding MongoDB from local data...');
      setSnackbarOpen(true);

      // Call the seeding API
      const response = await fetch('http://localhost:3001/api/seed-from-local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          localFile: selectedMasterList,
          clearExisting: true // You might want to make this configurable
        })
      });

      if (!response.ok) {
        throw new Error('Failed to seed MongoDB');
      }

      const result = await response.json();
      setSnackbarMessage(`Successfully seeded ${result.conceptsInserted} concepts and ${result.categoriesInserted} categories to MongoDB!`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to seed MongoDB:', error);
      setSnackbarMessage('Failed to seed MongoDB. Check console for details.');
      setSnackbarOpen(true);
    }
  };

  // Create backup of current master list
  const createBackup = async () => {
    if (dataSource !== 'local' || !selectedMasterList) {
      setSnackbarMessage('Please switch to local mode and select a file first');
      setSnackbarOpen(true);
      return;
    }

    try {
      setSnackbarMessage('Creating backup...');
      setSnackbarOpen(true);

      // Load the complete data from the current master list file
      const response = await fetch(`http://localhost:3001/backups/BackupsSkillMasterLists/${selectedMasterList}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load master list: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.skillsMasterList || !data.categories) {
        throw new Error('Invalid master list file structure');
      }

      // Call the backup API with the complete data
      const backupResponse = await fetch('http://localhost:3001/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: data.categories,
          concepts: data.skillsMasterList,
          backupName: null // Let the API generate the name
        })
      });

      if (!backupResponse.ok) {
        throw new Error('Failed to create backup');
      }

      const result = await backupResponse.json();
      
      // Also save a copy to src/data/ for production use
      try {
        // Remove _id fields from concepts for production TS file
        const cleanConcepts = data.skillsMasterList.map(({ _id, ...concept }: any) => concept);
        
        const tsContent = `export const categories = ${JSON.stringify(data.categories, null, 2)};

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

export const skillsMasterList: BJJConcept[] = ${JSON.stringify(cleanConcepts, null, 2)};
`;

        // Save to src/data/ directory
        console.log('🔍 Attempting to save to src/data/ with fileName:', result.files.ts);
        console.log('🔍 Content length:', tsContent.length);
        
        const saveToSrcDataResponse = await fetch('http://localhost:3001/api/save-to-src-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: result.files.ts,
            content: tsContent
          })
        });

        console.log('🔍 save-to-src-data response status:', saveToSrcDataResponse.status);
        
        if (saveToSrcDataResponse.ok) {
          const responseData = await saveToSrcDataResponse.json();
          console.log('🔍 save-to-src-data success:', responseData);
          setSnackbarMessage(`✅ Backup created: ${result.files.ts} (${result.nodeCount} nodes) - Also saved to src/data/ for production`);
        } else {
          const errorData = await saveToSrcDataResponse.text();
          console.error('🔍 save-to-src-data error:', errorData);
          setSnackbarMessage(`✅ Backup created: ${result.files.ts} (${result.nodeCount} nodes) - Note: Could not save to src/data/`);
        }
      } catch (error) {
        console.error('❌ Failed to save to src/data/:', error);
        console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        setSnackbarMessage(`✅ Backup created: ${result.files.ts} (${result.nodeCount} nodes) - Note: Could not save to src/data/`);
      }
      
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to create backup:', error);
      setSnackbarMessage('Failed to create backup. Check console for details.');
      setSnackbarOpen(true);
    }
  };

  // Restore from backup
  const restoreFromBackup = async (backupFileName: string) => {
    if (dataSource !== 'local') {
      setSnackbarMessage('Please switch to local mode first');
      setSnackbarOpen(true);
      return;
    }

    try {
      setSnackbarMessage('Restoring from backup...');
      setSnackbarOpen(true);

      // Load the backup file
      const response = await fetch(`/backups/BackupsSkillMasterLists/${backupFileName}`);
      if (!response.ok) {
        throw new Error('Backup file not found');
      }

      const fileContent = await response.text();
      
      // Extract data from TypeScript file
      const categoriesMatch = fileContent.match(/export const categories = (\[[\s\S]*?\]);/);
      const conceptsMatch = fileContent.match(/export const skillsMasterList: BJJConcept\[\] = (\[[\s\S]*?\]);/);
      
      if (!categoriesMatch || !conceptsMatch) {
        throw new Error('Could not extract data from backup file');
      }

      const restoredCategories = eval(categoriesMatch[1]);
      const restoredConcepts = eval(conceptsMatch[1]);

      // Update the current data
      setCategories(restoredCategories);
      setConcepts(restoredConcepts);

      setSnackbarMessage(`✅ Restored from backup: ${backupFileName} (${restoredConcepts.length} concepts)`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      setSnackbarMessage('Failed to restore from backup. Check console for details.');
      setSnackbarOpen(true);
    }
  };

  const fetchConcepts = () => {
    fetch('http://localhost:3001/api/concepts')
      .then(res => res.json())
      .then(data => setConcepts(data));
  };

  const fetchCategories = () => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  const addConcept = async (concept: Omit<BJJConcept, 'id'>) => {
    if (dataSource === 'mongodb') {
      await fetch('http://localhost:3001/api/concepts', {
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
    console.log('App - updateConcept called with:', { id, updates });
    console.log('App - Current concepts before update:', concepts.length);
    console.log('App - Looking for concept with id:', id);
    console.log('App - Available concept ids:', concepts.map(c => c.id));
    
    if (dataSource === 'mongodb') {
      // Remove _id from updates if present
      const { _id, ...rest } = (updates as any);
      await fetch(`http://localhost:3001/api/concepts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
      fetchConcepts();
    } else {
      // Local mode: update local state and save
      const conceptToUpdate = concepts.find(c => c.id === id);
      console.log('App - Found concept to update:', conceptToUpdate);
      
      const updatedConcepts = concepts.map(concept => 
        concept.id === id ? { ...concept, ...updates } : concept
      );
      console.log('App - Updated concepts array:', updatedConcepts.length);
      console.log('App - Updated concept details:', updatedConcepts.find(c => c.id === id));
      setConcepts(updatedConcepts);
      await saveToLocalFile(updatedConcepts, categories);
      console.log('App - Concept update completed');
    }
  };

  const deleteConcept = async (id: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`http://localhost:3001/api/concepts/${id}`, { method: 'DELETE' });
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
  const addCategory = async (cat: { 
    name: string; 
    color: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }) => {
    console.log('App - addCategory called with:', cat);
    console.log('App - Current categories before update:', categories.length, categories);
    
    if (dataSource === 'mongodb') {
      await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cat,
          xAxis: cat.xAxis || { left: 'Mental', right: 'Physical' },
          yAxis: cat.yAxis || { bottom: 'Self', top: 'Opponent' }
        }),
      });
      fetchCategories();
    } else {
      // Local mode: add to local state and save
      const newCategory = { 
        ...cat, 
        _id: `local-${Date.now()}`,
        xAxis: cat.xAxis || { left: 'Mental', right: 'Physical' },
        yAxis: cat.yAxis || { bottom: 'Self', top: 'Opponent' }
      };
      
      // Update categories state immediately
      const updatedCategories = [...categories, newCategory];
      console.log('App - Updated categories array:', updatedCategories.length, updatedCategories);
      setCategories(updatedCategories);
      
      // Save to current file
      await saveToLocalFile(concepts, updatedCategories);
      
      // Automatically create a backup with the new category
      try {
        const backupResponse = await fetch('http://localhost:3001/api/backup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categories: updatedCategories,
            concepts: concepts,
            backupName: null // Let the API generate the name
          })
        });

        if (backupResponse.ok) {
          const result = await backupResponse.json();
          setSnackbarMessage(`✅ New category "${cat.name}" added and backup created: ${result.files.json} (${result.nodeCount} nodes)`);
          setSnackbarOpen(true);
          
          // Refresh the master lists to show the new backup
          loadMasterLists();
        } else {
          console.error('Failed to create backup for new category');
        }
      } catch (error) {
        console.error('Failed to create backup for new category:', error);
        // Don't show error to user since the main save was successful
      }
    }
  };

  const updateCategory = async (id: string, updates: { 
    name: string; 
    color: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }) => {
    if (dataSource === 'mongodb') {
      await fetch(`http://localhost:3001/api/categories/${id}`, {
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
      await fetch(`http://localhost:3001/api/categories/${id}`, { method: 'DELETE' });
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

  // Handle Create Node button click
  const handleCreateNode = () => {
    // Set create mode to true and center the create point
    setCreateMode(true);
    setCreateAt({ x: 0.5, y: 0.5 }); // Center of the plot
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout
        header={<Header onCreateNode={handleCreateNode} />}
        sidebar={
          <Sidebar
            key={`sidebar-${categories.length}`}
            concepts={concepts}
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
          addCategory={addCategory}
          createMode={createMode}
          setCreateMode={setCreateMode}
          createAt={createAt}
          setCreateAt={setCreateAt}
          labelMode={labelMode}
          selected={selected}
          setSelected={setSelected}
          selectedCategories={selectedCategories}
        />
      </MainLayout>

      {/* Development Mode Toggle */}
      <DevModeToggle
        isDevelopment={isDevelopment}
        dataSource={dataSource}
        setDataSource={setDataSource}
        masterLists={masterLists}
        selectedMasterList={selectedMasterList}
        setSelectedMasterList={setSelectedMasterList}
        onConvertToMongo={convertToMongo}
        onSeedFromLocal={seedFromLocal}
        onCreateBackup={createBackup}
        onRestoreFromBackup={restoreFromBackup}
      />
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