import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Heart, Building2, Layers } from 'lucide-react';

export const TargetAudiencePanel: React.FC = () => {
  const audiences = [
    { name: 'All Teachers', count: '86 Faculty', icon: <Users size={16} color="#3B7E5E" /> },
    { name: 'All Students', count: '2,456 Students', icon: <GraduationCap size={16} color="#3B82F6" /> },
    { name: 'All Parents', count: '2,380 Parents', icon: <Heart size={16} color="#8B5CF6" /> },
    { name: 'Specific Grades (9-12)', count: '1,240 Senior Cohort', icon: <Layers size={16} color="#F59E0B" /> },
    { name: 'Department Heads (HODs)', count: '6 HOD Members', icon: <Building2 size={16} color="#10B981" /> }
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
            <Users size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Target Audience Estimator & Recipient Reach Matrix
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Granular audience segmentation for targeted academic circular dispatches.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {audiences.map((aud) => (
          <div
            key={aud.name}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {aud.icon}
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{aud.name}</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3B7E5E' }}>{aud.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
