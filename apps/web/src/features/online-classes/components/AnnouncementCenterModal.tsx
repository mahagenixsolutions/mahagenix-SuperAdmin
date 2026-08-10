import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, 
  Send, 
  Users, 
  AlertTriangle, 
  Video, 
  X, 
  CheckCircle2 
} from 'lucide-react';

interface AnnouncementCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcast: (target: string, message: string, type: string) => void;
  defaultTarget?: string;
}

export const AnnouncementCenterModal: React.FC<AnnouncementCenterModalProps> = ({
  isOpen,
  onClose,
  onBroadcast,
  defaultTarget = 'Notify all online students'
}) => {
  const [target, setTarget] = useState<string>(defaultTarget);
  const [announcementType, setAnnouncementType] = useState<string>('General Notice');
  const [message, setMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onBroadcast(target, message, announcementType);
    setMessage('');
    onClose();
  };

  const targetOptions = [
    'Notify all online students',
    'Notify teachers',
    'Platform maintenance',
    'Class cancellation',
    'Meeting link updated',
    'Emergency notice'
  ];

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
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '540px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
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
              <Megaphone size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                Online Announcement Center
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Broadcast real-time push notices across active virtual classrooms.
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Target Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '8px' }}>
              Broadcast Audience / Target
            </label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {targetOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Announcement Category */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '8px' }}>
              Notice Category
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['General Notice', 'Urgent Alert', 'Link Change', 'Maintenance'].map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setAnnouncementType(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: announcementType === cat ? '1px solid #3B7E5E' : '1px solid #CBD5E1',
                    background: announcementType === cat ? '#EAF5F0' : 'white',
                    color: announcementType === cat ? '#3B7E5E' : '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '8px' }}>
              Announcement Message
            </label>
            <textarea
              rows={4}
              placeholder="Type your official announcement here... (e.g. Grade 11 Chemistry session shifted to Zoom Room 4 due to bandwidth optimization)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'white',
                border: '1px solid #CBD5E1',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#3B7E5E',
                color: 'white',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59, 126, 94, 0.3)'
              }}
            >
              <Send size={15} /> Broadcast Now
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
