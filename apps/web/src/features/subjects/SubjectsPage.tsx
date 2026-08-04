import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Filter, Users, 
  ChevronDown, ChevronRight, CheckCircle, AlertTriangle, Briefcase 
} from 'lucide-react';

export default function SubjectsPage() {
  const [expandedDept, setExpandedDept] = useState<string | null>('Mathematics');

  const departments = [
    { name: 'Mathematics', head: 'Dr. Sharma', subjects: 12, unassigned: 2, totalPeriods: 180 },
    { name: 'Sciences', head: 'Mr. Verma', subjects: 15, unassigned: 0, totalPeriods: 240 },
    { name: 'Languages', head: 'Mrs. Iyer', subjects: 8, unassigned: 1, totalPeriods: 120 },
    { name: 'Humanities', head: 'Mr. Singh', subjects: 10, unassigned: 0, totalPeriods: 150 },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Subject Allocation</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage subjects, credits, and map teachers across departments.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'white', color: '#111827', border: '1px solid #d1d5db', 
            padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <Filter size={16} /> Filters
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#4f46e5', color: 'white', border: 'none', 
            padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <Plus size={16} /> Add Subject
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Subjects', value: '45', color: '#3b82f6', bg: '#eff6ff', icon: <BookOpen size={20} /> },
          { label: 'Total Departments', value: '8', color: '#8b5cf6', bg: '#f3e8ff', icon: <Briefcase size={20} /> },
          { label: 'Unassigned Subjects', value: '3', color: '#ef4444', bg: '#fef2f2', icon: <AlertTriangle size={20} /> },
          { label: 'Fully Mapped', value: '42', color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={20} /> },
        ].map((card, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>{card.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout: Accordion + Teacher Pool */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        
        {/* Department Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', border: '1px solid #e5e7eb', padding: '12px 20px', borderRadius: '12px' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
              <input type="text" placeholder="Search departments or subjects..." style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>Showing 4 Departments</div>
          </div>

          {departments.map((dept, idx) => (
            <div key={idx} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              
              {/* Accordion Header */}
              <div 
                onClick={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
                style={{ 
                  padding: '16px 20px', background: expandedDept === dept.name ? '#f8fafc' : 'white', 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                  borderBottom: expandedDept === dept.name ? '1px solid #e5e7eb' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ color: '#64748b' }}>
                    {expandedDept === dept.name ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#111827' }}>{dept.name}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>HOD: {dept.head}</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Subjects</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{dept.subjects}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Periods/Wk</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{dept.totalPeriods}</div>
                  </div>
                  <div style={{ textAlign: 'right', width: '80px' }}>
                    {dept.unassigned > 0 ? (
                      <span style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>{dept.unassigned} Pending</span>
                    ) : (
                      <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>Mapped</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Accordion Body (Subjects) */}
              {expandedDept === dept.name && (
                <div style={{ padding: '20px', background: 'white' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Subject Name</th>
                        <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Class/Grade</th>
                        <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Credits/Periods</th>
                        <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Assigned Teacher(s)</th>
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
                          <td style={{ padding: '16px 12px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>{sub.name}</td>
                          <td style={{ padding: '16px 12px', fontSize: '13px', color: '#4b5563' }}>{sub.grade}</td>
                          <td style={{ padding: '16px 12px', fontSize: '13px', color: '#4b5563' }}>{sub.p}</td>
                          <td style={{ padding: '16px 12px' }}>
                            {sub.unassigned ? (
                              <div style={{ 
                                border: '1px dashed #cbd5e1', background: '#f8fafc', padding: '6px 12px', 
                                borderRadius: '6px', fontSize: '12px', color: '#94a3b8', 
                                display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
                              }}>
                                <Plus size={14} /> Drop Teacher Here
                              </div>
                            ) : (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {sub.t.map(tName => (
                                  <div key={tName} style={{ 
                                    background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
                                    padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
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
              )}
            </div>
          ))}
        </div>

        {/* Available Teachers Pool */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '600px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#111827' }}>Teacher Pool</h3>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: '#9ca3af' }} />
              <input type="text" placeholder="Search teacher to assign..." style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', outline: 'none' }} />
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Mathematics Dept.</div>
            
            {[
              { name: 'M. Iyer', load: 18, status: 'Available' },
              { name: 'S. Dixit', load: 24, status: 'Full' },
              { name: 'R. Sharma', load: 12, status: 'Available' },
              { name: 'P. Verma', load: 10, status: 'Available' },
            ].map((t, i) => (
              <div key={i} style={{ 
                background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px',
                cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)', opacity: t.status === 'Full' ? 0.6 : 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', color: '#3730a3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{t.name}</div>
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

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginTop: '12px' }}>Other Departments</div>
            
            <div style={{ 
              background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px',
              cursor: 'grab', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f3e8ff', color: '#6b21a8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                AK
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>A. Kumar (Sciences)</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Cross-mapped • Load: 14 hrs</div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
