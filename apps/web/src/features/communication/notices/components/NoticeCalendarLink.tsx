import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export const NoticeCalendarLink: React.FC = () => {
  const events = [
    { title: 'Mid-Term Examinations Begin', date: 'Aug 12, 2026', type: 'Exams' },
    { title: 'Pre-Board Assignment Submission Deadline', date: 'Aug 18, 2026', type: 'Assignments' },
    { title: 'Q2 Parent-Teacher Meeting (PTM)', date: 'Aug 20, 2026', type: 'PTM' },
    { title: 'Result Publication for Term 1', date: 'Aug 25, 2026', type: 'Results' }
  ];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calendar size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Calendar Integration & Upcoming Milestones
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Automatic synchronization of active circulars with the master school academic calendar.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {events.map((ev) => (
          <div key={ev.title} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#3B7E5E', textTransform: 'uppercase' }}>{ev.type}</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{ev.title}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Scheduled: {ev.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
