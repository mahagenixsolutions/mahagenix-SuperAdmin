import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Sparkles, Users, Video } from 'lucide-react';
import type { AcademicAlert } from '../services/academicCommand.service';

interface Props {
  alerts: AcademicAlert[];
  workload: { teacher: string, periods: number, status: string }[];
}

export default function AcademicAlertsAndAIInsights({ alerts, workload }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      
      {/* Column 1: Alerts & Online Learning */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Alerts Widget */}
        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)',
          padding: '24px', boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
            <AlertTriangle size={18} color="var(--color-danger)" />
            Academic Alerts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{
                background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-md)',
                borderLeft: `3px solid ${alert.severity === 'high' ? 'var(--color-danger)' : alert.severity === 'medium' ? 'var(--color-warning)' : 'var(--color-info)'}`,
                display: 'flex', gap: 12, alignItems: 'center'
              }}>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{alert.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Learning Widget */}
        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)',
          padding: '24px', boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
            <Video size={18} color="var(--color-primary)" />
            Online Learning
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)' }}>14</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Live Classes Today</div>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-success)' }}>92%</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Avg Participation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: AI Insights & Workload */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* AI Insights Widget */}
        <div style={{
          background: 'linear-gradient(145deg, #312E81, #4F46E5)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.1)',
          padding: '24px', boxShadow: 'var(--shadow-md)', color: 'white'
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
            <Sparkles size={18} color="#FBBF24" />
            AI Academic Insights
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, opacity: 0.9 }}>
            <li><strong>Risk:</strong> Grade 11 Chemistry requires 3 additional periods this week to meet the syllabus target.</li>
            <li><strong>Recommendation:</strong> Reallocate Mrs. Rao (underutilized) to cover proxy classes for Grade 8 English.</li>
            <li><strong>Insight:</strong> Department performance in Mathematics is trending upwards by 8% compared to last term.</li>
          </ul>
        </div>

        {/* Teacher Workload Widget */}
        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)',
          padding: '24px', boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px 0' }}>
            <Users size={18} color="var(--color-primary)" />
            Teacher Workload
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {workload.map((teacher, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{teacher.teacher}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{teacher.periods} periods</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                    background: teacher.status === 'overloaded' ? 'var(--color-danger-surface)' : teacher.status === 'underutilized' ? 'var(--color-warning-surface)' : 'var(--color-success-surface)',
                    color: teacher.status === 'overloaded' ? 'var(--color-danger)' : teacher.status === 'underutilized' ? 'var(--color-warning)' : 'var(--color-success)'
                  }}>
                    {teacher.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
