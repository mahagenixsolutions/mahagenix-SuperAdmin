import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Wand2 } from 'lucide-react';

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateSubmit: (params: any) => void;
}

export const AIGenerateModal: React.FC<AIGenerateModalProps> = ({
  isOpen,
  onClose,
  onGenerateSubmit
}) => {
  const [topic, setTopic] = useState('Quantum Mechanics & Electromagnetism');
  const [subject, setSubject] = useState('Physics');
  const [grade, setGrade] = useState('Grade 11');
  const [count, setCount] = useState(10);
  const [type, setType] = useState('MCQ');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateSubmit({ topic, subject, grade, count, type });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F9F6 100%)',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#8B5CF6',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
              EduVerse AI Question Generator
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Target Chapter / Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Subject</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Question Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                <option value="MCQ">MCQ (4 Distractors)</option>
                <option value="HOTS">HOTS Problem</option>
                <option value="Case Study">Case Study Scenario</option>
                <option value="Coding">Coding Problem</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Quantity</label>
              <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} min={1} max={50} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#8B5CF6', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
              <Wand2 size={14} /> Generate {count} Questions
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
