import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  roleBadge?: string;
  roleTone?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs = [],
  title,
  subtitle,
  roleBadge = 'ACADEMIC OPERATIONS',
  roleTone = '#4f46e5',
  actions,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {breadcrumbs.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>/</span>}
              {b.href ? (
                <a href={b.href} style={{ color: '#64748b', textDecoration: 'none' }}>
                  {b.label}
                </a>
              ) : (
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(22px, 3.5vw, 28px)',
              color: '#0f172a',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              lineHeight: 1.2
            }}
          >
            {title}
            {roleBadge && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: `${roleTone}14`,
                  border: `1px solid ${roleTone}30`,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: roleTone,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {roleBadge}
              </span>
            )}
          </h1>
          {subtitle && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#64748b', margin: '6px 0 0 0', lineHeight: 1.4 }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
