import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PerformanceTier } from '../types';
import { Award, X, Plus } from 'lucide-react';

interface ConductAppraisalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ConductAppraisalModal: React.FC<ConductAppraisalModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [teacherName, setTeacherName] = useState('Dr. Rajesh Sharma');
  const [score, setScore] = useState(98);
  const [ratingTier, setRatingTier] = useState<PerformanceTier>('A+ Outstanding');
  const [remarks, setRemarks] = useState('Exceptional teaching clarity, 98% student pass rate, zero SLA delays.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ teacherName, score: Number(score), ratingTier, remarks });
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
              <Award size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
              Conduct Faculty Appraisal Review
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Faculty Member</label>
            <select
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            >
              <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (Mathematics)</option>
              <option value="Mrs. Kavitha Menon">Mrs. Kavitha Menon (Physics)</option>
              <option value="Dr. Sonia Gandhi">Dr. Sonia Gandhi (Chemistry)</option>
              <option value="Mrs. Anita Desai">Mrs. Anita Desai (Social Studies)</option>
              <option value="Mr. Suresh Raina">Mr. Suresh Raina (English)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Performance Index (%)</label>
              <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} min={0} max={100} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Rating Tier</label>
              <select value={ratingTier} onChange={(e) => setRatingTier(e.target.value as PerformanceTier)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                <option value="A+ Outstanding">A+ Outstanding</option>
                <option value="A Exceeds Expectations">A Exceeds Expectations</option>
                <option value="B Meets Expectations">B Meets Expectations</option>
                <option value="C Needs Improvement">C Needs Improvement</option>
                <option value="PIP Required">PIP Required</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Appraisal Notes & Recommendations</label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
              Submit Appraisal
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
