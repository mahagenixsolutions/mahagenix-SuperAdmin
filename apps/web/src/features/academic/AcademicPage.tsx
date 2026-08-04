import React, { useState } from 'react';
import { 
  BookOpen, Folder, FileText, ChevronRight, ChevronDown, 
  MoreVertical, Search, Plus, Filter, Shield, Activity, Target
} from 'lucide-react';

export default function AcademicPage() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'b1': true,
    's1': true,
    'u1': true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const curriculumData = [
    {
      id: 'b1', title: 'CBSE Grade 10 - Science', type: 'board', status: 'Approved',
      children: [
        {
          id: 's1', title: 'Physics', type: 'subject',
          children: [
            {
              id: 'u1', title: 'Unit 1: Light - Reflection and Refraction', type: 'unit', periods: 14,
              children: [
                { id: 'c1', title: '1.1 Reflection of Light', type: 'chapter', periods: 3, lo: 'Understand laws of reflection' },
                { id: 'c2', title: '1.2 Spherical Mirrors', type: 'chapter', periods: 4, lo: 'Image formation by spherical mirrors' },
                { id: 'c3', title: '1.3 Refraction of Light', type: 'chapter', periods: 4, lo: 'Refractive index and Snell’s Law' },
                { id: 'c4', title: '1.4 Lenses', type: 'chapter', periods: 3, lo: 'Lens formula and magnification' },
              ]
            },
            {
              id: 'u2', title: 'Unit 2: Human Eye and Colourful World', type: 'unit', periods: 10,
              children: [
                { id: 'c5', title: '2.1 Structure of Human Eye', type: 'chapter', periods: 3, lo: 'Identify parts and functions' },
                { id: 'c6', title: '2.2 Defects of Vision', type: 'chapter', periods: 4, lo: 'Myopia, Hypermetropia, Presbyopia' },
                { id: 'c7', title: '2.3 Refraction through a Prism', type: 'chapter', periods: 3, lo: 'Dispersion of white light' },
              ]
            }
          ]
        },
        {
          id: 's2', title: 'Chemistry', type: 'subject',
          children: [
            { id: 'u3', title: 'Unit 1: Chemical Reactions', type: 'unit', periods: 12, children: [] }
          ]
        }
      ]
    },
    {
      id: 'b2', title: 'CBSE Grade 10 - Mathematics', type: 'board', status: 'Draft',
      children: []
    }
  ];

  const renderTree = (nodes: any[], level = 0) => {
    return nodes.map(node => {
      const isExpanded = expandedNodes[node.id];
      const hasChildren = node.children && node.children.length > 0;
      const paddingLeft = level * 24 + 16;
      
      const isChapter = node.type === 'chapter';
      const isBoard = node.type === 'board';

      return (
        <div key={node.id}>
          <div 
            onClick={() => hasChildren && toggleNode(node.id)}
            style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: `12px 16px 12px ${paddingLeft}px`, 
              background: isBoard ? '#f8fafc' : 'white',
              borderBottom: '1px solid #f1f5f9',
              cursor: hasChildren ? 'pointer' : 'default',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = isBoard ? '#f8fafc' : 'white'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Chevron */}
              <div style={{ width: 16, display: 'flex', justifyContent: 'center' }}>
                {hasChildren ? (
                  isExpanded ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />
                ) : (
                  <div style={{ width: 16 }} />
                )}
              </div>
              
              {/* Icon */}
              {node.type === 'board' && <Shield size={18} color="#4f46e5" />}
              {node.type === 'subject' && <BookOpen size={18} color="#10b981" />}
              {node.type === 'unit' && <Folder size={18} color="#f59e0b" />}
              {node.type === 'chapter' && <FileText size={16} color="#64748b" />}
              
              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  fontSize: isBoard ? '15px' : isChapter ? '13px' : '14px', 
                  fontWeight: isBoard ? 800 : isChapter ? 500 : 600,
                  color: isChapter ? '#4b5563' : '#111827'
                }}>
                  {node.title}
                </span>
                {isChapter && node.lo && (
                  <span style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Target size={10} /> LO: {node.lo}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Status / Periods */}
              {node.status && (
                <span style={{ 
                  background: node.status === 'Approved' ? '#ecfdf5' : '#fef3c7', 
                  color: node.status === 'Approved' ? '#10b981' : '#d97706',
                  padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600
                }}>
                  {node.status}
                </span>
              )}
              {node.periods && (
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                  {node.periods} Periods
                </span>
              )}
              
              {/* Actions Menu */}
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
          
          {/* Children */}
          {hasChildren && isExpanded && (
            <div>{renderTree(node.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Curriculum Management</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Design and version control academic structures from Board to Chapter level.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#111827', border: '1px solid #d1d5db', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Filter size={16} /> Filters
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#4f46e5', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={16} /> New Curriculum
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Active Curriculums</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>12</div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Subjects Mapped</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>84</div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Learning Outcomes</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>1,240</div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Drafts Pending</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>4</div>
          </div>
        </div>
      </div>

      {/* Main Builder / Explorer */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
              <input type="text" placeholder="Search curriculum by board, subject, or chapter..." style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
            </div>
            <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', color: '#4b5563', outline: 'none' }}>
              <option>Academic Year 2026-27</option>
              <option>Academic Year 2025-26</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', background: 'transparent', border: 'none', cursor: 'pointer' }}>Expand All</button>
            <span style={{ color: '#d1d5db' }}>|</span>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', background: 'transparent', border: 'none', cursor: 'pointer' }}>Collapse All</button>
          </div>
        </div>

        {/* Tree View */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {renderTree(curriculumData)}
        </div>
      </div>

    </div>
  );
}
