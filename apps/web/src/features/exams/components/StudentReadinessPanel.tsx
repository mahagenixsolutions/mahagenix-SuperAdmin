import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Users, 
  CreditCard, 
  Ticket, 
  Laptop, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';

export const StudentReadinessPanel: React.FC = () => {
  const readinessItems = [
    { title: 'Students Eligible', value: '1,420 / 1,450', subtitle: 'Attendance & Criteria Met', icon: <Users size={16} color="#3B7E5E" />, pct: 97.9, color: '#3B7E5E' },
    { title: 'Fees Cleared', value: '96%', subtitle: 'Tuition & Exam Dues Paid', icon: <CreditCard size={16} color="#10B981" />, pct: 96, color: '#10B981' },
    { title: 'Hall Tickets Issued', value: '94%', subtitle: 'Admit Cards Generated', icon: <Ticket size={16} color="#8B5CF6" />, pct: 94, color: '#8B5CF6' },
    { title: 'Technical Readiness', value: '98%', subtitle: 'Secure Browser Verified', icon: <Laptop size={16} color="#3B82F6" />, pct: 98, color: '#3B82F6' },
    { title: 'Mock Exam Completed', value: '91%', subtitle: 'Practice Test Passed', icon: <CheckCircle2 size={16} color="#3B7E5E" />, pct: 91, color: '#3B7E5E' },
    { title: 'Special Accommodations', value: '14 Granted', subtitle: 'IEP & Extra Time Approved', icon: <HelpCircle size={16} color="#F59E0B" />, pct: 100, color: '#F59E0B' }
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
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Student Examination Eligibility & Technical Readiness
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Pre-exam candidate clearance tracking for hall tickets, fee compliance, and system readiness.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          94% Candidates Fully Ready
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {readinessItems.map((item) => (
          <div
            key={item.title}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                {item.title}
              </span>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                {item.subtitle}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '2px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
