import React from 'react';
import { motion } from 'framer-motion';
import { absenceReasonData } from '../mockData';
import { PieChart, HelpCircle, Activity } from 'lucide-react';

export const AbsenceReasonAnalytics: React.FC = () => {
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
            <PieChart size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Absence Reason Categorization Analytics
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Breakdown of verified absence notes (Medical, Personal Leave, Unapproved, Sports).
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Progress Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {absenceReasonData.map((item) => (
          <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
              <span>{item.name}</span>
              <span style={{ color: item.fill }}>{item.value}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${item.value}%`, height: '100%', background: item.fill, borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
