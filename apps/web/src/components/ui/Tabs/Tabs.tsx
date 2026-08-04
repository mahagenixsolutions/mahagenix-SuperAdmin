import React, { useRef, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'compact' | 'fullWidth' | 'scrollable';
  disabled?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  disabled = false,
  ariaLabel = 'Tab Navigation',
  style,
}: TabsProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    tabsRef.current = tabsRef.current.slice(0, tabs.length);
  }, [tabs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (disabled) return;

    let targetIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== -1) {
      e.preventDefault();
      const nextBtn = tabsRef.current[targetIndex];
      if (nextBtn) {
        nextBtn.focus();
        onChange(tabs[targetIndex].id);
      }
    }
  };

  const getContainerStyle = (): React.CSSProperties => {
    const isScrollable = variant === 'scrollable';
    const isFullWidth = variant === 'fullWidth';

    return {
      display: isFullWidth ? 'flex' : 'inline-flex',
      alignItems: 'center',
      background: 'var(--bg-surface-raised, #F1F5F9)',
      border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))',
      borderRadius: '9999px',
      padding: '4px 6px',
      gap: '4px',
      overflowX: isScrollable ? 'auto' : 'visible',
      scrollbarWidth: 'none',
      width: isFullWidth ? '100%' : 'fit-content',
      maxWidth: '100%',
      boxSizing: 'border-box',
      ...style,
    };
  };

  const getButtonStyle = (isActive: boolean): React.CSSProperties => {
    const isCompact = variant === 'compact';
    const isFullWidth = variant === 'fullWidth';

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: isCompact ? '6px 14px' : '8px 18px',
      fontSize: isCompact ? '12px' : '13px',
      fontWeight: isActive ? 700 : 600,
      border: 'none',
      borderRadius: '9999px',
      background: isActive
        ? 'var(--bg-surface, #FFFFFF)'
        : 'transparent',
      color: isActive
        ? 'var(--color-primary, #0284C7)'
        : 'var(--text-secondary, #475569)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      flex: isFullWidth ? 1 : undefined,
      opacity: disabled ? 0.6 : 1,
      outline: 'none',
      boxShadow: isActive
        ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)'
        : 'none',
    };
  };

  const badgeStyle = (isActive: boolean): React.CSSProperties => {
    return {
      fontSize: '10px',
      fontWeight: 700,
      marginLeft: '4px',
      background: isActive
        ? 'rgba(2, 132, 199, 0.1)'
        : 'rgba(148, 163, 184, 0.15)',
      color: isActive
        ? 'var(--color-primary, #0284C7)'
        : 'var(--text-secondary, #475569)',
      padding: '2px 8px',
      borderRadius: '9999px',
      display: 'inline-block',
    };
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={getContainerStyle()}
      className="segmented-tabs-container"
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => { tabsRef.current[idx] = el; }}
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !disabled && onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            style={getButtonStyle(isActive)}
            className={`segmented-tab-btn ${isActive ? 'active' : ''}`}
            disabled={disabled}
          >
            {tab.icon && (
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge !== null && (
              <span style={badgeStyle(isActive)}>{tab.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
