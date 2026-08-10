import React from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Mail, Bell, ShieldCheck } from 'lucide-react';

interface ParentNotificationCenterProps {
  onGenerateSMS: () => void;
  onGenerateEmail: () => void;
  onPushNotification: () => void;
}

export const ParentNotificationCenter: React.FC<ParentNotificationCenterProps> = ({
  onGenerateSMS,
  onGenerateEmail,
  onPushNotification
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#ECFDF5',
            color: '#047857',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Send size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Parent Communication & Absence Dispatch Center
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Automated multi-channel dispatch for daily unexcused absences and 75% threshold warnings.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '6px 14px', borderRadius: '20px' }}>
          146 SMS Alerts Dispatched Today
        </div>
      </div>

      {/* Buttons Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <button
          onClick={onGenerateSMS}
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '10px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Batch SMS Dispatch</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Instant text alerts to parents</div>
          </div>
        </button>

        <button
          onClick={onGenerateEmail}
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '10px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Official Email Advisory</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Formal attendance notices</div>
          </div>
        </button>

        <button
          onClick={onPushNotification}
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '10px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F3E8FF', color: '#7E22CE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>EduVerse App Push</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Realtime parent app alerts</div>
          </div>
        </button>
      </div>
    </div>
  );
};
