import type { NotificationItem } from '../services/principalDashboard.service';

interface Props {
  notifications: NotificationItem[];
}

const severityConfig = {
  critical: { color: '#EF4444', bg: 'var(--color-danger-surface)', icon: '🔴' },
  warning: { color: '#F59E0B', bg: 'var(--color-warning-surface)', icon: '🟡' },
  info: { color: '#0EA5E9', bg: 'var(--color-info-surface)', icon: '🔵' },
};

const typeIcons: Record<string, string> = {
  attendance: '📋', fees: '💰', exams: '📝',
  transport: '🚌', library: '📖', approvals: '✅',
};

export default function NotificationCenter({ notifications }: Props) {
  const grouped = {
    critical: notifications.filter(n => n.severity === 'critical'),
    warning: notifications.filter(n => n.severity === 'warning'),
    info: notifications.filter(n => n.severity === 'info'),
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={titleStyle}>
          <span style={{ width: 4, height: 16, borderRadius: 2, background: '#EF4444', flexShrink: 0 }} />
          Today's Alerts
        </h3>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99,
          background: 'var(--color-danger-surface)', color: 'var(--accent-danger)',
        }}>
          {notifications.length} alerts
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(['critical', 'warning', 'info'] as const).map(severity => (
          grouped[severity].map(n => {
            const sc = severityConfig[severity];
            return (
              <div key={n.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px', borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-raised)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `3px solid ${sc.color}`,
              }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                  {typeIcons[n.type] || '📌'}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    marginBottom: 2,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {n.title}
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3,
                      background: sc.bg, color: sc.color, textTransform: 'uppercase',
                    }}>
                      {severity}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {n.description}
                  </div>
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {n.time}
                </span>
              </div>
            );
          })
        ))}
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
  margin: 0, display: 'flex', alignItems: 'center', gap: 8,
};
