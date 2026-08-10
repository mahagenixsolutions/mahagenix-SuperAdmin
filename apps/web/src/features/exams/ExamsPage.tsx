import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  LiveExamSession, 
  ScheduledExam, 
  QuestionPaperCard, 
  TeacherExamResponsibility, 
  AIExamInsight, 
  ExamAlert 
} from './types';

// Mock Data
import { 
  mockLiveExamSessions, 
  mockScheduledExams, 
  mockQuestionPaperKanban, 
  mockTeacherResponsibilities, 
  mockPlatformTelemetry, 
  mockAIExamInsights, 
  mockExamAlerts 
} from './mockData';

// Components
import { ExamHeader } from './components/ExamHeader';
import { ExecutiveHeroBanner } from './components/ExecutiveHeroBanner';
import { ExamKPICards } from './components/ExamKPICards';
import { ExamLifecycleTimeline } from './components/ExamLifecycleTimeline';
import { LiveExamMonitor } from './components/LiveExamMonitor';
import { ExamScheduleCalendar } from './components/ExamScheduleCalendar';
import { QuestionPaperKanban } from './components/QuestionPaperKanban';
import { QuestionBankInsights } from './components/QuestionBankInsights';
import { TeacherResponsibilitiesGrid } from './components/TeacherResponsibilitiesGrid';
import { ExamPlatformHealth } from './components/ExamPlatformHealth';
import { StudentReadinessPanel } from './components/StudentReadinessPanel';
import { AIExamInsights } from './components/AIExamInsights';
import { ResultProcessingPanel } from './components/ResultProcessingPanel';
import { ExamAnalyticsPanel } from './components/ExamAnalyticsPanel';
import { RightSidebarAlerts } from './components/RightSidebarAlerts';
import { BottomReportsExport } from './components/BottomReportsExport';
import { CreateExamModal } from './components/CreateExamModal';

// Icons
import { CheckCircle2, ShieldCheck, Ticket } from 'lucide-react';

