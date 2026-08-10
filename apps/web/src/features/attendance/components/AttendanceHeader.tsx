import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Calendar, 
  Download, 
  Send, 
  ShieldCheck, 
  Plus 
} from 'lucide-react';

interface AttendanceHeaderProps {
  onGenerateReport: () => void;
  onPoliciesClick: () => void;
  onCalendarClick: () => void;
  onExportClick: () => void;
  onNotifyParentsClick: () => void;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  onGenerateReport,
  onPoliciesClick,
  onCalendarClick,
  onExportClick,
  onNotifyParentsClick
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #5FAF88 0%, #3B7E5E 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(95, 175, 136, 0.3)'
            }}>
              <Users size={22} />
            </div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Attendance Analytics & Intelligence Center
            </h1>
            <span style={{
              background: '#EAF5F0',
              color: '#3B7E5E',
              border: '1px solid rgba(95, 175, 136, 0.3)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={14} /> Supervisory Command
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', color: '#64748B', fontSize: '14px', maxWidth: '820px' }}>
            Monitor attendance trends, identify at-risk students, track teacher compliance, and improve institution-wide attendance performance.
          </p>
        </div>

        {/* Action Suite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Generate Attendance Report */}
          <button
            onClick={onGenerateReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #5FAF88 0%, #479670 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(95, 175, 136, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <FileText size={16} /> Generate Report
          </button>

          {/* Attendance Policies */}
          <button
            onClick={onPoliciesClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={15} color="#3B7E5E" /> Policies
          </button>

          {/* Attendance Calendar */}
          <button
            onClick={onCalendarClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Calendar size={15} color="#3B82F6" /> Calendar
          </button>

          {/* Export Analytics */}
          <button
            onClick={onExportClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#475569',
              border: '1px solid #CBD5E1',
              padding: '10px 12px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={15} /> Export
          </button>

          {/* Notify Parents */}
          <button
            onClick={onNotifyParentsClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Send size={15} /> Notify Parents
          </button>

        </div>
      </div>
    </div>
  );
};
