// ─── Principal Dashboard Mock Data Service ───────────────────────────────────
// Provides all mock data consumed by the Principal Dashboard.
// Mirrors the pattern used in organizationDashboard.service.ts

export interface PrincipalKPI {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  accentColor: string;
  trend?: { delta: string; direction: 'up' | 'down' | 'neutral'; label: string; isGood?: boolean };
  link?: string;
}

export interface ApprovalItem {
  id: string;
  category: ApprovalCategory;
  title: string;
  description: string;
  requestedBy: string;
  requestedDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

export type ApprovalCategory =
  | 'admissions'
  | 'leave'
  | 'results'
  | 'events'
  | 'announcements'
  | 'certificates'
  | 'staff'
  | 'parents';

export interface SubjectScore {
  subject: string;
  avgScore: number;
  maxScore: number;
  color: string;
}

export interface ClassRank {
  className: string;
  section: string;
  avgScore: number;
  attendance: number;
  rank: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface TeacherSummary {
  id: string;
  name: string;
  subject: string;
  attendance: number;
  rating: number;
  classes: number;
}

export interface StudentAlert {
  id: string;
  name: string;
  className: string;
  issue: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface NotificationItem {
  id: string;
  type: 'attendance' | 'fees' | 'exams' | 'transport' | 'library' | 'approvals';
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  time: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'event' | 'meeting' | 'holiday' | 'sports';
  status: 'upcoming' | 'today' | 'completed';
}

export interface AttendancePoint {
  day: string;
  students: number;
  teachers: number;
}

export const PrincipalDashboardService = {
  getKPIs,
  getSubjectScores,
  getClassRankings,
  getApprovals,
  getTeacherSummaries,
  getStudentAlerts,
  getTopPerformers,
  getNotifications,
  getCalendarEvents,
  getAttendanceTrends,
  getExamAnalytics,
  getHomeworkStats,
  getTodaysSchedule,
  getHomeworkTracker,
  getTransportOverview,
  getImportantAlerts,
  getUpcomingEventsList,
};

function getKPIs(): PrincipalKPI[] {
  return [
    {
      id: 'total-students', label: 'Total Students', value: '1,248',
      icon: '👨‍🎓', accentColor: '#4F46E5',
      trend: { delta: '↑ 12.4%', direction: 'up', label: 'vs last month', isGood: true },
      link: '/students',
    },
    {
      id: 'total-teachers', label: 'Total Teachers', value: '86',
      icon: '👩‍🏫', accentColor: '#0EA5E9',
      trend: { delta: '↑ 0.2%', direction: 'up', label: 'vs last month', isGood: true },
      link: '/teachers',
    },
    {
      id: 'todays-attendance', label: "Attendance Today", value: '94.2%',
      icon: '📋', accentColor: '#22C55E',
      trend: { delta: '↑ 1.3%', direction: 'up', label: 'vs yesterday', isGood: true },
      link: '/attendance',
    },
    {
      id: 'fee-collection', label: 'Fee Collection', value: '₹82%',
      icon: '💰', accentColor: '#F59E0B',
      trend: { delta: '↓ 3.2%', direction: 'down', label: 'pending', isGood: false },
      link: '/fees',
    },
    {
      id: 'pending-admissions', label: 'Pending Admissions', value: 18,
      icon: '📝', accentColor: '#8B5CF6',
      trend: { delta: '5', direction: 'neutral', label: 'require review' },
      link: '/principal/approvals',
    },
    {
      id: 'homework-completion', label: 'Homework Completion', value: '78%',
      icon: '📚', accentColor: '#06B6D4',
      trend: { delta: '+4%', direction: 'up', label: 'vs last week', isGood: true },
    },
    {
      id: 'exam-completion', label: 'Exam Completion', value: '65%',
      icon: '✅', accentColor: '#10B981',
      trend: { delta: '3 exams', direction: 'neutral', label: 'remaining' },
      link: '/exams',
    },
    {
      id: 'avg-academic-score', label: 'Avg Academic Score', value: '74.8%',
      icon: '📊', accentColor: '#4F46E5',
      trend: { delta: '+2.1%', direction: 'up', label: 'vs last term', isGood: true },
    },
    {
      id: 'transport-status', label: 'Transport Status', value: '12/14',
      icon: '🚌', accentColor: '#F97316',
      trend: { delta: '2 delayed', direction: 'down', label: 'routes', isGood: false },
      link: '/transport',
    },
    {
      id: 'library-usage', label: 'Library Usage', value: 342,
      icon: '📖', accentColor: '#A855F7',
      trend: { delta: '+18%', direction: 'up', label: 'vs last month', isGood: true },
      link: '/library',
    },
    {
      id: 'staff-requests', label: 'Open Staff Requests', value: 7,
      icon: '📨', accentColor: '#EF4444',
      trend: { delta: '3 urgent', direction: 'neutral', label: 'pending' },
      link: '/principal/approvals',
    },
    {
      id: 'parent-requests', label: 'Open Parent Requests', value: 12,
      icon: '👪', accentColor: '#EC4899',
      trend: { delta: '4 new', direction: 'neutral', label: 'today' },
      link: '/communication',
    },
  ];
}

// ─── Academic Performance ─────────────────────────────────────────────────────

function getSubjectScores(): SubjectScore[] {
  return [
    { subject: 'Mathematics', avgScore: 78, maxScore: 100, color: '#4F46E5' },
    { subject: 'Science', avgScore: 82, maxScore: 100, color: '#10B981' },
    { subject: 'English', avgScore: 76, maxScore: 100, color: '#0EA5E9' },
    { subject: 'Hindi', avgScore: 80, maxScore: 100, color: '#F59E0B' },
    { subject: 'Social Science', avgScore: 74, maxScore: 100, color: '#8B5CF6' },
    { subject: 'Computer Science', avgScore: 85, maxScore: 100, color: '#EC4899' },
  ];
}

function getClassRankings(): ClassRank[] {
  return [
    { className: 'Class 10', section: 'A', avgScore: 82.4, attendance: 96, rank: 1, trend: 'up' },
    { className: 'Class 9', section: 'A', avgScore: 79.8, attendance: 94, rank: 2, trend: 'up' },
    { className: 'Class 10', section: 'B', avgScore: 77.2, attendance: 92, rank: 3, trend: 'neutral' },
    { className: 'Class 8', section: 'A', avgScore: 76.5, attendance: 95, rank: 4, trend: 'up' },
    { className: 'Class 9', section: 'B', avgScore: 74.1, attendance: 91, rank: 5, trend: 'down' },
    { className: 'Class 7', section: 'A', avgScore: 73.8, attendance: 93, rank: 6, trend: 'neutral' },
    { className: 'Class 8', section: 'B', avgScore: 71.2, attendance: 89, rank: 7, trend: 'down' },
    { className: 'Class 6', section: 'A', avgScore: 70.5, attendance: 94, rank: 8, trend: 'up' },
  ];
}

function getExamAnalytics() {
  return {
    totalExams: 12,
    completed: 8,
    upcoming: 3,
    inProgress: 1,
    passRate: 89.2,
    avgScore: 74.8,
  };
}

function getHomeworkStats() {
  return {
    totalAssigned: 156,
    completed: 122,
    pending: 34,
    completionRate: 78,
    onTimeRate: 85,
  };
}

// ─── Approvals ────────────────────────────────────────────────────────────────

function getApprovals(): ApprovalItem[] {
  return [
    { id: 'APR-001', category: 'admissions', title: 'Rohan Gupta — Class 1 Admission', description: 'New admission application for Class 1. All documents verified.', requestedBy: 'Receptionist', requestedDate: '2026-07-20', priority: 'high', status: 'pending' },
    { id: 'APR-002', category: 'admissions', title: 'Sanya Malhotra — Class 5 Transfer', description: 'Transfer from DPS Whitefield. TC submitted.', requestedBy: 'Receptionist', requestedDate: '2026-07-19', priority: 'medium', status: 'pending' },
    { id: 'APR-003', category: 'leave', title: 'Mrs. Nisha Rao — 3 Days Leave', description: 'Personal leave request for July 25-27.', requestedBy: 'Mrs. Nisha Rao', requestedDate: '2026-07-18', priority: 'medium', status: 'pending' },
    { id: 'APR-004', category: 'leave', title: 'Mr. Arjun Patel — 1 Day Leave', description: 'Medical appointment on July 22.', requestedBy: 'Mr. Arjun Patel', requestedDate: '2026-07-20', priority: 'low', status: 'pending' },
    { id: 'APR-005', category: 'results', title: 'Unit Test II — Class 10A Results', description: 'Results ready for publication. Reviewed by VP.', requestedBy: 'Vice Principal', requestedDate: '2026-07-19', priority: 'high', status: 'pending' },
    { id: 'APR-006', category: 'events', title: 'Annual Sports Day — Aug 15', description: 'Event proposal with budget ₹1.2L. Venue: School Ground.', requestedBy: 'Sports HOD', requestedDate: '2026-07-17', priority: 'high', status: 'pending' },
    { id: 'APR-007', category: 'announcements', title: 'Parent-Teacher Meeting Notice', description: 'PTM scheduled for July 30. Circular draft attached.', requestedBy: 'Vice Principal', requestedDate: '2026-07-20', priority: 'medium', status: 'pending' },
    { id: 'APR-008', category: 'certificates', title: 'TC Request — Kabir Verma (Class 8B)', description: 'Transfer certificate requested due to relocation.', requestedBy: 'Parent', requestedDate: '2026-07-18', priority: 'medium', status: 'pending' },
    { id: 'APR-009', category: 'staff', title: 'Lab Equipment Purchase Request', description: 'Physics lab needs 5 oscilloscopes. Budget: ₹45,000.', requestedBy: 'Science HOD', requestedDate: '2026-07-16', priority: 'medium', status: 'pending' },
    { id: 'APR-010', category: 'parents', title: 'Fee Concession Request — Ananya Iyer', description: 'Single parent requesting 25% fee concession. Income proof attached.', requestedBy: 'Parent', requestedDate: '2026-07-15', priority: 'high', status: 'pending' },
    { id: 'APR-011', category: 'admissions', title: 'Vihaan Shah — Class 9 Admission', description: 'Lateral entry from ICSE board. Entrance test score: 82%.', requestedBy: 'Receptionist', requestedDate: '2026-07-14', priority: 'medium', status: 'pending' },
    { id: 'APR-012', category: 'leave', title: 'Ms. Priya Sharma — Maternity Leave', description: '6 months maternity leave starting Aug 1. Substitute needed.', requestedBy: 'Ms. Priya Sharma', requestedDate: '2026-07-12', priority: 'high', status: 'pending' },
  ];
}

// ─── Teacher Data ─────────────────────────────────────────────────────────────

function getTeacherSummaries(): TeacherSummary[] {
  return [
    { id: 'T001', name: 'Mrs. Nisha Rao', subject: 'Mathematics', attendance: 98, rating: 4.8, classes: 6 },
    { id: 'T002', name: 'Mr. Rajesh Kumar', subject: 'Science', attendance: 95, rating: 4.6, classes: 5 },
    { id: 'T003', name: 'Ms. Priya Sharma', subject: 'English', attendance: 97, rating: 4.7, classes: 6 },
    { id: 'T004', name: 'Mr. Arjun Patel', subject: 'Hindi', attendance: 92, rating: 4.3, classes: 5 },
    { id: 'T005', name: 'Mrs. Anita Desai', subject: 'Social Sc.', attendance: 96, rating: 4.5, classes: 4 },
    { id: 'T006', name: 'Mr. Vikram Singh', subject: 'Comp. Sc.', attendance: 94, rating: 4.9, classes: 4 },
  ];
}

// ─── Student Data ─────────────────────────────────────────────────────────────

function getStudentAlerts(): StudentAlert[] {
  return [
    { id: 'SA01', name: 'Rahul Mehra', className: 'Class 8B', issue: 'Attendance below 70% — 3 weeks', severity: 'critical' },
    { id: 'SA02', name: 'Neha Kapoor', className: 'Class 9A', issue: 'Failing in 3 subjects this term', severity: 'critical' },
    { id: 'SA03', name: 'Amit Joshi', className: 'Class 7A', issue: 'Multiple discipline incidents', severity: 'warning' },
    { id: 'SA04', name: 'Pooja Singh', className: 'Class 10B', issue: 'Declining performance trend', severity: 'warning' },
    { id: 'SA05', name: 'Karan Gupta', className: 'Class 6A', issue: 'Frequent late arrivals', severity: 'info' },
  ];
}

function getTopPerformers() {
  return [
    { name: 'Aarav Mehta', className: 'Class 10A', score: 96.4, rank: 1 },
    { name: 'Ishita Reddy', className: 'Class 10A', score: 95.1, rank: 2 },
    { name: 'Veer Sharma', className: 'Class 9A', score: 94.8, rank: 3 },
    { name: 'Ananya Iyer', className: 'Class 10B', score: 93.2, rank: 4 },
    { name: 'Diya Patel', className: 'Class 9B', score: 92.7, rank: 5 },
  ];
}

// ─── Notifications ────────────────────────────────────────────────────────────

function getNotifications(): NotificationItem[] {
  return [
    { id: 'N01', type: 'attendance', title: 'Low Attendance Alert', description: 'Class 8B attendance dropped to 72% today', severity: 'critical', time: '30 min ago' },
    { id: 'N02', type: 'fees', title: 'Fee Defaulters', description: '23 students have overdue fees for July', severity: 'warning', time: '1 hour ago' },
    { id: 'N03', type: 'exams', title: 'Upcoming Examination', description: 'Mid-Term Exams start July 28', severity: 'info', time: '2 hours ago' },
    { id: 'N04', type: 'transport', title: 'Bus Route Delay', description: 'Route 7 delayed by 25 mins due to traffic', severity: 'warning', time: '45 min ago' },
    { id: 'N05', type: 'library', title: 'Library Overdue', description: '15 books overdue by more than 2 weeks', severity: 'info', time: '3 hours ago' },
    { id: 'N06', type: 'approvals', title: 'Pending Approvals', description: '12 items require your attention', severity: 'critical', time: '10 min ago' },
  ];
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

function getCalendarEvents(): CalendarEvent[] {
  return [
    { id: 'E01', title: 'Parent-Teacher Meeting', date: 'Jul 30, 2026', type: 'meeting', status: 'upcoming' },
    { id: 'E02', title: 'Mid-Term Examinations', date: 'Jul 28 – Aug 5', type: 'exam', status: 'upcoming' },
    { id: 'E03', title: 'Independence Day', date: 'Aug 15, 2026', type: 'holiday', status: 'upcoming' },
    { id: 'E04', title: 'Annual Sports Day', date: 'Aug 15, 2026', type: 'sports', status: 'upcoming' },
    { id: 'E05', title: 'Class 10 Pre-Board', date: 'Aug 18 – Aug 25', type: 'exam', status: 'upcoming' },
    { id: 'E06', title: 'Inter-School Quiz', date: 'Sep 2, 2026', type: 'event', status: 'upcoming' },
    { id: 'E07', title: 'Staff Review Meeting', date: 'Today', type: 'meeting', status: 'today' },
    { id: 'E08', title: 'Unit Test III', date: 'Sep 5 – Sep 8', type: 'exam', status: 'upcoming' },
  ];
}

// ─── Attendance Trends ────────────────────────────────────────────────────────

function getAttendanceTrends(): AttendancePoint[] {
  return [
    { day: 'Mon', students: 96.1, teachers: 98.2 },
    { day: 'Tue', students: 94.8, teachers: 97.5 },
    { day: 'Wed', students: 95.3, teachers: 96.8 },
    { day: 'Thu', students: 93.2, teachers: 97.1 },
    { day: 'Fri', students: 94.2, teachers: 98.0 },
    { day: 'Last Mon', students: 92.8, teachers: 96.5 },
    { day: 'Last Tue', students: 93.5, teachers: 97.2 },
    { day: 'Last Wed', students: 91.7, teachers: 95.8 },
    { day: 'Last Thu', students: 92.1, teachers: 96.9 },
    { day: 'Last Fri', students: 93.0, teachers: 97.0 },
  ];
}

function getTodaysSchedule() {
  return [
    { time: '08:00 AM', subject: 'Mathematics', teacher: 'Mr. Smith', status: 'Completed' },
    { time: '08:50 AM', subject: 'Physics', teacher: 'Mrs. Davis', status: 'Completed' },
    { time: '10:45 AM', subject: 'Computer Science', teacher: 'Mr. Johnson', status: 'In Progress' },
    { time: '01:30 PM', subject: 'English', teacher: 'Ms. Williams', status: 'Upcoming' },
  ];
}

function getHomeworkTracker() {
  return [
    { task: 'Calculus Exercises 1-20', subject: 'Mathematics', due: 'Today, 11:50 PM', status: 'Pending' },
    { task: 'Lab Report: Kinematics Experiment', subject: 'Physics', due: 'Tomorrow', status: 'Submitted' },
    { task: 'Read Chapters 4 & 5, Write Summary', subject: 'English', due: 'Wednesday', status: 'Pending' },
    { task: 'Balance Redox Reactions Worksheet', subject: 'Chemistry', due: 'Thursday', status: 'Pending' },
    { task: 'Implement Stack Data Structure', subject: 'Computer Science', due: 'Friday', status: 'Overdue' },
  ];
}

function getTransportOverview() {
  return {
    activeRoutes: '12 / 14',
    studentsOnBus: 342,
    delayedRoutes: 2,
    routeName: 'Route 12B',
    routeStatus: 'On Route — 5 mins away',
  };
}

function getImportantAlerts() {
  return [
    { title: 'Low Attendance Alert', desc: 'Class 8B attendance dropped to 72% today', severity: 'Critical' },
    { title: 'Fee Defaulters', desc: '23 students have overdue fees for July', severity: 'Warning' },
    { title: 'Library Overdue', desc: '15 books overdue by more than 2 weeks', severity: 'Info' },
    { title: 'Bus Route Delay', desc: 'Route 7 delayed by 25 mins due to traffic', severity: 'Warning' },
  ];
}

function getUpcomingEventsList() {
  return [
    { date: '05', month: 'JUN', title: 'Parent-Teacher Meeting', time: 'Thursday, 10:00 AM', category: 'Meeting' },
    { date: '10', month: 'JUN', title: 'Annual Sports Day', time: 'Tuesday, 09:00 AM', category: 'Event' },
    { date: '15', month: 'JUN', title: 'Mid-Term Examinations', time: 'Monday, 09:00 AM', category: 'Exam' },
    { date: '20', month: 'JUN', title: 'Independence Day Celebration', time: 'Friday, 09:00 AM', category: 'Holiday' },
  ];
}
