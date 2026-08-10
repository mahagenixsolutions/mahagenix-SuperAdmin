import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { 
  LiveOnlineClass, 
  MeetingPlatform 
} from '../types';
import { 
  Radio, 
  Users, 
  Clock, 
  Eye, 
  BarChart3, 
  Megaphone, 
  XSquare, 
  Video, 
  Mic, 
  Volume2, 
  AlertTriangle,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

interface LiveClassMonitorProps {
  liveClasses: LiveOnlineClass[];
  onObserverJoin: (classItem: LiveOnlineClass) => void;
  onViewAnalytics: (classItem: LiveOnlineClass) => void;
  onSendAnnouncement: (classItem: LiveOnlineClass) => void;
  onEndSession: (classId: string) => void;
}

export const LiveClassMonitor: React.FC<LiveClassMonitorProps> = ({
  liveClasses,
  onObserverJoin,
  onViewAnalytics,
  onSendAnnouncement,
  onEndSession
}) => {
  const [filterPlatform, setFilterPlatform] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClasses = liveClasses.filter(c => {
    const matchesPlatform = filterPlatform === 'All' || c.platform === filterPlatform;
    const matchesSearch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const getPlatformBadge = (platform: MeetingPlatform) => {
    switch (platform) {
      case 'Google Meet':
        return { bg: '#E6F4EA', color: '#137333', border: '#CEEAD6', label: 'Google Meet' };
      case 'Microsoft Teams':
        return { bg: '#F2F2F9', color: '#464775', border: '#DADAEE', label: 'MS Teams' };
      case 'Zoom':
        return { bg: '#E8F2FF', color: '#0B5CFF', border: '#C7DDFF', label: 'Zoom' };
      case 'Jitsi':
        return { bg: '#EBF4FA', color: '#1B6A97', border: '#D0E4F2', label: 'Jitsi Meet' };
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
      {/* Header with Live Counter and Controls */}
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
            background: '#ECFDF5',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Radio size={22} className="animate-pulse" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Live Class Monitor
              <span style={{
                background: '#10B981',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: '12px'
              }}>
                {liveClasses.length} Active Sessions
              </span>
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Supervise classroom audio/video quality, student attendance rate, and live interactions in real time.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search teacher, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Platform Filter */}
          <div style={{ display: 'flex', background: '#F8FAFC', borderRadius: '8px', padding: '3px', border: '1px solid #E2E8F0' }}>
            {['All', 'Google Meet', 'Microsoft Teams', 'Zoom'].map(plat => (
              <button
                key={plat}
                onClick={() => setFilterPlatform(plat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: filterPlatform === plat ? '#3B7E5E' : 'transparent',
                  color: filterPlatform === plat ? 'white' : '#64748B',
                  transition: 'all 0.15s ease'
                }}
              >
                {plat === 'Microsoft Teams' ? 'MS Teams' : plat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Live Class Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        <AnimatePresence>
          {filteredClasses.map((item) => {
            const platformBadge = getPlatformBadge(item.platform);
            const isLowAttendance = item.attendancePercentage < 75;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'white',
                  border: isLowAttendance ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '20px',
                  boxShadow: isLowAttendance ? '0 4px 14px rgba(239, 68, 68, 0.08)' : '0 4px 14px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                {/* Card Top: Live Badge & Platform */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: '#ECFDF5',
                      color: '#047857',
                      border: '1px solid #A7F3D0',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }} />
                      LIVE
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                      Started {item.startTime}
                    </span>
                  </div>

                  <span style={{
                    background: platformBadge.bg,
                    color: platformBadge.color,
                    border: `1px solid ${platformBadge.border}`,
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {platformBadge.label}
                  </span>
                </div>

                {/* Subject & Topic */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                      {item.subject}
                    </h3>
                    <span style={{
                      background: '#F1F5F9',
                      color: '#475569',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {item.grade}-{item.section}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                    Topic: {item.topic}
                  </p>
                </div>

                {/* Teacher Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F8FAFC',
                  padding: '10px 14px',
                  borderRadius: '10px'
                }}>
                  <img
                    src={item.teacherAvatar}
                    alt={item.teacherName}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
                      {item.teacherName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {item.teacherDept}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Audio</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: item.audioQuality === 'Excellent' ? '#10B981' : '#F59E0B' }}>
                      {item.audioQuality}
                    </div>
                  </div>
                </div>

                {/* Realtime Metrics Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                  
                  {/* Elapsed Time */}
                  <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Duration</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Clock size={13} color="#64748B" /> {item.elapsedMinutes}m / {item.durationMinutes}m
                    </div>
                  </div>

                  {/* Joined / Total */}
                  <div style={{ background: isLowAttendance ? '#FEF2F2' : '#F8FAFC', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: isLowAttendance ? '#EF4444' : '#64748B', fontWeight: 600 }}>
                      Joined
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: isLowAttendance ? '#DC2626' : '#0F172A', marginTop: '2px' }}>
                      {item.studentsJoined}/{item.totalStudents}
                    </div>
                  </div>

                  {/* Attendance % */}
                  <div style={{ background: isLowAttendance ? '#FEF2F2' : '#EAF5F0', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: isLowAttendance ? '#EF4444' : '#3B7E5E', fontWeight: 600 }}>
                      Attendance
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: isLowAttendance ? '#DC2626' : '#3B7E5E', marginTop: '2px' }}>
                      {item.attendancePercentage}%
                    </div>
                  </div>

                </div>

                {/* Low Attendance Warning Bar */}
                {isLowAttendance && (
                  <div style={{
                    background: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#991B1B',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    <AlertTriangle size={15} color="#EF4444" />
                    Warning: Attendance is below 75% threshold!
                  </div>
                )}

                {/* Action Buttons Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                  
                  {/* Join as Observer */}
                  <button
                    onClick={() => onObserverJoin(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: '#3B7E5E',
                      color: 'white',
                      border: 'none',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Eye size={14} /> Join as Observer
                  </button>

                  {/* View Analytics */}
                  <button
                    onClick={() => onViewAnalytics(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'white',
                      color: '#1E293B',
                      border: '1px solid #CBD5E1',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <BarChart3 size={14} /> View Analytics
                  </button>

                  {/* Send Announcement */}
                  <button
                    onClick={() => onSendAnnouncement(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'white',
                      color: '#475569',
                      border: '1px solid #CBD5E1',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Megaphone size={14} /> Announce
                  </button>

                  {/* End Session (Admin) */}
                  <button
                    onClick={() => onEndSession(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: '#FEF2F2',
                      color: '#EF4444',
                      border: '1px solid #FCA5A5',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <XSquare size={14} /> End Session
                  </button>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
