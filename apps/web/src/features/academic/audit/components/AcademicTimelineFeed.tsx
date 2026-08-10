import React from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle2, Award, FileText } from 'lucide-react';

export const AcademicTimelineFeed: React.FC = () => {
  const events = [
    { title: 'Mathematics Department Audit Completed', time: 'Today, 10:30 AM', actor: 'Dr. Rajesh Sharma & Quality Cell', badge: 'Audit Closed' },
    { title: 'Grade 11 Physics Lesson Plans Approved', time: 'Today, 09:15 AM', actor: 'Mrs. Kavitha Menon', badge: '100% Compliant' },
    { title: 'Homework Compliance Benchmark Achieved', time: 'Yesterday, 04:45 PM', actor: 'Academic Quality Cell', badge: '92% Score' },
    { title: 'Assessment Moderation Session Completed', time: 'Aug 04, 2026', actor: 'Academic Board', badge: 'Verified' }
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
            <History size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Audit Activity Stream & Log
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time log of milestone approvals, department inspections, and moderation events.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((ev, idx) => (
          <div
            key={idx}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#3B7E5E" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{ev.title}</span>
                <span style={{ background: '#ECFDF5', color: '#047857', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>{ev.badge}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{ev.actor}</div>
            </div>

            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
