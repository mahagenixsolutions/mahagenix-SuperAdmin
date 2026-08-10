import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  AcademicNoticeItem, 
  AcknowledgementTrackerItem, 
  AINoticeInsight, 
  NoticeAlert 
} from './notices/types';

// Mock Data
import { 
  mockAcademicNotices, 
  mockAcknowledgementList, 
  mockAINoticeInsights, 
  mockNoticeAlerts 
} from './notices/mockData';

// Components
import { NoticeHeader } from './notices/components/NoticeHeader';
import { NoticeHeroBanner } from './notices/components/NoticeHeroBanner';
import { NoticeKPICards } from './notices/components/NoticeKPICards';
import { NoticeTimelineFilter } from './notices/components/NoticeTimelineFilter';
import { AcademicNoticeFeed } from './notices/components/AcademicNoticeFeed';
import { NoticeCategoriesGrid } from './notices/components/NoticeCategoriesGrid';
import { TargetAudiencePanel } from './notices/components/TargetAudiencePanel';
import { NoticeDeliveryAnalytics } from './notices/components/NoticeDeliveryAnalytics';
import { AcknowledgementTracker } from './notices/components/AcknowledgementTracker';
import { NoticeDocumentLibrary } from './notices/components/NoticeDocumentLibrary';
import { NoticeCalendarLink } from './notices/components/NoticeCalendarLink';
import { AINoticeInsights } from './notices/components/AINoticeInsights';
import { RightSidebarAlerts } from './notices/components/RightSidebarAlerts';
import { BottomReportsExport } from './notices/components/BottomReportsExport';
import { CreateNoticeModal } from './notices/components/CreateNoticeModal';

// Icons
import { CheckCircle2, ShieldCheck, Bell } from 'lucide-react';

export default function NoticesPage() {
  // State
  const [notices, setNotices] = useState<AcademicNoticeItem[]>(mockAcademicNotices);
  const [acknowledgements] = useState<AcknowledgementTrackerItem[]>(mockAcknowledgementList);
  const [alerts, setAlerts] = useState<NoticeAlert[]>(mockNoticeAlerts);
  const [selectedTimelineTab, setSelectedTimelineTab] = useState('Today');

  // Modals & Toast State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handlePreviewNotice = (n: AcademicNoticeItem) => {
    showToast(`Opening notice preview mode for "${n.title}"...`);
  };

  const handleEditNotice = (n: AcademicNoticeItem) => {
    showToast(`Opening notice composer for "${n.title}"...`);
  };

  const handleDuplicateNotice = (n: AcademicNoticeItem) => {
    const dup: AcademicNoticeItem = {
      ...n,
      id: `not-${Date.now()}`,
      title: `${n.title} (Copy)`,
      status: 'Draft',
      readPercentage: 0,
      acknowledgedPercentage: 0
    };
    setNotices([dup, ...notices]);
    showToast(`Duplicated notice draft created.`);
  };

  const handleArchiveNotice = (n: AcademicNoticeItem) => {
    setNotices(prev => prev.filter(item => item.id !== n.id));
    showToast(`Notice "${n.title}" moved to archive.`);
  };

  const handleAnalyticsNotice = (n: AcademicNoticeItem) => {
    showToast(`Opening audience engagement telemetry for "${n.title}"...`);
  };

  const handleSelectCategory = (cat: string) => {
    showToast(`Filtering active notices by category: "${cat}"...`);
  };

  const handleSendReminder = (item: AcknowledgementTrackerItem) => {
    showToast(`Automated SMS & ERP app push reminder sent to ${item.pendingCount} pending recipients!`);
  };

  const handleExportCohort = (item: AcknowledgementTrackerItem) => {
    showToast(`Exporting recipient signoff audit log for "${item.noticeTitle}"...`);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    showToast(`Notice alert marked as resolved.`);
  };

  const handleTakeAIAction = (insight: AINoticeInsight) => {
    showToast(`AI Notice Action Executed: ${insight.suggestedAction}`);
  };

  const handleExport = (reportName: string, format: string) => {
    showToast(`Exporting official ${format} document for "${reportName}"...`);
  };

  const handleNoticeSubmit = (data: any) => {
    const newNotice: AcademicNoticeItem = {
      id: `not-${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      department: 'Academic Coordination',
      createdBy: 'Academic Coordinator',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      publishDate: 'Aug 06, 2026',
      expiryDate: 'Aug 30, 2026',
      targetAudience: data.targetAudience,
      attachments: [{ name: 'Circular_Document.pdf', type: 'PDF', size: '1.4 MB' }],
      readPercentage: 100,
      acknowledgedPercentage: 100,
      status: 'Published'
    };
    setNotices([newNotice, ...notices]);
    showToast(`Academic Notice "${data.title}" published & broadcasted!`);
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
      <NoticeHeader
        onCreateNotice={() => setIsCreateModalOpen(true)}
        onPublishCircular={() => setIsCreateModalOpen(true)}
        onScheduleNotice={() => showToast('Opening Master Notice Release Scheduler...')}
        onExportReport={() => handleExport('Master Academic Circular Report', 'PDF')}
      />

      {/* 2. HERO COMMAND CENTER BANNER */}
      <NoticeHeroBanner
        onCreateNotice={() => setIsCreateModalOpen(true)}
        onPublishCircular={() => setIsCreateModalOpen(true)}
      />

      {/* 3. TOP KPI CARDS */}
      <NoticeKPICards />

      {/* 4. NOTICE TIMELINE FILTER */}
      <NoticeTimelineFilter
        selectedTab={selectedTimelineTab}
        onSelectTab={(tab) => {
          setSelectedTimelineTab(tab);
          showToast(`Filtering notices by timeline schedule: "${tab}"...`);
        }}
      />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN NOTICES MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 5. ACADEMIC NOTICE FEED */}
          <AcademicNoticeFeed
            notices={notices}
            onPreview={handlePreviewNotice}
            onEdit={handleEditNotice}
            onDuplicate={handleDuplicateNotice}
            onArchive={handleArchiveNotice}
            onAnalytics={handleAnalyticsNotice}
          />

          {/* 6. NOTICE CATEGORIES GRID */}
          <NoticeCategoriesGrid onSelectCategory={handleSelectCategory} />

          {/* 7. TARGET AUDIENCE PANEL */}
          <TargetAudiencePanel />

          {/* 8. NOTICE DELIVERY ANALYTICS */}
          <NoticeDeliveryAnalytics />

          {/* 9. DIGITAL ACKNOWLEDGEMENT TRACKER */}
          <AcknowledgementTracker
            list={acknowledgements}
            onSendReminder={handleSendReminder}
            onExportCohort={handleExportCohort}
          />

          {/* 10. ATTACHED DOCUMENT LIBRARY & 11. CALENDAR LINK */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <NoticeDocumentLibrary />
            <NoticeCalendarLink />
          </div>

          {/* 12. AI NOTICE INSIGHTS */}
          <AINoticeInsights
            insights={mockAINoticeInsights}
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

          {/* QUICK NOTICE BROADCAST STUDIO WIDGET */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Bell size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Broadcast Studio
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Compose official academic circulars, set digital signoff requirements, and schedule multi-channel releases.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
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
              Compose Notice
            </button>
          </div>

        </div>

      </div>

      {/* CREATE NOTICE MODAL */}
      <CreateNoticeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleNoticeSubmit}
      />

    </div>
  );
}
