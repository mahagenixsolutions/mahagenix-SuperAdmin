import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
import { 
  mockLiveClasses, 
  mockTodaySchedule, 
  mockTeachersAvailability, 
  mockClassRequests, 
  mockPlatformHealth, 
  mockAIInsights, 
  mockRecordings, 
  mockRealtimeAlerts 
} from './mockData';

// Types
import type { 
  LiveOnlineClass, 
  ScheduledClass, 
  TeacherAvailability, 
  ClassRequest, 
  AIInsight, 
  ClassRecording, 
  RealtimeAlert 
} from './types';

// Components
import { HeroBanner } from './components/HeroBanner';
import { KPICards } from './components/KPICards';
import { LiveClassMonitor } from './components/LiveClassMonitor';
import { TodayScheduleTimeline } from './components/TodayScheduleTimeline';
import { TeacherAvailabilityGrid } from './components/TeacherAvailabilityGrid';
import { OnlineRequestsPanel } from './components/OnlineRequestsPanel';
import { PlatformHealthPanel } from './components/PlatformHealthPanel';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { AttendanceAnalyticsPanel } from './components/AttendanceAnalyticsPanel';
import { RecordingLibraryPanel } from './components/RecordingLibraryPanel';
import { UpcomingClassesPanel } from './components/UpcomingClassesPanel';
import { AnnouncementCenterModal } from './components/AnnouncementCenterModal';
import { RightSidebarAlerts } from './components/RightSidebarAlerts';
import { BottomReportsExport } from './components/BottomReportsExport';
import { ScheduleModal } from './components/ScheduleModal';

