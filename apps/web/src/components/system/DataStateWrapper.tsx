import React, { ReactNode } from 'react';
import { EmptyState, EmptyStateProps } from './EmptyState';
import { ErrorPage } from './ErrorPage';
import { PageSkeleton } from '../ui/Skeleton';
import { RefreshCw } from 'lucide-react';

export interface DataStateWrapperProps {
  loading?: boolean;
  error?: Error | string | null;
  empty?: boolean;
  onRetry?: () => void | Promise<void>;
  emptyProps?: EmptyStateProps;
  skeletonFallback?: ReactNode;
  children: ReactNode;
  isRefreshing?: boolean;
}

export const DataStateWrapper: React.FC<DataStateWrapperProps> = ({
  loading = false,
  error = null,
  empty = false,
  onRetry,
  emptyProps = { preset: 'generic' },
  skeletonFallback = <PageSkeleton />,
  children,
  isRefreshing = false,
}) => {
  // 1. Loading State
  if (loading) {
    return <>{skeletonFallback}</>;
  }

  // 2. Error State
  if (error) {
    const errorMsg = typeof error === 'string' ? error : error.message;
    return (
      <ErrorPage
        type="custom"
        title="Failed to Load Resource"
        subtitle={errorMsg || 'An error occurred while fetching data from the API endpoint.'}
        onRetry={onRetry}
      />
    );
  }

  // 3. Empty State
  if (empty) {
    return <EmptyState {...emptyProps} onSecondaryAction={onRetry} secondaryActionLabel="Reload Data" />;
  }

  // 4. Success State (with optional Refreshing overlay bar)
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isRefreshing && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: 'rgba(79, 70, 229, 0.9)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <RefreshCw size={13} className="spin-anim" />
          <span>Updating Data...</span>
        </div>
      )}
      {children}
    </div>
  );
};
