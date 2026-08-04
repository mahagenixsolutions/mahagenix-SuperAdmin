import React, { useState } from 'react';
import { 
  CalendarDays, Download, ChevronLeft, ChevronRight, 
  MapPin, Clock, BookOpen, Hourglass, Calendar, 
  ClipboardList, AlertTriangle, AlertCircle, Info, Sparkles, TrendingUp
} from 'lucide-react';

export default function EventsPage() {
  const [view, setView] = useState('Month');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Academic Calendar</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Plan, schedule, and track all academic activities for the current academic year.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#2563eb', color: 'white', border: 'none', 
            padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <span style={{ fontSize: '16px' }}>+</span> Create Academic Event
            <ChevronRight size={16} />
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'white', color: '#4b5563', border: '1px solid #d1d5db', 
            padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <Download size={16} /> Export Calendar
          </button>
        </div>
      </div>

      {/* KPIs Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>Academic Progress</span>
            <div style={{ background: '#ecfdf5', color: '#10b981', padding: '6px', borderRadius: '8px' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '8px 0 4px 0' }}>53%</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>of academic year completed</div>
          </div>
          {/* Mock sparkline chart */}
          <svg style={{ width: '100%', height: '30px', marginTop: '12px' }}>
            <path d="M0 25 Q10 25, 20 20 T40 22 T60 15 T80 20 T100 10 T120 15 L120 30 L0 30 Z" fill="#ecfdf5" />
            <path d="M0 25 Q10 25, 20 20 T40 22 T60 15 T80 20 T100 10 T120 15" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b82f6' }}>Working Days</span>
            <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '6px', borderRadius: '8px' }}>
              <Calendar size={16} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '8px 0 4px 0' }}>118 <span style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600 }}>/ 220</span></div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>days completed</div>
          </div>
          <div style={{ height: '30px', marginTop: '12px' }}></div>
        </div>

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#8b5cf6' }}>Teaching Days Left</span>
            <div style={{ background: '#f5f3ff', color: '#8b5cf6', padding: '6px', borderRadius: '8px' }}>
              <Hourglass size={16} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '8px 0 4px 0' }}>102</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>teaching days remaining</div>
          </div>
          <div style={{ height: '30px', marginTop: '12px' }}></div>
        </div>

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>Current Term</span>
            <div style={{ background: '#fffbeb', color: '#f59e0b', padding: '6px', borderRadius: '8px' }}>
              <BookOpen size={16} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '8px 0 4px 0' }}>Term 1</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>ends on Oct 15, 2026</div>
          </div>
          <div style={{ height: '30px', marginTop: '12px' }}></div>
        </div>

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>Upcoming Exams</span>
            <div style={{ background: '#fef2f2', color: '#ef4444', padding: '6px', borderRadius: '8px' }}>
              <ClipboardList size={16} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '8px 0 4px 0' }}>4</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>in next 30 days</div>
          </div>
          <div style={{ height: '30px', marginTop: '12px' }}></div>
        </div>
      </div>

      {/* Timeline Section */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 700, color: '#111827' }}>Academic Year Timeline</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          
          {/* Timeline Line */}
          <div style={{ position: 'absolute', top: '24px', left: '5%', right: '5%', height: '2px', background: '#e5e7eb', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '24px', left: '5%', width: '38%', height: '2px', background: '#10b981', zIndex: 1 }} />

          {/* Timeline Nodes */}
          {[
            { title: 'School Reopens', date: 'Apr 1, 2026', status: 'Completed', color: '#10b981', icon: 'M5 13l4 4L19 7' },
            { title: 'Unit Test 1', date: 'Jun 10 - 15', status: 'Completed', color: '#10b981', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
            { title: 'PTM 1', date: 'Jul 18', status: 'Completed', color: '#10b981', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { title: 'Mid-Term Exams', date: 'Aug 12 - 22', status: 'Upcoming', color: '#f59e0b', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { title: 'Term Break', date: 'Oct 20 - Nov 2', status: 'Upcoming', color: '#f59e0b', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { title: 'Final Exams', date: 'Feb 10 - 25, 2027', status: 'Upcoming', color: '#f59e0b', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
            { title: 'Result Declaration', date: 'Mar 15, 2027', status: 'Upcoming', color: '#3b82f6', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, textAlign: 'center', width: '120px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <strong style={{ fontSize: '13px', color: '#111827', margin: '0 0 4px 0', lineHeight: 1.2 }}>{item.title}</strong>
              <span style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>{item.date}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: item.color }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Calendar + Right Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        
        {/* Left Side: Calendar Component */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#111827' }}>Academic Calendar View</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Month</button>
                <button style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Week</button>
                <button style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>List</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button style={{ border: '1px solid #d1d5db', background: 'white', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}><ChevronLeft size={16} color="#6b7280" /></button>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827', width: '110px', textAlign: 'center' }}>August 2026</span>
                <button style={{ border: '1px solid #d1d5db', background: 'white', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}><ChevronRight size={16} color="#6b7280" /></button>
              </div>
              <button style={{ border: '1px solid #d1d5db', background: 'white', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', fontWeight: 600, color: '#4b5563', cursor: 'pointer' }}>Today</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#e5e7eb', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} style={{ background: 'white', padding: '12px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#6b7280' }}>
                {day}
              </div>
            ))}

            {/* Calendar grid (hardcoded for August 2026 based on mockup) */}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 6 + 1; // offset for Sun Aug 2 
              const isCurrentMonth = day > 0 && day <= 31;
              const displayDay = isCurrentMonth ? day : (day <= 0 ? 26 + i : day - 31);
              
              // Events based on image
              let events = [];
              if (isCurrentMonth) {
                if (day === 3) events = [{ title: 'Bridge Course', color: '#10b981' }];
                if (day === 5) events = [{ title: 'Lab Session', color: '#8b5cf6' }];
                if (day === 8) events = [{ title: 'Club Activity', color: '#f59e0b' }];
                if (day === 11) events = [{ title: 'Unit Test 2', color: '#ef4444' }];
                if (day === 12) events = [{ title: 'Mid-Term Start', color: '#3b82f6', isStart: true }, { title: 'Science Pract.', color: '#8b5cf6' }];
                if (day === 13) events = [{ title: 'Mid-Term', color: '#ef4444' }];
                if (day === 14) events = [{ title: 'Mid-Term', color: '#ef4444' }];
                if (day === 15) events = [{ title: 'Independence Day', color: '#3b82f6' }];
                if (day === 17) events = [{ title: 'PTM Meeting', color: '#3b82f6' }];
                if (day === 19) events = [{ title: 'Project Submiss.', color: '#8b5cf6' }];
                if (day === 21) events = [{ title: 'Debate Comp.', color: '#f59e0b' }];
                if (day === 26) events = [{ title: 'Teachers Meet', color: '#3b82f6' }];
                if (day === 28) events = [{ title: 'Sports Day Prep', color: '#10b981' }];
                if (day === 30) events = [{ title: 'Holiday', color: '#ef4444', isBlock: true }];
              }

              return (
                <div key={i} style={{ background: 'white', padding: '8px', height: '110px', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ 
                    fontSize: '13px', fontWeight: 600, color: isCurrentMonth ? '#111827' : '#9ca3af',
                    background: (isCurrentMonth && day === 12) ? '#2563eb' : 'transparent',
                    color: (isCurrentMonth && day === 12) ? 'white' : (isCurrentMonth ? '#111827' : '#9ca3af'),
                    width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {displayDay}
                  </span>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {events.map((evt, idx) => {
                      if (evt.isBlock) {
                        return <div key={idx} style={{ background: '#fef2f2', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>● {evt.title}</div>
                      }
                      return (
                        <div key={idx} style={{ fontSize: '10px', color: evt.color, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          ● {evt.title}
                        </div>
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Upcoming Academic Events */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>Upcoming Academic Events</h3>
              <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Mid-Term Examination', date: 'Aug 12 - Aug 22, 2026', time: 'In 12 days', icon: <ClipboardList size={16} />, color: '#8b5cf6', bg: '#f3e8ff' },
                { title: 'Parent Teacher Meeting 1', date: 'Aug 17, 2026 (All Grades)', time: 'In 17 days', icon: <Calendar size={16} />, color: '#3b82f6', bg: '#eff6ff' },
                { title: 'Science Practical Exams', date: 'Aug 12 - Aug 14, 2026', time: 'In 12 days', icon: <BookOpen size={16} />, color: '#10b981', bg: '#ecfdf5' },
                { title: 'Project Submission (Grade 9-10)', date: 'Aug 19, 2026', time: 'In 19 days', icon: <ClipboardList size={16} />, color: '#ef4444', bg: '#fef2f2' },
                { title: 'Independence Day', date: 'Aug 15, 2026', time: 'In 15 days', icon: <Calendar size={16} />, color: '#3b82f6', bg: '#eff6ff' },
              ].map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: ev.bg, color: ev.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {ev.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{ev.date}</div>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#3b82f6', background: '#eff6ff', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                    {ev.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Deadlines */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>Academic Deadlines</h3>
              <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'Question Paper Submission', sub: 'All Subjects', date: 'Aug 8' },
                { title: 'Lesson Plan Approval Deadline', sub: 'Week 6 - Term 1', date: 'Aug 9' },
                { title: 'Internal Marks Submission', sub: 'Unit Test 2', date: 'Aug 16' },
                { title: 'Syllabus Completion Target', sub: 'Term 1', date: 'Sep 30' },
                { title: 'Project Evaluation Deadline', sub: 'Grade 9-10', date: 'Sep 5' },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 4 ? 'none' : '1px solid #f3f4f6', paddingBottom: i === 4 ? 0 : '10px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{d.title}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{d.sub}</div>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#ef4444', border: '1px solid #fecaca', background: '#fff5f5', padding: '2px 6px', borderRadius: '4px' }}>
                    {d.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        
        {/* Syllabus Progress */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>Syllabus Progress by Grade</h3>
            <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View Details</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { grade: 'Grade 6', val: 86, color: '#10b981' },
              { grade: 'Grade 7', val: 78, color: '#10b981' },
              { grade: 'Grade 8', val: 65, color: '#f59e0b' },
              { grade: 'Grade 9', val: 52, color: '#ef4444' },
              { grade: 'Grade 10', val: 72, color: '#10b981' },
              { grade: 'Grade 11', val: 68, color: '#f59e0b' },
              { grade: 'Grade 12', val: 60, color: '#f59e0b' },
            ].map(g => (
              <div key={g.grade} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', width: '50px' }}>{g.grade}</span>
                <div style={{ flex: 1, background: '#f3f4f6', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${g.val}%`, background: g.color, height: '100%' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827', width: '30px', textAlign: 'right' }}>{g.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Plan Approval */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>Lesson Plan Approval</h3>
            <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View All</a>
          </div>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '24px' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                {/* Background Ring */}
                <path className="circle" stroke="#f3f4f6" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Approved 60% */}
                <path className="circle" stroke="#10b981" strokeWidth="4" strokeDasharray="60, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Pending 28% */}
                <path className="circle" stroke="#f59e0b" strokeWidth="4" strokeDasharray="28, 100" strokeDashoffset="-60" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Rejected 7% */}
                <path className="circle" stroke="#ef4444" strokeWidth="4" strokeDasharray="7, 100" strokeDashoffset="-88" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Needs Revision 5% */}
                <path className="circle" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="5, 100" strokeDashoffset="-95" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: '20px', color: '#111827', fontWeight: 800 }}>112</span>
              </div>
            </div>
            
            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {[
                { label: 'Pending', val: 32, pct: '28.6%', color: '#f59e0b' },
                { label: 'Approved', val: 68, pct: '60.7%', color: '#10b981' },
                { label: 'Rejected', val: 8, pct: '7.1%', color: '#ef4444' },
                { label: 'Needs Revision', val: 4, pct: '3.6%', color: '#8b5cf6' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>
                    {item.val} <span style={{ color: '#9ca3af', fontWeight: 500 }}>({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>Go to Lesson Plans →</a>
          </div>
        </div>

        {/* Academic Alerts */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>Academic Alerts</h3>
            <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View All</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { text: 'Grade 8 Science syllabus is 18% behind schedule.', link: 'Action required', icon: <AlertTriangle size={16} />, color: '#ef4444', bg: '#fef2f2' },
              { text: '3 teacher allocations are pending for next week.', link: 'Needs attention', icon: <Info size={16} />, color: '#f59e0b', bg: '#fffbeb' },
              { text: 'Timetable conflict detected in Grade 6 on Aug 14.', link: 'View conflicts', icon: <AlertCircle size={16} />, color: '#f59e0b', bg: '#fffbeb' },
              { text: '5 lesson plans are overdue for approval.', link: 'Review now', icon: <ClipboardList size={16} />, color: '#3b82f6', bg: '#eff6ff' },
            ].map((alert, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: alert.bg, color: alert.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {alert.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{alert.text}</div>
                  <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: alert.color, textDecoration: 'none' }}>{alert.link}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={18} color="#6366f1" />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1e1b4b' }}>AI Academic Insights</h3>
          <span style={{ background: '#e0e7ff', color: '#4f46e5', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>Beta</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
            <div style={{ color: '#10b981' }}><Clock size={18} /></div>
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#4b5563', lineHeight: 1.4 }}>Grade 9 Mathematics may miss the syllabus completion by 12 days based on current pace.</p>
              <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View details →</a>
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
            <div style={{ color: '#3b82f6' }}><Info size={18} /></div>
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#4b5563', lineHeight: 1.4 }}>Science department workload is 18% higher compared to other departments.</p>
              <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View analysis →</a>
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
            <div style={{ color: '#f59e0b' }}><Calendar size={18} /></div>
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#4b5563', lineHeight: 1.4 }}>Recommend scheduling practical exams before Aug 18 to avoid timetable conflicts.</p>
              <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View suggestion →</a>
            </div>
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
            <div style={{ color: '#10b981' }}><TrendingUp size={18} /></div>
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#4b5563', lineHeight: 1.4 }}>Grade 10 students' performance trend shows improvement in all subjects.</p>
              <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>View report →</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
