import React from 'react';
import { motion } from 'framer-motion';
import { Send, Smartphone, Mail, MessageSquare, Bell, CheckCircle2 } from 'lucide-react';

export const NoticeDeliveryAnalytics: React.FC = () => {
  const channels = [
    { channel: 'EduVerse App Notification', reach: '98%', count: '2,408 Delivered', icon: <Smartphone size={16} color="#3B7E5E" /> },
    { channel: 'Official Email Broadcast', reach: '96%', count: '2,357 Delivered', icon: <Mail size={16} color="#3B82F6" /> },
    { channel: 'SMS Advisory Dispatch', reach: '94%', count: '2,308 Delivered', icon: <MessageSquare size={16} color="#10B981" /> },
    { channel: 'Real-Time App Push Alert', reach: '95%', count: '2,333 Delivered', icon: <Bell size={16} color="#8B5CF6" /> }
  ];

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
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Send size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Multi-Channel Notice Delivery Status & Telemetry
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time delivery confirmation across App, Email, SMS, and Push notifications.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '6px 14px', borderRadius: '20px' }}>
          96.4% Overall Delivery SLA
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px'
      }}>
        {channels.map((ch) => (
          <div
            key={ch.channel}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {ch.icon}
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{ch.channel}</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              {ch.reach}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>{ch.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
