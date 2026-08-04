import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { ReceptionProvider } from './shared/receptionStore';
import ReceptionDashboardModule from './dashboard/ReceptionDashboardModule';
import AdmissionEnquiriesModule from './enquiries/AdmissionEnquiriesModule';
import VisitorsModule from './visitors/VisitorsModule';
import AppointmentsModule from './appointments/AppointmentsModule';
import StudentHelpDeskModule from './student-helpdesk/StudentHelpDeskModule';
import ParentHelpDeskModule from './parent-helpdesk/ParentHelpDeskModule';
import CallLogModule from './call-log/CallLogModule';
import CertificatesModule from './certificates/CertificatesModule';
import GatePassModule from './gatepass/GatePassModule';
import LostFoundModule from './lost-found/LostFoundModule';
import AnnouncementsModule from './announcements/AnnouncementsModule';
import CommunicationModule from './communication/CommunicationModule';
import ReceptionReportsAnalyticsModule from './reports/ReceptionReportsAnalyticsModule';
import ReceptionSettingsModule from './settings/ReceptionSettingsModule';

export default function ReceptionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/enquiries')) return 'enquiries';
    if (path.includes('/visitors')) return 'visitors';
    if (path.includes('/appointments')) return 'appointments';
    if (path.includes('/student-helpdesk')) return 'student-helpdesk';
    if (path.includes('/parent-helpdesk')) return 'parent-helpdesk';
    if (path.includes('/certificates')) return 'certificates';
    if (path.includes('/gatepass')) return 'gatepass';
    if (path.includes('/call-log')) return 'call-log';
    if (path.includes('/communication')) return 'communication';
    if (path.includes('/lost-found')) return 'lost-found';
    if (path.includes('/announcements')) return 'announcements';
    if (path.includes('/reports') || path.includes('/analytics')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const renderModule = () => {
    switch (activeTab) {
      case 'enquiries':
        return <AdmissionEnquiriesModule />;
      case 'visitors':
        return <VisitorsModule />;
      case 'appointments':
        return <AppointmentsModule />;
      case 'student-helpdesk':
        return <StudentHelpDeskModule />;
      case 'parent-helpdesk':
        return <ParentHelpDeskModule />;
      case 'certificates':
        return <CertificatesModule />;
      case 'gatepass':
        return <GatePassModule />;
      case 'call-log':
        return <CallLogModule />;
      case 'communication':
        return <CommunicationModule />;
      case 'lost-found':
        return <LostFoundModule />;
      case 'announcements':
        return <AnnouncementsModule />;
      case 'reports':
        return <ReceptionReportsAnalyticsModule />;
      case 'settings':
        return <ReceptionSettingsModule />;
      case 'dashboard':
      default:
        return <ReceptionDashboardModule />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'enquiries': return 'Admission Enquiries & Walk-in Leads';
      case 'visitors': return 'Visitor Registration & Badge Issuance';
      case 'appointments': return 'Principal & Faculty Appointments';
      case 'student-helpdesk': return 'Student Help Desk & Document Requests';
      case 'parent-helpdesk': return 'Parent Support & Query Resolution';
      case 'certificates': return 'Official Certificate Generator';
      case 'gatepass': return 'Reception Gate Pass & Exit Permits';
      case 'call-log': return 'Phone Call Telephony & Follow-up Log';
      case 'communication': return 'Reception Multi-Channel Broadcast';
      case 'lost-found': return 'Campus Lost & Found Registry';
      case 'announcements': return 'School Notices & Public Circulars';
      case 'reports': return 'Reception Footfall Reports & Analytics';
      case 'settings': return 'Front Office Policies & Visitor Rules';
      default: return 'Reception Command Center';
    }
  };

  return (
    <ReceptionProvider>
      <PageLayout>
        <PageHeader
          title={getHeaderTitle()}
          subtitle="Manage front-office operations: admissions enquiries, visitor badges, appointments, certificate issuance, phone call logs, gate passes, and student/parent support."
          breadcrumb={[
            { label: 'Workspace', path: '/' },
            { label: 'Reception', path: '/reception' },
            { label: getHeaderTitle(), path: location.pathname }
          ]}
        />

        <div style={{ marginTop: '16px' }}>
          {renderModule()}
        </div>
      </PageLayout>
    </ReceptionProvider>
  );
}
