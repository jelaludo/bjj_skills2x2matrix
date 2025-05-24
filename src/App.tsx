import React, { useState } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ScatterPlot } from './components/ScatterPlot';
import { skillsMasterList as initialSkills, BJJConcept, categories as masterCategories } from './data/SkillsMasterList';

function App() {
  const [concepts, setConcepts] = useState<BJJConcept[]>(initialSkills);
  const [categories, setCategories] = useState<{ name: string; color: string; }[]>(masterCategories);
  const [createMode, setCreateMode] = useState(false);
  const [createAt, setCreateAt] = useState<{ x: number; y: number } | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrightness, setFilterBrightness] = useState(0);
  const [filterSize, setFilterSize] = useState(0);
  const [labelSize, setLabelSize] = useState(16);

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
          setConcepts={setConcepts}
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
        setConcepts={setConcepts}
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