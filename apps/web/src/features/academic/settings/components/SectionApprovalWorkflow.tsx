import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { GitPullRequest } from 'lucide-react';

interface SectionApprovalWorkflowProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionApprovalWorkflow: React.FC<SectionApprovalWorkflowProps> = ({ config, onChange }) => {
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
        <GitPullRequest size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 11: Governance & Multi-Tier Approval Workflows
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Enforce HOD and Academic Coordinator signoff gates for lesson plans, exams, and circulars.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Lesson Plan Approval</span>
          <button onClick={() => onChange({ lessonPlanApprovalWorkflow: !config.lessonPlanApprovalWorkflow })} style={{ background: config.lessonPlanApprovalWorkflow ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.lessonPlanApprovalWorkflow ? 'MANDATORY' : 'OPTIONAL'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Assignment Approval</span>
          <button onClick={() => onChange({ assignmentApprovalWorkflow: !config.assignmentApprovalWorkflow })} style={{ background: config.assignmentApprovalWorkflow ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.assignmentApprovalWorkflow ? 'MANDATORY' : 'OPTIONAL'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Exam Paper Approval</span>
          <button onClick={() => onChange({ examApprovalWorkflow: !config.examApprovalWorkflow })} style={{ background: config.examApprovalWorkflow ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.examApprovalWorkflow ? 'MANDATORY' : 'OPTIONAL'}
          </button>
        </div>
      </div>
    </div>
  );
};
