import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Plus, 
  Calendar, 
  Upload, 
  Ticket, 
  Send, 
  ShieldCheck 
} from 'lucide-react';

interface ExamHeaderProps {
  onCreateExam: () => void;
  onPublishSchedule: () => void;
  onImportQuestionBank: () => void;
  onGenerateAdmitCards: () => void;
  onPublishResults: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  onCreateExam,
  onPublishSchedule,
  onImportQuestionBank,
  onGenerateAdmitCards,
  onPublishResults
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {/* Top Row: Title + Icon + Badge on Left, Action Buttons on Right */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        width: '100%'
      }}>
        {/* Title + Icon + Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, #5FAF88 0%, #3B7E5E 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(95, 175, 136, 0.3)',
            flexShrink: 0
          }}>
            <FileCheck size={19} />
          </div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Online Examination Command Center
          </h1>
          <span style={{
            background: '#EAF5F0',
            color: '#3B7E5E',
            border: '1px solid rgba(95, 175, 136, 0.3)',
            padding: '2px 8px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <ShieldCheck size={12} /> Institutional Operations
          </span>
        </div>

        {/* Primary Actions Suite on Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
          
          {/* Create Examination */}
          <button
            onClick={onCreateExam}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'linear-gradient(135deg, #5FAF88 0%, #479670 100%)',
              color: 'white',
              border: 'none',
              padding: '8px 13px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 8px rgba(95, 175, 136, 0.35)',
              transition: 'transform 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Plus size={14} /> Create Examination
          </button>

          {/* Publish Schedule */}
          <button
            onClick={onPublishSchedule}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Calendar size={13} color="#3B7E5E" /> Publish Schedule
          </button>

          {/* Import Question Bank */}
          <button
            onClick={onImportQuestionBank}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Upload size={13} color="#3B82F6" /> Import Q-Bank
          </button>

          {/* Generate Admit Cards */}
          <button
            onClick={onGenerateAdmitCards}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Ticket size={13} color="#8B5CF6" /> Admit Cards
          </button>

          {/* Publish Results */}
          <button
            onClick={onPublishResults}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '8px 11px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Send size={13} /> Publish Results
          </button>

        </div>
      </div>

      {/* Subtitle Row */}
      <p style={{ margin: '2px 0 0 46px', color: '#64748B', fontSize: '13px', lineHeight: 1.4 }}>
        Manage examination planning, scheduling, monitoring, evaluation, publishing, and analytics from one centralized workspace.
      </p>
    </div>
  );
};