export default function ExamsPage() {
  // State management
  const [liveSessions, setLiveSessions] = useState<LiveExamSession[]>(mockLiveExamSessions);
  const [schedule, setSchedule] = useState<ScheduledExam[]>(mockScheduledExams);
  const [kanbanPapers, setKanbanPapers] = useState<QuestionPaperCard[]>(mockQuestionPaperKanban);
  const [teachers, setTeachers] = useState<TeacherExamResponsibility[]>(mockTeacherResponsibilities);
  const [alerts, setAlerts] = useState<ExamAlert[]>(mockExamAlerts);

  // Modals & Toast State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ref for scrolling to schedule timeline
  const scheduleRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers
  const handleScrollToSchedule = () => {
    scheduleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleObserveExam = (session: LiveExamSession) => {
    showToast(`Joining AI Proctoring feed for ${session.examTitle}...`);
  };

  const handleViewLiveDashboard = (session: LiveExamSession) => {
    showToast(`Opening live telemetry for ${session.subject} (${session.grade}-${session.section})...`);
  };

  const handlePauseExam = (sessionId: string) => {
    setLiveSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s));
    showToast(`Exam session state toggled for ID: ${sessionId}`);
  };

  const handleGenerateAdmitCard = (exam: ScheduledExam) => {
    showToast(`Generating official PDF Admit Card batch for ${exam.title} (${exam.grade})...`);
  };

  const handleApprovePaper = (paperId: string) => {
    setKanbanPapers(prev => prev.map(p => p.id === paperId ? { ...p, status: 'Approved' } : p));
    showToast(`Question Paper #${paperId} approved and cryptographically locked!`);
  };

  const handleRejectPaper = (paperId: string) => {
    setKanbanPapers(prev => prev.map(p => p.id === paperId ? { ...p, status: 'Draft' } : p));
    showToast(`Question Paper #${paperId} sent back to author for corrections.`);
  };

  const handleRemindTeacher = (teacher: TeacherExamResponsibility) => {
    showToast(`Automated HOD evaluation SLA reminder dispatched to ${teacher.teacherName}`);
  };

  const handleTakeAIAction = (insight: AIExamInsight) => {
    showToast(`AI Directive Executed: ${insight.actionText} for ${insight.affectedSubjectOrGrade}`);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    showToast(`Urgency alert marked as resolved.`);
  };

  const handleExportReport = (reportTitle: string, format: string) => {
    showToast(`Exporting official ${format} document for "${reportTitle}"...`);
  };

  const handleCreateExamSubmit = (newExam: ScheduledExam) => {
    setSchedule(prev => [newExam, ...prev]);
    showToast(`New Examination Block "${newExam.title}" scheduled successfully!`);
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
      <ExamHeader
        onCreateExam={() => setIsCreateModalOpen(true)}
        onPublishSchedule={() => showToast('Master Exam Timetable published to student & parent portals!')}
        onImportQuestionBank={() => showToast('Opening Q-Bank CSV / QTI 2.1 Importer...')}
        onGenerateAdmitCards={() => showToast('Generating batch Hall Tickets for 1,420 candidates...')}
        onPublishResults={() => showToast('Opening Result Publication Gate...')}
      />

      {/* 2. EXECUTIVE HERO BANNER */}
      <ExecutiveHeroBanner
        onManageSchedule={handleScrollToSchedule}
        onOpenCalendar={() => showToast('Opening Master Academic Calendar View...')}
      />

      {/* 3. TOP KPI CARDS */}
      <ExamKPICards />

      {/* 4. EXAM LIFECYCLE TIMELINE */}
      <ExamLifecycleTimeline />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN COMMAND CENTER MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 5. LIVE EXAM MONITOR */}
          <LiveExamMonitor
            sessions={liveSessions}
            onObserveExam={handleObserveExam}
            onViewLiveDashboard={handleViewLiveDashboard}
            onPauseExam={handlePauseExam}
          />

          {/* 6. EXAM SCHEDULE & CALENDAR */}
          <div ref={scheduleRef}>
            <ExamScheduleCalendar
              schedule={schedule}
              onGenerateAdmitCard={handleGenerateAdmitCard}
            />
          </div>

          {/* 7. QUESTION PAPER STATUS (KANBAN) */}
          <QuestionPaperKanban
            papers={kanbanPapers}
            onPreview={(paper) => showToast(`Opening secure PDF preview for ${paper.subject} (${paper.grade})...`)}
            onApprove={handleApprovePaper}
            onReject={handleRejectPaper}
            onRequestChanges={(paper) => showToast(`Review comment requested for ${paper.subject}`)}
          />

          {/* 8. QUESTION BANK INSIGHTS */}
          <QuestionBankInsights />

          {/* 9. TEACHER RESPONSIBILITIES */}
          <TeacherResponsibilitiesGrid
            teachers={teachers}
            onRemindTeacher={handleRemindTeacher}
          />

          {/* 10. ONLINE EXAM PLATFORM HEALTH */}
          <ExamPlatformHealth telemetry={mockPlatformTelemetry} />

          {/* 11. STUDENT READINESS */}
          <StudentReadinessPanel />

          {/* 12. AI EXAM INSIGHTS */}
          <AIExamInsights
            insights={mockAIExamInsights}
            onTakeAction={handleTakeAIAction}
          />

          {/* 13. RESULT PROCESSING */}
          <ResultProcessingPanel
            onApproveResults={() => showToast('Compiling GPAs & Approving Result Dossiers...')}
            onPublishResults={() => showToast('🎉 Term Results published to Parental Portals!')}
          />

          {/* 14. EXAM ANALYTICS */}
          <ExamAnalyticsPanel />

          {/* 15. BOTTOM REPORTS & EXPORT SECTION */}
          <BottomReportsExport onExport={handleExportReport} />

        </div>

        {/* RIGHT COLUMN: RIGHT SIDEBAR ALERTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px' }}>
          
          <RightSidebarAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          {/* QUICK ADMIT CARD GENERATOR WIDGET */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Ticket size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Admit Card Dispatcher
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Generate barcode-verified hall tickets for 1,420 eligible candidates with seat numbers.
            </p>
            <button
              onClick={() => showToast('Batch Admit Card generation queued... PDF zip downloading.')}
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
              Generate All Admit Cards
            </button>
          </div>

        </div>

      </div>

      {/* CREATE EXAM MODAL */}
      <CreateExamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateExamSubmit}
      />

    </div>
  );
}
