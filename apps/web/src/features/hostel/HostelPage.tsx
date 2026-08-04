import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { HostelProvider } from './shared/hostelStore';
import HostelDashboardModule from './dashboard/HostelDashboardModule';
import HostelBuildingsModule from './buildings/HostelBuildingsModule';
import RoomsModule from './rooms/RoomsModule';
import RoomAllocationModule from './allocation/RoomAllocationModule';
import HostelStudentsModule from './students/HostelStudentsModule';
import WardensStaffModule from './wardens/WardensStaffModule';
import DailyAttendanceModule from './attendance/DailyAttendanceModule';
import VisitorsModule from './visitors/VisitorsModule';
import MessManagementModule from './mess/MessManagementModule';
import HostelInventoryModule from './inventory/HostelInventoryModule';
import ComplaintsModule from './complaints/ComplaintsModule';
import HostelFeesModule from './fees/HostelFeesModule';
import DisciplineModule from './discipline/DisciplineModule';
import MedicalRecordsModule from './medical/MedicalRecordsModule';
import HostelReportsAnalyticsModule from './reports/HostelReportsAnalyticsModule';
import HostelSettingsModule from './settings/HostelSettingsModule';

export default function HostelPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/students')) return 'students';
    if (path.includes('/buildings')) return 'buildings';
    if (path.includes('/rooms')) return 'rooms';
    if (path.includes('/allocation')) return 'allocation';
    if (path.includes('/wardens')) return 'wardens';
    if (path.includes('/attendance')) return 'attendance';
    if (path.includes('/mess')) return 'mess';
    if (path.includes('/visitors') || path.includes('/gatepass')) return 'visitors';
    if (path.includes('/complaints') || path.includes('/maintenance')) return 'complaints';
    if (path.includes('/inventory')) return 'inventory';
    if (path.includes('/fees')) return 'fees';
    if (path.includes('/medical')) return 'medical';
    if (path.includes('/discipline')) return 'discipline';
    if (path.includes('/reports') || path.includes('/analytics')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const renderModule = () => {
    switch (activeTab) {
      case 'students':
        return <HostelStudentsModule />;
      case 'buildings':
        return <HostelBuildingsModule />;
      case 'rooms':
        return <RoomsModule />;
      case 'allocation':
        return <RoomAllocationModule />;
      case 'wardens':
        return <WardensStaffModule />;
      case 'attendance':
        return <DailyAttendanceModule />;
      case 'mess':
        return <MessManagementModule />;
      case 'visitors':
        return <VisitorsModule />;
      case 'complaints':
        return <ComplaintsModule />;
      case 'inventory':
        return <HostelInventoryModule />;
      case 'fees':
        return <HostelFeesModule />;
      case 'medical':
        return <MedicalRecordsModule />;
      case 'discipline':
        return <DisciplineModule />;
      case 'reports':
        return <HostelReportsAnalyticsModule />;
      case 'settings':
        return <HostelSettingsModule />;
      case 'dashboard':
      default:
        return <HostelDashboardModule />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'students': return 'Hostel Resident Directory & Profiles';
      case 'buildings': return 'Hostel Blocks & Buildings Directory';
      case 'rooms': return 'Rooms Directory & Bed Availability';
      case 'allocation': return 'Room Allocation & Transfer Desk';
      case 'wardens': return 'Hostel Wardens & Staff Roster';
      case 'attendance': return 'Daily Attendance & Curfew Roll Call';
      case 'mess': return 'Hostel Mess & Weekly Food Menus';
      case 'visitors': return 'Hostel Visitors & Gate Passes';
      case 'complaints': return 'Complaints & Maintenance Work Orders';
      case 'inventory': return 'Hostel Furniture & Equipment Inventory';
      case 'fees': return 'Hostel & Mess Fee Structure';
      case 'medical': return 'Hostel Infirmary & Medical Records';
      case 'discipline': return 'Student Disciplinary Log & Incidents';
      case 'reports': return 'Hostel Reports & Occupancy Analytics';
      case 'settings': return 'Hostel Rules & Curfew Policies';
      default: return 'Hostel Command Center';
    }
  };

  return (
    <HostelProvider>
      <PageLayout>
        <PageHeader
          title={getHeaderTitle()}
          subtitle="Manage complete hostel ecosystem: building blocks, room allocations, wardens, night roll call, visitor gate passes, and mess."
          breadcrumb={[
            { label: 'Workspace', path: '/' },
            { label: 'Hostel', path: '/hostel' },
            { label: getHeaderTitle(), path: location.pathname }
          ]}
        />

        <div style={{ marginTop: '16px' }}>
          {renderModule()}
        </div>
      </PageLayout>
    </HostelProvider>
  );
}
