import React, { useState } from 'react';
import { PageLayout } from '../../../components/erp/PageLayout';
import { PageHeader } from '../../../components/erp/PageHeader';
import { EmptyState, EmptyStatePreset } from '../../../components/system/EmptyState';
import { ErrorPage, ErrorType } from '../../../components/system/ErrorPage';
import { NetworkStatePages } from '../../../components/system/NetworkStatePages';
import { PermissionPages } from '../../../components/system/PermissionPages';
import { SuccessPage, FailurePage, SuccessPreset } from '../../../components/system/SuccessFailurePages';
import { MaintenancePage } from '../../../components/system/MaintenancePage';
import { SystemStatusPage } from '../../../components/system/SystemStatusPage';
import { FileUploadWidget, FormStateFeedback } from '../../../components/system/FileAndFormStates';
import { DeviceStateNotice, SecurityStateNotice } from '../../../components/system/DeviceAndSecurityStates';
import { DataStateWrapper } from '../../../components/system/DataStateWrapper';
import { PageSkeleton, TableSkeleton, TimelineSkeleton, GallerySkeleton } from '../../../components/ui/Skeleton';
import {
  AlertTriangle,
  Inbox,
  WifiOff,
  ShieldAlert,
  Loader,
  RefreshCw,
  FileText,
  CheckCircle2,
  Wrench,
  Activity,
  Smartphone,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function SystemShowcasePage() {
  const [activeTab, setActiveTab] = useState<
    'errors' | 'empty' | 'network' | 'permission' | 'loading' | 'lifecycle' | 'file_form' | 'success_fail' | 'maintenance' | 'status' | 'security'
  >('errors');

  // Interactive state toggles for testing live components
  const [selectedError, setSelectedError] = useState<ErrorType>('404');
  const [selectedEmpty, setSelectedEmpty] = useState<EmptyStatePreset>('homework');
  const [selectedSuccess, setSelectedSuccess] = useState<SuccessPreset>('payment');
  const [lifecycleState, setLifecycleState] = useState<'loading' | 'success' | 'empty' | 'error' | 'refreshing'>('success');
  const [triggerCrash, setTriggerCrash] = useState(false);

  if (triggerCrash) {
    throw new Error('Simulated runtime component crash triggered from System Showcase Page.');
  }

  const EMPTY_PRESETS: EmptyStatePreset[] = [
    'homework',
    'assignments',
    'courses',
    'books',
    'notifications',
    'messages',
    'attendance',
    'results',
    'reports',
    'events',
    'announcements',
    'visitors',
    'employees',
    'students',
    'finance',
    'transactions',
    'transport',
    'hostel',
    'library',
    'search',
  ];

  const SUCCESS_PRESETS_LIST: SuccessPreset[] = [
    'payment',
    'homework',
    'assignment',
    'profile',
    'password',
    'registration',
    'leave',
    'admission',
  ];

  return (
    <PageLayout>
      <PageHeader
        title="System States & Enterprise Error Experience"
        subtitle="Comprehensive production-ready suite of error pages, empty states, loading skeletons, offline recovery, security enforcement, and maintenance modules."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'System Architecture', path: '/system-states' },
          { label: 'System States Explorer', path: '/system-states' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px', fontFamily: "'Inter', sans-serif" }}>
        {/* Navigation Categories Header Tabs */}
        <div
          className="card"
          style={{
            padding: '12px 16px',
            borderRadius: '20px',
            background: 'var(--bg-surface, #FFFFFF)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          }}
        >
          {[
            { id: 'errors', label: 'Error Pages (404/500/503)', icon: <AlertTriangle size={16} /> },
            { id: 'empty', label: '20+ Empty States', icon: <Inbox size={16} /> },
            { id: 'network', label: 'Network & Offline', icon: <WifiOff size={16} /> },
            { id: 'permission', label: 'Permissions (401/403)', icon: <ShieldAlert size={16} /> },
            { id: 'loading', label: 'Skeletons & Loaders', icon: <Loader size={16} /> },
            { id: 'lifecycle', label: 'Universal Data Lifecycle', icon: <RefreshCw size={16} /> },
            { id: 'file_form', label: 'File & Form States', icon: <FileText size={16} /> },
            { id: 'success_fail', label: 'Success & Failure', icon: <CheckCircle2 size={16} /> },
            { id: 'maintenance', label: 'Maintenance Mode', icon: <Wrench size={16} /> },
            { id: 'status', label: 'Live System Status', icon: <Activity size={16} /> },
            { id: 'security', label: 'Device & Security', icon: <Shield size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '13px',
                fontWeight: activeTab === tab.id ? 700 : 600,
                background: activeTab === tab.id ? '#4F46E5' : 'var(--bg-tertiary, #F8FAFC)',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary, #64748B)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB 1: ERROR PAGES ─── */}
        {activeTab === 'errors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Select Error Variant:</span>
              {(['404', '500', '503', 'custom'] as ErrorType[]).map((err) => (
                <button
                  key={err}
                  type="button"
                  onClick={() => setSelectedError(err)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '100px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: selectedError === err ? '#4F46E5' : 'var(--bg-surface)',
                    color: selectedError === err ? '#FFFFFF' : 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  Error {err.toUpperCase()}
                </button>
              ))}
            </div>

            <ErrorPage
              type={selectedError}
              errorDetails={selectedError === '500' ? 'Uncaught TypeError: Cannot read properties of undefined (reading "branch_id") at AcademicTranscriptsController.ts:142' : undefined}
              onRetry={() => alert('Simulated API Retry Attempt Executed!')}
            />
          </div>
        )}

        {/* ─── TAB 2: EMPTY STATES ─── */}
        {activeTab === 'empty' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Select Preset Scenario:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {EMPTY_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSelectedEmpty(preset)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '100px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      background: selectedEmpty === preset ? '#4F46E5' : 'var(--bg-surface)',
                      color: selectedEmpty === preset ? '#FFFFFF' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <EmptyState
              preset={selectedEmpty}
              suggestions={selectedEmpty === 'search' ? ['Grade 10 Syllabus', 'Term 1 Exam Timetable', 'Fee Receipts 2026', 'Sports Meet'] : undefined}
              onPrimaryAction={() => alert(`Executed primary action for ${selectedEmpty}`)}
              onSecondaryAction={() => alert('Refreshing list data...')}
            />
          </div>
        )}

        {/* ─── TAB 3: NETWORK & OFFLINE STATES ─── */}
        {activeTab === 'network' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Network Connection & Latency States</h3>
            <NetworkStatePages
              onRetryConnection={() => alert('Checking server ping...')}
              onContinueOffline={() => alert('Entering offline mode...')}
            />
          </div>
        )}

        {/* ─── TAB 4: PERMISSION STATES ─── */}
        {activeTab === 'permission' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedError('401' as any)}
                style={{ fontSize: '13px' }}
              >
                Show 401 Session Expired
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedError('403' as any)}
                style={{ fontSize: '13px' }}
              >
                Show 403 Access Forbidden
              </button>
            </div>

            <PermissionPages type={selectedError === '401' ? '401' : '403'} />
          </div>
        )}

        {/* ─── TAB 5: LOADING SKELETONS ─── */}
        {activeTab === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Dashboard Page Layout Skeleton</h4>
              <PageSkeleton />
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Data Table Shimmer Skeleton</h4>
              <TableSkeleton rows={4} cols={5} />
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Audit Timeline Skeleton</h4>
              <TimelineSkeleton />
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Media Gallery Grid Skeleton</h4>
              <GallerySkeleton />
            </div>
          </div>
        )}

        {/* ─── TAB 6: UNIVERSAL DATA LIFECYCLE ─── */}
        {activeTab === 'lifecycle' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              className="card"
              style={{
                padding: '20px',
                borderRadius: '18px',
                background: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0' }}>Simulate API Request Lifecycle State</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  Test the unified wrapper handling <code style={{ color: '#4F46E5' }}>Loading → Success → Empty → Error → Retry → Recovered</code>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['loading', 'success', 'empty', 'error', 'refreshing'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLifecycleState(st)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      background: lifecycleState === st ? '#4F46E5' : 'var(--bg-tertiary)',
                      color: lifecycleState === st ? '#FFFFFF' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    State: {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Live DataStateWrapper Container */}
            <DataStateWrapper
              loading={lifecycleState === 'loading'}
              empty={lifecycleState === 'empty'}
              error={lifecycleState === 'error' ? new Error('Database Connection Pool Exceeded') : null}
              isRefreshing={lifecycleState === 'refreshing'}
              onRetry={() => setLifecycleState('success')}
              emptyProps={{ preset: 'students' }}
            >
              <div
                className="card"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', fontWeight: 700, marginBottom: '10px' }}>
                  <Sparkles size={20} />
                  <span>Data Successfully Fetched & Recovered!</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0' }}>Grade 10 Academic Performance Transcript</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  Showing 42 student records verified for the upcoming CBSE Term 1 examination round.
                </p>
              </div>
            </DataStateWrapper>
          </div>
        )}

        {/* ─── TAB 7: FILE & FORM STATES ─── */}
        {activeTab === 'file_form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>File Processing & Validation Feedback</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <FileUploadWidget fileName="Physics_Lab_Log_Grade12.pdf" fileSize="4.2 MB" progress={85} status="uploading" />
              <FileUploadWidget fileName="Mathematics_Mock_Key.docx" fileSize="1.8 MB" progress={100} status="success" />
              <FileUploadWidget fileName="Annual_Financial_Audit.zip" fileSize="48.5 MB" status="too_large" />
              <FileUploadWidget fileName="Student_Photo_Batch.exe" fileSize="12.0 MB" status="unsupported" />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '10px 0 0 0' }}>Form States & Unsaved Change Alerts</h3>

            <FormStateFeedback
              hasUnsavedChanges={true}
              autoSavedTimestamp="13:41:05 EST"
              validationErrors={['Parent Contact Phone number must contain 10 digits', 'Student Date of Birth is required for CBSE registration']}
              onSave={() => alert('Changes saved to database!')}
              onDiscard={() => alert('Discarded draft revisions.')}
            />
          </div>
        )}

        {/* ─── TAB 8: SUCCESS & FAILURE PAGES ─── */}
        {activeTab === 'success_fail' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Success Preset:</span>
              {SUCCESS_PRESETS_LIST.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSelectedSuccess(preset)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '100px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    background: selectedSuccess === preset ? '#10B981' : 'var(--bg-surface)',
                    color: selectedSuccess === preset ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>

            <SuccessPage preset={selectedSuccess} />
            <FailurePage title="Tuition Fee Payment Declined" errorCode="PAY_DECLINED_INSUFFICIENT_FUNDS_402" />
          </div>
        )}

        {/* ─── TAB 9: MAINTENANCE MODE ─── */}
        {activeTab === 'maintenance' && <MaintenancePage />}

        {/* ─── TAB 10: LIVE SYSTEM STATUS ─── */}
        {activeTab === 'status' && <SystemStatusPage />}

        {/* ─── TAB 11: DEVICE & SECURITY ─── */}
        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Device & Orientation Notices</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <DeviceStateNotice type="screen_too_small" />
              <DeviceStateNotice type="rotate_device" />
              <DeviceStateNotice type="unsupported_browser" />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '10px 0 0 0' }}>Security Verification & Protection</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <SecurityStateNotice type="security_verification" />
              <SecurityStateNotice type="suspicious_activity" />
            </div>

            <div
              className="card"
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: '#FFF1F2',
                border: '1px solid #FECDD3',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#BE123C', margin: '0 0 4px 0' }}>
                  Test Global React Error Boundary Crash Recovery
                </h4>
                <p style={{ fontSize: '12.5px', color: '#9F1239', margin: 0 }}>
                  Click to trigger a deliberate component render exception and view the Error Boundary recovery UI.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setTriggerCrash(true)}
                style={{ backgroundColor: '#E11D48', borderColor: '#E11D48', borderRadius: '10px', fontSize: '12.5px' }}
              >
                Trigger Live Component Crash
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
