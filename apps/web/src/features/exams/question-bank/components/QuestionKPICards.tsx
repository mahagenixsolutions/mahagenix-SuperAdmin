import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  FileText, 
  Code, 
  Layers, 
  BarChart 
} from 'lucide-react';

export const QuestionKPICards: React.FC = () => {
  const kpis = [
    { title: 'Total Questions', value: '18,420', subtitle: 'All Grade Levels', icon: <BookOpen size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#0F172A' },
    { title: 'Approved Questions', value: '16,980', subtitle: 'Ready for Exams', icon: <CheckCircle size={18} color="#10B981" />, bg: '#ECFDF5', color: '#047857' },
    { title: 'Pending Review', value: '245', subtitle: 'Awaiting HOD Signoff', icon: <Clock size={18} color="#F59E0B" />, bg: '#FEF3C7', color: '#B45309' },
    { title: 'MCQ Questions', value: '9,210', subtitle: '50% of Repository', icon: <HelpCircle size={18} color="#3B82F6" />, bg: '#EFF6FF', color: '#1E40AF' },
    { title: 'Descriptive Questions', value: '4,605', subtitle: '25% Short/Long Answer', icon: <FileText size={18} color="#8B5CF6" />, bg: '#F3E8FF', color: '#6B21A8' },
    { title: 'Coding Problems', value: '1,842', subtitle: 'C++, Python, Java', icon: <Code size={18} color="#06B6D4" />, bg: '#CFFAFE', color: '#0E7490' },
    { title: 'Case Study Items', value: '2,763', subtitle: 'CBSE HOTS Format', icon: <Layers size={18} color="#10B981" />, bg: '#D1FAE5', color: '#065F46' },
    { title: 'Average Difficulty', value: '3.4 / 5', subtitle: 'Balanced Assessment', icon: <BarChart size={18} color="#3B7E5E" />, bg: '#EAF5F0', color: '#3B7E5E' }
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
