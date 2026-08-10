import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  ShieldCheck 
} from 'lucide-react';

interface SettingsHeaderProps {
  onSaveChanges: () => void;
  onResetDefaults: () => void;
  onExportConfig: () => void;
  onImportSettings: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  onSaveChanges,
  onResetDefaults,
  onExportConfig,
  onImportSettings
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #5FAF88 0%, #3B7E5E 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(95, 175, 136, 0.3)'
            }}>
              <Settings size={22} />
            </div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Academic Settings & Configuration Center
            </h1>
            <span style={{
              background: '#EAF5F0',
              color: '#3B7E5E',
              border: '1px solid rgba(95, 175, 136, 0.3)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={14} /> Institutional Governance
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', color: '#64748B', fontSize: '14px', maxWidth: '820px' }}>
            Configure institutional academic operations, policies, workflows, examinations, curriculum, attendance rules, and learning preferences.
          </p>
        </div>

        {/* Primary Actions Suite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Save Changes */}
          <button
            onClick={onSaveChanges}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #5FAF88 0%, #479670 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(95, 175, 136, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Save size={16} /> Save Changes
          </button>

          {/* Reset Defaults */}
          <button
            onClick={onResetDefaults}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={15} color="#3B7E5E" /> Reset Defaults
          </button>

          {/* Export Configuration */}
          <button
            onClick={onExportConfig}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={15} color="#3B82F6" /> Export Config
          </button>

          {/* Import Settings */}
          <button
            onClick={onImportSettings}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#475569',
              border: '1px solid #CBD5E1',
              padding: '10px 12px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Upload size={15} /> Import Settings
          </button>

        </div>
      </div>
    </div>
  );
};
