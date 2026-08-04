import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { SubjectScore, ClassRank } from '../services/principalDashboard.service';

interface Props {
  subjectScores: SubjectScore[];
  classRankings: ClassRank[];
}

export default function AcademicPerformance({ subjectScores, classRankings }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
      gap: 20,
    }}>
      {/* Subject Performance Chart */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>
          <span style={{ ...accentBar, background: '#4F46E5' }} />
          Subject Performance
        </h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={subjectScores} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis
                dataKey="subject" type="category" width={100}
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                  borderRadius: 8, fontSize: 12, fontFamily: 'Inter, sans-serif',
                }}
              />
              <Bar dataKey="avgScore" radius={[0, 4, 4, 0]} barSize={18}>
                {subjectScores.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Rankings Table */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>
          <span style={{ ...accentBar, background: '#10B981' }} />
          Class Rankings
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['#', 'Class', 'Avg Score', 'Attendance', 'Trend'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classRankings.map(c => (
                <tr key={`${c.className}-${c.section}`} style={trStyle}>
                  <td style={tdStyle}>
                    <span style={rankBadge(c.rank)}>{c.rank}</span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>
                    {c.className} {c.section}
                  </td>
                  <td style={tdStyle}>{c.avgScore}%</td>
                  <td style={tdStyle}>{c.attendance}%</td>
                  <td style={tdStyle}>
                    <span style={{
                      color: c.trend === 'up' ? 'var(--accent-success)'
                        : c.trend === 'down' ? 'var(--accent-danger)'
                        : 'var(--text-muted)',
                      fontWeight: 600,
                    }}>
                      {c.trend === 'up' ? '↑' : c.trend === 'down' ? '↓' : '→'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)', padding: 20,
  boxShadow: 'var(--shadow-sm)', fontFamily: 'Inter, sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
  margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8,
};

const accentBar: React.CSSProperties = {
  width: 4, height: 16, borderRadius: 2, flexShrink: 0,
};

const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '8px 12px', fontSize: 11,
  fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase',
  letterSpacing: '0.04em', borderBottom: '1px solid var(--border-subtle)',
};

const trStyle: React.CSSProperties = {
  transition: 'background 0.15s',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px', color: 'var(--text-secondary)',
  borderBottom: '1px solid var(--border-subtle)',
};

const rankBadge = (rank: number): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 24, height: 24, borderRadius: '50%', fontSize: 11, fontWeight: 700,
  background: rank <= 3 ? '#4F46E514' : 'var(--bg-tertiary)',
  color: rank <= 3 ? '#4F46E5' : 'var(--text-muted)',
});
