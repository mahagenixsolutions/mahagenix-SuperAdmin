import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';

export const AttendanceKPICards: React.FC = () => {
  const kpis = [
    { title: 'Overall Attendance', value: '93.4%', subtitle: 'Institution Rate Today', icon: <TrendingUp size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#0F172A' },
    { title: 'Students Present', value: '2,456', subtitle: '93.4% of Enrolled', icon: <CheckCircle size={18} color="#10B981" />, bg: '#ECFDF5', color: '#047857' },
    { title: 'Students Absent', value: '146', subtitle: '5.5% Absenteeism', icon: <XCircle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'Late Arrivals', value: '32', subtitle: '1.1% Tardy Count', icon: <Clock size={18} color="#F59E0B" />, bg: '#FEF3C7', color: '#B45309' },
    { title: 'Teachers Submitted', value: '97%', subtitle: 'Morning Roster Live', icon: <UserCheck size={18} color="#3B82F6" />, bg: '#EFF6FF', color: '#1E40AF' },
    { title: 'Pending Attendance', value: '4 Classes', subtitle: 'Delayed >30 Mins', icon: <AlertTriangle size={18} color="#EF4444" />, bg: '#FEF2F2', color: '#DC2626' },
    { title: 'Attendance Compliance', value: '98%', subtitle: 'Board Policy Score', icon: <ShieldCheck size={18} color="#10B981" />, bg: '#D1FAE5', color: '#047857' },
    { title: 'Students At Risk', value: '18', subtitle: 'Below 75% Threshold', icon: <AlertTriangle size={18} color="#8B5CF6" />, bg: '#F3E8FF', color: '#6B21A8' }
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
