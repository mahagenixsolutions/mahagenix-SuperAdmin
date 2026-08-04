import { usePrincipalDashboard } from './hooks/usePrincipalDashboard';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  ClipboardCheck,
} from 'lucide-react';
import { Tabs } from '../../components/ui/Tabs';

// Sub-components
import PrincipalHeader from './components/PrincipalHeader';
import PrincipalKPIs from './components/PrincipalKPIs';
import QuickActions from './components/QuickActions';
import AcademicPerformance from './components/AcademicPerformance';
import ApprovalCenter from './components/ApprovalCenter';
import TeacherOverview from './components/TeacherOverview';
import StudentOverview from './components/StudentOverview';
import NotificationCenter from './components/NotificationCenter';
import AttendanceTrends from './components/AttendanceTrends';
import UpcomingSchedule from './components/UpcomingSchedule';

// New Redesigned Mockup Components
import ScheduleAndHomework from './components/ScheduleAndHomework';
import InsightsCharts from './components/InsightsCharts';
import ApprovalsAndAnnouncements from './components/ApprovalsAndAnnouncements';
import TransportAndAlerts from './components/TransportAndAlerts';
import TeachersAndEvents from './components/TeachersAndEvents';

const TABS = [
  { key: 'overview' as const, label: 'Overview', icon: <LayoutDashboard size={14} /> },
  { key: 'academics' as const, label: 'Academics', icon: <GraduationCap size={14} /> },
  { key: 'teachers' as const, label: 'Teachers', icon: <UserCheck size={14} /> },
  { key: 'students' as const, label: 'Students', icon: <Users size={14} /> },
  { key: 'approvals' as const, label: 'Approvals', icon: <ClipboardCheck size={14} /> },
];

export default function PrincipalDashboard() {
  const {
    activeTab, setActiveTab,
    kpis,
    subjectScores, classRankings,
    teacherSummaries,
    studentAlerts, topPerformers,
    notifications,
    calendarEvents,
    attendanceTrends,
    approvalFilter, setApprovalFilter,
    filteredApprovals, approvalCounts,
    approveItem, rejectItem,
    todaysSchedule,
    homeworkTracker,
    transportOverview,
    importantAlerts,
    upcomingEventsList,
  } = usePrincipalDashboard();

  const spacing = '24px';

  const tabsData = TABS.map(tab => ({
    id: tab.key,
    label: tab.label,
    icon: tab.icon,
    badge: tab.key === 'approvals' && approvalCounts.all > 0 ? approvalCounts.all : undefined
  }));

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: spacing,
      padding: '24px 0', fontFamily: 'Inter, sans-serif',
      minHeight: '100vh', boxSizing: 'border-box',
    }}>
      {/* 1. Hero Header */}
      <PrincipalHeader
        onGenerateReport={() => alert('Generating Principal Executive Report PDF…')}
        onExportData={() => alert('Exporting branch data to Excel…')}
      />

      {/* 2. Tab Navigation */}
      <Tabs tabs={tabsData} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} variant="default" />

      {/* ── Overview Tab ─────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          {/* KPIs */}
          <PrincipalKPIs kpis={kpis} />

          {/* Today's Schedule & Homework Tracker */}
          <ScheduleAndHomework
            schedule={todaysSchedule}
            homework={homeworkTracker}
          />

          {/* Insights & Charts (Academic Performance Radar, Class Rankings Table, Attendance Trend Line Chart) */}
          <InsightsCharts
            subjectScores={subjectScores}
            classRankings={classRankings}
            attendanceTrends={attendanceTrends}
          />

          {/* Approval Center & Recent Announcements */}
          <ApprovalsAndAnnouncements
            approvals={filteredApprovals}
            onApprove={approveItem}
            onReject={rejectItem}
          />

          {/* Transport Overview & Important Alerts */}
          <TransportAndAlerts
            transport={transportOverview}
            alerts={importantAlerts}
          />

          {/* Top Performing Teachers & Upcoming Events */}
          <TeachersAndEvents
            teachers={teacherSummaries}
            events={upcomingEventsList}
          />
        </div>
      )}

      {/* ── Academics Tab ────────────────────────────────────────────────── */}
      {activeTab === 'academics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          <SectionTitle title="Academic Performance" color="#4F46E5" />
          <AcademicPerformance
            subjectScores={subjectScores}
            classRankings={classRankings}
          />
          <AttendanceTrends data={attendanceTrends} />
        </div>
      )}

      {/* ── Teachers Tab ─────────────────────────────────────────────────── */}
      {activeTab === 'teachers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          <SectionTitle title="Teacher Management" color="#0EA5E9" />
          <TeacherOverview
            teachers={teacherSummaries}
            pendingLeaves={approvalCounts.leave || 0}
          />
        </div>
      )}

      {/* ── Students Tab ─────────────────────────────────────────────────── */}
      {activeTab === 'students' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          <SectionTitle title="Student Management" color="#EC4899" />
          <StudentOverview
            alerts={studentAlerts}
            topPerformers={topPerformers}
          />
        </div>
      )}

      {/* ── Approvals Tab ────────────────────────────────────────────────── */}
      {activeTab === 'approvals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          <SectionTitle title="Approval Center" color="#8B5CF6" />
          <ApprovalCenter
            approvals={filteredApprovals}
            counts={approvalCounts}
            activeFilter={approvalFilter}
            onFilterChange={setApprovalFilter}
            onApprove={approveItem}
            onReject={rejectItem}
          />
        </div>
      )}
    </div>
  );
}

// ─── Shared Section Title ───────────────────────────────────────────────────

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <h2 style={{
      fontSize: 18, fontWeight: 700, color: 'var(--text-primary)',
      margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: 'Inter, sans-serif',
    }}>
      <span style={{ width: 4, height: 18, borderRadius: 2, background: color }} />
      {title}
    </h2>
  );
}
