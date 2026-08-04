import { useState, useEffect } from 'react';
import { useGetMarksClassesQuery, useGetMarksAcademicYearsQuery } from '../marks/marksApi';
import { useGetClassAttendanceQuery, useBulkMarkAttendanceMutation } from './attendanceApi';
import { CheckCircle, ClipboardList, Calendar, Check, X, Clock, Briefcase, Users } from 'lucide-react';
import { useRegisterAIContext } from '../../hooks/useAIContext';

export default function AttendancePage() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const [classFilter, setClassFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(() => new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data: classes, isLoading: isClassesLoading } = useGetMarksClassesQuery();
  const { data: academicYears } = useGetMarksAcademicYearsQuery();

  const { data: dbRoster, isLoading: isRosterLoading } = useGetClassAttendanceQuery(
    { classId: classFilter, date: dateFilter },
    { skip: !classFilter || !dateFilter }
  );

  const [bulkMarkAttendance, { isLoading: isSaving }] = useBulkMarkAttendanceMutation();

  // Set default class once loaded
  useEffect(() => {
    if (classes && classes.length > 0 && !classFilter) {
      setClassFilter(classes[0].id);
    }
  }, [classes, classFilter]);

  // Sync database roster with local editing state
  useEffect(() => {
    if (dbRoster) {
      const state: Record<string, string> = {};
      dbRoster.forEach((student: any) => {
        state[student.student_id] = student.status || 'PRESENT';
      });
      setAttendance(state);
    }
  }, [dbRoster]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const mark = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const markAll = (status: string) => {
    if (!dbRoster) return;
    const all: Record<string, string> = {};
    dbRoster.forEach(s => { all[s.student_id] = status; });
    setAttendance(all);
  };

  const handleSave = async () => {
    if (!classFilter || !academicYears || academicYears.length === 0 || !dbRoster) return;
    
    // Find active/current academic year
    const activeAY = academicYears.find((ay: any) => ay.is_current) || academicYears[0];

    const entries = dbRoster.map((s: any) => ({
      student_id: s.student_id,
      status: attendance[s.student_id] || 'PRESENT',
      remarks: s.attendance?.remarks || undefined,
    }));

    try {
      await bulkMarkAttendance({
        date: dateFilter,
        academic_year_id: activeAY.id,
        entries,
      }).unwrap();
      triggerToast('📋 Attendance roster successfully updated & saved to database.');
    } catch {
      alert('Failed to save attendance. Please try again.');
    }
  };

  const stats = {
    present: Object.values(attendance).filter(s => s === 'PRESENT').length,
    absent: Object.values(attendance).filter(s => s === 'ABSENT').length,
    late: Object.values(attendance).filter(s => s === 'LATE').length,
    leave: Object.values(attendance).filter(s => s === 'LEAVE').length,
    total: dbRoster?.length ?? 0,
  };

  // Percentages matching mockup
  const presentPct = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : '0.0';
  const absentPct = stats.total > 0 ? ((stats.absent / stats.total) * 100).toFixed(1) : '0.0';
  const latePct = stats.total > 0 ? ((stats.late / stats.total) * 100).toFixed(1) : '0.0';
  const leavePct = stats.total > 0 ? ((stats.leave / stats.total) * 100).toFixed(1) : '0.0';

  // Push page context to AI assistant
  useRegisterAIContext({
    filters: { classFilter, dateFilter },
    dashboardMetrics: stats,
    visibleData: (dbRoster ?? []).map((s: any) => ({ ...s, status: attendance[s.student_id] || s.status })),
  });

  return (
    <div>
      {toastMessage && (
        <div className="toast-overlay animate-fadeIn" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <div className="toast-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <CheckCircle size={18} color="var(--color-secondary)" />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Redesigned Header to match mockup */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        fontFamily: 'Inter, sans-serif',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(99, 102, 241, 0.08)',
            color: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Attendance Entry
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 500 }}>
              <Calendar size={13} style={{ color: '#4f46e5' }} />
              <span>{today}</span>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          id="save-attendance-btn" 
          onClick={handleSave}
          disabled={isSaving || isRosterLoading || stats.total === 0}
          style={{
            background: '#4f46e5',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.25)',
          }}
        >
          {isSaving ? (
            <>⏳ Saving...</>
          ) : (
            <><Check size={16} /> Save Attendance</>
          )}
        </button>
      </div>

      {/* Redesigned Quick Stats (4 cards row + Enrolled card below) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
        
        {/* Row 1: Present, Absent, Late, Leave */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          width: '100%',
        }}>
          
          {/* Card 1: Present */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#22C55E' }}>Present</span>
                <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.present}</span>
                <div style={{ width: '20px', height: '2px', background: '#22C55E', borderRadius: '1px' }} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#22C55E',
                  background: 'rgba(34, 197, 94, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  marginTop: '10px',
                  width: 'fit-content',
                }}>{presentPct}% of enrolled</span>
              </div>
            </div>
            
            {/* Sparkline curve */}
            <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
              <svg width="65" height="40">
                <path d="M5,35 Q20,30 35,20 T65,8" fill="none" stroke="#22C55E" strokeWidth={2} strokeLinecap="round"/>
                <circle cx="65" cy="8" r="3" fill="#22C55E"/>
              </svg>
            </div>
          </div>

          {/* Card 2: Absent */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>Absent</span>
                <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.absent}</span>
                <div style={{ width: '20px', height: '2px', background: '#F59E0B', borderRadius: '1px' }} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#F59E0B',
                  background: 'rgba(245, 158, 11, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  marginTop: '10px',
                  width: 'fit-content',
                }}>{absentPct}% of enrolled</span>
              </div>
            </div>
            
            {/* Sparkline curve */}
            <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
              <svg width="65" height="40">
                <path d="M5,35 Q20,32 35,22 T65,12" fill="none" stroke="#F59E0B" strokeWidth={2} strokeLinecap="round"/>
                <circle cx="65" cy="12" r="3" fill="#F59E0B"/>
              </svg>
            </div>
          </div>

          {/* Card 3: Late */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Clock size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0EA5E9' }}>Late</span>
                <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.late}</span>
                <div style={{ width: '20px', height: '2px', background: '#0EA5E9', borderRadius: '1px' }} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#0EA5E9',
                  background: 'rgba(14, 165, 233, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  marginTop: '10px',
                  width: 'fit-content',
                }}>{latePct}% of enrolled</span>
              </div>
            </div>
            
            {/* Sparkline curve */}
            <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
              <svg width="65" height="40">
                <path d="M5,35 Q20,30 35,15 T65,10" fill="none" stroke="#0EA5E9" strokeWidth={2} strokeLinecap="round"/>
                <circle cx="65" cy="10" r="3" fill="#0EA5E9"/>
              </svg>
            </div>
          </div>

          {/* Card 4: Leave */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Briefcase size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#8B5CF6' }}>Leave</span>
                <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.leave}</span>
                <div style={{ width: '20px', height: '2px', background: '#8B5CF6', borderRadius: '1px' }} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#8B5CF6',
                  background: 'rgba(139, 92, 246, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  marginTop: '10px',
                  width: 'fit-content',
                }}>{leavePct}% of enrolled</span>
              </div>
            </div>
            
            {/* Sparkline curve */}
            <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
              <svg width="65" height="40">
                <path d="M5,35 Q20,33 35,23 T65,15" fill="none" stroke="#8B5CF6" strokeWidth={2} strokeLinecap="round"/>
                <circle cx="65" cy="15" r="3" fill="#8B5CF6"/>
              </svg>
            </div>
          </div>

        </div>

        {/* Row 2: Total Enrolled Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(99, 102, 241, 0.03) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', zIndex: 2 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.1)', color: '#4F46E5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Users size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Total Enrolled</span>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.total}</span>
              <div style={{ width: '20px', height: '2px', background: '#4F46E5', borderRadius: '1px' }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#4F46E5',
                background: 'rgba(99, 102, 241, 0.08)',
                padding: '3px 8px',
                borderRadius: '6px',
                marginTop: '10px',
                width: 'fit-content',
              }}>100% total strength</span>
            </div>
          </div>

          {/* Dotted Grid & Silhouette graphic SVG */}
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '130px',
            height: '90px',
            pointerEvents: 'none',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
            <svg viewBox="0 0 130 90" width="100%" height="100%">
              {/* Dotted grid on top right */}
              <circle cx="100" cy="15" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="110" cy="15" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="120" cy="15" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="100" cy="25" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="110" cy="25" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="120" cy="25" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="100" cy="35" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="110" cy="35" r="1.5" fill="#4F46E5" opacity="0.3" />
              <circle cx="120" cy="35" r="1.5" fill="#4F46E5" opacity="0.3" />

              {/* Background wave shape */}
              <path d="M40,90 Q75,45 130,55 L130,90 Z" fill="rgba(99, 102, 241, 0.06)" />

              {/* Three user silhouettes */}
              <circle cx="70" cy="82" r="8" fill="#4F46E5" opacity="0.15" />
              <path d="M60,90 C60,86 64,86 70,86 C76,86 80,86 80,90 Z" fill="#4F46E5" opacity="0.15" />

              <circle cx="90" cy="74" r="10" fill="#4F46E5" opacity="0.25" />
              <path d="M78,90 C78,82 82,82 90,82 C98,82 102,82 102,90 Z" fill="#4F46E5" opacity="0.25" />

              <circle cx="110" cy="80" r="8" fill="#4F46E5" opacity="0.2" />
              <path d="M100,90 C100,85 104,85 110,85 C116,85 120,85 120,90 Z" fill="#4F46E5" opacity="0.2" />
            </svg>
          </div>
        </div>

      </div>

      {/* Filters & Bulk Actions */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body" style={{ padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <select 
            className="form-select" 
            style={{ width: 220 }}
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            disabled={isClassesLoading}
          >
            {isClassesLoading ? (
              <option>Loading classes...</option>
            ) : (
              classes?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name} — Section {c.section}
                </option>
              ))
            )}
          </select>

          <input 
            type="date" 
            className="form-input" 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ width: 160 }} 
          />

          <div className="divider" style={{ height: 28, width: 1, margin: 0, background: 'var(--border-color)' }} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Mark all as:</span>
          {(['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] as const).map(s => (
            <button 
              key={s} 
              className={`btn btn-sm badge badge-${s.toLowerCase().replace('_','-')}`} 
              style={{ cursor: 'pointer', border: '1px solid currentColor' }} 
              onClick={() => markAll(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="card">
        {isRosterLoading ? (
          <div className="flex-center" style={{ height: 160, flexDirection: 'column', gap: 8 }}>
            <div style={{
              width: 32, height: 32,
              border: '2px solid var(--border-color)',
              borderTopColor: 'var(--color-primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}/>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading student roster...</span>
          </div>
        ) : dbRoster && dbRoster.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border-color)' }}>
            {dbRoster.map((student: any) => {
              const studentStatus = attendance[student.student_id];
              const initials = student.name.split(' ').map((n: string) => n[0]).join('');
              
              return (
                <div key={student.student_id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 20px', background: 'var(--bg-primary)',
                }}>
                  <div className="avatar-fallback" style={{
                    width: 38, height: 38, fontSize: 13, fontWeight: 700, flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    color: 'white',
                  }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                      {student.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>#{student.student_code}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {(['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => mark(student.student_id, s)}
                        style={{
                          padding: '4px 8px',
                          border: `1px solid ${studentStatus === s ? 'currentColor' : 'var(--border-color)'}`,
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 10, fontWeight: 600,
                          cursor: 'pointer',
                          background: studentStatus === s
                            ? { PRESENT: 'var(--color-secondary)', ABSENT: 'var(--color-danger)', LATE: 'var(--color-warning)', LEAVE: 'var(--color-gray-400)' }[s]
                            : 'transparent',
                          color: studentStatus === s ? 'white' : 'var(--text-muted)',
                          transition: 'var(--transition-fast)',
                        }}
                      >
                        {s[0]}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-center" style={{ height: 160, color: 'var(--text-muted)', fontSize: 13 }}>
            No active students found in this class.
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
