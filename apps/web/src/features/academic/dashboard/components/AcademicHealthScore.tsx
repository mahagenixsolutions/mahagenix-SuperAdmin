import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CalendarCheck, BookOpen, FileText, CheckCircle2, Clock } from 'lucide-react';
import type { AcademicHealthMetrics } from '../services/academicCommand.service';

interface Props {
  metrics: AcademicHealthMetrics;
}

export default function AcademicHealthScore({ metrics }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'var(--color-success)';
    if (score >= 75) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const MetricItem = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.05, transform: 'scale(2.5)' }}>
        <Icon size={48} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, zIndex: 1 }}>
        <Icon size={16} color={getScoreColor(value)} />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', zIndex: 1 }}>
        {value}%
      </div>
      <div style={{
        width: '100%', height: 4, background: 'var(--bg-secondary)', borderRadius: 2, marginTop: 12, overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ height: '100%', background: getScoreColor(value), borderRadius: 2 }}
        />
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <Activity size={20} color="var(--color-primary)" />
            Academic Health & Planning
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Real-time assessment of operational readiness and execution.
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary), #818CF8)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
        }}>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, opacity: 0.9 }}>
            Overall Score
          </span>
          <span style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>
            {metrics.overallReadiness}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
        <MetricItem label="Timetable Health" value={metrics.timetableHealth} icon={Clock} />
        <MetricItem label="Curriculum Progress" value={metrics.curriculumCompletion} icon={BookOpen} />
        <MetricItem label="Exam Readiness" value={metrics.examinationReadiness} icon={FileText} />
        <MetricItem label="Lesson Plan Compliance" value={metrics.lessonPlanCompliance} icon={CheckCircle2} />
        <MetricItem label="Teacher Allocation" value={metrics.teacherAllocation} icon={CalendarCheck} />
      </div>
    </div>
  );
}
