import React from 'react';

export interface KPICardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  tone?: string;
  bg?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  status?: {
    label: string;
    tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  };
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  icon,
  tone = '#3b82f6',
  bg = '#eff6ff',
  trend,
  status,
  onClick,
}) => {
  const getStatusStyle = (type?: string) => {
    switch (type) {
      case 'success':
        return { bg: '#ecfdf5', color: '#10b981', border: '1px solid #a7f3d0' };
      case 'warning':
        return { bg: '#fffbeb', color: '#f59e0b', border: '1px solid #fde68a' };
      case 'danger':
        return { bg: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' };
      case 'info':
      default:
        return { bg: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' };
    }
  };

  return (
    <div
      onClick={onClick}
      className="academic-card kpi-card-item"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: onClick ? 'pointer' : 'default',
        boxSizing: 'border-box',
        height: '100%',
        minHeight: '130px',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {label}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {value}
          </div>
        </div>
        {icon && (
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: bg,
              color: tone,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {trend && (
          <div style={{ fontSize: '12px', fontWeight: 600, color: trend.isPositive ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{trend.value}</span>
          </div>
        )}
        {status && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
              marginLeft: 'auto',
              background: getStatusStyle(status.tone).bg,
              color: getStatusStyle(status.tone).color,
              border: getStatusStyle(status.tone).border,
            }}
          >
            {status.label}
          </span>
        )}
      </div>
    </div>
  );
};
