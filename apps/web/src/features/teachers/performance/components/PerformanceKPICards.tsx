import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  AlertTriangle, 
  Star, 
  TrendingUp, 
  CheckCircle, 
  FileText, 
  Heart 
} from 'lucide-react';

export const PerformanceKPICards: React.FC = () => {
  const kpis = [
    { title: 'Active Faculty Members', value: '86', subtitle: '6 Academic Departments', icon: <Users size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#0F172A' },
    { title: 'Top Tier Educators (A+)', value: '34', subtitle: '39.5% Outstanding Tier', icon: <Award size={18} color="#10B981" />, bg: '#ECFDF5', color: '#047857' },
    { title: 'Faculty Under PIP', value: '6', subtitle: 'Peer Mentoring Assigned', icon: <AlertTriangle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'Avg Student Satisfaction', value: '4.8 / 5', subtitle: '+0.2 vs last term', icon: <Star size={18} color="#F59E0B" />, bg: '#FEF3C7', color: '#B45309' },
    { title: 'Syllabus Execution Rate', value: '96.4%', subtitle: 'On Track for Term Exams', icon: <TrendingUp size={18} color="#3B82F6" />, bg: '#EFF6FF', color: '#1E40AF' },
    { title: 'Marking SLA Compliance', value: '95.8%', subtitle: '< 48-Hour Turnaround', icon: <CheckCircle size={18} color="#10B981" />, bg: '#D1FAE5', color: '#047857' },
    { title: 'Lesson Plan Alignment', value: '94.2%', subtitle: 'Verified by HODs', icon: <FileText size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#3B7E5E' },
    { title: 'Parent Rating Index', value: '4.7 / 5', subtitle: 'Quarterly Audit Score', icon: <Heart size={18} color="#8B5CF6" />, bg: '#F3E8FF', color: '#6B21A8' }
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
