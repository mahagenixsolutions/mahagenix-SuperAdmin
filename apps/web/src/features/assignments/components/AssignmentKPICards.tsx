import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Award 
} from 'lucide-react';

export const AssignmentKPICards: React.FC = () => {
  const kpis = [
    { title: 'Active Assignments', value: '124', subtitle: 'Currently Open', icon: <FileText size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#0F172A' },
    { title: 'Completed Assignments', value: '84', subtitle: 'Marks Archived', icon: <CheckCircle size={18} color="#10B981" />, bg: '#ECFDF5', color: '#047857' },
    { title: 'Pending Evaluations', value: '22', subtitle: 'Answer Scripts Queue', icon: <Clock size={18} color="#F59E0B" />, bg: '#FEF3C7', color: '#B45309' },
    { title: 'Teachers Pending Publish', value: '8', subtitle: 'Drafts Awaiting Release', icon: <UserCheck size={18} color="#3B82F6" />, bg: '#EFF6FF', color: '#1E40AF' },
    { title: 'Late Submissions', value: '42', subtitle: 'Submitted Past Deadline', icon: <AlertTriangle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'Students Submitted', value: '1,380', subtitle: 'Active Turn-ins', icon: <Users size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#3B7E5E' },
    { title: 'Average Marks', value: '84.2%', subtitle: '+3.1% vs previous month', icon: <TrendingUp size={18} color="#10B981" />, bg: '#D1FAE5', color: '#047857' },
    { title: 'Quality Score', value: '95%', subtitle: 'Rubric Compliance', icon: <Award size={18} color="#8B5CF6" />, bg: '#F3E8FF', color: '#6B21A8' }
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
