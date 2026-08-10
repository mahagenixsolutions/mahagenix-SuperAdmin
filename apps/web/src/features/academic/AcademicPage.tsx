import React, { useState } from 'react';
import { 
  BookOpen, Folder, FileText, ChevronRight, ChevronDown, 
  MoreVertical, Search, Plus, Shield, Activity, Target, Sparkles
} from 'lucide-react';
import { ManagementLayout } from './layouts/ManagementLayout';
import { KPICard } from './components/KPICard';
import { FilterBar } from './components/FilterBar';
import { SidebarWidget } from './components/SidebarWidget';

export default function AcademicPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [academicYear, setAcademicYear] = useState('2026-27');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'b1': true,
    's1': true,
    'u1': true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedNodes({ 'b1': true, 'b2': true, 's1': true, 's2': true, 'u1': true, 'u2': true, 'u3': true });
  };

  const collapseAll = () => {
    setExpandedNodes({});
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
      const paddingLeft = Math.min(level * 24 + 16, 80);
      
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
              transition: 'background 0.2s',
              flexWrap: 'wrap', gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
              <div style={{ width: 16, display: 'flex', justifyContent: 'center' }}>
                {hasChildren ? (
                  isExpanded ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />
                ) : (
                  <div style={{ width: 16 }} />
                )}
              </div>
              
              {node.type === 'board' && <Shield size={18} color="#4f46e5" />}
              {node.type === 'subject' && <BookOpen size={18} color="#10b981" />}
              {node.type === 'unit' && <Folder size={18} color="#f59e0b" />}
              {node.type === 'chapter' && <FileText size={16} color="#64748b" />}
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                  {node.title}
                </div>
                {node.lo && (
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Outcome: {node.lo}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {node.periods && (
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                  {node.periods} Periods
                </span>
              )}
              {node.status && (
                <span style={{
                  padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                  background: node.status === 'Approved' ? '#ecfdf5' : '#fffbeb',
                  color: node.status === 'Approved' ? '#10b981' : '#f59e0b',
                  border: node.status === 'Approved' ? '1px solid #a7f3d0' : '1px solid #fde68a',
                }}>
                  {node.status}
                </span>
              )}
            </div>
          </div>
          {hasChildren && isExpanded && renderTree(node.children, level + 1)}
        </div>
      );
    });
  };

  const kpiData = [
    { label: 'Active Curriculums', value: '12', tone: '#3b82f6', bg: '#eff6ff', icon: <Shield size={22} />, status: { label: 'CBSE & ICSE', tone: 'info' as const } },
    { label: 'Subjects Mapped', value: '84', tone: '#10b981', bg: '#ecfdf5', icon: <BookOpen size={22} />, trend: { value: '100% Coverage', isPositive: true } },
    { label: 'Learning Outcomes', value: '1,240', tone: '#8b5cf6', bg: '#f3e8ff', icon: <Target size={22} />, status: { label: 'Mapped', tone: 'success' as const } },
    { label: 'Drafts Pending', value: '4', tone: '#f59e0b', bg: '#fffbeb', icon: <Activity size={22} />, status: { label: 'Needs Review', tone: 'warning' as const } },
  ];

  return (
    <ManagementLayout
      breadcrumbs={[{ label: 'Academic' }, { label: 'Curriculum' }]}
      title="Curriculum Management"
      subtitle="Design and version control academic structures from Board to Chapter level."
      headerActions={
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#4f46e5', color: 'white', border: 'none',
            padding: '10px 16px', borderRadius: '10px', fontSize: '13px',
            fontWeight: 700, cursor: 'pointer'
          }}
        >
          <Plus size={16} /> New Curriculum
        </button>
      }
      kpiCards={
        <>
          {kpiData.map((k, i) => (
            <KPICard key={i} label={k.label} value={k.value} tone={k.tone} bg={k.bg} icon={k.icon} status={k.status} trend={k.trend} />
          ))}
        </>
      }
      filterBar={
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search curriculum by board, subject, or chapter..."
          filterGroups={[
            {
              id: 'year',
              label: 'Academic Year',
              value: academicYear,
              onChange: setAcademicYear,
              options: [
                { label: 'Academic Year 2026-27', value: '2026-27' },
                { label: 'Academic Year 2025-26', value: '2025-26' },
              ]
            }
          ]}
          customRightAction={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={expandAll} style={{ fontSize: '12px', fontWeight: 600, color: '#4f46e5', background: 'transparent', border: 'none', cursor: 'pointer' }}>Expand All</button>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <button onClick={collapseAll} style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer' }}>Collapse All</button>
            </div>
          }
        />
      }
      mainContent={
        <div className="academic-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
            Curriculum Hierarchy Tree
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderTree(curriculumData)}
          </div>
        </div>
      }
      sidePanel={
        <SidebarWidget title="AI Curriculum Auditor" icon={<Sparkles size={18} color="#10b981" />}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>
              Unit Weightage Recommendation
            </div>
            <div style={{ fontSize: '12px', color: '#047857', lineHeight: 1.5 }}>
              Grade 10 Physics Unit 1 requires 2 additional practical periods to align with ICSE board benchmarks.
            </div>
          </div>
        </SidebarWidget>
      }
    />
  );
}
