import React, { useState } from 'react';
import { 
  Clock, CheckCircle, XCircle, MoreHorizontal, 
  MessageSquare, Paperclip, AlertCircle, Sparkles
} from 'lucide-react';
import { ManagementLayout } from './layouts/ManagementLayout';
import { KPICard } from './components/KPICard';
import { FilterBar } from './components/FilterBar';
import { SidebarWidget } from './components/SidebarWidget';

export default function LessonPlansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const columns = [
    {
      id: 'pending', title: 'Pending Approval', color: '#f59e0b', bg: '#fffbeb',
      items: [
        { title: 'Quadratic Equations (Wk 4)', teacher: 'M. Iyer', grade: 'Grade 10', date: 'Submitted 2 hrs ago', comments: 0, attachments: 2 },
        { title: 'Photosynthesis Lab', teacher: 'S. Gandhi', grade: 'Grade 9', date: 'Submitted 5 hrs ago', comments: 1, attachments: 3 },
      ]
    },
    {
      id: 'revision', title: 'Needs Revision', color: '#8b5cf6', bg: '#f3e8ff',
      items: [
        { title: 'French Revolution', teacher: 'A. Desai', grade: 'Grade 9', date: 'Returned yesterday', comments: 3, attachments: 1 },
      ]
    },
    {
      id: 'approved', title: 'Approved', color: '#10b981', bg: '#ecfdf5',
      items: [
        { title: 'Chemical Kinetics', teacher: 'S. Gandhi', grade: 'Grade 12', date: 'Approved yesterday', comments: 0, attachments: 1 },
        { title: 'Trigonometry Intro', teacher: 'R. Sharma', grade: 'Grade 10', date: 'Approved 2 days ago', comments: 2, attachments: 4 },
        { title: 'Hindi Grammar', teacher: 'R. Khanna', grade: 'Grade 8', date: 'Approved 2 days ago', comments: 0, attachments: 1 },
      ]
    }
  ];

  const kpiData = [
    { label: 'Pending Reviews', value: '24', tone: '#f59e0b', bg: '#fffbeb', icon: <Clock size={22} />, status: { label: 'Action Needed', tone: 'warning' as const } },
    { label: 'Needs Revision', value: '8', tone: '#8b5cf6', bg: '#f3e8ff', icon: <AlertCircle size={22} />, status: { label: 'Returned', tone: 'info' as const } },
    { label: 'Approved (This Week)', value: '82', tone: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={22} />, trend: { value: '91% Pass Rate', isPositive: true } },
    { label: 'Missing Submissions', value: '12', tone: '#ef4444', bg: '#fef2f2', icon: <XCircle size={22} />, status: { label: 'Overdue', tone: 'danger' as const } },
  ];

  return (
    <ManagementLayout
      breadcrumbs={[{ label: 'Academic' }, { label: 'Lesson Plans' }]}
      title="Lesson Plan Approvals"
      subtitle="Review, comment, and approve weekly lesson plans submitted by faculty members."
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
          searchPlaceholder="Search plans by teacher or subject..."
          filterGroups={[
            {
              id: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'All' },
                { label: 'Pending Approval', value: 'Pending' },
                { label: 'Needs Revision', value: 'Revision' },
                { label: 'Approved', value: 'Approved' },
              ]
            }
          ]}
        />
      }
      mainContent={
        <div className="academic-kanban-grid">
          {columns.map(col => (
            <div key={col.id} style={{ 
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', 
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{col.title}</span>
                </div>
                <span style={{ background: col.bg, color: col.color, padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                  {col.items.length}
                </span>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.items.map((item, idx) => (
                  <div key={idx} className="academic-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                        {item.grade}
                      </span>
                      <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#111827', lineHeight: 1.4 }}>{item.title}</h4>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Teacher: <strong>{item.teacher}</strong></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                      <span>{item.date}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {item.attachments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Paperclip size={12} /> {item.attachments}</span>}
                        {item.comments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><MessageSquare size={12} /> {item.comments}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
      sidePanel={
        <SidebarWidget title="AI Lesson Audit" icon={<Sparkles size={18} color="#8b5cf6" />}>
          <div style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b21a8', marginBottom: '4px' }}>
              Taxonomy Mapping Verified
            </div>
            <div style={{ fontSize: '12px', color: '#7e22ce', lineHeight: 1.5 }}>
              All 82 approved plans meet Bloom's Taxonomy learning outcome objectives for Term 1.
            </div>
          </div>
        </SidebarWidget>
      }
    />
  );
}
