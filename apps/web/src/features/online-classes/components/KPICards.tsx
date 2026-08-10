import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  PlayCircle, 
  CheckCircle, 
  UserCheck, 
  Users, 
  TrendingUp, 
  Video, 
  Server 
} from 'lucide-react';

export const KPICards: React.FC = () => {
  const kpis = [
    {
      title: 'Total Scheduled Classes',
      value: '48',
      subtitle: '+6 vs yesterday',
      icon: <Calendar size={20} color="#3B7E5E" />,
      badgeColor: '#EAF5F0',
      textColor: '#0F172A'
    },
    {
      title: 'Classes Running',
      value: '18 Live',
      subtitle: 'Across 4 platforms',
      icon: <PlayCircle size={20} color="#10B981" />,
      badgeColor: '#ECFDF5',
      textColor: '#047857',
      isLive: true
    },
    {
      title: 'Classes Completed',
      value: '21',
      subtitle: '100% recorded',
      icon: <CheckCircle size={20} color="#3B82F6" />,
      badgeColor: '#EFF6FF',
      textColor: '#1E40AF'
    },
    {
      title: 'Teacher Availability',
      value: '94%',
      subtitle: '67 of 71 online',
      icon: <UserCheck size={20} color="#8B5CF6" />,
      badgeColor: '#F3E8FF',
      textColor: '#6B21A8'
    },
    {
      title: 'Student Attendance',
      value: '92%',
      subtitle: '+2.4% this week',
      icon: <Users size={20} color="#3B7E5E" />,
      badgeColor: '#EAF5F0',
      textColor: '#3B7E5E'
    },
    {
      title: 'Average Engagement',
      value: '88%',
      subtitle: 'High participation',
      icon: <TrendingUp size={20} color="#F59E0B" />,
      badgeColor: '#FEF3C7',
      textColor: '#B45309'
    },
    {
      title: 'Recording Success Rate',
      value: '99.2%',
      subtitle: 'Auto-sync enabled',
      icon: <Video size={20} color="#06B6D4" />,
      badgeColor: '#CFFAFE',
      textColor: '#0E7490'
    },
    {
      title: 'Platform Uptime',
      value: '99.9%',
      subtitle: 'Optimal connectivity',
      icon: <Server size={20} color="#10B981" />,
      badgeColor: '#D1FAE5',
      textColor: '#065F46'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px'
    }}>
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
          whileHover={{ y: -3, boxShadow: '0 8px 24px -4px rgba(95, 175, 136, 0.15)' }}
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'border-color 0.2s'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
              {kpi.title}
            </span>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: kpi.badgeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {kpi.icon}
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: kpi.textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {kpi.value}
              {kpi.isLive && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  background: '#10B981',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase'
                }}>
                  Live
                </span>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', fontWeight: 500 }}>
              {kpi.subtitle}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
