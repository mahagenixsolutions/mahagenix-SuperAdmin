import React from 'react';
import { FolderOpen, AlertCircle, RefreshCw } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are no records matching your current filter criteria.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div
      className="academic-card"
      style={{
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '12px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: '#f1f5f9',
          color: '#64748b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '4px'
        }}
      >
        {icon || <FolderOpen size={28} />}
      </div>
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '13px', color: '#64748b', maxWidth: '400px', lineHeight: 1.5 }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: '8px',
            padding: '9px 16px',
            borderRadius: '10px',
            background: '#4f46e5',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'Failed to load data payload.',
  onRetry,
}) => {
  return (
    <div
      className="academic-card"
      style={{
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '12px',
        borderColor: '#fecaca',
        background: '#fef2f2',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <AlertCircle size={32} color="#ef4444" />
      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#991b1b' }}>Something Went Wrong</h4>
      <p style={{ margin: 0, fontSize: '13px', color: '#b91c1c' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '8px',
            padding: '8px 14px',
            borderRadius: '8px',
            background: '#ef4444',
            color: '#ffffff',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          style={{
            height: '60px',
            borderRadius: '14px',
            background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-pulse 1.5s infinite',
            width: '100%'
          }}
        />
      ))}
    </div>
  );
};
