import React from 'react';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import type { TeacherSummary } from '../services/principalDashboard.service';

interface EventItem {
  date: string;
  month: string;
  title: string;
  time: string;
  category: string;
}

interface Props {
  teachers: TeacherSummary[];
  events: EventItem[];
}

export default function TeachersAndEvents({ teachers, events }: Props) {
  // Sort teachers by rating descending and limit to top 4
  const topTeachers = [...teachers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Ratings completion bar percentages corresponding to rankings (95%, 92%, 91%, 88%)
  const scores = [95, 92, 91, 88];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {/* Top Performing Teachers Column */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#3b82f6', borderRadius: '2px' }} />
            Top Performing Teachers
          </h3>
          <button
            onClick={() => alert('Opening teachers log...')}
            style={{ fontSize: '12px', fontWeight: 600, background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer' }}
          >
            View All ›
          </button>
        </div>

        {/* Teachers ratings progress */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {topTeachers.map((teacher, idx) => (
            <div key={teacher.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Initials avatar circle */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px',
                flexShrink: 0,
              }}>
                {teacher.name.split(' ').pop()?.[0] || 'T'}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{teacher.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>{teacher.subject}</span>
                  </div>
                  
                  {/* Rating value with star icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
                    <span>{teacher.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Performance score progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                  <div style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: 'var(--bg-tertiary)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${scores[idx] ?? 90}%`,
                      height: '100%',
                      borderRadius: '3px',
                      background: '#10B981',
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#10B981', width: '32px', textAlign: 'right' }}>
                    {scores[idx] ?? 90}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Column */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#3b82f6', borderRadius: '2px' }} />
            Upcoming Events
          </h3>
          <button
            onClick={() => alert('Navigating to school calendar...')}
            style={{ fontSize: '12px', fontWeight: 600, background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer' }}
          >
            View Calendar ›
          </button>
        </div>

        {/* Events log list */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {events.map((event, idx) => {
            const isMeeting = event.category === 'Meeting';
            const isEvent = event.category === 'Event';
            const isExam = event.category === 'Exam';

            return (
              <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {/* Styled Date Block */}
                <div style={{
                  width: '44px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', lineHeight: 1 }}>
                    {event.month}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginTop: '2px' }}>
                    {event.date}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{event.title}</span>
                    {/* Event category classification pill */}
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: isMeeting
                        ? 'rgba(59, 130, 246, 0.1)'
                        : isEvent
                          ? 'rgba(139, 92, 246, 0.1)'
                          : isExam
                            ? 'rgba(239, 68, 68, 0.1)'
                            : 'rgba(245, 158, 11, 0.1)',
                      color: isMeeting
                        ? '#3b82f6'
                        : isEvent
                          ? '#8B5CF6'
                          : isExam
                            ? '#EF4444'
                            : '#F59E0B',
                    }}>
                      {event.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {event.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
