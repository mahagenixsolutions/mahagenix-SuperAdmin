import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { 
  Activity, BookOpen, AlertTriangle, CheckCircle, 
  Sparkles, Target, Bell, MoreVertical, X, Info,
  FileText, Users
} from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { KPICard } from '../components/KPICard';
import { SidebarWidget } from '../components/SidebarWidget';

export default function AcademicCommandCenter() {
  const user = useSelector((s: RootState) => s.auth.user);
  const [selectedRowDetail, setSelectedRowDetail] = useState<any | null>(null);

  const tableData = [
    { dept: 'Sciences', prog: 72, lag: 'Grade 9 Physics (45%)', status: 'On Track', color: '#10b981', target: '75%', totalSubjects: 14, leadTeacher: 'Dr. M. Sharma' },
    { dept: 'Mathematics', prog: 65, lag: 'Grade 10 Algebra (52%)', status: 'Warning', color: '#f59e0b', target: '60%', totalSubjects: 12, leadTeacher: 'Prof. M. Iyer' },
    { dept: 'Languages', prog: 81, lag: 'French (68%)', status: 'Ahead', color: '#3b82f6', target: '80%', totalSubjects: 10, leadTeacher: 'Mrs. R. Khanna' },
    { dept: 'Humanities', prog: 54, lag: 'Grade 8 History (38%)', status: 'Behind', color: '#ef4444', target: '70%', totalSubjects: 15, leadTeacher: 'Mr. A. Desai' },
  ];

  const kpis = [
    { label: 'Syllabus Completion', value: '68%', status: { label: 'Target: 75%', tone: 'info' as const }, color: '#3b82f6', bg: '#eff6ff', icon: <BookOpen size={20} /> },
    { label: 'Avg Attendance', value: '94.2%', trend: { value: '1.2% from last week', isPositive: true }, color: '#10b981', bg: '#ecfdf5', icon: <Activity size={20} /> },
    { label: 'Pending Approvals', value: '24', status: { label: '14 Plans, 10 Exams', tone: 'warning' as const }, color: '#f59e0b', bg: '#fffbeb', icon: <CheckCircle size={20} /> },
    { label: 'Critical Alerts', value: '3', status: { label: 'Action required', tone: 'danger' as const }, color: '#ef4444', bg: '#fef2f2', icon: <AlertTriangle size={20} /> },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[{ label: 'EduTrack AI' }, { label: 'Dashboard' }]}
      title="Academic Command Center"
      subtitle={`Welcome back, ${user?.first_name || 'Coordinator'}. Here is your academic operations overview.`}
      roleBadge="ACADEMIC COORDINATOR"
      heroTitle={`Good morning, ${user?.first_name || 'Coordinator'}.`}
      heroDescription="You have 14 pending lesson plan approvals and 3 urgent academic alerts requiring attention before the term ends."
      heroBadge="COMMAND CENTER"
      heroActions={[
        { label: 'Review Lesson Plans', primary: true, onClick: () => window.location.href = '/academic/lesson-plans' },
        { label: 'Adjust Timetable', onClick: () => window.location.href = '/classes' }
      ]}
      kpiCards={
        <>
          {kpis.map((kpi, i) => (
            <KPICard
              key={i}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              tone={kpi.color}
              bg={kpi.bg}
              trend={kpi.trend}
              status={kpi.status}
            />
          ))}
        </>
      }
      primaryContent={
        <>
          {/* Curriculum Progress Table */}
          <div className="academic-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 className="academic-card-title">
                <Target size={18} color="#4f46e5" /> Curriculum Progress Tracker
              </h3>
              <a href="/academic/syllabus" style={{ fontSize: '13px', fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}>View Detailed Report</a>
            </div>
            
            <div className="academic-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
              <table>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Department</th>
                    <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Progress</th>
                    <th className="academic-col-secondary" style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Lagging Subject</th>
                    <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Status</th>
                    <th className="academic-col-details" style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textAlign: 'center' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i === tableData.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>{row.dept}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '120px' }}>
                          <div style={{ flex: 1, background: '#f1f5f9', height: '6px', borderRadius: '3px' }}>
                            <div style={{ width: `${row.prog}%`, background: row.color, height: '100%', borderRadius: '3px' }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{row.prog}%</span>
                        </div>
                      </td>
                      <td className="academic-col-secondary" style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>{row.lag}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ background: `${row.color}15`, color: row.color, padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>{row.status}</span>
                      </td>
                      <td className="academic-col-details" style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          onClick={() => setSelectedRowDetail(row)}
                          style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '6px 10px', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          title="View Details"
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

          {/* Exam Readiness & Teacher Workload Sub Grid */}
          <div className="academic-sub-grid">
            {/* Examination Readiness Card */}
            <div className="academic-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="academic-card-title" style={{ fontSize: '15px' }}>Examination Readiness</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Mid-Term Assessment Checklist</p>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '20px' }}>
                  78% Overall
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Item 1 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Mid-Term Papers Set</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#4f46e5' }}>42 / 56 <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>(75%)</span></span>
                  </div>
                  <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '75%', background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)', height: '100%', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Item 2 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Invigilation Rosters</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '6px' }}>
                      Drafting (40%)
                    </span>
                  </div>
                  <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '40%', background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', height: '100%', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Item 3 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Seating Plans</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '6px' }}>
                      Completed (100%)
                    </span>
                  </div>
                  <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', height: '100%', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Workload Card */}
            <div className="academic-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="academic-card-title" style={{ fontSize: '15px' }}>Teacher Workload</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Faculty Capacity Distribution</p>
                  </div>
                </div>
                <a href="/teachers" style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none', background: '#e0e7ff', padding: '6px 12px', borderRadius: '8px' }}>
                  Optimize
                </a>
              </div>

              {/* Legend Pills */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '11px', fontWeight: 700, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c' }}>
                  <div style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '2px' }} /> Overload (&gt;24h)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857' }}>
                  <div style={{ width: 8, height: 8, background: '#10b981', borderRadius: '2px' }} /> Optimal (18-24h)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0369a1' }}>
                  <div style={{ width: 8, height: 8, background: '#38bdf8', borderRadius: '2px' }} /> Under (&lt;18h)
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { name: 'Science Dept', overload: 3, optimal: 12, under: 1, total: '16 Faculty' },
                  { name: 'Math Dept', overload: 5, optimal: 8, under: 0, total: '13 Faculty' },
                  { name: 'Languages', overload: 0, optimal: 15, under: 4, total: '19 Faculty' },
                ].map((dept, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '13px' }}>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{dept.name}</span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{dept.total}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                      {dept.overload > 0 && (
                        <div title={`Overloaded: ${dept.overload}`} style={{ flex: dept.overload, background: '#ef4444' }} />
                      )}
                      {dept.optimal > 0 && (
                        <div title={`Optimal: ${dept.optimal}`} style={{ flex: dept.optimal, background: '#10b981' }} />
                      )}
                      {dept.under > 0 && (
                        <div title={`Underutilized: ${dept.under}`} style={{ flex: dept.under, background: '#38bdf8' }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      sidebarContent={
        <>
          {/* AI Intelligence Sidebar Widget */}
          <div style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '6px', borderRadius: '8px' }}>
                <Sparkles size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#065f46' }}>EduTrack AI Intelligence</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'white', border: '1px solid #d1fae5', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>Timetable Optimization Found</div>
                <div style={{ fontSize: '12px', color: '#047857', lineHeight: 1.5 }}>
                  Swapping Mrs. Sharma's Grade 8 Science period with Mr. Iyer's Math period on Thursdays resolves 3 teacher workload conflicts.
                </div>
                <button style={{ marginTop: '12px', background: '#10b981', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Apply Change</button>
              </div>
              
              <div style={{ background: 'white', border: '1px solid #d1fae5', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>Syllabus Risk Detected</div>
                <div style={{ fontSize: '12px', color: '#047857', lineHeight: 1.5 }}>
                  Grade 9 History is historically 15% slower in Term 1. Consider allocating 2 extra periods next week.
                </div>
              </div>
            </div>
          </div>

          {/* Academic Alerts list */}
          <SidebarWidget title="Academic Alerts" icon={<Bell size={18} color="#f59e0b" />}>
            {[
              { title: 'Grade 8 Science syllabus behind schedule', time: '2 hours ago', type: 'critical' },
              { title: '3 teacher allocations missing for next week', time: '5 hours ago', type: 'warning' },
              { title: 'Timetable conflict detected in Grade 6', time: 'Yesterday', type: 'warning' },
              { title: '5 lesson plans overdue for approval', time: 'Yesterday', type: 'info' }
            ].map((alertItem, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: '12px', borderBottom: i === 3 ? 'none' : '1px solid #f1f5f9' }}>
                <div style={{ 
                  width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
                  background: alertItem.type === 'critical' ? '#ef4444' : alertItem.type === 'warning' ? '#f59e0b' : '#3b82f6'
                }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{alertItem.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{alertItem.time}</div>
                </div>
              </div>
            ))}
          </SidebarWidget>
        </>
      }
    />
  );
}
