import React, { useState } from 'react';
import { 
  Download, ChevronLeft, ChevronRight, 
  BookOpen, Hourglass, Calendar as CalendarIcon, 
  ClipboardList, TrendingUp, Plus, Filter,
  Clock, MapPin, CheckCircle, AlertCircle, Bell,
  Sparkles, RefreshCw, Layers, ShieldCheck, Share2,
  Users, ChevronDown, CheckCircle2, AlertTriangle, Eye, X,
  FileText, Flag, Award, GraduationCap, Atom, Trophy,
  Palmtree, MessageSquare, Compass, Check
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  dayName: string;
  dayNum: string;
  title: string;
  titleColor: string;
  dotColor: string;
  category: 'Academics' | 'Activities' | 'Exams' | 'Holidays' | 'Meetings';
  iconType: 'academics-cap' | 'academics-atom' | 'activities' | 'exams' | 'holidays' | 'meetings';
  time?: string;
  location?: string;
  target?: string;
}

export default function EventsPage() {
  const [view, setView] = useState<'Month' | 'Week' | 'Day' | 'Agenda'>('Month');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventModal, setSelectedEventModal] = useState<CalendarEvent | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  // KPI Data
  const kpiCards = [
    {
      label: 'Academic Progress',
      value: '53%',
      bottomLabel: '↑ 12 weeks left',
      bottomColor: '#10b981',
      icon: <TrendingUp size={18} color="#10b981" />,
      iconBg: '#ecfdf5',
    },
    {
      label: 'Working Days',
      value: '118 / 220',
      badge: '53% Done',
      badgeBg: '#eff6ff',
      badgeColor: '#2563eb',
      badgeBorder: '#bfdbfe',
      icon: <CalendarIcon size={18} color="#3b82f6" />,
      iconBg: '#eff6ff',
    },
    {
      label: 'Teaching Days Left',
      value: '102',
      badge: '42 Periods',
      badgeBg: '#f5f3ff',
      badgeColor: '#7c3aed',
      badgeBorder: '#ddd6fe',
      icon: <Hourglass size={18} color="#8b5cf6" />,
      iconBg: '#f5f3ff',
    },
    {
      label: 'Current Term',
      value: 'Term 1',
      badge: 'Ends Oct 15',
      badgeBg: '#fffbeb',
      badgeColor: '#d97706',
      badgeBorder: '#fde68a',
      icon: <BookOpen size={18} color="#f59e0b" />,
      iconBg: '#fffbeb',
    },
    {
      label: 'Upcoming Events',
      value: '4',
      badge: 'Next 30 Days',
      badgeBg: '#fef2f2',
      badgeColor: '#dc2626',
      badgeBorder: '#fecaca',
      icon: <ClipboardList size={18} color="#ef4444" />,
      iconBg: '#fef2f2',
    },
  ];

  // Full 15 Calendar Events matching the screenshot exactly
  const allEvents: CalendarEvent[] = [
    {
      id: 'e1',
      dayName: 'Thu',
      dayNum: '01',
      title: 'Bridge Course Orientation',
      titleColor: '#059669',
      dotColor: '#059669',
      category: 'Academics',
      iconType: 'academics-cap',
      location: 'Main Auditorium',
      target: 'Grade 9 & 10'
    },
    {
      id: 'e2',
      dayName: 'Sat',
      dayNum: '03',
      title: 'Science Lab Practical Session',
      titleColor: '#8b5cf6',
      dotColor: '#8b5cf6',
      category: 'Academics',
      iconType: 'academics-atom',
      location: 'Physics Lab B',
      target: 'Grade 11-A'
    },
    {
      id: 'e3',
      dayName: 'Mon',
      dayNum: '05',
      title: 'Robotics & STEM Club Meet',
      titleColor: '#d97706',
      dotColor: '#f59e0b',
      category: 'Activities',
      iconType: 'activities',
      time: '02:00 PM',
      location: 'Innovation Hub',
      target: 'Club Members'
    },
    {
      id: 'e4',
      dayName: 'Wed',
      dayNum: '07',
      title: 'Unit Test 1 (Mathematics)',
      titleColor: '#ef4444',
      dotColor: '#ef4444',
      category: 'Exams',
      iconType: 'exams',
      location: 'Classrooms 1-8',
      target: 'Grades 6-10'
    },
    {
      id: 'e5',
      dayName: 'Fri',
      dayNum: '09',
      title: 'Mid-term examinations start',
      titleColor: '#2563eb',
      dotColor: '#3b82f6',
      category: 'Exams',
      iconType: 'exams',
      location: 'All Exam Halls',
      target: 'Grades 9-12'
    },
    {
      id: 'e6',
      dayName: 'Sat',
      dayNum: '10',
      title: 'Practical Viva session',
      titleColor: '#8b5cf6',
      dotColor: '#8b5cf6',
      category: 'Exams',
      iconType: 'exams',
      location: 'Chemistry Lab',
      target: 'Grade 12'
    },
    {
      id: 'e7',
      dayName: 'Mon',
      dayNum: '12',
      title: 'Mid-term Exam (Day 1)',
      titleColor: '#ef4444',
      dotColor: '#ef4444',
      category: 'Exams',
      iconType: 'exams',
      location: 'All Exam Halls',
      target: 'Grades 9-12'
    },
    {
      id: 'e8',
      dayName: 'Tue',
      dayNum: '13',
      title: 'Mid-term Exam (Day 2)',
      titleColor: '#ef4444',
      dotColor: '#ef4444',
      category: 'Exams',
      iconType: 'exams',
      location: 'All Exam Halls',
      target: 'Grades 9-12'
    },
    {
      id: 'e9',
      dayName: 'Wed',
      dayNum: '14',
      title: 'Mid-term Exam (Day 3)',
      titleColor: '#ef4444',
      dotColor: '#ef4444',
      category: 'Exams',
      iconType: 'exams',
      location: 'All Exam Halls',
      target: 'Grades 9-12'
    },
    {
      id: 'e10',
      dayName: 'Fri',
      dayNum: '16',
      title: 'Independence Day Celebrations',
      titleColor: '#2563eb',
      dotColor: '#3b82f6',
      category: 'Holidays',
      iconType: 'holidays',
      location: 'School Grounds',
      target: 'All Students & Staff'
    },
    {
      id: 'e11',
      dayName: 'Mon',
      dayNum: '19',
      title: 'Parent Teacher Meeting 1',
      titleColor: '#4f46e5',
      dotColor: '#6366f1',
      category: 'Meetings',
      iconType: 'meetings',
      time: '10:00 AM',
      location: 'Respective Classrooms',
      target: 'All Parents'
    },
    {
      id: 'e12',
      dayName: 'Wed',
      dayNum: '21',
      title: 'Grade 1 to Project Submission',
      titleColor: '#8b5cf6',
      dotColor: '#8b5cf6',
      category: 'Academics',
      iconType: 'academics-cap',
      location: 'Academic Office',
      target: 'Grades 9 & 10'
    },
    {
      id: 'e13',
      dayName: 'Fri',
      dayNum: '23',
      title: 'Inter-School Debate Championship',
      titleColor: '#d97706',
      dotColor: '#f59e0b',
      category: 'Activities',
      iconType: 'activities',
      location: 'Auditorium 2',
      target: 'Senior Wing'
    },
    {
      id: 'e14',
      dayName: 'Tue',
      dayNum: '27',
      title: 'Curriculum & HOD Review Meet',
      titleColor: '#0d9488',
      dotColor: '#0d9488',
      category: 'Meetings',
      iconType: 'meetings',
      time: '11:00 AM',
      location: 'Conference Hall',
      target: 'All Department Heads'
    },
    {
      id: 'e15',
      dayName: 'Thu',
      dayNum: '29',
      title: 'Annual Sports Day Prelims',
      titleColor: '#059669',
      dotColor: '#10b981',
      category: 'Activities',
      iconType: 'activities',
      location: 'Athletic Track',
      target: 'All Houses'
    },
  ];

  const categories = ['All', 'Exams', 'Holidays', 'Meetings', 'Activities', 'Academics'];

  const filteredEvents = selectedCategory === 'All' 
    ? allEvents 
    : allEvents.filter(e => e.category === selectedCategory);

  const renderCategoryTag = (iconType: string, category: string) => {
    let icon = <GraduationCap size={13} color="#64748b" />;
    if (iconType === 'academics-atom') icon = <Atom size={13} color="#64748b" />;
    if (iconType === 'activities') icon = <Trophy size={13} color="#64748b" />;
    if (iconType === 'exams') icon = <FileText size={13} color="#64748b" />;
    if (iconType === 'holidays') icon = <Palmtree size={13} color="#64748b" />;
    if (iconType === 'meetings') icon = <Users size={13} color="#64748b" />;

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#64748b',
        fontWeight: 500,
      }}>
        {icon}
        {category}
      </span>
    );
  };

  // Timeline 7 Milestones Data
  const timelineMilestones = [
    { title: 'School Reopens', date: 'Apr 1, 2026', status: 'Completed', completed: true, color: '#10b981' },
    { title: 'Unit Test 1', date: 'Jun 10 - 15', status: 'Completed', completed: true, color: '#10b981' },
    { title: 'PTM 1', date: 'Jul 1, 2026', status: 'Completed', completed: true, color: '#10b981' },
    { title: 'Mid-Term Exams', date: 'Aug 5 - 9', status: 'Upcoming', completed: false, color: '#f59e0b' },
    { title: 'Term Break', date: 'Oct 20 - Nov 2', status: 'Upcoming', completed: false, color: '#3b82f6' },
    { title: 'Final Exams', date: 'Feb 12 - 25', status: 'Upcoming', completed: false, color: '#f59e0b' },
    { title: 'Result Day', date: 'Mar 5, 2027', status: 'Upcoming', completed: false, color: '#3b82f6' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '100%',
      maxWidth: '100%',
      padding: '4px 0 60px 0',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box'
    }}>

      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS & PAGE HEADER
         ───────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {/* Breadcrumb row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
          <span>EduTrack AI</span>
          <span>/</span>
          <span>Academic Operations</span>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Academic Calendar</span>
        </div>

        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 800,
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CalendarIcon size={24} color="#6366f1" />
              Academic Calendar
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              Plan, schedule, and track all academic activities for the current academic year.
            </p>
          </div>

          {/* Action buttons on right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
            }}>
              <Plus size={16} />
              Create Event
            </button>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffffff',
              color: '#334155',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              <Download size={15} />
              Export
            </button>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffffff',
              color: '#334155',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              <RefreshCw size={14} />
              Sync
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. KPI CARDS ROW (5 CARDS)
         ───────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '16px',
        width: '100%'
      }}>
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '110px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                {card.label}
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {card.icon}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                {card.value}
              </span>
              {card.bottomLabel && (
                <span style={{ fontSize: '11px', fontWeight: 600, color: card.bottomColor }}>
                  {card.bottomLabel}
                </span>
              )}
              {card.badge && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: card.badgeColor,
                  background: card.badgeBg,
                  border: `1px solid ${card.badgeBorder}`,
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ACADEMIC CALENDAR VIEW (MAIN LIST CARD)
         ───────────────────────────────────────────────────────────── */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '22px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        {/* Card Header & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 800,
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CalendarIcon size={18} color="#6366f1" />
              Academic Calendar View
            </h2>
            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              August 2026 • Term 1 • 2 Working Days
            </p>
          </div>

          <button style={{
            background: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Download size={15} />
          </button>
        </div>

        {/* View Switcher & Month Navigator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* View tabs */}
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '2px' }}>
            {(['Month', 'Week', 'Day', 'Agenda'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: view === v ? '#4f46e5' : 'transparent',
                  color: view === v ? '#ffffff' : '#64748b',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Month selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '5px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ChevronLeft size={14} color="#475569" />
            </button>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', minWidth: '90px', textAlign: 'center' }}>
              {selectedMonth}
            </span>
            <button style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '5px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ChevronRight size={14} color="#475569" />
            </button>
          </div>

          <button style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#334155',
            cursor: 'pointer'
          }}>
            Today
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <Filter size={13} />
            Filter:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#0f172a' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : '#64748b',
                border: `1px solid ${selectedCategory === cat ? '#0f172a' : '#e2e8f0'}`,
                borderRadius: '16px',
                padding: '3px 12px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Rows List */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }}>
          {filteredEvents.map((evt, idx) => (
            <div
              key={evt.id}
              onClick={() => setSelectedEventModal(evt)}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 24px 1fr 120px 80px',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 6px',
                borderBottom: idx < filteredEvents.length - 1 ? '1px solid #f8fafc' : 'none',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Date Box */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'capitalize', lineHeight: 1 }}>
                  {evt.dayName}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                  {evt.dayNum}
                </div>
              </div>

              {/* Dot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: evt.dotColor
                }} />
              </div>

              {/* Title */}
              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: evt.titleColor,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {evt.title}
              </div>

              {/* Category Tag */}
              <div>
                {renderCategoryTag(evt.iconType, evt.category)}
              </div>

              {/* Time */}
              <div style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: 500,
                textAlign: 'right'
              }}>
                {evt.time || ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. THREE-COLUMN ROW (Today's Schedule | Exam Countdown | Academic Deadlines)
         ───────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%'
      }}>
        {/* Today's Schedule */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Today's Schedule
            </h3>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#059669',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              Active Day
            </span>
          </div>

          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6366f1', margin: '-4px 0 2px 0' }}>
            Wednesday, Aug 12
          </div>

          {/* Schedule List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Item 1 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#4f46e5',
                  background: '#e0e7ff',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap'
                }}>
                  08:30 AM
                </span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>English</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Mid-Term Examinations Start</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap' }}>Hall A</span>
            </div>

            {/* Item 2 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#059669',
                background: '#ecfdf5',
                padding: '4px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                11:15 AM
              </span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Science Practical Viva</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Physics Lab</div>
              </div>
            </div>

            {/* Item 3 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#2563eb',
                background: '#eff6ff',
                padding: '4px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                02:00 PM
              </span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Teacher Navigation Huddle</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Conference Room</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Countdown */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
            Exam Countdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Item 1 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Mid-Term Exam</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>Sep 1 – Sep 9</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#dc2626',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '3px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                Starts in 20 days
              </span>
            </div>

            {/* Item 2 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Practical Viva</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>Sep 16</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#d97706',
                background: '#fffbeb',
                border: '1px solid #fde68a',
                padding: '3px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                In 26 days
              </span>
            </div>

            {/* Item 3 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Unit Test 2</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>Sep 28</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#2563eb',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '3px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                In 38 days
              </span>
            </div>
          </div>
        </div>

        {/* Academic Deadlines */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
            Academic Deadlines
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Item 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #ef4444',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 800,
                flexShrink: 0,
                marginTop: '1px'
              }}>
                !
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                  Question Paper Submission
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Term 1 • Aug 10 • <span style={{ color: '#ef4444', fontWeight: 600 }}>Pending Approval</span>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #f59e0b',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Clock size={12} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                  Term 1 Attendance Lock
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Due: Aug 20 • <span style={{ color: '#059669', fontWeight: 600 }}>Schedule</span>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #10b981',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Check size={13} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                  Syllabus Progress Audit
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Due: Aug 31 • <span style={{ color: '#059669', fontWeight: 600 }}>Audit Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. TWO-COLUMN ROW (Left: Monthly Progress + Holidays | Right: Academic Year Timeline)
         ───────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
        gap: '20px',
        width: '100%',
        alignItems: 'start'
      }}>
        {/* Left Column: Stacked Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Monthly Progress Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Monthly Progress
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Progress 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>Overall % Curriculum</span>
                  <span style={{ fontWeight: 800 }}>78%</span>
                </div>
                <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', background: '#10b981', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Progress 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>Grade 11 Curriculum</span>
                  <span style={{ fontWeight: 800 }}>78%</span>
                </div>
                <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', background: '#059669', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Progress 3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>Grade 10 Curriculum</span>
                  <span style={{ fontWeight: 800 }}>73%</span>
                </div>
                <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '73%', height: '100%', background: '#3b82f6', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Progress 4 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  <span>Grade 12 Curriculum</span>
                  <span style={{ fontWeight: 800 }}>64%</span>
                </div>
                <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '64%', height: '100%', background: '#6366f1', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Holidays Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                Upcoming Holidays
              </h3>
              <a href="#view-all" style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                View All
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Holiday 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '1.5px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Flag size={14} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Independence Day</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Aug 15, 2026</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '10px' }}>
                  National Holiday
                </span>
              </div>

              {/* Holiday 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '1.5px solid #f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Award size={14} color="#f59e0b" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Janmashtami</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Aug 26, 2026</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '10px' }}>
                  Restricted Holiday
                </span>
              </div>

              {/* Holiday 3 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '1.5px solid #059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CalendarIcon size={14} color="#059669" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Gandhi Jayanti</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Oct 02, 2026</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '10px' }}>
                  National Holiday
                </span>
              </div>

              {/* Holiday 4 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '1.5px solid #ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={14} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Diwali Break</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Oct 18 – Oct 22</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '10px' }}>
                  Festival Break
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Year Timeline Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px 22px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Academic Year Timeline
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              Key milestones for Academic Year 2026-2027
            </p>
          </div>

          {/* Stepper (7 Milestones) */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '10px 0',
            overflowX: 'auto'
          }}>
            {/* Connecting background line */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '4%',
              right: '4%',
              height: '2px',
              background: '#e2e8f0',
              zIndex: 0
            }} />
            {/* Completed active line */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '4%',
              width: '32%',
              height: '2px',
              background: '#10b981',
              zIndex: 1
            }} />

            {timelineMilestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 2,
                  minWidth: '60px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: m.completed ? '#10b981' : '#ffffff',
                  border: `2px solid ${m.color}`,
                  color: m.completed ? '#ffffff' : m.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                }}>
                  {m.completed ? <Check size={14} /> : <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.color }} />}
                </div>

                <span style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>
                  {m.title}
                </span>
                <span style={{ fontSize: '9px', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {m.date}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: m.completed ? '#10b981' : '#6366f1', marginTop: '1px' }}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>

          {/* Detailed Milestone List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            {timelineMilestones.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `1.5px solid ${item.color}`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.completed ? <Check size={12} /> : <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.color }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.date}</div>
                  </div>
                </div>

                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: item.completed ? '#059669' : '#2563eb',
                  background: item.completed ? '#ecfdf5' : '#eff6ff',
                  border: `1px solid ${item.completed ? '#a7f3d0' : '#bfdbfe'}`,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap'
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM THREE-COLUMN ROW (Submission Deadlines | Upcoming Meetings | Export & Reports)
         ───────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%'
      }}>
        {/* Submission Deadlines */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Submission Deadlines
            </h3>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444' }}>
              High Priority
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Item 1 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Mid-Term Papers Draft</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>HODs & Subject Leads</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#dc2626',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '3px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                Due Aug 12
              </span>
            </div>

            {/* Item 2 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Internal Marks Entry</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>All Subject Teachers</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#dc2626',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '3px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                Due Aug 16
              </span>
            </div>

            {/* Item 3 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Term 1 Audit Compliance</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>Academic Committee</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#dc2626',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '3px 8px',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}>
                Due Aug 21
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Upcoming Meetings
            </h3>
            <a href="#view-all" style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
              View All
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Meeting 1 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CalendarIcon size={14} color="#059669" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Academic Council Meet</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Aug 16, 2026 • 10:00 AM</div>
                </div>
              </div>
              <span style={{ fontSize: '10px', color: '#64748b', background: '#ffffff', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                Conference Room
              </span>
            </div>

            {/* Meeting 2 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={14} color="#2563eb" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Faculty Alignment Meet</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Aug 19, 2026 • 11:30 AM</div>
                </div>
              </div>
              <span style={{ fontSize: '10px', color: '#64748b', background: '#ffffff', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                Seminar Hall
              </span>
            </div>

            {/* Meeting 3 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={14} color="#2563eb" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Department HOD Meet</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Aug 23, 2026 • 03:00 PM</div>
                </div>
              </div>
              <span style={{ fontSize: '10px', color: '#64748b', background: '#ffffff', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                Conference Room
              </span>
            </div>
          </div>
        </div>

        {/* Export & Reports */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Export & Reports
            </h3>
            <a href="#view-all" style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
              View All
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Report 1 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Download size={15} color="#2563eb" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Download Annual PDF Calendar</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Academic Year 2026-2027</div>
                </div>
              </div>
              <Download size={14} color="#94a3b8" />
            </div>

            {/* Report 2 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Share2 size={15} color="#2563eb" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Export iCal / ICS Feed</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Sync with calendar apps</div>
                </div>
              </div>
              <Download size={14} color="#94a3b8" />
            </div>

            {/* Report 3 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={15} color="#2563eb" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Generate Academic Report</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Custom report & analytics</div>
                </div>
              </div>
              <Download size={14} color="#94a3b8" />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. FLOATING ACTION BUTTON (AI Sparkle)
         ───────────────────────────────────────────────────────────── */}
      <button style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: '#6366f1',
        color: '#ffffff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
        cursor: 'pointer',
        zIndex: 100,
        transition: 'transform 0.2s'
      }}>
        <Sparkles size={20} />
      </button>

      {/* ─────────────────────────────────────────────────────────────
          EVENT DETAIL MODAL
         ───────────────────────────────────────────────────────────── */}
      {selectedEventModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={() => setSelectedEventModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                border: 'none',
                background: '#f1f5f9',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} color="#64748b" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: selectedEventModal.dotColor,
                background: '#f8fafc',
                border: `1px solid ${selectedEventModal.dotColor}40`,
                padding: '3px 10px',
                borderRadius: '6px'
              }}>
                {selectedEventModal.category}
              </span>
            </div>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              {selectedEventModal.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              {selectedEventModal.time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                  <Clock size={14} color="#64748b" />
                  <strong>Time:</strong> {selectedEventModal.time}
                </div>
              )}
              {selectedEventModal.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                  <MapPin size={14} color="#64748b" />
                  <strong>Location:</strong> {selectedEventModal.location}
                </div>
              )}
              {selectedEventModal.target && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                  <Users size={14} color="#64748b" />
                  <strong>Audience:</strong> {selectedEventModal.target}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedEventModal(null)}
                style={{
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => setSelectedEventModal(null)}
                style={{
                  background: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
