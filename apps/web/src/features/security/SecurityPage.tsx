import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import SecurityDashboardModule from './dashboard/SecurityDashboardModule';
import SecurityVisitorsModule from './visitors/SecurityVisitorsModule';
import GateManagementModule from './gate/GateManagementModule';
import StudentExitModule from './student-exit/StudentExitModule';
import StaffEntryModule from './staff-entry/StaffEntryModule';
import VehicleManagementModule from './vehicles/VehicleManagementModule';
import DeliveryManagementModule from './deliveries/DeliveryManagementModule';
import PatrolManagementModule from './patrols/PatrolManagementModule';
import IncidentReportsModule from './incidents/IncidentReportsModule';
import EmergencyAlertsModule from './emergency/EmergencyAlertsModule';
import CCTVMonitoringModule from './cctv/CCTVMonitoringModule';
import LostFoundSecurityModule from './lost-found/LostFoundSecurityModule';
import CheckpointsModule from './checkpoints/CheckpointsModule';
import SecurityReportsAnalyticsModule from './reports/SecurityReportsAnalyticsModule';
import SecuritySettingsModule from './settings/SecuritySettingsModule';

export default function SecurityPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/visitors')) return 'visitors';
    if (path.includes('/gate')) return 'gate';
    if (path.includes('/student-exit')) return 'student-exit';
    if (path.includes('/staff-entry')) return 'staff-entry';
    if (path.includes('/vehicles')) return 'vehicles';
    if (path.includes('/deliveries')) return 'deliveries';
    if (path.includes('/patrols')) return 'patrols';
    if (path.includes('/incidents')) return 'incidents';
    if (path.includes('/emergency')) return 'emergency';
    if (path.includes('/cctv')) return 'cctv';
    if (path.includes('/lost-found')) return 'lost-found';
    if (path.includes('/checkpoints')) return 'checkpoints';
    if (path.includes('/reports') || path.includes('/analytics')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const renderModule = () => {
    switch (activeTab) {
      case 'visitors':
        return <SecurityVisitorsModule />;
      case 'gate':
        return <GateManagementModule />;
      case 'student-exit':
        return <StudentExitModule />;
      case 'staff-entry':
        return <StaffEntryModule />;
      case 'vehicles':
        return <VehicleManagementModule />;
      case 'deliveries':
        return <DeliveryManagementModule />;
      case 'patrols':
        return <PatrolManagementModule />;
      case 'incidents':
        return <IncidentReportsModule />;
      case 'emergency':
        return <EmergencyAlertsModule />;
      case 'cctv':
        return <CCTVMonitoringModule />;
      case 'lost-found':
        return <LostFoundSecurityModule />;
      case 'checkpoints':
        return <CheckpointsModule />;
      case 'reports':
        return <SecurityReportsAnalyticsModule />;
      case 'settings':
        return <SecuritySettingsModule />;
      case 'dashboard':
      default:
        return <SecurityDashboardModule />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'visitors': return 'Visitor Management & Thermal Pass Issuance';
      case 'gate': return 'Gate Operations & QR Access Control';
      case 'student-exit': return 'Student Early Exit & Guardian Verification';
      case 'staff-entry': return 'Faculty & Staff RFID Gate Attendance';
      case 'vehicles': return 'Campus Vehicle Entry & Parking Management';
      case 'deliveries': return 'Parcel & Courier Delivery Control';
      case 'patrols': return 'Guard Patrol Schedules & GPS Checkpoints';
      case 'incidents': return 'Security Incident Reports & Investigations';
      case 'emergency': return 'Emergency Response & Broadcast Console';
      case 'cctv': return 'CCTV Video Surveillance & Camera Feeds';
      case 'lost-found': return 'Gate Custody Lost & Found Registry';
      case 'checkpoints': return 'Security Checkpoints & Scan Audits';
      case 'reports': return 'Security Audit Reports & Entry Analytics';
      case 'settings': return 'Gate Rules & Emergency Policies';
      default: return 'Security Command Center';
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title={getHeaderTitle()}
        subtitle="Manage complete campus security lifecycle: visitor passes, gate turnstiles, student exit permits, vehicle passes, guard patrols, CCTV telematics, and emergency alerts."
        breadcrumb={[
          { label: 'Workspace', path: '/' },
          { label: 'Security', path: '/security' },
          { label: getHeaderTitle(), path: location.pathname }
        ]}
      />
      
      <div style={{ marginTop: '16px' }}>
        {renderModule()}
      </div>
    </PageLayout>
  );
}
