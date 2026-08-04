import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import HRDashboardModule from './dashboard/HRDashboardModule';
import EmployeesModule from './employees/EmployeesModule';
import JobOpeningsModule from './openings/JobOpeningsModule';
import CandidatesModule from './candidates/CandidatesModule';
import OnboardingModule from './onboarding/OnboardingModule';
import DepartmentsDesignationsModule from './departments/DepartmentsDesignationsModule';
import HRAttendanceModule from './attendance/HRAttendanceModule';
import HRLeaveModule from './leave/HRLeaveModule';
import PayrollCoordinationModule from './payroll-coordination/PayrollCoordinationModule';
import PerformanceReviewsModule from './performance/PerformanceReviewsModule';
import TrainingDevelopmentModule from './training/TrainingDevelopmentModule';
import HRDocumentsModule from './documents/HRDocumentsModule';
import ComplianceModule from './compliance/ComplianceModule';
import EmployeeRequestsModule from './requests/EmployeeRequestsModule';
import AnnouncementsModule from './announcements/AnnouncementsModule';
import HRReportsAnalyticsModule from './reports/HRReportsAnalyticsModule';
import HRIntelligenceModule from './intelligence/HRIntelligenceModule';
import HRSettingsModule from './settings/HRSettingsModule';

export type HRTab =
  | 'dashboard' | 'employees' | 'departments' | 'recruitment'
  | 'candidates' | 'onboarding' | 'attendance' | 'leave'
  | 'payroll' | 'performance' | 'training' | 'documents'
  | 'compliance' | 'requests' | 'announcements' | 'reports'
  | 'intelligence' | 'settings';

export default function HRPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = (): HRTab => {
    const path = location.pathname;
    if (path.includes('/employees')) return 'employees';
    if (path.includes('/departments') || path.includes('/designations')) return 'departments';
    if (path.includes('/recruitment') || path.includes('/openings')) return 'recruitment';
    if (path.includes('/candidates')) return 'candidates';
    if (path.includes('/onboarding')) return 'onboarding';
    if (path.includes('/attendance')) return 'attendance';
    if (path.includes('/leave')) return 'leave';
    if (path.includes('/payroll')) return 'payroll';
    if (path.includes('/performance')) return 'performance';
    if (path.includes('/training')) return 'training';
    if (path.includes('/documents')) return 'documents';
    if (path.includes('/compliance')) return 'compliance';
    if (path.includes('/requests')) return 'requests';
    if (path.includes('/announcements')) return 'announcements';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/intelligence')) return 'intelligence';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const renderModule = () => {
    switch (activeTab) {
      case 'employees':
        return <EmployeesModule />;
      case 'departments':
        return <DepartmentsDesignationsModule />;
      case 'recruitment':
        return <JobOpeningsModule />;
      case 'candidates':
        return <CandidatesModule />;
      case 'onboarding':
        return <OnboardingModule />;
      case 'attendance':
        return <HRAttendanceModule />;
      case 'leave':
        return <HRLeaveModule />;
      case 'payroll':
        return <PayrollCoordinationModule />;
      case 'performance':
        return <PerformanceReviewsModule />;
      case 'training':
        return <TrainingDevelopmentModule />;
      case 'documents':
        return <HRDocumentsModule />;
      case 'compliance':
        return <ComplianceModule />;
      case 'requests':
        return <EmployeeRequestsModule />;
      case 'announcements':
        return <AnnouncementsModule />;
      case 'reports':
        return <HRReportsAnalyticsModule />;
      case 'intelligence':
        return <HRIntelligenceModule />;
      case 'settings':
        return <HRSettingsModule />;
      case 'dashboard':
      default:
        return <HRDashboardModule />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'employees': return 'Employee Directory & Profiles';
      case 'departments': return 'Departments & Designation Hierarchy';
      case 'recruitment': return 'Recruitment & Job Openings Registry';
      case 'candidates': return 'Candidate Pipeline & Applications';
      case 'onboarding': return 'Employee Onboarding Checklist';
      case 'attendance': return 'Attendance & Overtime Tracker';
      case 'leave': return 'Leave Requests & Approvals';
      case 'payroll': return 'Payroll Coordination & Salary Structure';
      case 'performance': return 'Performance Reviews & Appraisals';
      case 'training': return 'Staff Training & Professional Development';
      case 'documents': return 'HR Documents & Compliance Vault';
      case 'compliance': return 'HR Compliance & Verification';
      case 'requests': return 'Employee Service Requests & Approvals';
      case 'announcements': return 'HR Circulars & Staff Announcements';
      case 'reports': return 'HR Audit Reports & Analytics';
      case 'intelligence': return 'AI HR Workforce Intelligence & Analytics';
      case 'settings': return 'HR Policies & System Settings';
      default: return 'HR Command Center';
    }
  };

  if (activeTab === 'dashboard') {
    return (
      <PageLayout>
        {renderModule()}
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title={getHeaderTitle()}
        subtitle="Manage complete employee lifecycle: recruitment, onboarding, attendance, leave, payroll coordination, performance, training & compliance."
        breadcrumb={[
          { label: 'Workspace', path: '/' },
          { label: 'Human Resources', path: '/hr' },
          { label: getHeaderTitle(), path: location.pathname }
        ]}
      />
      
      <div style={{ marginTop: '16px' }}>
        {renderModule()}
      </div>
    </PageLayout>
  );
}
