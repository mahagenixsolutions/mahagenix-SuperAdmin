import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ScheduledExam } from '../types';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  PlayCircle, 
  AlertCircle, 
  Ticket, 
  ExternalLink 
} from 'lucide-react';

interface ExamScheduleCalendarProps {
  schedule: ScheduledExam[];
  onGenerateAdmitCard: (exam: ScheduledExam) => void;
}

export const ExamScheduleCalendar: React.FC<ExamScheduleCalendarProps> = ({
  schedule,
  onGenerateAdmitCard
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Live' | 'Scheduled' | 'Completed'>('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchedule = schedule.filter(item => {
    const matchesTab = activeTab === 'All' || item.status === activeTab;
    const matchesGrade = selectedGrade === 'All' || item.grade === selectedGrade;
    const matchesSearch = item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.chiefInvigilator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesGrade && matchesSearch;
  });

  const getStatusBadge = (status: ScheduledExam['status']) => {
    switch (status) {
      case 'Live':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', icon: <PlayCircle size={12} /> };
      case 'Scheduled':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A', icon: <Clock size={12} /> };
      case 'Completed':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE', icon: <CheckCircle2 size={12} /> };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1', icon: <Clock size={12} /> };
    }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9'
      }}>
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
              Master Examination Timetable & Calendar
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Institutional schedule matrix filterable by grade, section, exam category, and hall room allocation.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search exam, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px 7px 32px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="All">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          {/* Status Tabs */}
          <div style={{ display: 'flex', background: '#F8FAFC', padding: '3px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            {(['All', 'Live', 'Scheduled', 'Completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === tab ? '#3B7E5E' : 'transparent',
                  color: activeTab === tab ? 'white' : '#64748B'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Table / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSchedule.map((item, index) => {
          const badge = getStatusBadge(item.status);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              {/* Date Block & Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  background: '#EAF5F0',
                  color: '#3B7E5E',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  textAlign: 'center',
                  minWidth: '85px'
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Date</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, marginTop: '2px' }}>{item.date}</div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#E2E8F0', color: '#334155', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.grade}-{item.section}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Subject: <strong>{item.subject}</strong> • Invigilator: <strong>{item.chiefInvigilator}</strong>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span><Clock size={11} /> {item.timeSlot} ({item.duration})</span>
                    <span>• Hall: {item.hallRoom}</span>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  background: badge.bg,
                  color: badge.color,
                  border: `1px solid ${badge.border}`,
                  padding: '4px 10px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {badge.icon} {item.status}
                </span>

                <button
                  onClick={() => onGenerateAdmitCard(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'white',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  <Ticket size={13} color="#8B5CF6" /> Admit Card
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
