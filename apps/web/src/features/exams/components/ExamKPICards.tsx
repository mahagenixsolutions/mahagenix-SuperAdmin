import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  FileEdit, 
  Send, 
  Users, 
  UserCheck, 
  AlertTriangle, 
  TrendingUp 
} from 'lucide-react';

export const ExamKPICards: React.FC = () => {
  const kpis = [
    { title: 'Total Exams', value: '142', subtitle: 'This Academic Year', icon: <FileCheck size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#0F172A' },
    { title: 'Upcoming Exams', value: '38', subtitle: 'Scheduled next 30 days', icon: <Clock size={18} color="#F59E0B" />, bg: '#FEF3C7', color: '#B45309' },
    { title: 'Live Online Exams', value: '12 Live', subtitle: 'Secure browser active', icon: <PlayCircle size={18} color="#10B981" />, bg: '#ECFDF5', color: '#047857', isLive: true },
    { title: 'Completed Exams', value: '92', subtitle: 'Audited & archived', icon: <CheckCircle size={18} color="#3B82F6" />, bg: '#EFF6FF', color: '#1E40AF' },
    { title: 'Pending Evaluations', value: '18', subtitle: 'Answer scripts in queue', icon: <FileEdit size={18} color="#8B5CF6" />, bg: '#F3E8FF', color: '#6B21A8' },
    { title: 'Published Results', value: '4', subtitle: 'Portal report cards live', icon: <Send size={18} color="#10B981" />, bg: '#D1FAE5', color: '#065F46' },
    { title: 'Students Appearing', value: '1,420', subtitle: 'Eligible candidates', icon: <Users size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#3B7E5E' },
    { title: 'Teachers Assigned', value: '86', subtitle: 'Invigilators & evaluators', icon: <UserCheck size={18} color="#06B6D4" />, bg: '#CFFAFE', color: '#0E7490' },
    { title: 'Papers Pending Review', value: '7', subtitle: 'HOD approval required', icon: <AlertTriangle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'Avg Pass Percentage', value: '91.4%', subtitle: '+2.1% vs last term', icon: <TrendingUp size={18} color="#10B981" />, bg: '#D1FAE5', color: '#047857' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
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
            <div style={{ fontSize: '22px', fontWeight: 800, color: kpi.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
              {kpi.value}
              {kpi.isLive && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  background: '#10B981',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  textTransform: 'uppercase'
                }}>
                  Live
                </span>
              )}
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
