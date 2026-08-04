import React, { useState } from 'react';

export interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  accentColor?: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | string;
  subtitle?: string;
  badge?: string;
  progress?: number;
  colSpan?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const TONE_PRESETS: Record<string, {
  accent: string;
  gradient: string;
  bgTint: string;
  borderGlow: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
  pulseColor: string;
}> = {
  primary: {
    accent: '#4F46E5',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
    bgTint: 'rgba(79, 70, 229, 0.025)',
    borderGlow: 'rgba(79, 70, 229, 0.25)',
    iconBg: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
    iconColor: '#4F46E5',
    badgeBg: '#EEF2FF',
    badgeText: '#4338CA',
    glowColor: 'rgba(79, 70, 229, 0.14)',
    pulseColor: '#6366F1',
  },
  success: {
    accent: '#10B981',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    bgTint: 'rgba(16, 185, 129, 0.025)',
    borderGlow: 'rgba(16, 185, 129, 0.25)',
    iconBg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    iconColor: '#059669',
    badgeBg: '#ECFDF5',
    badgeText: '#047857',
    glowColor: 'rgba(16, 185, 129, 0.14)',
    pulseColor: '#10B981',
  },
  warning: {
    accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    bgTint: 'rgba(245, 158, 11, 0.025)',
    borderGlow: 'rgba(245, 158, 11, 0.25)',
    iconBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    iconColor: '#D97706',
    badgeBg: '#FFFBEB',
    badgeText: '#B45309',
    glowColor: 'rgba(245, 158, 11, 0.14)',
    pulseColor: '#F59E0B',
  },
  danger: {
    accent: '#F43F5E',
    gradient: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 100%)',
    bgTint: 'rgba(244, 63, 94, 0.025)',
    borderGlow: 'rgba(244, 63, 94, 0.25)',
    iconBg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
    iconColor: '#E11D48',
    badgeBg: '#FFF1F2',
    badgeText: '#BE123C',
    glowColor: 'rgba(244, 63, 94, 0.14)',
    pulseColor: '#F43F5E',
  },
  info: {
    accent: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)',
    bgTint: 'rgba(14, 165, 233, 0.025)',
    borderGlow: 'rgba(14, 165, 233, 0.25)',
    iconBg: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
    iconColor: '#0284C7',
    badgeBg: '#F0F9FF',
    badgeText: '#0369A1',
    glowColor: 'rgba(14, 165, 233, 0.14)',
    pulseColor: '#0EA5E9',
  },
  purple: {
    accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
    bgTint: 'rgba(139, 92, 246, 0.025)',
    borderGlow: 'rgba(139, 92, 246, 0.25)',
    iconBg: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
    iconColor: '#7C3AED',
    badgeBg: '#F3E8FF',
    badgeText: '#6D28D9',
    glowColor: 'rgba(139, 92, 246, 0.14)',
    pulseColor: '#8B5CF6',
  },
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  trend,
  accentColor,
  tone,
  subtitle,
  badge,
  progress,
  colSpan,
  className = '',
  style = {},
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine tone palette
  const keyTone = tone || (accentColor ? 'custom' : 'primary');
  const palette = TONE_PRESETS[keyTone] || {
    accent: accentColor || '#4F46E5',
    gradient: `linear-gradient(135deg, ${accentColor || '#4F46E5'} 0%, #6366F1 100%)`,
    bgTint: 'rgba(79, 70, 229, 0.025)',
    borderGlow: `${accentColor || '#4F46E5'}40`,
    iconBg: `linear-gradient(135deg, ${accentColor || '#4F46E5'}15 0%, ${accentColor || '#4F46E5'}25 100%)`,
    iconColor: accentColor || '#4F46E5',
    badgeBg: `${accentColor || '#4F46E5'}15`,
    badgeText: accentColor || '#4F46E5',
    glowColor: `${accentColor || '#4F46E5'}20`,
    pulseColor: accentColor || '#4F46E5',
  };

  // Helper to parse value formatting
  const strVal = String(value);
  let mainValue = strVal;
  let parsedSubBadge: string | null = badge || null;

  // Extract parenthesized text, e.g., "Term 2 (Trimester)" -> main: "Term 2", detail: "Trimester"
  const parenthesizedMatch = strVal.match(/^(.*?)\s*\((.*?)\)$/);
  if (parenthesizedMatch) {
    mainValue = parenthesizedMatch[1].trim();
    if (!parsedSubBadge) {
      parsedSubBadge = parenthesizedMatch[2].trim();
    }
  }

  // Detect percentage for mini progress bar if progress is not passed
  let autoProgress = progress;
  if (autoProgress === undefined && strVal.includes('%')) {
    const num = parseFloat(strVal.replace(/[^0-9.]/g, ''));
    if (!isNaN(num) && num <= 100) {
      autoProgress = num;
    }
  }

  return (
    <div
      className={`kpi-stat-card ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        gridColumn: colSpan ? `span ${colSpan}` : undefined,
        position: 'relative',
        background: isHovered
          ? `linear-gradient(145deg, #FFFFFF 0%, ${palette.badgeBg}40 100%)`
          : 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFC 100%)',
        border: `1px solid ${isHovered ? palette.borderGlow : '#E2E8F0'}`,
        borderRadius: '20px',
        padding: '22px 22px 18px 22px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        gap: '14px',
        boxShadow: isHovered
          ? `0 18px 36px -10px ${palette.glowColor}, 0 6px 16px -2px rgba(15, 23, 42, 0.05)`
          : '0 4px 20px -2px rgba(15, 23, 42, 0.03), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Top Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: palette.gradient,
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          opacity: isHovered ? 1 : 0.85,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-24px',
          right: '-24px',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: palette.glowColor,
          filter: 'blur(28px)',
          opacity: isHovered ? 0.9 : 0.45,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Header Row: Pulse Indicator + Title & Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: palette.pulseColor,
              boxShadow: isHovered ? `0 0 8px ${palette.pulseColor}` : 'none',
              transition: 'box-shadow 0.3s ease',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-secondary, #64748B)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.2,
            }}
          >
            {title}
          </span>
        </div>

        {icon && (
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '13px',
              background: palette.iconBg,
              border: `1px solid ${palette.borderGlow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette.iconColor,
              boxShadow: `0 4px 12px -2px ${palette.glowColor}`,
              transform: isHovered ? 'scale(1.08) rotate(3deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              flexShrink: 0,
            }}
          >
            {typeof icon === 'string' ? (
              <span style={{ fontSize: '20px' }}>{icon}</span>
            ) : (
              React.cloneElement(icon as React.ReactElement, {
                size: (icon as any).props?.size || 20,
                strokeWidth: (icon as any).props?.strokeWidth || 2.2,
              })
            )}
          </div>
        )}
      </div>

      {/* Main Metric Value & Sub-badge */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1, marginTop: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: mainValue.length > 14 ? '22px' : mainValue.length > 9 ? '24px' : '28px',
              fontWeight: 800,
              color: 'var(--text-primary, #0F172A)',
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            {mainValue}
          </span>

          {parsedSubBadge && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: '100px',
                background: palette.badgeBg,
                color: palette.badgeText,
                border: `1px solid ${palette.borderGlow}`,
                letterSpacing: '0.01em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                whiteSpace: 'nowrap',
              }}
            >
              {parsedSubBadge}
            </span>
          )}
        </div>

        {subtitle && (
          <span style={{ fontSize: '12px', color: 'var(--text-muted, #64748B)', fontWeight: 500 }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* Mini Progress Bar (if percentage or progress provided) */}
      {autoProgress !== undefined && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 1, marginTop: '2px' }}>
          <div
            style={{
              width: '100%',
              height: '5px',
              borderRadius: '99px',
              background: '#E2E8F0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(Math.max(autoProgress, 0), 100)}%`,
                height: '100%',
                background: palette.gradient,
                borderRadius: '99px',
                transition: 'width 0.8s ease-out',
              }}
            />
          </div>
        </div>
      )}

      {/* Trend / Bottom Pill */}
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', zIndex: 1 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 9px',
              borderRadius: '99px',
              fontWeight: 700,
              fontSize: '11px',
              background: trend.isPositive === false ? '#FFF1F2' : '#ECFDF5',
              color: trend.isPositive === false ? '#E11D48' : '#059669',
              border: `1px solid ${trend.isPositive === false ? '#FECDD3' : '#A7F3D0'}`,
            }}
          >
            {trend.isPositive !== undefined && (
              <span>{trend.isPositive ? '↑' : '↓'}</span>
            )}
            {trend.value}
          </span>
          {trend.label && (
            <span style={{ color: 'var(--text-muted, #94A3B8)', fontSize: '11px', fontWeight: 500 }}>
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

