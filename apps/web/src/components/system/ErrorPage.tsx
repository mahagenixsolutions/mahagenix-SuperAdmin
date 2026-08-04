import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ServerCrash,
  Wrench,
  Search,
  ArrowLeft,
  Home,
  RefreshCw,
  HelpCircle,
  Activity,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export type ErrorType = '404' | '500' | '503' | 'custom';

export interface ErrorPageProps {
  type?: ErrorType;
  title?: string;
  subtitle?: string;
  errorCode?: string;
  errorDetails?: string;
  estimatedRecoveryTime?: string;
  onRetry?: () => Promise<void> | void;
  showSearch?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ERROR_CONFIGS: Record<ErrorType, {
  code: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  bgGradient: string;
}> = {
  '404': {
    code: '404',
    title: 'Page Not Found',
    subtitle: 'The page or resource you are searching for might have been moved, deleted, or does not exist in the EduVerse system.',
    icon: <AlertTriangle size={48} />,
    accentColor: '#6366F1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(129, 140, 248, 0.04) 100%)',
  },
  '500': {
    code: '500',
    title: 'Internal Server Error',
    subtitle: 'An unexpected exception occurred on our primary application server. Our infrastructure team has been automatically notified.',
    icon: <ServerCrash size={48} />,
    accentColor: '#EF4444',
    bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(248, 113, 113, 0.04) 100%)',
  },
  '503': {
    code: '503',
    title: 'Service Temporarily Unavailable',
    subtitle: 'EduVerse systems are currently undergoing scheduled database optimization and security maintenance. Systems will resume shortly.',
    icon: <Wrench size={48} />,
    accentColor: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.04) 100%)',
  },
  custom: {
    code: 'ERR',
    title: 'Application Exception',
    subtitle: 'A processing error was encountered. Please try refreshing the page or navigating back to your dashboard.',
    icon: <AlertTriangle size={48} />,
    accentColor: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(167, 139, 250, 0.04) 100%)',
  },
};

