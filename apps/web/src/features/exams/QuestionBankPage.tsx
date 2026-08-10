import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import type { 
  QuestionItem, 
  CurriculumCoverageItem, 
  RecentQuestionActivity, 
  QuestionAlert 
} from './question-bank/types';

// Mock Data
import { 
  mockQuestions, 
  mockCurriculumCoverage, 
  mockRecentActivities, 
  mockQuestionAlerts 
} from './question-bank/mockData';

// Components
import { QuestionBankHeader } from './question-bank/components/QuestionBankHeader';
import { QuestionBankHeroBanner } from './question-bank/components/QuestionBankHeroBanner';
import { QuestionKPICards } from './question-bank/components/QuestionKPICards';
import { SmartFilterBar } from './question-bank/components/SmartFilterBar';
import { QuestionLibraryGrid } from './question-bank/components/QuestionLibraryGrid';
import { QuestionApprovalKanban } from './question-bank/components/QuestionApprovalKanban';
import { QuestionQualityAnalytics } from './question-bank/components/QuestionQualityAnalytics';
import { SubjectDistributionCharts } from './question-bank/components/SubjectDistributionCharts';
import { QuestionBankInsightsGrid } from './question-bank/components/QuestionBankInsightsGrid';
import { AIQuestionAssistant } from './question-bank/components/AIQuestionAssistant';
import { CurriculumCoverageGrid } from './question-bank/components/CurriculumCoverageGrid';
import { RecentActivityTimeline } from './question-bank/components/RecentActivityTimeline';
import { RightSidebarAlerts } from './question-bank/components/RightSidebarAlerts';
import { BottomReportsExport } from './question-bank/components/BottomReportsExport';
import { CreateQuestionModal } from './question-bank/components/CreateQuestionModal';
import { AIGenerateModal } from './question-bank/components/AIGenerateModal';

