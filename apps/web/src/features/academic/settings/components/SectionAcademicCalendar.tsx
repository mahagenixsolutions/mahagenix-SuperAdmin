import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { Calendar } from 'lucide-react';

interface SectionAcademicCalendarProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionAcademicCalendar: React.FC<SectionAcademicCalendarProps> = () => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <Calendar size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 12: Academic Calendar & Event Synchronizers
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure automatic calendar sync across Exam Schedules, PTM Dates, Holidays, and Sports Events.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Exam Calendar Sync</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Auto-add approved examination timetables to student & teacher calendar feeds.</div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>PTM & Event Notifications</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Broadcast automatic parent calendar invites 7 days prior to Parent-Teacher Meetings.</div>
        </div>
      </div>
    </div>
  );
};
