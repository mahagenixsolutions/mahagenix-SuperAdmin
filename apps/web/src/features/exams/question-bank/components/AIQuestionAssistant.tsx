import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  HelpCircle, 
  Code, 
  Layers, 
  FileText, 
  Search, 
  Wand2, 
  ArrowRight 
} from 'lucide-react';

interface AIQuestionAssistantProps {
  onGenerateClick: (type: string) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const AIQuestionAssistant: React.FC<AIQuestionAssistantProps> = ({
  onGenerateClick,
  onSuggestionClick
}) => {
  const generators = [
    { title: 'Generate MCQs', desc: '4-option distractors with explanation', icon: <HelpCircle size={16} color="#3B7E5E" /> },
    { title: 'Generate HOTS Questions', desc: 'High Order Thinking Skill problems', icon: <Sparkles size={16} color="#8B5CF6" /> },
    { title: 'Generate Case Studies', desc: 'Real-world scenario problem sets', icon: <Layers size={16} color="#3B82F6" /> },
    { title: 'Generate Practical / Diagram', desc: 'Lab & diagrammatic questions', icon: <FileText size={16} color="#F59E0B" /> },
    { title: 'Generate Coding Problems', desc: 'Algorithm challenges in C++ / Python', icon: <Code size={16} color="#06B6D4" /> },
    { title: 'Auto-Assemble Exam Paper', desc: 'CBSE blueprint aligned paper draft', icon: <Wand2 size={16} color="#10B981" /> }
  ];

  const suggestions = [
    'Improve wording & remove ambiguity',
    'Increase difficulty level to HOTS',
    'Reduce difficulty for remedial test',
    'Scan repository for duplicate questions',
    'Suggest automated answer key & grading rubric'
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
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              EduVerse AI Question Generator & Assistant
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Generate syllabus-aligned questions, distractors, and marking rubrics in seconds.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          AI Model v4.2 Active
        </div>
      </div>

      {/* Grid of AI Generators */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        {generators.map((gen) => (
          <button
            key={gen.title}
            onClick={() => onGenerateClick(gen.title)}
            style={{
              background: 'white',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {gen.icon}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{gen.title}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{gen.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* AI Quick Optimization Suggestions */}
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
          AI ONE-CLICK OPTIMIZATION ACTIONS:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {suggestions.map((sug) => (
            <button
              key={sug}
              onClick={() => onSuggestionClick(sug)}
              style={{
                background: 'white',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#3B7E5E',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={12} /> {sug}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
