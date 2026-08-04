import React from 'react';
import { 
  Target, TrendingUp, AlertCircle, Clock, BookOpen, 
  Search, Filter, ChevronDown, CheckCircle
} from 'lucide-react';

export default function SyllabusTrackerPage() {
  const departments = [
    { 
      name: 'Science Dept', progress: 68, target: 75,
      subjects: [
        { name: 'Physics (Grade 10)', progress: 65, teacher: 'M. Sharma', status: 'Behind' },
        { name: 'Chemistry (Grade 10)', progress: 75, teacher: 'S. Gandhi', status: 'On Track' },
        { name: 'Biology (Grade 10)', progress: 82, teacher: 'A. Kumar', status: 'Ahead' },
      ]
    },
    { 
      name: 'Mathematics Dept', progress: 54, target: 60,
      subjects: [
        { name: 'Algebra (Grade 9)', progress: 48, teacher: 'M. Iyer', status: 'Behind' },
        { name: 'Geometry (Grade 9)', progress: 60, teacher: 'S. Dixit', status: 'On Track' },
      ]
    },
    { 
      name: 'Language Dept', progress: 85, target: 80,
      subjects: [
        { name: 'English (Grade 8)', progress: 85, teacher: 'R. Khanna', status: 'Ahead' },
      ]
    }
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Syllabus Tracker</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Monitor syllabus completion rates, forecasts, and lagging subjects across all grades.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#111827', border: '1px solid #d1d5db', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Overall Completion</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>68%</div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>On Track / Ahead</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>42 <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>subjects</span></div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Lagging Behind</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>8 <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>subjects</span></div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Forecast vs Target</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>+2.4%</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        
        {/* Main Tracker Table */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
              <input type="text" placeholder="Search subject or teacher..." style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', color: '#4b5563', outline: 'none' }}>
                <option>All Grades</option>
                <option>Grade 10</option>
                <option>Grade 9</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {departments.map((dept, idx) => (
              <div key={idx}>
                {/* Department Header */}
                <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                
                {/* Subject Rows */}
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <tbody>
                    {dept.subjects.map((sub, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px 20px', width: '30%' }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{sub.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <BookOpen size={12} /> {sub.teacher}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1, background: '#f1f5f9', height: '8px', borderRadius: '4px', position: 'relative' }}>
                              <div style={{ 
                                width: `${sub.progress}%`, 
                                background: sub.status === 'Behind' ? '#ef4444' : sub.status === 'Ahead' ? '#3b82f6' : '#10b981', 
                                height: '100%', borderRadius: '4px' 
                              }} />
                              {/* Target Marker */}
                              <div style={{ 
                                position: 'absolute', left: `${dept.target}%`, top: '-4px', bottom: '-4px', 
                                width: '2px', background: '#111827', borderRadius: '1px' 
                              }} title={`Target: ${dept.target}%`} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', width: '40px' }}>{sub.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', width: '120px', textAlign: 'right' }}>
                          <span style={{ 
                            background: sub.status === 'Behind' ? '#fef2f2' : sub.status === 'Ahead' ? '#eff6ff' : '#ecfdf5', 
                            color: sub.status === 'Behind' ? '#ef4444' : sub.status === 'Ahead' ? '#3b82f6' : '#10b981', 
                            padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 
                          }}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: AI Forecast & Heatmap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#4f46e5" /> AI Completion Forecast
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                Based on current velocity, <strong>92%</strong> of subjects will finish syllabus before the Feb 15 deadline. 
              </p>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>Critical Risk: Grade 10 Physics</div>
                <div style={{ fontSize: '12px', color: '#475569' }}>Projected completion: Mar 5 (18 days late). Recommend adding 2 extra periods per week.</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#111827' }}>Syllabus Heatmap (Grade 10)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const intensity = Math.random();
                const bg = intensity > 0.8 ? '#10b981' : intensity > 0.5 ? '#34d399' : intensity > 0.3 ? '#6ee7b7' : '#d1fae5';
                return (
                  <div key={i} style={{ aspectRatio: '1', background: i === 4 || i === 7 ? '#fca5a5' : bg, borderRadius: '4px' }} title={`Chapter ${i+1}`} />
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', color: '#64748b' }}>
              <span>Not Started</span>
              <span>Completed</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
