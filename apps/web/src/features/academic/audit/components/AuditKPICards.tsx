import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Building2, 
  Clock, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Award, 
  FileCheck 
} from 'lucide-react';

export const AuditKPICards: React.FC = () => {
  const kpis = [
    { title: 'Academic Compliance', value: '94%', subtitle: 'Institutional Standard', icon: <ShieldCheck size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#0F172A' },
    { title: 'Departments Audited', value: '6 / 6', subtitle: '100% Dept Coverage', icon: <Building2 size={18} color="#10B981" />, bg: '#ECFDF5', color: '#047857' },
    { title: 'Pending Audits', value: '2', subtitle: 'Scheduled for Aug 12', icon: <Clock size={18} color="#F59E0B" />, bg: '#FEF3C7', color: '#B45309' },
    { title: 'Critical Findings', value: '3', subtitle: 'Corrective Action Open', icon: <AlertTriangle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'High Risk Classes', value: '4', subtitle: 'Syllabus Lag Alert', icon: <AlertTriangle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'Teacher Compliance', value: '95.8%', subtitle: 'Lesson Plan & Marking', icon: <Users size={18} color="#3B82F6" />, bg: '#EFF6FF', color: '#1E40AF' },
    { title: 'Curriculum Completion', value: '91%', subtitle: 'On Track for Mid-Term', icon: <TrendingUp size={18} color="#10B981" />, bg: '#D1FAE5', color: '#047857' },
    { title: 'Overall Academic Score', value: '95 / 100', subtitle: 'CBSE Quality Benchmark', icon: <Award size={18} color="#8B5CF6" />, bg: '#F3E8FF', color: '#6B21A8' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
      gap: '14px'
    }}>
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.03 }}
          whileHover={{ y: -2, boxShadow: '0 6px 20px -2px rgba(95, 175, 136, 0.12)' }}
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
              {kpi.title}
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: kpi.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {kpi.icon}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: kpi.color }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', fontWeight: 500 }}>
              {kpi.subtitle}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
