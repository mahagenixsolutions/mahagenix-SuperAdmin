import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { UserRole } from '@edutrack/shared-types';
import { ROLES } from '../../core/permissions/ROLES';
import PrincipalDashboard from '../principal/PrincipalDashboard';
import AccountantDashboard from './AccountantDashboard';
import RoleDashboard from './RoleDashboard';
import AcademicCommandCenter from '../academic/dashboard/AcademicCommandCenter';
import OrgDashboard from '../organization/pages/OrgDashboard';
import { ROLE_DASHBOARDS } from '../../mock/dashboards';

import LibraryDashboardModule from '../library/dashboard/LibraryDashboardModule';
import { LibraryProvider } from '../library/shared/libraryStore';

import TransportDashboardModule from '../transport/dashboard/TransportDashboardModule';
import { TransportProvider } from '../transport/shared/transportStore';

import HostelDashboardModule from '../hostel/dashboard/HostelDashboardModule';
import { HostelProvider } from '../hostel/shared/hostelStore';

import ReceptionDashboardModule from '../reception/dashboard/ReceptionDashboardModule';
import { ReceptionProvider } from '../reception/shared/receptionStore';

import HRPage from '../hr/HRPage';

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return null;

  if (user.role === ROLES.ORGANIZATION_ADMIN) {
    return <OrgDashboard />;
  }

  if (user.role === ROLES.PRINCIPAL) return <PrincipalDashboard />;
  if (user.role === ROLES.ACADEMIC_COORDINATOR) return <AcademicCommandCenter />;
  if (user.role === ROLES.ACCOUNTANT) return <AccountantDashboard />;
  if (user.role === ROLES.HR) return <HRPage />;
  if (user.role === ROLES.LIBRARIAN) {
    return (
      <LibraryProvider>
        <LibraryDashboardModule />
      </LibraryProvider>
    );
  }
  if (user.role === ROLES.TRANSPORT_MANAGER) {
    return (
      <TransportProvider>
        <TransportDashboardModule />
      </TransportProvider>
    );
  }
  if (user.role === ROLES.HOSTEL_MANAGER) {
    return (
      <HostelProvider>
        <HostelDashboardModule />
      </HostelProvider>
    );
  }
  if (user.role === ROLES.RECEPTIONIST) {
    return (
      <ReceptionProvider>
        <ReceptionDashboardModule />
      </ReceptionProvider>
    );
  }

  // Config-driven dashboards for all staff roles
  const config = ROLE_DASHBOARDS[user.role as UserRole];
  if (config) return <RoleDashboard config={config} />;

  // Ultimate fallback for staff administration dashboard
  return <OrgDashboard />;
}
