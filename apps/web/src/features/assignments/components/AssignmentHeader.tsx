import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  CheckSquare, 
  ShieldCheck, 
  Download, 
  Plus 
} from 'lucide-react';

interface AssignmentHeaderProps {
  onCalendarClick: () => void;
  onReviewPendingClick: () => void;
  onCreatePolicyClick: () => void;
  onExportReportsClick: () => void;
}

export const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({
  onCalendarClick,
  onReviewPendingClick,
  onCreatePolicyClick,
  onExportReportsClick
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
              <CheckSquare size={22} />
            </div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Assignment Operations Center
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
          <p style={{ margin: '6px 0 0 0', color: '#64748B', fontSize: '14px', maxWidth: '780px' }}>
            Monitor, coordinate, approve, and analyze assignment activities, evaluation progress, and student completion across the institution.
          </p>
        </div>

        {/* Primary Actions Suite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Assignment Calendar */}
          <button
            onClick={onCalendarClick}
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
            <Calendar size={16} /> Assignment Calendar
          </button>

          {/* Review Pending Assignments */}
          <button
            onClick={onReviewPendingClick}
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
            <CheckSquare size={15} color="#3B7E5E" /> Review Pending (18)
          </button>

          {/* Create Assignment Policy */}
          <button
            onClick={onCreatePolicyClick}
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
            <Plus size={15} color="#3B82F6" /> Assignment Policy
          </button>

          {/* Export Reports */}
          <button
            onClick={onExportReportsClick}
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
            <Download size={15} /> Export Reports
          </button>

        </div>
      </div>
    </div>
  );
};
