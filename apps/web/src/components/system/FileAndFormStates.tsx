import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  FileText,
  X,
  FileCode,
  DownloadCloud,
  Save,
  AlertCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';

export interface FileUploadStateProps {
  fileName?: string;
  fileSize?: string;
  progress?: number;
  status?: 'uploading' | 'success' | 'failed' | 'too_large' | 'unsupported';
  onRetry?: () => void;
  onRemove?: () => void;
}

export const FileUploadWidget: React.FC<FileUploadStateProps> = ({
  fileName = 'Term_1_Examination_Schedule.pdf',
  fileSize = '14.2 MB',
  progress = 68,
  status = 'uploading',
  onRetry,
  onRemove,
}) => {
  return (
    <div
      className="card"
      style={{
        padding: '18px 20px',
        borderRadius: '16px',
        background: 'var(--bg-surface, #FFFFFF)',
        border: `1px solid ${
          status === 'failed' || status === 'too_large' || status === 'unsupported'
            ? '#FECDD3'
            : status === 'success'
            ? '#A7F3D0'
            : 'var(--border-subtle, #E2E8F0)'
        }`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background:
                status === 'failed' || status === 'too_large'
                  ? '#FFF1F2'
                  : status === 'success'
                  ? '#ECFDF5'
                  : '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color:
                status === 'failed' || status === 'too_large'
                  ? '#E11D48'
                  : status === 'success'
                  ? '#059669'
                  : '#4F46E5',
              flexShrink: 0,
            }}
          >
            {status === 'failed' || status === 'too_large' ? (
              <AlertTriangle size={20} />
            ) : status === 'success' ? (
              <CheckCircle2 size={20} />
            ) : (
              <FileText size={20} />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', truncate: true }}>
              {fileName}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              {status === 'uploading'
                ? `Uploading... ${progress}% (${fileSize})`
                : status === 'success'
                ? `Upload Verified • ${fileSize}`
                : status === 'too_large'
                ? `File exceeds 25MB threshold (${fileSize})`
                : status === 'unsupported'
                ? `Unsupported file type. Use PDF, DOCX, or ZIP`
                : `Upload failed due to connection timeout`}
            </div>
          </div>
        </div>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {status === 'uploading' && (
        <div style={{ width: '100%', height: '5px', borderRadius: '99px', background: '#E2E8F0', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#4F46E5',
              borderRadius: '99px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}
    </div>
  );
};

export interface FormStateBannerProps {
  isSubmitting?: boolean;
  hasUnsavedChanges?: boolean;
  autoSavedTimestamp?: string;
  validationErrors?: string[];
  onSave?: () => void;
  onDiscard?: () => void;
}

export const FormStateFeedback: React.FC<FormStateBannerProps> = ({
  isSubmitting = false,
  hasUnsavedChanges = true,
  autoSavedTimestamp = 'Just now',
  validationErrors = [],
  onSave,
  onDiscard,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* Auto-saved indicator pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#059669', fontWeight: 600 }}>
        <Clock size={14} />
        <span>Auto-saved to cloud draft at {autoSavedTimestamp}</span>
      </div>

      {/* Validation Errors Box */}
      {validationErrors.length > 0 && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '14px',
            background: '#FFF1F2',
            border: '1px solid #FECDD3',
            color: '#9F1239',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
            <AlertCircle size={16} />
            <span>Form Validation Errors ({validationErrors.length})</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12.5px', lineHeight: 1.5 }}>
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sticky Unsaved Changes Floating Banner */}
      {hasUnsavedChanges && (
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '16px',
            background: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <AlertTriangle size={18} color="#F59E0B" />
            <span>You have unsaved changes in this record.</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={onDiscard}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1E293B',
                color: '#CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSubmitting}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                background: '#4F46E5',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Save size={14} />
              {isSubmitting ? 'Saving Record...' : 'Save Record'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
