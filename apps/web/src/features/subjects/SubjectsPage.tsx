import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Filter, Users, 
  ChevronDown, ChevronRight, CheckCircle, AlertTriangle, Briefcase 
} from 'lucide-react';
import { ManagementLayout } from '../academic/layouts/ManagementLayout';
import { KPICard } from '../academic/components/KPICard';
import { SidebarWidget } from '../academic/components/SidebarWidget';

export default function SubjectsPage() {
  const [expandedDept, setExpandedDept] = useState<string | null>('Mathematics');

  const departments = [
    { name: 'Mathematics', head: 'Dr. Sharma', subjects: 12, unassigned: 2, totalPeriods: 180 },
    { name: 'Sciences', head: 'Mr. Verma', subjects: 15, unassigned: 0, totalPeriods: 240 },
    { name: 'Languages', head: 'Mrs. Iyer', subjects: 8, unassigned: 1, totalPeriods: 120 },
    { name: 'Humanities', head: 'Mr. Singh', subjects: 10, unassigned: 0, totalPeriods: 150 },
  ];

  const kpiData = [
    { label: 'Total Subjects', value: '45', tone: '#3b82f6', bg: '#eff6ff', icon: <BookOpen size={20} />, status: { label: 'Active Curriculums', tone: 'info' as const } },
    { label: 'Total Departments', value: '8', tone: '#8b5cf6', bg: '#f3e8ff', icon: <Briefcase size={20} />, status: { label: 'All Operational', tone: 'neutral' as const } },
    { label: 'Unassigned Subjects', value: '3', tone: '#ef4444', bg: '#fef2f2', icon: <AlertTriangle size={20} />, status: { label: 'Mapping Needed', tone: 'danger' as const } },
    { label: 'Fully Mapped', value: '42', tone: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={20} />, trend: { value: '93% Complete', isPositive: true } },
  ];

  return (
    <ManagementLayout
      breadcrumbs={[{ label: 'EduTrack AI' }, { label: 'Subject Allocation' }]}
      title="Subject Allocation"
      subtitle="Manage subjects, credits, and map teachers across departments."
      headerActions={
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'white', color: '#334155', border: '1px solid #cbd5e1', 
            padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' 
          }}>
            <Filter size={16} /> Filters
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#4f46e5', color: 'white', border: 'none', 
            padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' 
          }}>
            <Plus size={16} /> Add Subject
          </button>
        </div>
      }
      kpiCards={
        <>
          {kpiData.map((k, i) => (
            <KPICard key={i} label={k.label} value={k.value} tone={k.tone} bg={k.bg} icon={k.icon} status={k.status} trend={k.trend} />
          ))}
        </>
      }
      mainContent={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="academic-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
              <input type="text" placeholder="Search departments or subjects..." style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#f8fafc' }} />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>Showing 4 Departments</div>
          </div>

          {departments.map((dept, idx) => (
            <div key={idx} className="academic-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div 
                onClick={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
                style={{ 
                  padding: '16px 20px', background: expandedDept === dept.name ? '#f8fafc' : 'white', 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                  borderBottom: expandedDept === dept.name ? '1px solid #e2e8f0' : 'none',
                  flexWrap: 'wrap', gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ color: '#64748b' }}>
                    {expandedDept === dept.name ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{dept.name}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>HOD: {dept.head}</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Subjects</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{dept.subjects}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Periods/Wk</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{dept.totalPeriods}</div>
                  </div>
                  <div>
                    {dept.unassigned > 0 ? (
                      <span style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>{dept.unassigned} Pending</span>
                    ) : (
                      <span style={{ background: '#ecfdf5', color: '#10b981', border: '1px solid #a7f3d0', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>Mapped</span>
                    )}
                  </div>
                </div>
              </div>

              {expandedDept === dept.name && (
                <div style={{ padding: '0', background: 'white' }}>
                  <div className="academic-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
                    <table>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Subject Name</th>
                          <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Class/Grade</th>
                          <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Credits/Periods</th>
                          <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Assigned Teacher(s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Advanced Algebra', grade: 'Grade 10 (A, B)', p: '6 per week', t: ['M. Iyer'], unassigned: false },
                          { name: 'Geometry', grade: 'Grade 9 (All)', p: '5 per week', t: ['S. Dixit', 'R. Sharma'], unassigned: false },
                          { name: 'Applied Mathematics', grade: 'Grade 11', p: '8 per week', t: [], unassigned: true },
                          { name: 'Basic Arithmetic', grade: 'Grade 6 (All)', p: '4 per week', t: ['M. Iyer'], unassigned: false },
                        ].map((sub, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{sub.name}</td>
                            <td style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>{sub.grade}</td>
                            <td style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>{sub.p}</td>
                            <td style={{ padding: '16px 20px' }}>
                              {sub.unassigned ? (
                                <div style={{ 
                                  border: '1px dashed #cbd5e1', background: '#f8fafc', padding: '6px 12px', 
                                  borderRadius: '6px', fontSize: '12px', color: '#94a3b8', 
                                  display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
                                }}>
                                  <Plus size={14} /> Drop Teacher Here
                                </div>
                              ) : (
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {sub.t.map(tName => (
                                    <div key={tName} style={{ 
                                      background: '#eff6ff', color: '#4f46e5', border: '1px solid #c7d2fe',
                                      padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                                      display: 'flex', alignItems: 'center', gap: '4px'
                                    }}>
                                      <Users size={12} /> {tName}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      }
      sidePanel={
        <SidebarWidget title="Teacher Pool">
          <div style={{ position: 'relative', marginBottom: '8px' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: '#9ca3af' }} />
            <input type="text" placeholder="Search teacher..." style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Mathematics Dept.</div>
            
            {[
              { name: 'M. Iyer', load: 18, status: 'Available' },
              { name: 'S. Dixit', load: 24, status: 'Full' },
              { name: 'R. Sharma', load: 12, status: 'Available' },
              { name: 'P. Verma', load: 10, status: 'Available' },
            ].map((t, i) => (
              <div key={i} style={{ 
                background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)', opacity: t.status === 'Full' ? 0.6 : 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', color: '#3730a3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Load: {t.load} hrs/wk</div>
                  </div>
                </div>
                {t.status === 'Available' ? (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} title="Available" />
                ) : (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} title="Full" />
                )}
              </div>
            ))}
          </div>
        </SidebarWidget>
      }
    />
  );
}
