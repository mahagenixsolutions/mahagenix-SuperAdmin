import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, ChevronDown } from 'lucide-react';
import type { SubjectScore, ClassRank, AttendancePoint } from '../services/principalDashboard.service';

interface Props {
  subjectScores: SubjectScore[];
  classRankings: ClassRank[];
  attendanceTrends: AttendancePoint[];
}

export default function InsightsCharts({ subjectScores, classRankings, attendanceTrends }: Props) {
  // Format radar data
  const radarData = subjectScores.map(score => ({
    subject: score.subject,
    Score: score.avgScore,
  }));

  // Format attendance data for Mon-Sat week (only show first 6 points for Mon-Sat layout)
  const weeklyAttendance = attendanceTrends.slice(0, 6).map(point => ({
    day: point.day,
    Rate: point.students,
  }));

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {/* 1. Academic Performance radar chart */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#4F46E5', borderRadius: '2px' }} />
            Academic Performance
          </h3>
          <button style={{
            fontSize: '12px',
            fontWeight: 600,
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}>
            This Term <ChevronDown size={14} />
          </button>
        </div>

        <div style={{ height: '240px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" r="70%" data={radarData}>
              <PolarGrid stroke="var(--border-subtle)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
              <Radar name="Average Score" dataKey="Score" stroke="#818CF8" fill="#818CF8" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Class Rankings Table */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#0EA5E9', borderRadius: '2px' }} />
            Class Rankings
          </h3>
          <button
            onClick={() => alert('Viewing class rankings leaderboard...')}
            style={{ fontSize: '12px', fontWeight: 600, background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer' }}
          >
            View All ›
          </button>
        </div>

        <div style={{ padding: '12px 16px', flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '8px', color: 'var(--text-muted)', fontWeight: 500 }}>CLASS</th>
                <th style={{ padding: '8px', color: 'var(--text-muted)', fontWeight: 500 }}>AVG SCORE</th>
                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 500 }}>TREND</th>
              </tr>
            </thead>
            <tbody>
              {classRankings.slice(0, 6).map((rank, idx) => (
                <tr key={idx} style={{ borderBottom: idx < 5 ? '1px solid rgba(226, 232, 240, 0.5)' : 'none' }}>
                  <td style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Rank Badge */}
                    <span style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'rgba(99, 102, 241, 0.1)' : idx === 1 ? 'rgba(14, 165, 233, 0.1)' : 'var(--bg-tertiary)',
                      color: idx === 0 ? '#4F46E5' : idx === 1 ? '#0EA5E9' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{rank.className} {rank.section}</span>
                  </td>
                  <td style={{ padding: '10px 8px', color: 'var(--text-secondary)', fontWeight: 600 }}>{rank.avgScore}%</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                    {rank.trend === 'up' ? (
                      <span style={{ color: '#22C55E' }}>↑</span>
                    ) : rank.trend === 'down' ? (
                      <span style={{ color: '#EF4444' }}>↓</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Attendance Trend line chart */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#22C55E', borderRadius: '2px' }} />
            Attendance Trend
          </h3>
          <button style={{
            fontSize: '12px',
            fontWeight: 600,
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}>
            This Week <ChevronDown size={14} />
          </button>
        </div>

        <div style={{ padding: '20px 24px 12px 24px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            94.2%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>
            Overall Attendance
          </div>
        </div>

        <div style={{ height: '130px', padding: '0 16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyAttendance} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} hide />
              <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} />
              <Line type="monotone" dataKey="Rate" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontWeight: 600,
        }}>
          <span>vs last week</span>
          <span style={{ color: '#22C55E', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <TrendingUp size={12} /> +1.5%
          </span>
        </div>
      </div>
    </div>
  );
}
