import type { StudentAlert } from '../services/principalDashboard.service';

interface Props {
  alerts: StudentAlert[];
  topPerformers: { name: string; className: string; score: number; rank: number }[];
}

export default function StudentOverview({ alerts, topPerformers }: Props) {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span style={{ width: 4, height: 16, borderRadius: 2, background: '#EC4899', flexShrink: 0 }} />
        Student Overview
      </h3>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
        gap: 12, marginBottom: 16,
      }}>
        <MiniStat
          label="Critical Alerts"
          value={String(alerts.filter(a => a.severity === 'critical').length)}
          color="#EF4444"
        />
        <MiniStat
          label="Warnings"
          value={String(alerts.filter(a => a.severity === 'warning').length)}
          color="#F59E0B"
        />
        <MiniStat
          label="Top Scorer"
          value={`${topPerformers[0]?.score ?? '—'}%`}
          color="#22C55E"
        />
      </div>

      {/* Alerts */}
      <div style={sectionLabel}>Students Requiring Attention</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {alerts.slice(0, 4).map(alert => (
          <div key={alert.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', background: 'var(--bg-surface-raised)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              background: alert.severity === 'critical' ? '#EF4444'
                : alert.severity === 'warning' ? '#F59E0B' : '#0EA5E9',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                {alert.name}
                <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>
                  {alert.className}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                {alert.issue}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers */}
      <div style={sectionLabel}>Top Performers</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {topPerformers.slice(0, 4).map(s => (
          <div key={s.rank} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', background: 'var(--bg-surface-raised)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={rankBadge(s.rank)}>#{s.rank}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.className}</div>
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#22C55E' }}>{s.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      padding: '10px 12px', background: 'var(--bg-surface-raised)',
      borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color, letterSpacing: '-0.02em' }}>
        {value}
      </div>
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
  margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8,
};

const sectionLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8,
};

const rankBadge = (rank: number): React.CSSProperties => ({
  fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
  background: rank <= 3 ? '#4F46E514' : 'var(--bg-tertiary)',
  color: rank <= 3 ? '#4F46E5' : 'var(--text-muted)',
});
