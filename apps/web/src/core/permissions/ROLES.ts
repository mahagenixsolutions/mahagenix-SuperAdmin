import { UserRole } from '@edutrack/shared-types';

export const ROLES = {
  ORGANIZATION_ADMIN: UserRole.ORGANIZATION_ADMIN,
  SCHOOL_ADMIN: UserRole.SCHOOL_ADMIN,
  PRINCIPAL: UserRole.PRINCIPAL,
  ACADEMIC_COORDINATOR: UserRole.ACADEMIC_COORDINATOR,
  TEACHER: UserRole.TEACHER,
  STUDENT: UserRole.STUDENT,
  PARENT: UserRole.PARENT,
  ACCOUNTANT: UserRole.ACCOUNTANT,
  HR: UserRole.HR,
  LIBRARIAN: UserRole.LIBRARIAN,
  TRANSPORT_MANAGER: UserRole.TRANSPORT_MANAGER,
  HOSTEL_MANAGER: UserRole.HOSTEL_MANAGER,
  RECEPTIONIST: UserRole.RECEPTIONIST,
  SECURITY: UserRole.SECURITY,
  NURSE: UserRole.NURSE,
  COUNSELOR: UserRole.COUNSELOR,
} as const;

export const isAdminRole = (role: UserRole) => {
  return role === ROLES.ORGANIZATION_ADMIN || role === ROLES.SCHOOL_ADMIN;
};

export const isStaffRole = (role: UserRole) => {
  return role !== ROLES.STUDENT && role !== ROLES.PARENT;
};

