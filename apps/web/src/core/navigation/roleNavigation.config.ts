import React from 'react';
import { UserRole } from '@edutrack/shared-types';
import { PERMISSIONS } from '../permissions/PERMISSIONS';
import type { Permission } from '../permissions/PERMISSIONS';

// ─── SVG Icon Helper ──────────────────────────────────────────────────────────
const icon = (pathStr: string) => () =>
  React.createElement('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'currentColor' },
    React.createElement('path', { d: pathStr })
  );

const DashboardIcon = icon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z');
const ChartIcon     = icon('M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z');
const UsersIcon     = icon('M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z');
const CalendarIcon  = icon('M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z');
const TrendIcon     = icon('M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z');
const BuildingIcon  = icon('M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z');
const BookIcon      = icon('M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z');
const UserIcon      = icon('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z');
const ReportIcon    = icon('M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z');
const SettingsIcon  = icon('M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z');
const TransportIcon = icon('M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 10l1.5-4.5h11L19 10H5z');
const CommunicationIcon = icon('M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z');
const ShieldIcon    = icon('M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z');

export interface RoleNavItem {
  to: string;
  icon: React.FC;
  label: string;
  permission?: Permission;
}

export interface RoleNavSection {
  section: string;
  items: RoleNavItem[];
}

const BaseDashboardItem: RoleNavItem = {
  to: '/dashboard',
  icon: DashboardIcon,
  label: 'Dashboard',
};

