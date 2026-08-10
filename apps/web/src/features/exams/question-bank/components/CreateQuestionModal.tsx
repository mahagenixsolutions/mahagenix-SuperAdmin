import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuestionType, DifficultyLevel, BloomsTaxonomyLevel } from '../types';
import { Plus, X, BookOpen, Layers } from 'lucide-react';

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newQuestion: any) => void;
}

export const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [grade, setGrade] = useState('Grade 11');
  const [chapter, setChapter] = useState('Chapter 6: Electromagnetic Induction');
  const [topic, setTopic] = useState('Faraday\'s Law');
  const [type, setType] = useState<QuestionType>('Descriptive');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [bloomsTaxonomy, setBloomsTaxonomy] = useState<BloomsTaxonomyLevel>('Applying');
  const [marks, setMarks] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    onSubmit({
      id: `q-${Date.now()}`,
      questionText,
      subject,
      grade,
      chapter,
      topic,
      type,
      difficulty,
      bloomsTaxonomy,
      marks: Number(marks),
      estimatedTimeMinutes: 10,
      createdByTeacher: 'Academic Coordinator',
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      status: 'Approved',
      usageCount: 0,
      qualityScore: 96,
      createdDate: 'Today'
    });
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
          maxWidth: '560px',
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
              background: '#3B7E5E',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Plus size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
              Create New Question Item
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Question Prompt / Text</label>
            <textarea
              rows={3}
              placeholder="State or derive Faraday's Law..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as QuestionType)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                <option value="MCQ">MCQ</option>
                <option value="Descriptive">Descriptive</option>
                <option value="Coding">Coding</option>
                <option value="Case Study">Case Study</option>
                <option value="Diagram">Diagram</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="HOTS">HOTS</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Marks</label>
              <input type="number" value={marks} onChange={(e) => setMarks(Number(e.target.value))} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
              Add to Repository
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
