import type { DashboardWidget } from '../../../mock/dashboards';

interface Props {
  widget: DashboardWidget;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  success: { bg: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-success)' },
  warning: { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)' },
  danger: { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)' },
  info: { bg: 'rgba(79, 142, 247, 0.1)', color: 'var(--accent-primary)' },
  neutral: { bg: 'var(--bg-surface-raised)', color: 'var(--text-secondary)' },
};

export default function DashboardWidgetCard({ widget }: Props) {
  return (
    <div className="card dashboard-card">
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)',
        fontWeight: 700, fontSize: 14, color: 'var(--text-primary)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 4, height: 16, borderRadius: 2,
          background: 'var(--accent-primary)',
        }} />
        {widget.title}
      </div>
      <div style={{ padding: '6px 0' }}>
        {widget.items.map((item, idx) => {
          const statusStyle = STATUS_COLORS[item.status || 'neutral'];
          return (
            <div
              key={idx}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 16px', gap: 10, transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-surface-raised)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                {item.icon && <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>}
                <span style={{
                  fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 500,
                  wordBreak: 'break-word', lineHeight: 1.3,
                }}>
                  {item.label}
                </span>
              </div>
              <span style={{
                fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.03em', padding: '3px 8px',
                borderRadius: 'var(--radius-sm)', flexShrink: 0,
                background: statusStyle.bg, color: statusStyle.color,
                border: `1px solid ${statusStyle.color}20`,
                whiteSpace: 'nowrap',
              }}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