export const ROLE_NAVIGATION: Partial<Record<UserRole, RoleNavSection[]>> = {
  [UserRole.ORGANIZATION_ADMIN]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Organization Workspace',
      items: [
        { to: '/org/branches', icon: BuildingIcon, label: 'School Branches' },
        { to: '/org/principals', icon: UsersIcon, label: 'Branch Administrators' },
        { to: '/org/announcements', icon: CommunicationIcon, label: 'Announcements' },
        { to: '/org/communication', icon: CommunicationIcon, label: 'Communication' },
        { to: '/org/branding', icon: BuildingIcon, label: 'Organization Profile' },
        { to: '/org/documents', icon: ReportIcon, label: 'Documents' },
        { to: '/org/reports', icon: ReportIcon, label: 'Reports' },
        { to: '/org/audit-logs', icon: ShieldIcon, label: 'Audit Logs' },
        { to: '/org/subscription', icon: ReportIcon, label: 'Subscription Plan' },
        { to: '/org/settings', icon: SettingsIcon, label: 'Org Settings' },
      ],
    },
    {
      section: 'Analytics',
      items: [
        { to: '/org/analytics/academic', icon: ChartIcon, label: 'Academic Analytics' },
        { to: '/org/analytics/financial', icon: ChartIcon, label: 'Financial Analytics' },
        { to: '/org/analytics/hr', icon: ChartIcon, label: 'HR Analytics' },
      ],
    },
  ],

  [UserRole.PRINCIPAL]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Leadership',
      items: [
        { to: '/principal/approvals', icon: ShieldIcon, label: 'Approval Center' },
        { to: '/principal/profile', icon: UserIcon, label: 'Executive Profile' },
        { to: '/principal/settings', icon: SettingsIcon, label: 'Executive Settings' },
      ],
    },
    {
      section: 'Academic Oversight',
      items: [
        { to: '/principal/academic-overview', icon: BookIcon, label: 'Academic Overview' },
        { to: '/principal/calendar', icon: CalendarIcon, label: 'School Calendar' },
        { to: '/principal/examination-overview', icon: ReportIcon, label: 'Examination Overview' },
      ],
    },
    {
      section: 'Operations',
      items: [
        { to: '/principal/operations/hr', icon: UserIcon, label: 'HR' },
        { to: '/principal/operations/finance', icon: ReportIcon, label: 'Finance' },
        { to: '/principal/operations/reception', icon: BuildingIcon, label: 'Reception' },
      ],
    },
    {
      section: 'Campus Operations',
      items: [
        { to: '/principal/campus/library', icon: BookIcon, label: 'Library' },
        { to: '/principal/campus/transport', icon: TransportIcon, label: 'Transport' },
        { to: '/principal/campus/hostel', icon: BuildingIcon, label: 'Hostel' },
        { to: '/principal/campus/security', icon: ShieldIcon, label: 'Security' },
      ],
    },
    {
      section: 'Intelligence',
      items: [
        { to: '/principal/intelligence/reports', icon: ReportIcon, label: 'Reports' },
        { to: '/principal/intelligence/analytics', icon: ChartIcon, label: 'Analytics' },
        { to: '/principal/intelligence/insights', icon: TrendIcon, label: 'Executive Insights' },
      ],
    },
  ],

  [UserRole.ACADEMIC_COORDINATOR]: [
    {
      section: 'ACADEMIC OPERATIONS',
      items: [
        BaseDashboardItem,
        { to: '/events', icon: CalendarIcon, label: 'Academic Calendar' },
        { to: '/classes', icon: BuildingIcon, label: 'Timetable Management' },
        { to: '/teachers', icon: UsersIcon, label: 'Teacher Allocation' },
        { to: '/subjects', icon: BookIcon, label: 'Subject Allocation' },
        { to: '/academic', icon: BookIcon, label: 'Curriculum' },
        { to: '/academic/syllabus', icon: ChartIcon, label: 'Syllabus Tracker' },
        { to: '/academic/lesson-plans', icon: BookIcon, label: 'Lesson Plans' },
      ],
    },
    {
      section: 'ONLINE LEARNING',
      items: [
        { to: '/online-classes', icon: CommunicationIcon, label: 'Online Classes' },
        { to: '/exams', icon: ReportIcon, label: 'Online Exams' },
        { to: '/exams/question-bank', icon: BookIcon, label: 'Question Bank' },
        { to: '/assignments', icon: ReportIcon, label: 'Assignments Overview' },
      ],
    },
    {
      section: 'MONITORING & INSIGHTS',
      items: [
        { to: '/attendance', icon: ChartIcon, label: 'Attendance Analytics' },
        { to: '/reports', icon: ReportIcon, label: 'Academic Performance' },
        { to: '/teachers/performance', icon: TrendIcon, label: 'Teacher Performance' },
        { to: '/academic/audit', icon: ShieldIcon, label: 'Academic Audit' },
      ],
    },
    {
      section: 'COMMUNICATION',
      items: [
        { to: '/notifications', icon: CommunicationIcon, label: 'Announcements' },
        { to: '/notices', icon: ReportIcon, label: 'Academic Notices' },
      ],
    },
    {
      section: 'SETTINGS',
      items: [
        { to: '/academic/profile', icon: UserIcon, label: 'Profile' },
        { to: '/academic/settings', icon: SettingsIcon, label: 'Settings' },
      ],
    },
  ],

  [UserRole.ACCOUNTANT]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Finance Management',
      items: [
        { to: '/finance/fees', icon: ReportIcon, label: 'Fee Management', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/expenses', icon: ReportIcon, label: 'Expense Management', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/payroll', icon: UserIcon, label: 'Payroll Coordination', permission: PERMISSIONS.PAYROLL_VIEW },
        { to: '/finance/invoices', icon: ReportIcon, label: 'Invoices & Billing', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/receivables', icon: ChartIcon, label: 'Accounts Receivable', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/payables', icon: ReportIcon, label: 'Accounts Payable', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/vendors', icon: BuildingIcon, label: 'Procurement & Vendors', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/banking', icon: ReportIcon, label: 'Banking & Cashbook', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/budget', icon: ChartIcon, label: 'Budget Planning', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/assets', icon: BuildingIcon, label: 'Asset Management', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/taxation', icon: ReportIcon, label: 'Taxation & GST', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/reports', icon: ReportIcon, label: 'Financial Reports', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/finance/intelligence', icon: TrendIcon, label: 'Finance Intelligence', permission: PERMISSIONS.FEES_VIEW },
        { to: '/finance/settings', icon: SettingsIcon, label: 'Settings', permission: PERMISSIONS.FEES_VIEW },
      ],
    },
  ],

  [UserRole.HR]: [
    {
      section: 'Human Resources',
      items: [
        { to: '/hr/dashboard', icon: DashboardIcon, label: 'Dashboard', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/employees', icon: UsersIcon, label: 'Employee Directory', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/departments', icon: BuildingIcon, label: 'Departments & Designations', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/recruitment', icon: UserIcon, label: 'Recruitment & Onboarding', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/attendance', icon: CalendarIcon, label: 'Attendance & Leave', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/payroll', icon: ReportIcon, label: 'Payroll Coordination', permission: PERMISSIONS.PAYROLL_VIEW },
        { to: '/hr/performance', icon: TrendIcon, label: 'Performance Reviews', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/training', icon: BookIcon, label: 'Training & Development', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/documents', icon: ReportIcon, label: 'Documents & Compliance', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/requests', icon: ReportIcon, label: 'Employee Requests', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/announcements', icon: CommunicationIcon, label: 'Announcements', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/reports', icon: ReportIcon, label: 'HR Reports', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/hr/intelligence', icon: TrendIcon, label: 'HR Intelligence', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr/settings', icon: SettingsIcon, label: 'HR Settings', permission: PERMISSIONS.HR_VIEW },
      ],
    },
  ],

  [UserRole.LIBRARIAN]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Library Workspace',
      items: [
        { to: '/library/catalog', icon: BookIcon, label: 'Book Catalog', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/circulation', icon: CalendarIcon, label: 'Circulation', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/members', icon: UsersIcon, label: 'Members', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/inventory', icon: BuildingIcon, label: 'Library Inventory', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/reservations', icon: CalendarIcon, label: 'Reservations', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/digital', icon: BookIcon, label: 'Digital Library', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/acquisitions', icon: ReportIcon, label: 'Book Acquisition', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/authors', icon: UserIcon, label: 'Authors & Publishers', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/fines', icon: ReportIcon, label: 'Fines & Receipts', permission: PERMISSIONS.LIBRARY_VIEW },
        { to: '/library/reports', icon: ReportIcon, label: 'Library Reports', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/library/settings', icon: SettingsIcon, label: 'Library Settings', permission: PERMISSIONS.LIBRARY_VIEW },
      ],
    },
  ],

  [UserRole.TRANSPORT_MANAGER]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Transport Workspace',
      items: [
        { to: '/transport/fleet', icon: TransportIcon, label: 'Fleet Management', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/students', icon: UsersIcon, label: 'Student Transport', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/routes', icon: TrendIcon, label: 'Routes & Stops', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/drivers', icon: UserIcon, label: 'Drivers & Attendants', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/trips', icon: CalendarIcon, label: 'Trip Management', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/tracking', icon: ChartIcon, label: 'Live Tracking', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/fuel', icon: ReportIcon, label: 'Fuel Management', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/maintenance', icon: SettingsIcon, label: 'Bus Maintenance', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/documents', icon: ReportIcon, label: 'Vehicle Documents', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/requests', icon: ReportIcon, label: 'Transport Requests', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/incidents', icon: ShieldIcon, label: 'Incidents & Safety', permission: PERMISSIONS.TRANSPORT_VIEW },
        { to: '/transport/reports', icon: ReportIcon, label: 'Transport Reports', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/transport/settings', icon: SettingsIcon, label: 'Transport Settings', permission: PERMISSIONS.TRANSPORT_VIEW },
      ],
    },
  ],

  [UserRole.HOSTEL_MANAGER]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Hostel Workspace',
      items: [
        { to: '/hostel/students', icon: UsersIcon, label: 'Hostel Students', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/buildings', icon: BuildingIcon, label: 'Blocks & Buildings', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/rooms', icon: BookIcon, label: 'Rooms', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/allocation', icon: UserIcon, label: 'Room Allocation', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/wardens', icon: UsersIcon, label: 'Wardens & Staff', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/attendance', icon: CalendarIcon, label: 'Attendance', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/mess', icon: ReportIcon, label: 'Mess Management', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/visitors', icon: UserIcon, label: 'Visitors & Gate Pass', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/complaints', icon: SettingsIcon, label: 'Complaints & Maintenance', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/inventory', icon: ReportIcon, label: 'Inventory', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/fees', icon: ReportIcon, label: 'Hostel Fees', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/medical', icon: ShieldIcon, label: 'Medical & Emergency', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/discipline', icon: ShieldIcon, label: 'Discipline & Incidents', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/hostel/reports', icon: ReportIcon, label: 'Hostel Reports', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/hostel/settings', icon: SettingsIcon, label: 'Hostel Settings', permission: PERMISSIONS.HOSTEL_VIEW },
      ],
    },
  ],

  [UserRole.RECEPTIONIST]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Reception Workspace',
      items: [
        { to: '/reception/enquiries', icon: CalendarIcon, label: 'Admissions Enquiries', permission: PERMISSIONS.ADMISSIONS_VIEW },
        { to: '/reception/visitors', icon: UsersIcon, label: 'Visitor Management', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/reception/appointments', icon: BuildingIcon, label: 'Appointments', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/reception/student-helpdesk', icon: UserIcon, label: 'Student Help Desk', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/reception/parent-helpdesk', icon: UsersIcon, label: 'Parent Help Desk', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/reception/certificates', icon: ReportIcon, label: 'Certificates & Documents', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/reception/gatepass', icon: ReportIcon, label: 'Gate Pass', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/reception/call-log', icon: CommunicationIcon, label: 'Call Log', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/reception/communication', icon: CommunicationIcon, label: 'Communication Center', permission: PERMISSIONS.COMMUNICATION_VIEW },
        { to: '/reception/lost-found', icon: BuildingIcon, label: 'Lost & Found', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/reception/announcements', icon: CommunicationIcon, label: 'Announcements', permission: PERMISSIONS.COMMUNICATION_VIEW },
        { to: '/reception/reports', icon: ReportIcon, label: 'Reception Reports', permission: PERMISSIONS.REPORTS_VIEW },
        { to: '/reception/settings', icon: SettingsIcon, label: 'Reception Settings', permission: PERMISSIONS.VISITOR_VIEW },
      ],
    },
  ],

  [UserRole.SECURITY]: [
    { section: 'Overview', items: [BaseDashboardItem] },
    {
      section: 'Security Workspace',
      items: [
        { to: '/security', icon: ShieldIcon, label: 'Security Command Center', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/visitors', icon: UsersIcon, label: 'Visitor Passes', permission: PERMISSIONS.VISITOR_VIEW },
        { to: '/security/gate', icon: BuildingIcon, label: 'Gate Management', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/student-exit', icon: UserIcon, label: 'Student Exit Register', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/vehicles', icon: TransportIcon, label: 'Vehicle Entries', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/patrols', icon: ShieldIcon, label: 'Guard Patrols', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/incidents', icon: ReportIcon, label: 'Incident Reports', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/emergency', icon: CommunicationIcon, label: 'Emergency Alerts', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/cctv', icon: BuildingIcon, label: 'CCTV Monitoring', permission: PERMISSIONS.SECURITY_VIEW },
        { to: '/security/reports', icon: ReportIcon, label: 'Security Reports', permission: PERMISSIONS.REPORTS_VIEW },
      ],
    },
  ],
};
