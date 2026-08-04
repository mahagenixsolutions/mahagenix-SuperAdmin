import React from 'react';
import { 
  FileText, Clock, CheckCircle, XCircle, Search, Filter, 
  MoreHorizontal, MessageSquare, Paperclip, Calendar
} from 'lucide-react';

export default function LessonPlansPage() {
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

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Lesson Plan Approvals</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Review, comment, and approve weekly lesson plans submitted by teachers.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
            <input type="text" placeholder="Search plans..." style={{ width: '240px', padding: '8px 12px 8px 36px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#111827', border: '1px solid #d1d5db', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flexShrink: 0 }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Pending Reviews</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>24</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Needs Revision</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>8</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={20} />
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Approved (This Week)</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>82</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={20} />
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Missing Submissions</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>12</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle size={20} />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0, overflowX: 'auto', paddingBottom: '8px' }}>
        {columns.map(col => (
          <div key={col.id} style={{ 
            background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', 
            minWidth: '320px', width: '320px', display: 'flex', flexDirection: 'column' 
          }}>
            {/* Column Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: col.color }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>{col.title}</h3>
              </div>
              <span style={{ background: '#e2e8f0', color: '#475569', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                {col.items.length}
              </span>
            </div>

            {/* Column Cards */}
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
              {col.items.map((item, idx) => (
                <div key={idx} style={{ 
                  background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', 
                  cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{item.grade}</span>
                    <button style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><MoreHorizontal size={16}/></button>
                  </div>
                  
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700, color: '#111827', lineHeight: 1.4 }}>
                    {item.title}
                  </h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: col.bg, color: col.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                      {item.teacher.split(' ').map(n=>n[0]).join('')}
                    </div>
                    {item.teacher}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {item.date}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', color: '#9ca3af' }}>
                      {item.attachments > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                          <Paperclip size={12} /> {item.attachments}
                        </span>
                      )}
                      {item.comments > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                          <MessageSquare size={12} /> {item.comments}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
