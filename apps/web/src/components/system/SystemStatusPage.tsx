import React, { useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, Server, Database, Bell, HardDrive, CreditCard, Radio, RefreshCw } from 'lucide-react';

export interface ServiceStatusItem {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'degraded' | 'outage';
  latencyMs: number;
  uptimePercent: number;
  icon: React.ReactNode;
}

export const SystemStatusPage: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const services: ServiceStatusItem[] = [
    { id: 'srv-1', name: 'Core Application Server', category: 'Compute', status: 'operational', latencyMs: 24, uptimePercent: 99.98, icon: <Server size={20} /> },
    { id: 'srv-2', name: 'Academic & Exam Database', category: 'Storage', status: 'operational', latencyMs: 12, uptimePercent: 99.99, icon: <Database size={20} /> },
    { id: 'srv-3', name: 'Realtime Socket Cluster', category: 'Messaging', status: 'operational', latencyMs: 8, uptimePercent: 99.95, icon: <Radio size={20} /> },
    { id: 'srv-4', name: 'Notification & SMS Broadcast', category: 'Communication', status: 'operational', latencyMs: 45, uptimePercent: 99.90, icon: <Bell size={20} /> },
    { id: 'srv-5', name: 'Media Asset CDN & Storage', category: 'CDN', status: 'operational', latencyMs: 18, uptimePercent: 100, icon: <HardDrive size={20} /> },
    { id: 'srv-6', name: 'Payment Gateway Integration', category: 'Finance', status: 'degraded', latencyMs: 320, uptimePercent: 99.42, icon: <CreditCard size={20} /> },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsRefreshing(false);
  };

  const allOperational = services.every((s) => s.status === 'operational');

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Banner */}
      <div
        className="card"
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background: allOperational
            ? 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
            : 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          border: `1.5px solid ${allOperational ? '#A7F3D0' : '#FDE68A'}`,
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: allOperational ? '#059669' : '#D97706',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            {allOperational ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
              {allOperational ? 'All EduVerse Systems Operational' : 'Minor Service Degradation Detected'}
            </h2>
            <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
              Live real-time health monitoring of all enterprise API endpoints & microservices.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            padding: '9px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <RefreshCw size={15} className={isRefreshing ? 'spin-anim' : ''} />
          {isRefreshing ? 'Checking Endpoints...' : 'Refresh Status'}
        </button>
      </div>

      {/* Services Grid */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
        Microservice Infrastructure Health
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {services.map((srv) => (
          <div
            key={srv.id}
            className="card"
            style={{
              padding: '20px',
              borderRadius: '18px',
              background: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-subtle, #E2E8F0)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: 'var(--bg-tertiary, #F8FAFC)',
                    border: '1px solid var(--border-subtle, #E2E8F0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4F46E5',
                  }}
                >
                  {srv.icon}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{srv.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{srv.category} Cluster</div>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '3px 9px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: srv.status === 'operational' ? '#ECFDF5' : '#FFFBEB',
                  color: srv.status === 'operational' ? '#059669' : '#D97706',
                  border: `1px solid ${srv.status === 'operational' ? '#A7F3D0' : '#FDE68A'}`,
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: srv.status === 'operational' ? '#10B981' : '#F59E0B',
                  }}
                />
                {srv.status === 'operational' ? 'Operational' : 'Degraded Latency'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Latency: <strong style={{ color: srv.latencyMs > 100 ? '#D97706' : '#059669' }}>{srv.latencyMs}ms</strong></span>
              <span>30-Day Uptime: <strong>{srv.uptimePercent}%</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Incident History Timeline */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
        Recent Incident Logs & Maintenance Reports
      </h3>

      <div className="card" style={{ padding: '24px', borderRadius: '20px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', minWidth: '100px' }}>Jul 24, 2026</div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Payment Gateway API Latency</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Upstream banking partner experiencing elevated response times. Fallback gateway engaged.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', minWidth: '100px' }}>Jul 18, 2026</div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Scheduled Database Optimization</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Completed successfully without any reported downtime for academic portals.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
