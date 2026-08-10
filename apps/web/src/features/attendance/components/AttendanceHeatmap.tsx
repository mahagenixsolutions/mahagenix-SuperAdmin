import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Calendar, AlertTriangle } from 'lucide-react';

export const AttendanceHeatmap: React.FC = () => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const gradesData = [
    { grade: 'Grade 8', scores: [96.2, 97.1, 96.5, 95.8, 93.4] },
    { grade: 'Grade 9', scores: [92.1, 94.0, 93.2, 91.5, 85.2] }, // Friday drop
    { grade: 'Grade 10', scores: [97.5, 98.1, 97.2, 96.9, 94.8] },
    { grade: 'Grade 11', scores: [93.0, 94.5, 93.8, 92.1, 86.0] }, // Friday drop
    { grade: 'Grade 12', scores: [92.8, 93.9, 93.1, 91.8, 86.4] }  // Friday drop
  ];

  const getColor = (pct: number) => {
    if (pct >= 96) return { bg: '#D1FAE5', color: '#065F46' };
    if (pct >= 92) return { bg: '#EAF5F0', color: '#3B7E5E' };
    if (pct >= 88) return { bg: '#FEF3C7', color: '#B45309' };
    return { bg: '#FEF2F2', color: '#991B1B' }; // < 88%
  };

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
            <Grid size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Institution Weekday Attendance Pattern Heatmap
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Identifies recurring weekday absenteeism patterns across grade levels.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '4px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={13} /> Friday Pattern Alert (85.2%)
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '8px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', color: '#64748B', fontWeight: 700 }}>Grade Level</th>
              {weekdays.map(d => (
                <th key={d} style={{ padding: '8px', fontSize: '12px', color: '#64748B', fontWeight: 700 }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gradesData.map(row => (
              <tr key={row.grade}>
                <td style={{ textAlign: 'left', padding: '8px', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{row.grade}</td>
                {row.scores.map((score, i) => {
                  const c = getColor(score);
                  return (
                    <td key={i} style={{ background: c.bg, color: c.color, borderRadius: '8px', padding: '12px 8px', fontSize: '13px', fontWeight: 800 }}>
                      {score}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
