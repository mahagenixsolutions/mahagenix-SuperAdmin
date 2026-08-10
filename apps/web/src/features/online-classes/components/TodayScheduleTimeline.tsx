import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ScheduledClass } from '../types';
import { 
  Clock, 
  Calendar, 
  Video, 
  CheckCircle2, 
  PlayCircle, 
  AlertCircle, 
  ExternalLink, 
  Filter,
  Layers
} from 'lucide-react';

interface TodayScheduleTimelineProps {
  schedule: ScheduledClass[];
  onClassClick: (item: ScheduledClass) => void;
}

export const TodayScheduleTimeline: React.FC<TodayScheduleTimelineProps> = ({
  schedule,
  onClassClick
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Live' | 'Upcoming' | 'Completed'>('All');

  const filteredSchedule = schedule.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const getStatusBadge = (status: ScheduledClass['status']) => {
    switch (status) {
      case 'Live':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', icon: <PlayCircle size={13} /> };
      case 'Completed':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE', icon: <CheckCircle2 size={13} /> };
      case 'Upcoming':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A', icon: <Clock size={13} /> };
      case 'Rescheduled':
        return { bg: '#F3E8FF', color: '#6B21A8', border: '#DDD6FE', icon: <AlertCircle size={13} /> };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1', icon: <Clock size={13} /> };
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
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
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
              Today's Online Schedule
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Master timeline of all online lectures, practicals, and special revision classes today.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', background: '#F8FAFC', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          {(['All', 'Live', 'Upcoming', 'Completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeTab === tab ? '#3B7E5E' : 'transparent',
                color: activeTab === tab ? 'white' : '#64748B',
                transition: 'all 0.15s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline View */}
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        
        {/* Timeline Central Vertical Axis Line */}
        <div style={{
          position: 'absolute',
          left: '10px',
          top: '10px',
          bottom: '10px',
          width: '2px',
          background: 'linear-gradient(180deg, #5FAF88 0%, #E2E8F0 100%)'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredSchedule.map((item, index) => {
            const badge = getStatusBadge(item.status);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                onClick={() => onClassClick(item)}
                style={{
                  position: 'relative',
                  background: item.status === 'Live' ? '#F4F9F6' : '#F8FAFC',
                  border: item.status === 'Live' ? '1.5px solid rgba(95, 175, 136, 0.4)' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, boxShadow 0.15s ease'
                }}
              >
                {/* Timeline Bullet Node */}
                <div style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: item.status === 'Live' ? '#10B981' : '#CBD5E1',
                  border: '3px solid white',
                  boxShadow: '0 0 0 2px rgba(95, 175, 136, 0.2)'
                }} />

                {/* Left Side: Time & Subject */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    minWidth: '80px',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Clock size={15} color="#3B7E5E" />
                    {item.timeSlot}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                        {item.subject}
                      </h4>
                      <span style={{
                        background: '#E2E8F0',
                        color: '#334155',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {item.grade}-{item.section}
                      </span>
                    </div>
                    <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                      {item.topic}
                    </p>
                  </div>
                </div>

                {/* Middle: Teacher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.teacherAvatar}
                    alt={item.teacherName}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                    {item.teacherName}
                  </div>
                </div>

                {/* Platform Badge */}
                <div style={{
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Video size={13} color="#3B7E5E" /> {item.platform}
                </div>

                {/* Right: Status Pill & Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {badge.icon} {item.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.meetingLink, '_blank');
                    }}
                    style={{
                      background: 'white',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Link <ExternalLink size={13} />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
