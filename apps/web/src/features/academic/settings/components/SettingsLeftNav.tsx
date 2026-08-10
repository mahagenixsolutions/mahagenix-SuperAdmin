import React from 'react';
import type { SettingsSectionKey } from '../types';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  CheckSquare, 
  FileText, 
  Layers, 
  Video, 
  FileCheck, 
  HelpCircle, 
  Bell, 
  GitPullRequest, 
  BarChart2, 
  Share2 
} from 'lucide-react';

interface SettingsLeftNavProps {
  activeSection: SettingsSectionKey;
  onSelectSection: (key: SettingsSectionKey) => void;
}

export const SettingsLeftNav: React.FC<SettingsLeftNavProps> = ({
  activeSection,
  onSelectSection
}) => {
  const navItems: { key: SettingsSectionKey; label: string; icon: any }[] = [
    { key: 'academic-year', label: 'Academic Year', icon: <Calendar size={16} /> },
    { key: 'curriculum', label: 'Curriculum Settings', icon: <BookOpen size={16} /> },
    { key: 'grading', label: 'Grading System', icon: <Award size={16} /> },
    { key: 'attendance', label: 'Attendance Rules', icon: <CheckSquare size={16} /> },
    { key: 'assignment', label: 'Assignment Settings', icon: <FileText size={16} /> },
    { key: 'lesson-plan', label: 'Lesson Plan Settings', icon: <Layers size={16} /> },
    { key: 'online-learning', label: 'Online Learning', icon: <Video size={16} /> },
    { key: 'online-exam', label: 'Online Examination', icon: <FileCheck size={16} /> },
    { key: 'question-bank', label: 'Question Bank', icon: <HelpCircle size={16} /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { key: 'approval-workflow', label: 'Approval Workflow', icon: <GitPullRequest size={16} /> },
    { key: 'academic-calendar', label: 'Academic Calendar', icon: <Calendar size={16} /> },
    { key: 'reports', label: 'Reports & Analytics', icon: <BarChart2 size={16} /> },
    { key: 'integrations', label: 'Integrations', icon: <Share2 size={16} /> }
  ];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '12px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '8px 12px 12px 12px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Configuration Navigation
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectSection(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '13px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                background: isActive ? '#EAF5F0' : 'transparent',
                color: isActive ? '#3B7E5E' : '#475569',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ color: isActive ? '#3B7E5E' : '#94A3B8', flexShrink: 0 }}>
                {item.icon}
              </div>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
