import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight, Play } from 'lucide-react';

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  status: string;
}

interface HomeworkItem {
  task: string;
  subject: string;
  due: string;
  status: string;
}

interface Props {
  schedule: ScheduleItem[];
  homework: HomeworkItem[];
}

export default function ScheduleAndHomework({ schedule, homework }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {/* Today's Schedule Card */}
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
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Today's Schedule
          </h3>
          <button
            onClick={() => alert('Navigating to full timetable...')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '12px', fontWeight: 600, border: 'none', background: 'rgba(79, 70, 229, 0.08)', color: '#4F46E5', padding: '6px 12px', borderRadius: '8px' }}
          >
            View Timetable
          </button>
        </div>

        {/* Content - Timeline list */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          {schedule.map((item, idx) => {
            const isCompleted = item.status === 'Completed';
            const isInProgress = item.status === 'In Progress';
            const isUpcoming = item.status === 'Upcoming';

            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
                {/* Time Indicator */}
                <div style={{ fontSize: '13px', fontWeight: 700, color: isCompleted ? 'var(--text-secondary)' : isInProgress ? '#F59E0B' : 'var(--text-muted)', width: '70px', whiteSpace: 'nowrap' }}>
                  {item.time}
                </div>

                {/* Vertical Connector Line */}
                {idx < schedule.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: '81px',
                    top: '20px',
                    bottom: '-25px',
                    width: '2px',
                    background: 'var(--border-subtle)',
                    zIndex: 1,
                  }} />
                )}

                {/* Timeline Node Badge */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : isInProgress ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-tertiary)',
                  color: isCompleted ? '#22C55E' : isInProgress ? '#F59E0B' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  flexShrink: 0,
                }}>
                  {isCompleted ? <CheckCircle2 size={14} /> : isInProgress ? <Play size={12} fill="#F59E0B" /> : <Clock size={12} />}
                </div>

                {/* Subject and Teacher details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.subject}</span>
                    {/* Status Pill */}
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : isInProgress ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-tertiary)',
                      color: isCompleted ? '#22C55E' : isInProgress ? '#F59E0B' : 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.teacher}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary Info */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-raised)',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          fontWeight: 600,
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ color: '#22C55E' }}>2 Completed</span>
            <span style={{ color: '#F59E0B' }}>1 In Progress</span>
            <span style={{ color: 'var(--text-muted)' }}>1 Upcoming</span>
          </div>
          <div>Total Classes Today: 4</div>
        </div>
      </div>

      {/* Homework Tracker Card */}
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
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Homework Tracker
          </h3>
          <button
            onClick={() => alert('Navigating to homework reports...')}
            style={{ fontSize: '13px', fontWeight: 600, background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
          >
            View All (5) <ArrowRight size={14} />
          </button>
        </div>

        {/* List items */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {homework.map((item, idx) => {
            const isSubmitted = item.status === 'Submitted';
            const isOverdue = item.status === 'Overdue';
            const isPending = item.status === 'Pending';

            return (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: idx < homework.length - 1 ? '16px' : '0',
                borderBottom: idx < homework.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.task}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.subject} • Due: {item.due}
                  </div>
                </div>

                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: isSubmitted ? 'rgba(34, 197, 94, 0.1)' : isOverdue ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: isSubmitted ? '#22C55E' : isOverdue ? '#EF4444' : '#F59E0B',
                }}>
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer Homework Calendar Link */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
        }}>
          <button
            onClick={() => alert('Loading Homework Calendar view...')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              margin: '0 auto',
            }}
          >
            <Calendar size={15} style={{ color: '#4F46E5' }} /> View Homework Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
