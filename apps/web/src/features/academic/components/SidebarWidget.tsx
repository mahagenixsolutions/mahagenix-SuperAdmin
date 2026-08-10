import React from 'react';

export interface SidebarWidgetProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  bg?: string;
  borderColor?: string;
}

export const SidebarWidget: React.FC<SidebarWidgetProps> = ({
  title,
  icon,
  action,
  children,
  bg = 'rgba(255, 255, 255, 0.94)',
  borderColor = 'rgba(226, 232, 240, 0.85)',
}) => {
  return (
    <div
      className="academic-card"
      style={{
        background: bg,
        borderColor: borderColor,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="academic-card-title">
          {icon && <span style={{ display: 'inline-flex', marginRight: '6px' }}>{icon}</span>}
          {title}
        </h3>
        {action && <div>{action}</div>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
    </div>
  );
};
