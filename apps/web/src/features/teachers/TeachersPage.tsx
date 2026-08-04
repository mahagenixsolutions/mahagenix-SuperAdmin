import React, { useState } from 'react';
import { 
  Users, BookOpen, Clock, AlertTriangle, Search, Filter,
  PieChart, BarChart2, Plus, ArrowRight, UserPlus, FileText, CheckCircle
} from 'lucide-react';

export default function TeachersPage() {
  const [activeTab, setActiveTab] = useState('Directory');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Teacher Allocation</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Manage teaching loads, subject mapping, and department resource distribution.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'white', color: '#4b5563', border: '1px solid #d1d5db', 
            padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <UserPlus size={16} /> Assign Substitute
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#2563eb', color: 'white', border: 'none', 
            padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <Plus size={16} /> New Allocation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Total Active Teachers</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>114</div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Avg Teaching Load</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>22 <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>hrs/wk</span></div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Vacant Positions</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>3 <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600, background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>Hiring</span></div>
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Overloaded Teachers</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>8 <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600, background: '#fee2e2', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>Action Req</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '32px' }}>
        {['Directory & Load', 'Department Distribution', 'Vacancies & Substitutes'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '0 0 12px 0', background: 'transparent', border: 'none', 
              borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === tab ? '#2563eb' : '#6b7280',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      {activeTab === 'Directory & Load' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          
          {/* Main Directory List */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
                <input 
                  type="text" 
                  placeholder="Search teacher by name or subject..." 
                  style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                />
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#4b5563', cursor: 'pointer' }}>
                <Filter size={14} /> Filter
              </button>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Teacher</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Department</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Primary Subjects</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Teaching Load</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Status</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Arun Iyer', dept: 'Mathematics', sub: 'Algebra (G9, G10)', load: 28, max: 24, status: 'Overloaded', avatar: 'AI', color: '#ef4444' },
                  { name: 'Meera Sharma', dept: 'Science', sub: 'Physics (G11, G12)', load: 22, max: 24, status: 'Optimal', avatar: 'MS', color: '#10b981' },
                  { name: 'Rajesh Khanna', dept: 'Languages', sub: 'Hindi (G6-G8)', load: 18, max: 24, status: 'Underutilized', avatar: 'RK', color: '#f59e0b' },
                  { name: 'Anita Desai', dept: 'Humanities', sub: 'History (G9, G10)', load: 24, max: 24, status: 'Optimal', avatar: 'AD', color: '#10b981' },
                  { name: 'Sonia Gandhi', dept: 'Science', sub: 'Chemistry (G11, G12)', load: 26, max: 24, status: 'Overloaded', avatar: 'SG', color: '#ef4444' },
                ].map((t, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0e7ff', color: '#3730a3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                          {t.avatar}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{t.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>ID: TCH-{1000 + i}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>{t.dept}</td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#4b5563' }}>{t.sub}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, background: '#f1f5f9', height: '6px', borderRadius: '3px', width: '80px' }}>
                          <div style={{ width: `${Math.min(100, (t.load / t.max) * 100)}%`, background: t.color, height: '100%', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: t.color }}>{t.load}/{t.max}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ background: `${t.color}15`, color: t.color, padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{t.status}</span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button style={{ background: 'transparent', border: 'none', color: '#4f46e5', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Workload Distribution Chart Summary */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#111827' }}>Workload Distribution</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '2px', background: '#ef4444' }} />
                    <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>Overloaded (&gt;24 hrs)</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>7%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '2px', background: '#10b981' }} />
                    <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>Optimal (18-24 hrs)</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>81%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '2px', background: '#f59e0b' }} />
                    <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>Underutilized (&lt;18 hrs)</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>12%</span>
                </div>
              </div>
              <button style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Auto-Balance Workload
              </button>
            </div>

            {/* Quick Allocations */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#111827' }}>Recent Allocations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { text: 'A. Desai assigned to Grade 9 History (A, B, C)', time: '2 hours ago', icon: <CheckCircle size={14} color="#10b981" /> },
                  { text: 'Substitute requested for M. Sharma (Aug 15)', time: '5 hours ago', icon: <AlertTriangle size={14} color="#f59e0b" /> },
                  { text: 'New Vacancy created in Mathematics Dept', time: '1 day ago', icon: <FileText size={14} color="#3b82f6" /> },
                ].map((act, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '2px' }}>{act.icon}</div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#374151', lineHeight: 1.4 }}>{act.text}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
