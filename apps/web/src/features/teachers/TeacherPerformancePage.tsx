import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  FacultyPerformanceItem, 
  ClassroomObservationItem, 
  AIFacultyInsight, 
  FacultyAlert 
} from './performance/types';

// Mock Data
import { 
  mockFacultyPerformanceList, 
  mockObservations, 
  mockAIFacultyInsights, 
  mockFacultyAlerts 
} from './performance/mockData';

// Components
import { PerformanceHeader } from './performance/components/PerformanceHeader';
import { PerformanceHeroBanner } from './performance/components/PerformanceHeroBanner';
import { PerformanceKPICards } from './performance/components/PerformanceKPICards';
import { FacultyMatrixTable } from './performance/components/FacultyMatrixTable';
import { ClassroomObservationFeed } from './performance/components/ClassroomObservationFeed';
import { MarkingSLATelemetry } from './performance/components/MarkingSLATelemetry';
import { StudentFeedbackAnalytics } from './performance/components/StudentFeedbackAnalytics';
import { SyllabusProgressTracker } from './performance/components/SyllabusProgressTracker';
import { AIFacultyInsights } from './performance/components/AIFacultyInsights';
import { RightSidebarAlerts } from './performance/components/RightSidebarAlerts';
import { BottomReportsExport } from './performance/components/BottomReportsExport';
import { ConductAppraisalModal } from './performance/components/ConductAppraisalModal';

// Icons
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function TeacherPerformancePage() {
  // State
  const [facultyList, setFacultyList] = useState<FacultyPerformanceItem[]>(mockFacultyPerformanceList);
  const [observations] = useState<ClassroomObservationItem[]>(mockObservations);
  const [alerts, setAlerts] = useState<FacultyAlert[]>(mockFacultyAlerts);

  // Modals & Toast State
  const [isAppraisalModalOpen, setIsAppraisalModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleViewDossier = (item: FacultyPerformanceItem) => {
    showToast(`Opening official performance dossier for ${item.teacherName} (${item.employeeId})...`);
  };

  const handleAuditPerformance = (item: FacultyPerformanceItem) => {
    showToast(`Auditing syllabus execution and SLA scores for ${item.teacherName}...`);
  };

  const handleScheduleReview = (item: FacultyPerformanceItem) => {
    showToast(`Performance review meeting scheduled with ${item.teacherName}`);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    showToast(`Faculty alert marked as resolved.`);
  };

  const handleTakeAIAction = (insight: AIFacultyInsight) => {
    showToast(`AI Action Executed: ${insight.suggestedAction}`);
  };

  const handleExport = (reportName: string, format: string) => {
    showToast(`Exporting official ${format} document for "${reportName}"...`);
  };

  const handleAppraisalSubmit = (data: any) => {
    setFacultyList(prev => prev.map(f => f.teacherName === data.teacherName ? { ...f, overallScorePct: data.score, ratingTier: data.ratingTier } : f));
    showToast(`Annual Appraisal for ${data.teacherName} saved & updated to tier ${data.ratingTier}!`);
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
      <PerformanceHeader
        onConductAppraisal={() => setIsAppraisalModalOpen(true)}
        onPolicyClick={() => showToast('Opening Institutional Faculty Appraisal Policy Configuration...')}
        onExportReports={() => handleExport('APAR Dossier', 'PDF')}
        onScheduleObservation={() => showToast('Opening Classroom Observation Scheduler...')}
      />

      {/* 2. HERO COMMAND CENTER BANNER */}
      <PerformanceHeroBanner />

      {/* 3. TOP KPI CARDS */}
      <PerformanceKPICards />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN PERFORMANCE & GOVERNANCE MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 4. FACULTY PERFORMANCE MATRIX */}
          <FacultyMatrixTable
            facultyList={facultyList}
            onViewDossier={handleViewDossier}
            onAuditPerformance={handleAuditPerformance}
            onScheduleReview={handleScheduleReview}
          />

          {/* 5. CLASSROOM OBSERVATION & AUDIT STREAM */}
          <ClassroomObservationFeed observations={observations} />

          {/* 6. EVALUATION SPEED & MARKING SLA TELEMETRY */}
          <MarkingSLATelemetry />

          {/* 7. STUDENT FEEDBACK & 8. SYLLABUS PROGRESS TRACKER */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <StudentFeedbackAnalytics />
            <SyllabusProgressTracker />
          </div>

          {/* 9. AI FACULTY INTELLIGENCE & AWARD NOMINATIONS */}
          <AIFacultyInsights
            insights={mockAIFacultyInsights}
            onTakeAction={handleTakeAIAction}
          />

          {/* 10. BOTTOM REPORTS & EXPORT SECTION */}
          <BottomReportsExport onExport={handleExport} />

        </div>

        {/* RIGHT COLUMN: RIGHT SIDEBAR ALERTS & QUICK WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px' }}>
          
          <RightSidebarAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          {/* QUICK FACULTY APPRAISAL WIDGET */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Award size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Appraisal Studio
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Conduct 360-degree faculty evaluations, update performance index scores, and assign rating tiers.
            </p>
            <button
              onClick={() => setIsAppraisalModalOpen(true)}
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
              Launch Appraisal Review
            </button>
          </div>

        </div>

      </div>

      {/* CONDUCT APPRAISAL MODAL */}
      <ConductAppraisalModal
        isOpen={isAppraisalModalOpen}
        onClose={() => setIsAppraisalModalOpen(false)}
        onSubmit={handleAppraisalSubmit}
      />

    </div>
  );
}
