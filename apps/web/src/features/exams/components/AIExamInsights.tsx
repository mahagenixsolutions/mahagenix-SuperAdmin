import React from 'react';
import { motion } from 'framer-motion';
import type { AIExamInsight } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  AlertTriangle 
} from 'lucide-react';

interface AIExamInsightsProps {
  insights: AIExamInsight[];
  onTakeAction: (insight: AIExamInsight) => void;
}

export const AIExamInsights: React.FC<AIExamInsightsProps> = ({ insights, onTakeAction }) => {
  const getSeverityStyle = (severity: AIExamInsight['severity']) => {
    switch (severity) {
      case 'Critical':
        return { bg: '#FEF2F2', border: '#FCA5A5', color: '#991B1B' };
      case 'Warning':
        return { bg: '#FEF3C7', border: '#FDE68A', color: '#92400E' };
      case 'Info':
        return { bg: '#EFF6FF', border: '#BFDBFE', color: '#1E40AF' };
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F9F6 100%)',
      border: '1px solid rgba(95, 175, 136, 0.25)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(95, 175, 136, 0.08)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(95, 175, 136, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <Sparkles size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              EduVerse AI Examination Diagnostics
              <span style={{
                background: '#EAF5F0',
                color: '#3B7E5E',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                Predictive Analytics
              </span>
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Predictive risk flagging for student failures, submission delays, difficulty imbalances, and revision mandates.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Lightbulb size={16} /> 4 Smart Directives Active
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {insights.map((insight) => {
          const style = getSeverityStyle(insight.severity);

          return (
            <motion.div
              key={insight.id}
              whileHover={{ y: -2 }}
              style={{
                background: 'white',
                border: `1px solid ${style.border}`,
                borderRadius: '12px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    background: style.bg,
                    color: style.color,
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {insight.type}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: style.color }}>
                    {insight.severity} Severity
                  </span>
                </div>

                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  {insight.title}
                </h4>

                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                  {insight.description}
                </p>
              </div>

              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                  TARGET SUBJECT: <strong style={{ color: '#0F172A' }}>{insight.affectedSubjectOrGrade}</strong>
                </div>

                <button
                  onClick={() => onTakeAction(insight)}
                  style={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#3B7E5E',
                    color: 'white',
                    border: 'none',
                    padding: '7px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
                >
                  {insight.actionText} <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
