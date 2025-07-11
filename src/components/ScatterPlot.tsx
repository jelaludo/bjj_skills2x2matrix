import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface ModalProps {
  concept: BJJConcept | null;
  onClose: () => void;
  onSave: (updated: BJJConcept) => void;
  onDelete?: (id: string) => void;
  categories: { name: string; color: string; }[];
}

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

// Label management types
interface LabelItem {
  d: BJJConcept;
  x: number;
  y: number;
  fontSize: number;
  priority: number;
  width: number;
  height: number;
}

interface LabelMode {
  type: 'off' | 'hover' | 'selected' | 'smart' | 'all' | 'clustered';
  description: string;
}

const ConceptModal: React.FC<ModalProps & { side?: 'left' | 'right' | 'center', vertical?: 'top' | 'bottom' | 'center', containerSize?: { width: number; height: number } }> = ({ concept, onClose, onSave, onDelete, categories, side, vertical, containerSize }) => {
  const [edit, setEdit] = useState<BJJConcept | null>(concept);
  const [customCategory, setCustomCategory] = useState('');
  const [categoryMode, setCategoryMode] = useState<'select' | 'custom'>('select');

  React.useEffect(() => {
    setEdit(concept);
    setCategoryMode('select');
    setCustomCategory('');
  }, [concept]);

  // Calculate dynamic offset
  const horizontalOffset = containerSize ? Math.max(0.15 * containerSize.width, 180) : 300;
  const verticalOffset = containerSize ? Math.max(0.15 * containerSize.height, 80) : 100;

  if (!edit) return null;
  
  // Calculate positioning for mobile centering
  const isCentered = side === 'center' && vertical === 'center';
  const left = isCentered ? '50%' : side === 'left' ? 'auto' : horizontalOffset;
  const right = isCentered ? 'auto' : side === 'left' ? horizontalOffset : 'auto';
  const top = isCentered ? '50%' : vertical === 'top' ? verticalOffset : 'auto';
  const bottom = isCentered ? 'auto' : vertical === 'top' ? 'auto' : verticalOffset;
  const transform = isCentered ? 'translate(-50%, -50%)' : 'none';
  
  return (
    <div style={{
      position: 'fixed',
      left,
      right,
      top,
      bottom,
      transform,
      background: '#222',
      color: '#fff',
      padding: 24,
      borderRadius: 8,
      zIndex: 1000,
      minWidth: 350,
      boxShadow: '0 4px 24px #0008',
      maxWidth: containerSize ? Math.min(0.6 * containerSize.width, 500) : 500,
      width: '100%',
      maxHeight: containerSize ? 0.8 * containerSize.height : undefined,
      overflowY: 'auto',
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
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
          {onDelete && concept && (
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this concept?')) {
                  onDelete(concept.id);
                  onClose();
                }
              }}
              style={{ 
                background: '#F74F4F', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 4, 
                padding: '8px 18px', 
                cursor: 'pointer',
                marginRight: 'auto'
              }}
            >
              Delete
            </button>
          )}
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
  labelMode: LabelMode;
  selected: BJJConcept | null;
  setSelected: React.Dispatch<React.SetStateAction<BJJConcept | null>>;
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
  labelMode,
  selected,
  setSelected,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 600, height: 600 });
  const [pingedNodeId, setPingedNodeId] = useState<string | null>(null);
  const [pingStep, setPingStep] = useState(0);
  // Add state to control view/edit mode for the modal
  const [editMode, setEditMode] = useState(false);
  // For now, hardcode canEdit to true (replace with real permission logic later)
  const canEdit = true;

  // Label management functions
  const calculateLabelDimensions = (text: string, fontSize: number): { width: number; height: number } => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { width: 0, height: 0 };
    
    ctx.font = `bold ${fontSize}px Arial`;
    const metrics = ctx.measureText(text);
    return {
      width: metrics.width + 8, // Add padding
      height: fontSize + 4
    };
  };

  const detectCollision = (label1: LabelItem, label2: LabelItem): boolean => {
    return !(
      label1.x + label1.width < label2.x ||
      label1.x > label2.x + label2.width ||
      label1.y + label1.height < label2.y ||
      label1.y > label2.y + label2.height
    );
  };

  const getLabelPriority = (concept: BJJConcept, hovered: string | null, selected: BJJConcept | null): number => {
    if (hovered === concept.id) return 1000; // Highest priority
    if (selected && selected.id === concept.id) return 900; // Second highest
    return concept.brightness + concept.size; // Base priority on importance
  };

  const getLabelMode = (): LabelItem[] => {
    const labelItems: LabelItem[] = [];
    const width = size.width;
    const height = size.height;

    // Determine which concepts should have labels based on mode
    let conceptsToLabel: BJJConcept[] = [];
    
    switch (labelMode.type) {
      case 'off':
        return [];
      case 'hover':
        if (hovered) {
          const hoveredConcept = concepts.find(c => c.id === hovered);
          if (hoveredConcept) conceptsToLabel = [hoveredConcept];
        }
        break;
      case 'selected':
        if (selected) conceptsToLabel = [selected];
        break;
      case 'smart':
        // Show hovered, selected, and top 20% by priority
        const priorities = concepts.map(c => getLabelPriority(c, hovered, selected)).sort((a, b) => b - a);
        const priorityThreshold = priorities[Math.floor(priorities.length * 0.2)]; // Top 20%
        conceptsToLabel = concepts.filter(c => 
          hovered === c.id || 
          (selected && selected.id === c.id) ||
          getLabelPriority(c, hovered, selected) >= priorityThreshold
        );
        break;
      case 'all':
        conceptsToLabel = concepts;
        break;
      case 'clustered':
        // Group nearby concepts and show representative labels
        const clusters = clusterNearbyConcepts(concepts, 50); // 50px threshold
        conceptsToLabel = clusters.map(cluster => cluster.representative);
        break;
    }

    // Create label items with positioning
    conceptsToLabel.forEach(concept => {
      const x = margin + concept.axis_mental_physical * (width - 2 * margin);
      const y = height - margin - concept.axis_self_opponent * (height - 2 * margin) - 20;
      const fontSize = hovered === concept.id ? 16 : 12;
      const priority = getLabelPriority(concept, hovered, selected);
      const dimensions = calculateLabelDimensions(concept.concept, fontSize);
      
      labelItems.push({
        d: concept,
        x,
        y,
        fontSize,
        priority,
        width: dimensions.width,
        height: dimensions.height
      });
    });

    // Sort by priority (highest first)
    labelItems.sort((a, b) => b.priority - a.priority);

    // Apply collision detection
    const visibleLabels: LabelItem[] = [];
    labelItems.forEach(label => {
      const hasCollision = visibleLabels.some(existing => detectCollision(label, existing));
      if (!hasCollision) {
        visibleLabels.push(label);
      }
    });

    return visibleLabels;
  };

  const clusterNearbyConcepts = (concepts: BJJConcept[], threshold: number): Array<{ representative: BJJConcept; members: BJJConcept[] }> => {
    const clusters: Array<{ representative: BJJConcept; members: BJJConcept[] }> = [];
    const width = size.width;
    const height = size.height;

    concepts.forEach(concept => {
      const x = margin + concept.axis_mental_physical * (width - 2 * margin);
      const y = height - margin - concept.axis_self_opponent * (height - 2 * margin);
      
      let addedToCluster = false;
      for (const cluster of clusters) {
        const repX = margin + cluster.representative.axis_mental_physical * (width - 2 * margin);
        const repY = height - margin - cluster.representative.axis_self_opponent * (height - 2 * margin);
        
        const distance = Math.sqrt((x - repX) ** 2 + (y - repY) ** 2);
        if (distance < threshold) {
          cluster.members.push(concept);
          // Update representative to the most important concept in cluster
          if (getLabelPriority(concept, hovered, selected) > getLabelPriority(cluster.representative, hovered, selected)) {
            cluster.representative = concept;
          }
          addedToCluster = true;
          break;
        }
      }
      
      if (!addedToCluster) {
        clusters.push({ representative: concept, members: [concept] });
      }
    });

    return clusters;
  };

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
    // Find the highest BJJ-XXX number in existing concepts
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

  // Trigger ping animation when selected changes
  useEffect(() => {
    if (selected && selected.id) {
      setPingedNodeId(selected.id);
      setPingStep(0);
      let step = 0;
      const interval = setInterval(() => {
        setPingStep(s => s + 1);
        step++;
        if (step >= 6) { // 3 pulses (up/down)
          clearInterval(interval);
          setPingedNodeId(null);
          setPingStep(0);
        }
      }, 180);
      return () => clearInterval(interval);
    }
  }, [selected]);

  // When a new concept is selected, reset to view mode
  useEffect(() => {
    setEditMode(false);
  }, [selected]);

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
      .attr('opacity', d => {
        if (pingedNodeId === d.id) {
          // Pulse between 1.0 and 0.5
          return 0.5 + 0.5 * Math.abs(Math.sin(pingStep));
        }
        return 0.4 + d.brightness * 0.06;
      })
      .attr('stroke', d => hovered === d.id || (selected && selected.id === d.id) ? '#fff' : 'none')
      .attr('stroke-width', d => (pingedNodeId === d.id ? 5 : hovered === d.id ? 3 : 0))
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => setHovered(d.id))
      .on('mouseout', () => setHovered(null))
      .on('click', (event, d) => setSelected(d));

    // Advanced label management
    const labelItems = getLabelMode();

    // Draw labels with collision detection
    svg.selectAll('text.concept-label')
      .data(labelItems, (item: any) => item.d.id)
      .join('text')
      .attr('class', 'concept-label')
      .attr('x', item => item.x)
      .attr('y', item => item.y)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', item => item.fontSize)
      .attr('font-weight', 100)
      .style('pointer-events', 'none')
      .style('font-family', 'Inter, Roboto, Arial, sans-serif')
      .text(item => item.d.concept);
  }, [hovered, concepts, size, labelMode, pingedNodeId, pingStep]);

  const handleSave = (updated: BJJConcept) => {
    // Remove _id from update object
    const { _id, ...updates } = updated;
    if (_id) {
      updateConcept(_id, updates);
    } else {
      updateConcept(updated.id, updates);
    }
    setSelected(null);
  };

  const handleDelete = async (id: string) => {
    await deleteConcept(id);
    setSelected(null);
  };

  // Determine modal position based on selected node's quadrant
  let modalSide: 'left' | 'right' | 'center' = 'right';
  let modalVertical: 'top' | 'bottom' | 'center' = 'bottom';
  let createModalSide: 'left' | 'right' | 'center' = 'right';
  let createModalVertical: 'top' | 'bottom' | 'center' = 'bottom';
  
  // Check if we're on mobile (small screen)
  const isMobile = size.width < 768; // Standard mobile breakpoint
  
  if (selected && !isMobile) {
    // Desktop positioning: position relative to node
    modalSide = selected.axis_mental_physical < 0.5 ? 'right' : 'left';
    modalVertical = selected.axis_self_opponent < 0.5 ? 'bottom' : 'top';
  } else if (selected && isMobile) {
    // Mobile positioning: center on screen
    modalSide = 'center';
    modalVertical = 'center';
  }
  
  if (createModal && !isMobile) {
    // Desktop positioning for create modal
    createModalSide = createModal.x < 0.5 ? 'right' : 'left';
    createModalVertical = createModal.y < 0.5 ? 'bottom' : 'top';
  } else if (createModal && isMobile) {
    // Mobile positioning for create modal
    createModalSide = 'center';
    createModalVertical = 'center';
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        style={{ background: '#181818', borderRadius: 12, width: '100%', height: '100%' }}
        onClick={handleSvgClick}
      />
      {/* Show view modal if selected and not editing, else show edit modal */}
      {selected && !editMode && (
        <ConceptViewModal
          concept={selected}
          onClose={() => setSelected(null)}
          onEdit={canEdit ? () => setEditMode(true) : undefined}
          categories={categories}
          canEdit={canEdit}
          side={modalSide}
          vertical={modalVertical}
          containerSize={size}
        />
      )}
      {selected && editMode && (
        <ConceptModal
          concept={selected}
          onClose={() => { setEditMode(false); setSelected(null); }}
          onSave={handleSave}
          onDelete={handleDelete}
          categories={categories}
          side={modalSide}
          vertical={modalVertical}
          containerSize={size}
        />
      )}
      {createModal && (
        <ConceptModal
          concept={{
            id: generateId(),
            concept: '',
            description: '',
            short_description: '',
            category: categories[0]?.name || '',
            color: categories[0]?.color || '#888',
            axis_self_opponent: createModal.y,
            axis_mental_physical: createModal.x,
            brightness: 5,
            size: 3,
          }}
          onClose={() => { setCreateModal(null); setCreateMode(false); }}
          onSave={handleCreateSave}
          categories={categories}
          side={createModalSide}
          vertical={createModalVertical}
          containerSize={size}
        />
      )}
    </div>
  );
};

