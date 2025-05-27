import React, { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ScatterPlot } from './components/ScatterPlot';

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

function App() {
  const [concepts, setConcepts] = useState<BJJConcept[]>([]);
  const [categories, setCategories] = useState<{ name: string; color: string; _id?: string }[]>([]);
  const [createMode, setCreateMode] = useState(false);
  const [createAt, setCreateAt] = useState<{ x: number; y: number } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterBrightness, setFilterBrightness] = useState(0);
  const [filterSize, setFilterSize] = useState(0);
  const [labelSize, setLabelSize] = useState(16);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conceptsRes, categoriesRes] = await Promise.all([
          fetch('/api/concepts'),
          fetch('/api/categories')
        ]);
        
        if (!conceptsRes.ok || !categoriesRes.ok) {
          console.error('Failed to fetch data');
          return;
        }

        const conceptsData = await conceptsRes.json();
        const categoriesData = await categoriesRes.json();

        setConcepts(conceptsData.length > 0 ? conceptsData : []);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    await fetch('/api/concepts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(concept),
    });
    fetchConcepts();
  };

  const updateConcept = async (id: string, updates: Partial<BJJConcept>) => {
    await fetch(`/api/concepts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    fetchConcepts();
  };

  const deleteConcept = async (id: string) => {
    await fetch(`/api/concepts/${id}`, { method: 'DELETE' });
    fetchConcepts();
  };

  // Category CRUD
  const addCategory = async (cat: { name: string; color: string }) => {
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cat),
    });
    fetchCategories();
  };

  const updateCategory = async (id: string, updates: { name: string; color: string }) => {
    await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  // Filter concepts based on selected filters
  const filteredConcepts = concepts.filter(concept => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(concept.category)) return false;
    if (filterBrightness > 0 && concept.brightness !== filterBrightness) return false;
    if (filterSize > 0 && concept.size !== filterSize) return false;
    return true;
  });

  return (
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
          labelSize={labelSize}
          setLabelSize={setLabelSize}
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
        labelSize={labelSize}
      />
    </MainLayout>
  );
}

export default App; 