import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { AttendancePoint } from '../services/principalDashboard.service';

interface Props {
  data: AttendancePoint[];
}

export default function AttendanceTrends({ data }: Props) {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span style={{ width: 4, height: 16, borderRadius: 2, background: '#22C55E', flexShrink: 0 }} />
        Attendance Trends
      </h3>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Legend color="#4F46E5" label="Students" />
        <Legend color="#22C55E" label="Teachers" />
      </div>

      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
            <XAxis
              dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={{ stroke: 'var(--border-subtle)' }}
              tickLine={false}
            />
            <YAxis
              domain={[85, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={{ stroke: 'var(--border-subtle)' }}
              tickLine={false}
              tickFormatter={v => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                borderRadius: 8, fontSize: 12, fontFamily: 'Inter, sans-serif',
              }}
              formatter={(val: number) => [`${val}%`]}
            />
            <Line
              type="monotone" dataKey="students" stroke="#4F46E5"
              strokeWidth={2.5} dot={{ r: 3, fill: '#4F46E5' }}
              activeDot={{ r: 5, fill: '#4F46E5' }}
            />
            <Line
              type="monotone" dataKey="teachers" stroke="#22C55E"
              strokeWidth={2.5} dot={{ r: 3, fill: '#22C55E' }}
              activeDot={{ r: 5, fill: '#22C55E' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%', background: color,
      }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)', padding: 20,
  boxShadow: 'var(--shadow-sm)', fontFamily: 'Inter, sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
  margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8,
};
