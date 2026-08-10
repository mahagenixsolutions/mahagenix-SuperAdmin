import React from 'react';
import { motion } from 'framer-motion';
import type { ClassroomObservationItem } from '../types';
import { Eye, Star, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';

interface ClassroomObservationFeedProps {
  observations: ClassroomObservationItem[];
}

export const ClassroomObservationFeed: React.FC<ClassroomObservationFeedProps> = ({ observations }) => {
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
            <Eye size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Classroom Observation & Audit Stream
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Supervisory evaluations conducted by HODs and Academic Coordinators.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Observation SLA Active
        </span>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {observations.map((obs) => (
          <div
            key={obs.id}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={obs.teacherAvatar} alt={obs.teacherName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                    {obs.teacherName}
                  </h4>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{obs.subject} ({obs.grade})</div>
                </div>
              </div>

              <span style={{
                background: obs.status === 'Completed' ? '#ECFDF5' : '#FEF3C7',
                color: obs.status === 'Completed' ? '#047857' : '#B45309',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {obs.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #F1F5F9', textAlign: 'center', fontSize: '11px' }}>
              <div>
                <div style={{ color: '#94A3B8', fontWeight: 600 }}>Pedagogy</div>
                <div style={{ fontWeight: 800, color: '#3B7E5E', marginTop: '2px' }}>★ {obs.pedagogyScore}/5</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontWeight: 600 }}>Engagement</div>
                <div style={{ fontWeight: 800, color: '#3B7E5E', marginTop: '2px' }}>★ {obs.engagementScore}/5</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontWeight: 600 }}>Management</div>
                <div style={{ fontWeight: 800, color: '#3B7E5E', marginTop: '2px' }}>★ {obs.managementScore}/5</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
              <span>Observer: {obs.observerName}</span>
              <span>{obs.observationDate}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
