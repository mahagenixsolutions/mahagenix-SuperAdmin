import type { CalendarEvent } from '../services/principalDashboard.service';

interface Props {
  events: CalendarEvent[];
}

const typeConfig: Record<string, { color: string; icon: string }> = {
  exam: { color: '#EF4444', icon: '📝' },
  event: { color: '#8B5CF6', icon: '🎪' },
  meeting: { color: '#0EA5E9', icon: '🤝' },
  holiday: { color: '#22C55E', icon: '🌴' },
  sports: { color: '#F97316', icon: '🏅' },
};

export default function UpcomingSchedule({ events }: Props) {
  const todayEvents = events.filter(e => e.status === 'today');
  const upcomingEvents = events.filter(e => e.status === 'upcoming');

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span style={{ width: 4, height: 16, borderRadius: 2, background: '#F59E0B', flexShrink: 0 }} />
        Upcoming Schedule
      </h3>

      {/* Today section */}
      {todayEvents.length > 0 && (
        <>
          <div style={sectionLabel}>Today</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {todayEvents.map(e => (
              <EventRow key={e.id} event={e} isToday />
            ))}
          </div>
        </>
      )}

      {/* Upcoming section */}
      <div style={sectionLabel}>Upcoming</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {upcomingEvents.map(e => (
          <EventRow key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}

function EventRow({ event, isToday }: { event: CalendarEvent; isToday?: boolean }) {
  const cfg = typeConfig[event.type] || { color: '#64748B', icon: '📌' };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      background: isToday ? `${cfg.color}08` : 'var(--bg-surface-raised)',
      border: `1px solid ${isToday ? cfg.color + '30' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-md)',
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{cfg.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {event.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
          {event.date}
        </div>
      </div>
      <span style={{
        fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
        background: `${cfg.color}14`, color: cfg.color, textTransform: 'uppercase',
      }}>
        {event.type}
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
  margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8,
};

const sectionLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8,
};
