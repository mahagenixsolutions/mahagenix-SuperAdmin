import React from 'react';
import { Smartphone, MonitorOff, RotateCw, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

export interface DeviceStateNoticeProps {
  type?: 'unsupported_browser' | 'screen_too_small' | 'rotate_device';
}

export const DeviceStateNotice: React.FC<DeviceStateNoticeProps> = ({ type = 'screen_too_small' }) => {
  return (
    <div
      style={{
        padding: '32px 20px',
        textAlign: 'center',
        background: 'var(--bg-surface, #FFFFFF)',
        border: '1px solid var(--border-subtle, #E2E8F0)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D97706',
          marginBottom: '16px',
        }}
      >
        {type === 'rotate_device' ? (
          <RotateCw size={32} />
        ) : type === 'unsupported_browser' ? (
          <MonitorOff size={32} />
        ) : (
          <Smartphone size={32} />
        )}
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
        {type === 'rotate_device'
          ? 'Please Rotate Your Device'
          : type === 'unsupported_browser'
          ? 'Unsupported Web Browser'
          : 'Display Resolution Below Minimum'}
      </h3>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '400px', margin: 0 }}>
        {type === 'rotate_device'
          ? 'This complex academic assessment portal is optimized for landscape view.'
          : type === 'unsupported_browser'
          ? 'Please upgrade to Chrome v100+, Firefox v100+, or Safari v15+.'
          : 'Please expand your desktop window or view on a tablet device for full dashboard navigation.'}
      </p>
    </div>
  );
};

export interface SecurityStateNoticeProps {
  type?: 'suspicious_activity' | 'security_verification' | 'account_locked';
}

export const SecurityStateNotice: React.FC<SecurityStateNoticeProps> = ({ type = 'suspicious_activity' }) => {
  return (
    <div
      style={{
        padding: '36px 24px',
        textAlign: 'center',
        background: 'var(--bg-surface, #FFFFFF)',
        border: '1px solid #FECDD3',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '22px',
          background: '#FFF1F2',
          border: '2px solid #FECDD3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E11D48',
          marginBottom: '18px',
        }}
      >
        {type === 'security_verification' ? <KeyRound size={36} /> : <ShieldAlert size={36} />}
      </div>

      <div
        style={{
          padding: '3px 10px',
          borderRadius: '100px',
          background: '#FFF1F2',
          color: '#BE123C',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}
      >
        Security Enforcement Active
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
        {type === 'security_verification'
          ? 'Security Verification Required (2FA)'
          : type === 'account_locked'
          ? 'Account Temporarily Locked'
          : 'Suspicious IP Activity Detected'}
      </h3>

      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 0 20px 0', lineHeight: 1.5 }}>
        {type === 'security_verification'
          ? 'Enter your 6-digit authentication code sent to your registered security device to confirm identity.'
          : type === 'account_locked'
          ? 'Your account was locked following 5 consecutive failed login attempts. Contact your Principal or IT Admin.'
          : 'Multiple sign-in attempts were detected from an unrecognized geographic location.'}
      </p>

      <button
        type="button"
        className="btn btn-primary"
        style={{
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 600,
          padding: '10px 20px',
          backgroundColor: '#E11D48',
          borderColor: '#E11D48',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>Verify Credentials</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
