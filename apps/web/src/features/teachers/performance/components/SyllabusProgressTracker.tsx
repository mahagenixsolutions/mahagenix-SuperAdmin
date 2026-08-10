import React from 'react';
import { motion } from 'framer-motion';
import { departmentProgressData } from '../mockData';
import { Layers, TrendingUp, AlertTriangle } from 'lucide-react';

export const SyllabusProgressTracker: React.FC = () => {
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
            <Layers size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Department-Wise Syllabus & Curriculum Progress
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Planned vs actual chapter delivery progress ahead of Term Examinations.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {departmentProgressData.map((d) => (
          <div key={d.dept} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
              <span>{d.dept}</span>
              <span style={{ color: d.completion >= d.target ? '#3B7E5E' : '#DC2626' }}>
                {d.completion}% (Target: {d.target}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${d.completion}%`, height: '100%', background: d.completion >= d.target ? '#5FAF88' : '#F59E0B', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
