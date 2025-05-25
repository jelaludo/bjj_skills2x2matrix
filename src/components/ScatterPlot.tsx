import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { BJJConcept, categories } from '../data/SkillsMasterList';

interface ModalProps {
  concept: BJJConcept | null;
  onClose: () => void;
  onSave: (updated: BJJConcept) => void;
  categories: { name: string; color: string; }[];
}

const ConceptModal: React.FC<ModalProps> = ({ concept, onClose, onSave, categories }) => {
  const [edit, setEdit] = useState<BJJConcept | null>(concept);
  const [customCategory, setCustomCategory] = useState('');
  const [categoryMode, setCategoryMode] = useState<'select' | 'custom'>('select');

  React.useEffect(() => {
    setEdit(concept);
    setCategoryMode('select');
    setCustomCategory('');
  }, [concept]);

  if (!edit) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#222',
      color: '#fff',
      padding: 24,
      borderRadius: 8,
      zIndex: 1000,
      minWidth: 350,
      boxShadow: '0 4px 24px #0008',
    }}>
      <h2>Edit Concept</h2>
      <form onSubmit={e => { e.preventDefault(); if (edit) onSave(edit); }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>ID (read-only):</label>
          <input value={edit.id} readOnly style={{ width: '100%', background: '#333', color: '#aaa', border: 'none', padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Name:</label>
          <input value={edit.concept} onChange={e => setEdit({ ...edit, concept: e.target.value })} style={{ width: '100%', padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Description:</label>
          <textarea value={edit.description} onChange={e => setEdit({ ...edit, description: e.target.value })} style={{ width: '100%', padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Short Description:</label>
          <input value={edit.short_description} onChange={e => setEdit({ ...edit, short_description: e.target.value })} style={{ width: '100%', padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Category:</label>
          {categoryMode === 'select' ? (
            <>
              <select
                value={categories.find(c => c.name === edit.category)?.name || 'Other'}
                onChange={e => {
                  const selectedCategory = categories.find(c => c.name === e.target.value);
                  if (selectedCategory) {
                    setEdit({ ...edit, category: selectedCategory.name, color: selectedCategory.color });
                  } else {
                    setCategoryMode('custom');
                    setCustomCategory('');
                  }
                }}
                style={{ width: '100%', padding: 6, marginBottom: 8 }}
              >
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
                <option value="Other">Other...</option>
              </select>
            </>
          ) : (
            <>
              <input
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                placeholder="Enter custom category"
                style={{ width: '100%', padding: 6, marginBottom: 8 }}
              />
              <button type="button" style={{ marginBottom: 8, marginRight: 8 }} onClick={() => {
                setEdit({ ...edit, category: customCategory });
                setCategoryMode('select');
              }}>Set</button>
              <button type="button" style={{ marginBottom: 8 }} onClick={() => setCategoryMode('select')}>Cancel</button>
            </>
          )}

          <label style={{ display: 'block', marginBottom: 4 }}>Axis Self-Opponent (0-1):</label>
          <input type="number" min={0} max={1} step={0.01} value={edit.axis_self_opponent} onChange={e => setEdit({ ...edit, axis_self_opponent: parseFloat(e.target.value) })} style={{ width: 100, padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Axis Mental-Physical (0-1):</label>
          <input type="number" min={0} max={1} step={0.01} value={edit.axis_mental_physical} onChange={e => setEdit({ ...edit, axis_mental_physical: parseFloat(e.target.value) })} style={{ width: 100, padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Brightness (1-10):</label>
          <input type="number" min={1} max={10} value={edit.brightness} onChange={e => setEdit({ ...edit, brightness: parseInt(e.target.value) })} style={{ width: 100, padding: 6, marginBottom: 8 }} />

          <label style={{ display: 'block', marginBottom: 4 }}>Size (1-10):</label>
          <input type="number" min={1} max={10} value={edit.size} onChange={e => setEdit({ ...edit, size: parseInt(e.target.value) })} style={{ width: 100, padding: 6, marginBottom: 8 }} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', cursor: 'pointer' }}>Save</button>
        </div>
      </form>
    </div>
  );
};

const margin = 40;

interface ScatterPlotProps {
  concepts: BJJConcept[];
  addConcept: (concept: Omit<BJJConcept, 'id'>) => Promise<void>;
  updateConcept: (id: string, updates: Partial<BJJConcept>) => Promise<void>;
  deleteConcept: (id: string) => Promise<void>;
  categories: { name: string; color: string; }[];
  setCategories: React.Dispatch<React.SetStateAction<{ name: string; color: string; }[]>>;
  createMode: boolean;
  setCreateMode: (v: boolean) => void;
  createAt: { x: number; y: number } | null;
  setCreateAt: (v: { x: number; y: number } | null) => void;
  labelSize: number;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  concepts,
  addConcept,
  updateConcept,
  deleteConcept,
  categories,
  setCategories,
  createMode,
  setCreateMode,
  createAt,
  setCreateAt,
  labelSize,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<BJJConcept | null>(null);
  const [size, setSize] = useState({ width: 600, height: 600 });

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({
          width: Math.max(300, rect.width),
          height: Math.max(300, rect.height),
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      setSize({ width: Math.max(300, rect.width), height: Math.max(300, rect.height) });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Click-to-create-node logic
  const [createModal, setCreateModal] = useState<null | { x: number; y: number }>(null);
  useEffect(() => {
    if (!createMode) setCreateModal(null);
  }, [createMode]);

  // Handle click on SVG for node creation
  const handleSvgClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!createMode) return;
    // Get bounding rect and calculate normalized axis values
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Clamp to plot area and round to 2 decimal places
    const normX = Number(Math.max(0, Math.min(1, (x - margin) / (size.width - 2 * margin))).toFixed(2));
    const normY = Number(Math.max(0, Math.min(1, (size.height - margin - y) / (size.height - 2 * margin))).toFixed(2));
    setCreateModal({ x: normX, y: normY });
  };

  // Handle save for new node
  const handleCreateSave = async (newConcept: Omit<BJJConcept, 'id'>) => {
    await addConcept(newConcept);
    setCreateModal(null);
    setCreateMode(false);
  };

  // Generate a new unique ID
  const generateId = (): string => {
    let idx = 1;
    let id: string;
    do {
      id = `BJJ-${String(idx).padStart(3, '0')}`;
      idx++;
    } while (concepts.some(c => c.id === id));
    return id;
  };

  useEffect(() => {
    const width = size.width;
    const height = size.height;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Axes
    svg.append('line')
      .attr('x1', margin)
      .attr('y1', height - margin)
      .attr('x2', width - margin)
      .attr('y2', height - margin)
      .attr('stroke', '#888');
    svg.append('line')
      .attr('x1', margin)
      .attr('y1', height - margin)
      .attr('x2', margin)
      .attr('y2', margin)
      .attr('stroke', '#888');

    // Quadrant separation lines (center cross)
    svg.append('line')
      .attr('x1', width / 2)
      .attr('y1', margin)
      .attr('x2', width / 2)
      .attr('y2', height - margin)
      .attr('stroke', '#444')
      .attr('stroke-dasharray', '6,4');
    svg.append('line')
      .attr('x1', margin)
      .attr('y1', height / 2)
      .attr('x2', width - margin)
      .attr('y2', height / 2)
      .attr('stroke', '#444')
      .attr('stroke-dasharray', '6,4');

    // Axis labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .attr('font-size', 20)
      .attr('font-weight', 'bold')
      .text('Mental');
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - margin + 35)
      .attr('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .attr('font-size', 20)
      .attr('font-weight', 'bold')
      .text('Physical');
    svg.append('text')
      .attr('x', margin - 20)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .attr('font-size', 20)
      .attr('font-weight', 'bold')
      .attr('transform', `rotate(-90,${margin - 20},${height / 2})`)
      .text('Opponent');
    svg.append('text')
      .attr('x', width - margin + 30)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .attr('font-size', 20)
      .attr('font-weight', 'bold')
      .attr('transform', `rotate(-90,${width - margin + 30},${height / 2})`)
      .text('Self');

    // Nodes
    svg.selectAll('circle')
      .data(concepts)
      .enter()
      .append('circle')
      .attr('cx', d => margin + d.axis_mental_physical * (width - 2 * margin))
      .attr('cy', d => height - margin - d.axis_self_opponent * (height - 2 * margin))
      .attr('r', d => 4 + d.size * 2)
      .attr('fill', d => d.color)
      .attr('opacity', d => 0.4 + d.brightness * 0.06)
      .attr('stroke', d => hovered === d.id ? '#fff' : 'none')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => setHovered(d.id))
      .on('mouseout', () => setHovered(null))
      .on('click', (event, d) => setSelected(d));

    // Label logic
    // 1. If labelSize > 0, show all labels at labelSize, but hovered node at 16 (medium)
    // 2. If labelSize === 0, only show hovered node at 16
    let labelData: { d: BJJConcept; fontSize: number }[] = [];
    if (labelSize > 0) {
      labelData = concepts.map(d => ({
        d,
        fontSize: hovered === d.id ? 16 : labelSize,
      }));
    } else if (hovered) {
      const d = concepts.find(c => c.id === hovered);
      if (d) labelData = [{ d, fontSize: 16 }];
    }

    // Draw all labels (non-hovered first)
    svg.selectAll('text.concept-label')
      .data(labelData, (item: any) => item.d.id)
      .join('text')
      .attr('class', 'concept-label')
      .attr('x', item => margin + item.d.axis_mental_physical * (width - 2 * margin))
      .attr('y', item => height - margin - item.d.axis_self_opponent * (height - 2 * margin) - 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', item => item.fontSize)
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(item => item.d.concept);
  }, [hovered, concepts, size, labelSize]);

  const handleSave = (updated: BJJConcept) => {
    updateConcept(updated.id, updated);
    setSelected(null);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        style={{ background: '#181818', borderRadius: 12, width: '100%', height: '100%' }}
        onClick={handleSvgClick}
      />
      <ConceptModal
        concept={selected}
        onClose={() => setSelected(null)}
        onSave={handleSave}
        categories={categories}
      />
      {createModal && (
        <ConceptModal
          concept={{
            id: generateId(),
            concept: '',
            description: '',
            short_description: '',
            category: categories[0]?.name || '',
            color: categories[0]?.color || '#4F8EF7',
            axis_self_opponent: createModal.y,
            axis_mental_physical: createModal.x,
            brightness: 1,
            size: 1,
          }}
          onClose={() => { setCreateModal(null); setCreateMode(false); }}
          onSave={handleCreateSave}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ScatterPlot; 