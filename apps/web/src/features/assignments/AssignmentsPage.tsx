import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  AssignmentItem, 
  TeacherAssignmentPerformance, 
  AIAssignmentInsight, 
  AssignmentAlert 
} from './types';

// Mock Data
import { 
  mockAssignments, 
  mockTeacherPerformance, 
  mockAIAssignmentInsights, 
  mockAssignmentAlerts 
} from './mockData';

// Components
import { AssignmentHeader } from './components/AssignmentHeader';
import { AssignmentHeroBanner } from './components/AssignmentHeroBanner';
import { AssignmentKPICards } from './components/AssignmentKPICards';
import { AssignmentLifecycleTimeline } from './components/AssignmentLifecycleTimeline';
import { AssignmentKanbanBoard } from './components/AssignmentKanbanBoard';
import { TodayAssignmentsTable } from './components/TodayAssignmentsTable';
import { SubmissionMonitorPanel } from './components/SubmissionMonitorPanel';
import { TeacherPerformanceMatrix } from './components/TeacherPerformanceMatrix';
import { StudentEngagementPanel } from './components/StudentEngagementPanel';
import { AIAssignmentInsights } from './components/AIAssignmentInsights';
import { RightSidebarAlerts } from './components/RightSidebarAlerts';
import { BottomReportsExport } from './components/BottomReportsExport';
import { CreatePolicyModal } from './components/CreatePolicyModal';

// Icons
import { CheckCircle2, ShieldCheck, Calendar } from 'lucide-react';

export default function AssignmentsPage() {
  // State
  const [assignments, setAssignments] = useState<AssignmentItem[]>(mockAssignments);
  const [teachers, setTeachers] = useState<TeacherAssignmentPerformance[]>(mockTeacherPerformance);
  const [alerts, setAlerts] = useState<AssignmentAlert[]>(mockAssignmentAlerts);

  // Modals & Toast State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleOpenAssignment = (item: AssignmentItem) => {
    showToast(`Opening supervisory dossier for "${item.title}"...`);
  };

  const handleMonitorAssignment = (item: AssignmentItem) => {
    showToast(`Monitoring live submission feed for ${item.subject} (${item.grade}-${item.section})...`);
  };

  const handleAnalyticsAssignment = (item: AssignmentItem) => {
    showToast(`Opening score analytics breakdown for ${item.title}...`);
  };

  const handleRemindTeacher = (teacherName: string) => {
    showToast(`Automated 48-hr marking SLA reminder sent to ${teacherName}`);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    showToast(`Assignment alert resolved.`);
  };

  const handleTakeAIAction = (insight: AIAssignmentInsight) => {
    showToast(`AI Intervention Executed: ${insight.suggestedAction}`);
  };

  const handleExport = (reportName: string, format: string) => {
    showToast(`Exporting official ${format} document for "${reportName}"...`);
  };

  const handlePolicySubmit = (policy: any) => {
    showToast(`Institutional Policy "${policy.title}" published & broadcasted to all HODs!`);
  };

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      paddingBottom: '60px',
      background: '#F8FAFC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }}>

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

      {/* 1. PAGE HEADER */}
      <AssignmentHeader
        onCalendarClick={() => showToast('Opening Master Institutional Assignment Calendar...')}
        onReviewPendingClick={() => showToast('Opening 18 pending assignment drafts for coordinator review...')}
        onCreatePolicyClick={() => setIsPolicyModalOpen(true)}
        onExportReportsClick={() => handleExport('Master Assignment Summary', 'PDF')}
      />

      {/* 2. HERO COMMAND CENTER BANNER */}
      <AssignmentHeroBanner />

      {/* 3. TOP KPI CARDS */}
      <AssignmentKPICards />

      {/* 4. ASSIGNMENT LIFECYCLE PIPELINE */}
      <AssignmentLifecycleTimeline />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN OPERATIONS MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 5. ASSIGNMENT STATUS KANBAN BOARD */}
          <AssignmentKanbanBoard
            assignments={assignments}
            onOpen={handleOpenAssignment}
            onMonitor={handleMonitorAssignment}
            onAnalytics={handleAnalyticsAssignment}
          />

          {/* 6. TODAY'S ASSIGNMENTS LEDGER TABLE */}
          <TodayAssignmentsTable
            assignments={assignments}
            onViewDetails={handleOpenAssignment}
            onRemindTeacher={(row) => handleRemindTeacher(row.teacherName)}
            onAudit={(row) => showToast(`Auditing rubric compliance for ${row.title}...`)}
          />

          {/* 7. SUBMISSION MONITOR & ANALYTICS */}
          <SubmissionMonitorPanel />

          {/* 8. TEACHER PERFORMANCE & SLA MATRIX */}
          <TeacherPerformanceMatrix
            teachers={teachers}
            onRemindTeacher={(t) => handleRemindTeacher(t.teacherName)}
          />

          {/* 9. STUDENT ENGAGEMENT ANALYTICS */}
          <StudentEngagementPanel />

          {/* 10. AI ASSIGNMENT INSIGHTS */}
          <AIAssignmentInsights
            insights={mockAIAssignmentInsights}
            onTakeAction={handleTakeAIAction}
          />

          {/* 11. BOTTOM REPORTS & EXPORT SECTION */}
          <BottomReportsExport onExport={handleExport} />

        </div>

        {/* RIGHT COLUMN: RIGHT SIDEBAR ALERTS & QUICK WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px' }}>
          
          <RightSidebarAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          {/* QUICK SLA CALENDAR WIDGET */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Calendar size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Weekly Workload Balancer
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Prevent student assignment overload by checking daily deadline density across subjects.
            </p>
            <button
              onClick={() => showToast('Weekly Workload Heatmap loaded for all grades!')}
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
              View Workload Heatmap
            </button>
          </div>

        </div>

      </div>

      {/* POLICY MODAL */}
      <CreatePolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onSubmit={handlePolicySubmit}
      />

    </div>
  );
}
