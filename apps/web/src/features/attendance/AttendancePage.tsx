import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  ClassAttendanceFeed, 
  AtRiskStudent, 
  TeacherComplianceItem, 
  AIAttendanceInsight, 
  AttendanceAlert 
} from './types';

// Mock Data
import { 
  mockClassAttendanceFeeds, 
  mockAtRiskStudents, 
  mockTeacherCompliance, 
  mockAIAttendanceInsights, 
  mockAttendanceAlerts 
} from './mockData';

// Components
import { AttendanceHeader } from './components/AttendanceHeader';
import { AttendanceHeroBanner } from './components/AttendanceHeroBanner';
import { AttendanceKPICards } from './components/AttendanceKPICards';
import { LiveAttendanceMonitor } from './components/LiveAttendanceMonitor';
import { AttendanceTrendAnalytics } from './components/AttendanceTrendAnalytics';
import { GradePerformanceGrid } from './components/GradePerformanceGrid';
import { LowAttendanceAlertsTable } from './components/LowAttendanceAlertsTable';
import { TeacherComplianceMatrix } from './components/TeacherComplianceMatrix';
import { AbsenceReasonAnalytics } from './components/AbsenceReasonAnalytics';
import { AttendanceHeatmap } from './components/AttendanceHeatmap';
import { ParentNotificationCenter } from './components/ParentNotificationCenter';
import { AIAttendanceInsights } from './components/AIAttendanceInsights';
import { RightSidebarAlerts } from './components/RightSidebarAlerts';
import { BottomReportsExport } from './components/BottomReportsExport';
import { NotifyParentModal } from './components/NotifyParentModal';

// Icons
import { CheckCircle2, ShieldCheck, Users } from 'lucide-react';

export default function AttendancePage() {
  // State
  const [classFeeds] = useState<ClassAttendanceFeed[]>(mockClassAttendanceFeeds);
  const [atRiskStudents] = useState<AtRiskStudent[]>(mockAtRiskStudents);
  const [teachers] = useState<TeacherComplianceItem[]>(mockTeacherCompliance);
  const [alerts, setAlerts] = useState<AttendanceAlert[]>(mockAttendanceAlerts);

  // Modals & Toast State
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleViewClass = (feed: ClassAttendanceFeed) => {
    showToast(`Opening live telemetry for ${feed.className}-${feed.section}...`);
  };

  const handleSendReminder = (feed: ClassAttendanceFeed) => {
    showToast(`Roll call reminder sent to ${feed.teacherName}`);
  };

  const handleOpenAttendance = (feed: ClassAttendanceFeed) => {
    showToast(`Auditing attendance register for ${feed.className}-${feed.section}...`);
  };

  const handleViewProfile = (st: AtRiskStudent) => {
    showToast(`Opening attendance dossier for ${st.studentName} (${st.studentCode})...`);
  };

  const handleNotifyParent = (st: AtRiskStudent) => {
    showToast(`Advisory SMS sent to parent ${st.parentName} (${st.parentPhone})`);
  };

  const handleScheduleMeeting = (st: AtRiskStudent) => {
    showToast(`Parent-Coordinator counseling meeting scheduled for ${st.studentName}`);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    showToast(`Attendance alert resolved.`);
  };

  const handleTakeAIAction = (insight: AIAttendanceInsight) => {
    showToast(`AI Intervention Triggered: ${insight.suggestedIntervention}`);
  };

  const handleExport = (reportName: string, format: string) => {
    showToast(`Exporting official ${format} document for "${reportName}"...`);
  };

  const handleNotifySubmit = (data: any) => {
    showToast(`Batch ${data.channel} broadcast dispatched to ${data.targetGroup}!`);
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
      <AttendanceHeader
        onGenerateReport={() => handleExport('Master Attendance Report', 'PDF')}
        onPoliciesClick={() => showToast('Opening Institutional Attendance Policy Configuration...')}
        onCalendarClick={() => showToast('Opening Master Academic Attendance Calendar...')}
        onExportClick={() => handleExport('Attendance Analytics', 'PDF')}
        onNotifyParentsClick={() => setIsNotifyModalOpen(true)}
      />

      {/* 2. HERO COMMAND CENTER BANNER */}
      <AttendanceHeroBanner
        onViewLive={() => showToast('Focusing on Real-Time Live Attendance Stream...')}
        onSendAlerts={() => setIsNotifyModalOpen(true)}
      />

      {/* 3. TOP KPI CARDS */}
      <AttendanceKPICards />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN ANALYTICS & MONITORING MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 4. LIVE ATTENDANCE MONITOR */}
          <LiveAttendanceMonitor
            feeds={classFeeds}
            onViewClass={handleViewClass}
            onSendReminder={handleSendReminder}
            onOpenAttendance={handleOpenAttendance}
          />

          {/* 5. ATTENDANCE TREND ANALYTICS */}
          <AttendanceTrendAnalytics />

          {/* 6. GRADE PERFORMANCE SCORECARDS */}
          <GradePerformanceGrid
            onViewGrade={(g) => showToast(`Filtering section performance for ${g}...`)}
          />

          {/* 7. LOW ATTENDANCE ALERTS (<75% THRESHOLD) */}
          <LowAttendanceAlertsTable
            students={atRiskStudents}
            onViewProfile={handleViewProfile}
            onNotifyParent={handleNotifyParent}
            onScheduleMeeting={handleScheduleMeeting}
          />

          {/* 8. TEACHER COMPLIANCE MATRIX */}
          <TeacherComplianceMatrix
            teachers={teachers}
            onRemindTeacher={(t) => handleSendReminder({ teacherName: t.teacherName } as any)}
          />

          {/* 9. ABSENCE REASON ANALYTICS & 10. ATTENDANCE HEATMAP GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <AbsenceReasonAnalytics />
            <AttendanceHeatmap />
          </div>

          {/* 11. PARENT NOTIFICATION CENTER */}
          <ParentNotificationCenter
            onGenerateSMS={() => setIsNotifyModalOpen(true)}
            onGenerateEmail={() => setIsNotifyModalOpen(true)}
            onPushNotification={() => setIsNotifyModalOpen(true)}
          />

          {/* 12. AI ATTENDANCE INSIGHTS */}
          <AIAttendanceInsights
            insights={mockAIAttendanceInsights}
            onTakeAction={handleTakeAIAction}
          />

          {/* 13. BOTTOM REPORTS & EXPORT SECTION */}
          <BottomReportsExport onExport={handleExport} />

        </div>

        {/* RIGHT COLUMN: RIGHT SIDEBAR ALERTS & QUICK WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px' }}>
          
          <RightSidebarAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          {/* QUICK PARENT ADVISORY DISPATCHER WIDGET */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Users size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Absence Dispatch Studio
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Send automated SMS & WhatsApp advisories to parents of 146 absent students today.
            </p>
            <button
              onClick={() => setIsNotifyModalOpen(true)}
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
              Launch Notification Dispatcher
            </button>
          </div>

        </div>

      </div>

      {/* NOTIFY PARENT MODAL */}
      <NotifyParentModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
        onSendSubmit={handleNotifySubmit}
      />

    </div>
  );
}
