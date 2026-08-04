import React, { useState, useEffect } from 'react';
import { Bus, MapPin, AlertTriangle, AlertCircle, Info, ArrowRight } from 'lucide-react';

interface TransportData {
  activeRoutes: string;
  studentsOnBus: number;
  delayedRoutes: number;
  routeName: string;
  routeStatus: string;
}

interface AlertItem {
  title: string;
  desc: string;
  severity: string;
}

interface Props {
  transport: TransportData;
  alerts: AlertItem[];
}

export default function TransportAndAlerts({ transport, alerts }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {/* Transport Overview Column */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '16px' : '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#f97316', borderRadius: '2px' }} />
            Transport Overview
          </h3>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#10B981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
          }}>
            ● Live Tracking
          </span>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          padding: isMobile ? '12px 8px' : '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center',
          gap: isMobile ? 4 : 8,
        }}>
          <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: isMobile ? 4 : 8 }}>
            <div style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.2 }}>Active Routes</div>
            <div style={{ fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{transport.activeRoutes}</div>
          </div>
          <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: isMobile ? 4 : 8 }}>
            <div style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.2 }}>Students On Bus</div>
            <div style={{ fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{transport.studentsOnBus}</div>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.2 }}>Delayed Routes</div>
            <div style={{ fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>{transport.delayedRoutes}</div>
          </div>
        </div>

        {/* Live Route Card & Mini Map vector */}
        <div style={{ padding: isMobile ? '16px' : '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(249, 115, 22, 0.1)',
              color: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Bus size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{transport.routeName}</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, marginTop: '1px' }}>{transport.routeStatus}</div>
            </div>
          </div>

          {/* Mini Route Tracking Map */}
          <div style={{
            background: 'var(--bg-canvas)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            height: '80px',
            position: 'relative',
            overflow: 'hidden',
            padding: '12px',
          }}>
            {/* Draw a cute roadmap SVG */}
            <svg viewBox="0 0 240 60" width="100%" height="100%">
              {/* Path track line */}
              <path d="M10 30 Q 70 10, 120 30 T 230 30" fill="none" stroke="#22C55E" strokeWidth={4} strokeLinecap="round" />
              {/* Stops dots */}
              <circle cx="15" cy="31" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth={1.5} />
              <circle cx="95" cy="21" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth={1.5} />
              <circle cx="170" cy="32" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth={1.5} />
              
              {/* Current Bus Position icon wrapper */}
              <g transform="translate(130, 20)">
                <circle cx="10" cy="10" r="10" fill="#f97316" />
                <path d="M6 7 H14 V13 H6 Z" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </div>

        {/* Footer link */}
        <div style={{
          padding: isMobile ? '12px 16px' : '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '13px',
          fontWeight: 600,
        }}>
          <button
            onClick={() => alert('Opening live transport portal...')}
            style={{ background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View All Routes <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Important Alerts Column */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#EF4444', borderRadius: '2px' }} />
            Important Alerts
          </h3>
          <button
            onClick={() => alert('Navigating to alerts dashboard...')}
            style={{ fontSize: '12px', fontWeight: 600, background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer' }}
          >
            View All ›
          </button>
        </div>

        {/* Alerts list */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {alerts.map((item, idx) => {
            const isCritical = item.severity === 'Critical';
            const isWarning = item.severity === 'Warning';
            
            return (
              <div key={idx} style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                padding: '12px 16px',
                background: isCritical ? 'rgba(239, 68, 68, 0.03)' : isWarning ? 'rgba(245, 158, 11, 0.03)' : 'rgba(59, 130, 246, 0.03)',
                border: '1px solid',
                borderColor: isCritical ? 'rgba(239, 68, 68, 0.1)' : isWarning ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                borderRadius: '10px',
              }}>
                {/* Alert Icon Badge */}
                <div style={{
                  color: isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#3b82f6',
                  marginTop: '2px',
                }}>
                  {isCritical ? <AlertCircle size={16} /> : isWarning ? <AlertTriangle size={16} /> : <Info size={16} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: isCritical ? 'rgba(239, 68, 68, 0.1)' : isWarning ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#3b82f6',
                    }}>
                      {item.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
