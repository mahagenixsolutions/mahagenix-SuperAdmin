import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Brain, 
  Layers, 
  FileCheck 
} from 'lucide-react';

export const QuestionQualityAnalytics: React.FC = () => {
  const qualityAudits = [
    { title: 'Duplicate Question Scan', score: '0 Flagged', desc: 'Semantic vectors verified 18,420 items', status: 'Clean', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Grammar & Syntax Audit', score: '99.4%', desc: 'Spelling & terminology clear', status: 'Optimal', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Difficulty Balance Rating', score: '94%', desc: 'Balanced 35% Easy, 45% Med, 20% Hard', status: 'Balanced', color: '#3B7E5E', bg: '#EAF5F0' },
    { title: 'Curriculum Coverage Index', score: '91%', desc: 'Mapped to CBSE & ICSE learning outcomes', status: 'High', color: '#3B82F6', bg: '#EFF6FF' },
    { title: 'Bloom\'s Taxonomy Compliance', score: '96%', desc: 'Covers all 6 cognitive domain levels', status: 'Certified', color: '#8B5CF6', bg: '#F3E8FF' },
    { title: 'Learning Outcome Mapping', score: '100%', desc: 'All questions linked to course outcomes', status: 'Complete', color: '#10B981', bg: '#D1FAE5' }
  ];

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
              AI Question Quality & Curriculum Compliance Audit
              <span style={{
                background: '#EAF5F0',
                color: '#3B7E5E',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                94% Overall Score
              </span>
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time NLP analysis for ambiguity detection, duplicate prevention, and taxonomy verification.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700, fontSize: '13px' }}>
          <ShieldCheck size={16} /> Board Audit Certified
        </div>
      </div>

      {/* Grid of Audit Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {qualityAudits.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -2 }}
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                {item.title}
              </span>
              <span style={{ background: item.bg, color: item.color, padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                {item.status}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: item.color }}>
                {item.score}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                {item.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
