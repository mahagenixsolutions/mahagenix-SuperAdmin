import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ServerCrash, RefreshCw, ChevronDown, ChevronUp, Copy, CheckCircle2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  copied: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error caught by GlobalErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private copyStackTrace = () => {
    const text = `${this.state.error?.toString()}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack}`;
    navigator.clipboard.writeText(text);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 20px',
            background: 'var(--bg-primary, #F8FAFC)',
            fontFamily: "'Inter', system-ui, sans-serif",
            textAlign: 'center',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '640px',
              width: '100%',
              padding: '44px 36px',
              borderRadius: '28px',
              background: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid #FECDD3',
              boxShadow: '0 20px 40px -15px rgba(244, 63, 94, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '26px',
                background: '#FFF1F2',
                border: '2px solid #FECDD3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E11D48',
                marginBottom: '20px',
              }}
            >
              <ServerCrash size={44} />
            </div>

            <div
              style={{
                padding: '4px 12px',
                borderRadius: '100px',
                background: '#FFF1F2',
                color: '#BE123C',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Runtime Exception Caught
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
              Application Render Exception
            </h2>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 24px 0', maxWidth: '480px', lineHeight: 1.6 }}>
              A UI component threw an unhandled runtime error. EduVerse Error Boundary prevented an application-wide crash.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleReset}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: '#4F46E5',
                }}
              >
                Reset Component State
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleReload}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RefreshCw size={15} />
                Reload Application
              </button>
            </div>

            {/* Stack Trace Toggle */}
            <div style={{ width: '100%', textAlign: 'left' }}>
              <button
                type="button"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  margin: '0 auto 12px auto',
                }}
              >
                {this.state.showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {this.state.showDetails ? 'Hide Stack Trace' : 'View Exception Stack Trace'}
              </button>

              {this.state.showDetails && (
                <div
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#1E293B',
                    color: '#F8FAFC',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    position: 'relative',
                  }}
                >
                  <button
                    type="button"
                    onClick={this.copyStackTrace}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#334155',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {this.state.copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                    {this.state.copied ? 'Copied' : 'Copy'}
                  </button>

                  <div style={{ color: '#F43F5E', fontWeight: 700, marginBottom: '8px' }}>
                    {this.state.error?.toString()}
                  </div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#94A3B8' }}>
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
