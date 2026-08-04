import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { 
  Activity, BookOpen, AlertTriangle, Calendar, FileText, CheckCircle, 
  Users, TrendingUp, Search, Bell, Sparkles, ChevronRight, Zap, Target
} from 'lucide-react';

export default function AcademicCommandCenter() {
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', 
        borderRadius: '16px', padding: '32px', color: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 10px 15px -3px rgba(30, 27, 75, 0.3)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px' }}>
              COMMAND CENTER
            </span>
            <span style={{ fontSize: '13px', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              Live Academic Feed Active
            </span>
          </div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 800 }}>Good morning, {user?.first_name || 'Coordinator'}.</h1>
          <p style={{ margin: 0, color: '#a5b4fc', fontSize: '15px', maxWidth: '600px', lineHeight: 1.5 }}>
            You have 14 pending lesson plan approvals and 3 urgent academic alerts requiring attention before the term ends.
          </p>
        </div>
        
        {/* Quick Actions Card built into Hero */}
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '16px', width: '280px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#e0e7ff', marginBottom: '12px', textTransform: 'uppercase' }}>Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ width: '100%', padding: '10px', background: 'white', color: '#312e81', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Review Lesson Plans <ChevronRight size={16} />
            </button>
            <button style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Adjust Timetable <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPIs (Academic Health) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Syllabus Completion', value: '68%', target: 'Target: 75%', color: '#3b82f6', bg: '#eff6ff', icon: <BookOpen size={20} /> },
          { label: 'Avg Attendance', value: '94.2%', target: '+1.2% from last week', color: '#10b981', bg: '#ecfdf5', icon: <Activity size={20} /> },
          { label: 'Pending Approvals', value: '24', target: '14 Lesson Plans, 10 Exams', color: '#f59e0b', bg: '#fffbeb', icon: <CheckCircle size={20} /> },
          { label: 'Critical Alerts', value: '3', target: 'Action required immediately', color: '#ef4444', bg: '#fef2f2', icon: <AlertTriangle size={20} /> },
        ].map((kpi, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {kpi.icon}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>{kpi.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{kpi.value}</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: kpi.color, marginTop: '8px' }}>{kpi.target}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Curriculum Progress Table */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="#4f46e5" /> Curriculum Progress Tracker
              </h3>
              <a href="/academic/syllabus" style={{ fontSize: '13px', fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}>View Detailed Report</a>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Department</th>
                  <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Overall Progress</th>
                  <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Lagging Subject</th>
                  <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dept: 'Sciences', prog: 72, lag: 'Grade 9 Physics (45%)', status: 'On Track', color: '#10b981' },
                  { dept: 'Mathematics', prog: 65, lag: 'Grade 10 Algebra (52%)', status: 'Warning', color: '#f59e0b' },
                  { dept: 'Languages', prog: 81, lag: 'French (68%)', status: 'Ahead', color: '#3b82f6' },
                  { dept: 'Humanities', prog: 54, lag: 'Grade 8 History (38%)', status: 'Behind', color: '#ef4444' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i === 3 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>{row.dept}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ flex: 1, background: '#f1f5f9', height: '6px', borderRadius: '3px' }}>
                          <div style={{ width: `${row.prog}%`, background: row.color, height: '100%', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{row.prog}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>{row.lag}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ background: `${row.color}15`, color: row.color, padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Exam Readiness & Teacher Workload */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Exam Readiness */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>Examination Readiness</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>Mid-Term Papers Set</span>
                    <span style={{ fontWeight: 700, color: '#111827' }}>42 / 56</span>
                  </div>
                  <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px' }}><div style={{ width: '75%', background: '#3b82f6', height: '100%', borderRadius: '3px' }}/></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>Invigilation Rosters</span>
                    <span style={{ fontWeight: 700, color: '#111827' }}>Drafting</span>
                  </div>
                  <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px' }}><div style={{ width: '40%', background: '#f59e0b', height: '100%', borderRadius: '3px' }}/></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>Seating Plans</span>
                    <span style={{ fontWeight: 700, color: '#111827' }}>Completed</span>
                  </div>
                  <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px' }}><div style={{ width: '100%', background: '#10b981', height: '100%', borderRadius: '3px' }}/></div>
                </div>
              </div>
            </div>

            {/* Teacher Workload Heatmap Placeholder */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>Teacher Workload</h3>
                <a href="/teachers" style={{ fontSize: '12px', fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}>Optimize</a>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Science Dept', overload: 3, optimal: 12, under: 1 },
                  { name: 'Math Dept', overload: 5, optimal: 8, under: 0 },
                  { name: 'Languages', overload: 0, optimal: 15, under: 4 },
                ].map((dept, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600, color: '#475569', width: '90px' }}>{dept.name}</span>
                    <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
                      <div title="Overloaded" style={{ flex: dept.overload, background: '#fca5a5', height: '16px', borderRadius: '4px' }} />
                      <div title="Optimal" style={{ flex: dept.optimal, background: '#6ee7b7', height: '16px', borderRadius: '4px' }} />
                      <div title="Underutilized" style={{ flex: dept.under, background: '#bae6fd', height: '16px', borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', fontSize: '11px', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: '#fca5a5', borderRadius: '2px' }}/> Overload</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: '#6ee7b7', borderRadius: '2px' }}/> Optimal</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: '#bae6fd', borderRadius: '2px' }}/> Under</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AI Insights Card */}
          <div style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '6px', borderRadius: '8px' }}>
                <Sparkles size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#065f46' }}>EduTrack AI Intelligence</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'white', border: '1px solid #d1fae5', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>Timetable Optimization Found</div>
                <div style={{ fontSize: '12px', color: '#047857', lineHeight: 1.5 }}>
                  Swapping Mrs. Sharma's Grade 8 Science period with Mr. Iyer's Math period on Thursdays resolves 3 teacher workload conflicts.
                </div>
                <button style={{ marginTop: '12px', background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Apply Change</button>
              </div>
              
              <div style={{ background: 'white', border: '1px solid #d1fae5', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>Syllabus Risk Detected</div>
                <div style={{ fontSize: '12px', color: '#047857', lineHeight: 1.5 }}>
                  Grade 9 History is historically 15% slower in Term 1. Consider allocating 2 extra periods next week.
                </div>
              </div>
            </div>
          </div>

          {/* Academic Alerts list */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} color="#f59e0b" /> Academic Alerts
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Grade 8 Science syllabus behind schedule', time: '2 hours ago', type: 'critical' },
                { title: '3 teacher allocations missing for next week', time: '5 hours ago', type: 'warning' },
                { title: 'Timetable conflict detected in Grade 6', time: 'Yesterday', type: 'warning' },
                { title: '5 lesson plans overdue for approval', time: 'Yesterday', type: 'info' }
              ].map((alert, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: '12px', borderBottom: i === 3 ? 'none' : '1px solid #f1f5f9' }}>
                  <div style={{ 
                    width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px',
                    background: alert.type === 'critical' ? '#ef4444' : alert.type === 'warning' ? '#f59e0b' : '#3b82f6'
                  }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{alert.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
