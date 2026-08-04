import type { TeacherSummary } from '../services/principalDashboard.service';

interface Props {
  teachers: TeacherSummary[];
  pendingLeaves: number;
}

export default function TeacherOverview({ teachers, pendingLeaves }: Props) {
  const avgAttendance = teachers.length
    ? (teachers.reduce((s, t) => s + t.attendance, 0) / teachers.length).toFixed(1)
    : '—';

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span style={{ width: 4, height: 16, borderRadius: 2, background: '#0EA5E9', flexShrink: 0 }} />
        Teacher Overview
      </h3>

      {/* Stats strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
        gap: 12, marginBottom: 16,
      }}>
        <MiniStat label="Total Teachers" value={String(teachers.length)} color="#0EA5E9" />
        <MiniStat label="Avg Attendance" value={`${avgAttendance}%`} color="#22C55E" />
        <MiniStat label="Pending Leaves" value={String(pendingLeaves)} color="#F59E0B" />
      </div>

      {/* Top teachers table */}
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Top Performing Teachers
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {teachers.slice(0, 5).map(t => (
          <div key={t.id} style={rowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <div style={avatarStyle}>
                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {t.subject} · {t.classes} classes
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  ⭐ {t.rating}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  {t.attendance}% att.
                </div>
              </div>
            </div>
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

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '10px 12px', background: 'var(--bg-surface-raised)',
  borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
};

const avatarStyle: React.CSSProperties = {
  width: 32, height: 32, borderRadius: '50%', fontSize: 11, fontWeight: 700,
  background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)', color: 'white',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};
