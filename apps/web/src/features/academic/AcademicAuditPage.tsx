import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  AuditChecklistItem, 
  DepartmentAuditItem, 
  TeacherAuditCompliance, 
  CurriculumComplianceItem, 
  CorrectiveActionItem, 
  AIAuditInsight, 
  AuditAlert 
} from './audit/types';

// Mock Data
import { 
  mockChecklistItems, 
  mockDepartmentAudits, 
  mockTeacherAuditList, 
  mockCurriculumComplianceList, 
  mockCorrectiveActions, 
  mockAIAuditInsights, 
  mockAuditAlerts 
} from './audit/mockData';

// Components & Layout
import { ManagementLayout } from './layouts/ManagementLayout';
import { AuditHeader } from './audit/components/AuditHeader';
import { AuditExecutiveBanner } from './audit/components/AuditExecutiveBanner';
import { AuditKPICards } from './audit/components/AuditKPICards';
import { AuditWorkflowTimeline } from './audit/components/AuditWorkflowTimeline';
import { AuditChecklistGrid } from './audit/components/AuditChecklistGrid';
import { DepartmentAuditsGrid } from './audit/components/DepartmentAuditsGrid';
import { TeacherComplianceTable } from './audit/components/TeacherComplianceTable';
import { CurriculumComplianceTracker } from './audit/components/CurriculumComplianceTracker';
import { AcademicRiskCenter } from './audit/components/AcademicRiskCenter';
import { CorrectiveActionTracker } from './audit/components/CorrectiveActionTracker';
import { AIAuditInsights } from './audit/components/AIAuditInsights';
import { AcademicTimelineFeed } from './audit/components/AcademicTimelineFeed';
import { RightSidebarAlerts } from './audit/components/RightSidebarAlerts';
import { BottomReportsExport } from './audit/components/BottomReportsExport';
import { StartAuditModal } from './audit/components/StartAuditModal';

// Icons
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AcademicAuditPage() {
  // State
  const [checklist] = useState<AuditChecklistItem[]>(mockChecklistItems);
  const [departments] = useState<DepartmentAuditItem[]>(mockDepartmentAudits);
  const [teachers] = useState<TeacherAuditCompliance[]>(mockTeacherAuditList);
  const [curriculum] = useState<CurriculumComplianceItem[]>(mockCurriculumComplianceList);
  const [correctiveActions, setCorrectiveActions] = useState<CorrectiveActionItem[]>(mockCorrectiveActions);
  const [alerts, setAlerts] = useState<AuditAlert[]>(mockAuditAlerts);

  // Modals & Toast State
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleReviewChecklist = (item: AuditChecklistItem) => {
    showToast(`Opening compliance audit dossier for ${item.category}...`);
  };

  const handleViewDepartment = (dept: DepartmentAuditItem) => {
    showToast(`Opening department quality audit report for ${dept.departmentName}...`);
  };

  const handleStartDepartmentReview = (dept: DepartmentAuditItem) => {
    showToast(`Initiated quality inspection review for ${dept.departmentName}`);
  };

  const handleViewTeacherAudit = (t: TeacherAuditCompliance) => {
    showToast(`Opening teacher academic audit scorecard for ${t.teacherName}...`);
  };

  const handleRemindTeacher = (t: TeacherAuditCompliance) => {
    showToast(`Audit compliance reminder dispatched to ${t.teacherName}`);
  };

  const handleInterveneTeacher = (t: TeacherAuditCompliance) => {
    showToast(`Quality intervention & peer mentoring assigned for ${t.teacherName}`);
  };

  const handleUpdateCorrectiveStatus = (item: CorrectiveActionItem) => {
    showToast(`Updating status & progress for corrective item "${item.issueTitle}"...`);
  };

  const handleResolveCorrectiveIssue = (id: string) => {
    setCorrectiveActions(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved', progressPct: 100 } : c));
    showToast(`Corrective action marked as RESOLVED ✓`);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    showToast(`Academic alert resolved.`);
  };

  const handleTakeAIAction = (insight: AIAuditInsight) => {
    showToast(`AI Quality Action Executed: ${insight.suggestedIntervention}`);
  };

  const handleExport = (reportName: string, format: string) => {
    showToast(`Exporting official ${format} document for "${reportName}"...`);
  };

  const handleAuditSubmit = (data: any) => {
    showToast(`New Audit Cycle "${data.auditTitle}" launched for ${data.department}!`);
  };

  return (
    <ManagementLayout
      breadcrumbs={[{ label: 'Academic' }, { label: 'Academic Audit' }]}
      title="Academic Audit & Quality Control"
      subtitle="Comprehensive quality assurance, compliance monitoring, and accreditation audit studio."
      roleBadge="QUALITY ASSURANCE"
      headerActions={
        <AuditHeader
          onStartAudit={() => setIsStartModalOpen(true)}
          onScheduleAudit={() => showToast('Opening Master Academic Audit Calendar...')}
          onCreateChecklist={() => showToast('Opening Audit Checklist Configurator...')}
          onExportReport={() => handleExport('Master Academic Audit Report', 'PDF')}
        />
      }
      kpiCards={<AuditKPICards />}
      actionBar={<AuditWorkflowTimeline />}
      mainContent={
        <>
          {/* Toast Notification */}
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

          <AuditExecutiveBanner />

          <AuditChecklistGrid
            checklist={checklist}
            onReviewChecklist={handleReviewChecklist}
          />

          <DepartmentAuditsGrid
            departments={departments}
            onViewDepartment={handleViewDepartment}
            onStartReview={handleStartDepartmentReview}
          />

          <TeacherComplianceTable
            teachers={teachers}
            onViewAudit={handleViewTeacherAudit}
            onRemind={handleRemindTeacher}
            onIntervene={handleInterveneTeacher}
          />

          <CurriculumComplianceTracker curriculumList={curriculum} />

          <AcademicRiskCenter />

          <CorrectiveActionTracker
            actions={correctiveActions}
            onUpdateStatus={handleUpdateCorrectiveStatus}
            onResolveIssue={handleResolveCorrectiveIssue}
          />

          <BottomReportsExport onExport={handleExport} />
        </>
      }
      sidePanel={
        <>
          <RightSidebarAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Audit Governance Studio
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Initiate new quality audits, schedule department inspections, and verify CBSE compliance standards.
            </p>
            <button
              onClick={() => setIsStartModalOpen(true)}
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
              Launch Audit Cycle
            </button>
          </div>
        </>
      }
      aiPanel={
        <AIAuditInsights
          insights={mockAIAuditInsights}
          onTakeAction={handleTakeAIAction}
        />
      }
      activityTimeline={<AcademicTimelineFeed />}
    />
  );
}
