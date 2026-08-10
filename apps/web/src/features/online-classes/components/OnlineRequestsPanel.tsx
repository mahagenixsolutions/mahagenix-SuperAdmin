import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ClassRequest } from '../types';
import { 
  Inbox, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Video, 
  FileText 
} from 'lucide-react';

interface OnlineRequestsPanelProps {
  requests: ClassRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onReschedule: (request: ClassRequest) => void;
}

export const OnlineRequestsPanel: React.FC<OnlineRequestsPanelProps> = ({
  requests,
  onApprove,
  onReject,
  onReschedule
}) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9'
      }}>
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
            <Inbox size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Online Class Requests
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Pending faculty approvals for slot changes, platform upgrades, extra lectures, and recording releases.
            </p>
          </div>
        </div>

        <span style={{
          background: '#F59E0B',
          color: 'white',
          fontWeight: 800,
          fontSize: '12px',
          padding: '4px 12px',
          borderRadius: '12px'
        }}>
          {requests.length} Pending
        </span>
      </div>

      {/* List of Requests */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {requests.map((req) => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              {/* Left: Teacher & Details */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '280px' }}>
                <img
                  src={req.teacherAvatar}
                  alt={req.teacherName}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                      {req.teacherName}
                    </span>
                    <span style={{
                      background: '#EAF5F0',
                      color: '#3B7E5E',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {req.requestType}
                    </span>
                    {req.urgency === 'High' && (
                      <span style={{
                        background: '#FEF2F2',
                        color: '#EF4444',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        Urgent
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginTop: '4px' }}>
                    {req.className} ({req.subject})
                  </div>

                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                    "{req.reason}"
                  </p>

                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                    Submitted {req.submittedTime} • Original slot: {req.originalTime}
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => onApprove(req.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#3B7E5E',
                    color: 'white',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Check size={14} /> Approve
                </button>

                <button
                  onClick={() => onReschedule(req)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'white',
                    color: '#1E293B',
                    border: '1px solid #CBD5E1',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Clock size={14} /> Reschedule
                </button>

                <button
                  onClick={() => onReject(req.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#FEF2F2',
                    color: '#EF4444',
                    border: '1px solid #FCA5A5',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
