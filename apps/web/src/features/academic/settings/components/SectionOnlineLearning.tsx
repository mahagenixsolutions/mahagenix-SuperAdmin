import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { Video } from 'lucide-react';

interface SectionOnlineLearningProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionOnlineLearning: React.FC<SectionOnlineLearningProps> = ({ config, onChange }) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <Video size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 7: Virtual Classroom & Video Provider Settings
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Choose default video conferencing provider (Google Meet, Zoom, MS Teams), recording, and security options.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Virtual Meeting Provider</label>
          <select
            value={config.meetingProvider}
            onChange={(e) => onChange({ meetingProvider: e.target.value as any })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          >
            <option value="Google Meet">Google Meet</option>
            <option value="Zoom">Zoom Video Communications</option>
            <option value="Microsoft Teams">Microsoft Teams</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Default Period Duration (Mins)</label>
          <input
            type="number"
            value={config.defaultMeetingDurationMins}
            onChange={(e) => onChange({ defaultMeetingDurationMins: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Auto Cloud Recording</span>
          <button onClick={() => onChange({ meetingRecordingEnabled: !config.meetingRecordingEnabled })} style={{ background: config.meetingRecordingEnabled ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.meetingRecordingEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Waiting Room & Lobby</span>
          <button onClick={() => onChange({ meetingWaitingRoom: !config.meetingWaitingRoom })} style={{ background: config.meetingWaitingRoom ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.meetingWaitingRoom ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
