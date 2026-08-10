import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Filter } from 'lucide-react';

interface NoticeTimelineFilterProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

export const NoticeTimelineFilter: React.FC<NoticeTimelineFilterProps> = ({
  selectedTab,
  onSelectTab
}) => {
  const tabs = ['Today', 'Tomorrow', 'This Week', 'This Month', 'Upcoming Academic Events'];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '14px',
      padding: '12px 18px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calendar size={18} color="#3B7E5E" />
        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
          Notice Timeline Schedule:
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => {
          const isActive = selectedTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              style={{
                background: isActive ? '#3B7E5E' : '#F8FAFC',
                color: isActive ? 'white' : '#475569',
                border: `1px solid ${isActive ? '#3B7E5E' : '#CBD5E1'}`,
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};
