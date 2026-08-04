import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { label: 'Approve Admission', icon: '✅', to: '/principal/approvals', color: '#4F46E5' },
  { label: 'Create Announcement', icon: '📢', to: '/communication', color: '#F59E0B' },
  { label: 'Schedule Meeting', icon: '📅', to: '/events', color: '#10B981' },
  { label: 'Review Attendance', icon: '📋', to: '/attendance', color: '#0EA5E9' },
  { label: 'Review Results', icon: '📊', to: '/exams', color: '#8B5CF6' },
  { label: 'View Reports', icon: '📈', to: '/reports', color: '#06B6D4' },
  { label: 'Export Reports', icon: '📥', to: '/reports', color: '#64748B' },
  { label: 'Message Teachers', icon: '👩‍🏫', to: '/communication', color: '#EC4899' },
  { label: 'Message Parents', icon: '👪', to: '/communication', color: '#F97316' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        <span style={{ width: 4, height: 16, borderRadius: 2, background: '#4F46E5', flexShrink: 0 }} />
        Quick Actions
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 10,
      }}>
        {ACTIONS.map(action => (
          <ActionButton key={action.label} action={action} onClick={() => navigate(action.to)} />
        ))}
      </div>
    </div>
  );
}

function ActionButton({ action, onClick }: {
  action: typeof ACTIONS[0]; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 8,
        padding: '14px 8px',
        background: hovered ? `${action.color}0A` : 'var(--bg-surface-raised)',
        border: `1px solid ${hovered ? action.color : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      }}
    >
      <span style={{ fontSize: 22 }}>{action.icon}</span>
      <span style={{
        fontSize: 11, fontWeight: 600,
        color: hovered ? action.color : 'var(--text-secondary)',
        textAlign: 'center', lineHeight: 1.3,
      }}>
        {action.label}
      </span>
    </button>
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
