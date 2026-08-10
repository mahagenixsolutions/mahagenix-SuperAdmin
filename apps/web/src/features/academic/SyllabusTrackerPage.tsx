import React, { useState } from 'react';
import { 
  Target, TrendingUp, AlertCircle, BookOpen, 
  CheckCircle, MoreVertical, X, Info, Sparkles
} from 'lucide-react';
import { ManagementLayout } from './layouts/ManagementLayout';
import { KPICard } from './components/KPICard';
import { FilterBar } from './components/FilterBar';
import { SidebarWidget } from './components/SidebarWidget';

export default function SyllabusTrackerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState<any | null>(null);

  const departments = [
    { 
      name: 'Science Dept', progress: 68, target: 75,
      subjects: [
        { name: 'Physics (Grade 10)', progress: 65, teacher: 'M. Sharma', status: 'Behind', totalChapters: 12, completedChapters: 8, targetDate: 'Feb 15' },
        { name: 'Chemistry (Grade 10)', progress: 75, teacher: 'S. Gandhi', status: 'On Track', totalChapters: 10, completedChapters: 8, targetDate: 'Feb 10' },
        { name: 'Biology (Grade 10)', progress: 82, teacher: 'A. Kumar', status: 'Ahead', totalChapters: 11, completedChapters: 9, targetDate: 'Feb 5' },
      ]
    },
    { 
      name: 'Mathematics Dept', progress: 54, target: 60,
      subjects: [
        { name: 'Algebra (Grade 9)', progress: 48, teacher: 'M. Iyer', status: 'Behind', totalChapters: 14, completedChapters: 7, targetDate: 'Feb 20' },
        { name: 'Geometry (Grade 9)', progress: 60, teacher: 'S. Dixit', status: 'On Track', totalChapters: 10, completedChapters: 6, targetDate: 'Feb 12' },
      ]
    },
    { 
      name: 'Language Dept', progress: 85, target: 80,
      subjects: [
        { name: 'English (Grade 8)', progress: 85, teacher: 'R. Khanna', status: 'Ahead', totalChapters: 8, completedChapters: 7, targetDate: 'Jan 30' },
      ]
    }
  ];

  const kpiData = [
    { label: 'Overall Completion', value: '68%', tone: '#3b82f6', bg: '#eff6ff', icon: <Target size={22} />, status: { label: 'Target 75%', tone: 'info' as const } },
    { label: 'On Track / Ahead', value: '42', tone: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={22} />, trend: { value: '84% of total', isPositive: true } },
    { label: 'Lagging Behind', value: '8', tone: '#ef4444', bg: '#fef2f2', icon: <AlertCircle size={22} />, status: { label: 'Needs Action', tone: 'danger' as const } },
    { label: 'Forecast vs Target', value: '+2.4%', tone: '#8b5cf6', bg: '#f3e8ff', icon: <TrendingUp size={22} />, trend: { value: 'On schedule', isPositive: true } },
  ];

  return (
    <ManagementLayout
      breadcrumbs={[{ label: 'Academic' }, { label: 'Syllabus Tracker' }]}
      title="Syllabus Tracker"
      subtitle="Monitor syllabus completion rates, forecasts, and lagging subjects across all grades."
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
          searchPlaceholder="Search subject or teacher..."
          filterGroups={[
            {
              id: 'grade',
              label: 'Grade',
              value: gradeFilter,
              onChange: setGradeFilter,
              options: [
                { label: 'All Grades', value: 'All Grades' },
                { label: 'Grade 10', value: 'Grade 10' },
                { label: 'Grade 9', value: 'Grade 9' },
                { label: 'Grade 8', value: 'Grade 8' },
              ]
            }
          ]}
        />
      }
      mainContent={
        <div className="academic-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {departments.map((dept, idx) => (
              <div key={idx}>
                <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{dept.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Target: {dept.target}%</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '120px' }}>
                      <div style={{ flex: 1, background: '#e2e8f0', height: '6px', borderRadius: '3px' }}>
                        <div style={{ 
                          width: `${dept.progress}%`, 
                          background: dept.progress < dept.target ? '#ef4444' : '#10b981', 
                          height: '100%', borderRadius: '3px' 
                        }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{dept.progress}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="academic-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
                  <table>
                    <tbody>
                      {dept.subjects.map((sub, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '16px 20px', minWidth: '160px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{sub.name}</div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <BookOpen size={12} /> {sub.teacher}
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', minWidth: '140px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ flex: 1, background: '#f1f5f9', height: '8px', borderRadius: '4px', position: 'relative' }}>
                                <div style={{ 
                                  width: `${sub.progress}%`, 
                                  background: sub.status === 'Behind' ? '#ef4444' : sub.status === 'Ahead' ? '#3b82f6' : '#10b981', 
                                  height: '100%', borderRadius: '4px' 
                                }} />
                                <div style={{ 
                                  position: 'absolute', left: `${dept.target}%`, top: '-4px', bottom: '-4px', 
                                  width: '2px', background: '#111827', borderRadius: '1px' 
                                }} title={`Target: ${dept.target}%`} />
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', width: '36px' }}>{sub.progress}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', width: '100px', textAlign: 'right' }}>
                            <span style={{ 
                              background: sub.status === 'Behind' ? '#fef2f2' : sub.status === 'Ahead' ? '#eff6ff' : '#ecfdf5', 
                              color: sub.status === 'Behind' ? '#ef4444' : sub.status === 'Ahead' ? '#3b82f6' : '#10b981', 
                              padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 
                            }}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="academic-col-details" style={{ padding: '16px 12px', textAlign: 'center', width: '48px' }}>
                            <button 
                              onClick={() => setSelectedSubjectDetail({ ...sub, deptName: dept.name, deptTarget: dept.target })}
                              style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '6px 8px', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              title="View Subject Details"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      sidePanel={
        <SidebarWidget title="AI Completion Forecast" icon={<Sparkles size={18} color="#4f46e5" />}>
          <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
            Based on current pace, <strong>92%</strong> of subjects will finish syllabus before the target deadline.
          </p>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '12px', marginTop: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>Critical Risk: Grade 10 Physics</div>
            <div style={{ fontSize: '11px', color: '#991b1b', lineHeight: 1.4 }}>
              Currently 10% behind target. Recommend allocating 2 catch-up periods next week.
            </div>
          </div>
        </SidebarWidget>
      }
    />
  );
}
