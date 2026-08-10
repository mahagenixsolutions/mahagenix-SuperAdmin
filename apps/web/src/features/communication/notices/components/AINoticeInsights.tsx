import React from 'react';
import { motion } from 'framer-motion';
import type { AINoticeInsight } from '../types';
import { Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

interface AINoticeInsightsProps {
  insights: AINoticeInsight[];
  onTakeAction: (insight: AINoticeInsight) => void;
}

export const AINoticeInsights: React.FC<AINoticeInsightsProps> = ({ insights, onTakeAction }) => {
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
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              EduVerse AI Notice Engagement & Reach Intelligence
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Machine learning analytics identifying unread parent cohorts, missing teacher signoffs, and optimal notification schedules.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          3 AI Recommendations Active
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {insights.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            style={{
              background: 'white',
              border: item.severity === 'Critical' ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  background: item.severity === 'Critical' ? '#FEF2F2' : '#FFFBEB',
                  color: item.severity === 'Critical' ? '#DC2626' : '#B45309',
                  border: `1px solid ${item.severity === 'Critical' ? '#FCA5A5' : '#FDE68A'}`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 800
                }}>
                  {item.type}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                  {item.targetGroup}
                </span>
              </div>

              <h4 style={{ margin: '8px 0 4px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                {item.title}
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.45' }}>
                {item.description}
              </p>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                AI Rec: {item.suggestedAction}
              </span>
              <button
                onClick={() => onTakeAction(item)}
                style={{
                  background: '#3B7E5E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Dispatch Action
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
