import React from 'react';
import { motion } from 'framer-motion';
import { questionTypeData } from '../mockData';
import { 
  Database, 
  Layers, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const QuestionBankInsights: React.FC = () => {
  const bloomsTaxonomy = [
    { level: 'Remembering & Recall', percentage: 20, color: '#34A853' },
    { level: 'Understanding & Concept', percentage: 30, color: '#3B7E5E' },
    { level: 'Application & Problem Solving', percentage: 25, color: '#3B82F6' },
    { level: 'Analytical Thinking', percentage: 15, color: '#8B5CF6' },
    { level: 'Evaluation & Synthesis', percentage: 10, color: '#F59E0B' }
  ];

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
            background: '#F3E8FF',
            color: '#7E22CE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Database size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Institutional Question Bank & Taxonomy Intelligence
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              4,850 verified questions with Bloom's Taxonomy balancing and AI duplicate detection.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700, fontSize: '13px' }}>
          <ShieldCheck size={16} /> 0 Duplicate Questions Flagged
        </div>
      </div>

      {/* Grid of Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Metric 1: Total & Difficulty Distribution */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Total Question Repository</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>4,850 Items</div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Difficulty Level Balance</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ flex: '35', background: '#10B981', padding: '8px', borderRadius: '6px', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 700 }}>Easy</div>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>35%</div>
              </div>
              <div style={{ flex: '45', background: '#3B7E5E', padding: '8px', borderRadius: '6px', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 700 }}>Medium</div>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>45%</div>
              </div>
              <div style={{ flex: '20', background: '#EF4444', padding: '8px', borderRadius: '6px', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 700 }}>Hard</div>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>20%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: Bloom's Taxonomy Breakdown */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Brain size={16} color="#8B5CF6" /> Bloom's Cognitive Taxonomy
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bloomsTaxonomy.map(b => (
              <div key={b.level}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '3px' }}>
                  <span>{b.level}</span>
                  <span style={{ fontWeight: 800 }}>{b.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${b.percentage}%`, height: '100%', background: b.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metric 3: Question Format Types */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} color="#3B82F6" /> Question Format Distribution
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {questionTypeData.map(q => (
              <div key={q.type}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '3px' }}>
                  <span>{q.type}</span>
                  <span style={{ fontWeight: 800 }}>{q.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${q.percentage}%`, height: '100%', background: q.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
