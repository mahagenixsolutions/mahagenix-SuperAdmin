import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, FileX, Clock, Users, BookX } from 'lucide-react';

export const AcademicRiskCenter: React.FC = () => {
  const riskCategories = [
    { title: 'Classes Behind Syllabus', count: '4 Sections', desc: 'Grade 9 History & Grade 12 Chemistry lag mid-term target', color: '#EF4444', icon: <BookX size={18} color="#EF4444" /> },
    { title: 'Teachers Missing Lesson Plans', count: '3 Teachers', desc: 'Weekly lesson plans pending HOD signoff > 48 hrs', color: '#F59E0B', icon: <FileX size={18} color="#F59E0B" /> },
    { title: 'Assignments Not Published', count: '6 Assignments', desc: 'Draft assignments created but not broadcasted', color: '#F59E0B', icon: <Clock size={18} color="#F59E0B" /> },
    { title: 'Exams Preparation Delay', count: '1 Paper', desc: 'Grade 12 Chemistry Q-paper missing HOTS items', color: '#EF4444', icon: <AlertTriangle size={18} color="#EF4444" /> },
    { title: 'Attendance Below Policy', count: '18 Students', desc: 'Candidates below mandatory 75% attendance rule', color: '#EF4444', icon: <Users size={18} color="#EF4444" /> },
    { title: 'Homework Compliance Drops', count: '2 Sections', desc: 'Grade 8 English homework turn-in dropped 4%', color: '#3B82F6', icon: <AlertTriangle size={18} color="#3B82F6" /> }
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
            background: '#FEF2F2',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Risk & Compliance Vulnerability Center
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time audit alerts flagging syllabus delays, missing lesson plans, and exam unreadiness.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '6px 14px', borderRadius: '20px' }}>
          3 Critical Risks Open
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {riskCategories.map((r) => (
          <div
            key={r.title}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {r.icon}
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{r.title}</h4>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: r.color }}>{r.count}</span>
            </div>

            <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
              {r.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