// Minimal view-only modal for concepts
interface ConceptViewModalProps {
  concept: BJJConcept | null;
  onClose: () => void;
  onEdit?: () => void;
  categories: { name: string; color: string; }[];
  canEdit?: boolean;
  side?: 'left' | 'right' | 'center';
  vertical?: 'top' | 'bottom' | 'center';
  containerSize?: { width: number; height: number };
}

const ConceptViewModal: React.FC<ConceptViewModalProps> = ({ concept, onClose, onEdit, categories, canEdit, side, vertical, containerSize }) => {
  if (!concept) return null;
  const category = categories.find(c => c.name === concept.category);
  const horizontalOffset = containerSize ? Math.max(0.15 * containerSize.width, 180) : 300;
  const verticalOffset = containerSize ? Math.max(0.15 * containerSize.height, 80) : 100;
  
  // Calculate positioning for mobile centering
  const isCentered = side === 'center' && vertical === 'center';
  const left = isCentered ? '50%' : side === 'left' ? 'auto' : horizontalOffset;
  const right = isCentered ? 'auto' : side === 'left' ? horizontalOffset : 'auto';
  const top = isCentered ? '50%' : vertical === 'top' ? verticalOffset : 'auto';
  const bottom = isCentered ? 'auto' : vertical === 'top' ? 'auto' : verticalOffset;
  const transform = isCentered ? 'translate(-50%, -50%)' : 'none';
  
  return (
    <div style={{
      position: 'fixed',
      left,
      right,
      top,
      bottom,
      transform,
      background: '#222',
      color: '#fff',
      padding: 24,
      borderRadius: 8,
      zIndex: 1000,
      minWidth: 350,
      boxShadow: '0 4px 24px #0008',
      maxWidth: containerSize ? Math.min(0.6 * containerSize.width, 500) : 500,
      width: '100%',
      maxHeight: containerSize ? 0.8 * containerSize.height : undefined,
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          {canEdit && (
            <button onClick={onEdit} style={{ background: 'none', border: 'none', color: '#888', fontSize: 14, cursor: 'pointer', padding: 0 }} title="Edit">
              ✏️
            </button>
          )}
          <div>
            <h2 style={{ margin: 0 }}>{concept.concept}</h2>
            {category && (
              <span style={{
                background: category.color,
                color: '#111',
                borderRadius: 4,
                padding: '2px 10px',
                fontSize: 13,
                marginLeft: 4,
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}>{category.name}</span>
            )}
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', padding: 0, lineHeight: 1 }} title="Close">×</button>
      </div>
      <div style={{ marginTop: 18, fontSize: 16, lineHeight: 1.5, whiteSpace: 'pre-line', fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 300, letterSpacing: '0.01em' }}>
        {concept.description}
      </div>
    </div>
  );
};

export default ScatterPlot; 