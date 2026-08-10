import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuestionItem } from '../types';
import { 
  Flame, 
  Clock, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle, 
  Award 
} from 'lucide-react';

interface QuestionBankInsightsGridProps {
  questions: QuestionItem[];
}

export const QuestionBankInsightsGrid: React.FC<QuestionBankInsightsGridProps> = ({ questions }) => {
  const [activeTab, setActiveTab] = useState<'Most Used' | 'Unused' | 'Needing Review' | 'HOTS'>('Most Used');

  const getFilteredQuestions = () => {
    switch (activeTab) {
      case 'Most Used':
        return [...questions].sort((a, b) => b.usageCount - a.usageCount);
      case 'Unused':
        return questions.filter(q => q.usageCount === 0);
      case 'Needing Review':
        return questions.filter(q => q.status === 'Submitted' || q.status === 'Under Review');
      case 'HOTS':
        return questions.filter(q => q.difficulty === 'HOTS' || q.difficulty === 'Hard');
    }
  };

  const filtered = getFilteredQuestions();

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
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
            <Flame size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Repository Intelligence & Usage Insights
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Categorized views of high-frequency exam questions, unutilized inventory, and review queues.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: '#F8FAFC', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          {(['Most Used', 'Unused', 'Needing Review', 'HOTS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeTab === tab ? '#3B7E5E' : 'transparent',
                color: activeTab === tab ? 'white' : '#64748B'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {filtered.slice(0, 6).map((q) => (
          <div
            key={q.id}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#3B7E5E', background: '#EAF5F0', padding: '2px 6px', borderRadius: '4px' }}>
                  {q.subject} ({q.grade})
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                  Used {q.usageCount} times
                </span>
              </div>

              <h4 style={{ margin: '8px 0 0 0', fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: '1.4' }}>
                "{q.questionText}"
              </h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
              <span>Author: {q.createdByTeacher}</span>
              <span style={{ fontWeight: 800, color: '#10B981' }}>{q.qualityScore}% Score</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
