import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageSkeleton } from './components/ui/Skeleton';
import type { RootState } from './store';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import AIContextProvider from './context/AIContextProvider';
import BusTrackingFAB from './features/bus-tracking/BusTrackingFAB';

// Lazy-loaded feature pages
import { lazy, Suspense, useState, useEffect } from 'react';
import SplashScreen from './components/splash/SplashScreen';
const ChatWidget = lazy(() => import('./components/ai/ChatWidget'));
const SchoolActivityPage = lazy(() => import('./features/activity/SchoolActivityPage'));
const QuickActionsPage = lazy(() => import('./features/workspace/QuickActionsPage'));

// Core Staff & Administration ERP Pages
const NotificationsPage = lazy(() => import('./features/notifications/NotificationsPage'));
const AuditLogsPage = lazy(() => import('./features/audit/AuditLogsPage'));
const AnalyticsPage = lazy(() => import('./features/analytics/AnalyticsPage'));
const EventsPage = lazy(() => import('./features/events/EventsPage'));
const ReportsPage = lazy(() => import('./features/reports/ReportsPage'));

const LibraryPage = lazy(() => import('./features/library/LibraryPage'));
const TransportPage = lazy(() => import('./features/transport/TransportPage'));
const HostelPage = lazy(() => import('./features/hostel/HostelPage'));
const HRPage = lazy(() => import('./features/hr/HRPage'));
const InventoryPage = lazy(() => import('./features/inventory/InventoryPage'));
const CommunicationPage = lazy(() => import('./features/communication/CommunicationPage'));
const ReceptionPage = lazy(() => import('./features/reception/ReceptionPage'));
const SecurityPage = lazy(() => import('./features/security/SecurityPage'));
const FinancePage = lazy(() => import('./features/finance/FinancePage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));

// Principal Workspace pages
const ApprovalCenterPage = lazy(() => import('./features/principal/pages/ApprovalCenterPage'));
const PrincipalProfilePage = lazy(() => import('./features/principal/pages/PrincipalProfilePage'));
const PrincipalSettingsPage = lazy(() => import('./features/principal/pages/PrincipalSettingsPage'));

// Executive Leadership Oversight Pages
const ExecutiveAcademicOverviewPage = lazy(() => import('./features/principal/pages/ExecutiveAcademicPages').then(m => ({ default: m.ExecutiveAcademicOverviewPage })));
const ExecutiveCalendarPage = lazy(() => import('./features/principal/pages/ExecutiveAcademicPages').then(m => ({ default: m.ExecutiveCalendarPage })));
const ExecutiveExamOverviewPage = lazy(() => import('./features/principal/pages/ExecutiveAcademicPages').then(m => ({ default: m.ExecutiveExamOverviewPage })));

const ExecutiveHROversightPage = lazy(() => import('./features/principal/pages/ExecutiveOperationsPages').then(m => ({ default: m.ExecutiveHROversightPage })));
const ExecutiveFinanceOversightPage = lazy(() => import('./features/principal/pages/ExecutiveOperationsPages').then(m => ({ default: m.ExecutiveFinanceOversightPage })));
const ExecutiveReceptionOversightPage = lazy(() => import('./features/principal/pages/ExecutiveOperationsPages').then(m => ({ default: m.ExecutiveReceptionOversightPage })));

const ExecutiveLibraryOversightPage = lazy(() => import('./features/principal/pages/ExecutiveCampusPages').then(m => ({ default: m.ExecutiveLibraryOversightPage })));
const ExecutiveTransportOversightPage = lazy(() => import('./features/principal/pages/ExecutiveCampusPages').then(m => ({ default: m.ExecutiveTransportOversightPage })));
const ExecutiveHostelOversightPage = lazy(() => import('./features/principal/pages/ExecutiveCampusPages').then(m => ({ default: m.ExecutiveHostelOversightPage })));
const ExecutiveSecurityOversightPage = lazy(() => import('./features/principal/pages/ExecutiveCampusPages').then(m => ({ default: m.ExecutiveSecurityOversightPage })));

const ExecutiveReportsPage = lazy(() => import('./features/principal/pages/ExecutiveIntelligencePages').then(m => ({ default: m.ExecutiveReportsPage })));
const ExecutiveAnalyticsPage = lazy(() => import('./features/principal/pages/ExecutiveIntelligencePages').then(m => ({ default: m.ExecutiveAnalyticsPage })));
const ExecutiveInsightsPage = lazy(() => import('./features/principal/pages/ExecutiveIntelligencePages').then(m => ({ default: m.ExecutiveInsightsPage })));

// Organization Admin workspace pages
const OrgBranches = lazy(() => import('./features/organization/pages/OrgBranches'));
const BranchDetails = lazy(() => import('./features/organization/pages/BranchDetails'));
const PrincipalsDirectory = lazy(() => import('./features/organization/pages/PrincipalsDirectory'));
const OrgAnalytics = lazy(() => import('./features/organization/pages/OrgAnalytics'));
const OrgAnnouncements = lazy(() => import('./features/organization/pages/OrgAnnouncements'));
const OrgBranding = lazy(() => import('./features/organization/pages/OrgBranding'));
const OrgMiscPages = lazy(() => import('./features/organization/pages/OrgMiscPages'));

// System States & Error Experience Module
import { GlobalErrorBoundary } from './components/system/GlobalErrorBoundary';
import { ErrorPage } from './components/system/ErrorPage';
import { MaintenancePage } from './components/system/MaintenancePage';
import { SystemStatusPage } from './components/system/SystemStatusPage';
import { NetworkStatePages } from './components/system/NetworkStatePages';
import { PermissionPages } from './components/system/PermissionPages';

// Additional Core ERP Feature Pages
const StudentsPage = lazy(() => import('./features/students/StudentsPage'));
const StudentDetailPage = lazy(() => import('./features/students/StudentDetailPage'));
const TeachersPage = lazy(() => import('./features/teachers/TeachersPage'));
const ParentsPage = lazy(() => import('./features/parent/ParentsPage'));
const FeesPage = lazy(() => import('./features/fees/FeesPage'));
const ExamsPage = lazy(() => import('./features/exams/ExamsPage'));
const AdmissionsPage = lazy(() => import('./features/admissions/AdmissionsPage'));
const AcademicPage = lazy(() => import('./features/academic/AcademicPage'));
const AcademicYearsPage = lazy(() => import('./features/academic-years/AcademicYearsPage'));
const AttendancePage = lazy(() => import('./features/attendance/AttendancePage'));
const ClassesPage = lazy(() => import('./features/classes/ClassesPage'));
const SubjectsPage = lazy(() => import('./features/subjects/SubjectsPage'));
const SubjectDetailDashboard = lazy(() => import('./features/subjects/SubjectDetailDashboard').then(m => ({ default: m.SubjectDetailDashboard })));
const MarksPage = lazy(() => import('./features/marks/MarksPage'));
const ProgressPage = lazy(() => import('./features/progress/ProgressPage'));
const PuzzlesPage = lazy(() => import('./features/puzzles/PuzzlesPage'));
const UsersPage = lazy(() => import('./features/users/UsersPage'));

// New Academic Coordinator Modules
const SyllabusTrackerPage = lazy(() => import('./features/academic/SyllabusTrackerPage'));
const LessonPlansPage = lazy(() => import('./features/academic/LessonPlansPage'));
const OnlineClassesPage = lazy(() => import('./features/online-classes/OnlineClassesPage'));
const QuestionBankPage = lazy(() => import('./features/exams/QuestionBankPage'));
const AssignmentsPage = lazy(() => import('./features/assignments/AssignmentsPage'));
const AcademicAuditPage = lazy(() => import('./features/academic/AcademicAuditPage'));
const NoticesPage = lazy(() => import('./features/communication/NoticesPage'));


const SystemShowcasePage = lazy(() => import('./features/system/pages/SystemShowcasePage'));

const PageLoader = () => (
  <div style={{ padding: '24px 0', width: '100%' }}>
    <PageSkeleton />
  </div>
);

export default function App() {
  const is_authenticated = useSelector((s: RootState) => s.auth.is_authenticated);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleShowSplash = () => setShowSplash(true);
    window.addEventListener('show-splash-screen', handleShowSplash);
    return () => window.removeEventListener('show-splash-screen', handleShowSplash);
  }, []);

  return (
    <BrowserRouter>
      <AIContextProvider>
        <GlobalErrorBoundary>
          <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          is_authenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />

        {/* Protected Staff & Administration Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="activity" element={
              <Suspense fallback={<PageLoader />}><SchoolActivityPage /></Suspense>
            } />
            <Route path="quick-actions" element={
              <Suspense fallback={<PageLoader />}><QuickActionsPage /></Suspense>
            } />
            <Route path="notifications" element={
              <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense>
            } />
            <Route path="audit-logs" element={
              <Suspense fallback={<PageLoader />}><AuditLogsPage /></Suspense>
            } />
            <Route path="analytics" element={
              <Suspense fallback={<PageLoader />}><AnalyticsPage /></Suspense>
            } />
            <Route path="events" element={
              <Suspense fallback={<PageLoader />}><EventsPage /></Suspense>
            } />
            <Route path="reports" element={
              <Suspense fallback={<PageLoader />}><ReportsPage /></Suspense>
            } />

            {/* Core Academic & Student ERP Routes */}
            <Route path="students" element={<Suspense fallback={<PageLoader />}><StudentsPage /></Suspense>} />
            <Route path="students/:id" element={<Suspense fallback={<PageLoader />}><StudentDetailPage /></Suspense>} />
            <Route path="teachers" element={<Suspense fallback={<PageLoader />}><TeachersPage /></Suspense>} />
            <Route path="parents" element={<Suspense fallback={<PageLoader />}><ParentsPage /></Suspense>} />
            <Route path="fees" element={<Suspense fallback={<PageLoader />}><FeesPage /></Suspense>} />
            <Route path="fees/*" element={<Suspense fallback={<PageLoader />}><FeesPage /></Suspense>} />
            <Route path="exams" element={<Suspense fallback={<PageLoader />}><ExamsPage /></Suspense>} />
            <Route path="exams/*" element={<Suspense fallback={<PageLoader />}><ExamsPage /></Suspense>} />
            <Route path="admissions" element={<Suspense fallback={<PageLoader />}><AdmissionsPage /></Suspense>} />
            <Route path="academic" element={<Suspense fallback={<PageLoader />}><AcademicPage /></Suspense>} />
            <Route path="academic/syllabus" element={<Suspense fallback={<PageLoader />}><SyllabusTrackerPage /></Suspense>} />
            <Route path="academic/lesson-plans" element={<Suspense fallback={<PageLoader />}><LessonPlansPage /></Suspense>} />
            <Route path="academic/audit" element={<Suspense fallback={<PageLoader />}><AcademicAuditPage /></Suspense>} />
            <Route path="academic/*" element={<Suspense fallback={<PageLoader />}><AcademicPage /></Suspense>} />
            <Route path="academic-years" element={<Suspense fallback={<PageLoader />}><AcademicYearsPage /></Suspense>} />
            
            <Route path="online-classes" element={<Suspense fallback={<PageLoader />}><OnlineClassesPage /></Suspense>} />
            <Route path="exams/question-bank" element={<Suspense fallback={<PageLoader />}><QuestionBankPage /></Suspense>} />
            <Route path="assignments" element={<Suspense fallback={<PageLoader />}><AssignmentsPage /></Suspense>} />
            <Route path="notices" element={<Suspense fallback={<PageLoader />}><NoticesPage /></Suspense>} />
            <Route path="attendance" element={<Suspense fallback={<PageLoader />}><AttendancePage /></Suspense>} />
            <Route path="classes" element={<Suspense fallback={<PageLoader />}><ClassesPage /></Suspense>} />
            <Route path="subjects" element={<Suspense fallback={<PageLoader />}><SubjectsPage /></Suspense>} />
            <Route path="subjects/:id" element={<Suspense fallback={<PageLoader />}><SubjectDetailDashboard /></Suspense>} />
            <Route path="marks" element={<Suspense fallback={<PageLoader />}><MarksPage /></Suspense>} />
            <Route path="progress" element={<Suspense fallback={<PageLoader />}><ProgressPage /></Suspense>} />
            <Route path="puzzles" element={<Suspense fallback={<PageLoader />}><PuzzlesPage /></Suspense>} />
            <Route path="users" element={<Suspense fallback={<PageLoader />}><UsersPage /></Suspense>} />

            {/* Staff ERP Workspaces */}
            <Route path="library" element={
              <Suspense fallback={<PageLoader />}><LibraryPage /></Suspense>
            } />
            <Route path="library/*" element={
              <Suspense fallback={<PageLoader />}><LibraryPage /></Suspense>
            } />
            <Route path="transport" element={
              <Suspense fallback={<PageLoader />}><TransportPage /></Suspense>
            } />
            <Route path="transport/*" element={
              <Suspense fallback={<PageLoader />}><TransportPage /></Suspense>
            } />
            <Route path="hostel" element={
              <Suspense fallback={<PageLoader />}><HostelPage /></Suspense>
            } />
            <Route path="hostel/*" element={
              <Suspense fallback={<PageLoader />}><HostelPage /></Suspense>
            } />
            <Route path="hr" element={
              <Suspense fallback={<PageLoader />}><HRPage /></Suspense>
            } />
            <Route path="hr/*" element={
              <Suspense fallback={<PageLoader />}><HRPage /></Suspense>
            } />
            <Route path="inventory" element={
              <Suspense fallback={<PageLoader />}><InventoryPage /></Suspense>
            } />
            <Route path="communication" element={
              <Suspense fallback={<PageLoader />}><CommunicationPage /></Suspense>
            } />
            <Route path="reception" element={
              <Suspense fallback={<PageLoader />}><ReceptionPage /></Suspense>
            } />
            <Route path="reception/*" element={
              <Suspense fallback={<PageLoader />}><ReceptionPage /></Suspense>
            } />
            <Route path="security" element={
              <Suspense fallback={<PageLoader />}><SecurityPage /></Suspense>
            } />
            <Route path="security/*" element={
              <Suspense fallback={<PageLoader />}><SecurityPage /></Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>
            } />

            {/* Unified Finance Workspace ERP Routes */}
            <Route path="finance" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="fees" /></Suspense>
            } />
            <Route path="finance/dashboard" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="fees" /></Suspense>
            } />
            <Route path="finance/fees" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="fees" /></Suspense>
            } />
            <Route path="fees" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="fees" /></Suspense>
            } />
            <Route path="finance/expenses" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="expenses" /></Suspense>
            } />
            <Route path="expenses" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="expenses" /></Suspense>
            } />
            <Route path="finance/payroll" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="payroll" /></Suspense>
            } />
            <Route path="payroll" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="payroll" /></Suspense>
            } />
            <Route path="finance/invoices" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="invoices" /></Suspense>
            } />
            <Route path="finance/receivables" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="receivables" /></Suspense>
            } />
            <Route path="finance/payables" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="payables" /></Suspense>
            } />
            <Route path="finance/procurement" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="procurement" /></Suspense>
            } />
            <Route path="finance/vendors" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="vendors" /></Suspense>
            } />
            <Route path="finance/banking" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="banking" /></Suspense>
            } />
            <Route path="finance/cashbook" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="cashbook" /></Suspense>
            } />
            <Route path="finance/reconciliation" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="reconciliation" /></Suspense>
            } />
            <Route path="finance/ledger" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="ledger" /></Suspense>
            } />
            <Route path="finance/refunds" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="refunds" /></Suspense>
            } />
            <Route path="finance/budget" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="budget" /></Suspense>
            } />
            <Route path="finance/assets" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="assets" /></Suspense>
            } />
            <Route path="finance/taxation" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="taxation" /></Suspense>
            } />
            <Route path="finance/reports" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="reports" /></Suspense>
            } />
            <Route path="finance/intelligence" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="intelligence" /></Suspense>
            } />
            <Route path="finance/audit" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="reports" /></Suspense>
            } />
            <Route path="finance/settings" element={
              <Suspense fallback={<PageLoader />}><FinancePage defaultTab="settings" /></Suspense>
            } />

            {/* Organization Admin Workspace Routes */}
            <Route path="org/branches" element={
              <Suspense fallback={<PageLoader />}><OrgBranches /></Suspense>
            } />
            <Route path="org/branches/:id" element={
              <Suspense fallback={<PageLoader />}><BranchDetails /></Suspense>
            } />
            <Route path="org/principals" element={
              <Suspense fallback={<PageLoader />}><PrincipalsDirectory /></Suspense>
            } />
            <Route path="org/analytics/:type" element={
              <Suspense fallback={<PageLoader />}><OrgAnalytics /></Suspense>
            } />
            <Route path="org/announcements" element={
              <Suspense fallback={<PageLoader />}><OrgAnnouncements /></Suspense>
            } />
            <Route path="org/communication" element={
              <Suspense fallback={<PageLoader />}><OrgAnnouncements defaultTab="messages" /></Suspense>
            } />
            <Route path="org/branding" element={
              <Suspense fallback={<PageLoader />}><OrgBranding /></Suspense>
            } />
            <Route path="org/documents" element={
              <Suspense fallback={<PageLoader />}><OrgMiscPages page="documents" /></Suspense>
            } />
            <Route path="org/reports" element={
              <Suspense fallback={<PageLoader />}><OrgMiscPages page="reports" /></Suspense>
            } />
            <Route path="org/audit-logs" element={
              <Suspense fallback={<PageLoader />}><OrgMiscPages page="audit-logs" /></Suspense>
            } />
            <Route path="org/subscription" element={
              <Suspense fallback={<PageLoader />}><OrgMiscPages page="subscription" /></Suspense>
            } />
            <Route path="org/settings" element={
              <Suspense fallback={<PageLoader />}><OrgMiscPages page="settings" /></Suspense>
            } />
            
            {/* Principal Workspace Routes */}
            <Route path="principal/approvals" element={
              <Suspense fallback={<PageLoader />}><ApprovalCenterPage /></Suspense>
            } />
            <Route path="principal/profile" element={
              <Suspense fallback={<PageLoader />}><PrincipalProfilePage /></Suspense>
            } />
            <Route path="principal/settings" element={
              <Suspense fallback={<PageLoader />}><PrincipalSettingsPage /></Suspense>
            } />

            {/* Academic Oversight Routes */}
            <Route path="principal/academic-overview" element={
              <Suspense fallback={<PageLoader />}><ExecutiveAcademicOverviewPage /></Suspense>
            } />
            <Route path="principal/calendar" element={
              <Suspense fallback={<PageLoader />}><ExecutiveCalendarPage /></Suspense>
            } />
            <Route path="principal/examination-overview" element={
              <Suspense fallback={<PageLoader />}><ExecutiveExamOverviewPage /></Suspense>
            } />

            {/* Operations Oversight Routes */}
            <Route path="principal/operations/hr" element={
              <Suspense fallback={<PageLoader />}><ExecutiveHROversightPage /></Suspense>
            } />
            <Route path="principal/operations/finance" element={
              <Suspense fallback={<PageLoader />}><ExecutiveFinanceOversightPage /></Suspense>
            } />
            <Route path="principal/operations/reception" element={
              <Suspense fallback={<PageLoader />}><ExecutiveReceptionOversightPage /></Suspense>
            } />

            {/* Campus Operations Oversight Routes */}
            <Route path="principal/campus/library" element={
              <Suspense fallback={<PageLoader />}><ExecutiveLibraryOversightPage /></Suspense>
            } />
            <Route path="principal/campus/transport" element={
              <Suspense fallback={<PageLoader />}><ExecutiveTransportOversightPage /></Suspense>
            } />
            <Route path="principal/campus/hostel" element={
              <Suspense fallback={<PageLoader />}><ExecutiveHostelOversightPage /></Suspense>
            } />
            <Route path="principal/campus/security" element={
              <Suspense fallback={<PageLoader />}><ExecutiveSecurityOversightPage /></Suspense>
            } />

            {/* Intelligence Routes */}
            <Route path="principal/intelligence/reports" element={
              <Suspense fallback={<PageLoader />}><ExecutiveReportsPage /></Suspense>
            } />
            <Route path="principal/intelligence/analytics" element={
              <Suspense fallback={<PageLoader />}><ExecutiveAnalyticsPage /></Suspense>
            } />
            <Route path="principal/intelligence/insights" element={
              <Suspense fallback={<PageLoader />}><ExecutiveInsightsPage /></Suspense>
            } />

            {/* System States & Error Experience Explorer Routes */}
            <Route path="system-states" element={
              <Suspense fallback={<PageLoader />}><SystemShowcasePage /></Suspense>
            } />
            <Route path="404" element={<ErrorPage type="404" />} />
            <Route path="500" element={<ErrorPage type="500" errorDetails="Internal Database Exception 500" />} />
            <Route path="503" element={<ErrorPage type="503" />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="status" element={<SystemStatusPage />} />
            <Route path="offline" element={<NetworkStatePages />} />
            <Route path="unauthorized" element={<PermissionPages type="401" />} />
            <Route path="forbidden" element={<PermissionPages type="403" />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage type="404" />} />
      </Routes>
    </GlobalErrorBoundary>

      {showSplash && <SplashScreen onClose={() => setShowSplash(false)} />}
      {/* Global AI Chat Widget */}
      {is_authenticated && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}

      {/* Global Bus Tracking Widget */}
      {is_authenticated && (
        <BusTrackingFAB role="ADMIN" />
      )}
      </AIContextProvider>
    </BrowserRouter>
  );
}
