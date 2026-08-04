import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, LogIn, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export interface PermissionPageProps {
  type?: '401' | '403';
  requiredPermission?: string;
  userRole?: string;
}

export const PermissionPages: React.FC<PermissionPageProps> = ({
  type = '403',
  requiredPermission = 'ORGANIZATION_GOVERNANCE_EXECUTE',
  userRole = 'ACADEMIC_FACULTY',
}) => {
  const navigate = useNavigate();
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [requestReason, setRequestReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestReason.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setShowAccessModal(false);
        setRequestReason('');
      }, 2000);
    }
  };

  const is401 = type === '401';

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
        {/* Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: is401 ? '#6366F1' : '#F43F5E',
          }}
        />

        {/* Header Icon */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '26px',
            background: is401 ? '#EEF2FF' : '#FFF1F2',
            border: `2px solid ${is401 ? '#C7D2FE' : '#FECDD3'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: is401 ? '#4F46E5' : '#E11D48',
            marginBottom: '20px',
            boxShadow: `0 12px 28px -6px ${is401 ? 'rgba(79,70,229,0.2)' : 'rgba(225,29,72,0.2)'}`,
          }}
        >
          {is401 ? <Lock size={42} /> : <ShieldAlert size={42} />}
        </div>

        {/* Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: is401 ? '#EEF2FF' : '#FFF1F2',
            color: is401 ? '#4F46E5' : '#BE123C',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <span>{is401 ? '401 Session Expired' : '403 Access Restricted'}</span>
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
          {is401 ? 'Authentication Required' : 'Access Permission Denied'}
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
          {is401
            ? 'Your security session has expired due to inactivity. Please log in again to authenticate your active workspace session.'
            : `Your current assigned role (${userRole}) does not have permission to view or execute actions on this institutional resource.`}
        </p>

        {/* Permission Details Box (for 403) */}
        {!is401 && (
          <div
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '14px',
              background: 'var(--bg-tertiary, #F8FAFC)',
              border: '1px solid var(--border-subtle, #E2E8F0)',
              marginBottom: '28px',
              fontSize: '12.5px',
              color: 'var(--text-secondary, #475569)',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary, #0F172A)' }}>Required System Key: </span>
              <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', color: '#1E293B' }}>
                {requiredPermission}
              </code>
            </div>
            <AlertCircle size={16} color="#94A3B8" />
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {is401 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/login')}
              style={{
                padding: '11px 24px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#4F46E5',
                borderColor: '#4F46E5',
              }}
            >
              <LogIn size={16} />
              Re-authenticate Now
            </button>
          ) : (
            <>
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
                Return Previous Page
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowAccessModal(true)}
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
                }}
              >
                <Send size={15} />
                Request Access Approval
              </button>
            </>
          )}
        </div>
      </div>

      {/* Request Access Modal */}
      {showAccessModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              borderRadius: '20px',
              background: 'var(--bg-surface, #FFFFFF)',
              textAlign: 'left',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Request Access Permission
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
              Submit a formal privilege escalation request to your School IT Administrator or Principal.
            </p>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={42} color="#10B981" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#047857' }}>Access Request Dispatched!</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Your request reference `#REQ-${Math.floor(Math.random() * 90000 + 10000)}` has been routed to administration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Reason for Access Request:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="Describe why you need access to this resource (e.g. End of term audit, grade verification)..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle, #CBD5E1)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAccessModal(false)}
                    style={{ borderRadius: '10px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ borderRadius: '10px', fontSize: '13px', backgroundColor: '#4F46E5' }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