// Icons
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function QuestionBankPage() {
  // State
  const [questions, setQuestions] = useState<QuestionItem[]>(mockQuestions);
  const [coverageList] = useState<CurriculumCoverageItem[]>(mockCurriculumCoverage);
  const [activities] = useState<RecentQuestionActivity[]>(mockRecentActivities);
  const [alerts, setAlerts] = useState<QuestionAlert[]>(mockQuestionAlerts);

  // Filter Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedBlooms, setSelectedBlooms] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals & Toast State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAIGenerateModalOpen, setIsAIGenerateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All');
    setSelectedGrade('All');
    setSelectedType('All');
    setSelectedDifficulty('All');
    setSelectedBlooms('All');
    setSelectedStatus('All');
    showToast('Filters reset to default view.');
  };

  // Filtered Questions Logic
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = !searchQuery || 
                          q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.createdByTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || q.grade === selectedGrade;
    const matchesType = selectedType === 'All' || q.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesBlooms = selectedBlooms === 'All' || q.bloomsTaxonomy === selectedBlooms;
    const matchesStatus = selectedStatus === 'All' || q.status === selectedStatus;

    return matchesSearch && matchesSubject && matchesGrade && matchesType && 
           matchesDifficulty && matchesBlooms && matchesStatus;
  });

  // Handlers
  const handleApproveQuestion = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Approved' } : q));
    showToast(`Question #${id} approved & published to master bank!`);
  };

  const handleRejectQuestion = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Rejected' } : q));
    showToast(`Question #${id} rejected & returned to author.`);
  };

  const handleArchiveQuestion = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Archived' } : q));
    showToast(`Question #${id} moved to cold archive.`);
  };

  const handleDuplicateQuestion = (q: QuestionItem) => {
    const dup: QuestionItem = {
      ...q,
      id: `q-dup-${Date.now()}`,
      questionText: `${q.questionText} (Variant B)`,
      usageCount: 0,
      createdDate: 'Today'
    };
    setQuestions(prev => [dup, ...prev]);
    showToast(`Variant created for Question #${q.id}!`);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    showToast(`Alert marked as resolved.`);
  };

  const handleExport = (reportName?: string, format?: string) => {
    showToast(`Exporting ${format || 'PDF'} document for ${reportName || 'Master Question Bank'}...`);
  };

  const handleCreateSubmit = (newQ: QuestionItem) => {
    setQuestions(prev => [newQ, ...prev]);
    showToast(`New ${newQ.type} question added to ${newQ.subject} repository!`);
  };

  const handleAIGenerateSubmit = (params: any) => {
    showToast(`AI generated ${params.count} ${params.type} questions for ${params.topic} (${params.grade})!`);
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
      <QuestionBankHeader
        onCreateQuestion={() => setIsCreateModalOpen(true)}
        onImportQuestions={() => showToast('Opening QTI 2.1 / JSON Importer...')}
        onBulkUploadExcel={() => showToast('Opening Excel Template Uploader...')}
        onAIGenerate={() => setIsAIGenerateModalOpen(true)}
        onExport={() => handleExport('Master Question Bank', 'PDF')}
      />

      {/* 2. EXECUTIVE HERO BANNER */}
      <QuestionBankHeroBanner />

      {/* 3. TOP KPI CARDS */}
      <QuestionKPICards />

      {/* 4. SMART FILTER BAR */}
      <SmartFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedBlooms={selectedBlooms}
        onBloomsChange={setSelectedBlooms}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* MAIN TWO-COLUMN LAYOUT (LEFT 70% MAIN, RIGHT 30% SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'flex-start'
      }}>

        {/* LEFT COLUMN: MAIN REPOSITORY MODULES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 5. QUESTION LIBRARY */}
          <QuestionLibraryGrid
            questions={filteredQuestions}
            onApprove={handleApproveQuestion}
            onReject={handleRejectQuestion}
            onArchive={handleArchiveQuestion}
            onDuplicate={handleDuplicateQuestion}
          />

          {/* 6. QUESTION APPROVAL KANBAN */}
          <QuestionApprovalKanban
            questions={questions}
            onApprove={handleApproveQuestion}
            onReject={handleRejectQuestion}
            onRequestChanges={(q) => showToast(`Review comment requested for Question #${q.id}`)}
          />

          {/* 7. QUESTION QUALITY ANALYTICS */}
          <QuestionQualityAnalytics />

          {/* 8. SUBJECT DISTRIBUTION CHARTS */}
          <SubjectDistributionCharts />

          {/* 9. QUESTION BANK INSIGHTS */}
          <QuestionBankInsightsGrid questions={questions} />

          {/* 10. AI QUESTION ASSISTANT */}
          <AIQuestionAssistant
            onGenerateClick={(type) => setIsAIGenerateModalOpen(true)}
            onSuggestionClick={(sug) => showToast(`AI Action Executed: ${sug}`)}
          />

          {/* 11. CURRICULUM COVERAGE */}
          <CurriculumCoverageGrid coverageList={coverageList} />

          {/* 12. RECENT ACTIVITY TIMELINE */}
          <RecentActivityTimeline activities={activities} />

          {/* 13. BOTTOM REPORTS & EXPORT SECTION */}
          <BottomReportsExport onExport={handleExport} />

        </div>

        {/* RIGHT COLUMN: RIGHT SIDEBAR ALERTS & QUICK AI GENERATOR WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px' }}>
          
          <RightSidebarAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />

          {/* QUICK AI GENERATOR WIDGET */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={20} color="#5FAF88" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Instant AI Question Generator
              </h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
              Generate CBSE & ICSE compliant MCQs, HOTS, and Case Studies automatically.
            </p>
            <button
              onClick={() => setIsAIGenerateModalOpen(true)}
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
              Open AI Generator Studio
            </button>
          </div>

        </div>

      </div>

      {/* MODALS */}
      <CreateQuestionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <AIGenerateModal
        isOpen={isAIGenerateModalOpen}
        onClose={() => setIsAIGenerateModalOpen(false)}
        onGenerateSubmit={handleAIGenerateSubmit}
      />

    </div>
  );
}
