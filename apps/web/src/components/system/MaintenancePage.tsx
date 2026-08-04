import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  Clock,
  Activity,
  CheckCircle2,
  Bell,
  Mail,
  HelpCircle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

export interface MaintenancePageProps {
  title?: string;
  maintenanceWindow?: string;
  estimatedTime?: string;
  progressPercent?: number;
  statusLogs?: { time: string; text: string; status: 'done' | 'active' | 'pending' }[];
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({
  title = 'Scheduled System Infrastructure Maintenance',
  maintenanceWindow = 'Today, 02:00 AM - 04:30 AM EST',
  estimatedTime = '01 Hour 25 Minutes Remaining',
  progressPercent = 65,
  statusLogs = [
    { time: '02:00 AM', text: 'Database Cluster Sharding & Backup Completed', status: 'done' },
    { time: '02:30 AM', text: 'Securing Realtime Socket Multi-node Gateways', status: 'done' },
    { time: '03:15 AM', text: 'Deploying Core Academic & Examination Schema v2.5', status: 'active' },
    { time: '04:00 AM', text: 'Final Verification & Production Load Testing', status: 'pending' },
  ],
}) => {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        background: 'var(--bg-primary, #F8FAFC)',
        textAlign: 'center',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '44px 36px',
          borderRadius: '28px',
          background: 'var(--bg-surface, #FFFFFF)',
          border: '1px solid var(--border-subtle, #E2E8F0)',
          boxShadow: '0 20px 40px -15px rgba(245, 158, 11, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Gradient Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
          }}
        />

        {/* Wrench Icon Badge */}
        <div
          style={{
            position: 'relative',
            width: '90px',
            height: '90px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '2px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D97706',
            marginBottom: '22px',
            boxShadow: '0 12px 32px -8px rgba(245, 158, 11, 0.3)',
          }}
        >
          <Wrench size={44} />
        </div>

        {/* Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: '#FFFBEB',
            color: '#B45309',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            border: '1px solid #FDE68A',
          }}
        >
          <Clock size={13} />
          <span>Scheduled Maintenance Mode</span>
        </div>

        {/* Title & Window */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary, #0F172A)',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary, #64748B)', margin: '0 0 28px 0', maxWidth: '520px' }}>
          Maintenance Window: <strong>{maintenanceWindow}</strong>
        </p>

        {/* Live Progress Bar Container */}
        <div
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: '18px',
            background: 'var(--bg-tertiary, #F8FAFC)',
            border: '1px solid var(--border-subtle, #E2E8F0)',
            marginBottom: '28px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary, #0F172A)' }}>
              Maintenance Deployment Progress: {progressPercent}%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#D97706' }}>{estimatedTime}</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '99px',
              background: '#E2E8F0',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                borderRadius: '99px',
                transition: 'width 0.8s ease',
              }}
            />
          </div>

          {/* Status Logs Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {statusLogs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
                {log.status === 'done' ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : log.status === 'active' ? (
                  <RefreshCw size={16} color="#F59E0B" className="spin-anim" />
                ) : (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #CBD5E1' }} />
                )}
                <span style={{ fontWeight: 700, color: 'var(--text-muted, #94A3B8)', minWidth: '65px' }}>{log.time}</span>
                <span
                  style={{
                    color: log.status === 'active' ? '#B45309' : log.status === 'done' ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: log.status === 'active' ? 700 : 500,
                  }}
                >
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe for Notification Box */}
        <div style={{ width: '100%', maxWidth: '480px', marginBottom: '24px' }}>
          {subscribed ? (
            <div style={{ padding: '12px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', fontSize: '13px', fontWeight: 600 }}>
              ✓ Subscribed! We will notify your email as soon as EduVerse resumes online operation.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter email to get notified when online..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle, #CBD5E1)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '0 16px',
                  backgroundColor: '#D97706',
                  borderColor: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Bell size={15} />
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted, #94A3B8)' }}>
          <button
            type="button"
            onClick={() => navigate('/status')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Activity size={13} />
            Live Infrastructure Status Page
          </button>
        </div>
      </div>
    </div>
  );
};
