import React from 'react';
import { motion } from 'framer-motion';
import { feedbackBreakdownData } from '../mockData';
import { Star, MessageSquare } from 'lucide-react';

export const StudentFeedbackAnalytics: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#FEF3C7',
            color: '#B45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Star size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Student & Parent Feedback Rating Breakdown
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Quarterly feedback scores across teaching clarity, discipline, and empathy.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {feedbackBreakdownData.map((item) => (
          <div key={item.category} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
              <span>{item.category}</span>
              <span style={{ color: '#F59E0B' }}>★ {item.rating} / 5</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(item.rating / 5) * 100}%`, height: '100%', background: '#5FAF88', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
