import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X, MessageSquare, Mail, Bell } from 'lucide-react';

interface NotifyParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSubmit: (data: any) => void;
}

export const NotifyParentModal: React.FC<NotifyParentModalProps> = ({
  isOpen,
  onClose,
  onSendSubmit
}) => {
  const [channel, setChannel] = useState<'SMS' | 'Email' | 'Push'>('SMS');
  const [targetGroup, setTargetGroup] = useState('All Absent Students Today (146)');
  const [customMessage, setCustomMessage] = useState(
    'Dear Parent, your child was marked ABSENT today at EduVerse School ERP. Please submit medical/leave documentation.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendSubmit({ channel, targetGroup, customMessage });
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
              <Send size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
              Dispatch Parent Attendance Alert
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Dispatch Channel</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {(['SMS', 'Email', 'Push'] as const).map(ch => (
                <button
                  type="button"
                  key={ch}
                  onClick={() => setChannel(ch)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: channel === ch ? '#3B7E5E' : 'white',
                    color: channel === ch ? 'white' : '#475569'
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Target Audience</label>
            <select
              value={targetGroup}
              onChange={(e) => setTargetGroup(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            >
              <option value="All Absent Students Today (146)">All Absent Students Today (146)</option>
              <option value="At-Risk Students Below 75% (18)">At-Risk Students Below 75% (18)</option>
              <option value="Unexcused Absence Cohort (38)">Unexcused Absence Cohort (38)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Message Template</label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
              Dispatch Notifications
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