export const ErrorPage: React.FC<ErrorPageProps> = ({
  type = '404',
  title,
  subtitle,
  errorCode,
  errorDetails,
  estimatedRecoveryTime = '15 minutes',
  onRetry,
  showSearch = true,
  className = '',
  style = {},
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = ERROR_CONFIGS[type] || ERROR_CONFIGS['404'];
  const displayTitle = title || config.title;
  const displaySubtitle = subtitle || config.subtitle;
  const displayCode = errorCode || config.code;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleRetryClick = async () => {
    setIsRetrying(true);
    try {
      if (onRetry) {
        await onRetry();
      } else {
        await new Promise((res) => setTimeout(res, 800));
        window.location.reload();
      }
    } finally {
      setIsRetrying(false);
    }
  };

  const copyErrorCode = () => {
    const errorRef = `REF-${displayCode}-${Date.now().toString(36).toUpperCase()}`;
    navigator.clipboard.writeText(errorRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`error-page-container ${className}`}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        textAlign: 'center',
        background: 'var(--bg-primary, #F8FAFC)',
        fontFamily: "'Inter', system-ui, sans-serif",
        ...style,
      }}
    >
      <div
        className="card error-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '44px 36px',
          borderRadius: '28px',
          background: 'var(--bg-surface, #FFFFFF)',
          border: '1px solid var(--border-subtle, #E2E8F0)',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.07)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: config.accentColor,
          }}
        />

        {/* Ambient Glow Orb */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: config.bgGradient,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Main Error Number & Icon */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '84px',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: config.accentColor,
              opacity: 0.15,
              userSelect: 'none',
            }}
          >
            {displayCode}
          </div>

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: '90px',
              borderRadius: '26px',
              background: config.bgGradient,
              border: `2px solid ${config.accentColor}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: config.accentColor,
              boxShadow: `0 12px 32px -8px ${config.accentColor}35`,
            }}
          >
            {config.icon}
          </div>
        </div>

        {/* Error Code Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: `${config.accentColor}12`,
            color: config.accentColor,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}
        >
          <span>Error Code {displayCode}</span>
        </div>

        {/* Title & Subtitle */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: 'var(--text-primary, #0F172A)',
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {displayTitle}
        </h1>

        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--text-secondary, #64748B)',
            margin: '0 0 28px 0',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          {displaySubtitle}
        </p>

        {/* 503 Maintenance Time Bar */}
        {type === '503' && (
          <div
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '16px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              color: '#B45309',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} />
              <span>Estimated System Recovery:</span>
            </div>
            <span style={{ fontWeight: 800 }}>{estimatedRecoveryTime}</span>
          </div>
        )}

        {/* Search Bar for 404 */}
        {type === '404' && showSearch && (
          <form
            onSubmit={handleSearchSubmit}
            style={{
              width: '100%',
              maxWidth: '440px',
              marginBottom: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted, #94A3B8)',
                }}
              />
              <input
                type="text"
                placeholder="Search EduVerse modules or pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle, #CBD5E1)',
                  background: 'var(--bg-tertiary, #F8FAFC)',
                  fontSize: '13.5px',
                  color: 'var(--text-primary, #0F172A)',
                  outline: 'none',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: '12px',
                padding: '0 18px',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Search
            </button>
          </form>
        )}

        {/* Technical Error Details Accordion */}
        {errorDetails && (
          <div
            style={{
              width: '100%',
              textAlign: 'left',
              marginBottom: '24px',
              background: 'var(--bg-tertiary, #F8FAFC)',
              border: '1px solid var(--border-subtle, #E2E8F0)',
              borderRadius: '14px',
              padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted, #64748B)', textTransform: 'uppercase' }}>
                Diagnostic Log:
              </span>
              <button
                type="button"
                onClick={copyErrorCode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: config.accentColor,
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                {copied ? 'Copied Reference' : 'Copy Reference'}
              </button>
            </div>
            <pre
              style={{
                fontFamily: 'monospace',
                fontSize: '11.5px',
                color: '#E11D48',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {errorDetails}
            </pre>
          </div>
        )}

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
            style={{
              padding: '11px 20px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-secondary, #F1F5F9)',
              border: '1px solid var(--border-subtle, #E2E8F0)',
              color: 'var(--text-primary, #1E293B)',
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '11px 22px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: config.accentColor,
              borderColor: config.accentColor,
              boxShadow: `0 4px 14px ${config.accentColor}35`,
            }}
          >
            <Home size={16} />
            Return Home
          </button>

          {(type === '500' || type === '503' || onRetry) && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleRetryClick}
              disabled={isRetrying}
              style={{
                padding: '11px 20px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-surface, #FFFFFF)',
                border: `1px solid ${config.accentColor}60`,
                color: config.accentColor,
              }}
            >
              <RefreshCw size={16} className={isRetrying ? 'spin-anim' : ''} />
              {isRetrying ? 'Retrying Connection...' : 'Retry Now'}
            </button>
          )}
        </div>

        {/* Suggested Quick Links for 404 */}
        {type === '404' && (
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle, #F1F5F9)', width: '100%' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted, #94A3B8)', uppercase: true, marginBottom: '12px' }}>
              Suggested Destinations:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {[
                { label: 'Executive Academic Overview', path: '/principal/academic-overview' },
                { label: 'School Calendar', path: '/principal/calendar' },
                { label: 'System Analytics', path: '/analytics' },
                { label: 'Help & Support', path: '/system-states' },
              ].map((link) => (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => navigate(link.path)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-subtle, #E2E8F0)',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--text-secondary, #475569)',
                    cursor: 'pointer',
                  }}
                >
                  {link.label} →
                </button>
              ))}
            </div>
          </div>
        )}

        {/* System Status Link */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted, #94A3B8)' }}>
          <button
            type="button"
            onClick={() => navigate('/status')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Activity size={13} />
            System Status Dashboard
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => alert('Contacting EduVerse Enterprise Technical Support at support@eduverse.io')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <HelpCircle size={13} />
            Contact Technical Support
          </button>
        </div>
      </div>
    </div>
  );
};
