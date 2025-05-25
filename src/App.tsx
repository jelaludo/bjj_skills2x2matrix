import React, { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ScatterPlot } from './components/ScatterPlot';
import { BJJConcept } from './data/SkillsMasterList';
import skillsMasterList from './data/SkillsMasterList';
import { categories as defaultCategories } from './data/SkillsMasterList';

function App() {
  const [concepts, setConcepts] = useState<BJJConcept[]>(skillsMasterList);
  const [categories, setCategories] = useState<{ name: string; color: string; }[]>(defaultCategories);
  const [createMode, setCreateMode] = useState(false);
  const [createAt, setCreateAt] = useState<{ x: number; y: number } | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrightness, setFilterBrightness] = useState(0);
  const [filterSize, setFilterSize] = useState(0);
  const [labelSize, setLabelSize] = useState(16);

  useEffect(() => {
    fetch('/api/concepts')
      .then(res => res.json())
      .then(data => setConcepts(data));
  }, []);

  const fetchConcepts = () => {
    fetch('/api/concepts')
      .then(res => res.json())
      .then(data => setConcepts(data));
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

  // Filter concepts based on selected filters
  const filteredConcepts = concepts.filter(concept => {
    if (filterCategory && concept.category !== filterCategory) return false;
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
          createMode={createMode}
          setCreateMode={setCreateMode}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
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