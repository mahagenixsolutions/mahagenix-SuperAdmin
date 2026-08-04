import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Home,
  RefreshCw,
  Download,
  FileCheck,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Award,
  AlertTriangle,
} from 'lucide-react';

export type SuccessPreset =
  | 'payment'
  | 'homework'
  | 'assignment'
  | 'profile'
  | 'password'
  | 'registration'
  | 'leave'
  | 'admission'
  | 'generic';

export type FailurePreset =
  | 'payment_failed'
  | 'submission_failed'
  | 'upload_failed'
  | 'transaction_failed'
  | 'generic_failed';

export interface SuccessPageProps {
  preset?: SuccessPreset;
  title?: string;
  subtitle?: string;
  referenceId?: string;
  summaryItems?: { label: string; value: string }[];
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export interface FailurePageProps {
  preset?: FailurePreset;
  title?: string;
  subtitle?: string;
  errorCode?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
}

const SUCCESS_PRESETS: Record<SuccessPreset, {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  primaryLabel: string;
}> = {
  payment: {
    title: 'Payment Processed Successfully!',
    subtitle: 'Your tuition fee installment payment has been verified. Official receipt generated.',
    icon: <CreditCard size={48} />,
    accentColor: '#10B981',
    primaryLabel: 'View Official Receipt',
  },
  homework: {
    title: 'Homework Task Submitted!',
    subtitle: 'Your homework submission has been logged into the gradebook for teacher evaluation.',
    icon: <FileCheck size={48} />,
    accentColor: '#4F46E5',
    primaryLabel: 'Go to Classwork',
  },
  assignment: {
    title: 'Assignment Submitted!',
    subtitle: 'Course project documents and code attachments successfully uploaded.',
    icon: <CheckCircle2 size={48} />,
    accentColor: '#0EA5E9',
    primaryLabel: 'Return to Course Overview',
  },
  profile: {
    title: 'Profile Updated',
    subtitle: 'Your institutional profile information and contact preferences were saved.',
    icon: <UserCheck size={48} />,
    accentColor: '#8B5CF6',
    primaryLabel: 'View Updated Profile',
  },
  password: {
    title: 'Password Security Changed',
    subtitle: 'Your account password has been updated. Active sessions stay protected.',
    icon: <ShieldCheck size={48} />,
    accentColor: '#10B981',
    primaryLabel: 'Back to Settings',
  },
  registration: {
    title: 'Registration Completed',
    subtitle: 'New academic registration completed successfully. Welcome to EduVerse Ecosystem!',
    icon: <Award size={48} />,
    accentColor: '#059669',
    primaryLabel: 'Access Portal Dashboard',
  },
  leave: {
    title: 'Leave Application Approved',
    subtitle: 'Your leave application was formally authorized by the Vice Principal.',
    icon: <CheckCircle2 size={48} />,
    accentColor: '#F59E0B',
    primaryLabel: 'Check Leave Balance',
  },
  admission: {
    title: 'Admission Dossier Submitted',
    subtitle: 'Student enrollment registration form submitted to the Admissions Committee.',
    icon: <FileCheck size={48} />,
    accentColor: '#4F46E5',
    primaryLabel: 'Track Admission Status',
  },
  generic: {
    title: 'Action Completed Successfully',
    subtitle: 'Your requested transaction was executed without any errors.',
    icon: <CheckCircle2 size={48} />,
    accentColor: '#10B981',
    primaryLabel: 'Continue',
  },
};

export const SuccessPage: React.FC<SuccessPageProps> = ({
  preset = 'generic',
  title,
  subtitle,
  referenceId,
  summaryItems = [
    { label: 'Reference Number', value: `REF-${Math.floor(Math.random() * 899999 + 100000)}` },
    { label: 'Execution Timestamp', value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { label: 'Verification Status', value: 'Verified & Immutable' },
  ],
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel = 'Back to Dashboard',
  onSecondaryAction,
}) => {
  const navigate = useNavigate();
  const config = SUCCESS_PRESETS[preset] || SUCCESS_PRESETS.generic;

  const displayTitle = title || config.title;
  const displaySubtitle = subtitle || config.subtitle;
  const displayPrimaryLabel = primaryActionLabel || config.primaryLabel;

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
          maxWidth: '600px',
          width: '100%',
          padding: '44px 36px',
          borderRadius: '28px',
          background: 'var(--bg-surface, #FFFFFF)',
          border: '1px solid var(--border-subtle, #E2E8F0)',
          boxShadow: '0 20px 40px -15px rgba(16, 185, 129, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Animated Checkmark Circle */}
        <div
          style={{
            position: 'relative',
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: `3px solid ${config.accentColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: config.accentColor,
            marginBottom: '24px',
            boxShadow: `0 12px 32px -8px ${config.accentColor}40`,
          }}
        >
          {config.icon}
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: `1.5px dashed ${config.accentColor}50`,
            }}
          />
        </div>

        {/* Title & Subtitle */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary, #0F172A)',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {displayTitle}
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
          {displaySubtitle}
        </p>

        {/* Summary Details Card */}
        <div
          style={{
            width: '100%',
            padding: '18px 20px',
            borderRadius: '16px',
            background: 'var(--bg-tertiary, #F8FAFC)',
            border: '1px solid var(--border-subtle, #E2E8F0)',
            marginBottom: '28px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted, #94A3B8)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            Transaction Summary Audit Log:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {summaryItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  borderBottom: '1px dashed var(--border-subtle, #E2E8F0)',
                  paddingBottom: '6px',
                }}
              >
                <span style={{ color: 'var(--text-secondary, #64748B)' }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary, #0F172A)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onPrimaryAction || (() => navigate('/dashboard'))}
            style={{
              padding: '11px 24px',
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
            {displayPrimaryLabel}
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSecondaryAction || (() => navigate('/dashboard'))}
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
            <Home size={16} />
            {secondaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FailurePage: React.FC<FailurePageProps> = ({
  preset = 'generic_failed',
  title = 'Transaction Could Not Be Processed',
  subtitle = 'The payment gateway or submission processor rejected the request due to validation errors.',
  errorCode = 'ERR_TRANSACTION_DECLINED_920',
  onRetry,
  onContactSupport,
}) => {
  const navigate = useNavigate();

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
          maxWidth: '600px',
          width: '100%',
          padding: '44px 36px',
          borderRadius: '28px',
          background: 'var(--bg-surface, #FFFFFF)',
          border: '1px solid var(--border-subtle, #E2E8F0)',
          boxShadow: '0 20px 40px -15px rgba(244, 63, 94, 0.08)',
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
            height: '4px',
            background: '#F43F5E',
          }}
        />

        {/* Failed Circle Badge */}
        <div
          style={{
            position: 'relative',
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
            border: '3px solid #F43F5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E11D48',
            marginBottom: '24px',
            boxShadow: '0 12px 32px -8px rgba(244, 63, 94, 0.3)',
          }}
        >
          <XCircle size={48} />
        </div>

        {/* Title & Subtitle */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary, #0F172A)',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary, #64748B)',
            margin: '0 0 24px 0',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>

        {/* Error Code Pill */}
        <div
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            background: '#FFF1F2',
            border: '1px solid #FECDD3',
            color: '#9F1239',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '28px',
            fontFamily: 'monospace',
          }}
        >
          Failure Code: {errorCode}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onRetry || (() => window.location.reload())}
            style={{
              padding: '11px 24px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F43F5E',
              borderColor: '#F43F5E',
            }}
          >
            <RefreshCw size={16} />
            Retry Submission
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
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
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};