// Icons & Toast
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function OnlineClassesPage() {
  // State management
  const [liveClasses, setLiveClasses] = useState<LiveOnlineClass[]>(mockLiveClasses);
  const [schedule, setSchedule] = useState<ScheduledClass[]>(mockTodaySchedule);
  const [teachers, setTeachers] = useState<TeacherAvailability[]>(mockTeachersAvailability);
  const [requests, setRequests] = useState<ClassRequest[]>(mockClassRequests);
  const [recordings, setRecordings] = useState<ClassRecording[]>(mockRecordings);
  const [alerts, setAlerts] = useState<RealtimeAlert[]>(mockRealtimeAlerts);

  // Modals & Toast State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [announcementDefaultTarget, setAnnouncementDefaultTarget] = useState('Notify all online students');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ref for smooth scroll to Live Monitor section
  const liveMonitorRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers
  const handleScrollToLive = () => {
    liveMonitorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleObserverJoin = (classItem: LiveOnlineClass) => {
    showToast(`Joining ${classItem.subject} (${classItem.grade}-${classItem.section}) as Academic Observer...`);
    window.open(classItem.meetingLink, '_blank');
  };

  const handleViewAnalytics = (classItem: LiveOnlineClass) => {
    showToast(`Opening real-time telemetry for ${classItem.teacherName}'s class...`);
  };

  const handleSendAnnouncement = (classItem: LiveOnlineClass) => {
    setAnnouncementDefaultTarget(`Grade ${classItem.grade}-${classItem.section} (${classItem.subject})`);
    setIsAnnouncementModalOpen(true);
  };

  const handleEndSession = (classId: string) => {
    setLiveClasses(prev => prev.filter(c => c.id !== classId));
    showToast(`Admin Session Termination executed for session ID ${classId}. Session closed.`);
  };

  const handleApproveRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    showToast(`Class request #${id} approved successfully! Updated in master timetable.`);
  };

  const handleRejectRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    showToast(`Class request #${id} rejected.`);
  };

  const handleRescheduleRequest = (req: ClassRequest) => {
    showToast(`Opening reschedule modal for ${req.teacherName}...`);
    setIsScheduleModalOpen(true);
  };

  const handleAssignClass = (teacher: TeacherAvailability) => {
    showToast(`Assigning emergency substitute slot for ${teacher.name}...`);
    setIsScheduleModalOpen(true);
  };

  const handleTakeAIAction = (insight: AIInsight) => {
    showToast(`AI Action Triggered: ${insight.actionLabel} for ${insight.affectedClassOrTeacher}`);
  };

  const handleShareRecording = (rec: ClassRecording) => {
    showToast(`Shareable LMS video link generated for "${rec.topic}"`);
  };

  const handleDownloadRecording = (rec: ClassRecording) => {
    showToast(`Downloading cloud recording "${rec.topic}" (MP4)...`);
  };

  const handleArchiveRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
    showToast(`Recording archived to cold storage.`);
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
    showToast(`System alert marked as resolved.`);
  };

  const handleExportPDF = (reportName: string) => {
    showToast(`Generating official PDF export for "${reportName}"...`);
  };

  const handleExportExcel = (reportName: string) => {
    showToast(`Generating Excel spreadsheet export for "${reportName}"...`);
  };

  const handleBroadcastAnnouncement = (target: string, message: string, type: string) => {
    showToast(`Notice Broadcast Sent to [${target}]: "${message.slice(0, 40)}..."`);
  };

  const handleScheduleSubmit = (newClassItem: ScheduledClass) => {
    setSchedule(prev => [newClassItem, ...prev]);
    showToast(`New online class scheduled for ${newClassItem.subject} (${newClassItem.timeSlot})!`);
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

      {/* Toast Notification Container */}
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

      {/* 1. HERO SUMMARY BANNER & PAGE HEADER */}
      <HeroBanner
        onScheduleClick={() => setIsScheduleModalOpen(true)}
        onBulkScheduleClick={() => showToast('Opening Bulk Schedule CSV Uploader...')}
        onAssignTeacherClick={() => showToast('Opening Teacher Allocation Drawer...')}
        onExportClick={() => handleExportPDF('Master Schedule')}
        onSettingsClick={() => showToast('Opening Platform Settings...')}
        onViewLiveClick={handleScrollToLive}
      />

      {/* 2. TOP KPI CARDS */}
      <KPICards />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN COMMAND CENTER MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 3. LIVE CLASS MONITOR */}
          <div ref={liveMonitorRef}>
            <LiveClassMonitor
              liveClasses={liveClasses}
              onObserverJoin={handleObserverJoin}
              onViewAnalytics={handleViewAnalytics}
              onSendAnnouncement={handleSendAnnouncement}
              onEndSession={handleEndSession}
            />
          </div>

          {/* 4. TODAY'S ONLINE SCHEDULE TIMELINE */}
          <TodayScheduleTimeline
            schedule={schedule}
            onClassClick={(item) => showToast(`Selected ${item.subject} (${item.timeSlot})`)}
          />

          {/* 5. TEACHER AVAILABILITY */}
          <TeacherAvailabilityGrid
            teachers={teachers}
            onAssignClass={handleAssignClass}
          />

          {/* 6. ONLINE CLASS REQUESTS */}
          <OnlineRequestsPanel
            requests={requests}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
            onReschedule={handleRescheduleRequest}
          />

          {/* 7. PLATFORM HEALTH PANEL */}
          <PlatformHealthPanel platforms={mockPlatformHealth} />

          {/* 8. AI INSIGHTS */}
          <AIInsightsPanel
            insights={mockAIInsights}
            onTakeAction={handleTakeAIAction}
          />

          {/* 9. ATTENDANCE ANALYTICS */}
          <AttendanceAnalyticsPanel />

          {/* 10. RECORDING LIBRARY */}
          <RecordingLibraryPanel
            recordings={recordings}
            onShare={handleShareRecording}
            onDownload={handleDownloadRecording}
            onArchive={handleArchiveRecording}
          />

          {/* 11. UPCOMING CLASSES (NEXT 24 HOURS) */}
          <UpcomingClassesPanel
            upcomingClasses={schedule.filter(s => s.status === 'Upcoming')}
            onNotifyClass={(item) => showToast(`Pre-session reminder dispatched to ${item.teacherName}`)}
          />

          {/* 12. BOTTOM REPORTS & EXPORT SECTION */}
          <BottomReportsExport
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
          />

        </div>

        {/* RIGHT COLUMN: RIGHT SIDEBAR ALERTS & QUICK BROADCAST WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px' }}>
          
          {/* RIGHT SIDEBAR ALERTS */}
          <RightSidebarAlerts
            alerts={alerts}
            onDismissAlert={handleDismissAlert}
          />

          {/* QUICK BROADCAST ACTION CARD */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 800 }}>
              Broadcast Announcement
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Instantly notify online students and faculty regarding emergency schedule shifts or link updates.
            </p>
            <button
              onClick={() => setIsAnnouncementModalOpen(true)}
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
              Open Announcement Center
            </button>
          </div>

        </div>

      </div>

      {/* MODALS */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onScheduleSubmit={handleScheduleSubmit}
      />

      <AnnouncementCenterModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        onBroadcast={handleBroadcastAnnouncement}
        defaultTarget={announcementDefaultTarget}
      />

    </div>
  );
}
