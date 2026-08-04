import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, Database, SignalLow, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface OfflinePageProps {
  onRetryConnection?: () => void;
  onContinueOffline?: () => void;
  cachedModules?: string[];
  isSlowNetwork?: boolean;
}

export const NetworkStatePages: React.FC<OfflinePageProps> = ({
  onRetryConnection,
  onContinueOffline,
  cachedModules = ['Cached Transcripts', 'Downloaded Attendance Sheets', 'Offline Timetables', 'Recent Student Profiles'],
  isSlowNetwork = false,
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setIsChecking(true);
    await new Promise((res) => setTimeout(res, 1200));
    setIsOnline(navigator.onLine);
    setIsChecking(false);
    onRetryConnection?.();
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        background: 'var(--bg-primary, #F8FAFC)',
        textAlign: 'center',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '620px',
          width: '100%',
          padding: '40px 32px',
          borderRadius: '24px',
          background: 'var(--bg-surface, #FFFFFF)',
          border: '1px solid var(--border-subtle, #E2E8F0)',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: isSlowNetwork
              ? 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)'
              : 'linear-gradient(90deg, #64748B 0%, #94A3B8 100%)',
          }}
        />

        {/* Icon Header */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '26px',
            background: isSlowNetwork ? '#FFFBEB' : '#F1F5F9',
            border: `2px solid ${isSlowNetwork ? '#FDE68A' : '#CBD5E1'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSlowNetwork ? '#D97706' : '#475569',
            marginBottom: '20px',
            boxShadow: '0 12px 28px -6px rgba(0,0,0,0.06)',
          }}
        >
          {isSlowNetwork ? <SignalLow size={42} /> : <WifiOff size={42} />}
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: isSlowNetwork ? '#FFFBEB' : '#F1F5F9',
            color: isSlowNetwork ? '#D97706' : '#475569',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <span>{isSlowNetwork ? 'Slow Internet Connection Detected' : 'No Active Internet Connection'}</span>
        </div>

        {/* Title & Description */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary, #0F172A)',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {isSlowNetwork ? 'Experiencing High Latency' : 'You are Currently Offline'}
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary, #64748B)',
            margin: '0 0 28px 0',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}
        >
          {isSlowNetwork
            ? 'Network responses are taking longer than usual. You can continue browsing with cached data or retry reloading.'
            : 'EduVerse detected a network disconnect. Your local changes are saved locally and will auto-sync once reconnected.'}
        </p>

        {/* Cached Data Availability Banner */}
        <div
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: 'var(--bg-tertiary, #F8FAFC)',
            border: '1px solid var(--border-subtle, #E2E8F0)',
            marginBottom: '28px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Database size={18} color="#4F46E5" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary, #0F172A)' }}>
              Cached Workspace Data Available Offline:
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {cachedModules.map((mod) => (
              <div key={mod} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary, #475569)' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span>{mod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRetry}
            disabled={isChecking}
            style={{
              padding: '11px 22px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#4F46E5',
              borderColor: '#4F46E5',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
            }}
          >
            <RefreshCw size={16} className={isChecking ? 'spin-anim' : ''} />
            {isChecking ? 'Checking Signal...' : 'Try Reconnecting'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onContinueOffline}
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
            <ShieldCheck size={16} />
            Continue in Offline Mode
          </button>
        </div>
      </div>
    </div>
  );
};
