import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { SettingsSectionKey, AcademicSettingsConfig } from './settings/types';

// Mock Data
import { initialAcademicSettings } from './settings/mockData';

// Components & Layout
import { SettingsLayout } from './layouts/SettingsLayout';
import { SettingsHeader } from './settings/components/SettingsHeader';
import { SettingsLeftNav } from './settings/components/SettingsLeftNav';
import { SectionAcademicYear } from './settings/components/SectionAcademicYear';
import { SectionCurriculum } from './settings/components/SectionCurriculum';
import { SectionGrading } from './settings/components/SectionGrading';
import { SectionAttendance } from './settings/components/SectionAttendance';
import { SectionAssignment } from './settings/components/SectionAssignment';
import { SectionLessonPlan } from './settings/components/SectionLessonPlan';
import { SectionOnlineLearning } from './settings/components/SectionOnlineLearning';
import { SectionOnlineExam } from './settings/components/SectionOnlineExam';
import { SectionQuestionBank } from './settings/components/SectionQuestionBank';
import { SectionNotifications } from './settings/components/SectionNotifications';
import { SectionApprovalWorkflow } from './settings/components/SectionApprovalWorkflow';
import { SectionAcademicCalendar } from './settings/components/SectionAcademicCalendar';
import { SectionReports } from './settings/components/SectionReports';
import { SectionIntegrations } from './settings/components/SectionIntegrations';
import { RightSidebarConfigHealth } from './settings/components/RightSidebarConfigHealth';
import { BottomAuditLog } from './settings/components/BottomAuditLog';

// Icons
import { CheckCircle2, Settings } from 'lucide-react';

export default function AcademicSettingsPage() {
  // State
  const [activeSection, setActiveSection] = useState<SettingsSectionKey>('academic-year');
  const [config, setConfig] = useState<AcademicSettingsConfig>(initialAcademicSettings);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfigChange = (updates: Partial<AcademicSettingsConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    showToast('Academic configuration state updated.');
  };

  const handleSaveChanges = () => {
    showToast('All 14 Academic Configuration categories saved & synced across EduVerse ERP!');
  };

  const handleResetDefaults = () => {
    setConfig(initialAcademicSettings);
    showToast('Academic settings reset to institutional defaults.');
  };

  const handleExportConfig = () => {
    showToast('Exporting academic configuration JSON/XML backup...');
  };

  const handleImportSettings = () => {
    showToast('Opening academic configuration import wizard...');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'academic-year':
        return (
          <SectionAcademicYear
            config={config}
            onChange={handleConfigChange}
            onUpdateAcademicYear={() => showToast('Academic session updated to 2026-2027.')}
            onGenerateCalendar={() => showToast('Master academic calendar generated.')}
          />
        );
      case 'curriculum':
        return <SectionCurriculum config={config} onChange={handleConfigChange} />;
      case 'grading':
        return <SectionGrading config={config} onChange={handleConfigChange} />;
      case 'attendance':
        return <SectionAttendance config={config} onChange={handleConfigChange} />;
      case 'assignment':
        return <SectionAssignment config={config} onChange={handleConfigChange} />;
      case 'lesson-plan':
        return <SectionLessonPlan config={config} onChange={handleConfigChange} />;
      case 'online-learning':
        return <SectionOnlineLearning config={config} onChange={handleConfigChange} />;
      case 'online-exam':
        return <SectionOnlineExam config={config} onChange={handleConfigChange} />;
      case 'question-bank':
        return <SectionQuestionBank config={config} onChange={handleConfigChange} />;
      case 'notifications':
        return <SectionNotifications config={config} onChange={handleConfigChange} />;
      case 'approval-workflow':
        return <SectionApprovalWorkflow config={config} onChange={handleConfigChange} />;
      case 'academic-calendar':
        return <SectionAcademicCalendar config={config} onChange={handleConfigChange} />;
      case 'reports':
        return <SectionReports />;
      case 'integrations':
        return <SectionIntegrations />;
      default:
        return null;
    }
  };

  return (
    <SettingsLayout
      breadcrumbs={[{ label: 'Academic' }, { label: 'Settings' }]}
      title="Academic Settings & Governance Studio"
      subtitle="Configure master academic year rules, grading schemes, curriculum standards, and ERP policy automation."
      roleBadge="SYSTEM CONFIGURATION"
      headerActions={
        <SettingsHeader
          onSaveChanges={handleSaveChanges}
          onResetDefaults={handleResetDefaults}
          onExportConfig={handleExportConfig}
          onImportSettings={handleImportSettings}
        />
      }
      categoryNav={
        <SettingsLeftNav
          activeSection={activeSection}
          onSelectSection={(key) => {
            setActiveSection(key);
            showToast(`Switched settings view to "${key.replace('-', ' ').toUpperCase()}"`);
          }}
        />
      }
      mainConfigContent={
        <>
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'fixed',
                  top: '20px',
                  right: '24px',
                  zIndex: 10000,
                  background: '#0F172A',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderLeft: '4px solid #5FAF88'
                }}
              >
                <CheckCircle2 size={18} color="#5FAF88" />
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {renderActiveSection()}
        </>
      }
      previewOrSidebar={
        <>
          <RightSidebarConfigHealth />

          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Settings size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Settings Sync Studio
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Sync all institutional policy updates across teacher logbooks, student portals, and parent apps.
            </p>
            <button
              onClick={handleSaveChanges}
              style={{
                width: '100%',
                background: '#5FAF88',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Commit & Save Settings
            </button>
          </div>
        </>
      }
      auditStream={<BottomAuditLog />}
    />
  );
}
