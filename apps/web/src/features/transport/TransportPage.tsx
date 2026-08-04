import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { TransportProvider } from './shared/transportStore';
import TransportDashboardModule from './dashboard/TransportDashboardModule';
import FleetModule from './fleet/FleetModule';
import BusRoutesModule from './routes/BusRoutesModule';
import StudentsTransportModule from './students/StudentsTransportModule';
import DriversAttendantsModule from './drivers/DriversAttendantsModule';
import TripManagementModule from './trips/TripManagementModule';
import LiveTrackingModule from './tracking/LiveTrackingModule';
import VehicleDocumentsModule from './documents/VehicleDocumentsModule';
import TransportRequestsModule from './requests/TransportRequestsModule';
import MaintenanceModule from './maintenance/MaintenanceModule';
import FuelManagementModule from './fuel/FuelManagementModule';
import SafetyIncidentsModule from './safety/SafetyIncidentsModule';
import TransportReportsAnalyticsModule from './reports/TransportReportsAnalyticsModule';
import TransportSettingsModule from './settings/TransportSettingsModule';

export default function TransportPage() {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/fleet')) return 'fleet';
    if (path.includes('/students')) return 'students';
    if (path.includes('/routes')) return 'routes';
    if (path.includes('/drivers') || path.includes('/attendants')) return 'drivers';
    if (path.includes('/trips')) return 'trips';
    if (path.includes('/tracking')) return 'tracking';
    if (path.includes('/fuel')) return 'fuel';
    if (path.includes('/maintenance')) return 'maintenance';
    if (path.includes('/documents')) return 'documents';
    if (path.includes('/requests')) return 'requests';
    if (path.includes('/incidents') || path.includes('/safety')) return 'incidents';
    if (path.includes('/reports') || path.includes('/analytics')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const renderModule = () => {
    switch (activeTab) {
      case 'fleet':
        return <FleetModule />;
      case 'students':
        return <StudentsTransportModule />;
      case 'routes':
        return <BusRoutesModule />;
      case 'drivers':
        return <DriversAttendantsModule />;
      case 'trips':
        return <TripManagementModule />;
      case 'tracking':
        return <LiveTrackingModule />;
      case 'fuel':
        return <FuelManagementModule />;
      case 'maintenance':
        return <MaintenanceModule />;
      case 'documents':
        return <VehicleDocumentsModule />;
      case 'requests':
        return <TransportRequestsModule />;
      case 'incidents':
        return <SafetyIncidentsModule />;
      case 'reports':
        return <TransportReportsAnalyticsModule />;
      case 'settings':
        return <TransportSettingsModule />;
      case 'dashboard':
      default:
        return <TransportDashboardModule />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'fleet': return 'Bus Fleet Management Directory';
      case 'students': return 'Student Bus Allocation Directory';
      case 'routes': return 'Bus Routes & Stops Circuit Optimization';
      case 'drivers': return 'Drivers & Bus Attendants Registry';
      case 'trips': return 'Trip Operations & Schedule Monitoring Desk';
      case 'tracking': return 'Real-Time Live GPS Telematics Map';
      case 'fuel': return 'Fuel Management & Mileage Efficiency';
      case 'maintenance': return 'Vehicle Maintenance & Servicing Desk';
      case 'documents': return 'Vehicle Compliance & Document Vault';
      case 'requests': return 'Transport Allocation & Change Requests Queue';
      case 'incidents': return 'Incidents, Telematics Alerts & Safety Protocol';
      case 'reports': return 'Transport Fleet Reports & Analytics';
      case 'settings': return 'Transport Policy Rules & GPS Settings';
      default: return 'Transport Command Center';
    }
  };

  return (
    <TransportProvider>
      <PageLayout>
        <PageHeader
          title={getHeaderTitle()}
          subtitle="Manage complete school transportation lifecycle: buses, student allocations, routes, live GPS tracking, servicing, and safety."
          breadcrumbs={[
            { label: 'Workspace', to: '/' },
            { label: 'Transport', to: '/transport' },
            { label: getHeaderTitle() }
          ]}
        />

        <div style={{ marginTop: '16px' }}>
          {renderModule()}
        </div>
      </PageLayout>
    </TransportProvider>
  );
}
