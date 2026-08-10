import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExamTypeCategory } from '../types';
import { Plus, X, Calendar, Clock, BookOpen, User } from 'lucide-react';

interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newExam: any) => void;
}

export const CreateExamModal: React.FC<CreateExamModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('Grade 10');
  const [section, setSection] = useState('A');
  const [examType, setExamType] = useState<ExamTypeCategory>('Mid-Term');
  const [date, setDate] = useState('2026-08-25');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 12:00 PM');
  const [invigilator, setInvigilator] = useState('Dr. Rajesh Sharma');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: `ex-${Date.now()}`,
      title: title || `${grade} ${subject} ${examType}`,
      subject,
      grade,
      section,
      examType,
      date,
      timeSlot,
      duration: '3 hrs',
      hallRoom: 'Main Academic Block Hall 1',
      chiefInvigilator: invigilator,
      paperStatus: 'Draft',
      status: 'Scheduled',
      academicYear: '2026-2027'
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
          maxWidth: '520px',
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
              Create Examination Block
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Examination Title</label>
            <input
              type="text"
              placeholder="e.g. Mid-Term Higher Mathematics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Exam Category</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamTypeCategory)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              >
                <option value="Mid-Term">Mid-Term</option>
                <option value="Final Term">Final Term</option>
                <option value="Unit Test">Unit Test</option>
                <option value="Practical">Practical</option>
                <option value="Mock Test">Mock Test</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Section</label>
              <select value={section} onChange={(e) => setSection(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                {['A', 'B', 'C', 'D'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Time Slot</label>
              <input type="text" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Chief Invigilator</label>
              <input type="text" value={invigilator} onChange={(e) => setInvigilator(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
              Create Exam
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
