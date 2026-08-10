import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';

export const StudentEngagementPanel: React.FC = () => {
  const topClasses = [
    { name: 'Grade 10 Section A', rate: '98.2%', turnins: '44/45', status: 'Optimal' },
    { name: 'Grade 8 Section B', rate: '96.5%', turnins: '41/42', status: 'Optimal' },
    { name: 'Grade 11 Section B', rate: '93.4%', turnins: '39/42', status: 'Optimal' }
  ];

  const leastActiveClasses = [
    { name: 'Grade 9 Section B', rate: '66.7%', turnins: '32/48', status: 'Needs Attention' },
    { name: 'Grade 12 Section A', rate: '70.0%', turnins: '28/40', status: 'Warning' }
  ];

  const studentsNeedingAttention = [
    { name: 'Aarav Patel (Grade 9 B)', missed: 4, lastActive: '3 days ago' },
    { name: 'Rohan Gupta (Grade 12 A)', missed: 3, lastActive: '2 days ago' },
    { name: 'Sanya Malhotra (Grade 11 C)', missed: 3, lastActive: 'Yesterday' }
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
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Student Engagement & At-Risk Monitoring
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Class-level engagement benchmarks, top performing sections, and students requiring academic counseling.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {/* Most Active Classes */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="#10B981" /> Most Active Classes
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topClasses.map(c => (
              <div key={c.name} style={{ background: 'white', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{c.turnins} Turn-ins</div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#10B981' }}>{c.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Least Active Classes */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} color="#F59E0B" /> Least Active Sections
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leastActiveClasses.map(c => (
              <div key={c.name} style={{ background: 'white', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FCA5A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{c.turnins} Turn-ins</div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#DC2626' }}>{c.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Students Needing Attention */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} color="#EF4444" /> Students Needing Intervention
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {studentsNeedingAttention.map(s => (
              <div key={s.name} style={{ background: '#FEF2F2', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FCA5A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#991B1B' }}>{s.name}</div>
                  <div style={{ fontSize: '10px', color: '#B45309' }}>Last Active: {s.lastActive}</div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#DC2626', background: 'white', padding: '2px 6px', borderRadius: '4px' }}>
                  {s.missed} Missed
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
