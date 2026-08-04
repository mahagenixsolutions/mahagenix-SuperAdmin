import { UserRole } from '@edutrack/shared-types';
import { principalDashboard } from './principal';
import { academicCoordinatorDashboard } from './academicCoordinator';
import { hrDashboard } from './hr';
import { accountantDashboard } from './accountant';
import { receptionistDashboard } from './receptionist';
import { librarianDashboard } from './librarian';
import { transportDashboard } from './transport';
import { hostelDashboard } from './hostel';
import { securityDashboard } from './security';
import type { RoleDashboardConfig } from './types';

export type { RoleDashboardConfig } from './types';
export type { DashboardStat, DashboardQuickAction, DashboardActivity, DashboardWidget, DashboardWidgetItem } from './types';

export const ROLE_DASHBOARDS: Partial<Record<UserRole, RoleDashboardConfig>> = {
  [UserRole.PRINCIPAL]: principalDashboard,
  [UserRole.ACADEMIC_COORDINATOR]: academicCoordinatorDashboard,
  [UserRole.HR]: hrDashboard,
  [UserRole.ACCOUNTANT]: accountantDashboard,
  [UserRole.RECEPTIONIST]: receptionistDashboard,
  [UserRole.LIBRARIAN]: librarianDashboard,
  [UserRole.TRANSPORT_MANAGER]: transportDashboard,
  [UserRole.HOSTEL_MANAGER]: hostelDashboard,
  [UserRole.SECURITY]: securityDashboard,
};
