import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface HeroBannerAction {
  label: string;
  onClick?: () => void;
  primary?: boolean;
}

export interface HeroBannerProps {
  title: string;
  description: string;
  badge?: string;
  liveStatus?: string;
  quickActions?: HeroBannerAction[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  badge = 'COMMAND CENTER',
  liveStatus = 'Live Academic Feed Active',
  quickActions = [],
}) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        borderRadius: '20px',
        padding: '32px',
        color: 'white',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        boxShadow: '0 10px 25px -3px rgba(30, 27, 75, 0.25)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {badge && (
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              {badge}
            </span>
          )}
          {liveStatus && (
            <span style={{ fontSize: '13px', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              {liveStatus}
            </span>
          )}
        </div>
        <h2 style={{ margin: '0 0 8px 0', fontSize: 'clamp(22px, 3vw, 26px)', fontWeight: 800, lineHeight: 1.2 }}>
          {title}
        </h2>
        <p style={{ margin: 0, color: '#a5b4fc', fontSize: '14px', maxWidth: '640px', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      {quickActions.length > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '14px',
            padding: '16px',
            flex: '0 1 280px',
            width: '100%',
            maxWidth: '280px'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#e0e7ff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Quick Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {quickActions.map((act, idx) => (
              <button
                key={idx}
                onClick={act.onClick}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: act.primary ? 'white' : 'rgba(255,255,255,0.15)',
                  color: act.primary ? '#312e81' : 'white',
                  border: act.primary ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{act.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
