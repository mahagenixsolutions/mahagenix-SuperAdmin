import { useState, useMemo } from 'react';
import {
  PrincipalDashboardService,
  type ApprovalItem,
  type ApprovalCategory,
} from '../services/principalDashboard.service';

export type PrincipalTab = 'overview' | 'academics' | 'teachers' | 'students' | 'approvals';

export function usePrincipalDashboard() {
  const [activeTab, setActiveTab] = useState<PrincipalTab>('overview');
  const [approvalFilter, setApprovalFilter] = useState<ApprovalCategory | 'all'>('all');
  const [approvals, setApprovals] = useState<ApprovalItem[]>(
    () => PrincipalDashboardService.getApprovals(),
  );

  // ─── KPIs ─────────────────────────────────────────────────────────────
  const kpis = useMemo(() => PrincipalDashboardService.getKPIs(), []);

  // ─── Academic Data ────────────────────────────────────────────────────
  const subjectScores = useMemo(() => PrincipalDashboardService.getSubjectScores(), []);
  const classRankings = useMemo(() => PrincipalDashboardService.getClassRankings(), []);
  const examAnalytics = useMemo(() => PrincipalDashboardService.getExamAnalytics(), []);
  const homeworkStats = useMemo(() => PrincipalDashboardService.getHomeworkStats(), []);

  // ─── Teacher Data ────────────────────────────────────────────────────
  const teacherSummaries = useMemo(() => PrincipalDashboardService.getTeacherSummaries(), []);

  // ─── Student Data ────────────────────────────────────────────────────
  const studentAlerts = useMemo(() => PrincipalDashboardService.getStudentAlerts(), []);
  const topPerformers = useMemo(() => PrincipalDashboardService.getTopPerformers(), []);

  // ─── Notifications ───────────────────────────────────────────────────
  const notifications = useMemo(() => PrincipalDashboardService.getNotifications(), []);

  // ─── Calendar ────────────────────────────────────────────────────────
  const calendarEvents = useMemo(() => PrincipalDashboardService.getCalendarEvents(), []);

  // ─── Attendance Trends ───────────────────────────────────────────────
  const attendanceTrends = useMemo(() => PrincipalDashboardService.getAttendanceTrends(), []);

  // ─── Today's Schedule & Homework Tracker ─────────────────────────────
  const todaysSchedule = useMemo(() => PrincipalDashboardService.getTodaysSchedule(), []);
  const homeworkTracker = useMemo(() => PrincipalDashboardService.getHomeworkTracker(), []);

  // ─── Transport & Alerts ──────────────────────────────────────────────
  const transportOverview = useMemo(() => PrincipalDashboardService.getTransportOverview(), []);
  const importantAlerts = useMemo(() => PrincipalDashboardService.getImportantAlerts(), []);

  // ─── Upcoming Events List ────────────────────────────────────────────
  const upcomingEventsList = useMemo(() => PrincipalDashboardService.getUpcomingEventsList(), []);

  // ─── Filtered Approvals ──────────────────────────────────────────────
  const filteredApprovals = useMemo(() => {
    if (approvalFilter === 'all') return approvals.filter(a => a.status === 'pending');
    return approvals.filter(a => a.category === approvalFilter && a.status === 'pending');
  }, [approvals, approvalFilter]);

  // ─── Approval Counts ─────────────────────────────────────────────────
  const approvalCounts = useMemo(() => {
    const pending = approvals.filter(a => a.status === 'pending');
    const counts: Record<string, number> = { all: pending.length };
    for (const item of pending) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [approvals]);

  // ─── Actions ─────────────────────────────────────────────────────────
  const approveItem = (id: string) => {
    setApprovals(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'approved' as const } : a)),
    );
  };

  const rejectItem = (id: string) => {
    setApprovals(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'rejected' as const } : a)),
    );
  };

  return {
    // Tab navigation
    activeTab, setActiveTab,
    // KPIs
    kpis,
    // Academic
    subjectScores, classRankings, examAnalytics, homeworkStats,
    // Teachers
    teacherSummaries,
    // Students
    studentAlerts, topPerformers,
    // Notifications
    notifications,
    // Calendar
    calendarEvents,
    // Attendance
    attendanceTrends,
    // Approvals
    approvalFilter, setApprovalFilter,
    filteredApprovals, approvalCounts,
    approveItem, rejectItem,
    // Newly Added
    todaysSchedule,
    homeworkTracker,
    transportOverview,
    importantAlerts,
    upcomingEventsList,
  };
}
